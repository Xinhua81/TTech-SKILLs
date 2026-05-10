# TTech.xin RESTful API Specification

This document defines the API specification and detailed parameters provided by TTech.xin, enabling AI Agents and third-party users to call APIs to query tech news, tech company stocks, tech conferences, and large language models.

Tech News supports:
- Browse tech news by time
- Search and browse related tech news by keywords
- Query summarized tech news daily/weekly/monthly briefings by date

Tech Companies supports:
- Query a company's historical news and related companies' news
- Query a company's stock data by day, month, or year

Tech Conferences supports:
- Query tech conference details (subject, organizer, start/end time, location, website) by date
- Filter by conference type: enterprise, academic, comprehensive, regional, etc.

Model Marketplace supports:
- Query and filter models by multiple dimensions: category, parameter size, open-source status, brand, etc.
- Query detailed model information: name, category, parameter size, Intelligence Index, Code Index, Agentic Index, context size, publish date, open-source status, brand, API providers, service regions, official website, detailed description, etc.
- Get model rankings by Intelligence Index, Code Index, Agentic Index, context size, usage, etc.
- Get brand rankings by popularity and usage
- Query pricing from model API providers by region, with filters for category, parameter size, and service region

## Overall Design

### Base URL
```
/api/v1.0
```

### Design Principles
1. **Resource-oriented**: URLs represent resources, using plural noun forms
2. **HTTP Methods Represent Actions**:
   - `GET` — Read resources
   - `POST` — Create resources
   - `PUT/PATCH` — Update resources
   - `DELETE` — Delete resources
3. **Path Parameters Identify Resources**: `/resources/{id}`
4. **Query Parameters for Filtering, Pagination, and Sorting**

### API Response

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

The overall structure of API response:
| Field | Type | Description |
|-------|------|-------------|
| code | integer | Response code, 0 means success, non-zero means error code. Detailed meanings of error codes are described in later sections |
| message | string | Response message description, usually "success" for successful requests, detailed error info for failures |
| data | object | Nested JSON object returning requested user data. Different APIs have different structures. null on failure |
| meta | object | Meta object containing key info from the request, facilitating debugging for callers |

Main fields of meta:
| Field | Type | Description |
|-------|------|-------------|
| request_id | string | Equals the request_id in the request body |
| timestamp | integer | Equals the timestamp in the request body |

---

## News

### Get News List
**Feature Description**
Returns a list of news within a time range. Each news item includes title, summary, publish time, source, author, and related company. The list is returned in reverse chronological order.

```
GET /api/v1.0/news
```
| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| start_date | No | - | date | Start date, YYYY-MM-DD; without time parameters, no time filtering is applied |
| end_date | No | - | date | End date, YYYY-MM-DD; without time parameters, no time filtering is applied |
| subject | No | - | string | Filter by subject keyword, case-insensitive |
| company_id | No | - | integer | Filter by company |
| lang | No | zh | string | Language: zh/en |
| page | No | 1 | integer | Page number |
| page_size | No | 20 | integer | Items per page, 1-100 |
| limit | No | - | integer | Recent N items, 1-100. Either limit or page+page_size |

**Request Example**:
GET /api/v1.0/news?start_date=2026-04-19&end_date=2026-04-19&lang=zh&page=1&page_size=20

**Response Example**:
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

**Field Description**:

data.news is an array of news objects:
| Field | Type | Description |
|-------|------|-------------|
| news_id | integer | News unique ID |
| title | string | News title |
| summary | string | News summary, generally less than 256 characters |
| source | string | News source |
| author | string | News author |
| publish_time | string(datetime) ISO 8601 | Publish time |
| company_name | string | Company primarily mentioned in the news |
| company_id | integer | Company unique ID |

data.pagination is pagination info (null in limit mode):
| Field | Type | Description |
|-------|------|-------------|
| page | integer | Current page number, starting from 1 |
| page_size | integer | Items per page |
| total | integer | Total count |
| total_pages | integer | Total pages |
| has_more | boolean | true means there is a next page |

