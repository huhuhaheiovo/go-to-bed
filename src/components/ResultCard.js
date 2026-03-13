'use client'

import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'

export function ResultCard({ result }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(result.result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      const el = document.createElement('textarea')
      el.value = result.result
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [result.result])

  const scoreLabel = result.safetyScore >= 80 ? '优秀' : result.safetyScore >= 65 ? '良好' : '一般'
  const isHighScore = result.safetyScore >= 80

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden flex flex-col">
      {/* 卡片头部 */}
      <div className="px-4 py-3 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">{result.name}</span>
          <span className="text-zinc-400 dark:text-zinc-600 text-xs hidden sm:inline">{result.desc}</span>
        </div>
        {/* 安全分 */}
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium
          ${isHighScore
            ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
          }`}
        >
          <span className="font-mono">{result.safetyScore}</span>
          <span className="opacity-60">· {scoreLabel}</span>
        </div>
      </div>

      {/* 示例标签 */}
      <div className="px-4 pt-3 flex flex-wrap gap-1.5">
        {result.examples.map((ex, i) => (
          <span key={i} className="text-xs text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-mono">
            {ex}
          </span>
        ))}
      </div>

      {/* 安全分进度条（橙色） */}
      <div className="px-4 pt-2">
        <div className="h-px bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-700"
            style={{ width: `${result.safetyScore}%` }}
          />
        </div>
      </div>

      {/* 转换结果 */}
      <div className="flex-1 px-4 py-3">
        <p className="text-zinc-900 dark:text-zinc-100 text-base leading-relaxed break-all select-all font-mono tracking-wide">
          {result.result}
        </p>
      </div>

      {/* 复制按钮 */}
      <div className="px-4 pb-3">
        <button
          onClick={handleCopy}
          className={`w-full py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer
            border active:scale-95
            ${copied
              ? 'bg-orange-500 border-orange-500 text-white'
              : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            {copied
              ? <><Check size={13} strokeWidth={2.5} /><span>已复制！</span></>
              : <><Copy  size={13} strokeWidth={2}   /><span>复制结果</span></>
            }
          </span>
        </button>
      </div>
    </div>
  )
}
