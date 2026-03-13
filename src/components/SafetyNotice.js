'use client'

import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react'

const TIPS = [
  { type: 'check', text: '仅供个人在合规平台分享联系方式使用' },
  { type: 'check', text: '建议结合多种策略，提升混淆效果' },
  { type: 'warn',  text: '不同平台算法不同，效果因平台而异' },
  { type: 'cross', text: '请勿用于诈骗、违规商业推广等违法行为' },
  { type: 'cross', text: '本工具不对使用后果承担任何法律责任' },
]

const TIP_ICON = {
  check: <CheckCircle2 size={13} strokeWidth={2} className="text-green-500 dark:text-green-400 shrink-0 mt-0.5" />,
  warn:  <AlertTriangle size={13} strokeWidth={2} className="text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />,
  cross: <XCircle      size={13} strokeWidth={2} className="text-red-500   dark:text-red-400   shrink-0 mt-0.5" />,
}

export function SafetyNotice() {
  return (
    <section className="rounded-xl border border-amber-200 dark:border-amber-500/15 bg-amber-50 dark:bg-amber-500/5 overflow-hidden shadow-sm dark:shadow-none">
      <div className="px-4 py-3 border-b border-amber-200 dark:border-amber-500/15 flex items-center gap-2">
        <ShieldCheck size={14} strokeWidth={2} className="text-amber-600 dark:text-amber-400/80 shrink-0" />
        <h2 className="text-sm font-semibold text-amber-700 dark:text-amber-400/80">安全合规提示</h2>
      </div>
      <ul className="px-4 py-3 space-y-2">
        {TIPS.map((tip, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-500">
            {TIP_ICON[tip.type]}
            <span>{tip.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