---

### Get News Detail
**Feature Description**
Returns detailed content of a news item, including title, summary, publish time, source, author, content, related companies, original URL, and related news. Related news is a list where each item includes title, summary, publish time, source, author, and related company.

```
GET /api/v1.0/news/{news_id}
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| news_id | Yes (Path) | - | integer | News unique ID |
| lang | No | zh | string | Language: zh/en |

**Request Example**:
GET /api/v1.0/news/1001?lang=zh

**Response Example**:
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
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**Field Description**:

data.news is the news detail object:
| Field | Type | Description |
|-------|------|-------------|
| news_id | integer | News unique ID |
| title | string | News title |
| summary | string | News summary |
| source | string | News source |
| author | string | News author |
| publish_time | string(datetime) ISO 8601 | Publish time |
| company_name | string | Company primarily mentioned |
| company_id | integer | Company unique ID |
| content | string | News detailed content |
| url | string(URL) | Original link |

data.related_news is an array of related news:
| Field | Type | Description |
|-------|------|-------------|
| news_id | integer | News unique ID |
| title | string | News title |
| source | string | News source |
| publish_time | string(datetime) ISO 8601 | Publish time |
| company_name | string | Company name mentioned |
| company_id | integer | Company ID mentioned |

---

### Get News Daily/Weekly/Monthly Briefing
**Feature Description**
Returns daily, weekly, or monthly briefing. Daily briefing is a summary of news from midnight the previous day to 9:00 AM today. Weekly and monthly briefings are summaries for the corresponding week or month.

```
GET /api/v1.0/news/briefings
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| lang | No | zh | string | Language: zh/en |
| interval | No | daily | string | daily/weekly/monthly |
| date | No | Today | date | Date; weekly takes Sunday, monthly takes month-end |

**Request Example**:
GET /api/v1.0/news/briefings?lang=zh&interval=daily&date=2026-04-19

**Response Example**:
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

**Field Description**:
| Field | Type | Description |
|-------|------|-------------|
| top10_news | array[string] | Summaries of 10 news items |
| opinion | string | Opinion summary |
| suggestion | string | Suggestions for practitioners |

---

## Companies

### Get Company List
**Feature Description**
Returns the full list of tech companies indexed by the platform, sorted alphabetically.

```
GET /api/v1.0/companies
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| lang | No | zh | string | Language: zh/en |
| company_name | No | - | string | Filter by name, case-insensitive, fuzzy match |
| page | No | 1 | integer | Page number |
| page_size | No | 100 | integer | Items per page, 1-1000 |

**Request Example**:
GET /api/v1.0/companies?lang=en&page=1&page_size=100

**Response Example**:
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

**Field Description**:

data.companies is an array of company objects:
| Field | Type | Description |
|-------|------|-------------|
| company_id | integer | Company unique ID |
| company_name | string | Company name |
| abbr | string | Company abbreviation, commonly used for sorting |
| full_name | string | Company full name |

data.pagination is pagination info:
| Field | Type | Description |
|-------|------|-------------|
| page | integer | Current page number |
| page_size | integer | Items per page |
| total | integer | Total count |
| total_pages | integer | Total pages |
| has_more | boolean | Whether there is a next page |

---

### Get Company Detail
**Feature Description**
Query detailed information of a company, including unique ID, short name, full name, listing location, stock code, and related companies (cooperative or competitive).

```
GET /api/v1.0/companies/{company_id}?lang=en
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| company_id | Yes (Path) | - | integer | Company unique ID |
| lang | No | zh | string | Language: zh/en |

> **Note**: If you only have the company name without `company_id`, please call `GET /api/v1.0/companies?company_name={company_name}` first to search and get the ID.

**Request Example**:
GET /api/v1.0/companies/1?lang=en

**Response Example**:
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
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**Field Description**:

data.company is the target company detail:
| Field | Type | Description |
|-------|------|-------------|
| company_id | integer | Company unique ID |
| company_name | string | Company name |
| abbr | string | Company abbreviation, commonly used for sorting |
| full_name | string | Company full name |
| stock_exchange | string | Stock exchange code or region, null if not listed |
| stock_code | string | Stock code, null if not listed |

data.related_company is an array of related companies:
| Field | Type | Description |
|-------|------|-------------|
| company_id | integer | Company unique ID |
| company_name | string | Company name |

---

### Get Company Stock Data
**Feature Description**
Get stock data for a company, supporting daily, monthly, and yearly intervals.

```
GET /api/v1.0/companies/{company_id}/stock?interval=daily&limit=3
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| company_id | Yes (Path) | - | integer | Company unique ID |
| interval | No | daily | string | daily/monthly/yearly |
| limit | No | 1 | integer | Recent N items, 1-365 |
| lang | No | zh | string | Language: zh/en |

> **Note**: If you only have the company name without `company_id`, please call `GET /api/v1.0/companies?company_name={company_name}` first to search and get the ID.

**Request Example**:
GET /api/v1.0/companies/1/stock?interval=daily&limit=2&lang=zh

**Response Example**:
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

**Field Description**:
| Field | Type | Description |
|-------|------|-------------|
| company_id | integer | Company unique ID |
| company_name | string | Company name |
| interval | string | Data granularity, same as the request value |
| currency | string | Currency: USD, CNY, HKD |

stock_data is an array of trading data:
| Field | Type | Description |
|-------|------|-------------|
| date | string(date) | Trading date, format YYYY-MM-DD |
| open | double | Opening price |
| close | double | Closing price |
| high | double | Highest price |
| low | double | Lowest price |
| volume | integer | Trading volume |

---

### Get Company News
**Feature Description**
Get recent news for a company and related companies' news, returned in reverse chronological order.

```
GET /api/v1.0/companies/{company_id}/news?lang=zh
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| company_id | Yes (Path) | - | integer | Company unique ID to query |
| lang | No | zh | string | Language: zh/en |

> **Note**: If you only have the company name without `company_id`, please call `GET /api/v1.0/companies?company_name={company_name}` first to search and get the ID.

**Request Example**:
GET /api/v1.0/companies/1/news?lang=zh

**Response Example**:
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

**Field Description**:
| Field | Type | Description |
|-------|------|-------------|
| company_id | integer | Company unique ID |
| company_name | string | Company name |

company_news is an array of the company's news:
| Field | Type | Description |
|-------|------|-------------|
| news_id | integer | News unique ID |
| title | string | News title |
| summary | string | News summary |
| source | string | News source |
| author | string | News author |
| publish_time | string(datetime) ISO 8601 | Publish time |

related_company_news is an array of related companies' news:
| Field | Type | Description |
|-------|------|-------------|
| news_id | integer | News unique ID |
| title | string | News title |
| summary | string | News summary |
| source | string | News source |
| author | string | News author |
| publish_time | string(datetime) ISO 8601 | Publish time |
| company_id | integer | Related company ID |
| company_name | string | Related company name |

---

## Conferences

### Get Conference Type List
**Feature Description**
Get all conference types indexed by the platform.

```
GET /api/v1.0/conferences/types
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| lang | No | zh | string | Language: zh/en |

**Request Example**:
GET /api/v1.0/conferences/types?lang=zh

**Response Example**:
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
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**Field Description**:
data.type is an array of conference types:
| Field | Type | Description |
|-------|------|-------------|
| type_id | integer | Conference type unique ID |
| name | string | Conference type name |

---

### Get Conference List
**Feature Description**
Returns the conference agenda list for a given year or month.

```
GET /api/v1.0/conferences
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| lang | No | zh | string | Language: zh/en |
| year | Yes | - | integer | Year |
| month | No | 0 | integer | 0 means full year, 1-12 means specific month |
| type_id | No | - | integer | Filter by conference type |
| conf_name | No | - | string | Fuzzy filter by conference name, case-insensitive |
| conf_org | No | - | string | Fuzzy filter by conference organizer, case-insensitive |

