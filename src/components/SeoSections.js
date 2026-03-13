// 服务端组件 — SEO 内容层（H2 → H5 完整标题层级）

import { Music2, BookOpen, XCircle, CheckCircle2 } from 'lucide-react'

// ── 数据 ──────────────────────────────────────────────────────

const STRATEGIES = [
  {
    h3: '跨类混合 — 每位数字随机取自不同字符体系',
    tag: '最高安全分',
    tagColor: 'orange',
    sample: '𝟙③壹𝟮⑦一𝟺⑧贰𝟸',
    body: '本工具核心策略：从数学字体、装饰数字、文化数字三大类中各随机挑选一种，按位轮转。每次生成组合不同，单条正则无法覆盖全部变体，自动化扫描识别率极低，安全评分最高。',
  },
  {
    h3: '① ② ③ 装饰数字 — 8 种样式，视觉直读零门槛',
    tag: '评论区首选',
    tagColor: 'blue',
    sample: '①③⑧❶❸❽⑴⑶⑻',
    body: 'Unicode 收录了空心圆圈 ①②③、实心圆圈 ❶❷❸、括号数字 ⑴⑵⑶、带点数字 ⒈⒉⒊、上下标、全角数字等 8 种装饰变体。字形接近原始数字，普通用户一眼可读，平台 \\d 正则完全失效。',
  },
  {
    h3: '𝟙𝟚𝟛 数学字体 — 5 种字型，码位最生僻',
    tag: '机器最难识别',
    tagColor: 'indigo',
    sample: '𝟏𝟛𝟠 𝟙𝟛𝟠 𝟭𝟯𝟴 𝟷𝟹𝟾',
    body: 'Unicode 数学字母数字符号区（U+1D400~U+1D7FF）提供粗体、双线、无衬线、无衬线粗体、等宽 5 种字型。这批码位在常规文本中极为罕见，平台违禁词库覆盖率几乎为零，是当前绕过率最高的单一策略。',
  },
  {
    h3: '壹贰叁 / 一二三 汉字数字 — 中文用户零负担识读',
    tag: '简介 / 私信',
    tagColor: 'purple',
    sample: '壹叁捌壹贰叁肆伍陆柒捌',
    body: '提供简体汉字（一二三）和财务大写（壹贰叁）两种风格。中文平台用户直接识读无压力，嵌入日常文案毫无突兀感。适合主页简介、私信留号等需兼顾可读性的场景。',
  },
  {
    h3: '形近字符 — 视觉欺骗，字节层面完全不同',
    tag: '视觉欺骗',
    tagColor: 'emerald',
    sample: 'I3ȢI2Ʒ4Ƽб7',
    body: '将数字替换为形状相似的拉丁字母或特殊符号：0→O/o/Ο，1→l/I，3→Ʒ/ε，5→Ƽ/§……人眼极难分辨，但字符码位完全不同，正则 \\d 无法匹配。适合对可读性要求较高的混淆场景。',
  },
  {
    h3: '零宽字符插入 — 不可见，打断连续正则匹配',
    tag: '隐形加固',
    tagColor: 'violet',
    sample: '138\u200B12\u200C34\u200D5678（含零宽）',
    body: '在数字之间插入零宽空格（U+200B）、零宽非连接符（U+200C）、零宽连接符（U+200D）等 5 种不可见字符。肉眼完全透明，但能将连续数字序列打断，使平台正则无法整段匹配。接收方复制后可正常拨打。',
  },
]

const USE_CASES_DOUYIN = [
  {
    h4: '抖音私信怎么留手机号不被屏蔽',
    body: '抖音私信对连续 11 位数字有实时检测，发送后可能显示"内容违规"或消息无法送达。推荐使用双线数字或混合策略，安全评分 85 分以上的方案私信发送成功率更高。本工具"私信"场景自动推荐最强伪装组合。',
  },
  {
    h4: '抖音评论区怎么留微信不违规',
    body: '评论区受更严格的 OCR 扫描，"微信"关键词 + 数字组合是高危模式。建议将"微信"改为"WX"，数字用圆圈或汉字变形同步处理，二者缺一不可。本工具"评论区"场景会自动同时处理关键词和数字两个维度。',
  },
  {
    h4: '抖音主页简介怎么写联系方式',
    body: '主页简介每次修改都会触发内容审核，但检测频率低于评论区。汉字大写（壹贰叁）视觉最自然，用户体验好；配合"威信""企鹅号"等替代词，留存成功率最高。选择本工具"简介"场景获取专项推荐。',
  },
]

