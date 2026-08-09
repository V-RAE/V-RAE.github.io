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

type ConvergencePoint = {
  epoch: number;
  step: number;
  value: number;
};

type ConvergenceSeries = {
  id: string;
  label: string;
  color: string;
  tone: "baseline" | "ours";
  precision?: number;
  dashed?: boolean;
  points: ConvergencePoint[];
};

type ConvergenceChartConfig = {
  id: string;
  dataset: string;
  callout: string;
  description: string;
  xDomain: [number, number];
  xTicks: number[];
  yDomain: [number, number];
  yTicks: number[];
  series: ConvergenceSeries[];
};

const ucf101Steps = [14900, 29800, 44700, 59600, 74500, 89400, 104300, 119200, 134100, 149000, 163900, 178800, 193700, 208600, 223500, 238400, 253300];
const ucf101Epochs = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700];
const k600Steps = [29950, 59900, 89850, 119800, 149750, 179700, 209650, 239600, 269550, 299500];
const k600Epochs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const toConvergencePoints = (epochs: number[], steps: number[], values: number[]): ConvergencePoint[] =>
  values.map((value, index) => ({ epoch: epochs[index], step: steps[index], value }));

const convergenceCharts: ConvergenceChartConfig[] = [
  {
    id: "ucf101",
    dataset: "UCF101",
    callout: "3× faster",
    description: "V-RAE reaches the Wan2.2 endpoint in roughly one third of the updates.",
    xDomain: [0, 260000],
    xTicks: [0, 50000, 100000, 150000, 200000, 250000],
    yDomain: [100, 660],
    yTicks: [100, 120, 150, 200, 300, 400, 500, 600],
    series: [
      {
        id: "ucf-wan22",
        label: "Wan2.2 VAE",
        color: "#7797b8",
        tone: "baseline",
        points: toConvergencePoints(ucf101Epochs, ucf101Steps, [631.9060, 370.6140, 249.4950, 231.1220, 192.9940, 189.4470, 180.3070, 173.3700, 170.1280, 155.5040, 172.8370, 163.2060, 167.1360, 171.6186, 170.1494, 154.9262, 154.6387]),
      },
      {
        id: "ucf-vjepa",
        label: "V-RAE · V-JEPA 2.1",
        color: "#7158d8",
        tone: "ours",
        precision: 6,
        points: toConvergencePoints(ucf101Epochs, ucf101Steps, [318.933779, 175.956093, 158.277144, 147.293007, 143.036619, 143.121027, 132.326606, 118.351206, 123.182405, 128.824773, 125.620896, 129.405587, 127.579131, 128.370840, 119.680108, 113.535972, 116.737147]),
      },
      {
        id: "ucf-eupe",
        label: "V-RAE · EUPE",
        color: "#d07b94",
        tone: "ours",
        dashed: true,
        points: toConvergencePoints(ucf101Epochs, ucf101Steps, [211.6650, 175.3448, 159.6103, 148.4071, 144.9620, 140.5791, 138.3065, 142.4587, 147.8766, 142.5727, 138.6105, 137.1149, 137.9371, 134.1573, 139.4276, 131.8692, 130.7163]),
      },
    ],
  },
  {
    id: "k600",
    dataset: "K600",
    callout: "6× faster",
    description: "V-RAE reaches matched quality with up to six times fewer training updates.",
    xDomain: [0, 300000],
    xTicks: [0, 60000, 120000, 180000, 240000, 300000],
    yDomain: [18, 330],
    yTicks: [20, 30, 40, 50, 60, 80, 100, 150, 200, 300],
    series: [
      {
        id: "k600-wan22",
        label: "Wan2.2 VAE",
        color: "#7797b8",
        tone: "baseline",
        points: toConvergencePoints(k600Epochs, k600Steps, [309.3911, 131.0654, 76.2885, 62.1128, 56.3024, 52.2456, 52.8323, 53.5030, 55.2640, 55.9940]),
      },
      {
        id: "k600-wan21",
        label: "Wan2.1 VAE",
        color: "#80b7c4",
        tone: "baseline",
        dashed: true,
        points: toConvergencePoints(k600Epochs, k600Steps, [289.2353, 119.7055, 68.1762, 56.0326, 53.7465, 60.8038, 54.1152, 61.1089, 64.9985, 62.7120]),
      },
      {
        id: "k600-dino",
        label: "V-RAE · DINOv3",
        color: "#a47bd7",
        tone: "ours",
        points: toConvergencePoints(k600Epochs, k600Steps, [70.3807, 50.0727, 40.7085, 37.6106, 36.0881, 36.9475, 33.0657, 32.3397, 30.0936, 30.9560]),
      },
      {
        id: "k600-eupe",
        label: "V-RAE · EUPE",
        color: "#d07b94",
        tone: "ours",
        dashed: true,
        points: toConvergencePoints(k600Epochs, k600Steps, [50.1803, 36.0900, 32.1779, 28.7711, 29.3538, 28.1162, 28.2137, 24.9022, 24.7735, 26.0756]),
      },
      {
        id: "k600-vjepa",
        label: "V-RAE · V-JEPA 2.1",
        color: "#7158d8",
        tone: "ours",
        points: toConvergencePoints(k600Epochs, k600Steps, [54.8919, 36.6819, 31.4293, 30.0105, 28.9572, 25.9165, 22.8577, 20.8918, 20.4670, 21.7715]),
      },
    ],
  },
];

