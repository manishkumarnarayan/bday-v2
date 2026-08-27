import bgAudioSrc from '../assets/bgaudio.mp3';

class SoundFX {
  constructor() {
    this.ctx = null;
    this.bgAudio = null;
    this.bgmPlaying = false;
    this.muted = false;
    this.audioLoaded = false;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener({
        isPlaying: this.bgmPlaying,
        isMuted: this.muted,
        isLoaded: this.audioLoaded
      });
    }
  }

  initAudioContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  preloadAudio(onProgress) {
    return new Promise((resolve) => {
      // If already loaded
      if (this.audioLoaded && this.bgAudio) {
        if (onProgress) onProgress(100);
        resolve(true);
        return;
      }

      this.bgAudio = new Audio();
      this.bgAudio.loop = true;
      this.bgAudio.volume = 0.7;
      this.bgAudio.preload = 'auto';

      // Load using XMLHttpRequest for accurate download progress
      const xhr = new XMLHttpRequest();
      xhr.open('GET', bgAudioSrc, true);
      xhr.responseType = 'blob';

      xhr.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.min(99, Math.round((event.loaded / event.total) * 100));
          onProgress(percent);
        } else if (onProgress) {
          // Fallback approximate progress
          onProgress(75);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 0) {
          const blob = xhr.response;
          const blobUrl = URL.createObjectURL(blob);
          this.bgAudio.src = blobUrl;
          this.audioLoaded = true;

          // Ensure audio can play
          const onCanPlay = () => {
            this.bgAudio.removeEventListener('canplaythrough', onCanPlay);
            if (onProgress) onProgress(100);
            this.notify();
            resolve(true);
          };

          this.bgAudio.addEventListener('canplaythrough', onCanPlay);
          this.bgAudio.load();

          // Safety timeout in case canplaythrough event delay
          setTimeout(() => {
            if (onProgress) onProgress(100);
            this.notify();
            resolve(true);
          }, 400);
        } else {
          // Fallback to direct src
          this.bgAudio.src = bgAudioSrc;
          this.audioLoaded = true;
          if (onProgress) onProgress(100);
          this.notify();
          resolve(true);
        }
      };

      xhr.onerror = () => {
        // Fallback directly
        this.bgAudio.src = bgAudioSrc;
        this.audioLoaded = true;
        if (onProgress) onProgress(100);
        this.notify();
        resolve(true);
      };

      xhr.send();
    });
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.bgAudio) {
      this.bgAudio.muted = this.muted;
    }
    this.notify();
    return this.muted;
  }

  playClick() {
    if (this.muted) return;
    this.initAudioContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      console.warn(e);
    }
  }

  playPop() {
    if (this.muted) return;
    this.initAudioContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.04);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {
      console.warn(e);
    }
  }

  playSparkle() {
    if (this.muted) return;
    this.initAudioContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + 0.35);
        } catch (e) {
          console.warn(e);
        }
      }, idx * 60);
    });
  }

  playFanfare() {
    if (this.muted) return;
    this.initAudioContext();
    if (!this.ctx) return;

    const chords = [
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.15 },
      { f: 783.99, d: 0.15 },
      { f: 1046.5, d: 0.5 },
      { f: 1318.51, d: 0.7 }
    ];

    chords.forEach((note, i) => {
      setTimeout(() => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + note.d);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + note.d);
        } catch (e) {
          console.warn(e);
        }
      }, i * 140);
    });
  }

  playBlowCandle() {
    if (this.muted) return;
    this.initAudioContext();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.5));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {
      console.warn(e);
    }
  }

  playScratch() {
    if (this.muted) return;
    this.initAudioContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      console.warn(e);
    }
  }

  startBGM() {
    this.initAudioContext();
    if (!this.bgAudio) {
      this.bgAudio = new Audio(bgAudioSrc);
      this.bgAudio.loop = true;
      this.bgAudio.volume = 0.7;
    }

    if (this.muted) {
      this.bgAudio.muted = true;
    }

    if (!this.bgAudio.paused && this.bgmPlaying) {
      return;
    }

    this.bgAudio.play()
      .then(() => {
        this.bgmPlaying = true;
        this.notify();
      })
      .catch((err) => {
        console.log("Audio autoplay prevented or waiting for interaction:", err);
      });
  }


  stopBGM() {
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    this.bgmPlaying = false;
    this.notify();
  }

  toggleBGM() {
    if (this.bgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }
}

export const sounds = new SoundFX();
