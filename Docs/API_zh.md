# TTech.xin RESTful API 规范

本文档定义TTech.xin提供的API规范及详细参数，方便AI Agent和三方用户调用API查询科技新闻、科技公司股票、科技会议和大模型等科技类信息。

科技新闻支持：
- 按时间浏览科技新闻；
- 按关键词搜索并浏览相关科技新闻；
- 按时间查已经总结过的科技新闻日报、周报和月报；

科技公司支持：
- 查某个公司的历史新闻和关联公司的新闻；
- 按日、月或年的维度查某个公司的股票数据；

科技会议支持：
- 按时间查询科技会议的主题、组织方、开始时间、结束时间、举办地点、会议网址等信息；
- 支持按会议类型进行过滤，如企业级会议、学术会议、综合性会议、区域性会议等；

模型市场支持：
- 按照多个维度查询和过滤模型，维度包括模型类别、模型参数尺寸、是否开源、品牌等；
- 查询模型的详细信息，包括模型名称、模型类别、模型参数尺寸、智能Index、编码Index、Agentic Index、上下文大小、发布时间、是否开源、模型品牌、API服务提供商、API服务覆盖的地区、官方网站、模型的详细描述等；
- 获得按照智能Index、编码Index、Agentic Index、上下文大小、调用量等维度进行的模型排名；
- 获得按照流行度、调用等维度进行的模型品牌排名；
- 查明各模型API服务商在各地区对各模型的报价，可以按模型类别、模型参数尺寸、服务地区等维度进行过滤；

## 总体设计

### Base URL
```
/api/v1.0
```

### 设计原则
1. **资源导向**：URL 表示资源，使用名词复数形式
2. **HTTP 方法表示动作**：
   - `GET` — 读取资源
   - `POST` — 创建资源
   - `PUT/PATCH` — 更新资源
   - `DELETE` — 删除资源
3. **路径参数标识资源**：`/resources/{id}`
4. **查询参数用于过滤、分页、排序**

### API 响应

```json
{
    "code": 0,
    "message": "success",
    "data": {},
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```
API响应的整体结构如下：
| 字段 | 类型 | 说明 |
|------|------|------|
| code | integer | 响应码，0表示成功，非0表示错误码，各错误码的详细含义将在后继章节详细展开|
| message | string | 响应消息的描述，成功时一般为success，失败时提供详细的失败信息 |
| data | object | 嵌套的JSON对象，用于返回请求的用户数据，不同API请求对应不同的结构。失败时为null |
| meta | object | meta对象主要包含请求消息中的关键信息，方便调用者调试代码 |

meta的主要域成员如下：
| 字段 | 类型 | 说明 |
|------|------|------|
| request_id | string | 等于请求消息体中的request_id|
| timestamp | integer | 等于请求消息体中的timestamp|

---

## 新闻 (News)

### 获取新闻列表
**功能描述**
返回某个时间范围内的新闻列表，列表中的每条新闻信息包括标题、概要、发布时间、来源、作者和关联公司，列表按照新闻发布时间倒序返回。

```
GET /api/v1.0/news
```
| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| start_date | 否 | - | date | 开始日期，YYYY-MM-DD；无时间参数，则不对时间做过滤 |
| end_date | 否 | - | date | 结束日期，YYYY-MM-DD；无时间参数，则不对时间做过滤 |
| subject | 否 | - | string | 按照主题关键字进行过滤，大小写不敏感  |
| company_id | 否 | - | integer | 按照公司进行过滤 |
| lang | 否 | zh | string | 语言：zh/en |
| page | 否 | 1 | integer | 页码 |
| page_size | 否 | 20 | integer | 每页条数，1-100 |
| limit | 否 | - | integer | 最近N条，1-100，limit 和 page+page_size 二选一 |

**请求示例**:
GET /api/v1.0/news?start_date=2026-04-19&end_date=2026-04-19&lang=zh&page=1&page_size=20

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "news": [
            {
                "news_id": 1001,
                "title": "第一条新闻的标题",
                "summary": "第一条新闻的摘要",
                "source": "第一条新闻的来源",
                "author": "第一条新闻的作者",
                "publish_time": "2024-04-19T10:30:00Z",
                "company_name": "新闻内容主要涉及哪家公司",
                "company_id": 0
            },
            {
                "news_id": 1002,
                "title": "第二条新闻的标题",
                "summary": "第二条新闻的摘要",
                "source": "第二条新闻的来源",
                "author": "第二条新闻的作者",
                "publish_time": "2024-04-19T10:30:00Z",
                "company_name": "新闻内容主要涉及哪家公司",
                "company_id": 0
            }
            // ... 更多新闻对象
        ],
        "pagination": {
            "page": 1,
            "page_size": 20,
            "total": 156,
            "total_pages": 8,
            "has_more": true
        }
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:

data.news 为新闻对象数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| news_id | integer | 新闻唯一ID |
| title | string | 新闻标题 |
| summary | string | 新闻摘要，一般小于256字符 |
| source | string | 新闻来源 |
| author | string | 新闻作者 |
| publish_time | string(datetime) ISO 8601 | 发布时间 |
| company_name | string | 新闻主要涉及的公司 |
| company_id | integer | 公司唯一ID |

data.pagination 为分页信息（limit 模式下为 null）：
| 字段 | 类型 | 说明 |
|------|------|------|
| page | integer | 当前页码，从1开始 |
| page_size | integer | 每页条数 |
| total | integer | 总条数 |
| total_pages | integer | 总页数 |
| has_more | boolean | true 表示还有下一页 |

---

### 获取新闻详情
**功能描述**
返回某条新闻的详细内容，包括标题、概要、发布时间、来源、作者、内容、关联公司、原始URL以及相关新闻，相关新闻是一个列表，列表中的每条相关新闻包括标题、概要、发布时间、来源、作者、关联公司等。

```
GET /api/v1.0/news/{news_id}
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| news_id | 是（路径参数） | - | integer | 新闻唯一ID |
| lang | 否 | zh | string | 语言：zh/en |

**请求示例**:
GET /api/v1.0/news/1001?lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "news": {
            "news_id": 1001,
            "title": "新闻标题",
            "summary": "新闻摘要",
            "source": "新闻来源",
            "author": "新闻作者",
            "publish_time": "2024-04-19T10:30:00Z",
            "company_name": "新闻内容主要涉及哪家公司",
            "company_id": 0,
            "content": "新闻的详细内容",
            "url": "新闻的原始URL"
        },
        "related_news": [
            {
                "news_id": 2002,
                "title": "新闻标题",
                "source": "新闻来源",
                "publish_time": "2024-04-19T11:30:00Z",
                "company_name": "新闻内容主要涉及哪家公司",
                "company_id": 0
            }
            // ... 更多相关新闻对象
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:

data.news 为新闻详情对象：
| 字段 | 类型 | 说明 |
|------|------|------|
| news_id | integer | 新闻唯一ID |
| title | string | 新闻标题 |
| summary | string | 新闻摘要 |
| source | string | 新闻来源 |
| author | string | 新闻作者 |
| publish_time | string(datetime) ISO 8601 | 发布时间 |
| company_name | string | 主要涉及公司 |
| company_id | integer | 公司唯一ID |
| content | string | 新闻详细内容 |
| url | string(URL) | 原始链接 |

data.related_news 为相关新闻数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| news_id | integer | 新闻唯一ID |
| title | string | 新闻标题 |
| source | string | 新闻来源 |
| publish_time | string(datetime) ISO 8601 | 发布时间 |
| company_name | string | 所涉公司的名称 |
| company_id | integer | 所涉公司的ID |

---

### 获取新闻日报/周报/月报
**功能描述**
返回日报、周报或月报。日报是对前一日凌晨至当日9：00前的新闻总结。周报和月报是对应周或月的新闻总结。

```
GET /api/v1.0/news/briefings
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| lang | 否 | zh | string | 语言：zh/en |
| interval | 否 | daily | string | daily/weekly/monthly |
| date | 否 | 当日 | date | 日期，周报取周日，月报取月末 |

**请求示例**:
GET /api/v1.0/news/briefings?lang=zh&interval=daily&date=2026-04-19

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "top10_news": ["news1", "news2", "news3", "news4", "news5", "news6", "news7", "news8", "news9", "news10"],
        "opinion": "核心观点",
        "suggestion": "从业者建议"
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:
| 字段 | 类型 | 说明 |
|------|------|------|
| top10_news | array[string] | 10条新闻概要 |
| opinion | string | 观点总结 |
| suggestion | string | 对从业者的建议 |

---

## 公司 (Companies)

### 获取公司列表
**功能描述**
返回平台收录的全量科技公司列表，按字母序返回。