**Request Example**:
GET /api/v1.0/conferences?year=2026&lang=zh

**Response Example**:
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
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**Field Description**:
data.agenda is an array of conference agendas:
| Field | Type | Description |
|-------|------|-------------|
| subject | string | Conference subject |
| organization | string | Conference organizer |
| start_date | string(date) | Conference start date |
| end_date | string(date) | Conference end date |
| type_id | integer | Conference type ID |
| type_name | string | Conference type name |
| location | string | Conference location |
| website | string(URL) | Conference website |
| acked | boolean | Whether the agenda is confirmed |

---

## Models (Modelmp)

### Get Model List
**Feature Description**
Filter and return a list of models meeting the conditions. Filter conditions support multiple values, separated by English commas.

```
GET /api/v1.0/modelmp/models
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| category_id | No | - | string | Filter by category ID, multiple values separated by commas |
| size_id | No | - | string | Filter by size ID, multiple values separated by commas |
| model_id | No | - | string | Filter by model ID, multiple values separated by commas |
| model_name | No | - | string | Filter by model name, multiple values separated by commas, case-insensitive, fuzzy match |
| brand_id | No | - | string | Filter by brand ID, multiple values separated by commas |
| opensource | No | - | boolean | true/false |
| lang | No | zh | string | Language: zh/en |
| page | No | 1 | integer | Page number |
| page_size | No | 100 | integer | Items per page, 1-300 |

**Request Example**:
GET /api/v1.0/modelmp/models?category_id=1,2&opensource=false&brand_id=1,3,4&page=1&page_size=100&lang=zh

**Response Example**:
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
                ]
            }
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

**Field Description**:

data.models is an array of model objects:
| Field | Type | Description |
|-------|------|-------------|
| model_id | integer | Model unique ID |
| model_name | string | Model name |
| category_id | integer | Model category ID |
| category_name | string | Model category name |
| size_id | integer | Parameter size ID, null if not disclosed |
| size | string | Parameter size, null if not disclosed |
| opensource | boolean | Whether open-source |
| intelligence_index | integer | Intelligence Index score, null if not disclosed |
| code_index | integer | Code Index score, null if not disclosed |
| agentic_index | integer | Agentic Index score, null if not disclosed |
| context_size | integer | Context size |
| publish_date | string(date) | Publish date |
| brand_id | integer | Brand ID |
| brand_name | string | Brand name |

csp is an array of service providers:
| Field | Type | Description |
|-------|------|-------------|
| csp_id | integer | Service provider unique ID |
| csp_name | string | Service provider name |

data.pagination is pagination info:
| Field | Type | Description |
|-------|------|-------------|
| page | integer | Current page number |
| page_size | integer | Items per page |
| total | integer | Total count |
| total_pages | integer | Total pages |
| has_more | boolean | Whether there is a next page |

---

### Get Model Detail
**Feature Description**
Get detailed information of a specific model.

```
GET /api/v1.0/modelmp/models/{model_id}
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| model_id | Yes (Path) | - | integer | Model unique ID |
| lang | No | zh | string | Language: zh/en |

**Request Example**:
GET /api/v1.0/modelmp/models/1?lang=zh

**Response Example**:
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
            ]
        }
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**Field Description**:

data.model is the model detail object:
| Field | Type | Description |
|-------|------|-------------|
| model_id | integer | Model unique ID |
| model_name | string | Model name |
| category_id | integer | Category ID |
| category_name | string | Category name |
| size_id | integer | Size ID, null if not disclosed |
| size | string | Size, null if not disclosed |
| opensource | boolean | Whether open-source |
| intelligence_index | integer | Intelligence Index, null if not disclosed |
| code_index | integer | Code Index, null if not disclosed |
| agentic_index | integer | Agentic Index, null if not disclosed |
| context_size | integer | Context size |
| publish_date | string(date) | Publish date |
| brand_id | integer | Model brand ID |
| brand_name | string | Model brand name |
| website | string(URL) | Model website |
| company_id | integer | Model development company ID |
| company_name | string | Model development company name |
| description | string | Model detailed description |

