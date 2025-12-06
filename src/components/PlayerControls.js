import { Play, Pause, Volume2, VolumeX, Settings, RotateCcw } from 'lucide-react';

export default function PlayerControls({
    isPlaying,
    currentAudio,
    volume,
    isMuted,
    showSettings,
    timer,
    timerActive,
    onTogglePlay,
    onToggleMute,
    onVolumeChange,
    onToggleSettings,
    onSetTimer,
    onResetTimer,
    formatTime
}) {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none">
            <div className="max-w-4xl mx-auto pointer-events-auto">
                <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-indigo-900/20 max-w-full">
                    {/* Main Controls Row */}
                    <div className="flex items-center justify-between gap-4">

                        {/* Left: Info */}
                        <div className="hidden md:flex items-center gap-4 w-1/3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${currentAudio ? currentAudio.color : 'from-gray-700 to-gray-800'}`}>
                                {currentAudio ? currentAudio.icon : '🎵'}
                            </div>
                            <div className="overflow-hidden">
                                <h4 className="font-semibold text-white truncate">
                                    {currentAudio ? currentAudio.name : 'Select a sound'}
                                </h4>
                                <p className="text-xs text-white/50 truncate">
                                    {currentAudio ? 'Playing now' : 'Welcome to better sleep'}
                                </p>
                            </div>
                        </div>

                        {/* Center: Play Controls */}
                        <div className="flex items-center justify-center gap-6 flex-1">
                            <button
                                onClick={onTogglePlay}
                                disabled={!currentAudio && !isPlaying}
                                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${isPlaying
                                        ? 'bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/40 text-white'
                                        : 'bg-white text-indigo-900 hover:bg-white/90'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                            </button>
                        </div>

                        {/* Right: Volume & Settings */}
                        <div className="flex items-center justify-end gap-3 w-1/3">
                            {/* Volume Slider - Hidden on mobile, shown on hover/focus could be better but sticking to simple for now */}
                            <div className="hidden md:flex items-center gap-2 group bg-white/5 rounded-full px-3 py-1.5 hover:bg-white/10 transition-colors">
                                <button onClick={onToggleMute} className="text-white/70 hover:text-white">
                                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                                    className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer hover:bg-white/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                                />
                            </div>

                            <button
                                onClick={onToggleSettings}
                                className={`p-3 rounded-full transition-colors ${showSettings ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
                            >
                                <Settings size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Extended Settings Panel */}
                    {showSettings && (
                        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 animate-in slide-in-from-bottom-2 fade-in duration-200">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">Sleep Timer</span>
                                <div className="flex bg-white/5 rounded-lg p-1">
                                    {[15, 30, 45, 60].map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => onSetTimer(m * 60)}
                                            className="px-3 py-1 rounded-md text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
                                        >
                                            {m}m
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {timer > 0 && (
                                <div className="flex items-center gap-3 bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/30">
                                    <span className="text-sm font-mono text-indigo-200">{formatTime(timer)}</span>
                                    <button onClick={onResetTimer} className="text-indigo-300 hover:text-white">
                                        <RotateCcw size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
