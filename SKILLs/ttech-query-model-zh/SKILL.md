---
name: ttech-query-model
description: 当用户询问 AI 模型基础档案、API 定价、API 服务范围、API 供应商、成本/能力/调用量/流行度排名时调用本 SKILL。 触发场景包括：（1）查询模型基础画像，包括模型的类别/参数尺寸/Intelligence Index/Coding Index/Agentic Index/上下文大小/模型品牌/是否开源/发布时间/开发公司/API 服务提供商列表/API 服务地区列表/模型官网地址/模型详细能力介绍；（2）多维能力评估，获取模型的 Intelligence Index（智能指数）、Coding Index（编码指数）、Agentic Index（代理指数）等专业评测数据；（3）API 定价与成本，查询各服务商在不同地区的 API 报价、输入/输出 Token 的价格，或使用价格计算器估算特定任务的总成本；（4）模型排行榜与对比，基于成本、智能指数、编码指数、代理指数、上下文长度、流行度或调用量对模型或品牌进行排名和横向对比。
author: TTech.xin
---

# ttech-query-model

通过 TTech.xin 平台 RESTful API 查询 AI 模型信息。

## 功能概述

| 功能 | 端点 | 说明 |
|------|------|------|
| 元数据 | `GET /modelmp/categories`、`GET /modelmp/sizes` 等 | 查询类别、参数尺寸、模型品牌、API 服务提供商（CSP）、地区枚举值及对应的 ID |
| 模型列表 | `GET /modelmp/models` | 查询并返回模型列表，多条件过滤（类别/尺寸/品牌/名称/是否开源），支持分页 |
| 模型详情 | `GET /modelmp/models/{model_id}` | 模型的完整信息、能力指数、服务商（CSP） |
| 价格查询 | `GET /modelmp/prices` | 各模型在各地区API 服务提供商的报价 |
| 成本排名（价格计算器） | `GET /modelmp/prices/cost-rankings` | 输入Token、输出Token和API调用次数，计算总成本并排名 |
| 模型能力排名 | `GET /modelmp/model-rankings` | 按智能指数/编码指数/Agentic指数/上下文大小或模型调用量排名 |
| 模型品牌排名 | `GET /modelmp/brand-rankings` | 按流行度或调用量对模型品牌排名 |

**不适用场景**
- 模型相关的科技会议：如询问AI相关科技会议，请调用`query-tech-conference` SKILL；
- 模型相关的科技新闻资讯：如询问AI的技术趋势，请调用`query-tech-news` SKILL；
- 模型相关的单个公司画像：如询问阿里巴巴是一家怎样的公司，请调用`query-tech-company` SKILL；
- 抽象理论与伦理探讨：询问“什么是人工智能”、“AI 是否会取代人类”等哲学、伦理或基础科普问题，而非具体模型的数据查询；

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
| `page_size` | `100` | 每页条数，1–300 |

## 详细参考
本SKILL包含以下参考文档：
| 文件 | 用途 | 何时阅读 |
|-----|------|--------| 
| [reference.md](reference.md) | API 参数与响应字段详解 | 需要深入了解 API 参数及响应消息体各域含义时 |
| [examples.md](examples.md) | 基于场景的完整调用示例 | 需要使用复杂的 API 参数或者多个 API 组合调用时，尤其是之前返回的结果与用户预期不符时 |
| [scripts/call_api.js](scripts/call_api.js) | **推荐的** API 调用脚本 | 需要执行 API 调用时 |

## 端点速查

### 1. 获取元数据
```
GET /modelmp/categories?lang={zh/en}
GET /modelmp/sizes?lang={zh/en}
GET /modelmp/brands?brand_name={keyword}&lang={zh/en}
GET /modelmp/csps?lang={zh/en}
GET /modelmp/regions?lang={zh/en}
```
查询类别、参数尺寸、模型品牌、API 服务提供商（CSP）、地区枚举值及对应的 ID，**用于后继基于元数据进行过滤查询**。
模型品牌 API 除了返回枚举值和对应的 ID 之外，还提供品牌归属的公司名和公司 ID (对应`query-tech-company` SKILL)及品牌官方网站。

