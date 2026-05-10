# TTech-SKILL

[![API](https://img.shields.io/badge/API-RESTful-blue)](https://ttech.xin)
[![Platform](https://img.shields.io/badge/Platform-OpenClaw%20%7C%20QoderWork%20%7C%20Hermes%20%7C%20Claude%20Code-green)]()
[![License](https://img.shields.io/badge/License-Apache%202.0-yellow.svg)](LICENSE)

TTech-SKILL is a collection of SKILL definition files for AI Agents. Through these SKILLs, Agents can more efficiently acquire news, company information (including stock data), public services (conferences, weather), products (e-commerce), and AI model information. Data obtained through TTech-SKILL is more timely, accurate, and refined, effectively reducing Token consumption and dependence on web scraping tools.

TTech-SKILL is built on the public RESTful APIs provided by [TTech.xin](https://ttech.xin/developers). All APIs are open interfaces. TTech supports and encourages developers to submit data, **providing valuable data to all open-world Agents**, and improving Agent execution efficiency.

[简体中文](README_zh.md)

---

## Features

| SKILL Name | SKILL Description |
|------------|-------------------|
| ttech-query-news | Query news, currently supports tech news only |
| ttech-query-company | Query company information (including daily/monthly/yearly stock data), currently supports tech companies only |
| ttech-query-conference | Query conference information, currently supports tech conferences only |
| ttech-query-model | Query AI model basic info, popularity, actual call volume, capability rankings, CSP pricing by region, and price calculator |

**Important Notes**:
- Developers can browse the [TTech.xin website](https://ttech.xin) to experience feature samples. This website is built on the same RESTful APIs as the SKILLs.
- Developers can browse the [TTech.xin website](https://ttech.xin/download) and **download the mobile APP** to experience feature samples. This website is built on the same RESTful APIs as the SKILLs (in development).
- Developers can register at the [TTech.xin website](https://ttech.xin/user) (in development), **and publish data through their registered account. This data can be accessed by various Agent platforms via SKILLs**. Publishing channels include:
  - TTech.xin website;
  - TTech.xin mobile APP;
  - RESTful API;
  - Various Agents + SKILLs;

---

## Quick Start

### OpenClaw
Coming soon:
Install all TTech SKILLs:
```bash
openclaw skills install github:Joshua81/TTech-SKILL.git
```

Install a single TTech SKILL:
```bash
openclaw skills install github:Joshua81/TTech-SKILL.git/ttech-query-news
```

### QoderWork
Coming soon

### Hermes
Coming soon

### Claude Code
Coming soon

---

## Project Structure

### Overall Structure
```
TTech-SKILL/
├── README.md              # English README
├── README_zh.md           # Chinese README
├── LICENSE                # Open source license
├── SKILLs/                # SKILL directory, stores all skills
├── Docs/                  # Development guides and contribution guidelines
└── package.json           # npm package management
```

### SKILLs/{skill-name} Structure
```
SKILLs/ttech-{skill-sub-name}/
├── SKILL.md          # Skill entry: YAML frontmatter + capability description + endpoint quick reference
├── skill.json        # Adapted for Hermes or other platforms requiring JSON
├── reference.md      # API parameters and response fields in detail
├── examples.md       # Scenario-based usage examples
└── scripts/          # Shared calling scripts
```

SKILL naming conventions:
- Agent Platforms developed in English environments (OpenClaw, Hermes, Claude Code, etc.): Recommend using English-based SKILLs, such as `ttech-query-news`.
- Agent Platforms developed in Chinese environments (QoderWork, etc.): Provide Chinese-enhanced versions based on English SKILLs, naming convention is `ttech-{skill-sub-name}-zh`, e.g. `ttech-query-news` provides `ttech-query-news-zh`.

### SKILLs/packages Structure
```
SKILLs/packages/
├── scripts/          # Shared calling scripts (single source of truth)
└── sync.js           # Script synchronization tool
```

**scripts/**  
Stores scripts shared by all SKILLs, maintained in one place only. Currently contains only `call_api.js`, which uses Node.js built-in `fetch` for cross-platform RESTful API calls, avoiding JA3 fingerprint blocking issues with macOS curl.

**sync.js**  
Synchronizes all scripts under `packages/scripts/` to each SKILL's `scripts/` directory. Automatically:
- Creates missing `scripts/` directories;
- Replaces symbolic links with real file copies;
- Copies/updates all master script files;
- Removes extra files in target directories that are not in the master list;
- Skips files whose content is already identical;

Supported commands:

| Command | Function |
|---------|----------|
| `node sync.js` | Execute sync: create directories, copy/update files, remove symlinks |
| `node sync.js --check` | Check only: verify all copies match the master script and no symlinks exist |
| `node sync.js --dry-run` | Dry run: print which files would be created/updated/deleted without writing |
| `node sync.js --verbose` | Verbose mode: print processing status for each file (OK / Created / Updated / Removed symlink) |

---

## Roadmap

| Phase | Status | Feature | Description |
|-------|--------|---------|-------------|
| **v1.0** | ✅ Completed | 4 Core SKILLs | `news` / `company` / `conference` / `model` |
| | ✅ Completed | OpenClaw, QoderWork support | Basic installation and invocation |
| | ✅ Completed | RESTful API docs | Bilingual API specification (Chinese + English) |
| **v1.1** | 🔄 In Progress | Hermes / Claude Code support | Platform compatibility optimization and validation |
| | 🔄 In Progress | User system | Registration, incentives, and data maintenance |
| | 🔄 In Progress | Data submission channels | User data submission, validation, and quality mechanisms |
| **v1.2** | ⏳ Planned | News expansion | Expand from tech news to politics, finance, and sports |
| | ⏳ Planned | Weather queries | Global weather queries |
| | ⏳ Planned | Company expansion | Expand from tech companies to Fortune 500 and mid-sized enterprises |
| | ⏳ Planned | Company info enrichment | Expand from basic info to comprehensive company information |
| | ⏳ Planned | Product queries | Product details and pricing from major e-commerce platforms with purchase links |

> For latest progress, please follow [Issues](https://github.com/Xinhua81/TTech-SKILL/issues). Feature suggestions are welcome.

---

## Development Guides

| Document | Description |
|----------|-------------|
| [API Reference (English)](Docs/api_en.md) | RESTful API specification (English), detailed request parameters and response messages |
| [API 接口指南（中文）](Docs/api_zh.md) | RESTful API specification (Chinese), detailed request parameters and response messages |

---

## License

This project is licensed under the [Apache License 2.0](LICENSE).

---

## Contributing

Issues and Pull Requests are welcome!

- Found inconsistencies between documentation and APIs? Please submit an [Issue](https://github.com/Xinhua81/TTech-SKILL/issues).
- Want to add platform support or extend SKILL functionality? Please read [CONTRIBUTING.md](Docs/CONTRIBUTING_en.md) first.

## Contributors
<!-- readme: contributors -start -->
<!-- readme: contributors -end -->
