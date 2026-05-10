# 贡献指南

感谢你对 TTech-SKILL 的兴趣！本指南将帮助你快速了解如何参与项目贡献。

---

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) >= 18.0（内置 `fetch`，无需额外依赖）
- [Git](https://git-scm.com/)

### 本地开发

```bash
# 1. Fork 本仓库，然后克隆到本地
git clone https://github.com/<your-username>/TTech-SKILL.git
cd TTech-SKILL

# 2. 创建特性分支
git checkout -b feature/your-feature-name

# 3. 修改 SKILL 文件或文档

# 4. 提交并推送
git commit -m "feat: 描述你的修改"
git push origin feature/your-feature-name

# 5. 提交 Pull Request
```

---

## 贡献类型

| 类型 | 说明 | 示例 |
|------|------|------|
| **新增 SKILL** | 为新的数据领域添加 SKILL 定义 | 新增 `ttech-query-weather` |
| **平台适配** | 将现有 SKILL 适配到新的 Agent 平台 | 为 Hermes / Claude Code 生成 SKILL |
| **文档改进** | 修正 API 文档、补充示例、优化 README | 更新 `reference.md` 中的参数说明 |
| **Bug 修复** | 修复脚本错误或文档与接口不一致 | 修正 `call_api.js` 的错误处理 |
| **国际化** | 为 SKILL 添加新的语言版本 | 为 `ttech-query-news` 添加日文 SKILL |

---

## 提交 Issue

### 在提交前

- 请先搜索 [现有 Issues](https://github.com/Xinhua81/TTech-SKILL/issues)，避免重复提交
- 确认问题在最新版本中仍然存在

### Bug 报告

请尽可能提供以下信息：

- **问题描述**: 简要说明遇到的问题
- **复现步骤**: 1. ... 2. ... 3. ...
- **预期结果**: 你期望发生什么
- **实际结果**: 实际发生了什么
- **环境信息**: Agent 平台 / Node.js 版本 / 操作系统
- **相关代码/日志**（如有）: 贴出相关片段

### 功能请求

- **功能描述**: 你想要什么功能
- **使用场景**: 这个功能解决什么问题
- **建议的 API 端点**（如适用）: 如果涉及新数据，建议对应的 RESTful API
- **参考链接**（如有）: 相关的资料或类似实现

---

## 提交 Pull Request

### 分支命名规范

| 类型 | 前缀 | 示例 |
|------|------|------|
| 新增功能 | `feature/` | `feature/ttech-query-weather` |
| Bug 修复 | `fix/` | `fix/openclaw-script-error` |
| 文档改进 | `docs/` | `docs/api-reference-typo` |
| 平台适配 | `platform/` | `platform/hermes-support` |

### PR 描述要求

提交 PR 时，请填写以下信息：

- **修改内容**: 简要说明做了什么修改
- **修改原因**: 为什么需要这个修改
- **影响范围**: 涉及哪些平台 / SKILL / 文档
- **测试方式**: 如何验证修改的正确性

### PR 审查流程

- 提交后，维护者会在 3 个工作日内进行审查
- 审查关注：文档准确性、格式一致性、平台兼容性
- 可能需要多轮修改，请保持关注 PR 评论并及时响应

---

## SKILL 文件编写规范

### SKILL 文件格式

每个 SKILL 入口文件必须包含 YAML frontmatter：

```yaml
---
name: ttech-query-news
author: your-name
description: 查询科技新闻，支持按时间/关键词/分类检索
---
```

**必填字段说明**：

| 字段 | 说明 | 示例 |
|------|------|------|
| `name` | SKILL 唯一标识，使用 kebab-case | `ttech-query-news` |
| `author` | 作者 GitHub 用户名 | `your-name` |
| `description` | 一句话功能描述 | `查询科技新闻...` |

**SKILL.md 正文**应包含以下章节：

1. **功能概述**: 1–2 句话说明 SKILL 能力
2. **端点速查**: 列出所有支持的 API 端点及简要说明

### reference 文件规范

- 参数表格必须包含：**名称、类型、必填、默认值、说明**
- 响应字段必须提供**示例 JSON**
- 枚举值必须列出**所有可选值及含义**

### examples 文件规范

- 每个场景提供**完整的调用命令**
- 包含**成功响应示例**（精简版，保留关键字段）
- 复杂场景需提供**参数组合说明**

---

## 脚本编写规范

### call_api.js

- 使用 Node.js **内置 `fetch`**，不引入外部 npm 依赖
- 支持 `-H` 参数传递自定义 Header
- 错误处理需输出**友好的错误信息**（中文/英文根据 SKILL 语言）
- 脚本放在 `scripts/` 目录，主副本统一维护在 `SKILLs/packages/scripts/`，通过 `sync.js` 同步到各 SKILL（详见 [README_zh.md](../README_zh.md)）

### 示例脚本结构

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
    console.error('请求失败:', err.message);
    process.exit(1);
  });
```

---

## 提交信息规范

提交信息使用以下格式：

```
<type>: <简短描述>

<可选的详细说明>
```

**类型前缀**：

| 类型 | 说明 |
|------|------|
| `feat` | 新增 SKILL 或功能 |
| `fix` | 修复 Bug |
| `docs` | 文档相关修改 |
| `style` | 格式调整（不影响功能） |
| `refactor` | 代码重构 |
| `platform` | 新增或修改平台适配 |
| `test` | 测试相关 |
| `chore` | 构建/工具相关 |

**示例**：

```
feat: 新增 ttech-query-weather SKILL
fix: 修正 OpenClaw call_api.js 错误处理
docs: 补充 QoderWork 安装说明
platform: 新增 Hermes 平台 ttech-query-news 适配
```

---

## 跨平台适配指南

### 新增平台适配步骤

1. 复制现有的 SKILL 目录（如 `ttech-query-news`）创建平台适配版本
2. 按需重命名目录（如 `ttech-query-news-hermes`）
3. 根据目标平台规范调整：
   - YAML frontmatter 中的 `platform` 字段
   - 调用方式说明（`exec` / `node` / 其他）
   - 语言版本策略（单语 / 双语）
4. 运行 `node SKILLs/packages/sync.js` 确保新 SKILL 拥有共享的 `scripts/call_api.js`
5. 更新 README_zh.md 和 README.md 中的平台支持列表
6. 提交 PR，说明适配的平台及测试方式

### 平台差异说明

| 平台 | 语言策略 | 特殊要求 |
|------|---------|---------|
| OpenClaw | 英文 | - |
| QoderWork | 中英双语 | - |
| Hermes | 英文 | - |
| Claude Code | 英文 | - |

---

## 社区规范

- **友善沟通**: 尊重不同背景和经验水平的贡献者
- **对事不对人**: 讨论技术问题，避免人身攻击
- **保持耐心**: 维护者也是志愿者，回复可能需要时间
- **使用中文或英文均可**: 选择你更擅长的语言

---

## 获取帮助

- 有疑问？请先查阅 [README.md](../README_zh.md) 和 [API 文档](api_zh.md)
- 仍有问题？提交 [Issue](https://github.com/Xinhua81/TTech-SKILL/issues) 并标注 `question` 标签

---

再次感谢你的贡献！
