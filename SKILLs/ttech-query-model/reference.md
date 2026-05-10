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

## 1. Get Metadata

### 1.1 Model Categories

```
GET /modelmp/categories
```

#### Request Parameters

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| lang | No | en | string | Language: zh/en |

#### Response Fields

**`data.category[]`**

| Field | Type | Description |
|-------|------|-------------|
| `category_id` | integer | Category ID |
| `category_name` | string | Category name |

### 1.2 Model Sizes

```
GET /modelmp/sizes
```

#### Request Parameters

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| lang | No | en | string | Language: zh/en |

#### Response Fields

**`data.size[]`**

| Field | Type | Description |
|-------|------|-------------|
| `size_id` | integer | Size ID |
| `size` | string | Size description |

### 1.3 Model Brands

```
GET /modelmp/brands
```

#### Request Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `brand_name` | No | — | Fuzzy filter by brand name, multiple values comma-separated |
| `lang` | No | `en` | `zh` / `en` |

#### Response Fields

**`data.brand[]`**

| Field | Type | Description |
|-------|------|-------------|
| `brand_id` | integer | Brand ID |
| `brand_name` | string | Brand name |
| `company_id` | integer | Parent company ID |
| `company_name` | string | Parent company name |
| `website` | string | Brand official website |

### 1.4 CSP (Service Providers)

```
GET /modelmp/csps
```

#### Request Parameters

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| lang | No | en | string | Language: zh/en |

#### Response Fields

**`data.csp[]`**

| Field | Type | Description |
|-------|------|-------------|
| `csp_id` | integer | Service provider ID |
| `csp_name` | string | Service provider name |
| `pricing_url` | string | Pricing page URL |

### 1.5 Service Regions

```
GET /modelmp/regions
```

#### Request Parameters

| Parameter | Required | Default | Type | Description |
|-----------|----------|---------|------|-------------|
| lang | No | en | string | Language: zh/en |

#### Response Fields

**`data.region[]`**

| Field | Type | Description |
|-------|------|-------------|
| `region_id` | integer | Region ID |
| `region_name` | string | Region name |

---

## 2. Get Model List

```
GET /modelmp/models
```

### Request Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `category_id` | No | — | Filter by category ID, multiple comma-separated |
| `size_id` | No | — | Filter by size ID, multiple comma-separated |
| `model_id` | No | — | Filter by model ID, multiple comma-separated |
| `model_name` | No | — | Fuzzy filter by model name, multiple comma-separated, case-insensitive |
| `brand_id` | No | — | Filter by brand ID, multiple comma-separated |
| `opensource` | No | — | `true` / `false` |
| `lang` | No | `en` | `zh` / `en` |
| `page` | No | `1` | Page number |
| `page_size` | No | `100` | Items per page, 1–300 |

### Response Fields

**`data.models[]`**

| Field | Type | Description |
|-------|------|-------------|
| `model_id` | integer | Unique model ID |
| `model_name` | string | Model name |
| `category_id` | integer | Category ID |
| `category_name` | string | Category name |
| `size_id` | integer | Parameter size ID, null if not disclosed |
| `size` | string | Parameter size, null if not disclosed |
| `opensource` | boolean | Whether open-source |
| `intelligence_index` | integer | Intelligence Index score, null if not disclosed |
| `code_index` | integer | Coding Index score, null if not disclosed |
| `agentic_index` | integer | Agentic Index score, null if not disclosed |
| `context_size` | integer | Context length |
| `publish_date` | string | Release date `YYYY-MM-DD` |
| `brand_id` | integer | Brand ID |
| `brand_name` | string | Brand name |

**`data.models[].csp[]`** — Service provider array

| Field | Type | Description |
|-------|------|-------------|
| `csp_id` | integer | Service provider ID |
| `csp_name` | string | Service provider name |

**`data.pagination`**

| Field | Type | Description |
|-------|------|-------------|
| `page` | integer | Current page number |
| `page_size` | integer | Items per page |
| `total` | integer | Total items |
| `total_pages` | integer | Total pages |
| `has_more` | boolean | Whether there is a next page |

---

## 3. Get Model Details

```
GET /modelmp/models/{model_id}
```

### Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `model_id` | Yes (path) | Unique model ID |
| `lang` | No | `zh` / `en` |

### Response Fields

**`data.model`** — Added on top of list fields:

| Field | Type | Description |
|-------|------|-------------|
| `website` | string | Model official website |
| `company_id` | integer | Developing company ID |
| `company_name` | string | Developing company name |
| `description` | string | Detailed model description |

---

## 4. Get Price List

```
GET /modelmp/prices
```

### Request Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `category_id` | No | — | Filter by category ID, multiple comma-separated |
| `size_id` | No | — | Filter by size ID, multiple comma-separated |
| `model_id` | No | — | Filter by model ID, multiple comma-separated |
| `region_id` | No | — | Filter by region ID, multiple comma-separated |
| `lang` | No | `en` | `zh` / `en` |
| `page` | No | `1` | Page number |
| `page_size` | No | `100` | Items per page, 1–300 |

