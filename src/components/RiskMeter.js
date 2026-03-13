'use client'

import useDisguiseStore from '@/store/useDisguiseStore'
import { RISK_CONFIG } from '@/lib/risk'
import { AlertCircle, AlertTriangle, ShieldCheck, Info } from 'lucide-react'

const RISK_ICONS = {
  high:   <AlertCircle  size={16} strokeWidth={2} />,
  medium: <AlertTriangle size={16} strokeWidth={2} />,
  low:    <ShieldCheck  size={16} strokeWidth={2} />,
}

const DETAIL_ICONS = {
  high:   <AlertTriangle size={11} strokeWidth={2} className="mt-0.5 shrink-0 text-rose-500 dark:text-rose-400" />,
  medium: <Info          size={11} strokeWidth={2} className="mt-0.5 shrink-0 text-amber-500 dark:text-amber-400" />,
}

export function RiskMeter() {
  const { risk } = useDisguiseStore()
  if (!risk) return null

  const cfg = RISK_CONFIG[risk.level]

  return (
    <div className={`rounded-xl border p-4 space-y-3 ${cfg.bg} ${cfg.border}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cfg.color}>{RISK_ICONS[risk.level]}</span>
          <span className={`font-semibold text-sm ${cfg.color}`}>{cfg.label}</span>
          <span className="text-zinc-500 text-xs">· {cfg.desc}</span>
        </div>
        <span className={`font-mono font-bold text-sm ${cfg.color}`}>{risk.score}</span>
      </div>

      <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${cfg.bar}`}
          style={{ width: `${risk.score}%` }}
        />
      </div>

      {risk.details.length > 0 && (
        <ul className="space-y-1.5 pt-1">
          {risk.details.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              {DETAIL_ICONS[d.severity] ?? DETAIL_ICONS.medium}
              <span>{d.msg}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
