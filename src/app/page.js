'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Settings } from 'lucide-react';

const audioOptions = [
  {
    id: 'rain',
    name: 'Rain',
    description: 'Gentle raindrops creating a peaceful atmosphere',
    icon: '🌧️',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    description: 'Soothing ocean waves, as if you\'re by the seaside',
    icon: '🌊',
    color: 'from-cyan-400 to-cyan-600'
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Bird songs and rustling leaves, returning to nature',
    icon: '🌲',
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'fire',
    name: 'Campfire',
    description: 'Warm crackling fire sounds, bringing a sense of security',
    icon: '🔥',
    color: 'from-orange-400 to-orange-600'
  },
  {
    id: 'white-noise',
    name: 'White Noise',
    description: 'Pure white noise to block out external disturbances',
    icon: '⚪',
    color: 'from-gray-400 to-gray-600'
  },
  {
    id: 'cafe',
    name: 'Cafe',
    description: 'Soft background music and coffee machine sounds',
    icon: '☕',
    color: 'from-amber-400 to-amber-600'
  }
];

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedAudios, setSelectedAudios] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // 创建音频上下文和音频源
  const createAudioContext = () => {
    if (!audioRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioRef.current = new AudioContext();
    }
    return audioRef.current;
  };

  // 生成白噪音
  const generateWhiteNoise = (type) => {
    const audioContext = createAudioContext();
    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);

    switch (type) {
      case 'rain':
        // 雨声 - 随机滴答声
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 0.1 * (Math.random() > 0.99 ? 1 : 0.01);
        }
        break;
      case 'ocean':
        // 海浪声 - 低频振荡
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.sin(i * 0.01) * 0.3 + Math.random() * 0.1;
        }
        break;
      case 'forest':
        // 森林声 - 鸟鸣和树叶声
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 0.05 + (Math.random() > 0.999 ? Math.random() * 0.2 : 0);
        }
        break;
      case 'fire':
        // 篝火声 - 噼啪声
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 0.15 * (Math.random() > 0.995 ? 1 : 0.3);
        }
        break;
      case 'white-noise':
        // 纯白噪音
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() - 0.5) * 0.3;
        }
        break;
      case 'cafe':
        // 咖啡馆背景音
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 0.08 + Math.sin(i * 0.005) * 0.05;
        }
        break;
      default:
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() - 0.5) * 0.2;
        }
    }

    return buffer;
  };

  // 播放音频
  const playAudio = (audioType) => {
    if (audioRef.current && audioRef.current.state === 'suspended') {
      audioRef.current.resume();
    }

    const buffer = generateWhiteNoise(audioType);
    const source = audioRef.current.createBufferSource();
    const gainNode = audioRef.current.createGain();
    
    source.buffer = buffer;
    source.loop = true;
    
    gainNode.gain.value = isMuted ? 0 : volume;
    
    source.connect(gainNode);
    gainNode.connect(audioRef.current.destination);
    
    source.start();
    
    setCurrentAudio({ source, gainNode, type: audioType });
    setIsPlaying(true);
  };

  // 停止播放
  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.source.stop();
      setCurrentAudio(null);
      setIsPlaying(false);
    }
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
    if (currentAudio) {
      currentAudio.gainNode.gain.value = isMuted ? 0 : newVolume;
    }
  };

  // 静音切换
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (currentAudio) {
      currentAudio.gainNode.gain.value = !isMuted ? 0 : volume;
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
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Sleep Assistant
        </h1>
        <p className="text-xl text-blue-200">
          Choose your favorite white noise and enjoy peaceful sleep
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {audioOptions.map((audio) => (
          <div
            key={audio.id}
            onClick={() => selectAudio(audio.id)}
            className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedAudios.includes(audio.id)
                ? 'bg-gradient-to-br ' + audio.color + ' shadow-2xl'
                : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
            }`}
          >
            <div className="text-4xl mb-4">{audio.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{audio.name}</h3>
            <p className="text-sm text-blue-200">{audio.description}</p>
            {selectedAudios.includes(audio.id) && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
            )}
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

      <div className="text-center text-blue-200 text-sm">
        <p>💡 Tip: Select one or more audio types and click play to enjoy peaceful moments</p>
        <p className="mt-2">🎧 Headphones recommended for the best experience</p>
      </div>
    </div>
  );
}
