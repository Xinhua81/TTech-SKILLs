# Calling Examples

**Example values are for structural reference only. Ensure all parameters are real runtime data when executing.**

## Example 1: Get Model List (Filter by Category)

```
GET /api/v1.0/modelmp/categories?lang=en
GET /api/v1.0/modelmp/models?category_id=1&page=1&page_size=100&lang=en
```

## Example 2: Fuzzy Search Models by Name (Search for models with "Qwen" or "DeepSeek" in the name)

```
GET /api/v1.0/modelmp/models?model_name=Qwen,DeepSeek&page=1&page_size=20&lang=en
```

## Example 3: Search All Open-Source Models

```
GET /api/v1.0/modelmp/models?opensource=true&page=1&page_size=100&lang=en
```

## Example 4: Search All Models Under a Brand (Search for all models under the Qwen brand)

```
GET /api/v1.0/modelmp/brands?brand_name=Qwen&lang=en
GET /api/v1.0/modelmp/models?brand_id=1&lang=en&page=1&page_size=100
```

## Example 5: Search All Open-Source Models Under a Brand (Search for all open-source models under the Qwen brand)

```
GET /api/v1.0/modelmp/brands?brand_name=Qwen&lang=en
GET /api/v1.0/modelmp/models?brand_id=1&opensource=true&lang=en&page=1&page_size=100
```

## Example 6: Get Details for Model ID=1

```
GET /api/v1.0/modelmp/models/1?lang=en
```

## Example 7: Get Model Category Name-to-ID Mapping List

```
GET /api/v1.0/modelmp/categories?lang=en
```

## Example 8: Get Model Parameter Size Value-to-ID Mapping List

```
GET /api/v1.0/modelmp/sizes?lang=en
```

## Example 9: Get Model Brand List

```
GET /api/v1.0/modelmp/brands?lang=en
```

## Example 10: Get API Service Provider (CSP) Name-to-ID Mapping List

```
GET /api/v1.0/modelmp/csps?lang=en
```

## Example 11: Browse All CSP Quotes for All Models in All Regions

```
GET /api/v1.0/modelmp/prices?page=1&page_size=100&lang=en
GET /api/v1.0/modelmp/prices?page=2&page_size=100&lang=en
```

## Example 12: Get Price List for All General-Purpose LLMs (All CSPs in All Regions)

```
GET /api/v1.0/modelmp/categories?lang=en
GET /api/v1.0/modelmp/prices?category_id=1&page=1&page_size=100&lang=en
```

## Example 13: Get Price List for All General-Purpose LLMs in Singapore

```
GET /api/v1.0/modelmp/categories?lang=en
GET /api/v1.0/modelmp/regions?lang=en
GET /api/v1.0/modelmp/prices?category_id=1&region_id=4&page=1&page_size=100&lang=en
```

## Example 14: Get All CSP Quotes for the deepseek-v4-flash Model in All Regions

```
GET /api/v1.0/modelmp/models?model_name=deepseek-v4-flash&lang=en&page=1&page_size=20
GET /api/v1.0/modelmp/prices?model_id=2002&page=1&page_size=100&lang=en
```

## Example 15: Calculate Total Cost in USD for All Models from All CSPs in All Regions, Ranked by Total Cost (Single call = 1000 input tokens + 2000 output tokens, calculate total cost for 1000 calls)

```
GET /api/v1.0/modelmp/prices/cost-rankings?input_tokens=1000&output_tokens=2000&api_calls=1000&target_currency=USD&sort=total_cost&lang=en
```

## Example 16: Calculate Total Cost in USD for the deepseek-v3.2 Model in the US-East Region by Each CSP, Ranked by Total Cost (Single call = 1000 input tokens + 2000 output tokens, calculate total cost for 1000 calls)

```
GET /api/v1.0/modelmp/models?model_name=deepseek-v3.2&lang=en&page=1&page_size=1
GET /api/v1.0/modelmp/regions?lang=en
GET /api/v1.0/modelmp/prices/cost-rankings?input_tokens=1000&output_tokens=2000&api_calls=1000&target_currency=USD&model_id=2000&region_id=5&sort=total_cost&lang=en
```

## Example 17: Top 10 Models by Intelligence Index

```
GET /api/v1.0/modelmp/model-rankings?type=intelligence_index&topN=10&lang=en
```

## Example 18: Top 20 Models by Coding Index

```
GET /api/v1.0/modelmp/model-rankings?type=code_index&topN=20&lang=en
```

## Example 19: Top 20 Models by Agentic Index

```
GET /api/v1.0/modelmp/model-rankings?type=agentic_index&topN=20&lang=en
```

## Example 20: Top 20 Models by Context Size

```
GET /api/v1.0/modelmp/model-rankings?type=context_size&topN=20&lang=en
```

## Example 21: Model Usage Top 10 for the 7 Days Before 2026-04-30

```
GET /api/v1.0/modelmp/model-rankings?type=usage&date=2026-04-30&range=7&topN=10&lang=en
```

## Example 22: Model Brand Popularity Top 15 for April 2026

```
GET /api/v1.0/modelmp/brand-rankings?type=popularity&date=2026-04&topN=15&lang=en
```

## Example 23: Model Brand Usage Top 10 for the 30 Days Before 2026-04-30

```
GET /api/v1.0/modelmp/brand-rankings?type=usage&date=2026-04-30&range=30&topN=10&lang=en
```