### 2. 获取模型列表
```
GET /modelmp/models?category_id={ID,ID,...}&size_id={ID,ID,...}&model_id={ID,ID,...}&model_name={keyword,keyword,...}&brand_id={ID,ID,...}&opensource={false/true}&page={N}&page_size={N}&lang={zh/en}
```
根据输入的多个条件组合过滤并返回符合条件的模型列表，每个条件支持多个过滤值。

支持的过滤条件包括：
- 类别ID；
- 参数尺寸ID；
- 模型ID；
- 模型名称；
- 模型品牌ID；
- 是否开源；

过滤条件中的元数据ID，可以通过**获取元数据**中的API获得。

返回的模型列表中的每个模型包含如下信息：
- 模型的ID和名称；
- 类别ID和名称；
- 参数尺寸ID和具体参数尺寸值；
- 是否开源；
- 智能指数、编码指数、代理指数；
- 上下文大小；
- 发布日期；
- 归属的模型品牌ID和模型品牌名称；
- 提供模型 API 服务商列表，每个 API 服务商包括ID和名称；

### 3. 获取模型的详情
```
GET /modelmp/models/{model_id}?lang={zh/en}
```
输入模型ID，返回对应模型的详细信息。详细信息在模型列表 API 的基础上增加如下内容：
- 模型的官网地址；
- 开发模型的公司ID（对应query-tech-company SKILL）；
- 开发模型的公司名称（对应query-tech-company SKILL）；
- 模型的详细介绍，采用MarkDown格式；

### 4. 获取各API服务商（CSP）的模型价格列表
```
GET /modelmp/prices?category_id={ID,ID,...}&region_id={ID,ID,...}&model_id={ID,ID,...}&page={N}&page_size={N}&lang={zh/en}
```
根据输入的多个条件组合过滤，并返回符合条件的各CSP模型报价列表，每个条件支持多个过滤值。

支持的过滤条件包括：
- 类别ID；
- 地区ID；
- 模型ID；

过滤条件中的元数据ID，可以通过**获取元数据**中的API获得。

返回的价格列表中的每条报价包含如下信息：
- 模型ID和模型名称；
- 地区ID和地区名称；
- API 服务商（CSP）的ID和名称；
- 价格条件或约束；
- 输入 Token 的单价（单位：每百万Token）；
- 输出 Token 的单价（单位：每百万Token）；
- 货币单位；
- 额外信息，用于对报价的例外说明；

### 5. 获取成本排名（价格计算器）
```
GET /modelmp/prices/cost-rankings?input_tokens={N}&output_tokens={N}&api_calls={N}&exchange_rate={N}&target_currency={CNY/USD}&category_id={ID,ID,...}&size_id={ID,ID,...}&region_id={ID,ID,...}&model_id={ID,ID,...}&brand_id={ID,ID,...}&opensource={true/false}&sort={enum}&page={N}&page_size={N}&lang={zh/en}
```
`sort`: `total_cost` | `-total_cost` | `cost_per_call` | `-cost_per_call` | `input_price` | `-input_price` | `output_price` | `-output_price`

根据输入的 API 调用模式、组合过滤条件和汇率，计算出满足过滤条件的模型的单次 API 调用成本和端到端总成本，并按成本进行排名。

API 调用模式，包括如下参数：
- 单次 API 调用的输入 Token 数；
- 单次 API 调用的输出 Token 数；
- API 调用总数；

组合过滤条件支持多个条件组合，每个条件支持多个过滤值。支持的过滤条件包括：
- 类别ID；
- 参数尺寸ID；
- 地区ID；
- 模型ID；
- 品牌ID；
- 是否开源；

可以通过exchange_rate指定美元对人民币汇率，也可以不指定，由系统根据实时汇率自动计算。

返回的每条记录包括：
- 模型ID和模型名称；
- 类别名称；
- 模型的参数尺寸值；
- 模型品牌名；
- 报价的 API 服务商（CSP）名称；
- 地区名称；
- 价格条件或约束；
- 输入 Token 的单价（单位：每百万Token）；
- 输出 Token 的单价（单位：每百万Token）；
- 价格货币单位；
- 单次 API 调用成本，货币单位由调用参数 target_currency 指定；
- 总调用成本，货币单位由调用参数 target_currency 指定；
- 本次排名的名次；

