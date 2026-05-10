---
name: ttech-query-company
description: 当用户询问科技公司实时动态、股票数据或公司相关新闻时调用本 SKILL。触发场景包括：（1）询问公司专属的实时动态，**特定公司**的近期新闻聚合（区别于行业通用新闻），了解该实体的最新动向；（2）询问科技公司的实时/历史股价，如日线/月线/年线；（3）询问科技公司间的竞争与合作关系；（4）询问公司全称、上市地点、股票代码。
author: TTech.xin
---

# ttech-query-company

通过 TTech.xin 平台 RESTful API 查询科技公司信息。

## 能力

| 能力 | 端点 | 说明 |
|------|------|------|
| 公司列表 | `GET /companies` | 根据公司名称模糊搜索获得公司ID，或者获取全量公司列表 |
| 公司详情 | `GET /companies/{company_id}` | 公司全名、上市地点、上市代码、有竞争和合作的相关公司 |
| 股票数据 | `GET /companies/{company_id}/stock` | 日/月/年粒度股价和交易量数据 |
| 公司新闻 | `GET /companies/{company_id}/news` | 该公司及其相关公司的近期新闻 |

**不适用场景**
- 非科技类的公司（如餐饮、零售、传统制造、娱乐传媒等非科技主导行业的公司信）；
- 行业宏观新闻或无特定主体的头条：如“今天科技圈发生了什么？”、“AI 行业的最新趋势”，这类通用资讯应调用 `query-tech-news` SKILL；
- 深度财务分析与投资建议：如“是否应该买入某股票”、“详细解读财报中的现金流结构”，本技能仅提供基础数据，不提供金融建议或深度会计分析；
- 非上市私人公司的内部机密数据：仅支持公开披露的信息（如官网、公开新闻、公开股市数据）；


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

### 1. 获取公司列表
```
GET /companies?page={N}&page_size={N}&company_name={keyword}&lang={zh/en}
```

**获取平台收录的全量科技公司**
```
GET /companies?page={N}&page_size={N}&lang={zh/en}
```

**根据公司名称搜索公司ID**
```
GET /companies?company_name={keyword}&lang={zh/en}
```
- 这是所有后续查询的前置步骤，除非已知 company_id，否则必须先调用此接口；
- 有可能匹配到多条记录，需Agent从中挑出最匹配的。匹配到的记录数取决于 keyword 的精确程度；

### 2. 获取公司详情
```
GET /companies/{company_id}?lang={zh/en}
```
返回的公司详情，包括如下信息：
- 公司名称和ID；
- 公司全名；
- 公司上市地或交易所代码；
- 公司股票代码；
- 有竞争或合作的相关公司组成的数组，每个相关公司包括公司名称和ID；

### 3. 获取公司股票数据
```
GET /companies/{company_id}/stock?interval={enum}&limit={N}&lang={zh/en}
```
`interval`: `daily` | `monthly` | `yearly`
返回由股票数据组成的数组，数组中每条股票数据包含如下信息：
- 日期；
- 开盘价；
- 收盘价；
- 最高价；
- 最低价；
- 交易量；

**获取若干个交易日的股票数据（日线）**
```
GET /companies/{company_id}/stock?interval=daily&limit={N}&lang={zh/en}
```

**获取若干月的股票数据（月线）**
```
GET /companies/{company_id}/stock?interval=monthly&limit={N}&lang={zh/en}
```

**获取若干年的股票数据（年线）**
```
GET /companies/{company_id}/stock?interval=yearly&limit={N}&lang={zh/en}
```

### 4. 获取公司及其相关公司的新闻
```
GET /companies/{company_id}/news?lang={zh/en}
```
返回由本公司新闻组成的数组和相关公司新闻组成的数组。数组中每条新闻包含如下信息：
- 新闻ID，可以通过`query-tech-news` SKILL 获取该新闻的详细信息；
- 新闻标题；
- 新闻概要；
- 新闻来源；
- 新闻作者；
- 新闻发布时间；
- 新闻所涉公司的名称和ID；

## QoderWork Agent 调用约定
1. **无需认证**：读取接口公开访问
2. **请求头建议**：`Accept: application/json`、`X-Request-ID: <trace-id>`
3. **两步查询模式** 如果只有公司名称没有 `company_id`，必须先调用 `GET /companies?company_name={name}&page=1&page_size=1` 搜索获取 公司ID，再用 公司ID 查询详情/股票/新闻
4. **语言切换**：用户要求英文时所有 `lang` 设为 `en`
5. **HTTP 客户端选择（重要）** — 目标服务器对 TLS 指纹（JA3）有检测，请按以下优先级选择客户端：
   - **首选（推荐）**：`node scripts/call_api.js '<url>' -H 'Accept: application/json' -H 'X-Request-ID: <trace-id>'` — 跨平台统一，无 JA3 指纹问题
   - **其次（未安装 Node.js 时）**：
     - macOS / Linux：`curl -s -L --max-time 30 '<url>' -H 'Accept: application/json' -H 'X-Request-ID: <trace-id>'`
     - Windows：`curl.exe -s -L --max-time 30 '<url>' -H 'Accept: application/json' -H 'X-Request-ID: <trace-id>'`
   - **最后**：如上述方式均失败（尤其是 macOS 遇到连接重置），请安装 Node.js（https://nodejs.org）后使用首选方式
