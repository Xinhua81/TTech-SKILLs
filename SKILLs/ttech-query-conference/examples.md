# Calling Examples

**Example values are for structural reference only. Ensure all parameters are real runtime data when executing.**

## Example 1: Get Conference Type List

```
GET /api/v1.0/conferences/types?lang=en
```

## Example 2: Query Full-Year Conferences for 2026

```
GET /api/v1.0/conferences?year=2026&month=0&lang=en
```

## Example 3: Query Conferences for January 2026

```
GET /api/v1.0/conferences?year=2026&month=1&lang=en
```

## Example 4: Filter Conferences by Type (e.g., only academic conferences)

```
GET /api/v1.0/conferences/types?lang=en
GET /api/v1.0/conferences?year=2026&month=0&type_id=2&lang=en
```

## Example 5: Search Conferences by Theme (e.g., what AI-themed conferences are there in 2026)

```
GET /api/v1.0/conferences?year=2026&month=0&conf_name=AI&lang=en
```

## Example 6: Search Conferences by Organizer (e.g., what tech conferences does Nvidia have in 2026, or is GTC happening this year)

```
GET /api/v1.0/conferences?year=2026&month=0&conf_org=Nvidia&lang=en
```
