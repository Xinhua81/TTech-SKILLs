#!/usr/bin/env node
/**
 * sync.js — Sync all scripts from packages/scripts/ into every scripts/ directory under SKILLs.
 *
 * This script ensures every SKILL package is self-contained and cross-platform
 * by replacing symlinks with real file copies.
 *
 * Usage:
 *   node sync.js              # Sync all scripts
 *   node sync.js --check      # Verify consistency, exit non-zero on mismatch
 *   node sync.js --dry-run    # Show what would change without writing
 *   node sync.js --verbose    # Print every file touched
 */

const fs = require("fs");
const path = require("path");

const SKILLS_DIR = path.resolve(__dirname, "..");
const MASTER_SCRIPTS_DIR = path.join(__dirname, "scripts");

function readMasters() {
  if (!fs.existsSync(MASTER_SCRIPTS_DIR)) {
    console.error(
      `Error: Master scripts directory not found at ${MASTER_SCRIPTS_DIR}`
    );
    process.exit(1);
  }
  const files = {};
  const entries = fs.readdirSync(MASTER_SCRIPTS_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const filePath = path.join(MASTER_SCRIPTS_DIR, entry.name);
    files[entry.name] = fs.readFileSync(filePath, "utf-8");
  }
  if (Object.keys(files).length === 0) {
    console.error(`Error: No master scripts found in ${MASTER_SCRIPTS_DIR}`);
    process.exit(1);
  }
  return files;
}

function isSymLinkSync(p) {
  try {
    return fs.lstatSync(p).isSymbolicLink();
  } catch {
    return false;
  }
}

function* walkScriptsDirs(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name === "packages") continue;

    const skillDir = path.join(dir, entry.name);
    const skillScripts = path.join(skillDir, "scripts");
    yield skillScripts;
  }
}

function rel(p) {
  return path.relative(path.resolve(SKILLS_DIR, ".."), p);
}

function isValidSkillDir(dir) {
  const required = ["SKILL.md", "reference.md", "examples.md"];
  return required.every((f) => fs.existsSync(path.join(dir, f)));
}

function syncFile(targetFile, masterContent, opts) {
  if (fs.existsSync(targetFile) && isSymLinkSync(targetFile)) {
    if (opts.dryRun) {
      console.log(`[DRY-RUN] Would remove symlink: ${rel(targetFile)}`);
    } else {
      fs.unlinkSync(targetFile);
      if (opts.verbose) console.log(`Removed symlink: ${rel(targetFile)}`);
    }
  }

  if (fs.existsSync(targetFile)) {
    const existing = fs.readFileSync(targetFile, "utf-8");
    if (existing === masterContent) {
      if (opts.verbose) console.log(`OK  ${rel(targetFile)}`);
      return true;
    }
    if (opts.dryRun) {
      console.log(`[DRY-RUN] Would update: ${rel(targetFile)}`);
      return true;
    }
    if (opts.verbose) console.log(`Updated: ${rel(targetFile)}`);
  } else {
    if (opts.dryRun) {
      console.log(`[DRY-RUN] Would create: ${rel(targetFile)}`);
      return true;
    }
    if (opts.verbose) console.log(`Created: ${rel(targetFile)}`);
  }

  if (!opts.dryRun) {
    fs.writeFileSync(targetFile, masterContent, "utf-8");
  }
  return true;
}

function syncDir(scriptsDir, masterFiles, opts) {
  if (!fs.existsSync(scriptsDir)) {
    if (opts.dryRun) {
      console.log(`[DRY-RUN] Would create directory: ${rel(scriptsDir)}`);
    } else {
      fs.mkdirSync(scriptsDir, { recursive: true });
      if (opts.verbose) console.log(`Created directory: ${rel(scriptsDir)}`);
    }
  }

  const masterNames = new Set(Object.keys(masterFiles));
  let allOk = true;

  // 1. Sync all master files
  for (const [fileName, masterContent] of Object.entries(masterFiles)) {
    const targetFile = path.join(scriptsDir, fileName);
    const ok = syncFile(targetFile, masterContent, opts);
    if (!ok) allOk = false;
  }

  // 2. Remove extra files not in master
  if (fs.existsSync(scriptsDir)) {
    const entries = fs.readdirSync(scriptsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      if (masterNames.has(entry.name)) continue;

      const extraFile = path.join(scriptsDir, entry.name);
      if (opts.dryRun) {
        console.log(`[DRY-RUN] Would remove extra: ${rel(extraFile)}`);
      } else {
        fs.unlinkSync(extraFile);
        if (opts.verbose) console.log(`Removed extra: ${rel(extraFile)}`);
      }
    }
  }

  return allOk;
}

function checkDir(scriptsDir, masterFiles, opts) {
  let allOk = true;
  const masterNames = new Set(Object.keys(masterFiles));

  // Check all master files exist and match
  for (const [fileName, masterContent] of Object.entries(masterFiles)) {
    const targetFile = path.join(scriptsDir, fileName);
    const label = rel(targetFile);

    if (!fs.existsSync(targetFile)) {
      console.error(`MISSING ${label}`);
      allOk = false;
      continue;
    }

    if (isSymLinkSync(targetFile)) {
      console.error(`SYMLINK ${label}`);
      allOk = false;
      continue;
    }

    const existing = fs.readFileSync(targetFile, "utf-8");
    if (existing !== masterContent) {
      console.error(`MISMATCH ${label}`);
      allOk = false;
      continue;
    }

    if (opts.verbose) console.log(`OK  ${label}`);
  }

  // Check for extra files
  if (fs.existsSync(scriptsDir)) {
    const entries = fs.readdirSync(scriptsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      if (masterNames.has(entry.name)) continue;

      const extraFile = path.join(scriptsDir, entry.name);
      console.error(`EXTRA ${rel(extraFile)}`);
      allOk = false;
    }
  }

  return allOk;
}

function main() {
  const args = process.argv.slice(2);
  const opts = {
    check: args.includes("--check"),
    dryRun: args.includes("--dry-run"),
    verbose: args.includes("--verbose") || args.includes("-v"),
  };

  const masterFiles = readMasters();
  const rawDirs = [...walkScriptsDirs(SKILLS_DIR)];
  const dirs = rawDirs.filter((d) => isValidSkillDir(path.dirname(d)));

  console.log(
    `Found ${dirs.length} SKILL directories, ${
      Object.keys(masterFiles).length
    } master scripts.\n`
  );

  let okCount = 0;
  let failCount = 0;

  for (const scriptsDir of dirs) {
    const ok = opts.check
      ? checkDir(scriptsDir, masterFiles, opts)
      : syncDir(scriptsDir, masterFiles, opts);
    if (ok) okCount++;
    else failCount++;
  }

  console.log(`\nResults: ${okCount} OK, ${failCount} issues.`);

  if (failCount > 0) {
    process.exit(1);
  }
}

main();
