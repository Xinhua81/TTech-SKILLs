# 调用示例合集

**示例值仅作结构参考。执行时请确保所有参数均为运行时确定的真实数据。**

## 示例 1：获取全量公司列表

```
GET /api/v1.0/companies?page=1&page_size=100&lang=zh
GET /api/v1.0/companies?page=2&page_size=100&lang=zh
```

## 示例 2：按名称搜索公司（搜索Amazon公司的ID）

```
GET /api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=zh
```

## 示例 3：获取公司详情，包括公司全名、上市地点、股票代码、竞争及合作的相关公司（获得Amazon公司的详情）

```
GET /api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=zh
GET /api/v1.0/companies/1?lang=zh
```

## 示例 4：获取公司股票的日线数据（Amazon公司近5个交易日的日线）

```
GET /api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=zh
GET /api/v1.0/companies/1/stock?interval=daily&limit=5&lang=zh
```

## 示例 5：获取公司股票的月线数据（Amazon公司近12月的月线）

```
GET /api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=zh
GET /api/v1.0/companies/1/stock?interval=monthly&limit=12&lang=zh
```

## 示例 6：获取公司股票的年线数据（Amazon公司近10年的年线）

```
GET /api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=zh
GET /api/v1.0/companies/1/stock?interval=yearly&limit=10&lang=zh
```

## 示例 7：获取公司及其相关公司的近期新闻（Amazon公司及其相关公司的近期新闻）

```
GET /api/v1.0/companies?company_name=Amazon&page=1&page_size=10&lang=zh
GET /api/v1.0/companies/1/news?lang=zh
```

## 示例 8：两步查询——从公司名称到详情

第一步，搜索获取 company_id：
```
GET /api/v1.0/companies?company_name=亚马逊&page=1&page_size=10&lang=zh
```

第二步，用 company_id 查询详情：
```
GET /api/v1.0/companies/1?lang=zh
```
