# TTech-SKILL

[![API](https://img.shields.io/badge/API-RESTful-blue)](https://ttech.xin)
[![Platform](https://img.shields.io/badge/Platform-OpenClaw%20%7C%20QoderWork%20%7C%20Hermes%20%7C%20Claude%20Code-green)]()
[![License](https://img.shields.io/badge/License-Apache%202.0-yellow.svg)](LICENSE)
![GitHub stars](https://img.shields.io/github/stars/Xinhua81/TTech-SKILLs?style=social)

TTech-SKILL 是一组面向 Agent 的技能（SKILL）文件，Agent 通过本 SKILL 可以更加高效地获取新闻、公司（含股票）、公共服务（会议、天气）、商品（电商）、AI 模型等信息。通过本 SKILL 获取的数据更加及时、准确、精炼，可有效降低 Token 消耗和对爬虫工具的依赖。
TTech-SKILL 基于[TTech.xin](https://ttech.xin/developers) 公开的 RESTful API 开发，所有 API 均为开放接口。面向开发者，TTech 支持并鼓励用户提交数据，**向所有开放世界的Agent提供有价值的数据**，提升Agent的执行效率。
[English](README.md) 

---

## 功能特性
| SKILL 名称 | SKILL 功能说明 |
|-------|--------|
| ttech-query-news | 查询新闻，当前仅支持科技类新闻 |
| ttech-query-company | 查询公司信息（含股票日线/月线/年线），当前仅支持科技类公司 |
| ttech-query-conference | 查询会议信息，当前仅支持科技类会议 |
| ttech-query-model | 查询 AI 模型的基础信息、流行度、实际调用量和能力排名、各 CSP 供应商在各地域的报价等信息，并提供价格计算器等功能 |

**重要说明**：
- 开发者可以浏览 [网站 TTech.xin](https://ttech.xin)，体验功能样例，该网站基于与SKILL相同的RESTful API开发；
- 开发者可以浏览 [网站 TTech.xin](https://ttech.xin/download)，**下载手机APP**，体验功能样例，该网站基于与SKILL相同的RESTful API开发（开发中）；
- 开发者可以登录 [网站 TTech.xin](https://ttech.xin/user)并注册用户（开发中），**然后基于注册的用户发布数据，该数据可以被各类Agent平台通过SKILL访问**，发布数据的途径或工具包括：
  - TTech.xin 网站；
  - TTech.xin 网站提供的手机 APP；
  - RESTful API；
  - 各类Agent+SKILLs；

---

## 快速开始
### 安装SKILL

**前提条件**

在安装 SKILL 之前，请关注：
- 建议先安装 Agent，然后再安装 SKILL；
- 确保你的电脑已经安装了 Node.js：
  - 在终端命令行中执行 node -v和npm -v；
  - 上述命令应当显示相应版本号，如提示不认识上述命令，请到[nodejs.org](https://nodejs.org)下载并安装Node.js（推荐V22.0.0及以上版本）；
- 安装方式1依赖最少且对所有地区有效，优先推荐；非中国大陆地区也可以采用安装方式2；中国大陆地区访问github不稳定，也可以采用安装方式3;

**安装方式1：手工下载与安装（推荐）**

第1步：到网站[TTech.xin](https://TTech.xin/downloads)下载SKILL，并解压到临时目录，如`/tmp/TTech-SKILLs`；
第2步：执行安装如下命令：
```bash
npx skills add /tmp/TTech-SKILLs -g
```
安装过程会执行如下交互：
- Select skill to install: 列出所有SKILL供用户选择，通过空格键和上下键进行选择，建议全部选择；
- Proceed with installation：询问是否执行安装操作，建议选择Yes；
- Installed N skills：汇总给出SKILL的安装情况；

npx skills命令默认将SKILL安装在 `~/.agents/skills/` 或者 `%USERPROFILE%\.agents\skills\` 目录中，并在其发现的所有Agent中建立符号链接，链接到`~/.agents/skills/<skill-name>`或者  或者 `%USERPROFILE%\.agents\skills\<skill-name>`。其中：
- `~/.agents/skills/` : npx skills 在 Linux、MacOS 环境下的安装路径；
- `%USERPROFILE%\.agents\skills\` : npx skills 在 Windows 环境下的安装路径；

**安装方式2：基于github包安装**

执行如下命令：
```
# 方案A
# 第1步：先克隆到临时目录
git clone https://github.com/Xinhua81/TTech-SKILLs.git /tmp/TTech-SKILLs
# 第2步：从本地路径安装
npx skills add /tmp/TTech-SKILLs -g
```
或者：
```bash
# 方案B
npx skills add github:TTech-Xin/TTech-SKILLs -g
# 或者
npx skills add TTech-Xin/TTech-SKILLs -g
```

注：
- 方案A和方案B的本质是一样的，都是先从github上下载SKILL包，然后通过npx skills命令安装，不过执行方案A前需要先安装git；
- 方案B中的2种命令是一样的，npx skills默认就是github；


**安装方式3：基于gitee安装**

```bash
# 第1步：先克隆到临时目录
git clone https://gitee.com/ttech-xin/ttech-skills.git /tmp/TTech-SKILLs
# 第2步：从本地路径安装
npx skills add /tmp/TTech-SKILLs -g
```
或者
```bash
npx skills add https://gitee.com:ttech-xin/ttech-skills -g
```
安装方式与方式2类似，区别是从gitee网站上下载SKILL包。

**安装方式4：Agent平台定制化安装工具**

待更新
安装TTech所有技能：
```bash
openclaw skills install github:Xinhua81/TTech-SKILLs.git
```

安装TTech单个技能：
```bash
openclaw skills install github:Xinhua81/TTech-SKILLs.git/ttech-query-news
```

### 配置Agent SKILL路径
npx skills命令安装完成后，建议检查你Agent的SKILL目录已经有ttech-开头的目录。如果有，表示安装成功，重启Agent就可以使用这些SKILL。如果没有，表示npx skills没有识别出你使用的Agent以及该Agent的SKILL路径。需要执行如下脚本：

**Linux或MacOS**

```bash
cd ~/.agents/skills/
find . -maxdepth 1 type d -name "ttech-*" -exec ln -s $(pwd)/{} your_agent_skill_path \;
```

**Windows**

```CMD
for /d %D in(D:\Projects\ttech-*) do (
  mklink /D "your_agent_skill_path\%~nxD" "%D"
)
```

注：
- Windows需要管理员权限才可执行上述命令；
- your_agent_skill_path：你Agent的SKILL路径，与具体Agent相关，请查阅你的Agent手册。本文档给出了典型Agent的SKILL路径，[OpenClaw的SKILL路径](#agent_skill_path_for_openclaw)、[QoderWork的SKILL路径](#agent_skill_path_for_qoderwork)、[Hermes的SKILL路径](#agent_skill_path_for_hermes)、[Claude Code的SKILL路径](#agent_skill_path_for_claude)；

<a id="agent_skill_path_for_openclaw"></a>
#### OpenClaw
OpenClaw 的 SKILL 路径默认在用户主目录下：
- Linux：`~/.openclaw/skills`，即`/home/<username>/.openclaw/skills/`；
- macOS：`~/.openclaw/skills`，即`/home/<username>/.openclaw/skills/`；
- Windows：`%USERPROFILE%\.openclaw\skills`，即`C:\Users\<Username>\.openclaw\skills`；

<a id="agent_skill_path_for_qoderwork"></a>
#### QoderWork
QoderWork 的 SKILL 路径默认在用户主目录下：
- Linux：`~/.qoderwork/skills`，即`/home/<username>/.qoderwork/skills/`；
- macOS：`~/.qoderwork/skills`，即`/home/<username>/.qoderwork/skills/`；
- Windows：`%USERPROFILE%\.qoderwork\skills`，即`C:\Users\<Username>\.qoderwork\skills`；

<a id="agent_skill_path_for_hermes"></a>
#### Hermes
Hermes 的 SKILL 路径默认在用户主目录下：
- Linux：`~/.hermes/skills`，即`/home/<username>/.hermes/skills/`；
- macOS：`~/.hermes/skills`，即`/home/<username>/.hermes/skills/`；
- Windows：`%USERPROFILE%\.hermes\skills`，即`C:\Users\<Username>\.hermes\skills`；

<a id="agent_skill_path_for_claude"></a>
#### Claude Code
Claude Code 的 SKILL 路径默认在用户主目录下：
- Linux：`~/.claude/skills`，即`/home/<username>/.claude/skills/`；
- macOS：`~/.claude/skills`，即`/home/<username>/.claude/skills/`；
- Windows：`%USERPROFILE%\.claude\skills`，即`C:\Users\<Username>\.claude\skills`；

---

## 项目结构
### 整体结构
```
TTech-SKILL/
├── README.md              # 英文版 README
├── README_zh.md           # 中文版 README（本文档）
├── LICENSE                # 开源协议
├── SKILLs/                # SKILL 目录，存放系列SKILL
├── Docs/                  # 开发指南与贡献规范
└── package.json           # npm 包管理
```

### SKILLs/{skill-name}结构
```
SKILLs/ttech-{skill-sub-name}/
├── SKILL.md          # 技能入口：YAML frontmatter + 能力说明 + 端点速查
├── skill.json        # 适配 Hermes 或其他需要 JSON 的平台
├── reference.md      # API 参数与响应字段详解
├── examples.md       # 场景化调用示例
└── scripts/          # 共享调用脚本
```
SKILL-NAME的组织方式：
- OpenClaw、Hermes、Claude Code等基于英文环境开发的 Agent Platform：建议采用基于英文开发的SKILL，如 `ttech-query-news`；
- QoderWork等基于中文环境开发的Agent Platform：在英文SKILL的基础上提供了中文加强版，命名规则为ttech-{skill-sub-name}-zh，如`ttech-query-news` 提供 `ttech-query-news-zh`；

### SKILLs/packages 结构
```
SKILLs/packages/
├── scripts/          # 公共调用脚本（唯一维护版本） 
└── sync.js           # 脚本同步工具
```

**scripts/**  
存放所有 SKILL 共享的脚本，开发时只维护这一份。当前仅有 `call_api.js` 脚本，该脚本基于 Node.js 内置 `fetch` 实现跨平台 RESTful API 调用，可避免 macOS 系统 curl 因 JA3 指纹被拦截的问题。

**sync.js**  
用于将 `packages/scripts/` 下的所有脚本同步到每个 SKILL 的 `scripts/` 目录中。执行时会自动：
- 创建缺失的 `scripts/` 目录；
- 替换符号链接为真实文件副本；
- 复制/更新所有主脚本文件；
- 清理目标目录中不在主脚本列表里的多余文件；
- 跳过内容已一致的文件；

支持以下命令：

| 命令 | 作用 |
|------|------|
| `node sync.js` | 执行同步：创建目录、复制/更新文件、移除符号链接 |
| `node sync.js --check` | 只检查不写入：验证所有副本与主脚本内容一致，且不存在符号链接 |
| `node sync.js --dry-run` | 模拟运行：打印哪些文件会被创建/更新/删除，但不实际写入磁盘 |
| `node sync.js --verbose` | 详细模式：同步过程中打印每个文件的处理状态（OK / Created / Updated / Removed symlink） |

---

## Roadmap

| 阶段 | 状态 | 功能 | 说明 |
|------|------|------|------|
| **v1.0** | ✅ 已完成 | 4 大 SKILL | `news` / `company` / `conference` / `model` |
| | ✅ 已完成 | OpenClaw、QoderWork 适配 | 基础安装与调用支持 |
| | ✅ 已完成 | RESTful API 文档 | 中英双语 API 规范 |
| **v1.1** | 🔄 进行中 | Hermes / Claude Code 适配 | 平台兼容性优化与验证 |
| | 🔄 进行中 | 用户体系 | 注册、激励与数据维护 |
| | 🔄 进行中 | 数据提交渠道 | 用户数据提交、校验与质量机制 |
| **v1.2** | ⏳ 计划中 | News 扩展 | 从科技新闻扩展至时政、财经和体育 |
| | ⏳ 计划中 | 天气查询 | 全球天气查询 |
| | ⏳ 计划中 | 公司扩展 | 从科技公司扩展至世界 500 强及中型企业 |
| | ⏳ 计划中 | 公司信息完备化 | 从基础信息扩展至公司完备信息 |
| | ⏳ 计划中 | 商品查询 | 商品详情与各主流电商平台价格及购买路径 |

> 最新进展请关注 [Issues](https://github.com/Xinhua81/TTech-SKILL/issues)，欢迎提交功能建议。 

---

## 开发指南

| 文档 | 说明 |
|------|------|
| [API 接口指南（中文）](Docs/api_zh.md) | RESTful API 请求参数与响应字段详解 |
| [API Reference（English）](Docs/api_en.md) | English version of API specification |

---

## 开源协议

本项目采用 [Apache License 2.0](LICENSE)。

---

## 贡献指南

欢迎提交 Issue 和 Pull Request！

- 发现文档与接口不一致？请提交 [Issue](https://github.com/Xinhua81/TTech-SKILL/issues)。
- 想新增平台适配或扩展 SKILL 功能？请先阅读 [CONTRIBUTING](Docs/CONTRIBUTING_zh.md)。

## 贡献者
<!-- readme: contributors -start -->
<!-- readme: contributors -end -->
