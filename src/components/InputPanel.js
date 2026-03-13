'use client'

import { useCallback } from 'react'
import { Phone, Mail, MessageCircle, Hash, Shuffle, FileText, Lock, RefreshCw, AlertCircle, AlertTriangle, ShieldCheck } from 'lucide-react'
import useDisguiseStore from '@/store/useDisguiseStore'
import { TYPE_LABELS } from '@/lib/recognition'
import { RISK_CONFIG } from '@/lib/risk'

const TYPE_ICONS = {
  phone:  <Phone         size={11} strokeWidth={2} />,
  email:  <Mail          size={11} strokeWidth={2} />,
  wechat: <MessageCircle size={11} strokeWidth={2} />,
  qq:     <Hash          size={11} strokeWidth={2} />,
  mixed:  <Shuffle       size={11} strokeWidth={2} />,
  text:   <FileText      size={11} strokeWidth={2} />,
}

const RISK_ICONS = {
  high:   <AlertCircle   size={11} strokeWidth={2} />,
  medium: <AlertTriangle size={11} strokeWidth={2} />,
  low:    <ShieldCheck   size={11} strokeWidth={2} />,
}

export function InputPanel() {
  const { input, setInput, convert, recognition, risk, hasConverted } = useDisguiseStore()

  const handleKeyDown = useCallback((e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      convert()
    }
  }, [convert])

  const detectedTypes = recognition?.types?.filter(t => t !== 'mixed' && t !== 'text') ?? []
  const riskCfg = risk ? RISK_CONFIG[risk.level] : null

  return (
    <section className="space-y-4">
      <div className="relative group">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={'输入手机号 / 微信 / QQ / 邮箱，或包含联系方式的一段文字…\n\n例如：我的微信是 wx12345，手机 13812345678，QQ:987654321'}
          rows={5}
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700
            rounded-xl px-4 py-3.5
            text-zinc-900 dark:text-zinc-100
            placeholder-zinc-400 dark:placeholder-zinc-600
            text-sm leading-relaxed resize-none
            focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500
            focus:ring-1 focus:ring-zinc-400/20 dark:focus:ring-zinc-500/20
            transition-all shadow-sm dark:shadow-none"
        />
        <div className="absolute bottom-3 right-3 text-zinc-400 dark:text-zinc-600 text-xs select-none">
          ⌘ + Enter 快速转换
        </div>
      </div>

      {(detectedTypes.length > 0 || riskCfg) && (
        <div className="flex flex-wrap items-center gap-2">
          {detectedTypes.length > 0 && (
            <>
              <span className="text-zinc-500 text-xs">识别到：</span>
              {detectedTypes.map(t => {
                const cfg = TYPE_LABELS[t]
                if (!cfg) return null
                return (
                  <span
                    key={t}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.color}`}
                  >
                    {TYPE_ICONS[t]}
                    <span>{cfg.label}</span>
                  </span>
                )
              })}
            </>
          )}

          {riskCfg && (
            <span className={`ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${riskCfg.bg} ${riskCfg.border} ${riskCfg.color}`}>
              {RISK_ICONS[risk.level]}
              <span>原文{riskCfg.label}</span>
            </span>
          )}
        </div>
      )}

      <button
        onClick={convert}
        disabled={!input.trim()}
        className="w-full py-3.5 rounded-xl font-semibold text-sm transition-colors duration-150
          bg-zinc-900 hover:bg-zinc-700 dark:bg-zinc-100 dark:hover:bg-zinc-300
          text-white dark:text-zinc-900
          disabled:opacity-25 disabled:cursor-not-allowed
          active:scale-[0.98] tracking-wide cursor-pointer"
      >
        <span className="flex items-center justify-center gap-2">
          {hasConverted
            ? <><RefreshCw size={14} strokeWidth={2} /><span>重新转换</span></>
            : <><Lock      size={14} strokeWidth={2} /><span>开始转换</span></>
          }
        </span>
      </button>
    </section>
  )
}