type SemanticProbeRow = {
  model: string;
  compression: string;
  family: "encoder" | "ours" | "vae";
  pair: "dino" | "eupe" | "siglip" | "vjepa" | "vae";
  ucf101: [number, number];
  ssv2: [number, number];
  k400: [number, number];
};

const semanticProbeRows: SemanticProbeRow[] = [
  { model: "DINOv3-L", compression: "1×", family: "encoder", pair: "dino", ucf101: [91.84, 91.84], ssv2: [69.92, 70.21], k400: [86.32, 87.15] },
  { model: "V-RAE · DINOv3-L", compression: "4×", family: "ours", pair: "dino", ucf101: [89.13, 88.94], ssv2: [66.55, 67.19], k400: [83.12, 84.36] },
  { model: "EUPE-B", compression: "1×", family: "encoder", pair: "eupe", ucf101: [93.86, 93.78], ssv2: [67.17, 67.64], k400: [83.53, 84.21] },
  { model: "V-RAE · EUPE-B", compression: "4×", family: "ours", pair: "eupe", ucf101: [90.16, 89.93], ssv2: [65.67, 66.21], k400: [82.21, 83.31] },
  { model: "SigLIP2-L", compression: "1×", family: "encoder", pair: "siglip", ucf101: [94.05, 93.55], ssv2: [68.54, 68.80], k400: [86.00, 86.93] },
  { model: "V-RAE · SigLIP2-L", compression: "4×", family: "ours", pair: "siglip", ucf101: [90.92, 90.88], ssv2: [65.39, 66.08], k400: [82.56, 83.91] },
  { model: "V-JEPA 2.1-L", compression: "2×", family: "encoder", pair: "vjepa", ucf101: [93.02, 92.83], ssv2: [76.58, 77.11], k400: [84.29, 85.20] },
  { model: "V-RAE · V-JEPA 2.1-L", compression: "4×", family: "ours", pair: "vjepa", ucf101: [86.65, 86.65], ssv2: [72.91, 73.50], k400: [80.70, 81.87] },
  { model: "Wan2.2 VAE", compression: "4×", family: "vae", pair: "vae", ucf101: [16.94, 16.29], ssv2: [41.86, 42.62], k400: [46.13, 48.11] },
  { model: "AToken", compression: "4×", family: "vae", pair: "vae", ucf101: [30.83, 30.29], ssv2: [45.05, 45.95], k400: [53.27, 55.32] },
  { model: "CogVideoX VAE", compression: "4×", family: "vae", pair: "vae", ucf101: [14.51, 14.14], ssv2: [37.03, 38.34], k400: [41.59, 43.53] },
];

const semanticDatasets = [
  { key: "ucf101", label: "UCF101", probe: "Linear probe" },
  { key: "ssv2", label: "Something-Something V2", probe: "Attentive probe" },
  { key: "k400", label: "Kinetics-400", probe: "Attentive probe" },
] as const;

