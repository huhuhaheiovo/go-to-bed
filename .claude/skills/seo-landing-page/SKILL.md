---
name: seo-landing-page
description: 构建符合On-Page SEO标准的单页面落地页。当用户需要创建SEO优化的落地页、产品页、营销页面，或提到"SEO页面"、"落地页"、"landing page"、"关键词优化页面"时，必须使用此Skill。输出包含：元数据JSON配置文件 + 完整HTML页面代码，严格遵守关键词密度、字数、URL结构等SEO规范，同时保证页面视觉设计有辨识度、无AI感。
---

# SEO Landing Page Skill

为指定关键词构建一个**完整的、符合On-Page SEO标准**的单页面，输出两个文件：
1. `seo-meta.json` — 元数据配置（Title / Description / H1 及多语言扩展）
2. `index.html` — 完整落地页 HTML

---

## 第一步：信息收集

开始前向用户确认以下内容（若用户已提供则跳过）：

| 必填项 | 说明 |
|--------|------|
| **目标关键词** | 本页面只做 **1个** 核心关键词 |
| **目标语言** | 默认中文，可多选（中/英/日/…） |
| **页面主题/产品** | 简短描述产品或服务 |
| **URL slug** | 如 `/ai-writing-tool`，需小写+连字符 |
| **品牌名称** | 用于 Title 拼接 |

可选项：竞品URL、参考风格、CTA文案偏好

---

## 第二步：生成 `seo-meta.json`

### 文件结构规范

```json
{
  "keyword": "目标关键词",
  "url_slug": "/keyword-slug",
  "locales": {
    "zh": {
      "title": "核心关键词 - 差异化卖点 | 品牌名（50-60字符）",
      "description": "包含核心关键词，描述用户收益，自然语言，结尾CTA。（120-160字符）",
      "h1": "核心关键词 + 用户利益点（与Title有差异，不完全重复）",
      "h2_list": ["支撑H1的子标题1", "子标题2", "子标题3"]
    },
    "en": {
      "title": "...",
      "description": "...",
      "h1": "...",
      "h2_list": ["...", "..."]
    }
  }
}
```

### Title 写作规则
- 长度：**50–60个字符**（中文约16–20字）
- 格式：`核心关键词 + 差异点 | 品牌名`
- 核心关键词必须出现在 **前半段**
- 禁止堆砌，禁止全大写

### Description 写作规则
- 长度：**120–160个字符**（中文约50–70字）
- 必须自然包含核心关键词（≥1次）
- 结构：痛点/场景 → 解决方案 → CTA
- 禁止重复Title原文

### H1 写作规则
- 全页**唯一**一个H1
- 包含核心关键词，但措辞与Title不同
- 面向用户利益，而非SEO堆词

---

## 第三步：生成 `index.html`

### SEO 硬性指标（必须全部满足）

| 指标 | 要求 | 验证方法 |
|------|------|----------|
| 字数 | **正文 ≥ 600词**（中文600字，英文600 words） | 统计 `<p>/<li>/<td>` 内文本 |
| 关键词密度 | **核心词 ≥ 5%**，但不堆砌 | 出现次数 / 总词数 |
| 每页关键词数 | **仅1个核心关键词** | — |
| URL可读性 | slug全小写，单词间用 `-` 分隔，无特殊字符 | — |
| 标签层级 | H1×1，H2多个，H3可选，无跳级 | — |
| Meta标签 | title、description、canonical均从JSON读取 | — |
| 图片Alt | 所有 `<img>` 必须含有包含关键词的 alt | — |
| 内链锚文本 | CTA按钮/链接文本含关键词 | — |
| Schema | 至少添加 `WebPage` 或 `Product` JSON-LD | — |

### HTML 页面结构模板