### Response Fields

**`data.price[]`**

| Field | Type | Description |
|-------|------|-------------|
| `model_id` | integer | Model ID |
| `model_name` | string | Model name |
| `region_id` | integer | Region ID |
| `region_name` | string | Region name |
| `csp_id` | integer | Service provider ID |
| `csp_name` | string | Service provider name |
| `condition` | string | Price condition or constraint |
| `input_price` | number | Input Token price (per million tokens) |
| `output_price` | number | Output Token price (per million tokens) |
| `currency` | string | Currency: USD / CNY |
| `extra_info` | string | Additional supplementary info |

**`data.pagination`** — Same as model list

---

## 5. Get Cost Rankings

```
GET /modelmp/prices/cost-rankings
```

### Request Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `input_tokens` | No | `1000` | Input token count, ≥0 |
| `output_tokens` | No | `2000` | Output token count, ≥0 |
| `api_calls` | No | `1000` | API call count, ≥0 |
| `exchange_rate` | No | System real-time | USD/RMB exchange rate, used when target currency differs from original currency |
| `target_currency` | No | `USD` | Target currency: `CNY` / `USD` |
| `category_id` | No | — | Filter by category ID, multiple comma-separated |
| `size_id` | No | — | Filter by size ID, multiple comma-separated |
| `region_id` | No | — | Filter by region ID, multiple comma-separated |
| `model_id` | No | — | Filter by model ID, multiple comma-separated |
| `brand_id` | No | — | Filter by brand ID, multiple comma-separated |
| `opensource` | No | — | `true` / `false` |
| `lang` | No | `en` | `zh` / `en` |
| `sort` | No | `total_cost` | Sort field: `total_cost` / `cost_per_call` / `input_price` / `output_price`, prefix `-` for descending |
| `page` | No | `1` | Page number |
| `page_size` | No | `100` | Items per page, 1–300 |

### Response Fields

**`data`** — Top-level echo of query parameters

| Field | Type | Description |
|-------|------|-------------|
| `input_tokens` | integer | Input token count |
| `output_tokens` | integer | Output token count |
| `api_calls` | integer | API call count |
| `exchange_rate` | number | Exchange rate |
| `target_currency` | string | Target currency |

**`data.cost_rankings[]`** — Sorted by `total_cost` ascending

| Field | Type | Description |
|-------|------|-------------|
| `model_id` | integer | Model ID |
| `model_name` | string | Model name |
| `category_name` | string | Category name |
| `size` | string | Parameter size |
| `brand_name` | string | Brand name |
| `csp_name` | string | Service provider name |
| `region_name` | string | Region name |
| `condition` | string | Price condition |
| `input_price` | number | Original input Token price (per million tokens) |
| `output_price` | number | Original output Token price (per million tokens) |
| `original_currency` | string | Original currency: USD / CNY |
| `cost_per_call` | number | Single-call cost (target currency) |
| `total_cost` | number | Total cost = cost_per_call × api_calls |
| `rank` | integer | Cost rank, lower is better |

**Calculation Logic**:
- `cost_per_call = (input_price × input_tokens + output_price × output_tokens) / 1,000,000`
- `total_cost = cost_per_call × api_calls`
- When currencies differ, convert using `exchange_rate`

---

## 6. Get Model Rankings

```
GET /modelmp/model-rankings
```

### Request Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `type` | **Yes** | — | `intelligence_index` / `code_index` / `agentic_index` / `context_size` / `usage` |
| `date` | No | Today | Valid when `type=usage`, `YYYY-MM-DD` |
| `range` | No | `30` | Valid when `type=usage`, number of days to aggregate, supports `1`/`7`/`14`/`30` |
| `topN` | No | `10` | Valid when `type=usage`, maximum `10` |
| `opensource` | No | — | `true` / `false` |
| `lang` | No | `en` | `zh` / `en` |

### Response Fields

**`data.type`** — Ranking type

**`data.top_model[]`**

| Field | Type | Description |
|-------|------|-------------|
| `model_id` | integer | Model ID |
| `model_name` | string | Model name |
| `value` | integer | Metric score or usage, usage unit is M |
| `rank` | integer | Rank |

---

## 7. Get Brand Rankings

```
GET /modelmp/brand-rankings
```

### Request Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `type` | **Yes** | — | `usage` / `popularity` |
| `topN` | No | `10` | Valid when `type=usage`, maximum `10` |
| `date` | No | Today/This month | `type=usage`: `YYYY-MM-DD`; `type=popularity`: `YYYY-MM` |
| `range` | No | `30` | Valid when `type=usage`, number of days to aggregate, supports `1`/`7`/`14`/`30` |
| `lang` | No | `en` | `zh` / `en` |

### Response Fields

**`data.type`** — Ranking type

**`data.top_brand[]`**

| Field | Type | Description |
|-------|------|-------------|
| `brand_id` | integer | Brand ID |
| `brand_name` | string | Brand name |
| `value` | integer | Popularity value or usage, usage unit is M |
| `rank` | integer | Rank |
