// 风险评估模块：判断信息敏感程度，匹配平台违禁关键词库

const BANNED_KEYWORDS = [
  '联系我', '私信我', '加我', '加好友', '找我', '发我',
  '加微信', '加qq', '加QQ', '手机号', '电话号码', '号码',
  '私聊', '私信', 'dm我', 'dm me', '联系方式',
]

const PLATFORM_KEYWORDS = [
  '微信', 'QQ', '扣扣', '企鹅', '抖音', '快手',
  '微博', '小红书', '淘宝', 'B站', '微商',
]

const SENSITIVE_PATTERNS = [
  { re: /1[3-9]\d{9}/, label: '手机号码', points: 60 },
  { re: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, label: '邮箱地址', points: 30 },
  { re: /[1-9]\d{4,10}/, label: '疑似QQ号', points: 15 },
]

export const RISK_CONFIG = {
  high: {
    label: '高风险',
    desc: '极易被平台检测和屏蔽',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-400/10',
    border: 'border-rose-200 dark:border-rose-400/30',
    bar: 'bg-rose-500',
  },
  medium: {
    label: '中风险',
    desc: '可能触发平台审核',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-400/10',
    border: 'border-amber-200 dark:border-amber-400/30',
    bar: 'bg-amber-500',
  },
  low: {
    label: '低风险',
    desc: '基本无特殊敏感内容',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-400/10',
    border: 'border-emerald-200 dark:border-emerald-400/30',
    bar: 'bg-emerald-500',
  },
}

export function assessRisk(text, recognition) {
  if (!text?.trim()) return { level: 'low', score: 0, details: [] }

  const lower = text.toLowerCase()
  const details = []
  let score = 0

  // 检测已识别的高危类型
  if (recognition?.found?.phones?.length) {
    score += 60
    details.push({
      severity: 'high',
      msg: `包含手机号: ${recognition.found.phones.join(', ')}，极易被识别`,
    })
  }

  if (recognition?.found?.emails?.length) {
    score += 30
    details.push({
      severity: 'medium',
      msg: `包含邮箱: ${recognition.found.emails.join(', ')}`,
    })
  }

  if (recognition?.types?.includes('qq')) {
    score += 20
    details.push({ severity: 'medium', msg: 'QQ号码格式可被算法识别' })
  }

  // 检测违禁引导性词汇
  const foundBanned = BANNED_KEYWORDS.filter(kw => lower.includes(kw.toLowerCase()))
  if (foundBanned.length) {
    const pts = Math.min(foundBanned.length * 8, 40)
    score += pts
    details.push({
      severity: 'high',
      msg: `引导性词汇: ${foundBanned.slice(0, 3).join('、')}${foundBanned.length > 3 ? '等' : ''}`,
    })
  }

  // 检测平台词汇
  const foundPlatform = PLATFORM_KEYWORDS.filter(kw => lower.includes(kw.toLowerCase()))
  if (foundPlatform.length) {
    score += foundPlatform.length * 5
    details.push({
      severity: 'medium',
      msg: `涉及平台名称: ${foundPlatform.slice(0, 4).join('、')}`,
    })
  }

  score = Math.min(100, score)

  return {
    level: score >= 55 ? 'high' : score >= 25 ? 'medium' : 'low',
    score,
    details,
  }
}
