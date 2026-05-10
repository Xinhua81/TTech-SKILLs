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

## 1. Get News List

```
GET /news
```

### Request Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `start_date` | No | — | Start date `YYYY-MM-DD` |
| `end_date` | No | — | End date `YYYY-MM-DD` |
| `lang` | No | `en` | `zh` / `en` |
| `page` | No | `1` | Page number |
| `page_size` | No | `20` | Items per page, 1–100 |
| `limit` | No | — | Recent N items; when set, ignores `page`/`page_size` |
| `subject` | No | — | Topic keyword, fuzzy match against title and summary |

### Response Fields

**`data.news[]`**

| Field | Type | Description |
|-------|------|-------------|
| `news_id` | integer | Unique news ID |
| `title` | string | Title |
| `summary` | string | Summary, generally < 256 characters |
| `source` | string | Source |
| `author` | string | Author |
| `publish_time` | string | ISO 8601 publish time |
| `company_name` | string | Name of the involved company |
| `company_id` | integer | ID of the involved company |

**`data.pagination`** (`null` in `limit` mode)

| Field | Type | Description |
|-------|------|-------------|
| `page` | integer | Current page number |
| `page_size` | integer | Items per page |
| `total` | integer | Total items |
| `total_pages` | integer | Total pages |
| `has_more` | boolean | Whether there is a next page |

---

## 2. Get News Details

```
GET /news/{news_id}
```

### Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `news_id` | Yes (path) | Unique news ID |
| `lang` | No | `zh` / `en` |

### Response Fields

**`data.news`** — Added on top of list fields:

| Field | Type | Description |
|-------|------|-------------|
| `content` | string | News body text |
| `url` | string | Original link |

**`data.related_news[]`** — Related news summary array

| Field | Type | Description |
|-------|------|-------------|
| news_id | integer | Unique news ID |
| title | string | News title |
| source | string | News source |
| publish_time | string(datetime) ISO 8601 | Publish time |
| company_name | string | Name of the involved company |
| company_id | integer | ID of the involved company |

---

## 3. Get News Briefings (Daily/Weekly/Monthly)

```
GET /news/briefings
```

### Request Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `lang` | No | `en` | `zh` / `en` |
| `interval` | No | `daily` | `daily` daily briefing / `weekly` weekly briefing / `monthly` monthly briefing |
| `date` | No | Today | Reference date `YYYY-MM-DD`; weekly uses Sunday of the week, monthly uses month end |

### Response Fields

**`data`**

| Field | Type | Description |
|-------|------|-------------|
| `top10_news` | string[] | TOP10 news summaries |
| `opinion` | string | Core opinion summary |
| `suggestion` | string | Suggestions for practitioners |
