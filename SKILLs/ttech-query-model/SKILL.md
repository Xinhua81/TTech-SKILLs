---
name: ttech-query-model
description: Call this SKILL when the user asks about AI model basic profiles, API pricing, API service scope, API providers, or cost/capability/usage/popularity rankings. Trigger scenarios are (1) querying a model's basic profile, including category, parameter size, Intelligence Index, Coding Index, Agentic Index, context length, model brand, open-source status, release date, developing company, API service provider list, API service region list, model official website, and detailed capability introduction; (2) multi-dimensional capability evaluation, obtaining a model's Intelligence Index, Coding Index, Agentic Index, and other professional benchmark data; (3) API pricing and cost, querying API quotes from various providers in different regions, input/output Token prices, or using the price calculator to estimate total cost for a specific task; (4) model leaderboards and comparison, ranking and comparing models or brands by cost, Intelligence Index, Coding Index, Agentic Index, context length, popularity, or usage.
author: TTech.xin
---

# ttech-query-model

Query AI model information via the TTech.xin platform RESTful API.

## Capabilities

| Capability | Endpoint | Description |
|------------|----------|-------------|
| Metadata | `GET /modelmp/categories`, `GET /modelmp/sizes`, etc. | Query categories, parameter sizes, model brands, API service providers (CSPs), region enum values and their IDs |
| Model List | `GET /modelmp/models` | Query and return a list of models with multi-condition filtering (category/size/brand/name/open-source), supports pagination |
| Model Details | `GET /modelmp/models/{model_id}` | Full model info, capability indices, and service providers (CSPs) |
| Price Query | `GET /modelmp/prices` | API quotes for each model by each CSP in each region |
| Cost Ranking (Price Calculator) | `GET /modelmp/prices/cost-rankings` | Input tokens, output tokens, and API call count to calculate total cost and rank |
| Model Capability Ranking | `GET /modelmp/model-rankings` | Rank by Intelligence Index / Coding Index / Agentic Index / context size or model usage |
| Model Brand Ranking | `GET /modelmp/brand-rankings` | Rank model brands by popularity or usage |

**Not Applicable Scenarios**
- Tech conferences related to models: e.g., asking about AI-related tech conferences, please call the `query-tech-conference` SKILL;
- Tech news and trends related to models: e.g., asking about AI technology trends, please call the `query-tech-news` SKILL;
- Single-company profiles related to models: e.g., asking "what kind of company is Alibaba", please call the `query-tech-company` SKILL;
- Abstract theory and ethics discussions: asking "what is artificial intelligence" or "will AI replace humans" and other philosophical, ethical, or basic popular science questions, rather than specific model data queries;

## General Conventions

**Base URL**: `https://ttech.xin/api/v1.0`

**Response Format**:
```json
{
  "code": 0,
  "message": "success",
  "data": { ... },
  "meta": { "request_id": "...", "timestamp": 1713423456789 }
}
```

**Common Parameters**:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `lang` | `en` | `zh` / `en` |
| `page` | `1` | Page number, starting from 1 |
| `page_size` | `100` | Items per page, 1–300 |

## Detailed References
This SKILL includes the following reference documents:
| File | Purpose | When to Read |
|------|---------|--------------|
| [reference.md](reference.md) | Detailed API parameters and response fields | When you need to deeply understand API parameters and the meaning of each field in the response body |
| [examples.md](examples.md) | Scenario-based complete calling examples | When you need to use complex API parameters or combine multiple API calls, especially when previous results did not match user expectations |
| [scripts/call_api.js](scripts/call_api.js) | **Recommended** API calling script | When you need to execute API calls |

## Endpoint Quick Reference

### 1. Get Metadata
```
GET /modelmp/categories?lang={zh/en}
GET /modelmp/sizes?lang={zh/en}
GET /modelmp/brands?brand_name={keyword}&lang={zh/en}
GET /modelmp/csps?lang={zh/en}
GET /modelmp/regions?lang={zh/en}
```
Query categories, parameter sizes, model brands, API service providers (CSPs), region enum values and their IDs, **for subsequent metadata-based filtering queries**.
The model brand API also returns the brand's parent company name and company ID (corresponding to the **`query-tech-company` SKILL**) and the brand's official website.

### 2. Get Model List
```
GET /modelmp/models?category_id={ID,ID,...}&size_id={ID,ID,...}&model_id={ID,ID,...}&model_name={keyword,keyword,...}&brand_id={ID,ID,...}&opensource={false/true}&page={N}&page_size={N}&lang={zh/en}
```
Filter and return a list of models matching multiple combined conditions. Each condition supports multiple filter values.

Supported filter conditions:
- Category ID;
- Parameter size ID;
- Model ID;
- Model name;
- Model brand ID;
- Open-source status;

Metadata IDs in filter conditions can be obtained via the **Get Metadata** APIs.

Each model in the returned list includes:
- Model ID and name;
- Category ID and name;
- Parameter size ID and value;
- Open-source status;
- Intelligence Index, Coding Index, Agentic Index;
- Context length;
- Release date;
- Parent model brand ID and name;
- List of API service providers offering this model, each including ID and name;

### 3. Get Model Details
```
GET /modelmp/models/{model_id}?lang={zh/en}
```
Input a model ID to return detailed information for that model. Details add the following on top of the model list API:
- Model official website;
- ID of the company that developed the model (corresponding to the `query-tech-company` SKILL);
- Name of the company that developed the model (corresponding to the `query-tech-company` SKILL);
- Detailed model description in Markdown format;

