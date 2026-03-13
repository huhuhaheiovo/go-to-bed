// 信息识别引擎：正则解析手机号格式，识别微信/QQ/邮箱等类型

const PHONE_RE = /1[3-9]\d{9}/g
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
const QQ_RE = /(?<![0-9])([1-9]\d{4,10})(?![0-9])/g

const WECHAT_KEYWORDS = ['微信', 'weixin', 'wechat', 'wx号', 'wx:']
const QQ_KEYWORDS = ['qq', 'QQ', '扣扣', '企鹅号']
const PHONE_KEYWORDS = ['手机', '电话', '号码', '联系', '打电话']

export const TYPE_LABELS = {
  phone:  { label: '手机号',  color: 'text-blue-600   dark:text-blue-400   bg-blue-50   dark:bg-blue-400/10   border-blue-200   dark:border-blue-400/20'   },
  email:  { label: '邮箱',   color: 'text-sky-600    dark:text-sky-400    bg-sky-50    dark:bg-sky-400/10    border-sky-200    dark:border-sky-400/20'    },
  wechat: { label: '微信',   color: 'text-green-600  dark:text-green-400  bg-green-50  dark:bg-green-400/10  border-green-200  dark:border-green-400/20'  },
  qq:     { label: 'QQ',    color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-400/10 border-indigo-200 dark:border-indigo-400/20' },
  mixed:  { label: '混合内容', color: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-400/10 border-violet-200 dark:border-violet-400/20' },
  text:   { label: '文本',   color: 'text-zinc-600   dark:text-zinc-400   bg-zinc-100  dark:bg-zinc-400/10   border-zinc-300   dark:border-zinc-400/20'   },
}

export function recognizeInput(text) {
  if (!text?.trim()) return null

  const lower = text.toLowerCase()
  const types = []
  const found = {}

  // 识别手机号
  const phones = [...text.matchAll(PHONE_RE)].map(m => m[0])
  if (phones.length) {
    types.push('phone')
    found.phones = [...new Set(phones)]
  }

  // 识别邮箱
  const emails = [...text.matchAll(EMAIL_RE)].map(m => m[0])
  if (emails.length) {
    types.push('email')
    found.emails = [...new Set(emails)]
  }

  // 识别微信
  const hasWX = WECHAT_KEYWORDS.some(kw => lower.includes(kw.toLowerCase()))
  if (hasWX) {
    types.push('wechat')
  }

  // 识别 QQ
  const hasQQKw = QQ_KEYWORDS.some(kw => lower.includes(kw.toLowerCase()))
  const qqNums = [...text.matchAll(QQ_RE)]
    .map(m => m[1])
    .filter(n => n.length >= 5 && n.length <= 11 && !found.phones?.includes(n))

  if (hasQQKw || (qqNums.length && !phones.length)) {
    types.push('qq')
    if (qqNums.length) found.qqs = [...new Set(qqNums)]
  }

  // 检查是否有引导性词汇（不作为类型，仅供风险评估用）
  const hasPhoneKw = PHONE_KEYWORDS.some(kw => lower.includes(kw))
  if (hasPhoneKw) found.hasPhoneKeyword = true

  if (!types.length) types.push('text')
  if (types.length > 1) types.push('mixed')

  return { types: [...new Set(types)], found }
}
