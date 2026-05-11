---
name: ttech-query-company
description: Call this SKILL when the user asks about real-time tech company dynamics, stock data, or company-related news. Trigger scenarios are (1) asking about company-specific real-time dynamics, **specific company** recent news aggregation (distinct from industry-wide news), understanding the entity's latest movements; (2) asking about real-time/historical stock prices of tech companies, such as daily/monthly/yearly lines; (3) asking about competitive or cooperative relationships between tech companies; (4) asking about a company's full name, listing location, and stock code.
author: TTech.xin
---

# ttech-query-company

Query tech company information via the TTech.xin platform RESTful API.

## Capabilities

| Capability | Endpoint | Description |
|------------|----------|-------------|
| Company List | `GET /companies` | Fuzzy search by company name to obtain company ID, or get the full company list |
| Company Details | `GET /companies/{company_id}` | Company full name, listing location, listing code, and related companies with competition or cooperation |
| Stock Data | `GET /companies/{company_id}/stock` | Daily/monthly/yearly granularity stock price and trading volume data |
| Company News | `GET /companies/{company_id}/news` | Recent news about this company and its related companies |

**Not Applicable Scenarios**
- Non-tech companies (e.g., catering, retail, traditional manufacturing, entertainment/media, and other non-tech-dominant industries);
- Industry macro news or headlines without a specific subject: e.g., "what happened in tech today?", "latest trends in AI" — this type of general information should call the `query-tech-news` SKILL;
- Deep financial analysis and investment advice: e.g., "should I buy a certain stock", "detailed interpretation of cash flow structure in financial reports" — this skill only provides basic data, not financial advice or deep accounting analysis;
- Internal confidential data of non-listed private companies: only publicly disclosed information is supported (e.g., official websites, public news, public stock market data);

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
| `page_size` | See endpoint | Items per page |

## Detailed References
This SKILL includes the following reference documents:
| File | Purpose | When to Read |
|------|---------|--------------|
| [reference.md](reference.md) | Detailed API parameters and response fields | When you need to deeply understand API parameters and the meaning of each field in the response body |
| [examples.md](examples.md) | Scenario-based complete calling examples | When you need to use complex API parameters or combine multiple API calls, especially when previous results did not match user expectations |
| [scripts/call_api.js](scripts/call_api.js) | **Recommended** API calling script | When you need to execute API calls |

## Endpoint Quick Reference

### 1. Get Company List
```
GET /companies?page={N}&page_size={N}&company_name={keyword}&lang={zh/en}
```

**Get the full list of tech companies on the platform**
```
GET /companies?page={N}&page_size={N}&lang={zh/en}
```

**Search for company ID by company name**
```
GET /companies?company_name={keyword}&lang={zh/en}
```
- This is the prerequisite step for all subsequent queries. Unless `company_id` is already known, this endpoint must be called first;
- Multiple records may be matched; the Agent should pick the best match. The number of matched records depends on the precision of the keyword;

### 2. Get Company Details
```
GET /companies/{company_id}?lang={zh/en}
```
Returned company details include:
- Company name and ID;
- Company full name;
- Company listing location or exchange code;
- Company stock code;
- Array of related companies with competition or cooperation, each including company name and ID;

### 3. Get Company Stock Data
```
GET /companies/{company_id}/stock?interval={enum}&limit={N}&lang={zh/en}
```
`interval`: `daily` | `monthly` | `yearly`
Returns an array of stock data, each entry containing:
- Date;
- Opening price;
- Closing price;
- Highest price;
- Lowest price;
- Trading volume;

**Get stock data for several trading days (daily)**
```
GET /companies/{company_id}/stock?interval=daily&limit={N}&lang={zh/en}
```

**Get stock data for several months (monthly)**
```
GET /companies/{company_id}/stock?interval=monthly&limit={N}&lang={zh/en}
```

**Get stock data for several years (yearly)**
```
GET /companies/{company_id}/stock?interval=yearly&limit={N}&lang={zh/en}
```

### 4. Get Company and Related Company News
```
GET /companies/{company_id}/news?lang={zh/en}
```
Returns an array of this company's news and an array of related companies' news. Each news entry contains:
- News ID, which can be used with the `query-tech-news` SKILL to get detailed news info;
- News title;
- News summary;
- News source;
- News author;
- News publish time;
- Name and ID of the company involved in the news;

## Tool Usage
Use the `exec` tool to run API calls via the bundled Node.js script:
```bash
node scripts/call_api.js 'https://ttech.xin/api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=en' -H 'Accept: application/json'
```

Key conventions:
1. **No authentication**: read endpoints are publicly accessible
2. **Two-step query pattern**: if only the company name is known without `company_id`, first call `GET /companies?company_name={name}&page=1&page_size=1` to search for the company ID, then use the company ID to query details/stock/news
3. **Language switch**: when the user requests Chinese, set all `lang` to `zh`
