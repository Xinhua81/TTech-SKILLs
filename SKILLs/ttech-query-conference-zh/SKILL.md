---
name: ttech-query-conference
description: 当用户询问科技会议、行业大会、发布会或展会信息时调用本 SKILL。触发场景包括：（1）按时间询问会议议程，如今年5月有哪些科技会议，近期/本月/下个月有哪些会议；（2）按会议类型询问会议议程，如今年有哪些学术会议/企业会议/综合性会议/区域性会议；（3）按主办方询问会议议程，如Nvidia/Google/Huawei/Alibaba的会议在哪天举行；（4）按会议关键词询问会议议程，如今年GTC/华为全连接大会/阿里云栖打会在哪天举行。
author: TTech.xin
---

# ttech-query-conference

通过 TTech.xin 平台 RESTful API 查询科技会议信息。

## 能力

| 能力 | 端点 | 说明 |
|------|------|------|
| 会议议程 | `GET /conferences` | 按年份、月份、类型、名称、主办方查询会议议程列表 |
| 元数据（会议类型） | `GET /conferences/types` | 获取平台收录的所有会议类型 |

**不适用场景**
- 非科技类的通用会展信息（如艺术展、车展、漫展等非技术导向活动，除非明确涉及科技板块）；
- 纯学术论文检索或期刊发表查询（应调用 academic-search 相关技能）；
- 非公开的行业闭门会议（除非有公开报道）；

## 通用约定

**Base URL**: `https://ttech.xin/api/v1.0`

**响应格式**：
```json
{
  "code": 0,
  "message": "success",
  "data": { ... },
  "meta": { "request_id": "...", "timestamp": 1713423456789 }
}
```

**通用参数**：

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `lang` | `zh` | `zh` / `en` |

## 详细参考
本SKILL包含以下参考文档：
| 文件 | 用途 | 何时阅读 |
|-----|------|--------| 
| [reference.md](reference.md) | API 参数与响应字段详解 | 需要深入了解 API 参数及响应消息体各域含义时 |
| [examples.md](examples.md) | 基于场景的完整调用示例 | 需要使用复杂的 API 参数或者多个 API 组合调用时，尤其是之前返回的结果与用户预期不符时 |
| [scripts/call_api.js](scripts/call_api.js) | **推荐的** API 调用脚本 | 需要执行 API 调用时 |

## 端点速查

### 1. 获取会议类型列表
```
GET /conferences/types?lang={zh/en}
```
返回会议类型名称和会议类型ID的映射列表。

### 2. 查询会议议程
```
GET /conferences?year={YYYY}&month={MM}&type_id={ID,ID,...}&conf_name={keywords}&conf_org={keywords}&lang={zh/en}
```
`month`: `0` 表示全年，`1–12` 表示特定月份
返回多个条件组合过滤后的会议议程。过滤条件可以是：
- 会议类型；
- 会议名称；
- 会议组织方；

## QoderWork Agent 调用约定
1. **无需认证**：读取接口公开访问
2. **请求头建议**：`Accept: application/json`、`X-Request-ID: <trace-id>`
3. **日期格式**：`YYYY-MM-DD`
4. **语言切换**：用户要求英文时所有 `lang` 设为 `en`
5. **两步查询模式**：如果没有 `type_id`，先调用 `/conferences/types?lang=zh` 获取 type_id列表，再用合适 type_id 查询对应类别的会议议程
6. **HTTP 客户端选择（重要）** — 目标服务器对 TLS 指纹（JA3）有检测，请按以下优先级选择客户端：
   - **首选（推荐）**：`node scripts/call_api.js '<url>' -H 'Accept: application/json' -H 'X-Request-ID: <trace-id>'` — 跨平台统一，无 JA3 指纹问题
   - **其次（未安装 Node.js 时）**：
     - macOS / Linux：`curl -s -L --max-time 30 '<url>' -H 'Accept: application/json' -H 'X-Request-ID: <trace-id>'`
     - Windows：`curl.exe -s -L --max-time 30 '<url>' -H 'Accept: application/json' -H 'X-Request-ID: <trace-id>'`
   - **最后**：如上述方式均失败（尤其是 macOS 遇到连接重置），请安装 Node.js（https://nodejs.org）后使用首选方式