```html
<!DOCTYPE html>
<html lang="{locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 从 seo-meta.json 读取 -->
  <title>{locales.zh.title}</title>
  <meta name="description" content="{locales.zh.description}">
  <link rel="canonical" href="https://example.com{url_slug}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:url" content="https://example.com{url_slug}">
  
  <!-- JSON-LD Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "{title}",
    "description": "{description}",
    "url": "https://example.com{url_slug}"
  }
  </script>
</head>
<body>
  <!-- Hero Section -->
  <header>
    <h1>{locales.zh.h1}</h1>
    <p><!-- 副标题，自然含关键词 --></p>
    <a href="#cta"><!-- CTA文本含关键词 --></a>
  </header>

  <!-- Features / Benefits（H2 × 3+） -->
  <section>
    <h2>{h2_list[0]}</h2>
    <p><!-- 正文，自然密度含关键词 --></p>
  </section>
  <!-- ... 更多Section ... -->

  <!-- FAQ（推荐，提升长尾词覆盖） -->
  <section>
    <h2>常见问题</h2>
    <!-- 3-5个Q&A，问题中自然含关键词 -->
  </section>

  <!-- CTA Section -->
  <section id="cta">
    <h2><!-- 行动号召，含关键词 --></h2>
    <a href="/signup"><!-- 关键词+动词 --></a>
  </section>
</body>
</html>
```

### 关键词密度实现策略（避免堆砌）

关键词自然分布在以下位置（**禁止连续重复**）：
1. H1（必须）
2. 正文第一段前100字内（必须）
3. 至少2个H2（自然融入）
4. 图片 alt 属性
5. CTA 按钮文本
6. Meta description（已在JSON中处理）
7. FAQ 的问题措辞
8. 页脚版权或说明文本（可选）

**密度计算示例**（目标5%）：
- 600中文字 → 核心词需出现约 **30次**（单字词）或 **15次**（双字词）
- 方法：通过同义词、近义词、长尾变体分散，主词至少保证8-12次精准出现

---

## 第四步：页面设计规范（去AI感）

参考 `frontend-design` Skill，额外强调：

### ❌ 禁止的设计元素
- 蓝紫色渐变背景（`#6366f1` `#8b5cf6` `#a78bfa` 系列）
- 默认圆角卡片 + 阴影堆叠
- Inter / Roboto / System-UI 字体
- 中规中矩的三列Feature Grid
- Hero区大圆形渐变光晕

### ✅ 推荐的设计方向（每次随机选择一种）

| 风格 | 特征 | 适合行业 |
|------|------|----------|
| **编辑杂志风** | 大号衬线字体，不对称排版，单色+强调色 | 内容/媒体/教育 |
| **极简工业风** | 黑白主色，粗等线体，大量留白，细线分割 | SaaS/工具 |
| **暖调纸质感** | 米色/奶油色背景，手写字体点缀，自然纹理 | 消费品/食品 |
| **高饱和度Pop** | 鲜艳主色，厚重无衬线，几何形状装饰 | 游戏/年轻消费 |
| **深色专业风** | 深灰/深绿背景，亮色强调，代码感字体 | 开发者/技术 |

### 字体推荐（避免通用字体）
```css
/* 中文 */
font-family: 'LXGW WenKai', 'Noto Serif SC', 'Source Han Serif CN', serif;
font-family: 'HarmonyOS Sans SC', 'PingFang SC', sans-serif;

/* 英文 display */
font-family: 'Playfair Display', 'DM Serif Display', 'Cormorant', serif;
font-family: 'Space Mono', 'IBM Plex Mono', monospace;
```

---

## 第五步：自检清单

生成完毕后，逐项确认：

```
SEO基础
[ ] seo-meta.json 已生成，结构完整
[ ] Title 50-60字符 ✓
[ ] Description 120-160字符 ✓
[ ] H1 唯一且含核心关键词 ✓
[ ] URL slug 可读、小写、连字符 ✓

内容质量
[ ] 正文字数 ≥ 600 ✓
[ ] 关键词密度 ≥ 5% 且无堆砌感 ✓
[ ] 全页只针对1个核心关键词 ✓
[ ] H2 自然含关键词变体 ✓

技术SEO
[ ] canonical 标签存在 ✓
[ ] 所有图片有含关键词的 alt ✓
[ ] JSON-LD Schema 已添加 ✓
[ ] Open Graph 标签完整 ✓

设计质量
[ ] 无蓝紫渐变等AI味设计 ✓
[ ] 字体有辨识度 ✓
[ ] 色彩方案一致 ✓
[ ] 移动端响应式 ✓
```

---

## 输出文件

| 文件 | 说明 |
|------|------|
| `seo-meta.json` | Title/Description/H1 配置，支持多语言扩展 |
| `index.html` | 完整落地页，内嵌CSS，无外部依赖（除字体CDN） |

如用户需要多语言版本，为每种语言生成独立的 `index.zh.html` / `index.en.html`，共享同一个 `seo-meta.json`。
