/**
 * NumberObfuscator.ts
 * 数字伪装工具类 — 涵盖所有 Unicode 替换策略
 */

// ─────────────────────────────────────────────
// 字符映射表
// ─────────────────────────────────────────────

/** Unicode 数学字体变体 */
const MATH_MAPS = {
  bold:           ['𝟎','𝟏','𝟐','𝟑','𝟒','𝟓','𝟔','𝟕','𝟖','𝟗'],
  doubleStruck:   ['𝟘','𝟙','𝟚','𝟛','𝟜','𝟝','𝟞','𝟟','𝟠','𝟡'],
  sansSerif:      ['𝟢','𝟣','𝟤','𝟥','𝟦','𝟧','𝟨','𝟩','𝟪','𝟫'],
  sansSerifBold:  ['𝟬','𝟭','𝟮','𝟯','𝟰','𝟱','𝟲','𝟳','𝟴','𝟵'],
  monospace:      ['𝟶','𝟷','𝟸','𝟹','𝟺','𝟻','𝟼','𝟽','𝟾','𝟿'],
} as const

/** 带装饰的圆圈 / 方块 / 括号 / 罗马数字 */
const DECORATED_MAPS = {
  circleOutline:  ['⓪','①','②','③','④','⑤','⑥','⑦','⑧','⑨'],
  circleFilled:   ['⓿','❶','❷','❸','❹','❺','❻','❼','❽','❾'],
  squareFilled:   ['','➊','➋','➌','➍','➎','➏','➐','➑','➒'],  // 0 无方块实心，用空字符占位
  parenthesized:  ['','⑴','⑵','⑶','⑷','⑸','⑹','⑺','⑻','⑼'],
  fullStop:       ['','⒈','⒉','⒊','⒋','⒌','⒍','⒎','⒏','⒐'],
  superscript:    ['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹'],
  subscript:      ['₀','₁','₂','₃','₄','₅','₆','₇','₈','₉'],
  fullWidth:      ['０','１','２','３','４','５','６','７','８','９'],
} as const

/** 各文化 / 语言数字体系（已移除可读性过差的 thai / tibetan） */
const CULTURAL_MAPS = {
  arabic:         ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'],
  persian:        ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'],
  devanagari:     ['०','१','२','३','४','५','६','७','८','९'],
  bengali:        ['০','১','২','৩','৪','৫','৬','৭','৮','৯'],
  burmese:        ['၀','၁','၂','၃','၄','၅','၆','၇','၈','၉'],
  mongolian:      ['᠐','᠑','᠒','᠓','᠔','᠕','᠖','᠗','᠘','᠙'],
  chineseSimple:  ['零','一','二','三','四','五','六','七','八','九'],
  chineseFormal:  ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'],
} as const

/** 形近字符替换（视觉欺骗） */
const LOOKALIKE_MAP: Record<string, string[]> = {
  '0': ['O', 'o', 'Ο', 'ο', '⊙', '◎', '০'],
  '1': ['l', 'I', 'ｌ', '|', '⌇'],
  '2': ['ƻ', 'Ƨ', 'ᒿ', 'Ƨ'],
  '3': ['Ʒ', 'ʒ', 'Ȝ', 'ε'],
  '4': ['Ч', 'ч', 'Ꮞ'],
  '5': ['Ƽ', 'ƽ', 'ϛ', '§'],
  '6': ['б', 'ϭ', 'ƅ'],
  '7': ['⌐', 'Γ', '𝄿'],
  '8': ['Ȣ', 'ȣ', 'ȸ'],
  '9': ['q', 'ৎ', 'ƍ'],
}

/** 零宽字符（不可见，打断正则匹配） */
const ZERO_WIDTH_CHARS = [
  '\u200B', // Zero Width Space
  '\u200C', // Zero Width Non-Joiner
  '\u200D', // Zero Width Joiner
  '\u2060', // Word Joiner
  '\uFEFF', // Zero Width No-Break Space
] as const

// ─────────────────────────────────────────────
// 类型定义
// ─────────────────────────────────────────────

export type MathStyle      = keyof typeof MATH_MAPS
export type DecoratedStyle = keyof typeof DECORATED_MAPS
export type CulturalStyle  = keyof typeof CULTURAL_MAPS

export interface ObfuscateOptions {
  /** 在每个数字之间插入零宽字符，打断机器正则 */
  zeroWidth?: boolean
  /** 零宽字符插入概率 0~1，默认 1（每个数字后都插入） */
  zeroWidthDensity?: number
  /** 形近替换时，每个数字选用的候选索引（默认 0，即第一个候选） */
  lookalikeIndex?: number
}

