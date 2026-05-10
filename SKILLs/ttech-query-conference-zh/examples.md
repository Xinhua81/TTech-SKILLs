# 调用示例合集

**示例值仅作结构参考。执行时请确保所有参数均为运行时确定的真实数据。**

## 示例 1：获取会议类型列表

```
GET /api/v1.0/conferences/types?lang=zh
```

## 示例 2：查询2026年全年会议

```
GET /api/v1.0/conferences?year=2026&month=0&lang=zh
```

## 示例 3：查询2026年1月的会议

```
GET /api/v1.0/conferences?year=2026&month=1&lang=zh
```

## 示例 4：按类型过滤会议（如仅看学术会议）

```
GET /api/v1.0/conferences/types?lang=zh
GET /api/v1.0/conferences?year=2026&month=0&type_id=2&lang=zh
```

## 示例 5：按会议主题搜索（如2026年AI主题的会议有哪些）

```
GET /api/v1.0/conferences?year=2026&month=0&conf_name=AI&lang=zh
```

## 示例 6：按会议组织方搜索（如2026年英伟达的科技会议议程、英伟达今年的GTC举办了吗）

```
GET /api/v1.0/conferences?year=2026&month=0&conf_org=英伟达&lang=zh
```