### 6. 对模型按能力和调用量排名
```
GET /modelmp/model-rankings?type={enum}&opensource={true/false}&topN={N}&date={YYYY-MM-DD}&range={enum}&lang={zh/en}
```
`type`: `intelligence_index` | `code_index` | `agentic_index` | `context_size` | `usage`
`range`: `1` | `7` | `14` | `30`

**按智能指数对模型进行排名**
区分是否开源：
```
GET /modelmp/model-rankings?type=intelligence_index&opensource={true/false}&topN={N}&lang={zh/en}
```

不区分是否开源：
```
GET /modelmp/model-rankings?type=intelligence_index&topN={N}&lang={zh/en}
```

**按编码指数对模型进行排名**
区分是否开源：
```
GET /modelmp/model-rankings?type=code_index&opensource={true/false}&topN={N}&lang={zh/en}
```

不区分是否开源：
```
GET /modelmp/model-rankings?type=code_index&topN={N}&lang={zh/en}
```

**按代理指数对模型进行排名**
区分是否开源：
```
GET /modelmp/model-rankings?type=agentic_index&opensource={true/false}&topN={N}&lang={zh/en}
```

不区分是否开源：
```
GET /modelmp/model-rankings?type=agentic_index&topN={N}&lang={zh/en}
```

**按上下文大小对模型进行排名**
区分是否开源：
```
GET /modelmp/model-rankings?type=context_size&opensource={true/false}&topN={N}&lang={zh/en}
```

不区分是否开源：
```
GET /modelmp/model-rankings?type=context_size&topN={N}&lang={zh/en}
```

**按模型调用量对模型进行排名**
基于指定日期 (date) 向前回溯指定天数 (range)，统计该时间窗口内的模型调用量汇总，并按调用量排名：
```
GET /modelmp/model-rankings?type=usage&date={YYYY-MM-DD}&range={N}&topN={N}&lang={zh/en}
```

### 7. 获取模型品牌排名
```
GET /modelmp/brand-rankings?type={popularity/usage}&date={YYYY-MM-DD}&range={enum}&topN={N}&lang={zh/en}
```
`range`: `1` | `7` | `14` | `30`

**按流行度对模型品牌进行排名**
基于指定月份（date）的模型品牌流行度排名：
```
GET /modelmp/brand-rankings?type=popularity&date={YYYY-MM}&topN={N}&lang={zh/en}
```

**按调用量对模型品牌进行排名**
基于指定日期 (date) 向前回溯指定天数 (range)，统计该时间窗口内的模型品牌调用量汇总，并按调用量排名：
```
GET /modelmp/brand-rankings?type=usage&date={YYYY-MM-DD}&range={enum}&topN={N}&lang={zh/en}
```

## QoderWork Agent 调用约定
1. **无需认证**：读取接口公开访问
2. **请求头建议**：`Accept: application/json`、`X-Request-ID: <trace-id>`
3. **多值参数**：过滤条件支持逗号分隔多值，如 `category_id=1,2,3`
4. **语言切换**：用户要求英文时所有 `lang` 设为 `en`
5. **两步查询模式** 如果需要的元数据值与ID映射缺失，必须先调用元数据 API 获得映射数据，然后再通过 ID 调用相应的 API ，如 类别、参数尺寸、模型品牌、API 服务提供商（CSP）、地区枚举值及对应的 ID；
6. **HTTP 客户端选择（重要）** — 目标服务器对 TLS 指纹（JA3）有检测，请按以下优先级选择客户端：
   - **首选（推荐）**：`node scripts/call_api.js '<url>' -H 'Accept: application/json' -H 'X-Request-ID: <trace-id>'` — 跨平台统一，无 JA3 指纹问题
   - **其次（未安装 Node.js 时）**：
     - macOS / Linux：`curl -s -L --max-time 30 '<url>' -H 'Accept: application/json' -H 'X-Request-ID: <trace-id>'`
     - Windows：`curl.exe -s -L --max-time 30 '<url>' -H 'Accept: application/json' -H 'X-Request-ID: <trace-id>'`
   - **最后**：如上述方式均失败（尤其是 macOS 遇到连接重置），请安装 Node.js（https://nodejs.org）后使用首选方式
