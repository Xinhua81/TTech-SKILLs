# Calling Examples

**Example values are for structural reference only. Ensure all parameters are real runtime data when executing.**

## Example 1: Get Full Company List

```
GET /api/v1.0/companies?page=1&page_size=100&lang=en
GET /api/v1.0/companies?page=2&page_size=100&lang=en
```

## Example 2: Search Company by Name (Search for Amazon's ID)

```
GET /api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=en
```

## Example 3: Get Company Details, Including Full Name, Listing Location, Stock Code, and Competitive/Cooperative Related Companies (Get Amazon's details)

```
GET /api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=en
GET /api/v1.0/companies/1?lang=en
```

## Example 4: Get Company Stock Daily Data (Amazon's daily line for the last 5 trading days)

```
GET /api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=en
GET /api/v1.0/companies/1/stock?interval=daily&limit=5&lang=en
```

## Example 5: Get Company Stock Monthly Data (Amazon's monthly line for the last 12 months)

```
GET /api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=en
GET /api/v1.0/companies/1/stock?interval=monthly&limit=12&lang=en
```

## Example 6: Get Company Stock Yearly Data (Amazon's yearly line for the last 10 years)

```
GET /api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=en
GET /api/v1.0/companies/1/stock?interval=yearly&limit=10&lang=en
```

## Example 7: Get Recent News for a Company and Its Related Companies (Amazon's recent news)

```
GET /api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=en
GET /api/v1.0/companies/1/news?lang=en
```

## Example 8: Two-Step Query — From Company Name to Details

Step 1, search to get company_id:
```
GET /api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=en
```

Step 2, query details with company_id:
```
GET /api/v1.0/companies/1?lang=en
```
