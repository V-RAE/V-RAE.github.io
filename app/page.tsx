"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type VideoItem = {
  label: string;
  src: string;
  tone?: "ours" | "source" | "baseline";
};

const generationData = {
  UCF101: {
    cases: ["Typing", "Push-up"],
    videos: {
      Typing: [
        { label: "Wan 2.2", src: "/videos/ucf101_videogen_case/Wan2.2/wan22_typing.mp4", tone: "baseline" },
        { label: "CogVideoX", src: "/videos/ucf101_videogen_case/CogVideoX/cogvideox_typing.mp4", tone: "baseline" },
        { label: "AToken", src: "/videos/ucf101_videogen_case/AToken/atoken_typing.mp4", tone: "baseline" },
        { label: "V-RAE · DINOv3", src: "/videos/ucf101_videogen_case/V-RAE%20(DINOv3)/dinov3_typing.mp4", tone: "ours" },
        { label: "V-RAE · SigLIP2", src: "/videos/ucf101_videogen_case/V-RAE%20(SigLiP2)/siglip2_typing.mp4", tone: "ours" },
        { label: "V-RAE · EUPE", src: "/videos/ucf101_videogen_case/V-RAE%20(EUPE)/eupe_typing.mp4", tone: "ours" },
        { label: "V-RAE · V-JEPA 2.1", src: "/videos/ucf101_videogen_case/V-RAE%20(V-JEPA2.1)/vjepa2.1_typing.mp4", tone: "ours" },
      ],
      "Push-up": [
        { label: "Wan 2.2", src: "/videos/ucf101_videogen_case/Wan2.2/wan22_pushup.mp4", tone: "baseline" },
        { label: "CogVideoX", src: "/videos/ucf101_videogen_case/CogVideoX/cogvideox_pushup.mp4", tone: "baseline" },
        { label: "AToken", src: "/videos/ucf101_videogen_case/AToken/atoken_pushup.mp4", tone: "baseline" },
        { label: "V-RAE · DINOv3", src: "/videos/ucf101_videogen_case/V-RAE%20(DINOv3)/pushup.mp4", tone: "ours" },
        { label: "V-RAE · SigLIP2", src: "/videos/ucf101_videogen_case/V-RAE%20(SigLiP2)/siglip2_pushup.mp4", tone: "ours" },
        { label: "V-RAE · EUPE", src: "/videos/ucf101_videogen_case/V-RAE%20(EUPE)/eupe_pushup.mp4", tone: "ours" },
        { label: "V-RAE · V-JEPA 2.1", src: "/videos/ucf101_videogen_case/V-RAE%20(V-JEPA2.1)/vjepa2.1_pushup.mp4", tone: "ours" },
      ],
    },
  },
  K600: {
    cases: ["Football", "Surfing", "Rappelling"],
    videos: {
      Football: [
        { label: "Wan 2.2", src: "/videos/k600_videogen_case/Wan2.2/wan22_football.mp4", tone: "baseline" },
        { label: "CogVideoX", src: "/videos/k600_videogen_case/CogVideoX/cogvideox_football.mp4", tone: "baseline" },
        { label: "AToken", src: "/videos/k600_videogen_case/AToken/atoken_football.mp4", tone: "baseline" },
        { label: "V-RAE · DINOv3", src: "/videos/k600_videogen_case/V-RAE%20(DINOv3)/dinov3_football.mp4", tone: "ours" },
        { label: "V-RAE · SigLIP2", src: "/videos/k600_videogen_case/V-RAE%20(SigLiP2)/siglip_football.mp4", tone: "ours" },
        { label: "V-RAE · EUPE", src: "/videos/k600_videogen_case/V-RAE%20(EUPE)/eupe_football.mp4", tone: "ours" },
        { label: "V-RAE · V-JEPA 2.1", src: "/videos/k600_videogen_case/V-RAE%20(V-JEPA2.1)/vjepa2.1_football.mp4", tone: "ours" },
      ],
      Surfing: [
        { label: "Wan 2.2", src: "/videos/k600_videogen_case/Wan2.2/wan22_surfing.mp4", tone: "baseline" },
        { label: "CogVideoX", src: "/videos/k600_videogen_case/CogVideoX/cogvideox_surfing.mp4", tone: "baseline" },
        { label: "AToken", src: "/videos/k600_videogen_case/AToken/atoken_surfing.mp4", tone: "baseline" },
        { label: "V-RAE · DINOv3", src: "/videos/k600_videogen_case/V-RAE%20(DINOv3)/dinov3_surfing.mp4", tone: "ours" },
        { label: "V-RAE · SigLIP2", src: "/videos/k600_videogen_case/V-RAE%20(SigLiP2)/siglip_surfing.mp4", tone: "ours" },
        { label: "V-RAE · EUPE", src: "/videos/k600_videogen_case/V-RAE%20(EUPE)/eupe_surfing.mp4", tone: "ours" },
        { label: "V-RAE · V-JEPA 2.1", src: "/videos/k600_videogen_case/V-RAE%20(V-JEPA2.1)/vjepa2.1_surfing.mp4", tone: "ours" },
      ],
      Rappelling: [
        { label: "Wan 2.2", src: "/videos/k600_videogen_case/Wan2.2/wan22_rappelling.mp4", tone: "baseline" },
        { label: "CogVideoX", src: "/videos/k600_videogen_case/CogVideoX/cogvideox_rappelling.mp4", tone: "baseline" },
        { label: "AToken", src: "/videos/k600_videogen_case/AToken/atoken_rappelling.mp4", tone: "baseline" },
        { label: "V-RAE · DINOv3", src: "/videos/k600_videogen_case/V-RAE%20(DINOv3)/dinov3_rappelling.mp4", tone: "ours" },
        { label: "V-RAE · SigLIP2", src: "/videos/k600_videogen_case/V-RAE%20(SigLiP2)/siglip_rappelling.mp4", tone: "ours" },
        { label: "V-RAE · EUPE", src: "/videos/k600_videogen_case/V-RAE%20(EUPE)/eupe_rappelling.mp4", tone: "ours" },
        { label: "V-RAE · V-JEPA 2.1", src: "/videos/k600_videogen_case/V-RAE%20(V-JEPA2.1)/jepa_rappelling.mp4", tone: "ours" },
      ],
    },
  },
} as const;

