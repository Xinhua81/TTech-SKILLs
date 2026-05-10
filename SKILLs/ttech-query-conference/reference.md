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

## 1. Get Conference Type List

```
GET /conferences/types
```

### Request Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `lang` | No | `en` | `zh` / `en` |

### Response Fields

**`data.type[]`**

| Field | Type | Description |
|-------|------|-------------|
| `type_id` | integer | Unique conference type ID |
| `name` | string | Conference type name |

---

## 2. Get Conference List

```
GET /conferences
```

### Request Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `year` | **Yes** | — | Year, e.g. `2026` |
| `month` | No | `0` | `0` means full year, `1–12` means a specific month |
| `type_id` | No | — | Filter by conference type |
| `conf_name` | No | — | Fuzzy filter by conference theme, case-insensitive |
| `conf_org` | No | — | Fuzzy filter by conference organizer, case-insensitive |
| `lang` | No | `en` | `zh` / `en` |

### Response Fields

**`data.agenda[]`**

| Field | Type | Description |
|-------|------|-------------|
| `subject` | string | Conference theme |
| `organization` | string | Conference organizer |
| `start_date` | string | Conference start date, format `YYYY-MM-DD` |
| `end_date` | string | Conference end date, format `YYYY-MM-DD` |
| `type_id` | integer | Conference type ID |
| `type_name` | string | Conference type name |
| `location` | string | Conference location |
| `website` | string | Conference website URL |
| `acked` | boolean | Whether the agenda has been officially confirmed |