export interface ObfuscateResult {
  /** 转换后文本 */
  output: string
  /** 使用的策略描述 */
  strategy: string
  /** 安全评分 0-100，越低越安全 */
  riskScore: number
}

// ─────────────────────────────────────────────
// 工具函数
// ─────────────────────────────────────────────

/**
 * 在数字序列中插入零宽字符。
 * 作用于原始数字（转换之前），零宽字符会被保留在转换后的字符之间。
 * 注意：不使用字符范围 [⓪-⑨]，以避免 Unicode 码位乱序导致的正则错误。
 */
function insertZeroWidth(text: string, density = 1): string {
  return text.replace(/\d/g, (char, offset) => {
    if (Math.random() > density) return char
    const zwChar = ZERO_WIDTH_CHARS[offset % ZERO_WIDTH_CHARS.length]
    return char + zwChar
  })
}

/** 将数字字符串按映射表替换 */
function replaceByMap(input: string, map: readonly string[]): string {
  return input.replace(/\d/g, (d) => map[parseInt(d)] ?? d)
}

/** 混合两种映射，前半段用 mapA，后半段用 mapB */
function replaceByMixedMap(
  input: string,
  mapA: readonly string[],
  mapB: readonly string[],
): string {
  const digits = input.match(/\d/g) ?? []
  const mid = Math.ceil(digits.length / 2)
  let digitIdx = 0
  return input.replace(/\d/g, (d) => {
    const map = digitIdx++ < mid ? mapA : mapB
    return map[parseInt(d)] ?? d
  })
}

// ─────────────────────────────────────────────
// 主工具类
// ─────────────────────────────────────────────

export class NumberObfuscator {

  // ── 1. 数学字体变体 ──────────────────────────

  static mathStyle(input: string, style: MathStyle, opts: ObfuscateOptions = {}): ObfuscateResult {
    const working = opts.zeroWidth ? insertZeroWidth(input, opts.zeroWidthDensity) : input
    const output = replaceByMap(working, MATH_MAPS[style])
    return { output, strategy: `数学字体·${style}`, riskScore: 20 }
  }

  // ── 2. 装饰数字 ──────────────────────────────

  static decorated(input: string, style: DecoratedStyle, opts: ObfuscateOptions = {}): ObfuscateResult {
    const working = opts.zeroWidth ? insertZeroWidth(input, opts.zeroWidthDensity) : input
    const output = replaceByMap(working, DECORATED_MAPS[style])
    return { output, strategy: `装饰数字·${style}`, riskScore: 25 }
  }

  // ── 3. 文化数字体系 ──────────────────────────

  static cultural(input: string, style: CulturalStyle, opts: ObfuscateOptions = {}): ObfuscateResult {
    const working = opts.zeroWidth ? insertZeroWidth(input, opts.zeroWidthDensity) : input
    const output = replaceByMap(working, CULTURAL_MAPS[style])
    return { output, strategy: `文化数字·${style}`, riskScore: 30 }
  }

  // ── 4. 形近字符替换 ──────────────────────────

  static lookalike(input: string, opts: ObfuscateOptions = {}): ObfuscateResult {
    const idx = opts.lookalikeIndex ?? 0
    const working = opts.zeroWidth ? insertZeroWidth(input, opts.zeroWidthDensity) : input
    const output = working.replace(/\d/g, (d) => {
      const candidates = LOOKALIKE_MAP[d]
      return candidates?.[idx % candidates.length] ?? d
    })
    return { output, strategy: '形近字符替换', riskScore: 45 }
  }

  // ── 5. 零宽字符插入（单独使用） ───────────────

  static zeroWidthOnly(input: string, density = 1): ObfuscateResult {
    const output = input.replace(/\d/g, (char, offset) => {
      if (Math.random() > density) return char
      return char + ZERO_WIDTH_CHARS[offset % ZERO_WIDTH_CHARS.length]
    })
    return { output, strategy: '零宽字符插入', riskScore: 35 }
  }

  // ── 6. 混合策略（前后段使用不同映射） ──────────

