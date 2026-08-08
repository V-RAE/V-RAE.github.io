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
  ["Cosmos-0.1 (CV4×8×8)", "17.01", "9.88"],
  ["AToken", "8.17", "5.36"],
  ["Open-MAGVIT2", "36.21", "17.16"],
  ["OmniTokenizer VAE", "28.86", "15.35"],
  ["LARP-L-long", "142.29", "125.00"],
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

type SemanticProbeRow = {
  model: string;
  compression: string;
  family: "encoder" | "ours" | "vae";
  ucf101: [number, number];
  ssv2: [number, number];
  k400: [number, number];
};

const semanticProbeRows: SemanticProbeRow[] = [
  { model: "DINOv3-L", compression: "1×", family: "encoder", ucf101: [91.84, 91.84], ssv2: [69.92, 70.21], k400: [86.32, 87.15] },
  { model: "V-RAE · DINOv3-L", compression: "4×", family: "ours", ucf101: [89.13, 88.94], ssv2: [66.55, 67.19], k400: [83.12, 84.36] },
  { model: "EUPE-B", compression: "1×", family: "encoder", ucf101: [93.86, 93.78], ssv2: [67.17, 67.64], k400: [83.53, 84.21] },
  { model: "V-RAE · EUPE-B", compression: "4×", family: "ours", ucf101: [90.16, 89.93], ssv2: [65.67, 66.21], k400: [82.21, 83.31] },
  { model: "SigLIP2-L", compression: "1×", family: "encoder", ucf101: [94.05, 93.55], ssv2: [68.54, 68.80], k400: [86.00, 86.93] },
  { model: "V-RAE · SigLIP2-L", compression: "4×", family: "ours", ucf101: [90.92, 90.88], ssv2: [65.39, 66.08], k400: [82.56, 83.91] },
  { model: "V-JEPA 2.1-L", compression: "2×", family: "encoder", ucf101: [93.02, 92.83], ssv2: [76.58, 77.11], k400: [84.29, 85.20] },
  { model: "V-RAE · V-JEPA 2.1-L", compression: "4×", family: "ours", ucf101: [86.65, 86.65], ssv2: [72.91, 73.50], k400: [80.70, 81.87] },
  { model: "Wan2.2 VAE", compression: "4×", family: "vae", ucf101: [16.94, 16.29], ssv2: [41.86, 42.62], k400: [46.13, 48.11] },
  { model: "AToken", compression: "4×", family: "vae", ucf101: [30.83, 30.29], ssv2: [45.05, 45.95], k400: [53.27, 55.32] },
  { model: "CogVideoX VAE", compression: "4×", family: "vae", ucf101: [14.51, 14.14], ssv2: [37.03, 38.34], k400: [41.59, 43.53] },
];

const semanticDatasets = [
  { key: "ucf101", label: "UCF101", probe: "Linear probe" },
  { key: "ssv2", label: "Something-Something V2", probe: "Attentive probe" },
  { key: "k400", label: "Kinetics-400", probe: "Attentive probe" },
] as const;

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}

function ArrowIcon() {
  return <span className="arrow-icon" aria-hidden="true">↗</span>;
}