csp is an array of service providers:
| Field | Type | Description |
|-------|------|-------------|
| csp_id | integer | Service provider unique ID |
| csp_name | string | Service provider name |

---

### Get Model Category List
**Feature Description**
Get all model categories indexed by the platform.

```
GET /api/v1.0/modelmp/categories
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| lang | No | zh | string | Language: zh/en |

**Request Example**:
GET /api/v1.0/modelmp/categories?lang=zh

**Response Example**:
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
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**Field Description**:
data.category is an array of model categories:
| Field | Type | Description |
|-------|------|-------------|
| category_id | integer | Category unique ID |
| category_name | string | Category name |

---

### Get Model Size List
**Feature Description**
Get all model sizes indexed by the platform.

```
GET /api/v1.0/modelmp/sizes
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| lang | No | zh | string | Language: zh/en |

**Request Example**:
GET /api/v1.0/modelmp/sizes?lang=zh

**Response Example**:
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
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**Field Description**:
data.size is an array of model sizes:
| Field | Type | Description |
|-------|------|-------------|
| size_id | integer | Size unique ID |
| size | string | Size name |

---

### Get Model Brand List
**Feature Description**
Get all model brands indexed by the platform.

```
GET /api/v1.0/modelmp/brands
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| brand_name | No | - | string | Filter by brand name, multiple values separated by commas, case-insensitive, fuzzy match |
| lang | No | zh | string | Language: zh/en |

**Request Example**:
GET /api/v1.0/modelmp/brands?lang=zh

**Response Example**:
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
                "website": "https://qwen.aliyun.com/"
            }
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**Field Description**:
data.brand is an array of model brands:
| Field | Type | Description |
|-------|------|-------------|
| brand_id | integer | Brand unique ID |
| brand_name | string | Brand name |
| company_id | integer | Parent company ID |
| company_name | string | Parent company name |
| website | string(URL) | Brand website |

---

### Get Model CSP List
**Feature Description**
Get all model API service providers (CSPs) indexed by the platform.

```
GET /api/v1.0/modelmp/csps
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| lang | No | zh | string | Language: zh/en |

**Request Example**:
GET /api/v1.0/modelmp/csps?lang=zh

**Response Example**:
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
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**Field Description**:
data.csp is an array of service providers:
| Field | Type | Description |
|-------|------|-------------|
| csp_id | integer | Service provider unique ID |
| csp_name | string | Service provider name |
| pricing_url | string(URL) | Pricing page URL |

---

### Get Model Service Region List
**Feature Description**
Get all model API service regions indexed by the platform.

```
GET /api/v1.0/modelmp/regions
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| lang | No | zh | string | Language: zh/en |

**Request Example**:
GET /api/v1.0/modelmp/regions?lang=zh

**Response Example**:
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
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**Field Description**:
data.region is an array of regions:
| Field | Type | Description |
|-------|------|-------------|
| region_id | integer | Region unique ID |
| region_name | string | Region name |

---

### Get Model Price List
**Feature Description**
Filter and return a list of model pricing meeting the conditions. Filter conditions support multiple values, separated by English commas.

```
GET /api/v1.0/modelmp/prices
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| category_id | No | - | string | Filter by category ID, multiple values separated by commas |
| size_id | No | - | string | Filter by size ID, multiple values separated by commas |
| model_id | No | - | string | Filter by model ID, multiple values separated by commas |
| region_id | No | - | string | Filter by region ID, multiple values separated by commas |
| lang | No | zh | string | Language: zh/en |
| page | No | 1 | integer | Page number |
| page_size | No | 100 | integer | Items per page, 1-300 |