```
GET /api/v1.0/companies
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| lang | 否 | zh | string | 语言：zh/en |
| company_name | 否 | -  | string | 按名称过滤并返回符合条件的公司列表，大小写不敏感，模糊匹配 |
| page | 否 | 1 | integer | 页码 |
| page_size | 否 | 100 | integer | 每页条数，1-1000 |

**请求示例**:
GET /api/v1.0/companies?lang=en&page=1&page_size=100

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "companies": [
            {
                "company_id": 1,
                "company_name": "Amazon",
                "abbr": "amazon",
                "full_name": "Amazon.com, Inc."
            },
            {
                "company_id": 34,
                "company_name": "Unigroup Guoxin",
                "abbr": "unigroup",
                "full_name": "Unigroup Guoxin Microelectronics Co., Ltd."
            }
            // ... 更多公司
        ],
        "pagination": {
            "page": 1,
            "page_size": 100,
            "total": 156,
            "total_pages": 8,
            "has_more": true
        }
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:

data.companies 为公司对象数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| company_id | integer | 公司唯一ID |
| company_name | string | 公司名称 |
| abbr | string | 公司简称的字母缩写，常用于排序 |
| full_name | string | 公司全名 |

data.pagination 为分页信息：
| 字段 | 类型 | 说明 |
|------|------|------|
| page | integer | 当前页码 |
| page_size | integer | 每页条数 |
| total | integer | 总条数 |
| total_pages | integer | 总页数 |
| has_more | boolean | 是否有下一页 |

---

### 获取公司详情
**功能描述**
查询某公司的详细信息，包括公司的唯一ID、公司名简称、公司全名、公司上市地点、公司股票代码，以及有合作或竞争关系的相关公司。

```
GET /api/v1.0/companies/{company_id}?lang=en
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| company_id | 是（路径） | - | integer | 公司唯一ID |
| lang | 否 | zh | string | 语言：zh/en |

> **注意**：如果只有公司名称没有 `company_id`，请先调用 `GET /api/v1.0/companies?company_name={company_name}` 搜索获取 ID。

