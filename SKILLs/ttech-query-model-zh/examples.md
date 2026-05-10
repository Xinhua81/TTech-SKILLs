# 调用示例合集

**示例值仅作结构参考。执行时请确保所有参数均为运行时确定的真实数据。**

## 示例 1：获取模型列表（按类别过滤）

```
GET /api/v1.0/modelmp/categories?lang=zh
GET /api/v1.0/modelmp/models?category_id=1&page=1&page_size=100&lang=zh
```

## 示例 2：按名称模糊搜索模型（搜索模型名称中含有Qwen或DeepSeek的模型）

```
GET /api/v1.0/modelmp/models?model_name=Qwen,DeepSeek&page=1&page_size=20&lang=zh
```

## 示例 3：搜索所有开源模型

```
GET /api/v1.0/modelmp/models?opensource=true&page=1&page_size=100&lang=zh
```

## 示例 4：搜索某个品牌下的所有模型（搜索Qwen品牌下的所有模型）

```
GET /api/v1.0/modelmp/brands?brand_name=Qwen&lang=zh
GET /api/v1.0/modelmp/models?brand_id=1&lang=zh&page=1&page_size=100
```

## 示例 5：搜索某品牌下所有开源模型（搜索Qwen品牌下的所有开源模型）

```
GET /api/v1.0/modelmp/brands?brand_name=Qwen&lang=zh
GET /api/v1.0/modelmp/models?brand_id=1&opensource=true&lang=zh&page=1&page_size=100
```

## 示例 6：获取模型ID=1的模型详情

```
GET /api/v1.0/modelmp/models/1?lang=zh
```

## 示例 7：获取模型类别名称和类别ID的映射列表

```
GET /api/v1.0/modelmp/categories?lang=zh
```

## 示例 8：获取模型参数尺寸值和参数尺寸ID的映射列表

```
GET /api/v1.0/modelmp/sizes?lang=zh
```

## 示例 9：获取模型品牌列表

```
GET /api/v1.0/modelmp/brands?lang=zh
```

## 示例 10：获取 API 服务商（CSP）名称和ID的映射列表

```
GET /api/v1.0/modelmp/csps?lang=zh
```

## 示例 11：浏览所有CSP对所有模型在所有地区的报价列表

```
GET /api/v1.0/modelmp/prices?page=1&page_size=100&lang=zh
GET /api/v1.0/modelmp/prices?page=2&page_size=100&lang=zh
```

## 示例 12：获取所有通用大模型的价格列表（所有CSP在所有地区的报价）

```
GET /api/v1.0/modelmp/categories?lang=zh
GET /api/v1.0/modelmp/prices?category_id=1&page=1&page_size=100&lang=zh
```

## 示例 13：获取所有通用大模型在新加坡的价格列表

```
GET /api/v1.0/modelmp/categories?lang=zh
GET /api/v1.0/modelmp/regions?lang=zh
GET /api/v1.0/modelmp/prices?category_id=1&region_id=4&page=1&page_size=100&lang=zh
```

## 示例 14：获取所有CSP在所有地区对deepseek-v4-flash模型的报价列表

```
GET /api/v1.0/modelmp/models?model_name=deepseek-v4-flash&lang=zh&page=1&page_size=20
GET /api/v1.0/modelmp/prices?model_id=2002&page=1&page_size=100&lang=zh
```

## 示例 15：对所有CSP在所有地区的所有模型计算以人民币计价的总成本，并按总成本排名（单次调用=1000输入Token+2000输出Token，计算1000次调用总成本）

```
GET /api/v1.0/modelmp/prices/cost-rankings?input_tokens=1000&output_tokens=2000&api_calls=1000&target_currency=CNY&sort=total_cost&lang=zh
```

## 示例 16：各CSP对北美-美东地区deepseek-v3.2模型计算以美元计价的总成本，并按总成本排名（单次调用=1000输入Token+2000输出Token，计算1000次调用总成本）

```
GET /api/v1.0/modelmp/models?model_name=deepseek-v3.2&lang=zh&page=1&page_size=1
GET /api/v1.0/modelmp/regions?lang=zh
GET /api/v1.0/modelmp/prices/cost-rankings?input_tokens=1000&output_tokens=2000&api_calls=1000&target_currency=USD&model_id=2000&region_id=5&sort=total_cost&lang=zh
```

## 示例 17：模型智能指数排名前10名

```
GET /api/v1.0/modelmp/model-rankings?type=intelligence_index&topN=10&lang=zh
```

## 示例 18：模型编码指数排名前20名

```
GET /api/v1.0/modelmp/model-rankings?type=code_index&topN=20&lang=zh
```

## 示例 19：模型Agentic指数排名前20名

```
GET /api/v1.0/modelmp/model-rankings?type=agentic_index&topN=20&lang=zh
```

## 示例 20：模型上下文大小排名前20名

```
GET /api/v1.0/modelmp/model-rankings?type=context_size&topN=20&lang=zh
```

## 示例 21：2026-04-30日向前回溯7天，模型调用量排名前10名

```
GET /api/v1.0/modelmp/model-rankings?type=usage&date=2026-04-30&range=7&topN=10&lang=zh
```

## 示例 22：模型品牌2026年4月份流行度排名前15名

```
GET /api/v1.0/modelmp/brand-rankings?type=popularity&date=2026-04&topN=15&lang=zh
```

## 示例 23：2026-04-30日向前回溯30天，模型品牌调用量排名前10名

```
GET /api/v1.0/modelmp/brand-rankings?type=usage&date=2026-04-30&range=30&topN=10&lang=zh
```
