'use client'

import { useEffect } from 'react'
import { Clock, Phone, MessageCircle, Hash, Mail, AlertCircle, AlertTriangle, ShieldCheck } from 'lucide-react'
import useDisguiseStore from '@/store/useDisguiseStore'
import { RISK_CONFIG } from '@/lib/risk'

function formatTime(ts) {
  const d = new Date(ts)
  const now = new Date()
  const diff = now - d

  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`
  return `${d.getMonth() + 1}/${d.getDate()}`
}

const TYPE_ICON_MAP = {
  phone:  <Phone         size={10} strokeWidth={2} />,
  wechat: <MessageCircle size={10} strokeWidth={2} />,
  qq:     <Hash          size={10} strokeWidth={2} />,
  email:  <Mail          size={10} strokeWidth={2} />,
}

const RISK_ICON_MAP = {
  high:   <AlertCircle   size={11} strokeWidth={2} />,
  medium: <AlertTriangle size={11} strokeWidth={2} />,
  low:    <ShieldCheck   size={11} strokeWidth={2} />,
}

export function HistoryPanel() {
  const { history, loadHistory, clearHistory, restoreEntry } = useDisguiseStore()

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  return (
    <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-sm dark:shadow-none">
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={14} strokeWidth={2} className="text-zinc-500 dark:text-zinc-400 shrink-0" />
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">转换历史</h2>
          {history.length > 0 && (
            <span className="text-xs text-zinc-400 dark:text-zinc-600">· {history.length} 条</span>
          )}
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors cursor-pointer"
          >
            清空
          </button>
        )}
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
        {history.length === 0 && (
          <p className="px-4 py-6 text-center text-zinc-400 dark:text-zinc-600 text-sm">暂无历史记录</p>
        )}
        {history.slice(0, 8).map(entry => {
          const riskCfg = entry.risk ? RISK_CONFIG[entry.risk.level] : null
          return (
            <button
              key={entry.id}
              onClick={() => restoreEntry(entry)}
              className="w-full px-4 py-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-zinc-700 dark:text-zinc-200 text-xs font-mono truncate max-w-[200px] group-hover:max-w-full transition-all">
                  {entry.input}
                </span>
                {riskCfg && (
                  <span className={`shrink-0 ${riskCfg.color}`}>
                    {RISK_ICON_MAP[entry.risk.level]}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 dark:text-zinc-600 text-xs">{formatTime(entry.timestamp)}</span>
                {entry.recognition?.types?.filter(t => t !== 'mixed' && t !== 'text').map(t => (
                  <span key={t} className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-600 text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    {TYPE_ICON_MAP[t]}
                    <span>{t}</span>
                  </span>
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