  static mixed(
    input: string,
    styleA: MathStyle | CulturalStyle,
    styleB: MathStyle | CulturalStyle,
    opts: ObfuscateOptions = {},
  ): ObfuscateResult {
    const mapA = (MATH_MAPS as Record<string, readonly string[]>)[styleA]
      ?? (CULTURAL_MAPS as Record<string, readonly string[]>)[styleA]
    const mapB = (MATH_MAPS as Record<string, readonly string[]>)[styleB]
      ?? (CULTURAL_MAPS as Record<string, readonly string[]>)[styleB]
    const working = opts.zeroWidth ? insertZeroWidth(input, opts.zeroWidthDensity) : input
    const output = replaceByMixedMap(working, mapA, mapB)
    return { output, strategy: `混合·${styleA}+${styleB}`, riskScore: 15 }
  }

  // ── 7. 跨类混合（每位数字从三大类中轮转取一种映射） ──────────

  /**
   * 从数学字体、装饰数字、文化数字三类中各随机取一种样式，
   * 按数字位依次轮转 A→B→C→A…，使每位来自不同字符体系。
   * 每次调用随机选取不同组合，产出独一无二的结果。
   */
  static categoryMix(input: string, opts: ObfuscateOptions = {}): ObfuscateResult {
    const mathKeys  = Object.keys(MATH_MAPS)      as MathStyle[]
    const decorKeys = Object.keys(DECORATED_MAPS) as DecoratedStyle[]
    const cultKeys  = Object.keys(CULTURAL_MAPS)  as CulturalStyle[]

    const km = mathKeys [Math.floor(Math.random() * mathKeys.length)]
    const kd = decorKeys[Math.floor(Math.random() * decorKeys.length)]
    const kc = cultKeys [Math.floor(Math.random() * cultKeys.length)]

    const maps: readonly (readonly string[])[] = [
      MATH_MAPS[km],
      DECORATED_MAPS[kd],
      CULTURAL_MAPS[kc],
    ]

    const working = opts.zeroWidth
      ? insertZeroWidth(input, opts.zeroWidthDensity)
      : input

    let i = 0
    const output = working.replace(/\d/g, (d) => {
      const map = maps[i++ % maps.length]
      return map[parseInt(d)] ?? d
    })

    return { output, strategy: `跨类混合·${km}+${kd}+${kc}`, riskScore: 10 }
  }

  // ── 8. 全量输出：一次生成所有方案 ─────────────

  static all(input: string, opts: ObfuscateOptions = {}): ObfuscateResult[] {
    const results: ObfuscateResult[] = []

    // 数学字体
    for (const style of Object.keys(MATH_MAPS) as MathStyle[]) {
      results.push(this.mathStyle(input, style, opts))
    }

    // 装饰数字
    for (const style of Object.keys(DECORATED_MAPS) as DecoratedStyle[]) {
      results.push(this.decorated(input, style, opts))
    }

    // 文化数字
    for (const style of Object.keys(CULTURAL_MAPS) as CulturalStyle[]) {
      results.push(this.cultural(input, style, opts))
    }

    // 形近字符
    results.push(this.lookalike(input, opts))

    // 零宽字符
    results.push(this.zeroWidthOnly(input))

    // 推荐混合方案（双数学字体混合）
    results.push(this.mixed(input, 'doubleStruck', 'bold', { zeroWidth: true }))
    results.push(this.mixed(input, 'sansSerifBold', 'monospace', opts))

    // 按安全分升序
    return results.sort((a, b) => a.riskScore - b.riskScore)
  }

  // ── 8. 推荐方案（按场景） ─────────────────────

  static recommend(input: string, scene: 'comment' | 'dm' | 'bio'): ObfuscateResult[] {
    switch (scene) {
      case 'comment':
        // 评论区：优先视觉自然，中文/圆圈数字最佳
        return [
          this.cultural(input, 'chineseSimple'),
          this.decorated(input, 'circleOutline'),
          this.cultural(input, 'chineseFormal'),
        ]
      case 'dm':
        // 私信：伪装强度最高，双数学字体混合+零宽
        return [
          this.mixed(input, 'doubleStruck', 'bold',      { zeroWidth: true }),
          this.mixed(input, 'sansSerifBold', 'monospace', { zeroWidth: true }),
          this.mathStyle(input, 'monospace', { zeroWidth: true }),
        ]
      case 'bio':
        // 主页简介：可读性+安全性兼顾，全角数字视觉整洁
        return [
          this.decorated(input, 'fullWidth'),
          this.decorated(input, 'superscript'),
          this.mathStyle(input, 'doubleStruck'),
        ]
    }
  }
}