**请求示例**:
GET /api/v1.0/companies/1?lang=en

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "company": {
            "company_id": 1,
            "company_name": "Amazon",
            "abbr": "amazon",
            "full_name": "Amazon.com, Inc.",
            "stock_exchange": "US",
            "stock_code": "AMZN"
        },
        "related_company": [
            {
                "company_id": 3,
                "company_name": "Google"
            },
            {
                "company_id": 6,
                "company_name": "Nvidia"
            }
            // ... 更多相关公司
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:

data.company 为目标公司详情：
| 字段 | 类型 | 说明 |
|------|------|------|
| company_id | integer | 公司唯一ID |
| company_name | string | 公司名称 |
| abbr | string | 公司简称的字母缩写，常用于排序 |
| full_name | string | 公司全名 |
| stock_exchange | string | 上市交易所代码或地区，未上市为 null |
| stock_code | string | 股票代码，未上市为 null |

data.related_company 为相关公司数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| company_id | integer | 公司唯一ID |
| company_name | string | 公司名称 |

---

### 获取公司股票数据
**功能描述**
获取某个公司的股票数据，支持按天、月和年获取数据。

```
GET /api/v1.0/companies/{company_id}/stock?interval=daily&limit=3
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| company_id | 是（路径） | - | integer | 公司的唯一ID |
| interval | 否 | daily | string | daily/monthly/yearly |
| limit | 否 | 1 | integer | 最近多少条，1-365 |
| lang | 否 | zh | string | 语言：zh/en |

> **注意**：如果只有公司名称没有 `company_id`，请先调用 `GET /api/v1.0/companies?company_name={company_name}` 搜索获取 ID。

**请求示例**:
GET /api/v1.0/companies/1/stock?interval=daily&limit=2&lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "company_id": 1,
        "company_name": "亚马逊",
        "interval": "daily",
        "currency": "USD",
        "stock_data": [
            {
                "date": "2026-04-24",
                "open": 259.889,
                "close": 263.990,
                "high": 264.375,
                "low": 257.685,
                "volume": 53601873
            },
            {
                "date": "2026-04-23",
                "open": 255.300,
                "close": 255.080,
                "high": 258.790,
                "low": 253.070,
                "volume": 31032997
            }
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:
| 字段 | 类型 | 说明 |
|------|------|------|
| company_id | integer | 公司唯一ID |
| company_name | string | 公司名称 |
| interval | string | 本次返回的数据粒度，与请求中的取值一致 |
| currency | string | 货币单位：USD、CNY、HKD |

stock_data 为交易数据数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| date | string(date) | 交易日期，格式 YYYY-MM-DD |
| open | double | 开盘价 |
| close | double | 收盘价 |
| high | double | 最高价 |
| low | double | 最低价 |
| volume | integer | 交易量 |

---

### 获取公司新闻
**功能描述**
获取某公司的近期新闻和相关公司的新闻，按新闻发布时间逆序返回。

```
GET /api/v1.0/companies/{company_id}/news?lang=zh
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| company_id | 是（路径） | - | integer | 待查询公司的唯一ID |
| lang | 否 | zh | string | 语言：zh/en |

> **注意**：如果只有公司名称没有 `company_id`，请先调用 `GET /api/v1.0/companies?company_name={company_name}` 搜索获取 ID。

**请求示例**:
GET /api/v1.0/companies/1/news?lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "company_id": 1,
        "company_name": "亚马逊",
        "company_news": [
            {
                "news_id": 2001,
                "title": "新闻标题",
                "summary": "新闻摘要",
                "source": "新闻来源",
                "author": "新闻作者",
                "publish_time": "2026-04-20T08:30:00Z"
            }
        ],
        "related_company_news": [
            {
                "news_id": 3001,
                "title": "新闻标题",
                "summary": "新闻摘要",
                "source": "新闻来源",
                "author": "新闻作者",
                "publish_time": "2026-04-19T10:30:00Z",
                "company_name": "Google",
                "company_id": 3
            }
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:
| 字段 | 类型 | 说明 |
|------|------|------|
| company_id | integer | 公司唯一ID |
| company_name | string | 公司名称 |

company_news 为该公司的新闻数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| news_id | integer | 新闻唯一ID |
| title | string | 新闻标题 |
| summary | string | 新闻摘要 |
| source | string | 新闻来源 |
| author | string | 新闻作者 |
| publish_time | string(datetime) ISO 8601 | 发布时间 |

related_company_news 为相关公司的新闻数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| news_id | integer | 新闻唯一ID |
| title | string | 新闻标题 |
| summary | string | 新闻摘要 |
| source | string | 新闻来源 |
| author | string | 新闻作者 |
| publish_time | string(datetime) ISO 8601 | 发布时间 |
| company_id | integer | 相关公司ID |
| company_name | string | 相关公司名称 |

---

## 会议 (Conferences)

### 获取会议类型列表
**功能描述**
获取平台收录的所有会议类型。

```
GET /api/v1.0/conferences/types
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| lang | 否 | zh | string | 语言：zh/en |

**请求示例**:
GET /api/v1.0/conferences/types?lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "type": [
            {
                "type_id": 1,
                "name": "综合性会议"
            },
            {
                "type_id": 2,
                "name": "企业级会议"
            }
            // ... 更多会议类型
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:
data.type 为会议类型数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| type_id | integer | 会议类型唯一ID |
| name | string | 会议类型名称 |

---

### 获取会议列表
**功能描述**
返回某年或某个月的会议议程列表。

```
GET /api/v1.0/conferences
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| lang | 否 | zh | string | 语言：zh/en |
| year | 是 | - | integer | 年份 |
| month | 否 | 0 | integer | 0 表示全年，1-12 表示特定月 |
| type_id | 否 | - | integer | 按会议类型过滤 |
| conf_name | 否 | - | string | 按会议名称进行模糊过滤，大小写不敏感 |
| conf_org | 否 | - | string | 按会议组织方进行模糊过滤，大小写不敏感 |

**请求示例**:
GET /api/v1.0/conferences?year=2026&lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "agenda": [
            {
                "subject": "CES 2026: Smarter AI for All",
                "organization": "美国消费技术协会(CTA)",
                "start_date": "2026-01-06",
                "end_date": "2026-01-09",
                "type_id": 1,
                "type_name": "综合性会议",
                "location": "美国, 拉斯维加斯",
                "website": "https://www.ces.tech/",
                "acked": true
            },
            {
                "subject": "NVIDIA GTC 2026",
                "organization": "Nvidia",
                "start_date": "2026-03-16",
                "end_date": "2026-03-19",
                "type_id": 2,
                "type_name": "企业级会议",
                "location": "美国，圣何塞",
                "website": "https://www.nvidia.com/gtc/",
                "acked": true
            }
            // ... 更多议程
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:
data.agenda 为会议议程数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| subject | string | 会议主题 |
| organization | string | 会议组织方 |
| start_date | string(date) | 会议开始日期 |
| end_date | string(date) | 会议结束日期 |
| type_id | integer | 会议类型ID |
| type_name | string | 会议类型名称 |
| location | string | 会议举办地点 |
| website | string(URL) | 会议网站 |
| acked | boolean | 议程是否已确认 |

---

## 模型 (Modelmp)

### 获取模型列表
**功能描述**
过滤并返回满足条件的模型列表，过滤条件支持多个取值，各值之间通过英文逗号隔开。

```
GET /api/v1.0/modelmp/models
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| category_id | 否 | - | string | 按类别ID过滤，多个用逗号分隔 |
| size_id | 否 | - | string | 按尺寸ID过滤，多个用逗号分隔 |
| model_id | 否 | - | string | 按模型ID过滤，多个用逗号分隔 |
| model_name  | 否 | -  | string | 按模型名称过滤，多个用逗号分隔，大小写不敏感，模糊匹配|
| brand_id | 否 | - | string | 按品牌ID过滤，多个用逗号分隔 |
| opensource | 否 | - | boolean | true/false |
| lang | 否 | zh | string | 语言：zh/en |
| page | 否 | 1 | integer | 页码 |
| page_size | 否 | 100 | integer | 每页条数，1-300 |

**请求示例**:
GET /api/v1.0/modelmp/models?category_id=1,2&opensource=false&brand_id=1,3,4&page=1&page_size=100&lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "models": [
            {
                "model_id": 1,
                "model_name": "Qwen3-Max",
                "category_id": 1,
                "category_name": "通用模型",
                "size_id": 6,
                "size": "1T+",
                "opensource": false,
                "intelligence_index": 31,
                "code_index": 26,
                "agentic_index": 43,
                "context_size": 262144,
                "publish_date": "2026-01-26",
                "brand_id": 1,
                "brand_name": "Qwen",
                "csp": [
                    {
                        "csp_id": 1,
                        "csp_name": "阿里云"
                    }
                    // ... 更多CSP
                ]
            }
            // ... 更多模型
        ],
        "pagination": {
            "page": 1,
            "page_size": 100,
            "total": 156,
            "total_pages": 8,
            "has_more": true
        }
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:

data.models 为模型对象数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| model_id | integer | 模型唯一ID |
| model_name | string | 模型名称 |
| category_id | integer | 模型类别ID |
| category_name | string | 模型类别名称 |
| size_id | integer | 参数尺寸ID，未公布为 null |
| size | string | 参数尺寸，未公布为 null |
| opensource | boolean | 是否开源 |
| intelligence_index | integer | 智能 Index 得分，未公布为 null |
| code_index | integer | Code Index 得分，未公布为 null |
| agentic_index | integer | Agentic Index 得分，未公布为 null |
| context_size | integer | 上下文大小 |
| publish_date | string(date) | 发布日期 |
| brand_id | integer | 品牌ID |
| brand_name | string | 品牌名称 |

csp 为服务商数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| csp_id | integer | 服务商唯一ID |
| csp_name | string | 服务商名称 |

data.pagination 为分页信息：
| 字段 | 类型 | 说明 |
|------|------|------|
| page | integer | 当前页码 |
| page_size | integer | 每页条数 |
| total | integer | 总条数 |
| total_pages | integer | 总页数 |
| has_more | boolean | 是否有下一页 |

---

### 获取模型详情
**功能描述**
获取某个模型的详细信息

```
GET /api/v1.0/modelmp/models/{model_id}
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| model_id | 是（路径参数） | - | integer | 模型唯一ID |
| lang | 否 | zh | string | 语言：zh/en |

**请求示例**:
GET /api/v1.0/modelmp/models/1?lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "model": {
            "model_id": 1,
            "model_name": "Qwen3-Max",
            "category_id": 1,
            "category_name": "通用模型",
            "size_id": 6,
            "size": "1T+",
            "opensource": false,
            "intelligence_index": 31,
            "code_index": 26,
            "agentic_index": 43,
            "context_size": 262144,
            "publish_date": "2026-01-26",
            "brand_id": 1,
            "brand_name": "Qwen",
            "website": "https://qwen.aliyun.com/",
            "company_id": 11,
            "company_name": "阿里巴巴",
            "description": "模型的详细描述",
            "csp": [
                {
                    "csp_id": 1,
                    "csp_name": "阿里云"
                }
                // ... 更多CSP
            ]
        }
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:

data.model 为模型详情对象：
| 字段 | 类型 | 说明 |
|------|------|------|
| model_id | integer | 模型唯一ID |
| model_name | string | 模型名称 |
| category_id | integer | 类别ID |
| category_name | string | 类别名称 |
| size_id | integer | 尺寸ID，未公布为 null |
| size | string | 尺寸，未公布为 null |
| opensource | boolean | 是否开源 |
| intelligence_index | integer | 智能 Index，未公布为 null |
| code_index | integer | Code Index，未公布为 null |
| agentic_index | integer | Agentic Index，未公布为 null |
| context_size | integer | 上下文大小 |
| publish_date | string(date) | 发布日期 |
| brand_id | integer | 模型品牌ID |
| brand_name | string | 模型品牌名称 |
| website | string(URL) | 模型网站 |
| company_id | integer | 模型开发公司ID |
| company_name | string | 模型开发公司名称 |
| description | string | 模型详细描述 |

csp 为服务商数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| csp_id | integer | 服务商唯一ID |
| csp_name | string | 服务商名称 |

---

### 获取模型类别列表
**功能描述**
获取平台收录的所有模型类别

```
GET /api/v1.0/modelmp/categories
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| lang | 否 | zh | string | 语言：zh/en |

**请求示例**:
GET /api/v1.0/modelmp/categories?lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "category": [
            {
                "category_id": 1,
                "category_name": "通用模型"
            }
            // ... 更多模型类型
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:
data.category 为模型类别数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| category_id | integer | 类别唯一ID |
| category_name | string | 类别名称 |

---

### 获取模型尺寸列表
**功能描述**
获取平台收录的所有模型大小。

```
GET /api/v1.0/modelmp/sizes
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| lang | 否 | zh | string | 语言：zh/en |

**请求示例**:
GET /api/v1.0/modelmp/sizes?lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "size": [
            {
                "size_id": 1,
                "size": "微型模型(1B以下)"
            }
            // ... 更多模型参数尺寸
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:
data.size 为模型尺寸数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| size_id | integer | 尺寸唯一ID |
| size | string | 尺寸名称 |

---

### 获取模型品牌列表
**功能描述**
获取平台收录的所有模型品牌。

```
GET /api/v1.0/modelmp/brands
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| brand_name | 否 | - | string | 品牌名称过滤，多个用逗号分隔，大小写不敏感，模糊匹配|
| lang | 否 | zh | string | 语言：zh/en |

**请求示例**:
GET /api/v1.0/modelmp/brands?lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "brand": [
            {
                "brand_id": 1,
                "brand_name": "Qwen",
                "company_id": 11,
                "company_name": "阿里巴巴",
                "website": "https://qwen.aliyun.com/",
            }
            // ... 更多品牌
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:
data.brand 为模型品牌数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| brand_id | integer | 品牌唯一ID |
| brand_name | string | 品牌名称 |
| company_id | integer | 归属公司ID |
| company_name | string | 归属公司名称 |
| website | string(URL) | 该模型品牌的网站 |

---

### 获取模型API服务商(CSP)列表
**功能描述**
获取平台收录的所有模型API服务商。

```
GET /api/v1.0/modelmp/csps
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| lang | 否 | zh | string | 语言：zh/en |

**请求示例**:
GET /api/v1.0/modelmp/csps?lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "csp": [
            {
                "csp_id": 1,
                "csp_name": "阿里云",
                "pricing_url": "https://help.aliyun.com/zh/model-studio/models"
            }
            // ... 更多CSP
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:
data.csp 为服务商数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| csp_id | integer | 服务商唯一ID |
| csp_name | string | 服务商名称 |
| pricing_url | string(URL) | 价格页面网址 |

---

### 获取模型API服务地区列表
**功能描述**
获取平台收录的所有模型API服务地域。

```
GET /api/v1.0/modelmp/regions
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| lang | 否 | zh | string | 语言：zh/en |

**请求示例**:
GET /api/v1.0/modelmp/regions?lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "region": [
            {
                "region_id": 1,
                "region_name": "亚太-中国"
            }
            // ... 更多地区
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:
data.region 为地区数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| region_id | integer | 地区唯一ID |
| region_name | string | 地区名称 |

---

### 获取模型价格列表
**功能描述**
过滤并返回满足条件的模型报价列表，过滤条件支持多个取值，各值之间通过英文逗号隔开

```
GET /api/v1.0/modelmp/prices
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| category_id | 否 | - | string | 按类别ID过滤，多个用逗号分隔 |
| size_id | 否 | - | string | 按尺寸ID过滤，多个用逗号分隔 |
| model_id | 否 | - | string | 按模型ID过滤，多个用逗号分隔 |
| region_id | 否 | - | string | 按地区ID过滤，多个用逗号分隔 |
| lang | 否 | zh | string | 语言：zh/en |
| page | 否 | 1 | integer | 页码 |
| page_size | 否 | 100 | integer | 每页条数，1-300 |

**请求示例**:
GET /api/v1.0/modelmp/prices?category_id=1,2&model_id=1,2&region_id=1,2&page=1&page_size=100&lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "price": [
            {
                "model_id": 1,
                "model_name": "Qwen3-Max",
                "region_id": 1,
                "region_name": "亚太-中国",
                "csp_id": 1,
                "csp_name": "阿里云",
                "condition": "0<Token≤32K",
                "input_price": 0.0002,
                "output_price": 0.004,
                "currency": "CNY",
                "extra_info": null
            }
            // ... 更多价格
        ],
        "pagination": {
            "page": 1,
            "page_size": 100,
            "total": 156,
            "total_pages": 8,
            "has_more": true
        }
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:

data.price 为价格对象数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| model_id | integer | 模型唯一ID |
| model_name | string | 模型名称 |
| region_id | integer | 服务地区ID |
| region_name | string | 服务地区 |
| csp_id | integer | 服务商ID |
| csp_name | string | 服务商名称 |
| condition | string | 报价条件 |
| input_price | double | 输入 Token 价格（每百万Token） |
| output_price | double | 输出 Token 价格（每百万Token） |
| currency | string | 货币：USD 或 CNY |
| extra_info | string | 额外补充信息 |

data.pagination 为分页信息：
| 字段 | 类型 | 说明 |
|------|------|------|
| page | integer | 当前页码 |
| page_size | integer | 每页条数 |
| total | integer | 总条数 |
| total_pages | integer | 总页数 |
| has_more | boolean | 是否有下一页 |

---

### 对模型计算价格并排序
**功能描述**
根据用户指定的输入Token数、输出Token数、API调用次数和汇率，计算各模型的调用总成本，并按总成本升序返回排名结果（成本越低排名越靠前）。支持按模型类别、参数尺寸、服务地区、品牌等维度过滤。

```
GET /api/v1.0/modelmp/prices/cost-rankings
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| input_tokens | 否 | 1000 | integer | 输入Token数量，≥0 |
| output_tokens | 否 | 2000 | integer | 输出Token数量，≥0 |
| api_calls | 否 | 1000 | integer | API调用次数，≥0 |
| exchange_rate | 否 | 系统实时查询 | double | 美元/人民币汇率，当目标货币与计价货币不一致时使用 |
| target_currency | 否 | CNY | string | 目标货币：CNY/USD，计算结果统一换算为该货币 |
| category_id | 否 | - | string | 按类别ID过滤，多个用逗号分隔 |
| size_id | 否 | - | string | 按尺寸ID过滤，多个用逗号分隔 |
| region_id | 否 | - | string | 按地区ID过滤，多个用逗号分隔 |
| model_id | 否 | - | string | 按模型ID过滤，多个用逗号分隔 |
| brand_id | 否 | - | string | 按品牌ID过滤，多个用逗号分隔 |
| opensource | 否 | - | boolean | true/false |
| lang | 否 | zh | string | 语言：zh/en |
| sort | 否 | total_cost | string | 排序字段，支持 total_cost / cost_per_call / input_price / output_price，前缀加 `-` 表示降序 |
| page | 否 | 1 | integer | 页码 |
| page_size | 否 | 100 | integer | 每页条数，1-300 |

**请求示例**:
GET /api/v1.0/modelmp/prices/cost-rankings?input_tokens=1000&output_tokens=2000&api_calls=1000&exchange_rate=7.0&target_currency=CNY&category_id=1&region_id=1&page=1&page_size=100&lang=zh

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "input_tokens": 1000,
        "output_tokens": 2000,
        "api_calls": 1000,
        "exchange_rate": 7.0,
        "target_currency": "CNY",
        "cost_rankings": [
            {
                "model_id": 1,
                "model_name": "Qwen3-Max",
                "category_name": "通用模型",
                "size": "1T+",
                "brand_name": "Qwen",
                "csp_name": "阿里云",
                "region_name": "亚太-中国",
                "condition": "0<Token≤32K",
                "input_price": 0.0002,
                "output_price": 0.004,
                "original_currency": "CNY",
                "cost_per_call": 0.01,
                "total_cost": 10.0,
                "rank": 1
            },
            {
                "model_id": 2,
                "model_name": "GPT-4.5",
                "category_name": "通用模型",
                "size": "1T+",
                "brand_name": "OpenAI",
                "csp_name": "Azure",
                "region_name": "亚太-中国",
                "condition": null,
                "input_price": 75.0,
                "output_price": 150.0,
                "original_currency": "USD",
                "cost_per_call": 2625.0,
                "total_cost": 2625000.0,
                "rank": 2
            }
            // ... 更多模型
        ],
        "pagination": {
            "page": 1,
            "page_size": 100,
            "total": 156,
            "total_pages": 8,
            "has_more": true
        }
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:

data 顶层查询参数回显：
| 字段 | 类型 | 说明 |
|------|------|------|
| input_tokens | integer | 请求中的输入Token数量 |
| output_tokens | integer | 请求中的输出Token数量 |
| api_calls | integer | 请求中的API调用次数 |
| exchange_rate | double | 请求中的美元/人民币汇率 |
| target_currency | string | 请求中的目标货币 |

data.cost_rankings 为成本排名数组，按 total_cost 升序排列：
| 字段 | 类型 | 说明 |
|------|------|------|
| model_id | integer | 模型唯一ID |
| model_name | string | 模型名称 |
| category_name | string | 模型类别名称 |
| size | string | 参数尺寸，未公布为 null |
| brand_name | string | 品牌名称 |
| csp_name | string | API服务商名称 |
| region_name | string | 服务地区名称 |
| condition | string | 价格条件或约束 |
| input_price | double | 原始输入Token价格（每百万Token），保留8位小数 |
| output_price | double | 原始输出Token价格（每百万Token），保留8位小数 |
| original_currency | string | 原始报价货币：USD 或 CNY |
| cost_per_call | double | 单次API调用成本（目标货币） |
| total_cost | double | 总成本 = cost_per_call × api_calls（目标货币） |
| rank | integer | 成本排名，成本越低排名越靠前 |

**计算逻辑说明**：
- `cost_per_call = (input_price × input_tokens + output_price × output_tokens) / 1,000,000`
- `total_cost = cost_per_call × api_calls`
- `若target_currency与original_currency不一致时，会根据exchange_rate做汇率转换`

**排序规则说明**：
- 默认按 `total_cost` 升序排列（成本越低排名越靠前）
- `sort=total_cost` 或 `sort=cost_per_call` 表示升序
- `sort=-total_cost` 或 `sort=-cost_per_call` 表示降序

data.pagination 为分页信息：
| 字段 | 类型 | 说明 |
|------|------|------|
| page | integer | 当前页码 |
| page_size | integer | 每页条数 |
| total | integer | 总条数 |
| total_pages | integer | 总页数 |
| has_more | boolean | 是否有下一页 |

---

### 获取模型能力排名
**功能描述**
针对本平台收录的模型，返回TOP模型，支持：
- 智能Index: 按照智能Index返回TOP模型，type值为intelligence_index；
- 编码Index: 按照编码Index返回TOP模型，type值为code_index；
- Agentic Index: 按照Agentic Index返回TOP模型，type值为agentic_index；
- 上下文窗口: 按照上下文窗口大小返回TOP模型，type值为context_size；
- 调用量: 按照近若干日调用量汇总的TOP模型，type值为usage；
  
```
GET /api/v1.0/modelmp/model-rankings
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| type | 是 | - | string | intelligence_index / code_index / agentic_index / context_size / usage |
| date | 否 | API调用当日 | string(date) | 当type=usage时有效，格式为YYYY-MM-DD |
| range | 否 | 30 | integer | 当type=usage时有效，以date为终点，按照最近多少天的调用量汇总，支持1/7/14/30日 |
| topN | 否 | 10 | integer| 返回排名前几位，当type=usage时topN最大支持10 |
| opensource | 否 | - | boolean | true/false，不填表示所有模型 |
| lang | 否 | zh | string | 语言：zh/en |

**请求示例**:
GET /api/v1.0/modelmp/model-rankings?type=intelligence_index

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "type": "intelligence_index",
        "top_model": [
            {
                "model_id": 1,
                "model_name": "Qwen3-Max",
                "value": 56,
                "rank": 1
            }
            // ... 更多模型
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:

data.type 为排名类型：
| 字段 | 类型 | 说明 |
|------|------|------|
| type | string | intelligence_index / code_index / agentic_index / context_size / usage |

data.top_model 为模型排名数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| model_id | integer | 平台会为收录的每个模型赋予唯一ID |
| model_name | string | 模型的名称 |
| value | integer | 指标分值或调用量，调用量的单位为M |
| rank | integer | 第几名|

---

### 获取模型品牌排名
**功能描述**
针对本平台收录的模型品牌，返回TOP模型品牌，支持：
- 调用量: 按照近若干日调用量汇总排名，返回TOP模型品牌，type值为usage；
- 流行度：按照模型品牌的流行度排名，返回TOP模型品牌，type值为popularity；
  
```
GET /api/v1.0/modelmp/brand-rankings
```

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| type | 是 | - | string | 排名类型：usage/popularity |
| topN | 否 | 10 | integer | 当type=usage时, topN最大支持10 |
| date | 否 | 当日/当月| string(date) | 当type=usage时，格式为YYYY-MM-DD；当type=popularity时，格式为YYYY-MM |
| range | 否 | 30| integer | 当type=usage时有效，以date为终点，按照最近多少天的调用量汇总，支持1/7/14/30日 |
| lang | 否 | zh | string | 语言：zh/en |

**请求示例**:
GET /api/v1.0/modelmp/brand-rankings?type=popularity

**响应示例**:
```json
{
    "code": 0,
    "message": "success",
    "data": {
        "type": "popularity",
        "top_brand": [
            {
                "brand_id": 1,
                "brand_name": "Qwen",
                "value": 56,
                "rank": 1
            }
            // ... 更多模型品牌
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**字段说明**:

data.type 为排名类型：
| 字段 | 类型 | 说明 |
|------|------|------|
| type | string | 排名类型：popularity/usage |

data.top_brand 为品牌排名数组：
| 字段 | 类型 | 说明 |
|------|------|------|
| brand_id | integer | 品牌唯一ID |
| brand_name | string | 品牌名称 |
| value | integer | 流行度值或调用量，调用量的单位为M |
| rank | integer | 第几名|

---

## 错误码

| HTTP 状态码 | 业务 code | 说明 |
|-------------|-----------|------|
| 400 | 400 | 请求参数不合法 |
| 401 | 401 | 缺少必要参数 |
| 404 | 402 | 请求的数据不存在 |
| 500 | 501 | 服务器内部错误 |
