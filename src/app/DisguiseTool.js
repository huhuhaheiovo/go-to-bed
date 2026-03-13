'use client'

import { InputPanel } from '@/components/InputPanel'
import { RiskMeter } from '@/components/RiskMeter'
import { SceneSelector } from '@/components/SceneSelector'
import { ResultsGrid } from '@/components/ResultsGrid'
import { HistoryPanel } from '@/components/HistoryPanel'
import { SafetyNotice } from '@/components/SafetyNotice'
import { ThemeToggle } from '@/components/ThemeToggle'

export function DisguiseTool() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-200">
      <div className="relative max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* 页头 */}
        <header className="text-center space-y-2">
          <div className="flex justify-end mb-2">
            <ThemeToggle />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            抖音 · 小红书 · 快手 · 微博 防封号防限流
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
            抖音 · 小红书留联系方式
            <span className="block text-orange-500 dark:text-orange-400">不违规变形工具</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto mt-1">
            担心留手机号/微信/QQ 触发违规限流？输入号码，自动生成 <strong className="text-zinc-700 dark:text-zinc-300 font-medium">20+ 种 Unicode 伪装方案</strong>，防封号 · 防限流
          </p>
        </header>

        {/* 输入层 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs">①</span>
            <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">输入内容</h2>
          </div>
          <InputPanel />
        </div>

        {/* 风险评估 */}
        <RiskMeter />

        {/* 场景选择器 */}
        <SceneSelector />

        {/* 转换结果 */}
        <ResultsGrid />

        {/* 底部：历史 + 安全提示 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <HistoryPanel />
          <SafetyNotice />
        </div>

        {/* 页脚 */}
        <footer className="text-center pt-4 pb-2">
          <p className="text-zinc-400 dark:text-zinc-600 text-xs">
            本工具完全在本地运行，不上传任何数据 · 历史记录仅存储于本机浏览器
          </p>
        </footer>
      </div>
    </div>
  )
}
