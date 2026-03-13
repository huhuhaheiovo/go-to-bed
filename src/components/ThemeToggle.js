'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    const html = document.documentElement
    if (next) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch (e) {
      console.error('Failed to save theme:', e)
    }
  }

  // 避免服务端/客户端不匹配，未挂载时渲染占位
  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? '切换到浅色模式' : '切换到深色模式'}
      title={isDark ? '切换到浅色模式' : '切换到深色模式'}
      className="w-9 h-9 flex items-center justify-center rounded-lg text-base
        text-zinc-500 dark:text-zinc-400
        hover:bg-zinc-100 dark:hover:bg-zinc-800
        border border-zinc-200 dark:border-zinc-700
        transition-all active:scale-90"
    >
      {isDark
        ? <Sun size={16} strokeWidth={2} />
        : <Moon size={16} strokeWidth={2} />
      }
    </button>
  )
}
