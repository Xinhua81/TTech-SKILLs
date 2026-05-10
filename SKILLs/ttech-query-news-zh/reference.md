# API 参数与响应字段详解

**API 响应消息整体结构**

```json
{
    "code": 0,
    "message": "success",
    "data": {},
    "meta": {
        "request_id": "req-20240419-001",
        "timestamp": 1713423456789
    }
}
```

API响应的整体结构如下：
| 字段 | 类型 | 说明 |
|------|------|------|
| code | integer | 响应码，0表示成功，非0表示错误码|
| message | string | 响应消息的描述，成功时一般为success，失败时提供详细的失败信息 |
| data | object | 嵌套的JSON对象，用于返回请求的用户数据，不同API请求对应不同的结构。失败时为null |
| meta | object | meta对象主要包含请求消息中的关键信息，方便调用者调试代码 |

meta的主要字段如下：
| 字段 | 类型 | 说明 |
|------|------|------|
| request_id | string | 等于请求消息体中的request_id|
| timestamp | integer | 等于请求消息体中的timestamp|

当响应消息体涉及分页时，data中会包含pagination对象：
```json
"pagination": {
    "page": 1,
    "page_size": 20,
    "total": 156,
    "total_pages": 8,
    "has_more": true
}
```
对象pagination中各字段的含义：
| 字段 | 类型 | 说明 |
|------|------|------|
| page | integer | 当前页码，从1开始 |
| page_size | integer | 每页条数 |
| total | integer | 总条数 |
| total_pages | integer | 总页数 |
| has_more | boolean | true 表示还有下一页 |

## 1. 获取新闻列表

```
GET /news
```

### 请求参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `start_date` | 否 | — | 开始日期 `YYYY-MM-DD` |
| `end_date` | 否 | — | 结束日期 `YYYY-MM-DD` |
| `lang` | 否 | `zh` | `zh` / `en` |
| `page` | 否 | `1` | 页码 |
| `page_size` | 否 | `20` | 每页条数，1–100 |
| `limit` | 否 | — | 最近 N 条；设置后忽略 `page`/`page_size` |
| `subject` | 否 | — | 主题关键字，对标题和摘要模糊匹配 |

### 响应字段

**`data.news[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `news_id` | integer | 新闻唯一 ID |
| `title` | string | 标题 |
| `summary` | string | 摘要，一般 < 256 字符 |
| `source` | string | 来源 |
| `author` | string | 作者 |
| `publish_time` | string | ISO 8601 发布时间 |
| `company_name` | string | 所涉公司的名称 |
| `company_id` | integer | 所涉公司的ID |

**`data.pagination`**（`limit` 模式下为 `null`）

| 字段 | 类型 | 说明 |
|------|------|------|
| `page` | integer | 当前页码 |
| `page_size` | integer | 每页条数 |
| `total` | integer | 总条数 |
| `total_pages` | integer | 总页数 |
| `has_more` | boolean | 是否有下一页 |

---

## 2. 获取新闻详情

```
GET /news/{news_id}
```

### 请求参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `news_id` | 是（路径） | 新闻唯一 ID |
| `lang` | 否 | `zh` / `en` |

### 响应字段

**`data.news`** — 在列表字段基础上增加：

| 字段 | 类型 | 说明 |
|------|------|------|
| `content` | string | 新闻正文 |
| `url` | string | 原始链接 |

**`data.related_news[]`** — 相关新闻摘要数组

| 字段 | 类型 | 说明 |
|------|------|------|
| news_id | integer | 新闻唯一ID |
| title | string | 新闻标题 |
| source | string | 新闻来源 |
| publish_time | string(datetime) ISO 8601 | 发布时间 |
| company_name | string | 所涉公司的名称 |
| company_id | integer | 所涉公司的ID |

---

## 3. 获取新闻摘要（日报/周报/月报）

```
GET /news/briefings
```

### 请求参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `lang` | 否 | `zh` | `zh` / `en` |
| `interval` | 否 | `daily` | `daily` 日报 / `weekly` 周报 / `monthly` 月报 |
| `date` | 否 | 当日 | 参考日期 `YYYY-MM-DD`；周报取当周周日，月报取月末 |

### 响应字段

**`data`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `top10_news` | string[] | TOP10 新闻概要 |
| `opinion` | string | 核心观点总结 |
| `suggestion` | string | 对从业者的建议 |
