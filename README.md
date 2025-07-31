# Sleep Assistant

A modern sleep audio player website that provides various white noise and natural sounds to help users achieve better sleep quality.

## 🌟 Features

### 🎵 Audio Types
- **Rain** - Gentle raindrops creating a peaceful atmosphere
- **Ocean Waves** - Soothing ocean waves, as if you're by the seaside
- **Forest** - Bird songs and rustling leaves, returning to nature
- **Campfire** - Warm crackling fire sounds, bringing a sense of security
- **White Noise** - Pure white noise to block out external disturbances
- **Cafe** - Soft background music and coffee machine sounds

### 🎛️ Playback Controls
- **Play/Pause** - One-click audio control
- **Volume Control** - Precise volume adjustment slider
- **Mute Function** - Quick mute/unmute toggle
- **Loop Playback** - Automatic audio looping

### ⏰ Timer Features
- **Auto Stop** - Support for 15, 30, 60, 90 minute timers
- **Countdown Display** - Real-time remaining playback time
- **Auto Stop** - Automatically stops playback when timer expires

### 🎨 Interface Design
- **Modern UI** - Gradient backgrounds and glassmorphism effects
- **Responsive Design** - Perfect adaptation for various devices
- **Intuitive Operation** - Clean and clear user interface
- **Visual Feedback** - Rich animations and interactive effects

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 🛠️ Tech Stack

- **Next.js 15** - React framework
- **React 19** - User interface library
- **Tailwind CSS** - Styling framework
- **Web Audio API** - Audio processing
- **Lucide React** - Icon library

## 📱 How to Use

1. **Select Audio** - Click on your preferred audio type cards
2. **Start Playing** - Click the play button to begin enjoying
3. **Adjust Volume** - Use the slider to adjust volume level
4. **Set Timer** - Click settings button to set auto stop timer
5. **Mute Control** - Click mute button for quick silence

## 🎧 Usage Tips

- **Use Headphones** - Recommended for the best audio experience
- **Appropriate Volume** - Adjust volume to a comfortable level
- **Timer Function** - Use timer function to avoid playing all night
- **Environment** - Use in combination with a comfortable sleep environment

## 🔧 Development Notes

### Project Structure
```
sleep-assistant/
├── src/
│   └── app/
│       ├── page.js          # Main page component
│       ├── layout.js        # Layout component
│       └── globals.css      # Global styles
├── public/                  # Static resources
└── package.json            # Project configuration
```

### Audio Generation
The project uses Web Audio API to dynamically generate various white noise:
- Rain: Random droplet simulation
- Ocean Waves: Low-frequency oscillation waveform
- Forest: Bird songs and leaf rustling mix
- Campfire: Crackling sound effects
- White Noise: Pure random noise
- Cafe: Background music simulation

### Custom Audio
To add new audio types, you can add new configurations to the `audioOptions` array and add corresponding audio generation logic in the `generateWhiteNoise` function.

## 📄 License

MIT License

## 🤝 Contributing

Welcome to submit Issues and Pull Requests to improve this project!

---

Enjoy peaceful sleep! 🌙✨
