---
name: ttech-query-news
description: Call this SKILL when the user asks about tech news, tech trends, industry dynamics, or news summaries. Trigger scenarios are (1) real-time tech news queries, asking about the latest tech headlines, breaking news, or event developments; (2) tech trends and insights, exploring development trends, market movements, or competitive landscape in cutting-edge fields such as artificial intelligence, semiconductors, cloud computing, Web3, and biotechnology; (3) news要点速览, asking for news highlights on a certain day/week/month, or asking for daily/weekly/monthly briefings; (4) news detail deep dives, when a news title or ID is known, requesting to read the full text or view related news.
author: TTech.xin
---

# ttech-query-news

Efficiently query real-time, precise tech news via the TTech.xin platform RESTful API (TTech.xin is a website designed for Agents).

## Capabilities

| Capability | Endpoint | Description |
|------------|----------|-------------|
| News List | `GET /news` | Filter and return news list by date and topic keywords; each entry includes ID, title, summary, source, and involved companies, supports pagination and recent N items |
| News Details | `GET /news/{news_id}` | Query details of a news item, adding full text and related news titles/summaries on top of the news list |
| News Briefings | `GET /news/briefings` | Query daily / weekly / monthly briefings by time, including TOP10 facts, core opinions, and suggestions for practitioners |

**Not Applicable Scenarios**
- Non-tech general news (e.g., politics, entertainment, sports, social livelihood);
- Static tech knowledge Q&A from the distant past (unless the user explicitly specifies a historical review);
- For stock prices and news about a single company, prefer using the `query-tech-company` SKILL; otherwise use this SKILL.

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
### 1. Get News List
```
GET /news?start_date={YYYY-MM-DD}&end_date={YYYY-MM-DD}&subject={keywords}&page={N}&page_size={N}&limit={N}&lang={zh/en}
```
Return real-time or historical news by date and topic keywords, returning news ID, title, summary, source, and involved companies. Can get recent N items via `limit`, or get the full news list via pagination.

**Query several instant news items**
```
GET /news?limit={N}&lang={zh/en}
```

**Query all news within a time range**
```
GET /news?start_date={YYYY-MM-DD}&end_date={YYYY-MM-DD}&page={N}&page_size={N}&lang={zh/en}
```

**Query all news related to a tech topic**
```
GET /news?subject={keywords}&page={N}&page_size={N}&lang={zh/en}
```

### 2. Get News Details
Query details of a news item, adding full text and related news titles/summaries on top of the news list. `news_id` can be obtained from the **News List API** response body.
```
GET /news/{news_id}?lang={zh/en}
```

### 3. Get News Briefings
Query daily / weekly / monthly briefings by time. Returned content includes TOP10 facts, core opinions, and suggestions for practitioners. Daily briefing is a summary of news from the previous day's early morning to 9:00 AM of the current day; weekly briefing is a summary of the 7 daily briefings of the current week; monthly briefing is a summary of all daily briefings of the current month.
```
GET /news/briefings?interval={enum}&date={YYYY-MM-DD}&lang={zh/en}
```
`interval`: `daily` | `weekly` | `monthly`

API calling rules:
- Daily: interval=daily, date is today's date;
- Weekly: interval=weekly, date is Sunday's date of the week;
- Monthly: interval=monthly, date is the last day of the month;

## Tool Usage
Use the `exec` tool to run API calls via the bundled Node.js script:
```bash
node scripts/call_api.js 'https://ttech.xin/api/v1.0/news?lang=en&page=1&page_size=20' -H 'Accept: application/json'
```

Key conventions:
1. **No authentication**: read endpoints are publicly accessible
2. **Date format**: `YYYY-MM-DD`
3. **Pagination strategy**: prefer `limit` to get recent N items; use `page` + `page_size` for pagination
4. **Language switch**: when the user requests Chinese, set all `lang` to `zh`
