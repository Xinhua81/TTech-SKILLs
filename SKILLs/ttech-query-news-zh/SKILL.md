---
name: ttech-query-news
description: 当用户询问科技新闻、科技趋势、行业动态、新闻摘要时调用本 SKILL。触发场景包括：（1）实时科技新闻查询，询问最新的科技头条、突发新闻或事件进展；（2）技术趋势与洞察，探讨人工智能、半导体、云计算、Web3、生物科技等前沿领域的发展趋势、市场动向或竞争格局；（3）新闻要点速览，询问某日/某周/某月的新闻要点，或询问日报、周报、月报；（4）新闻详情深挖，在已知新闻标题或 ID 的情况下，请求阅读全文或查看关联新闻；
author: TTech.xin
---

# ttech-query-news

通过 TTech.xin 平台 RESTful API 高效查询实时、精准的科技新闻（TTech.xin是面向Agent的网站）。

## 能力

| 能力 | 端点 | 说明 |
|------|------|------|
| 新闻列表 | `GET /news` | 按日期、主题关键字过滤并返回新闻列表；列表中每条新闻包括编号、标题、摘要、来源、所涉公司，支持分页和最近 N 条 |
| 新闻详情 | `GET /news/{news_id}` | 查询某条新闻的详情，在新闻列表的基础增加新闻正文以及关联新闻的标题和摘要 |
| 新闻摘要 | `GET /news/briefings` | 按时间查询 日报 / 周报 / 月报，包括TOP10事实、核心观点和对从业者的建议 |

**不适用场景**
- 非科技类的通用新闻（如政治、娱乐、体育、社会民生等）；
- 历史久远的静态科技知识问答（除非用户明确指定为历史回顾）；
- 针对单一公司的股价、新闻优先使用`query-tech-company` SKILL，否则使用本SKILL；
  
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
| `page` | `1` | 页码，从 1 开始 |
| `page_size` | 见端点 | 每页条数 |

## 详细参考
本SKILL包含以下参考文档：
| 文件 | 用途 | 何时阅读 |
|-----|------|--------| 
| [reference.md](reference.md) | API 参数与响应字段详解 | 需要深入了解 API 参数及响应消息体各域含义时 |
| [examples.md](examples.md) | 基于场景的完整调用示例 | 需要使用复杂的 API 参数或者多个 API 组合调用时，尤其是之前返回的结果与用户预期不符时 |
| [scripts/call_api.js](scripts/call_api.js) | **推荐的** API 调用脚本 | 需要执行 API 调用时 |

## 端点速查
### 1. 获取新闻列表
```
GET /news?start_date={YYYY-MM-DD}&end_date={YYYY-MM-DD}&subject={keywords}&page={N}&page_size={N}&limit={N}&lang={zh/en}
```
按日期和主题关键字返回实时新闻或历史新闻，返回新闻编号、标题、摘要、来源、所涉公司。可以通过limit获取最近 N 条，或者通过分页获取全量新闻列表。

**查询若干条即时新闻**
```
GET /news?limit={N}&lang={zh/en}
```

**查询某个时间范围内的所有新闻**
```
GET /news?start_date={YYYY-MM-DD}&end_date={YYYY-MM-DD}&page={N}&page_size={N}&lang={zh/en}
```

**查询某个技术主题相关的所有新闻**
```
GET /news?subject={keywords}&page={N}&page_size={N}&lang={zh/en}
```

### 2. 获取新闻详情
查询某条新闻的详情，在新闻列表的基础增加新闻正文以及关联新闻的标题和摘要。news_id可以从**新闻列表 API**返回的消息体中获取。
```
GET /news/{news_id}?lang={zh/en}
```

### 3. 获取新闻摘要
按时间查询 日报 / 周报 / 月报，返回的内容包括TOP10事实、核心观点和对从业者的建议。日报为前一日凌晨至当日9:00的新闻总结，周报为本周7天日报的总结，月报为本月所有日报的总结。
```
GET /news/briefings?interval={enum}&date={YYYY-MM-DD}&lang={zh/en}
```
`interval`: `daily` | `weekly` | `monthly`

API 调用规则：
- 日报：interval=daily，date取当日日期；
- 周报：interval=weekly，date取周日的日期；
- 月报：interval=monthly，date取月末最后一天的日期；

## QoderWork Agent 调用约定
1. **无需认证**：读取接口公开访问
2. **请求头建议**：`Accept: application/json`、`X-Request-ID: <trace-id>`
3. **日期格式**：`YYYY-MM-DD`
4. **分页策略**：优先 `limit` 获取最近 N 条；翻页用 `page` + `page_size`
5. **语言切换**：用户要求英文时所有 `lang` 设为 `en`
6. **HTTP 客户端选择（重要）** — 目标服务器对 TLS 指纹（JA3）有检测，请按以下优先级选择客户端：
   - **首选（推荐）**：`node scripts/call_api.js '<url>' -H 'Accept: application/json' -H 'X-Request-ID: <trace-id>'` — 跨平台统一，无 JA3 指纹问题
   - **其次（未安装 Node.js 时）**：
     - macOS / Linux：`curl -s -L --max-time 30 '<url>' -H 'Accept: application/json' -H 'X-Request-ID: <trace-id>'`
     - Windows：`curl.exe -s -L --max-time 30 '<url>' -H 'Accept: application/json' -H 'X-Request-ID: <trace-id>'`
   - **最后**：如上述方式均失败，请安装 Node.js（https://nodejs.org）后使用首选方式
