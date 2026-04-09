# 关键词密度计算参考手册

## 密度公式

```
关键词密度 = (关键词出现次数 × 关键词字数) / 页面总词数 × 100%
```

## 目标阈值

| 状态 | 密度范围 | 操作 |
|------|----------|------|
| 不足 | < 3% | 增加关键词自然出现频次 |
| 合格 | 3% – 5% | 可接受，建议提升 |
| **理想** | **5% – 8%** | **目标区间** |
| 堆砌风险 | > 10% | 降低频次，增加同义词 |

## 各类页面字数参考

| 页面类型 | 最低字数 | 推荐字数 |
|----------|----------|----------|
| 产品落地页 | 600 | 800–1200 |
| 功能介绍页 | 600 | 1000–1500 |
| 对比/评测页 | 800 | 1500–2000 |
| 首页 | 600 | 800–1000 |

## 关键词分布位置权重

按SEO权重从高到低排列：

1. **Title Tag** — 权重最高，必须包含
2. **H1** — 权重高，唯一，精准含词
3. **正文首段（前100字）** — 权重高
4. **H2 标题** — 中等权重，建议2-3个H2含变体
5. **图片 Alt 属性** — 中等权重
6. **URL Slug** — 中等权重
7. **正文主体** — 均匀分布
8. **Meta Description** — 影响CTR，不直接影响排名
9. **页脚** — 低权重

## 自然写作技巧（避免堆砌）

### ✅ 正确方式：关键词变体矩阵

以"AI写作工具"为例：

```
精准词：   AI写作工具（必须出现8-12次）
同义词：   智能写作助手、AI内容生成器
长尾词：   AI写作工具推荐、免费AI写作工具
上位词：   写作工具、内容创作工具  
场景词：   用AI写文章、AI辅助写作
```

### ❌ 错误方式示例

```html
<!-- 堆砌（差） -->
<p>我们的AI写作工具是最好的AI写作工具，
使用AI写作工具可以提升效率，AI写作工具免费试用。</p>

<!-- 自然（好） -->
<p>借助这款智能写作助手，内容创作者平均节省60%的时间。
无论是营销文案还是技术文档，AI都能快速理解你的需求，
生成符合品牌调性的高质量内容。</p>
```

## URL Slug 规范

```
✅ 正确：
/ai-writing-tool
/best-seo-checker-2024
/cloud-storage-comparison

❌ 错误：
/AI_Writing_Tool          （大写+下划线）
/ai-writing-tool-ai-tool  （重复）
/p?id=12345               （无意义参数）
/ai写作工具               （非ASCII字符）
```

## Schema Markup 模板

### WebPage（通用）
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "{title}",
  "description": "{description}",
  "url": "{canonical_url}",
  "inLanguage": "zh-CN",
  "datePublished": "{date}",
  "dateModified": "{date}"
}
```

### Product（产品页）
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "{product_name}",
  "description": "{description}",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CNY"
  }
}
```

### FAQPage（FAQ区域）
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{问题文本，含关键词}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{答案文本}"
      }
    }
  ]
}
```
