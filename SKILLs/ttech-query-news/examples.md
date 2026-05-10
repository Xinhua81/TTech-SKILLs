# Calling Examples

**Example values are for structural reference only. Ensure all parameters are real runtime data when executing.**

## Example 1: Get the Latest 10 Tech News Items

```
GET /api/v1.0/news?limit=10&lang=en
```

## Example 2: Browse News (Newest to Oldest)

```
GET /api/v1.0/news?page=1&page_size=20&lang=en
GET /api/v1.0/news?page=2&page_size=20&lang=en
GET /api/v1.0/news?page=3&page_size=20&lang=en
```

## Example 3: Retrieve All Tech News for April 2026

```
GET /api/v1.0/news?start_date=2026-04-01&end_date=2026-04-30&page=1&page_size=100&lang=en
GET /api/v1.0/news?start_date=2026-04-01&end_date=2026-04-30&page=2&page_size=100&lang=en
GET /api/v1.0/news?start_date=2026-04-01&end_date=2026-04-30&page=3&page_size=100&lang=en
GET /api/v1.0/news?start_date=2026-04-01&end_date=2026-04-30&page=4&page_size=100&lang=en
GET /api/v1.0/news?start_date=2026-04-01&end_date=2026-04-30&page=5&page_size=100&lang=en
```

## Example 4: After Getting a News Overview, the User Wants to Deeply Understand an Interesting News Item

```
GET /api/v1.0/news?limit=10&lang=en
GET /api/v1.0/news/1001?lang=en
```

## Example 5: Get Today's Daily Briefing (Available after 9:00 AM)

```
GET /api/v1.0/news/briefings?interval=daily&lang=en
```

## Example 6: Get the Daily Briefing for 2026-05-01

```
GET /api/v1.0/news/briefings?interval=daily&date=2026-05-01&lang=en
```

## Example 7: Get the Weekly Briefing for the Week of 2026-04-19

```
GET /api/v1.0/news/briefings?interval=weekly&date=2026-04-19&lang=en
```

## Example 8: Get the Monthly Briefing for April 2026

```
GET /api/v1.0/news/briefings?interval=monthly&date=2026-04-30&lang=en
```

## Example 9: Insight into the Latest Technology Trends in Artificial Intelligence

```
GET /api/v1.0/news?subject=artificial%20intelligence&limit=30&lang=en
GET /api/v1.0/news/5001?lang=en
GET /api/v1.0/news/5301?lang=en
GET /api/v1.0/news/5901?lang=en
...
```
- STEP1: Retrieve 30 latest news items related to artificial intelligence via topic keyword;
- STEP2: Call news details for these 30 items to get full content and related news lists;
- STEP3: Deduplicate related news and continue calling news details;
- STEP4: Repeat iteration of step 3 until news count exceeds 100 or time span exceeds 3 months;
- STEP5: Summarize technology trends from the gathered detailed news information;
