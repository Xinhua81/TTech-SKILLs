# API 参数与响应字段详解

**API 响应消息整体结构**

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
| code | integer | 响应码，0表示成功，非0表示错误码|
| message | string | 响应消息的描述，成功时一般为success，失败时提供详细的失败信息 |
| data | object | 嵌套的JSON对象，用于返回请求的用户数据，不同API请求对应不同的结构。失败时为null |
| meta | object | meta对象主要包含请求消息中的关键信息，方便调用者调试代码 |

meta的主要字段如下：
| 字段 | 类型 | 说明 |
|------|------|------|
| request_id | string | 等于请求消息体中的request_id|
| timestamp | integer | 等于请求消息体中的timestamp|

当响应消息体涉及分页时，data中会包含pagination对象：
```json
"pagination": {
    "page": 1,
    "page_size": 20,
    "total": 156,
    "total_pages": 8,
    "has_more": true
}
```
对象pagination中各字段的含义：
| 字段 | 类型 | 说明 |
|------|------|------|
| page | integer | 当前页码，从1开始 |
| page_size | integer | 每页条数 |
| total | integer | 总条数 |
| total_pages | integer | 总页数 |
| has_more | boolean | true 表示还有下一页 |

## 1. 获取公司列表

```
GET /companies
```

### 请求参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `lang` | 否 | `zh` | `zh` / `en` |
| `company_name` | 否 | — | 按名称过滤，大小写不敏感，模糊匹配 |
| `page` | 否 | `1` | 页码 |
| `page_size` | 否 | `100` | 每页条数，1–1000 |

### 响应字段

**`data.companies[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `company_id` | integer | 公司唯一 ID |
| `company_name` | string | 公司名称 |
| `abbr` | string | 公司简称的字母缩写，常用于排序 |
| `full_name` | string | 公司全名 |

**`data.pagination`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `page` | integer | 当前页码 |
| `page_size` | integer | 每页条数 |
| `total` | integer | 总条数 |
| `total_pages` | integer | 总页数 |
| `has_more` | boolean | 是否有下一页 |

---

## 2. 获取公司详情

```
GET /companies/{company_id}
```

### 请求参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `company_id` | 是（路径） | 公司唯一 ID |
| `lang` | 否 | `zh` / `en` |

> **注意**：如果只有公司名称没有 `company_id`，请先调用 `GET /companies?company_name={company_name}&page=1&page_size=1` 搜索获取 ID。

### 响应字段

**`data.company`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `company_id` | integer | 公司唯一 ID |
| `company_name` | string | 公司名称 |
| `abbr` | string | 公司简称的字母缩写，常用于排序 |
| `full_name` | string | 公司全名 |
| `stock_exchange` | string | 上市交易所代码或地区，未上市为 null |
| `stock_code` | string | 股票代码，未上市为 null |

**`data.related_company[]`** — 相关公司数组

| 字段 | 类型 | 说明 |
|------|------|------|
| `company_id` | integer | 公司唯一 ID |
| `company_name` | string | 公司名称 |

---

## 3. 获取公司股票数据

```
GET /companies/{company_id}/stock
```

### 请求参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `company_id` | 是（路径） | — | 公司唯一 ID |
| `interval` | 否 | `daily` | `daily` 日线 / `monthly` 月线 / `yearly` 年线 |
| `limit` | 否 | `1` | 最近多少条 |
| `lang` | 否 | `zh` | `zh` / `en` |

> **注意**：如果只有公司名称没有 `company_id`，请先调用 `GET /companies?company_name={company_name}&page=1&page_size=1` 搜索获取 ID。

### 响应字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `company_id` | integer | 公司唯一 ID |
| `company_name` | string | 公司名称 |
| `interval` | string | 本次返回的数据粒度 |
| `currency` | string | 货币单位：USD、CNY、HKD |

**`data.stock_data[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `date` | string | 交易日期，格式 `YYYY-MM-DD`（日线）/ `YYYY-MM`（月线）/ `YYYY`（年线）|
| `open` | number | 开盘价 |
| `close` | number | 收盘价 |
| `high` | number | 最高价 |
| `low` | number | 最低价 |
| `volume` | integer | 交易量 |

---

## 4. 获取公司新闻

```
GET /companies/{company_id}/news
```

### 请求参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `company_id` | 是（路径） | 公司唯一 ID |
| `lang` | 否 | `zh` / `en` |

> **注意**：如果只有公司名称没有 `company_id`，请先调用 `GET /companies?company_name={company_name}&page=1&page_size=1` 搜索获取 ID。

### 响应字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `company_id` | integer | 公司唯一 ID |
| `company_name` | string | 公司名称 |

**`data.company_news[]`** — 该公司的新闻

| 字段 | 类型 | 说明 |
|------|------|------|
| `news_id` | integer | 新闻唯一 ID |
| `title` | string | 新闻标题 |
| `summary` | string | 新闻摘要 |
| `source` | string | 新闻来源 |
| `author` | string | 新闻作者 |
| `publish_time` | string | ISO 8601 发布时间 |
| `company_id` | integer | 公司 ID |
| `company_name` | string | 公司名称 |

**`data.related_company_news[]`** — 相关公司的新闻

| 字段 | 类型 | 说明 |
|------|------|------|
| `news_id` | integer | 新闻唯一 ID |
| `title` | string | 新闻标题 |
| `summary` | string | 新闻摘要 |
| `source` | string | 新闻来源 |
| `author` | string | 新闻作者 |
| `publish_time` | string | ISO 8601 发布时间 |
| `company_id` | integer | 相关公司 ID |
| `company_name` | string | 相关公司名称 |