const USE_CASES_XHS = [
  {
    h4: '小红书私信怎么留手机号不违规',
    body: '小红书私信对"手机""电话"等引导词极为敏感，检测到后会直接屏蔽消息。除数字变形外，还需删除"手机号"等提示词，或将其替换为"收集号"等形近词，与数字变形配合使用效果最佳。',
  },
  {
    h4: '小红书笔记评论怎么留微信',
    body: '小红书对"微信号""加我""扣扣"等导流词有专项模型检测，2024 年后识别率大幅提升。推荐选择本工具的"评论区"场景，自动生成最适合小红书评论的变形方案，同时覆盖关键词和数字两个检测维度。',
  },
  {
    h4: '小红书个人主页怎么留联系方式',
    body: '个人主页简介每次修改都触发审核。全角数字（０１２３）或数学字体变体在当前审核模型中命中率极低，同时保持较好的可读性。选择本工具"简介"场景，获取平衡安全性与可读性的最佳方案组合。',
  },
]

const FAQ_ITEMS = [
  {
    h5: '抖音发手机号会被封号吗？',
    answer: '发送连续 11 位数字可能触发账号警告或限流，严重时被暂时限制私信功能，极少数情况下导致账号降权。本工具变形方案可显著降低被检测概率，推荐安全评分 80 分以上的方案，并定期轮换不同策略。',
  },
  {
    h5: '小红书私信发微信为什么显示违规？',
    answer: '"微信"关键词 + 连续数字是小红书最高优先级违禁模式，单独发"微信"或单独发数字通常不触发，组合出现则几乎必触发。本工具会同时替换关键词（微信→WX）和数字，需两步一起处理才能有效规避。',
  },
  {
    h5: '谐音字「魏信」「喂心」还能用吗？',
    answer: '主流平台的 AI 审核模型早已将常见谐音词纳入训练集，"魏信""喂心""V信""威信"等在 2023 年后识别率持续攀升，现已成为高危词。Unicode 变形字符目前未被大规模收录，是更可靠的选择，但同样建议定期更换策略。',
  },
  {
    h5: '这些伪装方案对方能正常看懂吗？',
    answer: '圆圈数字①②③、汉字壹贰叁、全角数字０１２视觉可读性强，正常用户可直接识别。零宽字符肉眼完全不可见，对方收到后看起来与普通数字无异，复制后拨打也不受影响。混合策略字符较生僻，更适合对安全要求高、接收方可接受稍微识读的场景。',
  },
  {
    h5: '工具生成的内容会被平台学习识别吗？',
    answer: '任何方案长期大规模使用后都存在被识别的风险。本工具提供 20+ 种方案，建议定期轮换策略，不要长期只用同一种。Unicode 字符集包含数万个码位，平台极难穷举覆盖所有变体，当前变形方案的有效期预计远长于谐音方案。',
  },
  {
    h5: '抖音和小红书的违规检测机制有什么不同？',
    answer: '抖音侧重实时 OCR + 正则匹配，对连续纯数字序列极为敏感，私信和评论检测都很严格；小红书对"微信""手机号"等导流关键词的检测更细化，关键词和数字需同时伪装才有效。本工具的"场景选择"功能已针对两个平台的差异定制了不同的推荐策略组合。',
  },
]

// ── 颜色辅助 ─────────────────────────────────────────────────

// 统一使用中性 + 橙色强调，不用蓝紫配色
const TAG_COLORS = {
  blue:    'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
  purple:  'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
  indigo:  'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
  emerald: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
  violet:  'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
  orange:  'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20',
}

// ── 子组件 ────────────────────────────────────────────────────

function SectionHeader({ children, id }) {
  return (
    <h2
      id={id}
      className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-6"
    >
      {children}
    </h2>
  )
}

function Divider() {
  return <div className="border-t border-zinc-200 dark:border-zinc-800 my-2" />
}

// ── 策略区块（H2-1 + H3 × 6）────────────────────────────────

