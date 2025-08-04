'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Settings } from 'lucide-react';
import { useAudio } from '../layout';

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
          ASMR Sounds
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
    </div>
  );
}
