#!/usr/bin/env node
/**
 * TTech.xin API caller — cross-platform Node.js implementation
 * Preferred over system curl on macOS to avoid JA3 fingerprint blocking.
 */

const args = process.argv.slice(2);
const url = args[0];

if (!url) {
  console.error("Usage: node call_api.js <url> [-H 'Header: Value' ...]");
  process.exit(1);
}

const headers = {};
for (let i = 1; i < args.length; i++) {
  if (args[i] === "-H") {
    if (i + 1 >= args.length || !args[i + 1]) {
      console.error("Error: -H requires a header value");
      process.exit(1);
    }
    const parts = args[i + 1].split(/:(.*)/);
    headers[parts[0].trim()] = (parts[1] || "").trim();
    i++; // skip header value
  } else {
    console.error(`Error: Unknown argument: ${args[i]}`);
    process.exit(1);
  }
}

fetch(url, { headers, signal: AbortSignal.timeout(30000) })
  .then((res) =>
    res.text().then((text) => ({
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      text,
    }))
  )
  .then(({ ok, status, statusText, text }) => {
    if (!ok) {
      console.error(`HTTP error: ${status} ${statusText}`);
    }
    console.log(text);
    process.exit(ok ? 0 : 1);
  })
  .catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
  });