const reconstructionCases = [1, 2, 3] as const;

const reconstructionVideos = (caseNumber: number): VideoItem[] => {
  const folder = caseNumber === 1 ? "case_1" : `case${caseNumber}`;
  const jepa = caseNumber === 3 ? "jepa.mp4" : "vjepa.mp4";
  return [
    { label: "Original", src: `/videos/reconstruction_case/${folder}/original.mp4`, tone: "source" },
    { label: "RAEv2", src: `/videos/reconstruction_case/${folder}/raev2.mp4`, tone: "baseline" },
    { label: "Wan 2.2 VAE", src: `/videos/reconstruction_case/${folder}/wan22.mp4`, tone: "baseline" },
    { label: "OmniTokenizer", src: `/videos/reconstruction_case/${folder}/omnitokenizer.mp4`, tone: "baseline" },
    { label: "V-RAE · EUPE", src: `/videos/reconstruction_case/${folder}/eupe.mp4`, tone: "ours" },
    { label: "V-RAE · V-JEPA 2.1", src: `/videos/reconstruction_case/${folder}/${jepa}`, tone: "ours" },
  ];
};

const reconstructionRows = [
  ["Wan2.1 VAE", "6.05", "3.58"],
  ["Wan2.2 VAE", "12.20", "4.76"],
  ["HunyuanVideo VAE", "7.73", "4.38"],
  ["CogVideoX VAE", "14.53", "8.11"],
  ["AToken", "8.17", "5.36"],
  ["V-RAE · DINOv3", "7.88", "5.46"],
  ["V-RAE · EUPE", "10.43", "6.14"],
  ["V-RAE · SigLIP2", "9.82", "4.73"],
  ["V-RAE · V-JEPA 2.1", "6.86", "2.67"],
];

