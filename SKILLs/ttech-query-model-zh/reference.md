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

## 1. 获取元数据

### 1.1 模型类别

```
GET /modelmp/categories
```

#### 请求参数

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| lang | 否 | zh | string | 语言：zh/en |

#### 响应字段

**`data.category[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `category_id` | integer | 类别ID |
| `category_name` | string | 类别名称 |

### 1.2 模型尺寸

```
GET /modelmp/sizes
```

#### 请求参数

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| lang | 否 | zh | string | 语言：zh/en |

#### 响应字段

**`data.size[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `size_id` | integer | 尺寸ID |
| `size` | string | 尺寸大小的描述 |

### 1.3 模型品牌

```
GET /modelmp/brands
```

#### 请求参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `brand_name` | 否 | — | 按品牌名称模糊过滤，多个逗号分隔 |
| `lang` | 否 | `zh` | `zh` / `en` |

#### 响应字段

**`data.brand[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `brand_id` | integer | 品牌ID |
| `brand_name` | string | 品牌名称 |
| `company_id` | integer | 归属公司ID |
| `company_name` | string | 归属公司名称 |
| `website` | string | 品牌官网 |

### 1.4 CSP（服务商）

```
GET /modelmp/csps
```

#### 请求参数

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| lang | 否 | zh | string | 语言：zh/en |

#### 响应字段

**`data.csp[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `csp_id` | integer | 服务商ID |
| `csp_name` | string | 服务商名称 |
| `pricing_url` | string | 价格页面网址 |

### 1.5 服务地区

```
GET /modelmp/regions
```

#### 请求参数

| 参数 | 必须 | 默认值 | 类型 | 说明 |
|------|------|--------|------|------|
| lang | 否 | zh | string | 语言：zh/en |

#### 响应字段

**`data.region[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `region_id` | integer | 地区ID |
| `region_name` | string | 地区名称 |

---

## 2. 获取模型列表

```
GET /modelmp/models
```

### 请求参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `category_id` | 否 | — | 按类别ID过滤，多个逗号分隔 |
| `size_id` | 否 | — | 按尺寸ID过滤，多个逗号分隔 |
| `model_id` | 否 | — | 按模型ID过滤，多个逗号分隔 |
| `model_name` | 否 | — | 按模型名称模糊过滤，多个逗号分隔，大小写不敏感 |
| `brand_id` | 否 | — | 按品牌ID过滤，多个逗号分隔 |
| `opensource` | 否 | — | `true` / `false` |
| `lang` | 否 | `zh` | `zh` / `en` |
| `page` | 否 | `1` | 页码 |
| `page_size` | 否 | `100` | 每页条数，1–300 |

### 响应字段

**`data.models[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `model_id` | integer | 模型唯一ID |
| `model_name` | string | 模型名称 |
| `category_id` | integer | 类别ID |
| `category_name` | string | 类别名称 |
| `size_id` | integer | 参数尺寸ID，未公布为 null |
| `size` | string | 参数尺寸，未公布为 null |
| `opensource` | boolean | 是否开源 |
| `intelligence_index` | integer | 智能Index得分，未公布为 null |
| `code_index` | integer | 编码Index得分，未公布为 null |
| `agentic_index` | integer | Agentic Index得分，未公布为 null |
| `context_size` | integer | 上下文大小 |
| `publish_date` | string | 发布日期 `YYYY-MM-DD` |
| `brand_id` | integer | 品牌ID |
| `brand_name` | string | 品牌名称 |

**`data.models[].csp[]`** — 服务商数组

| 字段 | 类型 | 说明 |
|------|------|------|
| `csp_id` | integer | 服务商ID |
| `csp_name` | string | 服务商名称 |

**`data.pagination`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `page` | integer | 当前页码 |
| `page_size` | integer | 每页条数 |
| `total` | integer | 总条数 |
| `total_pages` | integer | 总页数 |
| `has_more` | boolean | 是否有下一页 |

---

## 3. 获取模型详情

```
GET /modelmp/models/{model_id}
```

### 请求参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `model_id` | 是（路径） | 模型唯一ID |
| `lang` | 否 | `zh` / `en` |

### 响应字段

**`data.model`** — 在列表字段基础上增加：

| 字段 | 类型 | 说明 |
|------|------|------|
| `website` | string | 模型官网 |
| `company_id` | integer | 开发公司ID |
| `company_name` | string | 开发公司名称 |
| `description` | string | 模型详细描述 |

---

## 4. 获取价格列表

```
GET /modelmp/prices
```

### 请求参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `category_id` | 否 | — | 按类别ID过滤，多个逗号分隔 |
| `size_id` | 否 | — | 按尺寸ID过滤，多个逗号分隔 |
| `model_id` | 否 | — | 按模型ID过滤，多个逗号分隔 |
| `region_id` | 否 | — | 按地区ID过滤，多个逗号分隔 |
| `lang` | 否 | `zh` | `zh` / `en` |
| `page` | 否 | `1` | 页码 |
| `page_size` | 否 | `100` | 每页条数，1–300 |

### 响应字段

**`data.price[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `model_id` | integer | 模型ID |
| `model_name` | string | 模型名称 |
| `region_id` | integer | 地区ID |
| `region_name` | string | 地区名称 |
| `csp_id` | integer | 服务商ID |
| `csp_name` | string | 服务商名称 |
| `condition` | string | 价格条件或约束 |
| `input_price` | number | 输入Token价格（每百万Token） |
| `output_price` | number | 输出Token价格（每百万Token） |
| `currency` | string | 货币：USD / CNY |
| `extra_info` | string | 额外补充信息 |

**`data.pagination`** — 同模型列表

---

## 5. 获取成本排名

```
GET /modelmp/prices/cost-rankings
```

### 请求参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `input_tokens` | 否 | `1000` | 输入Token数量，≥0 |
| `output_tokens` | 否 | `2000` | 输出Token数量，≥0 |
| `api_calls` | 否 | `1000` | API调用次数，≥0 |
| `exchange_rate` | 否 | 系统实时 | 美元/人民币汇率，目标货币与原始货币不一致时使用 |
| `target_currency` | 否 | `CNY` | 目标货币：`CNY` / `USD` |
| `category_id` | 否 | — | 按类别ID过滤，多个逗号分隔 |
| `size_id` | 否 | — | 按尺寸ID过滤，多个逗号分隔 |
| `region_id` | 否 | — | 按地区ID过滤，多个逗号分隔 |
| `model_id` | 否 | — | 按模型ID过滤，多个逗号分隔 |
| `brand_id` | 否 | — | 按品牌ID过滤，多个逗号分隔 |
| `opensource` | 否 | — | `true` / `false` |
| `lang` | 否 | `zh` | `zh` / `en` |
| `sort` | 否 | `total_cost` | 排序字段：`total_cost` / `cost_per_call` / `input_price` / `output_price`，前缀 `-` 表示降序 |
| `page` | 否 | `1` | 页码 |
| `page_size` | 否 | `100` | 每页条数，1–300 |

### 响应字段

**`data`** — 顶层回显查询参数

| 字段 | 类型 | 说明 |
|------|------|------|
| `input_tokens` | integer | 输入Token数量 |
| `output_tokens` | integer | 输出Token数量 |
| `api_calls` | integer | API调用次数 |
| `exchange_rate` | number | 汇率 |
| `target_currency` | string | 目标货币 |

**`data.cost_rankings[]`** — 按 `total_cost` 升序排列

| 字段 | 类型 | 说明 |
|------|------|------|
| `model_id` | integer | 模型ID |
| `model_name` | string | 模型名称 |
| `category_name` | string | 类别名称 |
| `size` | string | 参数尺寸 |
| `brand_name` | string | 品牌名称 |
| `csp_name` | string | 服务商名称 |
| `region_name` | string | 地区名称 |
| `condition` | string | 价格条件 |
| `input_price` | number | 原始输入Token价格（每百万Token） |
| `output_price` | number | 原始输出Token价格（每百万Token） |
| `original_currency` | string | 原始货币：USD / CNY |
| `cost_per_call` | number | 单次调用成本（目标货币） |
| `total_cost` | number | 总成本 = cost_per_call × api_calls |
| `rank` | integer | 成本排名，越低越靠前 |

**计算逻辑**：
- `cost_per_call = (input_price × input_tokens + output_price × output_tokens) / 1,000,000`
- `total_cost = cost_per_call × api_calls`
- 货币不一致时按 `exchange_rate` 转换

---

## 6. 获取模型排名

```
GET /modelmp/model-rankings
```

### 请求参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | **是** | — | `intelligence_index` / `code_index` / `agentic_index` / `context_size` / `usage` |
| `date` | 否 | 当日 | `type=usage` 时有效，`YYYY-MM-DD` |
| `range` | 否 | `30` | `type=usage` 时有效，最近多少天汇总，支持 `1`/`7`/`14`/`30` |
| `topN` | 否 | `10` | `type=usage` 时最大支持 `10` |
| `opensource` | 否 | — | `true` / `false` |
| `lang` | 否 | `zh` | `zh` / `en` |

### 响应字段

**`data.type`** — 排名类型

**`data.top_model[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `model_id` | integer | 模型ID |
| `model_name` | string | 模型名称 |
| `value` | integer | 指标分值或调用量，调用量的单位为M |
| `rank` | integer | 排名 |

---

## 7. 获取品牌排名

```
GET /modelmp/brand-rankings
```

### 请求参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | **是** | — | `usage` / `popularity` |
| `topN` | 否 | `10` | `type=usage` 时最大支持 `10` |
| `date` | 否 | 当日/当月 | `type=usage` 时 `YYYY-MM-DD`；`type=popularity` 时 `YYYY-MM` |
| `range` | 否 | `30` | `type=usage` 时有效，最近多少天汇总，支持 `1`/`7`/`14`/`30` |
| `lang` | 否 | `zh` | `zh` / `en` |

### 响应字段

**`data.type`** — 排名类型

**`data.top_brand[]`**

| 字段 | 类型 | 说明 |
|------|------|------|
| `brand_id` | integer | 品牌ID |
| `brand_name` | string | 品牌名称 |
| `value` | integer | 流行度值或调用量，调用量的单位为M |
| `rank` | integer | 排名 |