const pageSections = [
  { id: "top", label: "Title" },
  { id: "overview", label: "In brief" },
  { id: "method", label: "Method" },
  { id: "results", label: "Overview" },
  { id: "reconstruction", label: "Reconstruction" },
  { id: "semantics", label: "Semantics" },
  { id: "videos", label: "Generation" },
  { id: "tfvd", label: "New Metric (tFVD)" },
  { id: "prediction", label: "Prediction" },
  { id: "citation", label: "BibTeX" },
] as const;

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i /><i /><i />
    </span>
  );
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

function FindingBlock({ index, title, copy }: { index: string; title: string; copy: string }) {
  return (
    <aside className="finding reveal">
      <span>Finding {index}</span>
      <div><h3>{title}</h3><p>{copy}</p></div>
    </aside>
  );
}

function FigureArtwork({ src, alt }: { src: string; alt: string }) {
  return <img className="figure-artwork" src={src} alt={alt} loading="lazy" />;
}

function SyncVideoGrid({ videos, compact = false }: { videos: VideoItem[]; compact?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState(true);
  const baselineVideos = videos.filter((video) => video.tone !== "ours");
  const vraeVideos = videos.filter((video) => video.tone === "ours");

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

  const renderVideoCard = (video: VideoItem) => {
    const index = videos.findIndex((item) => item.src === video.src);
    return (
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
    );
  };

  return (
    <div className="video-explorer" ref={containerRef}>
      <div className="video-masterbar">
        <span className="sync-status"><i className={playing ? "live-dot" : "live-dot paused"} /><b>{playing ? "Synchronized" : "Paused"}</b><small>8 FPS timeline</small></span>
        <div className="playback-actions">
          <button type="button" onClick={playAll}><span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>{playing ? "Pause all" : "Play all"}</button>
          <button type="button" onClick={restart}><span aria-hidden="true">↻</span>Restart</button>
        </div>
      </div>
      {compact ? (
        <div className="video-grid video-grid--compact">{videos.map(renderVideoCard)}</div>
      ) : (
        <div className="video-comparison-groups">
          <section className="video-group video-group--baselines" aria-label="Reference baseline videos">
            <header className="video-group-header"><span>Reference baselines</span><small>3 latent spaces</small></header>
            <div className="video-grid video-grid--baselines">{baselineVideos.map(renderVideoCard)}</div>
          </section>
          <section className="video-group video-group--ours" aria-label="V-RAE variant videos">
            <header className="video-group-header"><span>V-RAE variants</span><small>4 frozen visual encoders</small></header>
            <div className="video-grid video-grid--ours">{vraeVideos.map(renderVideoCard)}</div>
          </section>
        </div>
      )}
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
  const settings = [
    { label: "Single clip", detail: "One clip per video", valueIndex: 0 },
    { label: "Test-time augmentation", detail: "TTA", valueIndex: 1 },
  ] as const;

  const formatDelta = (value: number) => `${value > 0 ? "+" : value < 0 ? "−" : ""}${Math.abs(value).toFixed(2)} pp`;

  return (
    <div className="semantic-comparison reveal">
      {settings.map((setting, settingIndex) => (
        <article className="retention-chart" key={setting.label}>
          <header className="retention-chart-header">
            <div>
              <p>Evaluation {String(settingIndex + 1).padStart(2, "0")}</p>
              <h3>{setting.label}</h3>
            </div>
            <span>{setting.detail} · Top-1 accuracy (%) ↑</span>
          </header>
          <div className="retention-legend" aria-label="Representation legend">
            <span><i className="encoder" />Original encoder</span>
            <span><i className="ours" />V-RAE · 4× compressed</span>
            <span><i className="vae" />VAE tokenizer</span>
            <span className="delta-key">Δ = V-RAE − encoder</span>
          </div>
          <div className="retention-scroll">
            <div className="retention-table" role="table" aria-label={`${setting.label} semantic probing comparison`}>
              <div className="retention-table-head" role="row">
                <span role="columnheader">Representation</span>
                {semanticDatasets.map((dataset) => (
                  <span role="columnheader" key={dataset.key}>
                    <strong>{dataset.label}</strong>
                    <small>{dataset.probe}</small>
                    <i aria-hidden="true"><b>0</b><b>50</b><b>100</b></i>
                  </span>
                ))}
              </div>
              <div className="retention-rows" role="rowgroup">
                {semanticProbeRows.map((row, rowIndex) => (
                  <div className={`retention-row ${row.family} pair-${row.pair}`} role="row" key={row.model}>
                    <div className="retention-model" role="rowheader">
                      <i aria-hidden="true" />
                      <span>{row.model}</span>
                      <small>{row.family === "encoder" ? "Encoder" : row.family === "ours" ? "V-RAE" : "VAE"} · {row.compression}</small>
                    </div>
                    {semanticDatasets.map((dataset) => {
                      const value = row[dataset.key][setting.valueIndex];
                      const encoderValue = row.family === "ours" ? semanticProbeRows[rowIndex - 1][dataset.key][setting.valueIndex] : null;
                      const delta = encoderValue === null ? null : value - encoderValue;
                      return (
                        <div className="retention-cell" role="cell" key={dataset.key} aria-label={`${row.model}, ${dataset.label}: ${value.toFixed(2)} percent${delta === null ? "" : `, change from encoder ${formatDelta(delta)}`}`}>
                          <div className="retention-track">
                            <i className="retention-fill" style={{ "--probe-value": `${value}%` } as React.CSSProperties} />
                            <b>{value.toFixed(2)}{delta !== null && <em className={delta >= 0 ? "gain" : "loss"}>Δ {formatDelta(delta)}</em>}</b>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

type ActiveConvergencePoint = {
  key: string;
  seriesId: string;
  label: string;
  color: string;
  tone: "baseline" | "ours";
  precision: number;
  point: ConvergencePoint;
  x: number;
  y: number;
};

function InteractiveConvergenceChart({ config }: { config: ConvergenceChartConfig }) {
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<ActiveConvergencePoint | null>(null);
  const [pinnedPoint, setPinnedPoint] = useState<ActiveConvergencePoint | null>(null);

  const width = 720;
  const height = 430;
  const margin = { top: 30, right: 18, bottom: 58, left: 64 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const [xMin, xMax] = config.xDomain;
  const [yMin, yMax] = config.yDomain;
  const logMin = Math.log(yMin);
  const logRange = Math.log(yMax) - logMin;
  const xScale = (step: number) => margin.left + ((step - xMin) / (xMax - xMin)) * plotWidth;
  const yScale = (value: number) => margin.top + ((Math.log(yMax) - Math.log(value)) / logRange) * plotHeight;
  const visibleSeries = config.series.filter((series) => !hiddenSeries.includes(series.id));
  const activePoint = pinnedPoint ?? hoveredPoint;

  const toggleSeries = (seriesId: string) => {
    const currentlyVisible = !hiddenSeries.includes(seriesId);
    if (currentlyVisible && visibleSeries.length === 1) return;
    setHiddenSeries((current) => currentlyVisible ? [...current, seriesId] : current.filter((id) => id !== seriesId));
    if (activePoint?.seriesId === seriesId) {
      setHoveredPoint(null);
      setPinnedPoint(null);
    }
  };

  const pinPoint = (point: ActiveConvergencePoint) => {
    setPinnedPoint((current) => current?.key === point.key ? null : point);
    setHoveredPoint(point);
  };

  return (
    <article className="interactive-convergence-card reveal">
      <header className="convergence-chart-header">
        <div>
          <p>Optimization trajectory</p>
          <h3>{config.dataset}</h3>
        </div>
        <div className="convergence-callout"><strong>{config.callout}</strong><span>fewer updates</span></div>
      </header>
      <div className="convergence-chart-meta">
        <span><i /> Interactive checkpoints</span>
        <span>Log gFVD scale · lower is better</span>
      </div>
      <div className="convergence-chart-legend" aria-label={`${config.dataset} methods`}>
        {config.series.map((series) => {
          const visible = !hiddenSeries.includes(series.id);
          return (
            <button
              type="button"
              className={`${visible ? "" : "is-muted"} ${series.tone}`}
              aria-pressed={visible}
              onClick={() => toggleSeries(series.id)}
              key={series.id}
            >
              <i style={{ "--series-color": series.color } as React.CSSProperties} />
              <span>{series.label}</span>
              {series.tone === "ours" && <b>Ours</b>}
            </button>
          );
        })}
      </div>
      <div className="convergence-plot" onPointerLeave={() => setHoveredPoint(null)}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${config.dataset} gFVD over training steps. Select a checkpoint to inspect its exact value.`}
          onClick={() => setPinnedPoint(null)}
        >
          <title>{config.dataset} interactive gFVD convergence chart</title>
          <defs>
            <linearGradient id={`${config.id}-surface`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8e76e8" stopOpacity="0.13" />
              <stop offset="100%" stopColor="#8e76e8" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g className="convergence-grid" aria-hidden="true">
            {config.yTicks.map((tick) => {
              const y = yScale(tick);
              return (
                <g key={tick}>
                  <line x1={margin.left} x2={width - margin.right} y1={y} y2={y} />
                  <text x={margin.left - 14} y={y + 4} textAnchor="end">{tick}</text>
                </g>
              );
            })}
            {config.xTicks.map((tick) => {
              const x = xScale(tick);
              return (
                <g key={tick}>
                  <line x1={x} x2={x} y1={margin.top} y2={height - margin.bottom} />
                  <text x={x} y={height - margin.bottom + 24} textAnchor="middle">{tick === 0 ? "0" : `${Math.round(tick / 1000)}k`}</text>
                </g>
              );
            })}
          </g>

          <line className="convergence-axis" x1={margin.left} x2={margin.left} y1={margin.top} y2={height - margin.bottom} />
          <line className="convergence-axis" x1={margin.left} x2={width - margin.right} y1={height - margin.bottom} y2={height - margin.bottom} />
          <text className="convergence-axis-title" x={margin.left + plotWidth / 2} y={height - 10} textAnchor="middle">Training steps</text>
          <text className="convergence-axis-title" x={16} y={margin.top + plotHeight / 2} textAnchor="middle" transform={`rotate(-90 16 ${margin.top + plotHeight / 2})`}>gFVD ↓</text>

          {visibleSeries.map((series) => {
            const path = series.points.map((point, index) => `${index === 0 ? "M" : "L"} ${xScale(point.step).toFixed(2)} ${yScale(point.value).toFixed(2)}`).join(" ");
            return (
              <g className={`convergence-series ${series.tone}`} key={series.id}>
                {series.tone === "ours" && <path className="convergence-line-glow" d={path} stroke={series.color} />}
                <path className="convergence-line" d={path} stroke={series.color} strokeDasharray={series.dashed ? "8 7" : undefined} pathLength="1" />
                {series.points.map((point) => {
                  const x = xScale(point.step);
                  const y = yScale(point.value);
                  const key = `${series.id}-${point.step}`;
                  const selected = activePoint?.key === key;
                  const precision = series.precision ?? 4;
                  const interactivePoint: ActiveConvergencePoint = { key, seriesId: series.id, label: series.label, color: series.color, tone: series.tone, precision, point, x, y };
                  return (
                    <g
                      className={`convergence-point ${selected ? "is-active" : ""}`}
                      role="button"
                      tabIndex={0}
                      aria-label={`${series.label}, epoch ${point.epoch}, step ${point.step.toLocaleString()}, gFVD ${point.value.toFixed(precision)}`}
                      onPointerEnter={() => setHoveredPoint(interactivePoint)}
                      onFocus={() => setHoveredPoint(interactivePoint)}
                      onBlur={() => setHoveredPoint(null)}
                      onClick={(event) => { event.stopPropagation(); pinPoint(interactivePoint); }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          pinPoint(interactivePoint);
                        }
                      }}
                      key={key}
                    >
                      <circle className="convergence-point-halo" cx={x} cy={y} r={selected ? 10 : 8} stroke={series.color} />
                      <circle className="convergence-point-dot" cx={x} cy={y} r={selected ? 4.8 : 3.7} fill={series.color} />
                      <circle className="convergence-point-hit" cx={x} cy={y} r="13" />
                    </g>
                  );
                })}
              </g>
            );
          })}

          {activePoint && (
            <g className="convergence-crosshair" aria-hidden="true">
              <line x1={activePoint.x} x2={activePoint.x} y1={margin.top} y2={height - margin.bottom} />
              <line x1={margin.left} x2={width - margin.right} y1={activePoint.y} y2={activePoint.y} />
            </g>
          )}
        </svg>

        {activePoint && (
          <div
            className={`convergence-tooltip ${activePoint.x > width * 0.67 ? "is-right" : ""} ${activePoint.y < height * 0.32 ? "is-top" : ""} ${pinnedPoint ? "is-pinned" : ""}`}
            style={{ left: `${(activePoint.x / width) * 100}%`, top: `${(activePoint.y / height) * 100}%`, "--series-color": activePoint.color } as React.CSSProperties}
            role="status"
          >
            <div className="convergence-tooltip-title"><i /><strong>{activePoint.label}</strong>{activePoint.tone === "ours" && <b>Ours</b>}</div>
            <div className="convergence-tooltip-value"><span>gFVD</span><strong>{activePoint.point.value.toFixed(activePoint.precision)}</strong></div>
            <dl><div><dt>Epoch</dt><dd>{activePoint.point.epoch}</dd></div><div><dt>Step</dt><dd>{activePoint.point.step.toLocaleString()}</dd></div></dl>
            {pinnedPoint && <button type="button" aria-label="Close checkpoint details" onClick={() => setPinnedPoint(null)}>×</button>}
          </div>
        )}
      </div>
      <footer className="convergence-chart-footer">
        <p><strong>{config.dataset}</strong>{config.description}</p>
        <span>{pinnedPoint ? "Checkpoint pinned" : "Hover or click a point"}</span>
      </footer>
    </article>
  );
}

function App() {
  const [dataset, setDataset] = useState<keyof typeof generationData>("K600");
  const [caseName, setCaseName] = useState<string>("Surfing");
  const [reconCase, setReconCase] = useState<number>(1);
  const [metric, setMetric] = useState<"rFVD" | "tFVD">("tFVD");
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<(typeof pageSections)[number]["id"]>("top");

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

      const readingLine = window.innerHeight * 0.34;
      let nextSection: (typeof pageSections)[number]["id"] = "top";
      pageSections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= readingLine) nextSection = id;
      });
      setActiveSection(nextSection);
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

  const activeSectionIndex = Math.max(0, pageSections.findIndex(({ id }) => id === activeSection));
  const tocOnDark = activeSection === "top" || activeSection === "citation";

  return (
    <main>
      <nav className={`floating-toc ${tocOnDark ? "is-dark" : ""}`} aria-label="Page contents">
        <div className="floating-toc-head">
          <span>Contents</span>
          <b>{String(activeSectionIndex + 1).padStart(2, "0")}</b>
        </div>
        <div className="floating-toc-list">
          <div className="floating-toc-progress" aria-hidden="true"><i style={{ height: `${((activeSectionIndex + 1) / pageSections.length) * 100}%` }} /></div>
          {pageSections.map(({ id, label }, index) => (
            <a className={activeSection === id ? "active" : ""} href={`#${id}`} key={id} aria-current={activeSection === id ? "location" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{label}</strong>
            </a>
          ))}
        </div>
      </nav>
      <header className="paper-hero" id="top">
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
            <a href="#tfvd"><i aria-hidden="true">∿</i><span>New Metric (tFVD)</span></a>
            <a href="#prediction"><i aria-hidden="true">→</i><span>Prediction</span></a>
          </nav>
          <p className="jump-hint">Select a topic to jump to the corresponding section.</p>
        </div>
      </section>

      <section className="section method" id="method">
        <div className="shell">
          <SectionHeader index="01" eyebrow="Method" title="Video Representation Autoencoder (V-RAE)" copy="A frozen visual representation encoder supplies semantic structure. Temporal attention pooling removes temporal redundancy, and a chunk-wise causal decoder reconstructs continuous motion." />
          <figure className="paper-figure method-figure reveal">
            <FigureArtwork src="/assets/V-RAE-2.svg" alt="V-RAE architecture with a frozen visual representation encoder, temporal pooling and causal video decoder" />
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
            <FigureArtwork src="/assets/V-RAE-overall.svg" alt="Radar comparison and K600 gFVD convergence curves" />
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
          <div className="case-toolbar reveal">
            <div className="control-group">
              <span className="control-label">Case</span>
              <div className="segmented" aria-label="Reconstruction case">
                {reconstructionCases.map((item) => <button className={reconCase === item ? "active" : ""} key={item} onClick={() => setReconCase(item)}>0{item}</button>)}
              </div>
            </div>
            <p className="control-note"><i /> Synchronized comparison · 8 FPS</p>
          </div>
          <div className="reveal"><SyncVideoGrid videos={reconstructionVideos(reconCase)} compact /></div>
          <div className="reconstruction-table-single">
            <MetricTable title="Reconstruction fidelity" rows={reconstructionRows} labels={["UCF101 rFVD", "K600 rFVD"]} />
          </div>
        </div>
      </section>

      <section className="section semantics" id="semantics">
        <div className="shell shell-wide">
          <SectionHeader index="04" eyebrow="Semantic probing" title="Semantic information after temporal compression" copy="V-RAE preserves the semantic organization inherited from frozen visual encoders despite 4× temporal compression, retaining discriminative information across both appearance- and motion-centric video understanding tasks." />
          <SemanticProbeChart />
          <p className="probe-note reveal">Rows are paired by visual backbone. Δ reports V-RAE minus its corresponding encoder in percentage points; the three muted rows are VAE-based video tokenizers. All V-RAE probes operate on the same 4× temporally compressed patch tokens used for downstream generation.</p>
          <FindingBlock index="01" title="Temporal compression need not erase semantics." copy="The key is not pooling capacity but content-adaptive aggregation: an effective temporal compressor selectively removes temporal redundancy while preserving the semantic structure inherited from the pretrained encoder." />
        </div>
      </section>

      <section className="section generation" id="videos">
        <div className="shell shell-wide">
          <SectionHeader index="05" eyebrow="Class-conditional generation" title="Better generation targets, learned faster" copy="Under the same 1,280-token budget, every V-RAE variant outperforms the evaluated conventional video tokenizer latent spaces on both datasets." />
          <div className="generation-toolbar reveal">
            <div className="control-group">
              <span className="control-label">Dataset</span>
              <div className="segmented" aria-label="Dataset">
                {(Object.keys(generationData) as (keyof typeof generationData)[]).map((item) => <button key={item} className={dataset === item ? "active" : ""} onClick={() => switchDataset(item)}>{item}</button>)}
              </div>
            </div>
            <div className="control-group">
              <span className="control-label">Class</span>
              <div className="case-tabs" aria-label="Video class">
                {generationData[dataset].cases.map((item) => <button key={item} className={caseName === item ? "active" : ""} onClick={() => setCaseName(item)}>{item}</button>)}
              </div>
            </div>
          </div>
          <div className="reveal"><SyncVideoGrid videos={[...activeGenerationVideos]} /></div>
          <div className="generation-evidence generation-evidence-single">
            <MetricTable title="Controlled generation" rows={generationRows} labels={["UCF101 gFVD", "K600 gFVD"]} />
          </div>
          <div className="interactive-convergence-pair">
            {convergenceCharts.map((chart) => <InteractiveConvergenceChart config={chart} key={chart.id} />)}
          </div>
          <FindingBlock index="02" title="Semantic organization makes video generation easier to learn." copy="Semantic latents expose objects, actions, and scene structure to the generator, allowing it to focus on modeling how visual states evolve rather than rediscovering semantics and dynamics from reconstruction-oriented codes." />
        </div>
      </section>

      <section className="section tfvd" id="tfvd">
        <div className="shell">
          <SectionHeader index="06" eyebrow="Temporal Fréchet Video Distance (tFVD)" title="Measuring Temporal Smoothness Beyond Reconstruction" copy="tFVD probes the local alignment between latent trajectories and the temporal manifold of real videos by decoding temporal midpoints and comparing their distribution with real clips." />
          <div className="tfvd-intro">
            <figure className="paper-figure reveal"><FigureArtwork src="/assets/tFVD_method.svg" alt="tFVD computation by temporal latent interpolation" /><figcaption><span>tFVD</span> A controlled stress test of local temporal geometry and decoder stability.</figcaption></figure>
            <div className="metric-switch reveal">
              <p>Correlation with downstream gFVD</p>
              <div className="segmented"><button className={metric === "rFVD" ? "active" : ""} onClick={() => setMetric("rFVD")}>rFVD</button><button className={metric === "tFVD" ? "active" : ""} onClick={() => setMetric("tFVD")}>tFVD</button></div>
              <div className={`correlation-number ${metric === "tFVD" ? "strong" : "weak"}`}><small>K600 Pearson r</small><strong>{metric === "tFVD" ? "0.897" : "0.234"}</strong><span>{metric === "tFVD" ? "Strong signal" : "Weak signal"}</span></div>
              <p className="metric-explain">{metric === "tFVD" ? "Temporal interpolation consistency closely predicts which latent spaces are easier to generate." : "Reconstruction fidelity alone produces a markedly different ranking from generation quality."}</p>
            </div>
          </div>
          <figure className="paper-figure correlation-figure reveal">
            <FigureArtwork src="/assets/fvd_metric_correlations_1x4.svg" alt="Correlation plots comparing rFVD and tFVD against gFVD on UCF101 and K600" />
            <figcaption><span>Metric correlation</span> tFVD improves Pearson correlation from 0.115 to 0.635 on UCF101 and from 0.234 to 0.897 on K600.</figcaption>
          </figure>
          <FindingBlock index="03" title="Generation-friendly latents require more than reconstruction fidelity." copy="A good video latent must remain temporally smooth and decodable under prediction errors. tFVD probes this latent temporal smoothness and decoder robustness more directly than rFVD." />
        </div>
      </section>

      <section className="section prediction" id="prediction">
        <div className="shell">
          <SectionHeader index="07" eyebrow="Predictive modeling" title="Future Video Prediction in Semantic Latent Space" copy="With the same conditional DiT and training budget on Cityscapes, V-RAE better preserves scene geometry, object identity, and motion trajectories over longer prediction horizons." />
          <div className="prediction-metrics reveal">
            <div><span>gFID ↓</span><del>15.02</del><strong>11.52</strong></div>
            <div><span>gFVD ↓</span><del>144.47</del><strong>111.36</strong></div>
            <p>Only the latent representation changes.</p>
          </div>
          <figure className="paper-figure world-figure reveal"><FigureArtwork src="/assets/world_modeling.svg" alt="Future video prediction comparison on a Cityscapes traffic scene" /><figcaption><span>Cityscapes</span> V-RAE reduces structural and identity drift at X(t+4), X(t+8), and X(t+12).</figcaption></figure>
          <figure className="paper-figure world-figure reveal"><FigureArtwork src="/assets/world_modeling_2.svg" alt="Future video prediction comparison on a Cityscapes pedestrian scene" /><figcaption><span>Second scene</span> Pedestrians, bicycles, lane structure, and instance separation remain more coherent.</figcaption></figure>
          <div className="world-table reveal"><table><thead><tr><th>Latent space</th><th>rFVD ↓</th><th>tFVD ↓</th><th>gFID ↓</th><th>gFVD ↓</th></tr></thead><tbody><tr><td>Wan2.2 VAE</td><td>7.03</td><td>319.02</td><td>15.02</td><td>144.47</td></tr><tr className="ours-row"><td>V-RAE · EUPE <span className="mini-ours">ours</span></td><td>29.29</td><td><b>224.60</b></td><td><b>11.52</b></td><td><b>111.36</b></td></tr></tbody></table></div>
          <FindingBlock index="04" title="Semantic latents form a directly decodable predictive state space." copy="A predictor learns transitions between semantic states, while the same frozen decoder renders predicted states into pixels, unifying future-state prediction and visual reconstruction within a single latent interface." />
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
