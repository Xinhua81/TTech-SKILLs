# Contributing Guide

Thank you for your interest in TTech-SKILL! This guide will help you quickly understand how to contribute to the project.

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18.0 (built-in `fetch`, no extra dependencies)
- [Git](https://git-scm.com/)

### Local Development

```bash
# 1. Fork this repository, then clone to your local machine
git clone https://github.com/<your-username>/TTech-SKILL.git
cd TTech-SKILL

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Modify SKILL files or documentation

# 4. Commit and push
git commit -m "feat: describe your change"
git push origin feature/your-feature-name

# 5. Submit a Pull Request
```

---

## Types of Contributions

| Type | Description | Example |
|------|-------------|---------|
| **New SKILL** | Add SKILL definitions for new data domains | Add `ttech-query-weather` |
| **Platform Adaptation** | Adapt existing SKILL to a new Agent platform | Generate SKILL for Hermes / Claude Code |
| **Documentation Improvement** | Fix API docs, add examples, optimize README | Update parameter descriptions in `reference.md` |
| **Bug Fix** | Fix script errors or doc/API inconsistencies | Fix error handling in `call_api.js` |
| **Internationalization** | Add new language versions for SKILL | Add Japanese SKILL for `ttech-query-news` |

---

## Submitting Issues

### Before Submitting

- Please search [existing Issues](https://github.com/Xinhua81/TTech-SKILL/issues) first to avoid duplicates
- Confirm the issue still exists in the latest version

### Bug Report

Please provide the following information as much as possible:

- **Problem Description**: Briefly describe the issue
- **Reproduction Steps**: 1. ... 2. ... 3. ...
- **Expected Result**: What you expected to happen
- **Actual Result**: What actually happened
- **Environment**: Agent platform / Node.js version / Operating system
- **Related Code/Logs** (if any): Paste relevant snippets

### Feature Request

- **Feature Description**: What feature you want
- **Use Case**: What problem this feature solves
- **Suggested API Endpoint** (if applicable): If new data is involved, suggest the RESTful API
- **Reference Links** (if any): Related materials or similar implementations

---

## Submitting Pull Requests

### Branch Naming Convention

| Type | Prefix | Example |
|------|--------|---------|
| New Feature | `feature/` | `feature/ttech-query-weather` |
| Bug Fix | `fix/` | `fix/openclaw-script-error` |
| Documentation | `docs/` | `docs/api-reference-typo` |
| Platform Adaptation | `platform/` | `platform/hermes-support` |

### PR Description Requirements

When submitting a PR, please include the following information:

- **What Changed**: Briefly describe what was modified
- **Why**: Why this change is needed
- **Scope**: Which platforms / SKILLs / documents are affected
- **Testing**: How to verify the correctness of the change

### PR Review Process

- After submission, maintainers will review within 3 business days
- Review focuses on: documentation accuracy, format consistency, platform compatibility
- Multiple rounds of revision may be needed, please keep an eye on PR comments and respond promptly

---

## SKILL File Writing Guidelines

### SKILL File Format

Every SKILL entry file must include YAML frontmatter:

```yaml
---
name: ttech-query-news
version: 1.0.0
platform: OpenClaw
author: your-name
description: Query tech news, support filtering by time/keywords/category
---
```

**Required Fields**:

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Unique SKILL identifier, use kebab-case | `ttech-query-news` |
| `version` | Semantic version | `1.0.0` |
| `platform` | Target Agent Platform | `OpenClaw` / `QoderWork` / `Hermes` / `Claude Code` |
| `author` | Author GitHub username | `your-name` |
| `description` | One-sentence feature description | `Query tech news...` |

**SKILL.md Body** should include the following sections:

1. **Overview**: 1-2 sentences describing SKILL capabilities
2. **Endpoint Quick Reference**: List all supported API endpoints with brief descriptions
3. **Parameter Quick Reference**: Common parameters table (name, type, required, default, description)
4. **Usage Example**: At least one complete usage example

### reference File Guidelines

- Parameter table must include: **Name, Type, Required, Default, Description**
- Response fields must provide **example JSON**
- Enumerated values must list **all possible values and their meanings**

### examples File Guidelines

- Each scenario provides a **complete call command** (curl or node script)
- Includes **successful response example** (simplified, keeping key fields)
- Complex scenarios require **parameter combination explanations**

---

## Script Writing Guidelines

### call_api.js

- Use Node.js **built-in `fetch`**, no external npm dependencies
- Support `-H` parameter for custom headers
- Error handling should output **friendly error messages** (Chinese/English depending on SKILL language)
- Scripts should be placed in the `scripts/` directory. The master copy is maintained in `SKILLs/packages/scripts/` and synced to each SKILL via `sync.js` (see [README.md](../README.md) for details)

### Example Script Structure

```javascript
#!/usr/bin/env node
// scripts/call_api.js
const url = process.argv[2];
const headers = parseHeaders(process.argv.slice(3));

fetch(url, { headers })
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
  })
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => {
    console.error('Request failed:', err.message);
    process.exit(1);
  });
```

---

## Commit Message Convention

Commit messages should use the following format:

```
<type>: <short description>

<optional detailed description>
```

**Type Prefixes**:

| Type | Description |
|------|-------------|
| `feat` | New SKILL or feature |
| `fix` | Bug fix |
| `docs` | Documentation change |
| `style` | Formatting (no functional change) |
| `refactor` | Code refactoring |
| `platform` | New or modified platform adaptation |
| `test` | Test-related |
| `chore` | Build/tool-related |

**Examples**:

```
feat: add ttech-query-weather SKILL
fix: fix OpenClaw call_api.js error handling
docs: add QoderWork installation instructions
platform: add Hermes platform ttech-query-news adaptation
```

---

## Cross-Platform Adaptation Guide

### Steps for Adding New Platform Support

1. Copy an existing SKILL directory (e.g., `ttech-query-news`) to create a new platform-specific variant
2. Rename the directory to reflect the platform if needed (e.g., `ttech-query-news-hermes`)
3. Adjust according to target platform specifications:
   - `platform` field in YAML frontmatter
   - Calling method description (`exec` / `node` / others)
   - Language version strategy (monolingual / bilingual)
4. Run `node SKILLs/packages/sync.js` to ensure the new SKILL has the shared `scripts/call_api.js`
5. Update platform support list in README_zh.md and README.md
6. Submit PR, describing the adapted platform and testing method

### Platform Differences

| Platform | Language Strategy | Special Requirements |
|----------|-------------------|----------------------|
| OpenClaw | English | - |
| QoderWork | Chinese + English | - |
| Hermes | English | - |
| Claude Code | English | - |

---

## Community Guidelines

- **Be Friendly**: Respect contributors from different backgrounds and experience levels
- **Focus on Issues, Not People**: Discuss technical problems, avoid personal attacks
- **Be Patient**: Maintainers are also volunteers, responses may take time
- **Use Chinese or English**: Choose the language you are more proficient in

---

## Getting Help

- Have questions? Please check [README.md](../README.md) and [API Docs](api_en.md) first
- Still have questions? Submit an [Issue](https://github.com/Xinhua81/TTech-SKILL/issues) with the `question` label

---

Thank you again for your contribution!
