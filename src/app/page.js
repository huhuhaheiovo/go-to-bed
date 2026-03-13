import { DisguiseTool } from './DisguiseTool'
import { SeoSections } from '@/components/SeoSections'

// ── Meta ──────────────────────────────────────────────────────

export const metadata = {
  title: '抖音/小红书留联系方式不违规 — 手机号一键变形工具 | 防封号·防限流',
  description: '在抖音、小红书私信或评论区留手机号、微信、QQ，担心触发违规限流？输入号码，工具自动生成①②③圆圈数字、汉字数字、泰文、数学字体等 20+ 种伪装方案，机器扫描识别率极低，1 秒复制发送，商家/博主/个人用户均适用。',
  keywords: [
    '抖音留联系方式', '小红书留联系方式', '留手机号不违规', '留微信不违规',
    '手机号变形', '防封号', '防限流', '号码伪装', 'Unicode变形',
    '抖音发手机号', '小红书发微信', '不违规联系方式',
  ],
  openGraph: {
    title: '抖音/小红书留联系方式不违规 — 手机号一键变形工具',
    description: '20+ 种 Unicode 伪装方案，圆圈数字、汉字、泰文、数学字体……机器识别率极低，1 秒复制发送。',
    type: 'website',
    locale: 'zh_CN',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// ── JSON-LD 结构化数据 ─────────────────────────────────────────

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '抖音发手机号会被封号吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '发送连续 11 位数字可能触发账号警告或限流，严重时被暂时限制私信功能。使用本工具的变形方案可显著降低被检测概率，推荐安全评分 80 以上的方案，并定期轮换策略。',
      },
    },
    {
      '@type': 'Question',
      name: '小红书私信发微信为什么显示违规？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '"微信"关键词 + 连续数字是小红书最高优先级违禁模式。本工具会同时替换关键词（微信→WX）和数字，需两步一起处理才能有效规避。',
      },
    },
    {
      '@type': 'Question',
      name: '谐音字「魏信」「喂心」还能用吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '主流平台 AI 已将常见谐音词纳入训练集，"魏信""喂心""V信"等在 2023 年后识别率持续攀升。Unicode 变形字符目前未被大规模收录，是更可靠的方案。',
      },
    },
    {
      '@type': 'Question',
      name: '这些伪装方案对方能正常看懂吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '圆圈数字①②③、汉字壹贰叁、泰文数字๑๒๓视觉可读性强，正常用户可识别。零宽字符肉眼完全不可见，复制后拨打也不受影响。',
      },
    },
    {
      '@type': 'Question',
      name: '工具生成的内容会被平台学习识别吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '任何方案长期大规模使用后都存在被识别的风险。本工具提供 20+ 种方案，建议定期轮换策略。Unicode 字符集有数万个码位，平台难以穷举覆盖。',
      },
    },
    {
      '@type': 'Question',
      name: '抖音和小红书的违规检测机制有什么不同？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '抖音侧重实时 OCR + 正则匹配，对连续纯数字序列敏感；小红书对"微信""手机号"等导流关键词检测更细化，关键词和数字需同时伪装。本工具的场景选择功能针对两个平台差异提供了不同推荐策略。',
      },
    },
  ],
}

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '手机号变形工具',
  alternateName: '号码伪装工具',
  applicationCategory: 'UtilitiesApplication',
  description: '抖音小红书留联系方式不违规工具，支持 20+ 种 Unicode 变形方案，包括圆圈数字、汉字大写、泰文/藏文、数学字体、零宽字符、混合策略等',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
  featureList: [
    '圆圈数字变形', '汉字大写变形', '5 种数学字体变体',
    '泰文/藏文等文化数字', '零宽字符插入', '混合双字符体系策略',
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '首页', item: 'https://numask.app/' },
  ],
}

// ── Page ──────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <DisguiseTool />
      <SeoSections />
    </>
  )
}
