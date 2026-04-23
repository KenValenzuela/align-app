"use client";

import { useState, useRef, useCallback } from "react";
import CoachBubble from "./CoachBubble";
import { COACH_MSGS, EXERCISES } from "@/lib/data";

type Phase = "upload" | "analyzing" | "results";
type Tab = "coach" | "overview" | "issues" | "video";

const PROGRESS_STEPS = [
  "Uploading video...",
  "Detecting body keypoints...",
  "Calculating joint angles...",
  "Comparing to biomechanical benchmarks...",
  "Generating coach feedback...",
];

const ISSUES = COACH_MSGS.filter((m) => m.sev === "critical" || m.sev === "warning");
const GOODS = COACH_MSGS.filter((m) => m.sev === "good");

export default function AnalyzeSection() {
  const [phase, setPhase] = useState<Phase>("upload");
  const [tab, setTab] = useState<Tab>("coach");
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [exercise, setExercise] = useState("Back Squat");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => setFile(f);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const runAnalysis = () => {
    setPhase("analyzing");
    setStep(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setStep(i);
      if (i >= PROGRESS_STEPS.length - 1) {
        clearInterval(iv);
        setTimeout(() => {
          setPhase("results");
          setTab("coach");
        }, 700);
      }
    }, 900);
  };

  const reset = () => {
    setPhase("upload");
    setFile(null);
    setWeight("");
    setNotes("");
    setStep(0);
  };

  return (
    <section className="section" id="analyze">
      <div className="container">
        <div style={{ marginBottom: 28 }}>
          <span className="label">Step 1</span>
          <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Analyze Your Form
          </h2>
          <p style={{ color: "var(--muted)", marginTop: 6, fontSize: 15 }}>
            Upload a video of your lift and get instant AI coaching feedback
          </p>
        </div>

        {phase === "upload" && (
          <UploadPhase
            drag={drag}
            file={file}
            exercise={exercise}
            weight={weight}
            notes={notes}
            fileRef={fileRef}
            setDrag={setDrag}
            setExercise={setExercise}
            setWeight={setWeight}
            setNotes={setNotes}
            onDrop={onDrop}
            handleFile={handleFile}
            runAnalysis={runAnalysis}
          />
        )}

        {phase === "analyzing" && <AnalyzingPhase step={step} />}

        {phase === "results" && (
          <ResultsPhase
            tab={tab}
            setTab={setTab}
            exercise={exercise}
            reset={reset}
          />
        )}
      </div>
    </section>
  );
}

/* ── Upload Phase ── */
interface UploadPhaseProps {
  drag: boolean;
  file: File | null;
  exercise: string;
  weight: string;
  notes: string;
  fileRef: React.RefObject<HTMLInputElement | null>;
  setDrag: (v: boolean) => void;
  setExercise: (v: string) => void;
  setWeight: (v: string) => void;
  setNotes: (v: string) => void;
  onDrop: (e: React.DragEvent) => void;
  handleFile: (f: File) => void;
  runAnalysis: () => void;
}