function SectionHeader({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy: string }) {
  return (
    <div className="section-header reveal">
      <p className="section-label"><span>{index}</span>{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-copy">{copy}</p>
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
  const bestValues = [
    Math.min(...rows.map((row) => Number(row[1]))),
    Math.min(...rows.map((row) => Number(row[2]))),
  ];

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
              const bestFirst = Number(row[1]) === bestValues[0];
              const bestSecond = Number(row[2]) === bestValues[1];
              return (
                <tr className={`${ours ? "ours-row" : ""} ${bestFirst || bestSecond ? "best-row" : ""}`} key={row[0]}>
                  <td>{row[0]}{ours && <span className="mini-ours">ours</span>}</td>
                  <td>{row[1]}{bestFirst && <span className="best-pill">best</span>}</td>
                  <td>{row[2]}{bestSecond && <span className="best-pill">best</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SemanticProbeChart() {
  return (
    <div className="probe-grid reveal">
      {semanticDatasets.map((dataset) => (
        <article className="probe-chart" key={dataset.key}>
          <header>
            <div>
              <p>{dataset.probe}</p>
              <h3>{dataset.label}</h3>
            </div>
            <span>Top-1 accuracy ↑</span>
          </header>
          <div className="probe-chart-legend" aria-label="Evaluation setting legend">
            <span><i className="single" />Single clip</span>
            <span><i className="tta" />TTA</span>
          </div>
          <div className="probe-axis" aria-hidden="true"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div>
          <div className="probe-rows">
            {semanticProbeRows.map((row) => {
              const [single, tta] = row[dataset.key];
              return (
                <div className={`probe-row ${row.family}`} key={row.model}>
                  <div className="probe-model">
                    <span>{row.model}</span>
                    <small>{row.compression}</small>
                  </div>
                  <div className="probe-bars">
                    <div className="probe-track" aria-label={`${row.model}, single clip: ${single.toFixed(2)} percent`}>
                      <i className="probe-fill single" style={{ "--probe-value": `${single}%` } as React.CSSProperties} />
                      <b>{single.toFixed(2)}</b>
                    </div>
                    <div className="probe-track" aria-label={`${row.model}, test-time augmentation: ${tta.toFixed(2)} percent`}>
                      <i className="probe-fill tta" style={{ "--probe-value": `${tta}%` } as React.CSSProperties} />
                      <b>{tta.toFixed(2)}</b>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      ))}
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
      <header className="paper-hero" id="top">
        <div className="paper-nav">
          <a className="paper-brand" href="#top"><Mark /><span>V-RAE</span></a>
          <div><a href="#method">Method</a><a href="#reconstruction">Results</a><a href="#citation">BibTeX</a></div>
        </div>
        <div className="hero-grid">
          <div className="hero-copy reveal">
            <p className="hero-kicker">Video Representation Autoencoder · 2026</p>
            <h1>V-RAE</h1>
            <h2>Rethinking Video Latent Spaces for Generation</h2>
            <p className="hero-lede">Introducing V-RAE, a video autoencoder that constructs generative latent spaces directly from frozen visual representations.</p>
            <div className="hero-principles">
              <div><span aria-hidden="true">◎</span><p><strong>Semantic latent space:</strong> frozen visual encoders provide structured representations for reconstruction, generation, and prediction.</p></div>
              <div><span aria-hidden="true">⇲</span><p><strong>Video-specific compression:</strong> temporal attention pooling removes redundancy while a causal decoder reconstructs continuous motion.</p></div>
              <div><span aria-hidden="true">✦</span><p><strong>Generation-oriented design:</strong> V-RAE improves generation quality and converges up to 6× faster under matched settings.</p></div>
            </div>
            <div className="hero-actions hero-resource-actions" aria-label="Project resources">
              <button className="resource-button resource-button-primary" type="button" disabled title="Coming soon" aria-label="arXiv — coming soon">
                <span className="resource-icon" aria-hidden="true"><img src="/assets/logo-arxiv.svg" alt="" /></span>
                <span>arXiv</span>
              </button>
              <button className="resource-button" type="button" disabled title="Coming soon" aria-label="Code — coming soon">
                <span className="resource-icon" aria-hidden="true"><img src="/assets/logo-github.svg" alt="" /></span>
                <span>Code</span>
              </button>
              <button className="resource-button" type="button" disabled title="Coming soon" aria-label="Models — coming soon">
                <span className="resource-icon" aria-hidden="true"><img src="/assets/logo-huggingface.svg" alt="" /></span>
                <span>Models</span>
              </button>
            </div>
          </div>
          <figure className="hero-teaser reveal">
            <img src="/assets/hero-cover.png" alt="V-RAE teaser showing a structured video representation space" />
          </figure>
        </div>
      </header>

      <section className="paper-meta" aria-label="Paper authors and affiliations">
        <p className="paper-authors">Minghui Guo<sup>1</sup>, Shengqiong Wu<sup>2</sup>, Hao Fei<sup>2</sup>, Saining Xie<sup>3</sup></p>
        <p className="paper-affiliations"><span><sup>1</sup>National University of Singapore</span><span><sup>2</sup>University of Oxford</span><span><sup>3</sup>New York University</span></p>
      </section>

      <section className="project-summary" id="overview">
        <div className="shell">
          <div className="project-tldr reveal"><strong>TL;DR:</strong> V-RAE turns frozen visual representations into video generative latents—preserving semantics under temporal compression while supporting competitive reconstruction, better generation, faster optimization, and future prediction.</div>
          <div className="key-point-list reveal">
            <article><i aria-hidden="true">◎</i><p><strong>Semantic preservation.</strong> V-RAE retains substantially richer task-relevant information than conventional VAE latents, reaching 90.92% on UCF101, 72.91% on SSv2, and 83.12% on K400 after temporal compression.</p></article>
            <article><i aria-hidden="true">✦</i><p><strong>Better and faster generation.</strong> Under the same 1,280-token budget, every V-RAE variant improves gFVD over the evaluated VAE latent spaces, with up to 3× faster convergence on UCF101 and 6× on K600.</p></article>
            <article><i aria-hidden="true">∿</i><p><strong>Reconstruction is not the whole story.</strong> rFVD and gFVD produce markedly different tokenizer rankings, while tFVD better captures temporal smoothness and decoder robustness along off-trajectory latent states.</p></article>
            <article><i aria-hidden="true">→</i><p><strong>A predictive state space.</strong> The same semantic latent interface supports future-state prediction and pixel reconstruction, reducing structural and identity drift on Cityscapes.</p></article>
          </div>
          <nav className="jump-nav" aria-label="Project sections">
            <a href="#method"><i aria-hidden="true">⇲</i><span>Method</span></a>
            <a href="#results"><i aria-hidden="true">◇</i><span>Overview</span></a>
            <a href="#reconstruction"><i aria-hidden="true">▣</i><span>Reconstruction</span></a>
            <a href="#semantics"><i aria-hidden="true">◎</i><span>Semantics</span></a>
            <a href="#videos"><i aria-hidden="true">✦</i><span>Generation</span></a>
            <a href="#prediction"><i aria-hidden="true">→</i><span>Prediction</span></a>
          </nav>
          <p className="jump-hint">Select a topic to jump to the corresponding section.</p>
        </div>
      </section>

      <section className="section method" id="method">
        <div className="shell">
          <SectionHeader index="01" eyebrow="Method" title="Video Representation Autoencoder (V-RAE)" copy="A frozen visual representation encoder supplies semantic structure. Temporal attention pooling removes temporal redundancy, and a chunk-wise causal decoder reconstructs continuous motion." />
          <figure className="paper-figure method-figure reveal">
            <img src="/assets/V-RAE-2.webp" alt="V-RAE architecture with a frozen visual representation encoder, temporal pooling and causal video decoder" />
            <figcaption><span>Figure 2</span> V-RAE architecture. Only the temporal pooling module and decoder are trained.</figcaption>
          </figure>
          <div className="method-steps reveal">
            <article><span>01</span><b>Frozen representation</b><p>DINOv3 · SigLIP2 · EUPE · V-JEPA 2.1</p></article>
            <article><span>02</span><b>Temporal pooling</b><p>Dense features → 4× temporally compressed latent sequence</p></article>
            <article><span>03</span><b>Causal decoding</b><p>3D RoPE · chunk-wise history · multi-frame output</p></article>
          </div>
          <div className="encoder-strip reveal" aria-label="Supported frozen encoders">
            <span>Image-native</span><b>DINOv3</b><b>SigLIP2</b><b>EUPE</b><i />
            <span>Video-native</span><b>V-JEPA 2.1</b>
          </div>
        </div>
      </section>

      <section className="section overview-section" id="results">
        <div className="shell">
          <SectionHeader index="02" eyebrow="Overview" title="One representation space for reconstruction, generation, and prediction" copy="V-RAE studies whether frozen visual representations can define a video latent space that remains reconstructive, semantic, generative, and predictive under matched downstream settings." />
          <div className="thesis-callout reveal">
            <span>Research question</span>
            <p>The best latent space for <em>reconstruction</em> is not necessarily the best one for <strong>generation.</strong></p>
          </div>
          <figure className="paper-figure overview-frame reveal">
            <img src="/assets/V-RAE-overall.webp" alt="Radar comparison and K600 gFVD convergence curves" />
            <figcaption><span>Figure 1</span> <b>V-RAE overview.</b> Left: normalized comparison of reconstruction, generation, compression, and semantic performance across representative video tokenizers. Right: gFVD convergence on K600 under matched training settings.</figcaption>
          </figure>
          <div className="result-principles advantage-grid reveal">
            <div>
              <div className="advantage-top"><span>01</span><i aria-hidden="true">◎</i></div>
              <strong>Semantic</strong>
              <p>Up to 90.92% UCF101, 72.91% SSv2, and 83.12% K400 probing accuracy.</p>
            </div>
            <div>
              <div className="advantage-top"><span>02</span><i aria-hidden="true">✦</i></div>
              <strong>Generative</strong>
              <p>118.32 UCF101 gFVD and 20.47 K600 gFVD with V-JEPA 2.1.</p>
            </div>
            <div>
              <div className="advantage-top"><span>03</span><i aria-hidden="true">↗</i></div>
              <strong>Training efficiency</strong>
              <p>Up to 3× faster convergence on UCF101 and 6× faster on K600.</p>
            </div>
            <div>
              <div className="advantage-top"><span>04</span><i aria-hidden="true">▣</i></div>
              <strong>Reconstruction</strong>
              <p>6.86 UCF101 rFVD and 2.67 K600 rFVD with V-JEPA 2.1.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section reconstruction" id="reconstruction">
        <div className="shell">
          <SectionHeader index="03" eyebrow="Reconstruction" title="Reconstructing videos from semantic latents" copy="V-RAE with V-JEPA 2.1 achieves 6.86 rFVD on UCF101 and 2.67 rFVD on K600. The table reports all evaluated video tokenizer baselines under the paper's reconstruction protocol." />
          <div className="section-points reveal">
            <p><strong>Competitive video reconstruction.</strong> Frozen semantic representations can recover continuous video without re-optimizing the encoder for low-level pixels.</p>
            <p><strong>Video pretraining helps.</strong> V-JEPA 2.1 provides the strongest V-RAE reconstruction results on both datasets, suggesting that native spatiotemporal priors are especially useful for decoding motion.</p>
          </div>
          <div className="case-toolbar reveal">
            <div><span>Reconstruction case</span>{reconstructionCases.map((item) => <button className={reconCase === item ? "active" : ""} key={item} onClick={() => setReconCase(item)}>0{item}</button>)}</div>
            <p>All videos share the same 8 FPS timeline.</p>
          </div>
          <div className="reveal"><SyncVideoGrid videos={reconstructionVideos(reconCase)} compact /></div>
          <div className="reconstruction-table-single">
            <MetricTable title="Reconstruction fidelity" rows={reconstructionRows} labels={["UCF101 rFVD", "K600 rFVD"]} />
          </div>
        </div>
      </section>

      <section className="section semantics" id="semantics">
        <div className="shell shell-wide">
          <SectionHeader index="04" eyebrow="Semantic probing" title="Semantic information after temporal compression" copy="The charts report every value from the paper's probing table: single-clip and test-time-augmentation accuracy on UCF101, Something-Something V2, and Kinetics-400 for frozen encoders, V-RAE variants, and VAE-based tokenizers." />
          <div className="section-points reveal">
            <p><strong>Large margins over VAE latents.</strong> Temporally compressed V-RAE features remain highly discriminative, while conventional reconstruction latents retain far less semantic information.</p>
            <p><strong>Compression preserves encoder character.</strong> The relative strengths of DINOv3, EUPE, SigLIP2, and V-JEPA 2.1 remain visible after compression across action and motion-centric benchmarks.</p>
          </div>
          <SemanticProbeChart />
          <p className="probe-note reveal">All probes operate on the same compressed patch tokens used for downstream generation. V-RAE retains the semantic structure of its frozen encoder while using a 4× temporal compression ratio.</p>
        </div>
      </section>

      <section className="section generation" id="videos">
        <div className="shell shell-wide">
          <SectionHeader index="05" eyebrow="Class-conditional generation" title="Better generation targets, learned faster" copy="Under the same 1,280-token budget, every V-RAE variant outperforms the evaluated conventional video tokenizer latent spaces on both datasets." />
          <div className="section-points reveal">
            <p><strong>Semantic structure improves the target distribution.</strong> The generator can focus on how objects and actions evolve instead of rediscovering scene semantics from reconstruction-oriented codes.</p>
            <p><strong>V-JEPA 2.1 is strongest overall.</strong> It reaches 118.32 gFVD on UCF101 and 20.47 on K600, while V-RAE variants consistently improve over the evaluated VAE baselines.</p>
          </div>
          <div className="generation-toolbar reveal">
            <div className="segmented" aria-label="Dataset">
              {(Object.keys(generationData) as (keyof typeof generationData)[]).map((item) => <button key={item} className={dataset === item ? "active" : ""} onClick={() => switchDataset(item)}>{item}</button>)}
            </div>
            <div className="case-tabs" aria-label="Video case">
              {generationData[dataset].cases.map((item) => <button key={item} className={caseName === item ? "active" : ""} onClick={() => setCaseName(item)}>{item}</button>)}
            </div>
          </div>
          <div className="reveal"><SyncVideoGrid videos={[...activeGenerationVideos]} /></div>
          <div className="generation-evidence generation-evidence-single">
            <MetricTable title="Controlled generation" rows={generationRows} labels={["UCF101 gFVD", "K600 gFVD"]} />
          </div>
          <div className="chart-pair convergence-pair">
            <figure className="paper-figure reveal"><img src="/assets/ucf101_convergence.webp" alt="UCF101 convergence curve" /><figcaption><span>UCF101</span> V-RAE reaches the Wan2.2 endpoint in roughly one third of the updates.</figcaption></figure>
            <figure className="paper-figure reveal"><img src="/assets/k600_convergence.webp" alt="K600 convergence curve" /><figcaption><span>K600</span> V-RAE reaches matched quality with up to six times fewer training updates.</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="section tfvd" id="tfvd">
        <div className="shell">
          <SectionHeader index="06" eyebrow="A generation-oriented diagnostic" title="Measure the path, not only the endpoints" copy="tFVD replaces interior latent codes with local temporal midpoints, then asks whether the decoder can still recover plausible, coherent motion." />
          <div className="section-points reveal">
            <p><strong>rFVD tests encoded inputs.</strong> It does not reveal whether the decoder remains stable when generated latents deviate from the exact encoding trajectory.</p>
            <p><strong>tFVD probes the latent path.</strong> Temporal interpolation directly stresses local smoothness and decoder robustness, producing a much stronger correlation with downstream gFVD.</p>
          </div>
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

      <section className="section prediction" id="prediction">
        <div className="shell">
          <SectionHeader index="07" eyebrow="Future video prediction" title="A latent space that can imagine what comes next" copy="With the same conditional DiT and training budget on Cityscapes, V-RAE better preserves scene geometry, object identity, and motion trajectories over longer prediction horizons." />
          <div className="section-points reveal">
            <p><strong>Predict semantics, then render pixels.</strong> The predictor learns transitions between structured visual states while the V-RAE decoder maps those predicted states back to video.</p>
            <p><strong>Temporal geometry matters more than rFVD.</strong> Despite weaker reconstruction fidelity on this setting, V-RAE achieves lower tFVD and substantially better future-video gFID and gFVD.</p>
          </div>
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
            <div className="authors-card reveal"><p>Minghui Guo<sup>1</sup> · Shengqiong Wu<sup>2</sup> · Hao Fei<sup>2</sup> · Saining Xie<sup>3</sup></p><span><sup>1</sup>National University of Singapore</span><span><sup>2</sup>University of Oxford</span><span><sup>3</sup>New York University</span><div><button type="button" disabled>Paper · coming soon</button><button type="button" disabled>Code · coming soon</button></div></div>
            <div className="bib-card reveal"><div><span>BibTeX</span><button type="button" onClick={copyBibtex}>{copied ? "Copied" : "Copy"}</button></div><pre>{bibtex}</pre></div>
          </div>
          <div className="footer-bottom"><p>Semantic representations for reconstruction, generation, and predictive modeling.</p><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>
    </main>
  );
}

export default App;