**Request Example**:
GET /api/v1.0/modelmp/prices?category_id=1,2&model_id=1,2&region_id=1,2&page=1&page_size=100&lang=zh

**Response Example**:
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

**Field Description**:

data.price is an array of price objects:
| Field | Type | Description |
|-------|------|-------------|
| model_id | integer | Model unique ID |
| model_name | string | Model name |
| region_id | integer | Service region ID |
| region_name | string | Service region name |
| csp_id | integer | Service provider ID |
| csp_name | string | Service provider name |
| condition | string | Pricing condition |
| input_price | double | Input token price (per million tokens) |
| output_price | double | Output token price (per million tokens) |
| currency | string | Currency: USD or CNY |
| extra_info | string | Additional supplementary information |

data.pagination is pagination info:
| Field | Type | Description |
|-------|------|-------------|
| page | integer | Current page number |
| page_size | integer | Items per page |
| total | integer | Total count |
| total_pages | integer | Total pages |
| has_more | boolean | Whether there is a next page |

---

### Calculate Model Cost and Rank
**Feature Description**
Calculate the total call cost for each model based on user-specified input tokens, output tokens, API call count, and exchange rate, and return ranking results sorted by total cost in ascending order (lower cost ranks higher). Supports filtering by model category, parameter size, service region, brand, etc.

```
GET /api/v1.0/modelmp/prices/cost-rankings
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| input_tokens | No | 1000 | integer | Input token count, ≥0 |
| output_tokens | No | 2000 | integer | Output token count, ≥0 |
| api_calls | No | 1000 | integer | API call count, ≥0 |
| exchange_rate | No | System real-time query | double | USD/CNY exchange rate, used when target currency differs from pricing currency |
| target_currency | No | CNY | string | Target currency: CNY/USD, calculation results are uniformly converted to this currency |
| category_id | No | - | string | Filter by category ID, multiple values separated by commas |
| size_id | No | - | string | Filter by size ID, multiple values separated by commas |
| region_id | No | - | string | Filter by region ID, multiple values separated by commas |
| model_id | No | - | string | Filter by model ID, multiple values separated by commas |
| brand_id | No | - | string | Filter by brand ID, multiple values separated by commas |
| opensource | No | - | boolean | true/false |
| lang | No | zh | string | Language: zh/en |
| sort | No | total_cost | string | Sort field, supports total_cost / cost_per_call / input_price / output_price, prefix with `-` for descending order |
| page | No | 1 | integer | Page number |
| page_size | No | 100 | integer | Items per page, 1-300 |

**Request Example**:
GET /api/v1.0/modelmp/prices/cost-rankings?input_tokens=1000&output_tokens=2000&api_calls=1000&exchange_rate=7.0&target_currency=CNY&category_id=1&region_id=1&page=1&page_size=100&lang=zh

**Response Example**:
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

**Field Description**:

data top-level query parameter echo:
| Field | Type | Description |
|-------|------|-------------|
| input_tokens | integer | Input token count from request |
| output_tokens | integer | Output token count from request |
| api_calls | integer | API call count from request |
| exchange_rate | double | USD/CNY exchange rate from request |
| target_currency | string | Target currency from request |

data.cost_rankings is an array of cost rankings, sorted by total_cost ascending:
| Field | Type | Description |
|-------|------|-------------|
| model_id | integer | Model unique ID |
| model_name | string | Model name |
| category_name | string | Model category name |
| size | string | Parameter size, null if not disclosed |
| brand_name | string | Brand name |
| csp_name | string | API service provider name |
| region_name | string | Service region name |
| condition | string | Price condition or constraint |
| input_price | double | Original input token price (per million tokens), 8 decimal places retained |
| output_price | double | Original output token price (per million tokens), 8 decimal places retained |
| original_currency | string | Original pricing currency: USD or CNY |
| cost_per_call | double | Cost per API call (target currency) |
| total_cost | double | Total cost = cost_per_call × api_calls (target currency) |
| rank | integer | Cost ranking, lower cost ranks higher |

**Calculation Logic**:
- `cost_per_call = (input_price × input_tokens + output_price × output_tokens) / 1,000,000`
- `total_cost = cost_per_call × api_calls`
- `If target_currency differs from original_currency, conversion is performed using exchange_rate`

**Sorting Rules**:
- Default sort by `total_cost` ascending (lower cost ranks higher)
- `sort=total_cost` or `sort=cost_per_call` means ascending order
- `sort=-total_cost` or `sort=-cost_per_call` means descending order

data.pagination is pagination info:
| Field | Type | Description |
|-------|------|-------------|
| page | integer | Current page number |
| page_size | integer | Items per page |
| total | integer | Total count |
| total_pages | integer | Total pages |
| has_more | boolean | Whether there is a next page |

---

### Get Model Capability Rankings
**Feature Description**
Returns TOP models for metrics indexed by the platform, supporting:
- Intelligence Index: type value is `intelligence_index`
- Code Index: type value is `code_index`
- Agentic Index: type value is `agentic_index`
- Context Window: type value is `context_size`
- Usage: type value is `usage`

```
GET /api/v1.0/modelmp/model-rankings
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| type | Yes | - | string | intelligence_index / code_index / agentic_index / context_size / usage |
| date | No | API call date | string(date) | Valid when type=usage, format YYYY-MM-DD |
| range | No | 30 | integer | Valid when type=usage, aggregate usage from recent N days ending at date. Supports 1/7/14/30 days |
| topN | No | 10 | integer | Return top N rankings. When type=usage, topN maximum is 10 |
| opensource | No | - | boolean | true/false, empty means all models |
| lang | No | zh | string | Language: zh/en |

