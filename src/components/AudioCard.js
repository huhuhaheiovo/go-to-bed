import { Play, Pause } from 'lucide-react';

export default function AudioCard({
    audio,
    isPlaying,
    isQueued,
    queueIndex,
    onPlay,
    onAddToQueue
}) {
    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                onPlay(audio.id);
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                onAddToQueue(audio.id);
            }}
            className={`relative group p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/5 hover:border-white/20 overflow-hidden ${isPlaying
                    ? 'ring-2 ring-indigo-400 shadow-lg shadow-indigo-500/20'
                    : ''
                }`}
        >
            {/* Background Gradient Effect on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${audio.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            {/* Content */}
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl filter drop-shadow-lg">{audio.icon}</div>
                    {isPlaying && (
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center backdrop-blur-sm">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" />
                        </div>
                    )}
                    {isQueued && !isPlaying && (
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center justify-center text-xs font-bold backdrop-blur-sm">
                            {queueIndex + 1}
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-semibold mb-2 text-white/90 group-hover:text-white transition-colors">
                    {audio.name}
                </h3>
                <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors line-clamp-2">
                    {audio.description}
                </p>
            </div>

            {/* Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 pointer-events-none">
                {/* Visual cue only */}
            </div>
        </div>
    );
}