function StrategiesSection() {
  return (
    <section id="strategies" className="py-12">
      <SectionHeader id="strategies-title">
        输入手机号 · 微信 · QQ，一键生成 20+ 种伪装方案
      </SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STRATEGIES.map((s) => (
          <article
            key={s.h3}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
                {s.h3}
              </h3>
              <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${TAG_COLORS[s.tagColor]}`}>
                {s.tag}
              </span>
            </div>
            <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg px-3 py-2 break-all">
              {s.sample}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {s.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

// ── 场景区块（H2-2 + H4 × 6）────────────────────────────────

function UseCaseGroup({ platform, icon, items }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <span className="text-zinc-500 dark:text-zinc-400 shrink-0">{icon}</span>
        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{platform}</span>
      </div>
      {items.map((item) => (
        <div key={item.h4} className="space-y-1.5">
          <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {item.h4}
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {item.body}
          </p>
        </div>
      ))}
    </div>
  )
}

function UseCasesSection() {
  return (
    <section id="use-cases" className="py-12">
      <Divider />
      <div className="pt-10">
        <SectionHeader id="use-cases-title">
          抖音私信、小红书评论、主页简介——三大场景全覆盖
        </SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <UseCaseGroup platform="抖音"   icon={<Music2   size={15} strokeWidth={2} />} items={USE_CASES_DOUYIN} />
          <UseCaseGroup platform="小红书" icon={<BookOpen size={15} strokeWidth={2} />} items={USE_CASES_XHS} />
        </div>
      </div>
    </section>
  )
}

// ── 原理区块（H2-3）──────────────────────────────────────────

function WhyUnicodeSection() {
  return (
    <section id="why-unicode" className="py-12">
      <Divider />
      <div className="pt-10">
        <SectionHeader id="why-unicode-title">
          为什么谐音替换越来越危险？Unicode 变形才是 2025 年最安全方案
        </SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 谐音方案对比 */}
          <div className="bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <XCircle size={15} strokeWidth={2} className="text-rose-500 dark:text-rose-400 shrink-0" />
              <span className="text-sm font-semibold text-rose-700 dark:text-rose-400">谐音字 / 形近字（正在失效）</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li>· &ldquo;魏信&rdquo;&ldquo;喂心&rdquo;&ldquo;威信&rdquo;已被主流平台收录</li>
              <li>· 每出现一次高频谐音，平台 3~6 个月内更新词库</li>
              <li>· 字形替换（1→壹、二→2）也已纳入正则扫描范围</li>
              <li>· 2024 年后，谐音方案平均存活周期不足 2 个月</li>
            </ul>
          </div>
          {/* Unicode 方案 */}
          <div className="bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} strokeWidth={2} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Unicode 变形（当前最佳）</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li>· Unicode 标准包含 14 万+ 字符，不可能逐一拉黑</li>
              <li>· 数学字体、全角数字、文化数字等字符极少出现在违禁词库</li>
              <li>· 零宽字符完全不可见，正则表达式无法连续匹配</li>
              <li>· 本工具 20+ 方案可定期轮换，延长有效期</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── FAQ 区块（H5 × 6）────────────────────────────────────────

function FaqSection() {
  return (
    <section id="faq" className="py-12">
      <Divider />
      <div className="pt-10">
        <SectionHeader id="faq-title">常见问题</SectionHeader>
        <dl className="space-y-5">
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.h5}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4"
            >
              <dt className="flex items-start gap-2 mb-2">
                <span className="shrink-0 w-5 h-5 rounded-full bg-orange-50 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 text-xs font-bold flex items-center justify-center mt-0.5">
                  Q
                </span>
                <h5 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {item.h5}
                </h5>
              </dt>
              <dd className="pl-7 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

// ── 主导出 ────────────────────────────────────────────────────

export function SeoSections() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-4">
        <StrategiesSection />
        <UseCasesSection />
        <WhyUnicodeSection />
        <FaqSection />
        {/* 内链锚点说明（隐藏，供内链建设参考） */}
        <nav aria-label="内容导航" className="sr-only">
          <a href="#strategies">20+ 种变形方案</a>
          <a href="#use-cases">使用场景</a>
          <a href="#why-unicode">为什么选 Unicode</a>
          <a href="#faq">常见问题</a>
        </nav>
        <footer className="py-8 text-center border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-400 dark:text-zinc-600 text-xs">
            本工具完全在本地运行 · 不上传任何号码数据 · 历史记录仅存储于本机浏览器
          </p>
        </footer>
      </div>
    </div>
  )
}
