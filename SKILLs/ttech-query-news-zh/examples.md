# 调用示例合集

**示例值仅作结构参考。执行时请确保所有参数均为运行时确定的真实数据。**

## 示例 1：获取最新10条科技新闻

```
GET /api/v1.0/news?limit=10&lang=zh
```

## 示例 2：浏览新闻（从新到旧）

```
GET /api/v1.0/news?page=1&page_size=20&lang=zh
GET /api/v1.0/news?page=2&page_size=20&lang=zh
GET /api/v1.0/news?page=3&page_size=20&lang=zh
```

## 示例 3：检索2026年4月份所有科技新闻

```
GET /api/v1.0/news?start_date=2026-04-01&end_date=2026-04-30&page=1&page_size=100&lang=zh
GET /api/v1.0/news?start_date=2026-04-01&end_date=2026-04-30&page=2&page_size=100&lang=zh
GET /api/v1.0/news?start_date=2026-04-01&end_date=2026-04-30&page=3&page_size=100&lang=zh
GET /api/v1.0/news?start_date=2026-04-01&end_date=2026-04-30&page=4&page_size=100&lang=zh
GET /api/v1.0/news?start_date=2026-04-01&end_date=2026-04-30&page=5&page_size=100&lang=zh
```

## 示例 4：获取新闻概览后，用户想详细了解感兴趣的某条新闻

```
GET /api/v1.0/news?limit=10&lang=zh
GET /api/v1.0/news/1001?lang=zh
```

## 示例 5：获取今日日报（9：00之后才可以）

```
GET /api/v1.0/news/briefings?interval=daily&lang=zh
```

## 示例 6：获取2026-05-01日的日报

```
GET /api/v1.0/news/briefings?interval=daily&date=2026-05-01&lang=zh
```

## 示例 7：获取2026-04-19这一周的周报

```
GET /api/v1.0/news/briefings?interval=weekly&date=2026-04-19&lang=zh
```

## 示例 8：获取2026年4月份的月报

```
GET /api/v1.0/news/briefings?interval=monthly&date=2026-04-30&lang=zh
```

## 示例 9：洞察人工智能领域的最新技术趋势

```
GET /api/v1.0/news?subject=人工智能&limit=30&lang=zh
GET /api/v1.0/news/5001?lang=zh
GET /api/v1.0/news/5301?lang=zh
GET /api/v1.0/news/5901?lang=zh
```
- STEP1：通过主题关键词检索出30条与人工智能相关的最新的新闻列表；
- STEP2：对这30条新闻调用新闻详情获得这些新闻的详细内容以及相关的新闻列表；
- STEP3：对获得的相关新闻去重后继续调用新闻详情；
- STEP4：重复迭代第3步，直至新闻数量超过100条或者时间超过3个月；
- STEP5：对得到的新闻详细信息总结出技术趋势；