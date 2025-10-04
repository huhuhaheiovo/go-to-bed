'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Settings } from 'lucide-react';
import { useAudio } from '../layout';
import Link from "next/link";

const asmrOptions = [
  {
    id: 'asmr-p1',
    name: 'ASMR P1',
    description: 'Relaxing ASMR sounds for deep relaxation',
    icon: '💕',
    color: 'from-pink-400 to-pink-600',
    file: '/mp3/asmr/asmr-p1.MP3'
  },
  {
    id: 'asmr-p2',
    name: 'ASMR P2',
    description: 'Soothing ASMR triggers for peaceful sleep',
    icon: '💕',
    color: 'from-purple-400 to-purple-600',
    file: '/mp3/asmr/asmr-p2.MP3'
  },
  {
    id: 'asmr-p3',
    name: 'ASMR P3',
    description: 'Gentle ASMR sounds for stress relief',
    icon: '💕',
    color: 'from-indigo-400 to-indigo-600',
    file: '/mp3/asmr/asmr-p3.MP3'
  },
  {
    id: 'asmr-p4',
    name: 'ASMR P4',
    description: 'Calming ASMR for meditation and sleep',
    icon: '💕',
    color: 'from-blue-400 to-blue-600',
    file: '/mp3/asmr/asmr-p4.MP3'
  },
  {
    id: 'asmr-p5',
    name: 'ASMR P5',
    description: 'Tranquil ASMR for ultimate relaxation',
    icon: '💕',
    color: 'from-teal-400 to-teal-600',
    file: '/mp3/asmr/asmr-p5.MP3'
  }
];

