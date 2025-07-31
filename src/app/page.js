'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Settings } from 'lucide-react';

const audioOptions = [
  {
    id: 'calming-tapping-A',
    name: 'Calming tapping-A',
    description: 'Gentle tapping sounds for relaxation',
    icon: '🎵',
    color: 'from-blue-400 to-blue-600',
    file: '/mp3/App_7222221118600416568.mp3'
  },
  {
    id: 'calming-tapping-B',
    name: 'Calming tapping-B',
    description: 'Soothing tapping rhythms for peaceful sleep',
    icon: '🎵',
    color: 'from-cyan-400 to-cyan-600',
    file: '/mp3/App_7223724561374776636.mp3'
  },
  {
    id: 'calming-tapping-C',
    name: 'Calming tapping-C',
    description: 'Relaxing ambient sounds for deep sleep',
    icon: '🎵',
    color: 'from-green-400 to-green-600',
    file: '/mp3/App_7392556876099013923.mp3'
  },
  {
    id: 'calming-tapping-D',
    name: 'Calming tapping-D',
    description: 'Peaceful sounds to calm your mind',
    icon: '🎵',
    color: 'from-orange-400 to-orange-600',
    file: '/mp3/App_7405513864562920704.mp3'
  },
  {
    id: 'calming-tapping-E',
    name: 'Calming tapping-E',
    description: 'Tranquil audio for meditation and sleep',
    icon: '🎵',
    color: 'from-purple-400 to-purple-600',
    file: '/mp3/App_7471951244353981748.mp3'
  },
  {
    id: 'calming-tapping-F',
    name: 'Calming tapping-F',
    description: 'Serene sounds for ultimate relaxation',
    icon: '🎵',
    color: 'from-pink-400 to-pink-600',
    file: '/mp3/App_7394044353435487503.mp3'
  },
  {
    id: 'calming-tapping-G',
    name: 'Calming tapping-G',
    description: 'Harmonious tones for peaceful rest',
    icon: '🎵',
    color: 'from-indigo-400 to-indigo-600',
    file: '/mp3/App_7392927862027832616.mp3'
  },
  {
    id: 'calming-tapping-H',
    name: 'Calming tapping-H',
    description: 'Gentle melodies for deep relaxation',
    icon: '🎵',
    color: 'from-teal-400 to-teal-600',
    file: '/mp3/App_7494998407628786959.mp3'
  },
  {
    id: 'calming-tapping-I',
    name: 'Calming tapping-I',
    description: 'Soothing rhythms for peaceful sleep',
    icon: '🎵',
    color: 'from-emerald-400 to-emerald-600',
    file: '/mp3/App_7219258078217129253.mp3'
  },
  {
    id: 'calming-tapping-J',
    name: 'Calming tapping-J',
    description: 'Tranquil sounds for meditation',
    icon: '🎵',
    color: 'from-rose-400 to-rose-600',
    file: '/mp3/App_7403335311796817187.mp3'
  }
];

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedAudios, setSelectedAudios] = useState([]);
  const [playQueue, setPlayQueue] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isQueueMode, setIsQueueMode] = useState(false);

  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // 停止所有音频
  const stopAllAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setCurrentAudio(null);
    setIsPlaying(false);
  };

  // 创建音频元素
  const createAudioElement = (audioType) => {
    console.log('Creating audio element for:', audioType);
    const audioOption = audioOptions.find(option => option.id === audioType);
    if (!audioOption) {
      console.error('Audio option not found for:', audioType);
      console.log('Available options:', audioOptions.map(opt => opt.id));
      return null;
    }

    console.log('Found audio option:', audioOption);
    const audio = new Audio(audioOption.file);
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;

    // 添加音频结束事件监听器（用于队列播放）
    audio.addEventListener('ended', () => {
      if (isQueueMode && playQueue.length > 0) {
        playNextInQueue();
      }
    });

    return audio;
  };

  // 播放音频
  const playAudio = (audioType, customVolume = null) => {
    // 先停止当前播放的音频
    stopAllAudio();

    const audio = createAudioElement(audioType);
    if (!audio) {
      console.error('Failed to create audio element for:', audioType);
      return;
    }

    // 如果指定了自定义音量，使用它
    if (customVolume !== null) {
      audio.volume = customVolume;
    }

    console.log('Attempting to play:', audioType, 'at volume:', customVolume || volume);

    audio.play().then(() => {
      console.log('Successfully started playing:', audioType);
      audioRef.current = audio;
      setCurrentAudio({ audio, type: audioType });
      setIsPlaying(true);
    }).catch(error => {
      console.error('Error playing audio:', error);
    });
  };

  // 播放队列中的下一首
  const playNextInQueue = () => {
    if (playQueue.length > 0) {
      const nextAudio = playQueue[0];
      setPlayQueue(prev => prev.slice(1));
      playAudio(nextAudio, volume);
    } else {
      setIsQueueMode(false);
    }
  };

  // 直接播放音频（左键点击）
  const playAudioDirect = (audioType) => {
    console.log('Playing audio:', audioType);
    setIsQueueMode(false);
    // 以50%音量播放
    playAudio(audioType, 0.5);
  };

  // 添加到播放队列（右键点击）
  const addToQueue = (audioType) => {
    setPlayQueue(prev => [...prev, audioType]);
  };

  // 开始队列播放
  const startQueuePlayback = () => {
    if (playQueue.length > 0) {
      setIsQueueMode(true);
      playNextInQueue();
    }
  };

  // 停止播放
  const stopAudio = () => {
    stopAllAudio();
    setIsQueueMode(false);
  };

  // 切换播放状态
  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else if (selectedAudios.length > 0) {
      playAudio(selectedAudios[0]);
    }
  };

  // 选择音频
  const selectAudio = (audioId) => {
    if (selectedAudios.includes(audioId)) {
      setSelectedAudios(selectedAudios.filter(id => id !== audioId));
    } else {
      setSelectedAudios([...selectedAudios, audioId]);
    }
  };

  // 音量控制
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  // 静音切换
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  // 定时器功能
  useEffect(() => {
    if (timerActive && timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer(timer - 1);
        if (timer - 1 === 0) {
          stopAudio();
          setTimerActive(false);
        }
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timer, timerActive]);

  // 格式化时间
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Important Notice */}
      <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-2 border-amber-400/50 rounded-2xl p-6 mb-8 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="text-2xl">💕</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-amber-300 mb-3">Important Notice</h3>
            <div className="text-sm text-blue-200 space-y-2">
              <p>
                Research has shown that rhythmic tapping on objects such as coconut shells, pinecones, and glass bottles can help relieve nervous system tension.
              </p>
              <p className="font-semibold text-red-300">
                ⚠️ However, please note: These sounds are not suitable for everyone. If you experience increased anxiety or accelerated heart rate after listening, please leave and close this page immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Sleep Assistant
        </h1>
        <p className="text-xl text-blue-200">
         Calming tapping sounds for stress relief
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
        {audioOptions.map((audio) => (
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
              currentAudio && currentAudio.type === audio.id
                ? 'border-2 border-[#041e43] shadow-lg shadow-[#041e43]/20'
                : 'border-2 border-transparent'
            }`}
            style={{
              background: playQueue.includes(audio.id) && (!currentAudio || currentAudio.type !== audio.id)
                ? 'linear-gradient(180deg, #021228 55.35%, #EC887D 156.3%)'
                : undefined,
              border: playQueue.includes(audio.id) && (!currentAudio || currentAudio.type !== audio.id)
                ? '2px solid transparent'
                : undefined,
              backgroundClip: playQueue.includes(audio.id) && (!currentAudio || currentAudio.type !== audio.id)
                ? 'padding-box'
                : undefined
            }}
          >
            <div className="text-4xl mb-4">{audio.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{audio.name}</h3>
            <p className="text-sm text-blue-200">{audio.description}</p>
            {currentAudio && currentAudio.type === audio.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-[#041e43] rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
            {!currentAudio || currentAudio.type !== audio.id ? (
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
              disabled={selectedAudios.length === 0}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                isPlaying
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              } ${selectedAudios.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <div className="text-center">
              <p className="text-sm text-blue-200">Currently Playing</p>
              <p className="font-semibold">
                {currentAudio ? audioOptions.find(a => a.id === currentAudio.type)?.name : 'None Selected'}
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
              const audio = audioOptions.find(a => a.id === audioId);
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
              onClick={startQueuePlayback}
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