function UploadPhase({
  drag,
  file,
  exercise,
  weight,
  notes,
  fileRef,
  setDrag,
  setExercise,
  setWeight,
  setNotes,
  onDrop,
  handleFile,
  runAnalysis,
}: UploadPhaseProps) {
  return (
    <div className="card upload-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        style={{
          padding: "40px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: drag ? "var(--lav-d)" : file ? "oklch(96% .05 145 / .3)" : "transparent",
          border: `2px dashed ${drag ? "var(--lav)" : file ? "var(--green)" : "var(--border)"}`,
          borderRadius: "var(--r) 0 0 var(--r)",
          transition: "all .2s",
          textAlign: "center",
          gap: 14,
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
        {file ? (
          <>
            <div style={{ fontSize: 40 }}>✅</div>
            <div style={{ fontWeight: 600, color: "var(--green)" }}>{file.name}</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>
              {(file.size / 1024 / 1024).toFixed(1)} MB · Click to change
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 44, opacity: 0.5 }}>🎬</div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Drop your video here</div>
            <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
              MP4, MOV, AVI up to 500 MB
              <br />
              Shoot from the side for best results
            </div>
            <button className="btn-ghost" style={{ marginTop: 4 }}>
              Browse Files
            </button>
          </>
        )}
      </div>

      {/* Form side */}
      <div style={{ padding: "36px 32px", borderLeft: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label className="label">Exercise</label>
          <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
            {EXERCISES.map((ex) => <option key={ex}>{ex}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Weight (lbs)</label>
          <input
            type="number"
            placeholder="e.g. 135"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min={0}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className="label">Notes (optional)</label>
          <textarea
            placeholder="e.g. feeling tight in hips today"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              background: "var(--off)",
              border: "1.5px solid var(--border)",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 14,
              color: "var(--navy)",
              outline: "none",
              width: "100%",
              resize: "vertical",
              minHeight: 72,
              fontFamily: "DM Sans, sans-serif",
              transition: "border-color .15s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--lav)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </div>
        <div>
          <button
            className="btn-primary"
            style={{ width: "100%", padding: "13px", fontSize: 15 }}
            disabled={!file}
            onClick={runAnalysis}
          >
            {file ? "Analyze My Form →" : "Add a video to continue"}
          </button>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, textAlign: "center" }}>
            Your video is processed locally and never stored
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Analyzing Phase ── */
function AnalyzingPhase({ step }: { step: number }) {
  return (
    <div className="card" style={{ padding: "40px 32px", animation: "fadeUp .3s ease both" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)", letterSpacing: ".06em", textTransform: "uppercase" }}>
          Analyzing
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>
          {PROGRESS_STEPS[step]}
        </div>
      </div>

      {/* Skeleton video frame */}
      <div style={{ maxWidth: 420, margin: "0 auto", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            aspectRatio: "16/9",
            background: "var(--navy)",
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Scanline */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: 3,
              background: "linear-gradient(90deg,transparent,var(--lav),transparent)",
              animation: "scanline 2s linear infinite",
              opacity: 0.8,
            }}
          />
          {/* Body pose SVG */}
          <svg viewBox="0 0 300 200" style={{ width: "100%", height: "100%", opacity: 0.7 }}>
            {[
              ["M150 55 L150 100", "head→hip"],
              ["M150 100 L120 150", "hip→knee-l"],
              ["M150 100 L180 150", "hip→knee-r"],
              ["M120 150 L115 190", "knee-l→foot-l"],
              ["M180 150 L185 190", "knee-r→foot-r"],
              ["M150 70 L115 90", "shoulder-l"],
              ["M150 70 L185 90", "shoulder-r"],
              ["M115 90 L105 120", "elbow-l"],
              ["M185 90 L195 120", "elbow-r"],
            ].map(([d, k]) => (
              <path
                key={k}
                d={d}
                stroke="var(--lav)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="500"
                style={{ animation: "dash 1.5s ease-in-out infinite alternate" }}
              />
            ))}
            {[[150, 48], [150, 100], [120, 150], [180, 150]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={5} fill="var(--lav-l)"
                style={{ animation: `pulse 1.4s ease-in-out ${i * .2}s infinite` }} />
            ))}
          </svg>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 20, height: 4, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              background: "var(--lav)",
              borderRadius: 4,
              width: `${((step + 1) / PROGRESS_STEPS.length) * 100}%`,
              transition: "width .8s ease",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
          {PROGRESS_STEPS.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%", flexShrink: 0, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700,
                background: i <= step ? "var(--lav)" : "var(--border)",
                color: i <= step ? "#fff" : "var(--muted)",
                transition: "background .3s",
              }}>
                {i <= step ? "✓" : i + 1}
              </div>
              <span style={{ color: i <= step ? "var(--navy)" : "var(--muted)" }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Results Phase ── */
function ResultsPhase({
  tab,
  setTab,
  exercise,
  reset,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  exercise: string;
  reset: () => void;
}) {
  const SCORE = 62;
  const scoreColor = SCORE >= 80 ? "var(--green)" : SCORE >= 60 ? "var(--amber)" : "var(--red)";

  return (
    <div style={{ animation: "fadeUp .4s ease both" }}>
      {/* Score row */}
      <div
        className="card results-score-row"
        style={{
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
          <div
            style={{
              width: 60, height: 60, borderRadius: "50%", flexShrink: 0,
              background: `conic-gradient(${scoreColor} 0% ${SCORE}%, var(--border) ${SCORE}% 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <div style={{
              width: 46, height: 46, borderRadius: "50%", background: "var(--card)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: 16, color: scoreColor,
            }}>
              {SCORE}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Form Score: {SCORE}/100</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>
              {exercise} · 2 critical issues, 1 warning
            </div>
          </div>
        </div>
        <div className="results-score-actions" style={{ display: "flex", gap: 10, marginLeft: "auto" }}>
          <button className="btn-ghost" style={{ fontSize: 13 }}>Export PDF</button>
          <button className="btn-ghost" style={{ fontSize: 13 }}>Save to History</button>
          <button className="btn-primary" style={{ fontSize: 13 }} onClick={reset}>
            New Analysis
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {(
          [
            ["coach", "🤖 AI Coach"],
            ["overview", "📊 Overview"],
            ["issues", "⚠️ Issues"],
            ["video", "🎬 Video"],
          ] as [Tab, string][]
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: tab === t ? "none" : "1px solid var(--border)",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              background: tab === t ? "var(--lav)" : "var(--card)",
              color: tab === t ? "#fff" : "var(--navy)",
              transition: "all .15s",
            } as React.CSSProperties}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "coach" && <CoachTab />}
      {tab === "overview" && <OverviewTab />}
      {tab === "issues" && <IssuesTab />}
      {tab === "video" && <VideoTab />}
    </div>
  );
}

/* ── Coach Tab ── */
function CoachTab() {
  const [activeId, setActiveId] = useState<number>(0);
  const active = COACH_MSGS[activeId];

  return (
    <div className="card" style={{ display: "flex", height: 520, overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{
        width: 220, flexShrink: 0, borderRight: "1px solid var(--border)",
        overflowY: "auto", padding: "12px 8px",
      }}>
        {COACH_MSGS.map((m, i) => {
          const tagClass = { critical: "tag-red", warning: "tag-amber", good: "tag-green", tip: "tag-lav" }[m.sev];
          return (
            <button
              key={m.id}
              onClick={() => setActiveId(i)}
              style={{
                width: "100%", textAlign: "left", background: activeId === i ? "var(--lav-d)" : "none",
                border: "none", borderRadius: 8, padding: "10px 12px", cursor: "pointer",
                transition: "background .15s", marginBottom: 2,
                borderLeft: activeId === i ? "3px solid var(--lav)" : "3px solid transparent",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 13, color: "var(--navy)" }}>
                {m.icon} {m.title}
              </div>
              <span className={`tag ${tagClass}`} style={{ marginTop: 5, display: "inline-block" }}>
                {m.sev}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chat panel */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px" }}>
        <div className="coach-tabs" style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
          {COACH_MSGS.map((m, i) => {
            const tagClass = { critical: "tag-red", warning: "tag-amber", good: "tag-green", tip: "tag-lav" }[m.sev];
            return (
              <button
                key={m.id}
                onClick={() => setActiveId(i)}
                className={`tag ${tagClass}`}
                style={{
                  cursor: "pointer",
                  border: activeId === i ? "2px solid currentColor" : undefined,
                  fontSize: 12,
                  padding: "4px 12px",
                }}
              >
                {m.icon} {m.title}
              </button>
            );
          })}
        </div>
        <CoachBubble key={activeId} msg={active} />
      </div>
    </div>
  );
}

/* ── Overview Tab ── */
function OverviewTab() {
  const metrics = [
    { label: "Knee Cave (L)", val: "18°", limit: "< 5°", sev: "critical" },
    { label: "Squat Depth", val: "87°", limit: "≥ 90°", sev: "warning" },
    { label: "Torso Lean", val: "52°", limit: "< 45°", sev: "warning" },
    { label: "Bar Path Dev.", val: "±1.2 cm", limit: "< 2 cm", sev: "good" },
    { label: "Hip Symmetry", val: "97%", limit: "> 90%", sev: "good" },
    { label: "Descent Time", val: "2.1 s", limit: "> 2 s", sev: "good" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="card overview-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, overflow: "hidden" }}>
        {metrics.map((m) => {
          const tagClass = { critical: "tag-red", warning: "tag-amber", good: "tag-green", tip: "tag-lav" }[m.sev as "critical" | "warning" | "good" | "tip"];
          return (
            <div key={m.label} style={{ padding: "20px 24px", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
              <div className="label" style={{ marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700 }}>{m.val}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>Limit: {m.limit}</span>
                <span className={`tag ${tagClass}`}>{m.sev}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card angle-section" style={{ padding: "20px 24px" }}>
        <div className="label">Joint Angles at Bottom</div>
        <div className="angle-row" style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
          {[["Knee", "87°"], ["Hip", "92°"], ["Ankle", "28°"], ["Torso", "52°"]].map(([j, a]) => (
            <div key={j} style={{
              background: "var(--off)", borderRadius: 10, padding: "12px 20px",
              textAlign: "center", flex: 1, minWidth: 80,
            }}>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{a}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{j}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Issues Tab ── */
function IssuesTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {ISSUES.length > 0 && (
        <div className="card" style={{ padding: "20px 24px" }}>
          <div className="label" style={{ marginBottom: 12 }}>Issues Found ({ISSUES.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ISSUES.map((m) => {
              const tagClass = { critical: "tag-red", warning: "tag-amber", good: "tag-green", tip: "tag-lav" }[m.sev];
              return (
                <div key={m.id} style={{
                  display: "flex", gap: 14, padding: "14px 16px",
                  background: "var(--off)", borderRadius: 10, alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 22 }}>{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <strong style={{ fontSize: 14 }}>{m.title}</strong>
                      <span className={`tag ${tagClass}`}>{m.sev}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
                      {m.msg.slice(0, 120)}…
                    </p>
                    {m.drill && (
                      <div style={{ fontSize: 12, marginTop: 6, color: "var(--lav)", fontWeight: 600 }}>
                        Drill: {m.drill}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {GOODS.length > 0 && (
        <div className="card" style={{ padding: "20px 24px" }}>
          <div className="label" style={{ marginBottom: 12, color: "var(--green)" }}>What&apos;s Looking Good ({GOODS.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {GOODS.map((m) => (
              <div key={m.id} style={{
                display: "flex", gap: 12, alignItems: "center",
                padding: "10px 14px", background: "oklch(96% .05 145 / .2)", borderRadius: 8,
              }}>
                <span>{m.icon}</span>
                <div>
                  <strong style={{ fontSize: 13 }}>{m.title}</strong>
                  <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{m.msg.slice(0, 80)}…</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Video Tab ── */
function VideoTab() {
  return (
    <div className="card" style={{ padding: "32px", textAlign: "center" }}>
      <div style={{
        aspectRatio: "16/9", maxWidth: 560, margin: "0 auto",
        background: "var(--navy)", borderRadius: 12, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
      }}>
        <div style={{ fontSize: 48, opacity: 0.4 }}>🎬</div>
        <div style={{ color: "rgba(255,255,255,.4)", fontSize: 14 }}>
          Annotated playback coming soon
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.25)" }}>
          Will show pose overlay, angle markers, and frame-by-frame review
        </div>
      </div>
    </div>
  );
}