const generationRows = [
  ["Wan2.1 VAE", "148.20", "53.75"],
  ["Wan2.2 VAE", "155.50", "52.25"],
  ["HunyuanVideo VAE", "211.53", "53.28"],
  ["CogVideoX VAE", "159.20", "51.83"],
  ["AToken", "143.00", "46.74"],
  ["V-RAE · DINOv3", "131.40", "30.09"],
  ["V-RAE · SigLIP2", "142.60", "44.90"],
  ["V-RAE · EUPE", "125.72", "24.77"],
  ["V-RAE · V-JEPA 2.1", "118.32", "20.47"],
];

const semanticRows = [
  ["Wan2.2 VAE", 16.94, 41.86, 46.13],
  ["AToken", 30.83, 45.05, 53.27],
  ["V-RAE · DINOv3", 89.13, 66.55, 83.12],
  ["V-RAE · EUPE", 90.16, 65.67, 82.21],
  ["V-RAE · SigLIP2", 90.92, 65.39, 82.56],
  ["V-RAE · V-JEPA 2.1", 86.65, 72.91, 80.7],
];

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  );
}

function ArrowIcon() {
  return <span className="arrow-icon" aria-hidden="true">↗</span>;
}

function SectionHeader({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy: string }) {
  return (
    <div className="section-header reveal">
      <div className="section-index">{index}</div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="section-copy">{copy}</p>
      </div>
    </div>
  );
}

