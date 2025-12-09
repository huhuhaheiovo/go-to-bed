'use client'

import { useState, useMemo, useEffect } from 'react'
import { Clock, Moon, Sun, Info } from 'lucide-react'

// Sleep Cycle Calculator Component
function SleepCycleCalculator() {
    const [wakeTime, setWakeTime] = useState({ hour: 7, minute: 0, period: 'AM' })
    const [cycleLength, setCycleLength] = useState(90)
    const [fallAsleepTime, setFallAsleepTime] = useState(15)
    const [calcType, setCalcType] = useState('wake') // 'wake', 'bed', or 'now'

    // Set default time to next 15 min interval or handle "now"
    useEffect(() => {
        // Optional: Initialize with current time logic if needed, 
        // but static default prevents hydration mismatch
    }, [])

    const handleSleepNow = () => {
        setCalcType('now')
        const now = new Date()
        let hour = now.getHours()
        const minute = now.getMinutes()
        const period = hour >= 12 ? 'PM' : 'AM'

        // Convert to 12h format
        hour = hour % 12
        hour = hour ? hour : 12

        setWakeTime({ hour, minute, period })
    }

    // Calculate times
    const calculateBedTimes = useMemo(() => {
        let baseMinutes = 0

        if (calcType === 'now') {
            const now = new Date()
            // Current time in minutes from midnight
            baseMinutes = now.getHours() * 60 + now.getMinutes()
        } else {
            baseMinutes = wakeTime.period === 'AM'
                ? (wakeTime.hour === 12 ? 0 : wakeTime.hour) * 60 + wakeTime.minute
                : (wakeTime.hour === 12 ? 12 : wakeTime.hour + 12) * 60 + wakeTime.minute
        }

        const results = []
        // 6 cycles is typical (9 hours) to 1 cycle (1.5 hours)
        // For 'wake': we want to wake up at X. So bed time = X - cycles - falling_asleep
        // For 'bed' or 'now': we go to bed at X. Wake time = X + cycles + falling_asleep

        const isCalculatingWakeTime = calcType === 'bed' || calcType === 'now'

        for (let cycles = 6; cycles >= 1; cycles--) {
            const sleepDuration = cycles * cycleLength
            const totalAdjustment = sleepDuration + fallAsleepTime

            let calculatedMinutes
            if (isCalculatingWakeTime) {
                // Calculating wake time FROM bed time
                calculatedMinutes = baseMinutes + totalAdjustment
            } else {
                // Calculating bed time FROM wake time
                calculatedMinutes = baseMinutes - totalAdjustment
            }

            // Normalize to 0-1439
            if (calculatedMinutes < 0) calculatedMinutes += 24 * 60
            if (calculatedMinutes >= 24 * 60) calculatedMinutes %= (24 * 60)

            const h = Math.floor(calculatedMinutes / 60)
            const m = calculatedMinutes % 60

            const period = h >= 12 ? 'PM' : 'AM'
            const displayHour = h % 12 === 0 ? 12 : h % 12

            results.push({
                hour: displayHour,
                minute: m,
                period,
                cycles,
                isRecommended: cycles >= 5 && cycles <= 6
            })
        }

        // Sort results: for 'wake' (bed times), we usually want latest bed time first? 
        // Or just consistant order. The loop goes 6 -> 1.
        // 6 cycles = 9 hours sleep. 
        return results
    }, [wakeTime, cycleLength, fallAsleepTime, calcType])

    const formatTime = (time) => {
        return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')} ${time.period}`
    }

    return (
        <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <Moon className="w-6 h-6 text-indigo-400" />
                <h2 className="text-2xl font-bold text-white">Sleep Cycle Calculator</h2>
            </div>

            <p className="text-slate-300 leading-relaxed">
                Use this Sleep Calculator to compute what time to go to bed or get up to wake up refreshed between sleep cycles.
                It finds the optimal schedule based on 90-minute sleep cycles.
            </p>

            {/* Calculator Controls */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Type Selector */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-300">
                        I want to...
                    </label>
                    <div className="flex flex-col gap-2">
                        <div className="flex rounded-lg overflow-hidden bg-slate-800/50 p-1 border border-slate-700">
                            <button
                                onClick={() => setCalcType('wake')}
                                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${calcType === 'wake' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                Wake Up At
                            </button>
                            <button
                                onClick={() => setCalcType('bed')}
                                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${calcType === 'bed' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                Go to Bed At
                            </button>
                        </div>
                        <button
                            onClick={handleSleepNow}
                            className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${calcType === 'now'
                                    ? 'bg-emerald-600 border-emerald-500 text-white'
                                    : 'bg-slate-800/50 border-slate-700 text-emerald-400 hover:bg-slate-700/50'
                                }`}
                        >
                            💤 Sleep Now
                        </button>
                    </div>
                </div>

                {/* Time Input */}
                {calcType !== 'now' && (
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-300">
                            {calcType === 'wake' ? 'Wake up time:' : 'Bedtime:'}
                        </label>
                        <div className="flex gap-2 items-center bg-slate-800/50 p-2 rounded-lg border border-slate-700 w-fit">
                            <select
                                value={wakeTime.hour}
                                onChange={(e) => setWakeTime({ ...wakeTime, hour: parseInt(e.target.value) })}
                                className="bg-transparent text-xl font-bold text-white focus:outline-none cursor-pointer appearance-none text-center min-w-[3rem]"
                            >
                                {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                                    <option key={h} value={h} className="bg-slate-800">{h}</option>
                                ))}
                            </select>
                            <span className="text-slate-500 font-bold">:</span>
                            <select
                                value={wakeTime.minute}
                                onChange={(e) => setWakeTime({ ...wakeTime, minute: parseInt(e.target.value) })}
                                className="bg-transparent text-xl font-bold text-white focus:outline-none cursor-pointer appearance-none text-center min-w-[3rem]"
                            >
                                {Array.from({ length: 12 }, (_, i) => i * 5).map(m => (
                                    <option key={m} value={m} className="bg-slate-800">{m.toString().padStart(2, '0')}</option>
                                ))}
                            </select>
                            <select
                                value={wakeTime.period}
                                onChange={(e) => setWakeTime({ ...wakeTime, period: e.target.value })}
                                className="bg-indigo-500/20 text-indigo-300 text-sm font-bold rounded px-2 py-1 ml-2 focus:outline-none cursor-pointer border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
                            >
                                <option value="AM" className="bg-slate-800 text-white">AM</option>
                                <option value="PM" className="bg-slate-800 text-white">PM</option>
                            </select>
                        </div>
                    </div>
                )}

            </div>

            {/* Settings */}
            <div className="border-t border-slate-700 pt-6 grid sm:grid-cols-2 gap-6">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Sleep Cycle Length</span>
                        <span className="text-indigo-400 font-medium">{cycleLength} min</span>
                    </div>
                    <input
                        type="range"
                        min="60"
                        max="120"
                        step="5"
                        value={cycleLength}
                        onChange={(e) => setCycleLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Time to Fall Asleep</span>
                        <span className="text-indigo-400 font-medium">{fallAsleepTime} min</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="60"
                        step="5"
                        value={fallAsleepTime}
                        onChange={(e) => setFallAsleepTime(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>
            </div>

            {/* Results */}
            <div className="space-y-4 pt-2">
                <h3 className="text-lg font-semibold text-white">
                    {calcType === 'wake' && `To wake up at ${formatTime(wakeTime)}, you should sleep at:`}
                    {calcType === 'bed' && `If you sleep at ${formatTime(wakeTime)}, you should wake up at:`}
                    {calcType === 'now' && `If you sleep now, you should wake up at:`}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {calculateBedTimes.map((time, idx) => (
                        <div
                            key={idx}
                            className={`rounded-lg p-3 text-center border transition-all ${time.isRecommended
                                    ? 'bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_15px_-5px_rgba(99,102,241,0.3)] transform hover:scale-105'
                                    : 'bg-slate-800/40 border-slate-700/50 text-slate-400'
                                }`}
                        >
                            <div className={`text-lg font-bold mb-1 ${time.isRecommended ? 'text-white' : 'text-slate-300'}`}>
                                {formatTime(time)}
                            </div>
                            <div className={`text-xs ${time.isRecommended ? 'text-indigo-300' : 'text-slate-500'}`}>
                                {time.cycles} Cycles
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-xs text-center text-slate-500 mt-2">
                    * Recommended: 5-6 cycles (7.5 - 9 hours)
                </div>
            </div>

        </div>
    )
}

// Sleep Length Calculator Component
function SleepLengthCalculator() {
    const [targetTime, setTargetTime] = useState({ hour: 7, minute: 0, period: 'AM' })
    const [sleepHours, setSleepHours] = useState(8)
    const [sleepMinutes, setSleepMinutes] = useState(0)
    const [calcType, setCalcType] = useState('bed') // 'wake' = wake up at X (implies we want to know bed time so logic is confusing with names). 
    // Let's simplifying:
    // Option A: "I want to wake up at [Time]" -> Tells you bed time for X hours sleep
    // Option B: "I want to go to bed at [Time]" -> Tells you wake time for X hours sleep

    const [fallAsleepTime, setFallAsleepTime] = useState(15)

    const calculateTime = useMemo(() => {
        // targetTime is the fixed point.
        // sleepDuration is duration.
        // fallAsleepTime is added to duration.

        // Convert target to minutes
        const targetMinutes = targetTime.period === 'AM'
            ? (targetTime.hour === 12 ? 0 : targetTime.hour) * 60 + targetTime.minute
            : (targetTime.hour === 12 ? 12 : targetTime.hour + 12) * 60 + targetTime.minute

        const totalSleepMinutes = sleepHours * 60 + sleepMinutes + fallAsleepTime

        let resultMinutes
        if (calcType === 'wake') {
            // "I want to wake up at..." -> Return Bed Time
            // BedTime = WakeTime - SleepDuration - FallAsleep
            resultMinutes = targetMinutes - totalSleepMinutes
        } else {
            // "I want to go to bed at..." -> Return Wake Time
            // WakeTime = BedTime + SleepDuration + FallAsleep
            resultMinutes = targetMinutes + totalSleepMinutes
        }

        // Normalize
        if (resultMinutes < 0) resultMinutes += 24 * 60
        if (resultMinutes >= 24 * 60) resultMinutes %= (24 * 60)

        const h = Math.floor(resultMinutes / 60)
        const m = resultMinutes % 60

        // adjust back to 12h
        const period = h >= 12 ? 'PM' : 'AM'
        const displayHour = h % 12 === 0 ? 12 : h % 12

        return {
            hour: displayHour,
            minute: m,
            period
        }

    }, [targetTime, sleepHours, sleepMinutes, fallAsleepTime, calcType])

    const formatTime = (time) => {
        return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')} ${time.period}`
    }

    return (
        <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-indigo-400" />
                <h2 className="text-2xl font-bold text-white">Sleep Length Calculator</h2>
            </div>

            <p className="text-slate-300 leading-relaxed">
                Plan your sleep based on specific hours. Perfect if you know exactly how much sleep you need.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Input Side */}
                <div className="space-y-5">

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">I want to...</label>
                        <div className="flex rounded-lg overflow-hidden bg-slate-800/50 p-1 border border-slate-700">
                            <button
                                onClick={() => setCalcType('wake')}
                                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${calcType === 'wake' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                Wake Up At
                            </button>
                            <button
                                onClick={() => setCalcType('bed')}
                                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${calcType === 'bed' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                Go to Bed At
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">
                            {calcType === 'wake' ? 'Target Wake Time:' : 'Target Bed Time:'}
                        </label>
                        <div className="flex gap-2 items-center bg-slate-800/50 p-2 rounded-lg border border-slate-700 w-fit">
                            <select
                                value={targetTime.hour}
                                onChange={(e) => setTargetTime({ ...targetTime, hour: parseInt(e.target.value) })}
                                className="bg-transparent text-xl font-bold text-white focus:outline-none cursor-pointer appearance-none text-center min-w-[3rem]"
                            >
                                {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                                    <option key={h} value={h} className="bg-slate-800">{h}</option>
                                ))}
                            </select>
                            <span className="text-slate-500 font-bold">:</span>
                            <select
                                value={targetTime.minute}
                                onChange={(e) => setTargetTime({ ...targetTime, minute: parseInt(e.target.value) })}
                                className="bg-transparent text-xl font-bold text-white focus:outline-none cursor-pointer appearance-none text-center min-w-[3rem]"
                            >
                                {Array.from({ length: 12 }, (_, i) => i * 5).map(m => (
                                    <option key={m} value={m} className="bg-slate-800">{m.toString().padStart(2, '0')}</option>
                                ))}
                            </select>
                            <select
                                value={targetTime.period}
                                onChange={(e) => setTargetTime({ ...targetTime, period: e.target.value })}
                                className="bg-indigo-500/20 text-indigo-300 text-sm font-bold rounded px-2 py-1 ml-2 focus:outline-none cursor-pointer border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
                            >
                                <option value="AM" className="bg-slate-800 text-white">AM</option>
                                <option value="PM" className="bg-slate-800 text-white">PM</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Desired Sleep Duration:</label>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <select
                                    value={sleepHours}
                                    onChange={(e) => setSleepHours(parseInt(e.target.value))}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    {Array.from({ length: 13 }, (_, i) => i).map(h => (
                                        <option key={h} value={h}>{h} hours</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <select
                                    value={sleepMinutes}
                                    onChange={(e) => setSleepMinutes(parseInt(e.target.value))}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    {[0, 15, 30, 45].map(m => (
                                        <option key={m} value={m}>{m} min</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Output Side */}
                <div className="flex flex-col justify-center">
                    <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl p-6 text-center shadow-lg">
                        <div className="text-sm text-indigo-200 mb-2 font-medium">
                            {calcType === 'wake' ? 'You should go to bed at:' : 'You will wake up at:'}
                        </div>

                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                            {formatTime(calculateTime)}
                        </div>

                        <div className="text-xs text-slate-400 mt-4 border-t border-indigo-500/30 pt-3">
                            Includes {fallAsleepTime} min to fall asleep
                        </div>

                        <div className="mt-4">
                            <label className="text-xs text-slate-500 block mb-1">Time to fall asleep (min)</label>
                            <input
                                type="range"
                                min="0"
                                max="60"
                                step="5"
                                value={fallAsleepTime}
                                onChange={(e) => setFallAsleepTime(parseInt(e.target.value))}
                                className="w-2/3 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function SleepCalculatorClient() {
    return (
        <div className="space-y-8">
            <SleepCycleCalculator />
            <SleepLengthCalculator />
        </div>
    )
}
