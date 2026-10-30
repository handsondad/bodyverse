// Synthesised "lub-dub" thumps; no audio files, and nothing plays until the child turns sound on.
export class HeartbeatAudio {
  private context: AudioContext | null = null;

  private ensure(): AudioContext | null {
    if (this.context) return this.context;
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    this.context = new Ctor();
    return this.context;
  }

  async resume(): Promise<boolean> {
    const context = this.ensure();
    if (!context) return false;
    if (context.state === "suspended") await context.resume();
    return context.state === "running";
  }

  private thump(at: number, frequency: number, gain: number) {
    const context = this.context;
    if (!context) return;
    const osc = context.createOscillator();
    const amp = context.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency * 1.6, at);
    osc.frequency.exponentialRampToValueAtTime(frequency, at + 0.05);
    amp.gain.setValueAtTime(0.0001, at);
    amp.gain.exponentialRampToValueAtTime(gain, at + 0.012);
    amp.gain.exponentialRampToValueAtTime(0.0001, at + 0.16);
    osc.connect(amp).connect(context.destination);
    osc.start(at);
    osc.stop(at + 0.18);
  }

  beat(bpm: number, loudness = 1) {
    const context = this.context;
    if (!context || context.state !== "running") return;
    const now = context.currentTime + 0.01;
    const gap = Math.min(0.2, (60 / bpm) * 0.26);
    this.thump(now, 62, 0.55 * loudness);
    this.thump(now + gap, 52, 0.32 * loudness);
  }

  pop() {
    const context = this.context;
    if (!context || context.state !== "running") return;
    this.thump(context.currentTime + 0.01, 420, 0.18);
  }

  dispose() {
    void this.context?.close();
    this.context = null;
  }
}