export default function ASMRPage() {
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
  const [selectedAudios, setSelectedAudios] = useState([]);
  const [playQueue, setPlayQueue] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isQueueMode, setIsQueueMode] = useState(false);

  // 获取当前播放的音频信息
  const getCurrentAudioInfo = () => {
    if (!globalAudio) return null;
    return asmrOptions.find(option => option.file === globalAudio.file);
  };

  // 直接播放音频（左键点击）
  const playAudioDirect = (audioType) => {
    console.log('Playing audio:', audioType);
    setIsQueueMode(false);
    const audioOption = asmrOptions.find(option => option.id === audioType);
    if (audioOption) {
      playGlobalAudio(audioOption.file, 0.5);
    }
  };

  // 添加到播放队列（右键点击）
  const addToQueue = (audioType) => {
    setPlayQueue(prev => [...prev, audioType]);
  };

  // 切换播放状态
  const togglePlay = () => {
    if (globalIsPlaying) {
      pauseGlobalAudio();
    } else if (globalAudio) {
      resumeGlobalAudio();
    }
  };

  // 停止播放
  const stopAudio = useCallback(() => {
    stopGlobalAudio();
    setIsQueueMode(false);
  }, [stopGlobalAudio]);

  // 音量控制
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setGlobalVolume(isMuted ? 0 : newVolume);
  };

  // 静音切换
  const toggleMute = () => {
    setIsMuted(!isMuted);
    setGlobalVolume(!isMuted ? 0 : volume);
  };

  // 定时器功能
  useEffect(() => {
    if (timerActive && timer > 0) {
      const timerRef = setTimeout(() => {
        setTimer(timer - 1);
        if (timer - 1 === 0) {
          stopAudio();
          setTimerActive(false);
        }
      }, 1000);
      return () => clearTimeout(timerRef);
    }
  }, [timer, timerActive, stopAudio]);

  // 格式化时间
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentAudioInfo = getCurrentAudioInfo();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          ASMR Sounds——Best noise for sleep: 10 relaxing sounds to help you fall asleep faster
        </h1>
        <p className="text-xl text-blue-200">
          Autonomous Sensory Meridian Response for deep relaxation
        </p>
      </header>

      {/* Usage Tips */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
        <div className="text-center text-blue-200 text-sm">
          <p>💡 Tip: Left-click cards to play directly (50% volume), right-click to add to playback queue</p>
          <p className="mt-2">🎧 For best experience: wear headphones or place your phone horizontally near your pillow</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {asmrOptions.map((audio) => (
          <div
            key={audio.id}
            onClick={(e) => {
              e.preventDefault();
              playAudioDirect(audio.id);
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              addToQueue(audio.id);
            }}
            className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm hover:bg-white/20 ${
              currentAudioInfo && currentAudioInfo.id === audio.id
                ? 'border-2 border-[#041e43] shadow-lg shadow-[#041e43]/20'
                : 'border-2 border-transparent'
            }`}
            style={{
              background: playQueue.includes(audio.id) && (!currentAudioInfo || currentAudioInfo.id !== audio.id)
                ? 'linear-gradient(180deg, #021228 55.35%, #EC887D 156.3%)'
                : undefined,
              border: playQueue.includes(audio.id) && (!currentAudioInfo || currentAudioInfo.id !== audio.id)
                ? '2px solid transparent'
                : undefined,
              backgroundClip: playQueue.includes(audio.id) && (!currentAudioInfo || currentAudioInfo.id !== audio.id)
                ? 'padding-box'
                : undefined
            }}
          >
            <div className="text-4xl mb-4">{audio.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{audio.name}</h3>
            <p className="text-sm text-blue-200">{audio.description}</p>
            {currentAudioInfo && currentAudioInfo.id === audio.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-[#041e43] rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
            {!currentAudioInfo || currentAudioInfo.id !== audio.id ? (
              playQueue.includes(audio.id) && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{playQueue.indexOf(audio.id) + 1}</span>
                </div>
              )
            ) : null}
          </div>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              disabled={!globalIsPlaying && !globalAudio}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                globalIsPlaying
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              } ${!globalIsPlaying && !globalAudio ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {globalIsPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <div className="text-center">
              <p className="text-sm text-blue-200">Currently Playing</p>
              <p className="font-semibold">
                {currentAudioInfo ? currentAudioInfo.name : 'None Selected'}
              </p>
              {isQueueMode && (
                <p className="text-xs text-blue-300">Queue Mode Active</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <div className="flex items-center gap-2 min-w-[120px]">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm min-w-[40px]">{Math.round(volume * 100)}%</span>
            </div>
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>

        {showSettings && (
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center gap-4">
              <span className="text-sm text-blue-200">Auto Stop:</span>
              <div className="flex gap-2">
                {[15, 30, 60, 90].map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => {
                      setTimer(minutes * 60);
                      setTimerActive(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm"
                  >
                    {minutes} min
                  </button>
                ))}
              </div>
              {timer > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-200">Time Remaining:</span>
                  <span className="font-mono text-lg">{formatTime(timer)}</span>
                  <button
                    onClick={() => {
                      setTimer(0);
                      setTimerActive(false);
                    }}
                    className="p-1 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Playback Queue */}
      {playQueue.length > 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Playback Queue ({playQueue.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {playQueue.map((audioId, index) => {
              const audio = asmrOptions.find(a => a.id === audioId);
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-blue-200">#{index + 1}</span>
                    <span className="font-medium">{audio?.name}</span>
                  </div>
                  <button
                    onClick={() => setPlayQueue(prev => prev.filter((_, i) => i !== index))}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center space-x-4">
            <button
              onClick={() => {
                if (playQueue.length > 0) {
                  const firstAudio = asmrOptions.find(a => a.id === playQueue[0]);
                  if (firstAudio) {
                    playGlobalAudio(firstAudio.file, volume);
                    setPlayQueue(prev => prev.slice(1));
                  }
                }
              }}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm transition-colors"
            >
              Start Queue Playback
            </button>
            <button
              onClick={() => setPlayQueue([])}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm transition-colors"
            >
              Clear Queue
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-6 ">
        {/* 左边：文章内容 */}
        <div className="md:w-2/3 w-full">
          {/* 横幅图 */}
          <div className="relative w-full aspect-[16/9]">
            <img
                src="/sleep-20250918.jpg"
                alt="Baby Shower Banner"
                className="object-cover rounded-lg shadow w-full h-full"
                width={800}
                height={450}
            />
          </div>
          <div className="max-w-3xl mx-auto px-6 py-12  leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              The Link Between Sound and Quality Sleep
            </h2>

            <p className="mb-6">
              Our hearing plays a crucial role in shaping how we feel, how we interpret our environment, and how relaxed we become. As you drift toward sleep, even a minor disturbance—a slamming car door, the creak of a gate, or the sudden spray of sprinklers—can snap you back to wakefulness.
            </p>

            <p className="mb-6">
              Sounds that carry negative associations tend to disrupt both the process of falling asleep and the ability to remain asleep through the night.
            </p>

            <p className="mb-6">
              On the other hand, soothing sounds can support better sleep and even deepen it. For many people, the soft rustle of leaves in the wind or the gentle patter of rain against glass brings a sense of calm. Others find that sound patterns such as white noise, pink noise, or immersive nature tracks influence brain waves in ways that encourage relaxation.
            </p>

            <p className="mb-6">
              By choosing the right sound environment, you can turn your bedroom into a true haven for rest. Imagine lying in a room that feels like a tranquil beach, where waves roll softly onto the shore, or a peaceful forest alive with quiet nocturnal melodies. These soundscapes don&apos;t just please the ear—they serve as a steady rhythm, guiding the mind away from stress and inviting the body into restorative sleep.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">Why Calming Sounds Improve Sleep</h2>
            <p className="mb-6">
              Calming sounds do more than help you relax—they can actually train your brain to connect certain sounds with bedtime, making it easier to fall asleep consistently. Research shows that steady-frequency sounds—often referred to as the best noise for sleep, such as white noise or pink noise—not only reduce the number of night-time awakenings but also promote better sleep quality overall.
            </p>

            <p className="mb-6">
              Here are five major benefits of using soothing sounds as a natural sleep aid:
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">Sounds act as a bedtime signal</h3>
            <p className="mb-6">
              Just as darkness tells your body it&apos;s time to sleep, introducing a specific nighttime sound can serve as a powerful cue. Over time, your brain begins to associate that sound with rest, making it easier to unwind at night.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">Sounds calm brain activity</h3>
            <p className="mb-6">
              Relaxing audio—such as meditation music, binaural beats, or soft ambient soundscapes—can slow brain activity. This gentle mental shift helps prepare both mind and body for deep, restorative sleep.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">Sounds encourage deeper, longer rest</h3>
            <p className="mb-6">
              Studies indicate that consistent, gentle background noise helps people fall asleep faster and stay asleep longer. Many experts consider white noise and pink noise among the best noises for sleep because they create a stable sound environment that encourages quality rest.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">Sounds mask disruptive noises</h3>
            <p className="mb-6">
              Whether it&apos;s city traffic, a neighbor&apos;s television, or a restless pet, external noise can interfere with sleep. Sleep sounds provide a steady sonic backdrop, helping to mask these disturbances and creating a calmer, more sleep-friendly atmosphere.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">Sounds support people with insomnia and anxiety</h3>
            <p className="mb-6">
              For those struggling with insomnia or anxiety, calming audio can be particularly helpful. The soothing rhythms and frequencies help quiet racing thoughts, making it easier to drift off into peaceful sleep.
            </p>

            <p className="mb-6">
              By weaving calming sounds—especially the best noise for sleep options like white noise, pink noise, or nature soundscapes—into your nightly routine, you can transform your bedroom into a restful sanctuary that supports deeper, more consistent sleep.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">FAQ: Which Noise Is Best for Sleep?</h2>
            <p className="mb-6">
              When it comes to choosing the best noise for sleep, it often depends on your personal preference and sensitivity to sound. However, research suggests that certain sound types are particularly effective:
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">White Noise</h3>
            <p className="mb-6">
              A consistent &quot;shhh&quot; sound that masks disruptive background noises like traffic or conversations.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">Pink Noise</h3>
            <p className="mb-6">
              Softer and more balanced than white noise, often compared to falling rain or rustling leaves. It&apos;s believed to improve deep sleep stages.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">Brown Noise</h3>
            <p className="mb-6">
              A deeper sound resembling strong wind or distant thunder, often preferred by people who like low-frequency tones.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3">Nature Sounds</h3>
            <p className="mb-6">
              Gentle rain, ocean waves, or forest ambiance can create a calming, natural sleep environment.
            </p>

            <p className="mb-6">
              Ultimately, the best noise for sleep is the one that makes you feel calm, reduces disturbances, and helps you fall asleep faster. Many people experiment with different sleep sounds until they find the one that works best for them.
            </p>
          </div>

        </div>
        {/* 右边：侧栏 */}
        <aside className="md:w-1/3 w-full border-l pl-6">
          <h2 className="text-3xl font-bold text-[#5799f9] mb-4">More content </h2>
          <ul className="space-y-4">
            <li className="border-b-2 py-3 border-b-blue-900">
              <Link href="/regarding-sleep"
                    className="text-xl  font-semibold hover:underline    hover:text-blue-300">4-7-8 Method for Rapidly Falling Asleep Through Breathing</Link>
              <p>September 09, 2025</p>
            </li>
            <li className="border-b-2 py-3 border-b-blue-900">
              <Link href="/regarding-sleep/good-sleep" className="text-xl  font-semibold hover:underline    hover:text-blue-300"> Why Good Sleep Matters and How to Get It</Link>
              <p>September 16, 2025</p>
            </li>

          </ul>
        </aside>
      </main>
    </div>
  );
}
