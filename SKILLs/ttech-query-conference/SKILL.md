---
name: ttech-query-conference
description: Call this SKILL when the user asks about tech conferences, industry summits, product launches, or exhibition information. Trigger scenarios include: (1) asking about conference agendas by time, e.g., what tech conferences are in May this year, what conferences are upcoming/this month/next month; (2) asking about conference agendas by type, e.g., what academic/enterprise/comprehensive/regional conferences are this year; (3) asking about conference agendas by organizer, e.g., when are Nvidia/Google/Huawei/Alibaba conferences; (4) asking about conference agendas by keyword, e.g., when is this year's GTC/Huawei Connect/Alibaba Cloud Apsara Conference.
author: TTech.xin
---

# ttech-query-conference

Query tech conference information via the TTech.xin platform RESTful API.

## Capabilities

| Capability | Endpoint | Description |
|------------|----------|-------------|
| Conference Agenda | `GET /conferences` | Query conference agenda list by year, month, type, name, or organizer |
| Metadata (Conference Types) | `GET /conferences/types` | Get all conference types recorded on the platform |

**Not Applicable Scenarios**
- Non-tech general exhibitions (e.g., art exhibitions, auto shows, comic exhibitions, and other non-tech-oriented activities, unless explicitly involving a tech segment);
- Pure academic paper retrieval or journal publication queries (should call academic-search related skills);
- Non-public industry closed-door meetings (unless there is public coverage);

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

## Detailed References
This SKILL includes the following reference documents:
| File | Purpose | When to Read |
|------|---------|--------------|
| [reference.md](reference.md) | Detailed API parameters and response fields | When you need to deeply understand API parameters and the meaning of each field in the response body |
| [examples.md](examples.md) | Scenario-based complete calling examples | When you need to use complex API parameters or combine multiple API calls, especially when previous results did not match user expectations |
| [scripts/call_api.js](scripts/call_api.js) | **Recommended** API calling script | When you need to execute API calls |

## Endpoint Quick Reference

### 1. Get Conference Type List
```
GET /conferences/types?lang={zh/en}
```
Returns a mapping list of conference type names and conference type IDs.

### 2. Query Conference Agenda
```
GET /conferences?year={YYYY}&month={MM}&type_id={ID,ID,...}&conf_name={keywords}&conf_org={keywords}&lang={zh/en}
```
`month`: `0` means full year, `1–12` means a specific month
Returns conference agendas filtered by multiple combined conditions. Filter conditions can be:
- Conference type;
- Conference name;
- Conference organizer;

## Tool Usage
Use the `exec` tool to run API calls via the bundled Node.js script:
```bash
node scripts/call_api.js 'https://ttech.xin/api/v1.0/conferences?year=2026&month=0&lang=en' -H 'Accept: application/json'
```

Key conventions:
1. **No authentication**: read endpoints are publicly accessible
2. **Date format**: `YYYY-MM-DD`
3. **Language switch**: when the user requests Chinese, set all `lang` to `zh`
4. **Two-step query pattern**: if `type_id` is not available, first call `/conferences/types?lang=en` to get the type_id list, then use the appropriate type_id to query the corresponding conference agenda
