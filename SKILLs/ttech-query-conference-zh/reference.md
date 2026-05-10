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

## 1. 获取会议类型列表

```
GET /conferences/types
```

### 请求参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `lang` | 否 | `zh` | `zh` / `en` |

### 响应字段

**`data.type[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `type_id` | integer | 会议类型唯一 ID |
| `name` | string | 会议类型名称 |

---

## 2. 获取会议列表

```
GET /conferences
```

### 请求参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `year` | **是** | — | 年份，如 `2026` |
| `month` | 否 | `0` | `0` 表示全年，`1–12` 表示特定月份 |
| `type_id` | 否 | — | 按会议类型过滤 |
| `conf_name` | 否 | — | 按会议主题模糊过滤，大小写不敏感 |
| `conf_org` | 否 | — | 按会议组织方模糊过滤，大小写不敏感 |
| `lang` | 否 | `zh` | `zh` / `en` |

### 响应字段

**`data.agenda[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `subject` | string | 会议主题 |
| `organization` | string | 会议组织方 |
| `start_date` | string | 会议开始日期，格式 `YYYY-MM-DD` |
| `end_date` | string | 会议结束日期，格式 `YYYY-MM-DD` |
| `type_id` | integer | 会议类型 ID |
| `type_name` | string | 会议类型名称 |
| `location` | string | 会议举办地点 |
| `website` | string | 会议网站 URL |
| `acked` | boolean | 议程是否已正式确认 |
