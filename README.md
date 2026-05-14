# TTech-SKILLs

[![API](https://img.shields.io/badge/API-RESTful-blue)](https://ttech.xin)
[![Platform](https://img.shields.io/badge/Platform-OpenClaw%20%7C%20QoderWork%20%7C%20Hermes%20%7C%20Claude%20Code%20%7C%20Cursor%20%7C%20Codex%20%7C%20Gemini%20CLI%20%7C%20Windsurf%20%7C%20Cline%20%7C%20Roo%20Code%20%7C%20Amp%20%7C%20Goose%20%7C%20Qoder%20%7C%20Qwen%20Code-green)]()
[![License](https://img.shields.io/badge/License-Apache%202.0-yellow.svg)](LICENSE)
![GitHub stars](https://img.shields.io/github/stars/TTech-Xin/TTech-SKILLs?style=social)

TTech-SKILL is a collection of SKILL definition files for AI Agents. Through these SKILLs, Agents can more efficiently acquire news, company information (including stock data), public services (conferences, weather), products (e-commerce), and AI model information. Data obtained through TTech-SKILL is more timely, accurate, and refined, effectively reducing Token consumption and dependence on web scraping tools.
TTech-SKILL is built on the public RESTful APIs provided by [TTech.xin](https://ttech.xin/developers). All APIs are open interfaces. TTech supports and encourages developers to submit data, **providing valuable data to all open-world Agents**, and improving Agent execution efficiency.
[简体中文](README_zh.md)

---

## Features
| SKILL Name | SKILL Description |
|-------|--------|
| ttech-query-news | Query news, currently supports tech news only |
| ttech-query-company | Query company information (including daily/monthly/yearly stock data), currently supports tech companies only |
| ttech-query-conference | Query conference information, currently supports tech conferences only |
| ttech-query-model | Query AI model basic info, popularity, actual call volume, capability rankings, CSP pricing by region, and price calculator |
> Each SKILL listed above provides a Chinese-enhanced version (with the `-zh` suffix) for Chinese-oriented Agent platforms such as QoderWork.

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
### Install SKILL

**Prerequisites**

Before installing the SKILLs, please note:
- It is recommended to install the Agent first, then install the SKILLs;
- Make sure Node.js is installed on your machine:
  - Run `node -v` and `npm -v` in your terminal;
  - The commands should print version numbers. If not recognized, download and install Node.js from [nodejs.org](https://nodejs.org) (V22.0.0 or above is recommended);
- Method 1 is recommended. Since GitHub access can be unstable in mainland China, Method 2 is also available. Method 3 is a fallback with the fewest dependencies and works in all regions;

**Method 1: Install from GitHub**

Run the following command:
```bash
# Option A
npx skills add github:TTech-Xin/TTech-SKILLs -g
# or
npx skills add TTech-Xin/TTech-SKILLs -g
```
or
```
# Option B
# Step 1: Clone to a temporary directory
git clone https://github.com/TTech-Xin/TTech-SKILLs.git /tmp/TTech-SKILLs
# Step 2: Install from local path
npx skills add /tmp/TTech-SKILLs -g
```

The installation will prompt the following interactions:
- Select skill to install: lists all SKILLs for selection. Use Space and Up/Down keys to choose. Selecting all is recommended;
- Proceed with installation: asks whether to proceed; choose Yes;
- Installed N skills: summary of the installation result;

The `npx skills` command installs SKILLs into the **Agent global SKILL path** by default and creates symbolic links to it from every Agent it discovers. The **Agent global SKILL path** is defined as follows:
- Linux/macOS: `~/.agents/skills/`;
- Windows: `%USERPROFILE%\.agents\skills\`;

Notes:
- Option A and Option B are essentially the same: both download the SKILL package from GitHub and install it via `npx skills`. Option B requires Git to be installed first;
- The two commands in Option A are equivalent; `npx skills` defaults to GitHub;


**Method 2: Install from Gitee**

```bash
# Step 1: Clone to a temporary directory
git clone https://gitee.com/ttech-xin/ttech-skills.git /tmp/TTech-SKILLs
# Step 2: Install from local path
npx skills add /tmp/TTech-SKILLs -g
```
or
```bash
npx skills add https://gitee.com/ttech-xin/ttech-skills -g
```
The procedure is similar to Method 1; the only difference is the SKILL package is downloaded from Gitee.

**Method 3: Manual download from TTech.xin and install**

Step 1: Download the SKILL package from [TTech.xin](https://TTech.xin/downloads) and extract it to a temporary directory, e.g. `/tmp/TTech-SKILLs`;
Step 2: Run the installation command:
```bash
npx skills add /tmp/TTech-SKILLs -g
```

### Configure Agent SKILL Path
After `npx skills` finishes, check whether your Agent's SKILL directory contains directories prefixed with `ttech-`. If yes, the installation succeeded and you can restart the Agent to use the SKILLs. If not, `npx skills` failed to detect your Agent and its SKILL path. In that case, run the following script:

**Linux or macOS**

```bash
cd ~/.agents/skills/
find . -maxdepth 1 -type d -name "ttech-*" -exec ln -s $PWD/{} your_agent_skill_path \;
```

**Windows**

```CMD
for /d %D in (%USERPROFILE%\.agents\skills\ttech-*) do (
  mklink /D "your_agent_skill_path\%~nxD" "%D"
)
```

Notes:
- Windows requires administrator privileges to run the above command;
- `your_agent_skill_path`: the SKILL path of your Agent. This depends on the specific Agent — please consult your Agent's manual. This document lists the SKILL paths of typical Agents: [OpenClaw SKILL path](#agent_skill_path_for_openclaw), [QoderWork SKILL path](#agent_skill_path_for_qoderwork), [Hermes SKILL path](#agent_skill_path_for_hermes), [Claude Code SKILL path](#agent_skill_path_for_claude);

<a id="agent_skill_path_for_openclaw"></a>
#### OpenClaw
OpenClaw's SKILL path defaults to the user home directory:
- Linux: `~/.openclaw/skills`, i.e. `/home/<username>/.openclaw/skills/`;
- macOS: `~/.openclaw/skills`, i.e. `/Users/<username>/.openclaw/skills/`;
- Windows: `%USERPROFILE%\.openclaw\skills`, i.e. `C:\Users\<Username>\.openclaw\skills`;

<a id="agent_skill_path_for_qoderwork"></a>
#### QoderWork
QoderWork's SKILL path defaults to the user home directory:
- Linux: `~/.qoderwork/skills`, i.e. `/home/<username>/.qoderwork/skills/`;
- macOS: `~/.qoderwork/skills`, i.e. `/Users/<username>/.qoderwork/skills/`;
- Windows: `%USERPROFILE%\.qoderwork\skills`, i.e. `C:\Users\<Username>\.qoderwork\skills`;

<a id="agent_skill_path_for_hermes"></a>
#### Hermes
Hermes's SKILL path defaults to the user home directory:
- Linux: `~/.hermes/skills`, i.e. `/home/<username>/.hermes/skills/`;
- macOS: `~/.hermes/skills`, i.e. `/Users/<username>/.hermes/skills/`;
- Windows: `%USERPROFILE%\.hermes\skills`, i.e. `C:\Users\<Username>\.hermes\skills`;

<a id="agent_skill_path_for_claude"></a>
#### Claude Code
Claude Code's SKILL path defaults to the user home directory:
- Linux: `~/.claude/skills`, i.e. `/home/<username>/.claude/skills/`;
- macOS: `~/.claude/skills`, i.e. `/Users/<username>/.claude/skills/`;
- Windows: `%USERPROFILE%\.claude\skills`, i.e. `C:\Users\<Username>\.claude\skills`;

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

### SKILLs/<skill-name> Structure
```
SKILLs/ttech-<skill-sub-name>/
├── SKILL.md          # Skill entry: YAML frontmatter + capability description + endpoint quick reference
├── skill.json        # Adapted for Hermes or other platforms requiring JSON
├── reference.md      # Detailed API parameters and response fields
├── examples.md       # Scenario-based usage examples
└── scripts/          # Shared calling scripts
```
SKILL naming conventions:
- Agent platforms targeting English environments (OpenClaw, Hermes, Claude Code, etc.): use English-based SKILLs, e.g. `ttech-query-news`;
- Agent platforms targeting Chinese environments (QoderWork, etc.): use Chinese-based SKILLs. TTech provides Chinese-enhanced versions on top of the English ones, named `ttech-<skill-sub-name>-zh`, e.g. `ttech-query-news` is paired with `ttech-query-news-zh`;

### SKILLs/packages Structure
```
SKILLs/packages/
├── scripts/          # Shared calling scripts (single source of truth)
└── sync.js           # Script synchronization tool
```

**scripts/**  
Stores scripts shared by all SKILLs, maintained in one place only. Currently contains only `call_api.js`, which uses Node.js built-in `fetch` for cross-platform RESTful API calls, avoiding the JA3 fingerprint blocking issue with macOS curl.
> Currently `scripts/` only contains `call_api.js`. Any new shared scripts added later will be automatically synchronized to all SKILLs by `sync.js`.

**sync.js**  
Synchronizes all scripts under `packages/scripts/` to each SKILL's `scripts/` directory. When executed, it automatically:
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
| `node sync.js --dry-run` | Dry run: print which files would be created/updated/deleted without writing to disk |
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
| | ⏳ Planned | Product queries | Product details and pricing across major e-commerce platforms with purchase links |

> For latest progress, please follow [Issues](https://github.com/TTech-Xin/TTech-SKILLs/issues). Feature suggestions are welcome.

---

## Development Guides

| Document | Description |
|----------|-------------|
| [API Reference (English)](Docs/API_en.md) | English version of the RESTful API specification |
| [API 接口指南（中文）](Docs/API_zh.md) | RESTful API request parameters and response fields in detail |

---

## License

This project is licensed under the [Apache License 2.0](LICENSE).

---

## Contributing

Issues and Pull Requests are welcome!

- Found inconsistencies between documentation and APIs? Please submit an [Issue](https://github.com/TTech-Xin/TTech-SKILLs/issues).
- Want to add platform support or extend SKILL functionality? Please read [CONTRIBUTING](Docs/CONTRIBUTING_en.md) first.

## Contributors
<!-- readme: contributors -start -->
<!-- readme: contributors -end -->
