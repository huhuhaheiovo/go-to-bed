'use client'

import { create } from 'zustand'
import { recognizeInput } from '@/lib/recognition'
import { assessRisk } from '@/lib/risk'
import { convertByScene } from '@/lib/converters'

const HISTORY_KEY = 'disguise_history'

const useDisguiseStore = create((set, get) => ({
  input: '',
  recognition: null,
  risk: null,
  results: [],
  history: [],
  hasConverted: false,
  scene: 'classic',

  setInput: (input) => set({ input }),

  setScene: (scene) => {
    const { input } = get()
    if (!input) { set({ scene }); return }
    const results = convertByScene(input, scene)
    set({ scene, results })
  },

  convert: () => {
    const { input, scene } = get()
    if (!input.trim()) return

    const recognition = recognizeInput(input)
    const risk = assessRisk(input, recognition)
    const results = convertByScene(input, scene)

    const entry = {
      id: Date.now(),
      input,
      recognition,
      risk,
      results,
      scene,
      timestamp: Date.now(),
    }

    const history = [entry, ...get().history].slice(0, 20)

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
      } catch (e) {
        console.error('Failed to save history:', e)
      }
    }

    set({ recognition, risk, results, history, hasConverted: true })
  },

  loadHistory: () => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem(HISTORY_KEY)
      if (stored) set({ history: JSON.parse(stored) })
    } catch (e) {
      console.error('Failed to load history:', e)
    }
  },

  clearHistory: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(HISTORY_KEY)
    }
    set({ history: [] })
  },

  restoreEntry: (entry) => {
    set({
      input: entry.input,
      recognition: entry.recognition,
      risk: entry.risk,
      results: entry.results,
      scene: entry.scene ?? 'classic',
      hasConverted: true,
    })
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
}))

export default useDisguiseStore
