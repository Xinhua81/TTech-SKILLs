# API Parameters and Response Fields

**API Response Message Overall Structure**

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

The overall structure of the API response is as follows:
| Field | Type | Description |
|-------|------|-------------|
| code | integer | Response code, 0 means success, non-0 means error code |
| message | string | Description of the response message, generally "success" on success, detailed failure info on failure |
| data | object | Nested JSON object for returning requested user data, structure varies by API. null on failure |
| meta | object | The meta object mainly contains key information from the request message, convenient for debugging |

The main fields of the meta object are as follows:
| Field | Type | Description |
|-------|------|-------------|
| request_id | string | Equals the request_id in the request message |
| timestamp | integer | Equals the timestamp in the request message |

When the response message involves pagination, the data contains a pagination object:
```json
"pagination": {
    "page": 1,
    "page_size": 20,
    "total": 156,
    "total_pages": 8,
    "has_more": true
}
```
The meaning of each field in the pagination object:
| Field | Type | Description |
|-------|------|-------------|
| page | integer | Current page number, starting from 1 |
| page_size | integer | Items per page |
| total | integer | Total number of items |
| total_pages | integer | Total number of pages |
| has_more | boolean | true means there is a next page |

## 1. Get Company List

```
GET /companies
```

### Request Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `lang` | No | `en` | `zh` / `en` |
| `company_name` | No | — | Filter by name, case-insensitive, fuzzy match |
| `page` | No | `1` | Page number |
| `page_size` | No | `100` | Items per page, 1–1000 |

### Response Fields

**`data.companies[]`**

| Field | Type | Description |
|-------|------|-------------|
| `company_id` | integer | Unique company ID |
| `company_name` | string | Company name |
| `abbr` | string | Alphabetic abbreviation of company short name, commonly used for sorting |
| `full_name` | string | Company full name |

**`data.pagination`**

| Field | Type | Description |
|-------|------|-------------|
| `page` | integer | Current page number |
| `page_size` | integer | Items per page |
| `total` | integer | Total items |
| `total_pages` | integer | Total pages |
| `has_more` | boolean | Whether there is a next page |

---

## 2. Get Company Details

```
GET /companies/{company_id}
```

### Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `company_id` | Yes (path) | Unique company ID |
| `lang` | No | `zh` / `en` |

> **Note**: If only the company name is known without `company_id`, first call `GET /companies?company_name={company_name}&page=1&page_size=1` to search for the ID.

### Response Fields

**`data.company`**

| Field | Type | Description |
|-------|------|-------------|
| `company_id` | integer | Unique company ID |
| `company_name` | string | Company name |
| `abbr` | string | Alphabetic abbreviation of company short name, commonly used for sorting |
| `full_name` | string | Company full name |
| `stock_exchange` | string | Listing exchange code or region, null if not listed |
| `stock_code` | string | Stock code, null if not listed |

**`data.related_company[]`** — Related company array

| Field | Type | Description |
|-------|------|-------------|
| `company_id` | integer | Unique company ID |
| `company_name` | string | Company name |

---

## 3. Get Company Stock Data

```
GET /companies/{company_id}/stock
```

### Request Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `company_id` | Yes (path) | — | Unique company ID |
| `interval` | No | `daily` | `daily` daily line / `monthly` monthly line / `yearly` yearly line |
| `limit` | No | `1` | Recent how many records |
| `lang` | No | `en` | `zh` / `en` |

> **Note**: If only the company name is known without `company_id`, first call `GET /companies?company_name={company_name}&page=1&page_size=1` to search for the ID.

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `company_id` | integer | Unique company ID |
| `company_name` | string | Company name |
| `interval` | string | Data granularity of this response |
| `currency` | string | Currency unit: USD, CNY, HKD |

**`data.stock_data[]`**

| Field | Type | Description |
|-------|------|-------------|
| `date` | string | Trading date, format `YYYY-MM-DD` (daily) / `YYYY-MM` (monthly) / `YYYY` (yearly) |
| `open` | number | Opening price |
| `close` | number | Closing price |
| `high` | number | Highest price |
| `low` | number | Lowest price |
| `volume` | integer | Trading volume |

---

## 4. Get Company News

```
GET /companies/{company_id}/news
```

### Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `company_id` | Yes (path) | Unique company ID |
| `lang` | No | `zh` / `en` |

> **Note**: If only the company name is known without `company_id`, first call `GET /companies?company_name={company_name}&page=1&page_size=1` to search for the ID.

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `company_id` | integer | Unique company ID |
| `company_name` | string | Company name |

**`data.company_news[]`** — This company's news

| Field | Type | Description |
|-------|------|-------------|
| `news_id` | integer | Unique news ID |
| `title` | string | News title |
| `summary` | string | News summary |
| `source` | string | News source |
| `author` | string | News author |
| `publish_time` | string | ISO 8601 publish time |
| `company_id` | integer | Company ID |
| `company_name` | string | Company name |

**`data.related_company_news[]`** — Related companies' news

| Field | Type | Description |
|-------|------|-------------|
| `news_id` | integer | Unique news ID |
| `title` | string | News title |
| `summary` | string | News summary |
| `source` | string | News source |
| `author` | string | News author |
| `publish_time` | string | ISO 8601 publish time |
| `company_id` | integer | Related company ID |
| `company_name` | string | Related company name |
