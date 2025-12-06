import AudioCard from './AudioCard';

export default function AudioGrid({
    audioOptions,
    currentAudioId,
    playQueue,
    onPlay,
    onAddToQueue
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {audioOptions.map((audio) => (
                <AudioCard
                    key={audio.id}
                    audio={audio}
                    isPlaying={currentAudioId === audio.id}
                    isQueued={playQueue.includes(audio.id) && currentAudioId !== audio.id}
                    queueIndex={playQueue.indexOf(audio.id)}
                    onPlay={onPlay}
                    onAddToQueue={onAddToQueue}
                />
            ))}
        </div>
    );
}
