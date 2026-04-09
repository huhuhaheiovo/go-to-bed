---
name: seo-landing-checklist
description: 在每次完成落地页（landing page）创建后，自动生成一个交互式SEO待办清单，用户可以逐项勾选完成状态。当用户完成落地页创建、SEO页面生成、HTML页面输出后必须使用此技能展示清单。也适用于用户主动要求"显示清单"、"检查SEO项目"、"待办事项"等场景。每次落地页创建结束后必须调用此技能。
---

# SEO Landing Page Checklist Skill

每次落地页创建完成后，使用 `visualize:show_widget` 工具展示一个**交互式待办清单**，用户可以逐项勾选SEO优化项目是否完成。

---

## 触发时机

以下情况**必须**展示清单：
1. `seo-landing-page` 技能完成输出（生成了 `index.html` 或 `seo-meta.json`）
2. 用户请求"显示清单"、"SEO检查"、"待办清单"
3. 任何落地页/产品页/营销页面创建完成后

---

## 第一步：读取技能依赖

在展示清单前，先调用：
```
visualize:read_me  modules: ["interactive"]
```

---

## 第二步：展示交互式清单

调用 `visualize:show_widget`，使用以下 HTML 模板：

```html
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'IBM Plex Mono', 'Courier New', monospace; background: transparent; padding: 16px; }
  
  .checklist-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--text-primary, #1a1a1a);
  }
  
  .checklist-title {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-primary, #1a1a1a);
  }
  
  .progress-badge {
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    border: 1.5px solid var(--text-primary, #1a1a1a);
    border-radius: 2px;
    color: var(--text-primary, #1a1a1a);
    background: transparent;
    transition: all 0.2s;
  }
  
  .progress-badge.complete {
    background: #22c55e;
    border-color: #22c55e;
    color: white;
  }
  
  .section {
    margin-bottom: 18px;
  }
  
  .section-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-secondary, #666);
    margin-bottom: 8px;
    padding-left: 2px;
  }
  
  .check-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 3px;
    cursor: pointer;
    transition: background 0.15s;
    user-select: none;
  }
  
  .check-item:hover {
    background: var(--bg-secondary, rgba(0,0,0,0.04));
  }
  
  .check-item.done .item-text {
    text-decoration: line-through;
    color: var(--text-secondary, #999);
  }
  
  .checkbox {
    width: 16px;
    height: 16px;
    border: 1.5px solid var(--text-secondary, #999);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
    transition: all 0.15s;
  }
  
  .check-item.done .checkbox {
    background: #22c55e;
    border-color: #22c55e;
  }
  
  .checkmark {
    width: 9px;
    height: 7px;
    opacity: 0;
    transition: opacity 0.15s;
  }
  
  .check-item.done .checkmark {
    opacity: 1;
  }
  
  .item-text {
    font-size: 13px;
    line-height: 1.45;
    color: var(--text-primary, #1a1a1a);
    transition: color 0.15s;
  }
  
  .actions {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid var(--border, rgba(0,0,0,0.1));
  }
  
  .btn {
    flex: 1;
    padding: 8px 12px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: 1.5px solid var(--text-primary, #1a1a1a);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.15s;
    background: transparent;
    color: var(--text-primary, #1a1a1a);
    font-family: inherit;
  }
  
  .btn:hover {
    background: var(--text-primary, #1a1a1a);
    color: var(--bg-primary, #fff);
  }
  
  .btn.btn-reset {
    border-color: var(--text-secondary, #999);
    color: var(--text-secondary, #999);
  }
  
  .btn.btn-reset:hover {
    border-color: var(--text-secondary, #999);
    background: var(--text-secondary, #999);
    color: white;
  }
  
  .divider {
    height: 1px;
    background: var(--border, rgba(0,0,0,0.08));
    margin: 4px 0;
  }
</style>

<div id="app"></div>

<script>
const sections = [
  {
    label: "基础 SEO",
    items: [
      { id: "title", text: "Title 标签含核心关键词（50-60字符）" },
      { id: "desc", text: "Meta Description 吸引点击（120-160字符）" },
      { id: "slug", text: "URL Slug 可读、小写、连字符分隔" },
      { id: "h1", text: "H1 唯一且包含核心关键词" },
      { id: "canonical", text: "Canonical 标签已添加" },
    ]
  },
  {
    label: "内容质量",
    items: [
      { id: "wordcount", text: "正文字数 ≥ 600（中文字/英文词）" },
      { id: "density", text: "关键词密度 ≥ 5% 且无堆砌感" },
      { id: "first100", text: "前100字内出现核心关键词" },
      { id: "h2", text: "H2 标题自然含关键词变体" },
      { id: "faq", text: "FAQ 部分覆盖长尾词" },
    ]
  },
  {
    label: "技术 SEO",
    items: [
      { id: "schema", text: "JSON-LD Schema（WebPage / Product）已添加" },
      { id: "og", text: "Open Graph 标签完整（og:title/description/url）" },
      { id: "alt", text: "所有图片含包含关键词的 alt 属性" },
      { id: "cta", text: "CTA 按钮/链接锚文本含关键词" },
      { id: "mobile", text: "移动端响应式布局正常" },
    ]
  },
  {
    label: "设计质量",
    items: [
      { id: "noai", text: "无蓝紫渐变等 AI 味设计元素" },
      { id: "font", text: "字体有辨识度（非 Inter / Roboto）" },
      { id: "color", text: "色彩方案一致、专业" },
      { id: "layout", text: "排版层次清晰，留白合理" },
    ]
  }
];

let state = {};
sections.forEach(s => s.items.forEach(item => { state[item.id] = false; }));

function total() {
  return Object.keys(state).length;
}

function doneCount() {
  return Object.values(state).filter(Boolean).length;
}

function render() {
  const done = doneCount();
  const tot = total();
  const allDone = done === tot;

  let html = `
    <div class="checklist-header">
      <div class="checklist-title">落地页 SEO 待办清单</div>
      <div class="progress-badge ${allDone ? 'complete' : ''}">${done} / ${tot}</div>
    </div>
  `;

  sections.forEach((section, si) => {
    html += `<div class="section"><div class="section-label">${section.label}</div>`;
    section.items.forEach((item, ii) => {
      const isDone = state[item.id];
      html += `
        <div class="check-item ${isDone ? 'done' : ''}" onclick="toggle('${item.id}')">
          <div class="checkbox">
            <svg class="checkmark" viewBox="0 0 9 7" fill="none">
              <path d="M1 3.5L3.5 6L8 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="item-text">${item.text}</span>
        </div>
      `;
    });
    html += `</div>`;
    if (si < sections.length - 1) html += `<div class="divider"></div>`;
  });

  html += `
    <div class="actions">
      <button class="btn" onclick="markAll()">全部完成</button>
      <button class="btn btn-reset" onclick="resetAll()">重置</button>
    </div>
  `;

  document.getElementById('app').innerHTML = html;
}

function toggle(id) {
  state[id] = !state[id];
  render();
}

function markAll() {
  Object.keys(state).forEach(k => state[k] = true);
  render();
}

function resetAll() {
  Object.keys(state).forEach(k => state[k] = false);
  render();
}

render();
</script>
```

---

## 第三步：展示时机与话术

在落地页文件生成完毕、`present_files` 调用之后，立即调用此技能，并在清单前附上一句话：

> "✅ 落地页已生成！以下是SEO优化待办清单，请逐项确认并勾选："

---

## 注意事项

- 清单为**纯前端交互**，状态保存在内存中（刷新重置）
- 勾选项会自动更新进度（X / 19）
- 支持"全部完成"和"重置"快捷操作
- 配色使用 CSS 变量，自动适配深色/浅色主题
- 本技能**不替代** `seo-landing-page` 技能，仅作为完成后的附加步骤
