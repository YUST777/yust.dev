let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

export const sounds = {
  tick: () => {
    const ctx = getAudioContext();
    const t = ctx.currentTime;

    const noise = ctx.createBufferSource();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.003, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 15);
    }
    noise.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 3500;

    const gain = ctx.createGain();
    gain.gain.value = 0.2;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
  },

  click: () => {
    const ctx = getAudioContext();
    const t = ctx.currentTime;

    const noise = ctx.createBufferSource();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.006, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 40);
    }
    noise.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 4000 + Math.random() * 800;
    filter.Q.value = 2.5;

    const gain = ctx.createGain();
    gain.gain.value = 0.32;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
  },

  popIn: () => {
    const ctx = getAudioContext();
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(350, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.035);

    gain.gain.setValueAtTime(0.24, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.045);
  },

  popOut: () => {
    const ctx = getAudioContext();
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.03);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.04);
  },

  /**
   * Official Desktop Goose Honk — Loaded from /static/goose-honk.mp3
   */
  honk: (() => {
    let honkBuffer: AudioBuffer | null = null;
    let loading = false;

    return async () => {
      const ctx = getAudioContext();

      // Pre-load the buffer if not ready
      if (!honkBuffer && !loading) {
        loading = true;
        try {
          const resp = await fetch("/static/goose-honk.mp3");
          const arrayBuf = await resp.arrayBuffer();
          honkBuffer = await ctx.decodeAudioData(arrayBuf);
        } catch (err) {
          console.error("Failed to load honk mp3", err);
        } finally {
          loading = false;
        }
      }

      if (honkBuffer) {
        const source = ctx.createBufferSource();
        source.buffer = honkBuffer;

        const gain = ctx.createGain();
        gain.gain.value = 0.45; // Nice and loud

        source.connect(gain);
        gain.connect(ctx.destination);
        source.start(ctx.currentTime);
      }
    };
  })(),
};