**Request Example**:
GET /api/v1.0/modelmp/model-rankings?type=intelligence_index

**Response Example**:
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
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**Field Description**:

data.type is the ranking type:
| Field | Type | Description |
|-------|------|-------------|
| type | string | intelligence_index / code_index / agentic_index / context_size / usage |

data.top_model is an array of model rankings:
| Field | Type | Description |
|-------|------|-------------|
| model_id | integer | Platform assigns a unique ID for each indexed model |
| model_name | string | Model name |
| value | integer | Metric score or usage volume, usage unit is M |
| rank | integer | Ranking position |

---

### Get Model Brand Rankings
**Feature Description**
Returns TOP model brands for metrics indexed by the platform, supporting:
- Usage: aggregate usage ranking by recent days, type value is `usage`
- Popularity: ranking by model brand popularity, type value is `popularity`

```
GET /api/v1.0/modelmp/brand-rankings
```

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| type | Yes | - | string | Ranking type: usage/popularity |
| topN | No | 10 | integer | When type=usage, topN maximum is 10 |
| date | No | Today/This month | string(date) | When type=usage, format YYYY-MM-DD; when type=popularity, format YYYY-MM |
| range | No | 30 | integer | Valid when type=usage, aggregate usage from recent N days ending at date. Supports 1/7/14/30 days |
| lang | No | zh | string | Language: zh/en |

**Request Example**:
GET /api/v1.0/modelmp/brand-rankings?type=popularity

**Response Example**:
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
        ]
    },
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

**Field Description**:

data.type is the ranking type:
| Field | Type | Description |
|-------|------|-------------|
| type | string | Ranking type: popularity/usage |

data.top_brand is an array of brand rankings:
| Field | Type | Description |
|-------|------|-------------|
| brand_id | integer | Brand unique ID |
| brand_name | string | Brand name |
| value | integer | Popularity value or usage volume, usage unit is M |
| rank | integer | Ranking position |

---

## Error Codes

| HTTP Status | Business code | Description |
|-------------|---------------|-------------|
| 400 | 400 | Invalid request parameters |
| 401 | 401 | Missing required parameters |
| 404 | 402 | Requested data does not exist |
| 500 | 501 | Internal server error |