### 4. Get Model Price List by CSP
```
GET /modelmp/prices?category_id={ID,ID,...}&region_id={ID,ID,...}&model_id={ID,ID,...}&page={N}&page_size={N}&lang={zh/en}
```
Filter and return a list of CSP model quotes matching multiple combined conditions. Each condition supports multiple filter values.

Supported filter conditions:
- Category ID;
- Region ID;
- Model ID;

Metadata IDs in filter conditions can be obtained via the **Get Metadata** APIs.

Each quote in the returned price list includes:
- Model ID and name;
- Region ID and name;
- API service provider (CSP) ID and name;
- Price condition or constraint;
- Input Token unit price (per million tokens);
- Output Token unit price (per million tokens);
- Currency unit;
- Extra info for exceptions to the quote;

### 5. Get Cost Rankings (Price Calculator)
```
GET /modelmp/prices/cost-rankings?input_tokens={N}&output_tokens={N}&api_calls={N}&exchange_rate={N}&target_currency={CNY/USD}&category_id={ID,ID,...}&size_id={ID,ID,...}&region_id={ID,ID,...}&model_id={ID,ID,...}&brand_id={ID,ID,...}&opensource={true/false}&sort={enum}&page={N}&page_size={N}&lang={zh/en}
```
`sort`: `total_cost` | `-total_cost` | `cost_per_call` | `-cost_per_call` | `input_price` | `-input_price` | `output_price` | `-output_price`

Calculate the single-call API cost and end-to-end total cost for models matching the filter conditions based on the input API call pattern, combined filters, and exchange rate, then rank by cost.

API call pattern parameters:
- Input tokens per single API call;
- Output tokens per single API call;
- Total API call count;

Combined filter conditions support multiple conditions, each with multiple values. Supported filters:
- Category ID;
- Parameter size ID;
- Region ID;
- Model ID;
- Brand ID;
- Open-source status;

You can specify the USD-to-RMB exchange rate via `exchange_rate`, or omit it and let the system calculate using the real-time rate automatically.

Each returned record includes:
- Model ID and name;
- Category name;
- Model parameter size value;
- Model brand name;
- CSP name;
- Region name;
- Price condition or constraint;
- Input Token unit price (per million tokens);
- Output Token unit price (per million tokens);
- Price currency unit;
- Single API call cost, currency specified by the `target_currency` parameter;
- Total call cost, currency specified by the `target_currency` parameter;
- Rank in this ranking;

### 6. Model Rankings by Capability / Usage
```
GET /modelmp/model-rankings?type={enum}&opensource={true/false}&topN={N}&date={YYYY-MM-DD}&range={enum}&lang={zh/en}
```
`type`: `intelligence_index` | `code_index` | `agentic_index` | `context_size` | `usage`
`range`: `1` | `7` | `14` | `30`

**Rank by Intelligence Index**
With open-source distinction:
```
GET /modelmp/model-rankings?type=intelligence_index&opensource={true/false}&topN={N}&lang={zh/en}
```

Without open-source distinction:
```
GET /modelmp/model-rankings?type=intelligence_index&topN={N}&lang={zh/en}
```

**Rank by Coding Index**
With open-source distinction:
```
GET /modelmp/model-rankings?type=code_index&opensource={true/false}&topN={N}&lang={zh/en}
```

Without open-source distinction:
```
GET /modelmp/model-rankings?type=code_index&topN={N}&lang={zh/en}
```

**Rank by Agentic Index**
With open-source distinction:
```
GET /modelmp/model-rankings?type=agentic_index&opensource={true/false}&topN={N}&lang={zh/en}
```

Without open-source distinction:
```
GET /modelmp/model-rankings?type=agentic_index&topN={N}&lang={zh/en}
```

**Rank by Context Size**
With open-source distinction:
```
GET /modelmp/model-rankings?type=context_size&opensource={true/false}&topN={N}&lang={zh/en}
```

Without open-source distinction:
```
GET /modelmp/model-rankings?type=context_size&topN={N}&lang={zh/en}
```

**Rank by Model Usage**
Based on the specified `date`, look back `range` days, aggregate model usage within that window, and rank by usage:
```
GET /modelmp/model-rankings?type=usage&date={YYYY-MM-DD}&range={N}&topN={N}&lang={zh/en}
```

### 7. Get Brand Rankings
```
GET /modelmp/brand-rankings?type={popularity/usage}&date={YYYY-MM-DD}&range={enum}&topN={N}&lang={zh/en}
```
`range`: `1` | `7` | `14` | `30`

**Rank by Brand Popularity**
Based on the specified month (`date`) brand popularity ranking:
```
GET /modelmp/brand-rankings?type=popularity&date={YYYY-MM}&topN={N}&lang={zh/en}
```

**Rank by Brand Usage**
Based on the specified `date`, look back `range` days, aggregate brand usage within that window, and rank by usage:
```
GET /modelmp/brand-rankings?type=usage&date={YYYY-MM-DD}&range={enum}&topN={N}&lang={zh/en}
```

## Tool Usage
Use the `exec` tool to run API calls via the bundled Node.js script:
```bash
node scripts/call_api.js 'https://ttech.xin/api/v1.0/modelmp/models?opensource=true&page=1&page_size=100&lang=en' -H 'Accept: application/json'
```

Key conventions:
1. **No authentication**: read endpoints are publicly accessible
2. **Multi-value parameters**: filter conditions support comma-separated multiple values, e.g. `category_id=1,2,3`
3. **Language switch**: when the user requests Chinese, set all `lang` to `zh`
4. **Two-step query pattern**: if the metadata value-to-ID mapping is missing, first call the metadata API to obtain the mapping data, then call the corresponding API via ID