function SyncVideoGrid({ videos, compact = false }: { videos: VideoItem[]; compact?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState(true);

  const playAll = async () => {
    const nodes = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (playing) {
      nodes.forEach((node) => node.pause());
      setPlaying(false);
      return;
    }
    await Promise.allSettled(nodes.map((node) => node.play()));
    setPlaying(true);
  };

  const restart = async () => {
    const nodes = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    nodes.forEach((node) => { node.currentTime = 0; });
    await Promise.allSettled(nodes.map((node) => node.play()));
    setPlaying(true);
  };

  useEffect(() => {
    const nodes = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    nodes.forEach((node) => { node.currentTime = 0; });
    Promise.allSettled(nodes.map((node) => node.play())).then(() => setPlaying(true));
  }, [videos]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => {
      const nodes = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
      if (entry.isIntersecting && playing) {
        nodes.forEach((node) => node.play().catch(() => undefined));
      } else if (!entry.isIntersecting) {
        nodes.forEach((node) => node.pause());
      }
    }, { threshold: 0.18 });
    observer.observe(root);
    return () => observer.disconnect();
  }, [playing, videos]);

  return (
    <div className="video-explorer" ref={containerRef}>
      <div className="video-masterbar">
        <span><i className={playing ? "live-dot" : "live-dot paused"} /> synchronized playback</span>
        <div>
          <button type="button" onClick={playAll}>{playing ? "Pause all" : "Play all"}</button>
          <button type="button" onClick={restart}>Restart</button>
        </div>
      </div>
      <div className={`video-grid ${compact ? "video-grid--compact" : ""}`}>
        {videos.map((video, index) => (
          <figure className={`video-card ${video.tone ?? ""}`} key={video.src}>
            <div className="video-shell">
              <video
                ref={(node) => { videoRefs.current[index] = node; }}
                src={video.src}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                aria-label={`${video.label} video result`}
              />
              <span className="video-sheen" aria-hidden="true" />
            </div>
            <figcaption>
              <span>{video.label}</span>
              {video.tone === "ours" && <b>Ours</b>}
              {video.tone === "source" && <b>Reference</b>}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function MetricTable({ title, rows, labels }: { title: string; rows: string[][]; labels: [string, string] }) {
  return (
    <div className="metric-table-wrap reveal">
      <div className="metric-table-title">
        <h3>{title}</h3>
        <span>↓ lower is better</span>
      </div>
      <div className="metric-table-scroll">
        <table className="metric-table">
          <thead><tr><th>Latent space</th><th>{labels[0]}</th><th>{labels[1]}</th></tr></thead>
          <tbody>
            {rows.map((row) => {
              const ours = row[0].startsWith("V-RAE");
              const best = row[0].includes("V-JEPA");
              return (
                <tr className={`${ours ? "ours-row" : ""} ${best ? "best-row" : ""}`} key={row[0]}>
                  <td>{row[0]}{ours && <span className="mini-ours">ours</span>}</td>
                  <td>{row[1]}</td><td>{row[2]}{best && <span className="best-pill">best</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  const [dataset, setDataset] = useState<keyof typeof generationData>("K600");
  const [caseName, setCaseName] = useState<string>("Surfing");
  const [reconCase, setReconCase] = useState<number>(1);
  const [metric, setMetric] = useState<"rFVD" | "tFVD">("tFVD");
  const [copied, setCopied] = useState(false);

  const activeGenerationVideos = useMemo(() => {
    const group = generationData[dataset];
    return group.videos[caseName as keyof typeof group.videos] as readonly VideoItem[];
  }, [dataset, caseName]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));

    const onScroll = () => {
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
      document.body.classList.toggle("scrolled", window.scrollY > 32);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const switchDataset = (next: keyof typeof generationData) => {
    setDataset(next);
    setCaseName(next === "K600" ? "Surfing" : "Typing");
  };

  const bibtex = `@article{guo2026vrae,
  title   = {V-RAE: Rethinking Video Latent Spaces for Generation},
  author  = {Guo, Minghui and Wu, Shengqiong and Fei, Hao and Xie, Saining},
  year    = {2026}
}`;

  const copyBibtex = async () => {
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="nav-brand" href="#top"><Mark /><span>V-RAE</span></a>
        <div className="nav-links">
          <a href="#method">Method</a>
          <a href="#results">Results</a>
          <a href="#videos">Videos</a>
          <a href="#tfvd">tFVD</a>
        </div>
        <a className="nav-paper" href="/vrae-paper.pdf" target="_blank">Paper <ArrowIcon /></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <img src="/assets/hero-cover.png" alt="" />
          <span className="hero-vignette" />
          <span className="hero-glow hero-glow-a" />
          <span className="hero-glow hero-glow-b" />
        </div>
        <div className="hero-content">
          <p className="hero-kicker reveal">Video Representation Autoencoder · 2026</p>
          <h1 className="reveal"><span>V-RAE</span><small>Rethinking Video Latent Spaces<br />for Generation</small></h1>
          <p className="hero-lede reveal">Compact generative video latents built on frozen vision foundation representations—semantic, temporally coherent, and easier to generate.</p>
          <div className="hero-actions reveal">
            <a className="button button-primary" href="/vrae-paper.pdf" target="_blank">Read the paper <ArrowIcon /></a>
            <a className="button button-ghost" href="#videos">Watch comparisons <span aria-hidden="true">↓</span></a>
          </div>
          <p className="hero-authors reveal">Minghui Guo · Shengqiong Wu · Hao Fei · Saining Xie</p>
          <p className="hero-affiliations reveal">National University of Singapore · University of Oxford · New York University</p>
        </div>
        <div className="hero-metrics">
          <div><strong>2.67</strong><span>K600 rFVD ↓</span></div>
          <div><strong>20.47</strong><span>K600 gFVD ↓</span></div>
          <div><strong>6×</strong><span>faster convergence</span></div>
          <div><strong>0.897</strong><span>tFVD ↔ gFVD</span></div>
        </div>
        <a href="#premise" className="scroll-cue" aria-label="Scroll to the premise"><span />Discover</a>
      </section>

      <section className="premise dark-section" id="premise">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <div className="shell">
          <p className="eyebrow reveal">The premise</p>
          <h2 className="statement reveal">The best latent space for <em>reconstruction</em><br />is not necessarily the best one for <span>generation.</span></h2>
          <p className="statement-support reveal">A video generator should model how visual states evolve—not rediscover objects, actions, and scene structure from reconstruction-first codes.</p>
          <div className="latent-compare">
            <article className="latent-card latent-card--vae reveal">
              <div className="latent-visual vae-visual" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
              <p className="card-label">Conventional VAE latent</p>
              <h3>Pixel-faithful.<br />Locally irregular.</h3>
              <p>Optimized to recover observed samples, but not necessarily the space between them.</p>
            </article>
            <article className="latent-card latent-card--vrae reveal">
              <div className="latent-visual vrae-visual" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
              <p className="card-label">V-RAE latent</p>
              <h3>Semantic.<br />Temporally smooth.</h3>
              <p>Anchored in pretrained representations, then compressed without discarding structure.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section method" id="method">
        <div className="shell">
          <SectionHeader index="01" eyebrow="Architecture" title="Start from representations, not reconstruction codes." copy="A frozen visual representation encoder supplies semantic structure. Lightweight temporal pooling removes redundancy, while a chunk-wise causal decoder reconstructs continuous motion." />
          <div className="method-steps reveal">
            <article><span>01</span><b>Frozen representation</b><p>DINOv3 · SigLIP2 · EUPE · V-JEPA 2.1</p></article>
            <article><span>02</span><b>Temporal pooling</b><p>Dense features → 4× compact latent sequence</p></article>
            <article><span>03</span><b>Causal decoding</b><p>3D RoPE · chunk-wise history · multi-frame output</p></article>
          </div>
          <figure className="paper-figure method-figure reveal">
            <img src="/assets/V-RAE-2.webp" alt="V-RAE architecture with a frozen visual representation encoder, temporal pooling and causal video decoder" />
            <figcaption><span>Figure 1</span> V-RAE architecture. Only the temporal pooling module and decoder are trained.</figcaption>
          </figure>
          <div className="encoder-strip reveal" aria-label="Supported frozen encoders">
            <span>Image-native</span><b>DINOv3</b><b>SigLIP2</b><b>EUPE</b><i />
            <span>Video-native</span><b>V-JEPA 2.1</b>
          </div>
        </div>
      </section>

      <section className="section overview-section" id="results">
        <div className="shell">
          <SectionHeader index="02" eyebrow="At a glance" title="One latent space. Four advantages." copy="V-RAE combines competitive reconstruction, substantially richer semantics, better downstream generation, and faster optimization under matched settings." />
          <div className="overview-frame reveal">
            <img src="/assets/V-RAE-overall.webp" alt="Radar comparison and K600 gFVD convergence curves" />
          </div>
          <div className="result-principles reveal">
            <div><span>01</span><strong>Compact</strong><p>4× temporal and 16×16 spatial compression.</p></div>
            <div><span>02</span><strong>Semantic</strong><p>Up to 90.92% UCF101 probing accuracy.</p></div>
            <div><span>03</span><strong>Generative</strong><p>20.47 K600 gFVD with V-JEPA 2.1.</p></div>
            <div><span>04</span><strong>Predictive</strong><p>Stronger future-video modeling on Cityscapes.</p></div>
          </div>
        </div>
      </section>

      <section className="section reconstruction" id="reconstruction">
        <div className="shell">
          <SectionHeader index="03" eyebrow="Reconstruction" title="Faithful motion, without giving up semantics." copy="V-RAE reaches 2.67 rFVD on K600 and remains competitive on UCF101 while its latents preserve far more task-relevant information than conventional video tokenizer latents." />
          <div className="case-toolbar reveal">
            <div><span>Reconstruction case</span>{reconstructionCases.map((item) => <button className={reconCase === item ? "active" : ""} key={item} onClick={() => setReconCase(item)}>0{item}</button>)}</div>
            <p>All videos share the same 8 FPS timeline.</p>
          </div>
          <div className="reveal"><SyncVideoGrid videos={reconstructionVideos(reconCase)} compact /></div>
          <div className="two-col-tables">
            <MetricTable title="Reconstruction fidelity" rows={reconstructionRows} labels={["UCF101 rFVD", "K600 rFVD"]} />
            <div className="semantic-panel reveal">
              <div className="metric-table-title"><h3>Semantic probing</h3><span>Top-1 accuracy ↑</span></div>
              <div className="semantic-legend"><span>UCF101</span><span>SSv2</span><span>K400</span></div>
              {semanticRows.map(([name, ucf, ssv2, k400]) => (
                <div className={`semantic-row ${String(name).startsWith("V-RAE") ? "ours" : ""}`} key={String(name)}>
                  <span>{name}</span>
                  <div style={{ "--ucf": `${ucf}%`, "--ssv": `${ssv2}%`, "--k4": `${k400}%` } as React.CSSProperties}>
                    <i className="bar-ucf" /><i className="bar-ssv" /><i className="bar-k4" />
                  </div>
                  <b>{ucf}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section generation dark-section" id="videos">
        <div className="ambient ambient-three" aria-hidden="true" />
        <div className="shell shell-wide">
          <SectionHeader index="04" eyebrow="Class-conditional generation" title="Better targets. Learned faster." copy="Under the same 1,280-token budget, every V-RAE variant outperforms the evaluated conventional video tokenizer latent spaces on both datasets." />
          <div className="generation-toolbar reveal">
            <div className="segmented" aria-label="Dataset">
              {(Object.keys(generationData) as (keyof typeof generationData)[]).map((item) => <button key={item} className={dataset === item ? "active" : ""} onClick={() => switchDataset(item)}>{item}</button>)}
            </div>
            <div className="case-tabs" aria-label="Video case">
              {generationData[dataset].cases.map((item) => <button key={item} className={caseName === item ? "active" : ""} onClick={() => setCaseName(item)}>{item}</button>)}
            </div>
          </div>
          <div className="reveal"><SyncVideoGrid videos={[...activeGenerationVideos]} /></div>
          <div className="generation-evidence">
            <MetricTable title="Controlled generation" rows={generationRows} labels={["UCF101 gFVD", "K600 gFVD"]} />
            <div className="convergence-card reveal">
              <div className="speed-callout"><span>up to</span><strong>6×</strong><p>faster convergence</p></div>
              <img src="/assets/k600_convergence.webp" alt="K600 gFVD convergence curves comparing V-RAE with Wan video VAEs" />
            </div>
          </div>
          <div className="chart-pair">
            <figure className="paper-figure reveal"><img src="/assets/ucf101_convergence.webp" alt="UCF101 convergence curve" /><figcaption><span>UCF101</span> V-RAE reaches the Wan2.2 endpoint in roughly one third of the updates.</figcaption></figure>
            <figure className="paper-figure reveal"><img src="/assets/vrae_six_model_radar.webp" alt="Comparison of reconstruction, generation, semantics and compression" /><figcaption><span>Holistic view</span> Generation quality tracks semantic organization more closely than reconstruction alone.</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="section tfvd" id="tfvd">
        <div className="shell">
          <SectionHeader index="05" eyebrow="A generation-oriented diagnostic" title="Measure the path, not only the endpoints." copy="tFVD replaces interior latent codes with local temporal midpoints, then asks whether the decoder can still recover plausible, coherent motion." />
          <div className="tfvd-intro">
            <figure className="paper-figure reveal"><img src="/assets/tFVD_method.webp" alt="tFVD computation by temporal latent interpolation" /><figcaption><span>tFVD</span> A controlled stress test of local temporal geometry and decoder stability.</figcaption></figure>
            <div className="metric-switch reveal">
              <p>Correlation with downstream gFVD</p>
              <div className="segmented"><button className={metric === "rFVD" ? "active" : ""} onClick={() => setMetric("rFVD")}>rFVD</button><button className={metric === "tFVD" ? "active" : ""} onClick={() => setMetric("tFVD")}>tFVD</button></div>
              <div className={`correlation-number ${metric === "tFVD" ? "strong" : "weak"}`}><small>K600 Pearson r</small><strong>{metric === "tFVD" ? "0.897" : "0.234"}</strong><span>{metric === "tFVD" ? "Strong signal" : "Weak signal"}</span></div>
              <p className="metric-explain">{metric === "tFVD" ? "Temporal interpolation consistency closely predicts which latent spaces are easier to generate." : "Reconstruction fidelity alone produces a markedly different ranking from generation quality."}</p>
            </div>
          </div>
          <figure className="paper-figure correlation-figure reveal">
            <img src="/assets/fvd_metric_correlations_1x4.webp" alt="Correlation plots comparing rFVD and tFVD against gFVD on UCF101 and K600" />
            <figcaption><span>Metric correlation</span> tFVD improves Pearson correlation from 0.115 to 0.635 on UCF101 and from 0.234 to 0.897 on K600.</figcaption>
          </figure>
          <div className="finding reveal"><span>Finding 03</span><p>A generation-friendly latent must remain temporally smooth and decodable under prediction errors—not merely reconstruct encoded inputs.</p></div>
        </div>
      </section>

      <section className="section prediction">
        <div className="shell">
          <SectionHeader index="06" eyebrow="Future video prediction" title="A latent space that can imagine what comes next." copy="With the same conditional DiT and training budget on Cityscapes, V-RAE better preserves scene geometry, object identity, and motion trajectories over longer prediction horizons." />
          <div className="prediction-metrics reveal">
            <div><span>gFID ↓</span><del>15.02</del><strong>11.52</strong></div>
            <div><span>gFVD ↓</span><del>144.47</del><strong>111.36</strong></div>
            <p>Only the latent representation changes.</p>
          </div>
          <figure className="paper-figure world-figure reveal"><img src="/assets/world_modeling.webp" alt="Future video prediction comparison on a Cityscapes traffic scene" /><figcaption><span>Cityscapes</span> V-RAE reduces structural and identity drift at X(t+4), X(t+8), and X(t+12).</figcaption></figure>
          <figure className="paper-figure world-figure reveal"><img src="/assets/world_modeling_2.webp" alt="Future video prediction comparison on a Cityscapes pedestrian scene" /><figcaption><span>Second scene</span> Pedestrians, bicycles, lane structure, and instance separation remain more coherent.</figcaption></figure>
          <div className="world-table reveal"><table><thead><tr><th>Latent space</th><th>rFVD ↓</th><th>tFVD ↓</th><th>gFID ↓</th><th>gFVD ↓</th></tr></thead><tbody><tr><td>Wan2.2 VAE</td><td>7.03</td><td>319.02</td><td>15.02</td><td>144.47</td></tr><tr className="ours-row"><td>V-RAE · EUPE <span className="mini-ours">ours</span></td><td>29.29</td><td><b>224.60</b></td><td><b>11.52</b></td><td><b>111.36</b></td></tr></tbody></table></div>
        </div>
      </section>

      <footer className="footer" id="citation">
        <div className="footer-glow" aria-hidden="true" />
        <div className="shell">
          <div className="footer-title reveal"><Mark /><p>V-RAE</p><h2>Rethinking Video Latent Spaces for Generation</h2></div>
          <div className="footer-grid">
            <div className="authors-card reveal"><p>Minghui Guo<sup>1</sup> · Shengqiong Wu<sup>2</sup> · Hao Fei<sup>2</sup> · Saining Xie<sup>3</sup></p><span><sup>1</sup>National University of Singapore</span><span><sup>2</sup>University of Oxford</span><span><sup>3</sup>New York University</span><div><a href="/vrae-paper.pdf" target="_blank">Paper <ArrowIcon /></a><button type="button" disabled>Code · coming soon</button></div></div>
            <div className="bib-card reveal"><div><span>BibTeX</span><button type="button" onClick={copyBibtex}>{copied ? "Copied" : "Copy"}</button></div><pre>{bibtex}</pre></div>
          </div>
          <div className="footer-bottom"><p>Semantic representations for reconstruction, generation, and predictive modeling.</p><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>
    </main>
  );
}

export default App;
