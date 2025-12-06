'use client';

import { useState, useEffect } from 'react';
import { useAudio } from '../app/layout';
import Link from "next/link";
import AudioGrid from './AudioGrid';
import PlayerControls from './PlayerControls';
import SectionHeader from './SectionHeader';
import NoticeCard from './NoticeCard';

// Audio Data Configuration (Base)
const baseAudioOptions = [
    {
        id: 'calming-tapping-D',
        icon: '🧘',
        color: 'from-orange-400 to-amber-600',
        file: '/mp3/App_7405513864562920704.mp3'
    },
    {
        id: 'calming-tapping-E',
        icon: '🌧️',
        color: 'from-blue-400 to-indigo-600',
        file: '/mp3/App_7471951244353981748.mp3'
    },
    {
        id: 'calming-tapping-F',
        icon: '🌊',
        color: 'from-cyan-400 to-blue-600',
        file: '/mp3/App_7394044353435487503.mp3'
    },
    {
        id: 'calming-tapping-G',
        icon: '🦗',
        color: 'from-emerald-400 to-green-600',
        file: '/mp3/App_7392927862027832616.mp3'
    },
    {
        id: 'calming-tapping-H',
        icon: '🌲',
        color: 'from-teal-400 to-emerald-600',
        file: '/mp3/App_7494998407628786959.mp3'
    },
    {
        id: 'calming-tapping-I',
        icon: '🎋',
        color: 'from-lime-400 to-green-600',
        file: '/mp3/App_7219258078217129253.mp3'
    },
    {
        id: 'calming-tapping-J',
        icon: '👆',
        color: 'from-rose-400 to-pink-600',
        file: '/mp3/App_7403335311796817187.mp3'
    },
    {
        id: 'calming-tapping-A',
        icon: '🌫️',
        color: 'from-slate-400 to-gray-600',
        file: '/mp3/App_7222221118600416568.mp3'
    },
    {
        id: 'calming-tapping-B',
        icon: '🌸',
        color: 'from-fuchsia-400 to-purple-600',
        file: '/mp3/App_7223724561374776636.mp3'
    },
    {
        id: 'calming-tapping-C',
        icon: '🟤',
        color: 'from-amber-700 to-orange-900',
        file: '/mp3/App_7392556876099013923.mp3'
    }
];

