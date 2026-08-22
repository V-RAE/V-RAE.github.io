"use client";

import { useEffect, useState } from "react";

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
  ["V-RAE · DINOv3", "6.12", "2.76"],
  ["V-RAE · EUPE", "8.05", "3.36"],
  ["V-RAE · SigLIP2", "9.83", "3.38"],
  ["V-RAE · V-JEPA 2.1", "6.65", "2.13"],
];

const generationRows = [
  ["Wan2.1 VAE", "148.20", "53.75"],
  ["Wan2.2 VAE", "154.64", "52.25"],
  ["HunyuanVideo VAE", "211.53", "53.28"],
  ["CogVideoX VAE", "159.20", "51.83"],
  ["Cosmos VAE", "152.70", "41.66"],
  ["AToken", "143.00", "46.74"],
  ["V-RAE · DINOv3", "131.40", "30.09"],
  ["V-RAE · SigLIP2", "142.60", "34.48"],
  ["V-RAE · EUPE", "125.98", "24.77"],
  ["V-RAE · V-JEPA 2.1", "117.86", "19.16"],
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
  dotColor?: string;
  tone: "baseline" | "ours";
  precision?: number;
  dashed?: boolean;
  points: ConvergencePoint[];
};

type ConvergenceChartConfig = {
  id: string;
  dataset: string;
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
    description: "V-JEPA 2.1 reaches comparable quality to the Wan2.2 150K checkpoint in roughly 30K updates.",
    xDomain: [5000, 260000],
    xTicks: [25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 225000, 250000],
    yDomain: [100, 650],
    yTicks: [100, 120, 150, 200, 300, 400, 500, 600],
    series: [
      {
        id: "ucf-wan22",
        label: "Wan2.2 VAE",
        color: "#4C78A8",
        dotColor: "#274E75",
        tone: "baseline",
        precision: 2,
        points: toConvergencePoints(ucf101Epochs, ucf101Steps, [631.9060, 370.6140, 249.4950, 231.1220, 192.9940, 189.4470, 180.3070, 173.3700, 170.1280, 155.5040, 172.8370, 163.2060, 167.1360, 171.6186, 170.1494, 154.9262, 154.64]),
      },
      {
        id: "ucf-vjepa",
        label: "V-RAE (V-JEPA2.1)",
        color: "#B95748",
        dotColor: "#7F2F28",
        tone: "ours",
        precision: 2,
        points: toConvergencePoints(ucf101Epochs, ucf101Steps, [240.66, 160.03, 141.71, 131.76, 127.69, 121.76, 126.21, 131.13, 126.93, 122.58, 125.40, 132.07, 128.37, 120.84, 122.16, 119.79, 117.86]),
      },
      {
        id: "ucf-eupe",
        label: "V-RAE (EUPE)",
        color: "#E67E51",
        dotColor: "#A9432A",
        tone: "ours",
        dashed: true,
        points: toConvergencePoints(ucf101Epochs, ucf101Steps, [211.6650, 175.3448, 159.6103, 148.4071, 144.9620, 140.5791, 138.3065, 142.4587, 147.8766, 142.5727, 138.6105, 137.1149, 137.9371, 134.1573, 139.4276, 131.8692, 130.7163]),
      },
    ],
  },
  {
    id: "k600",
    dataset: "K600",
    description: "V-RAE reaches matched quality with up to six times fewer training updates.",
    xDomain: [15000, 315000],
    xTicks: [30000, 60000, 90000, 120000, 150000, 180000, 210000, 240000, 270000, 300000],
    yDomain: [18, 340],
    yTicks: [20, 30, 40, 50, 60, 80, 100, 150, 200, 300],
    series: [
      {
        id: "k600-wan22",
        label: "Wan2.2 VAE",
        color: "#4C78A8",
        dotColor: "#274E75",
        tone: "baseline",
        points: toConvergencePoints(k600Epochs, k600Steps, [309.3911, 131.0654, 76.2885, 62.1128, 56.3024, 52.2456, 52.8323, 53.5030, 55.2640, 55.9940]),
      },
      {
        id: "k600-wan21",
        label: "Wan2.1 VAE",
        color: "#72A6BF",
        dotColor: "#356B83",
        tone: "baseline",
        dashed: true,
        points: toConvergencePoints(k600Epochs, k600Steps, [289.2353, 119.7055, 68.1762, 56.0326, 53.7465, 60.8038, 54.1152, 61.1089, 64.9985, 62.7120]),
      },
      {
        id: "k600-dino",
        label: "V-RAE (DINOv3)",
        color: "#F2A65A",
        dotColor: "#A85D1C",
        tone: "ours",
        points: toConvergencePoints(k600Epochs, k600Steps, [70.3807, 50.0727, 40.7085, 37.6106, 36.0881, 36.9475, 33.0657, 32.3397, 30.0936, 30.9560]),
      },
      {
        id: "k600-eupe",
        label: "V-RAE (EUPE)",
        color: "#E67E51",
        dotColor: "#A9432A",
        tone: "ours",
        dashed: true,
        points: toConvergencePoints(k600Epochs, k600Steps, [50.1803, 36.0900, 32.1779, 28.7711, 29.3538, 28.1162, 28.2137, 24.9022, 24.7735, 26.0756]),
      },
      {
        id: "k600-vjepa",
        label: "V-RAE (V-JEPA2.1)",
        color: "#B95748",
        dotColor: "#7F2F28",
        tone: "ours",
        precision: 2,
        points: toConvergencePoints(k600Epochs, k600Steps, [48.8347, 32.6255, 25.6621, 25.6707, 23.6349, 22.5861, 22.2111, 20.6844, 19.5189, 19.1589]),
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
      <h2 className="section-label"><span>{index}</span>{eyebrow}</h2>
      <p className="section-intro">{title}</p>
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

function DemoGif({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="demo-gif reveal">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </figure>
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
    { label: "Single clip", shortLabel: "Single clip", detail: "One clip per video", valueIndex: 0 },
    { label: "Test-time augmentation", shortLabel: "TTA", detail: "Test-time augmentation", valueIndex: 1 },
  ] as const;

  const [activeSettingIndex, setActiveSettingIndex] = useState(0);
  const formatDelta = (value: number) => `${value > 0 ? "+" : value < 0 ? "−" : ""}${Math.abs(value).toFixed(2)} pp`;

  return (
    <div className="semantic-comparison reveal">
      <div className="case-toolbar semantic-toolbar">
        <div className="control-group">
          <span className="control-label">Evaluation</span>
          <div className="segmented" role="tablist" aria-label="Semantic probing evaluation">
            {settings.map((setting, settingIndex) => (
              <button
                className={settingIndex === activeSettingIndex ? "active" : ""}
                type="button"
                role="tab"
                aria-selected={settingIndex === activeSettingIndex}
                aria-controls={`semantic-evaluation-${settingIndex}`}
                onClick={() => setActiveSettingIndex(settingIndex)}
                key={setting.label}
              >
                {setting.shortLabel}
              </button>
            ))}
          </div>
        </div>
        <p className="control-note"><i aria-hidden="true" />{settings[activeSettingIndex].detail} · Top-1 accuracy (%) ↑</p>
      </div>
      {settings.map((setting, settingIndex) => settingIndex === activeSettingIndex ? (
        <article className="retention-chart" id={`semantic-evaluation-${settingIndex}`} role="tabpanel" aria-label={`${setting.label} semantic probing results`} key={setting.label}>
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
                          <div className="retention-track" aria-hidden="true">
                            <i className="retention-fill" style={{ "--probe-value": `${value}%` } as React.CSSProperties} />
                          </div>
                          <div className="retention-readout">
                            <b>{value.toFixed(2)}</b>
                            {delta !== null && <em className={delta >= 0 ? "gain" : "loss"}>Δ {formatDelta(delta)}</em>}
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
      ) : null)}
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
  const height = 500;
  const margin = { top: 34, right: 20, bottom: 76, left: 82 };
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
        <div className="convergence-callout" aria-label={`${config.dataset === "UCF101" ? "5" : "6"} times faster`}>
          <strong>{config.dataset === "UCF101" ? "5× faster" : "6× faster"}</strong>
          <span>fewer updates</span>
        </div>
      </header>
      <div className="convergence-chart-meta">
        <span><i />Interactive checkpoints</span>
        <span>Log gFVD scale · lower is better</span>
      </div>
      <div className="convergence-chart-legend" aria-label={`${config.dataset} methods`}>
        {config.series.map((series) => {
          const visible = !hiddenSeries.includes(series.id);
          return (
            <button
              type="button"
              className={`${visible ? "" : "is-muted"} ${series.tone} ${series.dashed ? "is-dashed" : ""}`}
              aria-pressed={visible}
              onClick={() => toggleSeries(series.id)}
              key={series.id}
            >
              <i
                style={{
                  "--series-color": series.color,
                  "--series-dot-color": series.dotColor ?? series.color,
                } as React.CSSProperties}
              />
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
                  <text x={x} y={height - margin.bottom + 26} textAnchor="middle">{Math.round(tick / 1000)}</text>
                </g>
              );
            })}
          </g>

          <line className="convergence-axis" x1={margin.left} x2={margin.left} y1={margin.top} y2={height - margin.bottom} />
          <line className="convergence-axis" x1={margin.left} x2={width - margin.right} y1={height - margin.bottom} y2={height - margin.bottom} />
          <text className="convergence-axis-title" x={margin.left + plotWidth / 2} y={height - 16} textAnchor="middle">Training Steps (k)  →</text>
          <text className="convergence-axis-title" x={24} y={margin.top + plotHeight * 0.52} textAnchor="middle" transform={`rotate(-90 24 ${margin.top + plotHeight * 0.52})`}>gFVD</text>
          <text className="convergence-axis-direction" x={39} y={height - margin.bottom - 70} textAnchor="middle">↓</text>

          {visibleSeries.map((series) => {
            const path = series.points.map((point, index) => `${index === 0 ? "M" : "L"} ${xScale(point.step).toFixed(2)} ${yScale(point.value).toFixed(2)}`).join(" ");
            return (
              <g className={`convergence-series ${series.tone}`} key={series.id}>
                {series.tone === "ours" && <path className="convergence-line-glow" d={path} stroke={series.color} />}
                <path className="convergence-line" d={path} stroke={series.color} strokeDasharray={series.dashed ? "12 8" : undefined} />
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
                      <circle
                        className="convergence-point-halo"
                        cx={x}
                        cy={y}
                        r={selected ? 12 : 9.5}
                        stroke="#F1F5F7"
                        style={{ "--point-color": series.color } as React.CSSProperties}
                      />
                      <circle className="convergence-point-dot" cx={x} cy={y} r={selected ? 4.8 : 3.7} fill={series.dotColor ?? series.color} />
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
  const [metric, setMetric] = useState<"rFVD" | "tFVD">("tFVD");
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<(typeof pageSections)[number]["id"]>("top");

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

  const bibtex = `@article{guo2026vrae,
  title   = {V-RAE: Rethinking Video Latent Spaces for Generation},
  author  = {Guo, Minghui and Wu, Shengqiong and Fei, Hao},
  journal = {arXiv preprint arXiv:2608.13556},
  year    = {2026},
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
            <h1>V-RAE</h1>
            <h2>Rethinking Video Latent Spaces for Generation</h2>
            <p className="hero-lede">Introducing V-RAE, a video autoencoder that constructs generative latent spaces directly from frozen visual representations.</p>
            <div className="hero-paper-meta" aria-label="Paper authors and affiliations">
              <p className="paper-authors"><a href="https://guominghui07.github.io/" target="_blank" rel="noreferrer">Minghui Guo<sup>1</sup></a>, <a href="https://sqwu.top/" target="_blank" rel="noreferrer">Shengqiong Wu<sup>2</sup></a>, <a href="https://haofei.vip/" target="_blank" rel="noreferrer">Hao Fei<sup>2</sup></a></p>
              <p className="paper-affiliations"><span><sup>1</sup>National University of Singapore</span><span><sup>2</sup>University of Oxford</span></p>
              <p className="paper-affiliations paper-acknowledgment">We sincerely thank <a href="https://www.sainingxie.com/" target="_blank" rel="noreferrer">Saining Xie</a> for his direct guidance and valuable feedback, which has greatly helped to shape the V-RAE.</p>
            </div>
            <div className="hero-actions hero-resource-actions" aria-label="Project resources">
              <a className="resource-button" href="https://arxiv.org/abs/2608.13556" target="_blank" rel="noreferrer" aria-label="V-RAE paper on arXiv">
                <span className="resource-icon resource-icon-arxiv" aria-hidden="true"><img src="/assets/logo-arxiv-dark.svg" alt="" /></span>
                <span>arXiv</span>
              </a>
              <a className="resource-button" href="https://github.com/V-RAE/V-RAE" target="_blank" rel="noreferrer" aria-label="V-RAE code on GitHub">
                <span className="resource-icon resource-icon-github" aria-hidden="true"><img src="/assets/logo-github.svg" alt="" /></span>
                <span>Code</span>
              </a>
              <a className="resource-button" href="https://huggingface.co/Guomh0707/V-RAE-Models" target="_blank" rel="noreferrer" aria-label="V-RAE models on Hugging Face">
                <span className="resource-icon resource-icon-huggingface" aria-hidden="true"><img src="/assets/logo-huggingface-color.svg" alt="" /></span>
                <span>Models</span>
              </a>
            </div>
          </div>
          <figure className="hero-teaser reveal">
            <img src="/assets/hero-cover.svg" alt="V-RAE teaser showing a structured video representation space" />
          </figure>
        </div>
      </header>

      <section className="project-summary" id="overview">
        <div className="shell">
          <div className="project-tldr reveal"><strong>TL;DR:</strong> V-RAE turns frozen visual representations into video generative latents that preserve semantics under temporal compression while supporting competitive reconstruction, better generation, faster optimization, and future prediction.</div>
          <div className="key-point-list reveal">
            <article><i aria-hidden="true">◎</i><p><strong>Preserves semantics.</strong> Retains pretrained visual structure after 4× temporal compression, reaching 90.92% / 72.91% / 83.12% on UCF101 / SSv2 / K400.</p></article>
            <article><i aria-hidden="true">✦</i><p><strong>Better generation.</strong> Lowers gFVD across all evaluated backbones and converges up to 5× faster on UCF101 and 6× on K600.</p></article>
            <article><i aria-hidden="true">∿</i><p><strong>Beyond reconstruction.</strong> tFVD tracks downstream generation quality more closely than reconstruction FVD.</p></article>
            <article><i aria-hidden="true">→</i><p><strong>Enables prediction.</strong> Supports future-state prediction and pixel decoding with less drift on Cityscapes.</p></article>
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
        </div>
      </section>

      <section className="section method" id="method">
        <div className="shell">
          <SectionHeader index="01" eyebrow="Method" title="Video Representation Autoencoder (V-RAE)" copy="A frozen visual encoder supplies semantic structure, but its frame-level features are temporally redundant and costly for a video generator to model directly. Temporal attention pooling therefore produces a compact latent sequence while preserving informative dynamics, and a chunk-wise causal decoder reconstructs continuous motion from the compressed latents." />
          <figure className="paper-figure method-figure reveal">
            <FigureArtwork src="/assets/V-RAE-2.svg?v=20260813" alt="V-RAE architecture with a frozen visual representation encoder, temporal pooling and causal video decoder" />
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
            <figcaption><span>Figure 1</span> <b>V-RAE overview.</b> Left: normalized reconstruction, generation, compression, and semantic performance across video tokenizers; FVD axes (↓) are reversed so outward is better. Right: K600 gFVD convergence; V-RAE converges up to 6× faster than VAE-based latent spaces.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section reconstruction" id="reconstruction">
        <div className="shell">
          <SectionHeader index="03" eyebrow="Reconstruction" title="Reconstructing videos from semantic latents" copy="V-RAE with DINOv3 achieves 6.12 rFVD on UCF101, while V-JEPA 2.1 reaches 2.13 rFVD on K600. The table reports all evaluated video tokenizer baselines under the paper's reconstruction protocol." />
          <DemoGif
            src="/assets/demos/video-reconstruction-comparison.gif"
            alt="Animated comparison of ground-truth videos with RAEv2, Wan 2.2 VAE, and V-RAE reconstructions"
          />
          <div className="reconstruction-table-single">
            <MetricTable title="Reconstruction fidelity" rows={reconstructionRows} labels={["UCF101 rFVD", "K600 rFVD"]} />
          </div>
        </div>
      </section>

      <section className="section semantics" id="semantics">
        <div className="shell">
          <SectionHeader index="04" eyebrow="Semantic probing" title="Semantic information after temporal compression" copy="V-RAE preserves the semantic organization inherited from frozen visual encoders despite 4× temporal compression, retaining discriminative information across both appearance- and motion-centric video understanding tasks." />
        </div>
        <div className="shell shell-wide">
          <SemanticProbeChart />
          <p className="probe-note reveal">Rows are paired by visual backbone. Δ reports V-RAE minus its corresponding encoder in percentage points; the three muted rows are VAE-based video tokenizers. All V-RAE probes operate on the same 4× temporally compressed patch tokens used for downstream generation.</p>
          <FindingBlock index="01" title="Temporal compression need not erase semantics." copy="The key is not pooling capacity but content-adaptive aggregation: an effective temporal compressor selectively removes temporal redundancy while preserving the semantic structure inherited from the pretrained encoder." />
        </div>
      </section>

      <section className="section generation" id="videos">
        <div className="shell">
          <SectionHeader index="05" eyebrow="Class-conditional generation" title="Semantic latents improve generation quality and accelerate convergence" copy="Under the same 1,280-token budget, every V-RAE variant outperforms the conventional video tokenizer latent spaces on both datasets." />
        </div>
        <div className="shell shell-wide">
          <div className="generation-gifs">
            <DemoGif
              src="/assets/demos/class-conditional-video-generation-k600.gif"
              alt="Animated grid of V-RAE class-conditional video generation examples on Kinetics 600"
            />
            <DemoGif
              src="/assets/demos/class-conditional-video-generation-ucf101.gif"
              alt="Animated grid of V-RAE class-conditional video generation examples on UCF101"
            />
          </div>
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
              <div className={`correlation-number ${metric === "tFVD" ? "strong" : "weak"}`}><small>K600 Pearson r</small><strong>{metric === "tFVD" ? "0.919" : "0.473"}</strong><span>{metric === "tFVD" ? "Strong signal" : "Moderate signal"}</span></div>
              <p className="metric-explain">{metric === "tFVD" ? "Temporal interpolation consistency closely predicts which latent spaces are easier to generate." : "Reconstruction fidelity alone produces a markedly different ranking from generation quality."}</p>
            </div>
          </div>
          <figure className="paper-figure correlation-figure reveal">
            <FigureArtwork src="/assets/fvd_metric_correlations_1x4.svg" alt="Correlation plots comparing rFVD and tFVD against gFVD on UCF101 and K600" />
            <figcaption><span>Metric correlation</span> tFVD improves Pearson correlation from 0.200 to 0.621 on UCF101 and from 0.473 to 0.919 on K600.</figcaption>
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
          <DemoGif
            src="/assets/demos/world-model-future-prediction.gif"
            alt="Animated Cityscapes comparison of ground truth, Wan 2.2 predictions, and V-RAE future video predictions"
          />
          <div className="world-table reveal"><table><thead><tr><th>Latent space</th><th>rFVD ↓</th><th>tFVD ↓</th><th>gFID ↓</th><th>gFVD ↓</th></tr></thead><tbody><tr><td>Wan2.2 VAE</td><td>7.03</td><td>319.02</td><td>15.02</td><td>144.47</td></tr><tr className="ours-row"><td>V-RAE · EUPE <span className="mini-ours">ours</span></td><td>29.29</td><td><b>224.60</b></td><td><b>11.52</b></td><td><b>111.36</b></td></tr></tbody></table></div>
          <FindingBlock index="04" title="Semantic latents form a directly decodable predictive state space." copy="A predictor learns transitions between semantic states, while the same frozen decoder renders predicted states into pixels, unifying future-state prediction and visual reconstruction within a single latent interface." />
        </div>
      </section>

      <footer className="footer" id="citation">
        <div className="footer-glow" aria-hidden="true" />
        <div className="shell">
          <div className="footer-title reveal"><Mark /><p>V-RAE</p><h2>Rethinking Video Latent Spaces for Generation</h2></div>
          <div className="footer-grid">
            <div className="authors-card reveal"><p><a href="https://guominghui07.github.io/" target="_blank" rel="noreferrer">Minghui Guo<sup>1</sup></a> · <a href="https://sqwu.top/" target="_blank" rel="noreferrer">Shengqiong Wu<sup>2</sup></a> · <a href="https://haofei.vip/" target="_blank" rel="noreferrer">Hao Fei<sup>2</sup></a></p><span><sup>1</sup>National University of Singapore</span><span><sup>2</sup>University of Oxford</span><div><a href="https://arxiv.org/abs/2608.13556" target="_blank" rel="noreferrer">Paper</a><a href="https://github.com/V-RAE/V-RAE" target="_blank" rel="noreferrer">Code</a><a href="https://huggingface.co/Guomh0707/V-RAE-Models" target="_blank" rel="noreferrer">Models</a></div></div>
            <div className="bib-card reveal"><div><span>BibTeX</span><button type="button" onClick={copyBibtex}>{copied ? "Copied" : "Copy"}</button></div><pre>{bibtex}</pre></div>
          </div>
          <div className="footer-bottom"><p>Semantic representations for reconstruction, generation, and predictive modeling.</p><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>
    </main>
  );
}

export default App;
