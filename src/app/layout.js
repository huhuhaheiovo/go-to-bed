'use client';

import { createContext, useContext, useState, useRef, useCallback } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './globals.css';
import Script from "next/script";

// 创建全局音频上下文
const AudioContext = createContext();

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

export default function RootLayout({ children }) {
  const [globalAudio, setGlobalAudio] = useState(null);
  const [globalIsPlaying, setGlobalIsPlaying] = useState(false);
  const globalAudioRef = useRef(null);

  // 全局停止音频函数
  const stopGlobalAudio = useCallback(() => {
    if (globalAudioRef.current) {
      globalAudioRef.current.pause();
      globalAudioRef.current.currentTime = 0;
      globalAudioRef.current = null;
    }
    setGlobalAudio(null);
    setGlobalIsPlaying(false);
  }, []);

  // 全局播放音频函数
  const playGlobalAudio = useCallback((audioFile, volume = 0.5) => {
    // 先停止当前播放的音频
    stopGlobalAudio();

    const audio = new Audio(audioFile);
    audio.loop = true;
    audio.volume = volume;

    audio.play().then(() => {
      globalAudioRef.current = audio;
      setGlobalAudio({ file: audioFile, volume });
      setGlobalIsPlaying(true);
    }).catch(error => {
      console.error('Error playing global audio:', error);
    });
  }, [stopGlobalAudio]);

  // 全局暂停音频函数
  const pauseGlobalAudio = useCallback(() => {
    if (globalAudioRef.current) {
      globalAudioRef.current.pause();
      setGlobalIsPlaying(false);
    }
  }, []);

  // 全局恢复播放函数
  const resumeGlobalAudio = useCallback(() => {
    if (globalAudioRef.current && globalAudio) {
      globalAudioRef.current.play();
      setGlobalIsPlaying(true);
    }
  }, [globalAudio]);

  // 全局音量控制
  const setGlobalVolume = useCallback((volume) => {
    if (globalAudioRef.current) {
      globalAudioRef.current.volume = volume;
    }
  }, []);

  const audioContextValue = {
    globalAudio,
    globalIsPlaying,
    playGlobalAudio,
    stopGlobalAudio,
    pauseGlobalAudio,
    resumeGlobalAudio,
    setGlobalVolume
  };

  return (
    <html lang="en">
    <head>
      <title>Sleep Assistant. Relieve sleep. White Noise.Sleep Sounds.ASMR</title>
      <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NQW1FR7BEZ"
          strategy="afterInteractive"
      />
      <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2409588554709380"
          crossOrigin="anonymous"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NQW1FR7BEZ');
          `}
      </Script>
    </head>
      <body className="min-h-screen text-white" style={{ background: 'linear-gradient(180deg, #021228 55.35%, #EC887D 156.3%)' }}>
        <AudioContext.Provider value={audioContextValue}>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AudioContext.Provider>
      </body>
    </html>
  );
}