export default function SleepMain({ content }) {
    const {
        globalAudio,
        globalIsPlaying,
        playGlobalAudio,
        stopGlobalAudio,
        pauseGlobalAudio,
        resumeGlobalAudio,
        setGlobalVolume
    } = useAudio();

    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [playQueue, setPlayQueue] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [timer, setTimer] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    // Merge base audio options with localized content
    const audioOptions = baseAudioOptions.map(audio => ({
        ...audio,
        name: content.audio[audio.id]?.name || audio.id,
        description: content.audio[audio.id]?.desc || ''
    }));

    // Derive current audio object
    const getCurrentAudioInfo = () => {
        if (!globalAudio) return null;
        return audioOptions.find(option => option.file === globalAudio.file);
    };
    const currentAudioInfo = getCurrentAudioInfo();

    // Handlers
    const playAudioDirect = (audioId) => {
        const audioOption = audioOptions.find(option => option.id === audioId);
        if (audioOption) {
            playGlobalAudio(audioOption.file, volume);
        }
    };

    const addToQueue = (audioId) => {
        setPlayQueue(prev => [...prev, audioId]);
    };

    const togglePlay = () => {
        if (globalIsPlaying) {
            pauseGlobalAudio();
        } else if (globalAudio) {
            resumeGlobalAudio();
        }
    };

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
        setGlobalVolume(isMuted ? 0 : newVolume);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        setGlobalVolume(!isMuted ? 0 : volume);
    };

    // Timer Effect
    useEffect(() => {
        if (timerActive && timer > 0) {
            const interval = setInterval(() => {
                setTimer(t => {
                    if (t <= 1) {
                        stopGlobalAudio();
                        setTimerActive(false);
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timerActive, timer, stopGlobalAudio]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="container mx-auto px-4 py-8 pb-32">

            {/* Header Section */}
            <header className="text-center mb-16 pt-8 animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-200 via-white to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                    {content.hero.title}<br />
                    <span className="text-3xl md:text-5xl opacity-90">{content.hero.subtitle}</span>
                </h1>
                <p className="text-xl md:text-2xl text-indigo-200/80 max-w-2xl mx-auto font-light leading-relaxed">
                    {content.hero.description}
                    <span className="block text-lg mt-2 opacity-70">{content.hero.subDescription}</span>
                </p>
            </header>

            {/* Important Notice */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <NoticeCard icon="🌙" title={content.notices.mindful.title} type="info">
                    <p>
                        {content.notices.mindful.content}
                        <span className="block mt-2 text-indigo-300 font-medium">
                            {content.notices.mindful.warning}
                        </span>
                    </p>
                </NoticeCard>
            </div>

            {/* Usage Tips */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <NoticeCard icon="🎧" title={content.notices.tip.title} type="info">
                    {content.notices.tip.content}
                </NoticeCard>
            </div>

            {/* Audio Grid */}
            <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <SectionHeader title={content.sections.soundscapes} subtitle={true} />
                <AudioGrid
                    audioOptions={audioOptions}
                    currentAudioId={currentAudioInfo?.id}
                    playQueue={playQueue}
                    onPlay={playAudioDirect}
                    onAddToQueue={addToQueue}
                />
            </section>

            {/* Recommended Videos */}
            <section className="animate-slide-up mb-20" style={{ animationDelay: '0.4s' }}>
                <SectionHeader title={content.sections.visualCalm} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { id: 'SihqNhuuq80', title: 'Deep Sleep Music' },
                        { id: '_d3KP2Z2f84', title: 'Rain & Thunder' },
                        { id: 'UkfLncNxK08', title: 'Pure White Noise' },
                        { id: 'mA-2rErIelo', title: 'ASMR Triggers' },
                    ].map((video) => (
                        <div key={video.id} className="group relative rounded-2xl overflow-hidden bg-black/40 border border-white/5 hover:border-white/20 transition-all">
                            <div className="aspect-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-4 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 w-full">
                                <h3 className="text-lg font-medium text-white">{video.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Article Content */}
            <main className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-12 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <article className="md:w-2/3 w-full prose prose-invert prose-lg max-w-none">
                    <div className="relative w-full aspect-[21/9] mb-8 rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src="/sleep-20250918.jpg"
                            alt="Calm Night"
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
                    </div>

                    <h2 className="text-3xl font-bold text-indigo-100 mb-6">{content.sections.science}</h2>
                    <p className="text-indigo-200/80 leading-relaxed">
                        {content.article.intro}
                    </p>

                    <h3 className="text-2xl font-semibold text-indigo-100 mt-10 mb-4">{content.article.frequencyTitle}</h3>
                    <ul className="space-y-4 text-indigo-200/80 list-none pl-0">
                        <li className="flex gap-4">
                            <span className="w-2 h-2 rounded-full bg-white mt-2.5 flex-shrink-0"></span>
                            <span dangerouslySetInnerHTML={{ __html: content.article.whiteNoise }} />
                        </li>
                        <li className="flex gap-4">
                            <span className="w-2 h-2 rounded-full bg-pink-400 mt-2.5 flex-shrink-0"></span>
                            <span dangerouslySetInnerHTML={{ __html: content.article.pinkNoise }} />
                        </li>
                        <li className="flex gap-4">
                            <span className="w-2 h-2 rounded-full bg-amber-600 mt-2.5 flex-shrink-0"></span>
                            <span dangerouslySetInnerHTML={{ __html: content.article.brownNoise }} />
                        </li>
                    </ul>
                </article>

                <aside className="md:w-1/3 w-full">
                    <div className="sticky top-8 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                        <h2 className="text-xl font-bold text-indigo-300 mb-6 border-b border-white/10 pb-4">{content.sections.insights}</h2>
                        <ul className="space-y-4">
                            {[
                                { title: "4-7-8 Breathing Method", date: "Sep 09, 2025", link: "/regarding-sleep" },
                                { title: "The Architecture of Sleep", date: "Sep 16, 2025", link: "/regarding-sleep/good-sleep" }
                            ].map((article, i) => (
                                <li key={i} className="group">
                                    <Link href={article.link} className="block hover:bg-white/5 p-3 rounded-lg transition-colors">
                                        <h4 className="text-lg font-medium text-indigo-100 group-hover:text-white transition-colors">{article.title}</h4>
                                        <p className="text-sm text-indigo-400 mt-1">{article.date}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <h3 className="text-sm font-bold text-indigo-300 mb-4 uppercase tracking-wider">Languages</h3>
                            <div className="flex flex-wrap gap-2">
                                <Link href="/" className="px-3 py-1 rounded bg-white/10 text-xs hover:bg-indigo-500 hover:text-white transition-colors">English</Link>
                                <Link href="/ja" className="px-3 py-1 rounded bg-white/10 text-xs hover:bg-indigo-500 hover:text-white transition-colors">日本語</Link>
                                <Link href="/ko" className="px-3 py-1 rounded bg-white/10 text-xs hover:bg-indigo-500 hover:text-white transition-colors">한국어</Link>
                                <Link href="/fr" className="px-3 py-1 rounded bg-white/10 text-xs hover:bg-indigo-500 hover:text-white transition-colors">Français</Link>
                                <Link href="/es" className="px-3 py-1 rounded bg-white/10 text-xs hover:bg-indigo-500 hover:text-white transition-colors">Español</Link>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Global Player Controls */}
            <PlayerControls
                isPlaying={globalIsPlaying}
                currentAudio={currentAudioInfo}
                volume={volume}
                isMuted={isMuted}
                showSettings={showSettings}
                timer={timer}
                timerActive={timerActive}
                onTogglePlay={togglePlay}
                onToggleMute={toggleMute}
                onVolumeChange={handleVolumeChange}
                onToggleSettings={() => setShowSettings(!showSettings)}
                onSetTimer={(time) => {
                    setTimer(time);
                    setTimerActive(true);
                }}
                onResetTimer={() => {
                    setTimer(0);
                    setTimerActive(false);
                }}
                formatTime={formatTime}
            />
        </div>
    );
}
