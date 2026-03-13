'use client'

import { Sparkles, MessageSquare, Send, BookUser } from 'lucide-react'
import useDisguiseStore from '@/store/useDisguiseStore'
import { SCENES } from '@/lib/converters'

const SCENE_ICONS = {
  classic: <Sparkles     size={13} strokeWidth={2} />,
  comment: <MessageSquare size={13} strokeWidth={2} />,
  dm:      <Send         size={13} strokeWidth={2} />,
  bio:     <BookUser     size={13} strokeWidth={2} />,
}

export function SceneSelector() {
  const { scene, setScene, hasConverted } = useDisguiseStore()

  if (!hasConverted) return null

  return (
    <div className="space-y-2 animate-slide-up">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">场景选择</h2>
        <span className="text-zinc-400 dark:text-zinc-600 text-xs">· 不同平台选不同策略</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {SCENES.map(s => (
          <button
            key={s.id}
            onClick={() => setScene(s.id)}
            title={s.desc}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all border cursor-pointer
              ${scene === s.id
                ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900 shadow-sm'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
          >
            {SCENE_ICONS[s.id]}
            <span>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
