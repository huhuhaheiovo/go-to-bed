// 核心转换引擎 — 基于 NumberObfuscator（多 Unicode 策略）
import { NumberObfuscator } from './NumberObfuscator'

// ── 展示名称映射 ──────────────────────────────────────────────

const DISPLAY_NAMES = {
  // 数学字体
  bold: '数学粗体', doubleStruck: '双线数字', sansSerif: '无衬线',
  sansSerifBold: '无衬线粗体', monospace: '等宽字体',
  // 装饰数字
  circleOutline: '空心圆圈', circleFilled: '实心圆圈', squareFilled: '实心方块',
  parenthesized: '括号数字', fullStop: '带点数字', superscript: '上标',
  subscript: '下标', fullWidth: '全角数字',
  // 文化数字
  arabic: '阿拉伯文', persian: '波斯文', devanagari: '天城文',
  bengali: '孟加拉文', burmese: '缅甸文',
  mongolian: '蒙古文', chineseSimple: '汉字简体', chineseFormal: '汉字大写',
  // 其他
  '形近字符替换': '形近字符', '零宽字符插入': '零宽隐形',
}

const STRATEGY_COLORS = {
  bold: 'blue', doubleStruck: 'indigo', sansSerif: 'sky', sansSerifBold: 'violet',
  monospace: 'purple', circleOutline: 'blue', circleFilled: 'indigo',
  squareFilled: 'purple', parenthesized: 'violet', fullStop: 'orange',
  superscript: 'sky', subscript: 'orange', fullWidth: 'teal',
  arabic: 'orange', persian: 'emerald', devanagari: 'teal', bengali: 'emerald',
  burmese: 'teal', mongolian: 'indigo',
  chineseSimple: 'blue', chineseFormal: 'indigo',
  '形近字符替换': 'orange', '零宽字符插入': 'violet',
}

const COLOR_POOL = ['blue', 'purple', 'teal', 'orange', 'indigo', 'emerald', 'violet', 'sky']

// ── 分类 Key 集合（用于还原 categoryMix 策略名） ────────────────

const MATH_STYLE_KEYS = new Set([
  'bold', 'doubleStruck', 'sansSerif', 'sansSerifBold', 'monospace',
])
const DECOR_STYLE_KEYS = new Set([
  'circleOutline', 'circleFilled', 'squareFilled', 'parenthesized',
  'fullStop', 'superscript', 'subscript', 'fullWidth',
])

function styleKeyToCategory(key) {
  if (MATH_STYLE_KEYS.has(key)) return '数学字体'
  if (DECOR_STYLE_KEYS.has(key)) return '装饰数字'
  return '文化数字'
}

// ── 工具函数 ──────────────────────────────────────────────────

function parseStrategy(strategy) {
  const parts = strategy.split('·')
  if (parts.length === 1) return { category: '', styleName: strategy, key: strategy }
  const [category, ...rest] = parts
  return { category, styleName: rest.join('·'), key: rest[0] }
}

// 生成示例：对 '1', '3', '8' 各运行一次转换，展示映射关系
function genExamples(category, styleName) {
  const samples = ['1', '3', '8']
  try {
    let convert
    if (category === '数学字体') convert = d => NumberObfuscator.mathStyle(d, styleName).output
    else if (category === '装饰数字') convert = d => NumberObfuscator.decorated(d, styleName).output
    else if (category === '文化数字') convert = d => NumberObfuscator.cultural(d, styleName).output
    else if (styleName === '形近字符替换') convert = d => NumberObfuscator.lookalike(d).output
    else return []
    return samples.map(d => `${d}→${convert(d)}`)
  } catch {
    return []
  }
}

// NumberObfuscator 结果 → UI 结果格式
function toUIResult(raw, index) {
  const strategy = raw.strategy

  // ── 跨类混合（categoryMix）─────────────────────────────────
  if (strategy.startsWith('跨类混合·')) {
    const combo = strategy.replace('跨类混合·', '').split('+')
    // 每个 key 取一个示例展示该类字符长相
    const examples = combo.map(k => {
      const ex = genExamples(styleKeyToCategory(k), k)
      return ex[0] || (DISPLAY_NAMES[k] || k)
    })
    return {
      id: `catmix_${combo.join('_')}_${index}`,
      name: '跨类混合',
      desc: combo.map(k => DISPLAY_NAMES[k] || k).join(' · '),
      examples,
      colorClass: COLOR_POOL[index % COLOR_POOL.length],
      result: raw.output,
      safetyScore: Math.max(10, 100 - raw.riskScore),
    }
  }

  // ── 前后段混合（mixed）────────────────────────────────────
  if (strategy.startsWith('混合·')) {
    return {
      id: `mixed_${index}`,
      name: '混合方案',
      desc: '双重映射 + 零宽字符',
      examples: ['双重策略', '零宽打断', '极强混淆'],
      colorClass: 'violet',
      result: raw.output,
      safetyScore: Math.max(10, 100 - raw.riskScore),
    }
  }

  // ── 单一策略 ────────────────────────────────────────────
  const { category, styleName, key } = parseStrategy(strategy)
  return {
    id: `${key}_${index}`,
    name: DISPLAY_NAMES[key] || key,
    desc: category ? `${category} · ${styleName}` : styleName,
    examples: genExamples(category, styleName),
    colorClass: STRATEGY_COLORS[key] || COLOR_POOL[index % COLOR_POOL.length],
    result: raw.output,
    safetyScore: Math.max(10, 100 - raw.riskScore),
  }
}

// ── 场景配置 ──────────────────────────────────────────────────

export const SCENES = [
  { id: 'classic', label: '经典',  desc: '三类轮转，每次随机' },
  { id: 'comment', label: '评论区', desc: '易读为主，三类轮转' },
  { id: 'dm',      label: '私信',  desc: '零宽加固，最强混淆' },
  { id: 'bio',     label: '简介',  desc: '美观易读，三类轮转' },
]

// ── 转换函数 ──────────────────────────────────────────────────

/**
 * 经典模式：生成 4 组不同的跨类混合结果
 * 每次调用随机从三大类中各取一种样式轮转，结果互不相同
 */
function convertClassic(text) {
  return [
    NumberObfuscator.categoryMix(text),
    NumberObfuscator.categoryMix(text),
    NumberObfuscator.categoryMix(text),
    NumberObfuscator.categoryMix(text),
  ].map((r, i) => toUIResult(r, i))
}

/**
 * 场景模式：根据场景调整选项，同样基于跨类混合生成 3 组
 */
function convertScene(text, scene) {
  const opts = scene === 'dm' ? { zeroWidth: true } : {}
  return [
    NumberObfuscator.categoryMix(text, opts),
    NumberObfuscator.categoryMix(text, opts),
    NumberObfuscator.categoryMix(text, opts),
  ].map((r, i) => toUIResult(r, i))
}

// 对外统一入口
export function convertAll(text) {
  if (!text?.trim()) return []
  return convertClassic(text)
}

export function convertByScene(text, scene) {
  if (!text?.trim()) return []
  if (scene === 'classic') return convertClassic(text)
  return convertScene(text, scene)
}
