import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Github, Globe, ArrowUpRight,
  AlertTriangle, TrendingUp, Shield, BarChart2, Bot, Layers,
  CheckCircle2, ChevronLeft, ChevronRight,
} from "lucide-react";
import { projects } from "./data";
import Lenis from "lenis";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const up = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

function ScrollToTop() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return null;
}

function variableIcon(v) {
  if (v.type === "risk") return v.title.includes("Crime") ? <AlertTriangle size={18} /> : <TrendingUp size={18} />;
  if (v.title.includes("Forecast")) return <BarChart2 size={18} />;
  if (v.title.includes("Agentic"))  return <Bot size={18} />;
  if (v.title.includes("Composite")) return <Layers size={18} />;
  return <Shield size={18} />;
}

// ─── Image Lightbox ───────────────────────────────────────────────────────────
function Lightbox({ images, labels, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-[#04040A]/98 backdrop-blur-xl flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-8 text-[#606060] hover:text-gold text-[9px] font-bold uppercase tracking-[0.4em] transition-colors">
        Close ×
      </button>
      <motion.img
        key={idx}
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        src={images[idx]} alt={labels?.[idx] ?? ""}
        className="max-w-5xl w-full rounded-2xl border border-white/[0.08] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      {labels?.[idx] && (
        <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.4em] text-gold/60">{labels[idx]}</p>
      )}
      {images.length > 1 && (
        <div className="flex items-center gap-4 mt-5" onClick={(e) => e.stopPropagation()}>
          <button onClick={prev} className="p-2 bg-[#17171F] border border-white/[0.08] rounded-full text-[#888] hover:text-gold transition-colors"><ChevronLeft size={18} /></button>
          <span className="text-[#444] text-xs font-mono">{idx + 1} / {images.length}</span>
          <button onClick={next} className="p-2 bg-[#17171F] border border-white/[0.08] rounded-full text-[#888] hover:text-gold transition-colors"><ChevronRight size={18} /></button>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));
  const [lightbox, setLightbox] = useState(null); // index or null

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0C0C0F] text-[#F0EDE8] gap-4 font-outfit">
        <h1 className="font-bodoni text-4xl font-bold">Project Not Found</h1>
        <Link to="/" className="underline text-gold">Go Home</Link>
      </div>
    );
  }

  const hasGallery = project.gallery?.length > 0;

  return (
    <div className="bg-[#0C0C0F] min-h-screen text-[#F0EDE8] overflow-hidden font-outfit selection:bg-gold selection:text-black">
      <ScrollToTop />

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 md:px-16 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[#60605C] hover:text-gold transition-colors duration-200 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-[0.3em] text-[9px]">Back to Home</span>
        </Link>
      </nav>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
          <img src={project.image} alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0F] via-[#0C0C0F]/50 to-[#0C0C0F]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0F]/60 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12">
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold mb-4"
            >
              {project.category} · {project.year}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-bodoni text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.9] text-[#F0EDE8] max-w-4xl"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>

        {/* ── STATS BAR ───────────────────────────────────────────────── */}
        {project.stats && (
          <div className="border-y border-white/[0.06] bg-[#0E0E0E]">
            <div className="max-w-6xl mx-auto px-8 md:px-16 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              {project.stats.map((s, i) => (
                <div key={i} className="text-center md:text-left md:border-r border-white/[0.06] last:border-0 pr-6">
                  <p className="font-bodoni font-bold text-2xl md:text-3xl text-gold mb-1">{s.value}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#60605C]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── OVERVIEW + LINKS ────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-8 md:px-16 py-20">
          <div className="grid md:grid-cols-[1fr,280px] gap-16 items-start">

            {/* Description */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up}>
              <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold mb-5">Overview</p>
              <p className="text-[#A0A09C] text-lg md:text-xl leading-relaxed max-w-2xl">{project.description}</p>
            </motion.div>

            {/* Meta + Links sidebar */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up}
              className="space-y-6 bg-[#111118] border border-white/[0.07] rounded-2xl p-7"
            >
              {[{ label: "Role", value: project.role }, { label: "Year", value: project.year }].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold mb-1.5">{label}</p>
                  <p className="text-sm font-medium text-[#F0EDE8]">{value}</p>
                </div>
              ))}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-bold border border-white/[0.07] text-[#8A8A86] px-2.5 py-1.5 rounded-lg hover:border-gold/20 hover:text-[#F0EDE8] transition-all">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2.5 pt-2">
                {project.demo && project.demo !== "#" && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gold text-black px-5 py-2.5 rounded-full font-bold text-[9px] uppercase tracking-[0.2em] hover:bg-gold-light transition-colors">
                    <Globe size={13} /> Live Demo
                  </a>
                )}
                {project.repo && project.repo !== "#" && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-white/[0.1] text-[#8A8A86] px-5 py-2.5 rounded-full font-bold text-[9px] uppercase tracking-[0.2em] hover:border-gold/25 hover:text-[#F0EDE8] transition-all">
                    <Github size={13} /> Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── THE CHALLENGE ───────────────────────────────────────────── */}
        <div className="bg-[#0A0A0D] border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-8 md:px-16 py-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold mb-5">The Challenge</p>
                <h2 className="font-bodoni text-3xl md:text-4xl font-bold text-[#F0EDE8] leading-tight mb-6">
                  What problem<br /><span className="italic text-gold">does this solve?</span>
                </h2>
              </div>
              <p className="text-[#8A8A86] text-base leading-relaxed">{project.problem}</p>
            </motion.div>
          </div>
        </div>

        {/* ── FIRST GALLERY IMAGE (hero feature shot) ─────────────────── */}
        {hasGallery && (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up}
            className="max-w-6xl mx-auto px-8 md:px-16 py-14"
          >
            <button
              onClick={() => setLightbox(0)}
              className="group w-full relative rounded-2xl overflow-hidden border border-white/[0.08] hover:border-gold/20 transition-colors duration-300 cursor-zoom-in"
            >
              <img src={project.gallery[0]} alt={project.galleryLabels?.[0] ?? "Feature"} className="w-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-gold text-[9px] font-bold uppercase tracking-[0.4em] px-4 py-2 rounded-full border border-gold/30">
                  {project.galleryLabels?.[0] ?? "View Full"}
                </span>
              </div>
            </button>
          </motion.div>
        )}

        {/* ── FEATURES (if available) ─────────────────────────────────── */}
        {project.features && (
          <div className="max-w-6xl mx-auto px-8 md:px-16 py-14">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up} className="mb-10">
              <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold mb-3">Core Features</p>
              <h2 className="font-bodoni text-3xl md:text-4xl font-bold text-[#F0EDE8]">What it does</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.features.map((f, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="bg-[#111118] border border-white/[0.07] hover:border-gold/15 rounded-2xl p-6 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                    <span className="text-gold font-bodoni font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-semibold text-[#F0EDE8] mb-2 text-sm">{f.title}</h3>
                  <p className="text-[#60605C] text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── APPROACH ────────────────────────────────────────────────── */}
        <div className="bg-[#0A0A0D] border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-8 md:px-16 py-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up}>
              <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold mb-5">Approach & Analysis</p>
              <div className="grid md:grid-cols-[1fr,1.5fr] gap-12 items-start">
                <h2 className="font-bodoni text-3xl md:text-4xl font-bold text-[#F0EDE8] leading-tight">
                  How it was<br /><span className="italic text-gold">built</span>
                </h2>
                <p className="text-[#8A8A86] text-base leading-relaxed">{project.approach}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── GALLERY GRID (remaining images) ─────────────────────────── */}
        {hasGallery && project.gallery.length > 1 && (
          <div className="max-w-6xl mx-auto px-8 md:px-16 py-14">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up} className="mb-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold mb-3">Project Visuals</p>
              <h2 className="font-bodoni text-3xl md:text-4xl font-bold text-[#F0EDE8]">Inside the system</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.slice(1).map((img, i) => (
                <motion.button key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  onClick={() => setLightbox(i + 1)}
                  className="group relative rounded-xl overflow-hidden border border-white/[0.08] hover:border-gold/20 transition-colors duration-300 cursor-zoom-in text-left"
                >
                  <img src={img} alt={project.galleryLabels?.[i + 1] ?? `Visual ${i + 2}`}
                    className="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-gold">
                      {project.galleryLabels?.[i + 1] ?? `Visual ${i + 2}`}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* ── KEY VARIABLES ────────────────────────────────────────────── */}
        {project.keyVariables && (
          <div className="bg-[#0A0A0D] border-y border-white/[0.05]">
            <div className="max-w-6xl mx-auto px-8 md:px-16 py-20">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up} className="mb-10">
                <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold mb-3">Key Findings</p>
                <h2 className="font-bodoni text-3xl md:text-4xl font-bold text-[#F0EDE8]">What the data revealed</h2>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-5">
                {project.keyVariables.map((v, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className={`rounded-2xl border p-6 ${v.type === "risk" ? "border-red-500/[0.12] bg-red-500/[0.03]" : "border-gold/[0.12] bg-gold/[0.03]"}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${v.type === "risk" ? "bg-red-500/10 text-red-400/70" : "bg-gold/10 text-gold"}`}>
                      {variableIcon(v)}
                    </div>
                    <div className={`font-bodoni font-bold text-3xl mb-1 ${v.type === "risk" ? "text-red-400/80" : "text-gold"}`}>
                      {v.hazardRatio}
                    </div>
                    <h3 className="font-semibold text-[#F0EDE8] text-sm mb-1">{v.title}</h3>
                    <p className={`text-[9px] font-bold uppercase tracking-wider mb-3 ${v.type === "risk" ? "text-red-400/50" : "text-gold/50"}`}>{v.sub}</p>
                    <p className="text-[#60605C] text-xs leading-relaxed">{v.description}</p>
                    <p className="text-[9px] text-[#404040] mt-4 border-t border-white/[0.05] pt-3">{v.insight}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SOLUTION + IMPACT ────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-8 md:px-16 py-20">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { label: "The Solution", title: "How it was solved", body: project.solution },
              { label: "Impact",       title: "What changed",      body: project.impact  },
            ].map(({ label, title, body }) => (
              <motion.div key={label}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up}
                className="bg-[#111118] border border-white/[0.07] rounded-2xl p-8"
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold mb-4">{label}</p>
                <h3 className="font-bodoni text-2xl font-bold text-[#F0EDE8] mb-5 italic">{title}</h3>
                <p className="text-[#8A8A86] text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── TAKEAWAYS (only for StockPulse, from the pptx) ──────────── */}
        {project.id === 2 && (
          <div className="bg-[#0A0A0D] border-y border-white/[0.05]">
            <div className="max-w-6xl mx-auto px-8 md:px-16 py-20">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up} className="mb-10">
                <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold mb-3">Takeaways</p>
                <h2 className="font-bodoni text-3xl md:text-4xl font-bold text-[#F0EDE8]">What we learned</h2>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { n: "01", title: "Orchestration is Essential", desc: "A coordinator agent is the backbone of a multi-agent system. Without it, agents fire in the wrong order, duplicate work, and produce inconsistent results." },
                  { n: "02", title: "Agentic Loops > Hardcoded Pipelines", desc: "Letting Claude decide which tools to call — and when — produces far more flexible and context-aware answers than any predetermined sequence could." },
                  { n: "03", title: "Separation of Concerns = Modularity", desc: "Keeping data fetching, reasoning, and scoring in isolated agents makes the system easy to extend, debug, and replace one piece at a time." },
                ].map((t) => (
                  <motion.div key={t.n}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: parseInt(t.n) * 0.1 }}
                    className="flex gap-5"
                  >
                    <span className="font-bodoni font-bold text-4xl text-[#1E1E28] flex-shrink-0 leading-none mt-1">{t.n}</span>
                    <div>
                      <h3 className="font-semibold text-[#F0EDE8] text-sm mb-2">{t.title}</h3>
                      <p className="text-[#60605C] text-xs leading-relaxed">{t.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FOOTER STRIP ─────────────────────────────────────────────── */}
        <div className="px-8 md:px-16 py-10 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4 bg-[#08080B]">
          <Link to="/" className="inline-flex items-center gap-2 text-[#484844] hover:text-gold transition-colors group">
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[9px] font-bold uppercase tracking-[0.35em]">Back to Home</span>
          </Link>
          <div className="flex gap-3">
            {project.demo && project.demo !== "#" && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-black px-6 py-2.5 rounded-full font-bold text-[9px] uppercase tracking-[0.2em] hover:bg-gold-light transition-colors">
                <Globe size={12} /> Live Demo
              </a>
            )}
            {project.repo && project.repo !== "#" && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/[0.1] text-[#8A8A86] px-6 py-2.5 rounded-full font-bold text-[9px] uppercase tracking-[0.2em] hover:border-gold/25 hover:text-[#F0EDE8] transition-all">
                <Github size={12} /> Source Code
              </a>
            )}
          </div>
          <p className="text-[#282826] text-[10px] tracking-wider">© {new Date().getFullYear()} Jil Makwana</p>
        </div>

      </motion.div>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && hasGallery && (
          <Lightbox
            images={project.gallery}
            labels={project.galleryLabels}
            startIndex={lightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
