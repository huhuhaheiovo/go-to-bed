'use client'

import useDisguiseStore from '@/store/useDisguiseStore'
import { ResultCard } from './ResultCard'

export function ResultsGrid() {
  const { results, hasConverted } = useDisguiseStore()

  if (!hasConverted || !results.length) return null

  return (
    <section className="space-y-3 animate-slide-up">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">转换结果</h2>
        <span className="text-zinc-400 dark:text-zinc-600 text-xs">· 4 种策略并行生成，点击卡片文字可全选</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {results.map(r => (
          <ResultCard key={r.id} result={r} />
        ))}
      </div>
    </section>
  )
}
