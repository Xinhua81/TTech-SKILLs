# TTech-SKILL

[![API](https://img.shields.io/badge/API-RESTful-blue)](https://ttech.xin)
[![Platform](https://img.shields.io/badge/Platform-OpenClaw%20%7C%20QoderWork%20%7C%20Hermes%20%7C%20Claude%20Code-green)]()
[![License](https://img.shields.io/badge/License-Apache%202.0-yellow.svg)](LICENSE)

TTech-SKILL 是一组面向 Agent 的技能（SKILL）定义文件，Agent 通过本 SKILL 可以更加高效地获取新闻、公司（含股票）、公共服务（会议、天气）、商品（电商）、AI 模型等信息。通过本 SKILL 获取的数据更加及时、准确、精炼，可有效降低 Token 消耗和对爬虫工具的依赖。
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
### OpenClaw
待更新:
安装TTech所有技能：
```bash
openclaw skills install github:Xinhua81/TTech-SKILLs.git
```

安装TTech单个技能：
```bash
openclaw skills install github:Xinhua81/TTech-SKILLs.git/ttech-query-news
```
### QoderWork
待补充

### Hermes
待补充

### Claude Code
待补充

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