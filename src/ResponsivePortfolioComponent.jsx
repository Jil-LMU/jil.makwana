import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, GraduationCap, MapPin } from "lucide-react";
import Lenis from "lenis";
import AbstractVideo from "./assets/LA.mp4";
import EducationImg1 from "./P2.jpg";
import EducationImg2 from "./P1.jpeg";
import ResumePdf from "./Resume.pdf";
import { projects, educationData, experienceData } from "./data";

// ─── Elevation System ──────────────────────────────────────────────────────────
// base:     #0C0C0F  (whole-page backdrop)
// raised:   #111118  (alternate sections)
// surface:  #17171F  (cards, panels)
// elevated: #1E1E28  (active states, overlays)
// text-hi:  #F0EDE8  text-md: #A0A09C  text-lo: #60605C
// gold:     #C8A96E

// ─── Aurora ───────────────────────────────────────────────────────────────────
const Aurora = ({ a, b, c }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className={`absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full mix-blend-screen opacity-20 blur-[120px] animate-aurora-1 ${a}`} />
    <div className={`absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full mix-blend-screen opacity-20 blur-[120px] animate-aurora-2 ${b}`} />
    {c && <div className={`absolute top-1/3 left-1/3 w-1/2 h-1/2 rounded-full mix-blend-screen opacity-12 blur-[150px] animate-aurora-3 ${c}`} />}
  </div>
);

// ─── Marquee ──────────────────────────────────────────────────────────────────
const SKILLS = ["Python","React","Swift","Node.js","Next.js","Tailwind CSS","TypeScript","SQL","AWS","SwiftUI","R","Scikit-learn","Framer Motion","Docker","Git","Figma"];
const Marquee = () => (
  <div className="overflow-hidden border-y border-white/[0.06] py-3.5 relative z-10 bg-[#0C0C0F]">
    <div className="animate-marquee">
      {[...SKILLS, ...SKILLS, ...SKILLS].map((s, i) => (
        <span key={i} className="inline-flex items-center gap-3 px-6 text-[9px] font-bold uppercase tracking-[0.35em] text-[#4A4A46]">
          {s}<span className="text-gold/40 text-[8px]">◆</span>
        </span>
      ))}
    </div>
  </div>
);

// ─── Divider ──────────────────────────────────────────────────────────────────
const GoldLine = () => <div className="w-8 h-px bg-gold/40 mb-6" />;

// ─── Section Label ────────────────────────────────────────────────────────────
const Label = ({ n, children }) => (
  <div className="flex items-center gap-3 mb-5">
    <GoldLine />
    <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold">{n && `${n} / `}{children}</p>
  </div>
);

// ─── Animations ───────────────────────────────────────────────────────────────
const up = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(projects[0]?.id ?? 1);
  const [selectedExp, setSelectedExp]     = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const lastY = React.useRef(0);
  const lenisRef = React.useRef(null);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenisRef.current = lenis;
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const scrollTo = (id) => {
    lenisRef.current?.scrollTo(`#${id}`) ?? document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const activeProj = projects.find((p) => p.id === activeProject);
  const navItems   = ["Experience","Education","Projects","Skills","Resume","Contact"];

  return (
    <div className="bg-[#0C0C0F] min-h-screen text-[#F0EDE8] overflow-hidden font-outfit selection:bg-gold selection:text-black">
      {/* ── NAV ────────────────────────────────────────────────────────── */}
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0C0C0F]/90 backdrop-blur-xl border-b border-white/[0.06]" : ""
        }`}
      >
        <div className="px-8 md:px-16 py-5 flex justify-between items-center">
          <p className="font-bodoni font-bold text-base tracking-wide text-[#F0EDE8]">jil.mak</p>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 text-[#A0A09C] hover:text-gold transition-colors duration-200 uppercase tracking-[0.25em] text-[9px] font-bold z-50"
          >
            {menuOpen ? "Close" : "Menu"}
            <div className="flex flex-col gap-[5px]">
              <span className={`w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`w-5 h-px bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* ── MENU ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#08080B] z-40 flex flex-col justify-center px-12 md:px-24 overflow-hidden"
          >
            <Aurora a="bg-amber-700" b="bg-orange-800" />
            <div className="relative z-10">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.065 }}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="block w-full text-left py-3 border-b border-white/[0.06] last:border-0 group"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-bodoni text-5xl md:text-7xl font-bold text-[#F0EDE8] group-hover:text-gold transition-colors duration-300 tracking-tight">
                      {item}
                    </span>
                    <span className="text-[#2A2A28] text-[10px] font-mono tracking-widest">0{i + 1}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <div className="relative h-screen flex flex-col justify-end overflow-hidden">
        <video autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none">
          <source src={AbstractVideo} type="video/mp4" />
        </video>
        {/* Layered gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0F]/50 via-transparent to-[#0C0C0F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0F]/60 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="absolute top-28 left-8 md:left-16 z-10"
        >
          <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold mb-2">Portfolio · 2025</p>
          <p className="text-xs text-[#60605C]">Developer & Researcher · Los Angeles, CA</p>
        </motion.div>

        <div className="relative z-10 px-8 md:px-16 pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-bodoni font-extrabold leading-[0.85] tracking-tight text-[#F0EDE8]
                           text-[15vw] md:text-[11vw]">
              Creative
            </h1>
            <h1 className="font-bodoni font-extrabold leading-[0.85] tracking-tight italic text-gold
                           text-[15vw] md:text-[11vw]">
              Madness.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="flex items-end justify-between mt-8 gap-6"
          >
            <p className="text-[#60605C] text-sm max-w-xs leading-relaxed">
              "Everyone is crazy in their own way —<br className="hidden md:block" />
              that's what makes everyone unique."
            </p>
            <div className="hidden md:flex items-center gap-3 text-[#303030] text-[9px] uppercase tracking-[0.3em] flex-shrink-0">
              <div className="w-px h-7 bg-gold/30 animate-scroll-pulse" />
              Scroll
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MARQUEE ────────────────────────────────────────────────────── */}
      <Marquee />

      {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      <section className="relative flex items-center justify-center px-8 md:px-16 py-32 bg-[#0C0C0F] overflow-hidden">
        <Aurora a="bg-amber-800" b="bg-rose-900" c="bg-orange-900" />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up}>
            <Label>About</Label>
            <blockquote className="font-bodoni italic text-3xl md:text-[2.75rem] text-[#F0EDE8] leading-[1.3] mb-10">
              "I build apps with people,
              <br /><span className="text-gold">not just for them."</span>
            </blockquote>
            <p className="text-[#8A8A86] text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Hi, I'm Jil — a CS graduate student at LMU specialising in turning
              real-world problems into clean, user-centred products. Whether it's a
              survival model or a mobile app, I care deeply about the details that
              make something feel effortless.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────────────────────── */}
      <section id="experience" className="py-28 px-8 md:px-16 bg-[#111118]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up} className="mb-16">
            <Label n="02">Background</Label>
            <h2 className="font-bodoni text-5xl md:text-7xl font-bold tracking-tight text-[#F0EDE8]">
              Experience
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-[1fr,1.6fr] gap-6 items-start">
            {/* Tab list */}
            <div className="space-y-2">
              {experienceData.map((exp, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setSelectedExp(i)}
                  className={`w-full text-left px-5 py-5 rounded-xl transition-all duration-300 border ${
                    selectedExp === i
                      ? "bg-[#17171F] border-gold/25 shadow-[0_0_40px_rgba(200,169,110,0.06)]"
                      : "bg-transparent border-transparent hover:bg-[#13131A] hover:border-white/[0.06]"
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <p className={`text-[9px] font-bold uppercase tracking-[0.4em] mb-1.5 transition-colors ${selectedExp === i ? "text-gold" : "text-[#404040]"}`}>
                        {exp.company}
                      </p>
                      <h4 className={`text-sm font-semibold transition-colors ${selectedExp === i ? "text-[#F0EDE8]" : "text-[#606060]"}`}>
                        {exp.role}
                      </h4>
                    </div>
                    <span className={`text-[9px] font-mono px-2.5 py-1 rounded-md flex-shrink-0 transition-colors ${
                      selectedExp === i ? "bg-gold/10 text-gold border border-gold/20" : "bg-[#17171F] text-[#404040] border border-white/[0.05]"
                    }`}>
                      {exp.period.split("–")[0].trim()}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Detail */}
            <div className="md:sticky md:top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedExp}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#17171F] border border-white/[0.08] p-8 md:p-10 rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.5)]"
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold mb-5">
                    {experienceData[selectedExp].period}
                  </p>
                  <h3 className="font-bodoni text-2xl md:text-3xl font-bold mb-2 text-[#F0EDE8] leading-tight">
                    {experienceData[selectedExp].role}
                  </h3>
                  <p className="text-[#8A8A86] font-medium mb-8 text-sm">
                    {experienceData[selectedExp].company}
                    {experienceData[selectedExp].location && (
                      <span className="text-[#60605C] font-normal"> · {experienceData[selectedExp].location}</span>
                    )}
                  </p>
                  <ul className="space-y-4">
                    {experienceData[selectedExp].responsibilities.map((item, i) => (
                      <li key={i} className="flex gap-3.5 text-[#8A8A86] leading-relaxed text-sm">
                        <span className="mt-2 w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ──────────────────────────────────────────────────── */}
      <section id="education" className="py-28 px-8 md:px-16 bg-[#0D0B14] relative overflow-hidden">
        {/* warm gold-amber aurora */}
        <Aurora a="bg-amber-900" b="bg-yellow-900" c="bg-orange-950" />
        {/* subtle radial glow at center */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(200,169,110,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up} className="mb-16">
            <Label n="03">Academic</Label>
            <h2 className="font-bodoni text-5xl md:text-7xl font-bold tracking-tight text-[#F0EDE8]">Education</h2>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {educationData.map((edu, i) => (
              <motion.div key={i} variants={up}
                className="group rounded-2xl overflow-hidden border border-white/[0.08] hover:border-gold/20 transition-all duration-500 bg-[#13131A] shadow-[0_4px_40px_rgba(0,0,0,0.4)]"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img src={edu.image} alt={edu.university}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13131A] via-[#13131A]/30 to-transparent" />
                </div>
                {/* Content */}
                <div className="p-7 -mt-2">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 bg-gold/[0.1] rounded-xl border border-gold/20">
                      <GraduationCap className="text-gold w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono text-[#60605C] bg-[#1E1E28] border border-white/[0.06] px-3 py-1.5 rounded-full tracking-wider">
                      {edu.year}
                    </span>
                  </div>
                  <h3 className="font-bodoni text-xl md:text-2xl font-bold mb-2 text-[#F0EDE8] leading-tight">{edu.degree}</h3>
                  <p className="text-[#8A8A86] font-medium text-sm mb-2">{edu.university}</p>
                  <p className="text-[#484844] text-xs flex items-center gap-1.5 mt-3">
                    <MapPin size={11} className="text-gold/50" />{edu.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────────────── */}
      <section id="projects" className="py-28 px-8 md:px-16 bg-[#111118]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up} className="mb-16">
            <Label n="04">Work</Label>
            <h2 className="font-bodoni text-5xl md:text-7xl font-bold tracking-tight leading-[0.9] text-[#F0EDE8]">
              Selected<br />Projects
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr,1.35fr] gap-10 items-start">
            <div>
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveProject(project.id)}
                  className={`group cursor-pointer py-7 border-b transition-all duration-300 ${
                    activeProject === project.id
                      ? "opacity-100 border-white/[0.1]"
                      : "opacity-30 hover:opacity-60 border-white/[0.05]"
                  }`}
                >
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-gold mb-2.5">
                        {String(i + 1).padStart(2, "0")} · {project.category}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold tracking-tight text-[#F0EDE8] leading-snug">
                        {project.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Link
                        to={`/project/${project.id}`}
                        className="hidden sm:flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.3em] border border-white/[0.1] text-[#A0A09C] px-4 py-2 rounded-full hover:border-gold/30 hover:text-gold transition-all duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View
                      </Link>
                      <ArrowUpRight size={20}
                        className={`transition-all duration-300 ${activeProject === project.id ? "rotate-45 text-gold" : "text-[#404040] group-hover:rotate-45 group-hover:text-[#A0A09C]"}`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-28">
              <div className="relative rounded-2xl overflow-hidden bg-[#17171F] aspect-[4/5] border border-white/[0.08]">
                <AnimatePresence mode="wait">
                  {projects.map((p) =>
                    p.id === activeProject && (
                      <motion.img key={p.id} src={p.image} alt={p.title}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )
                  )}
                </AnimatePresence>

                {/* Info card */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0C0C0F]/95 backdrop-blur-md p-5 rounded-xl border border-white/[0.1]">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-gold">{activeProj?.category}</p>
                    <span className="text-[9px] font-mono text-[#484844]">{activeProj?.year}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {activeProj?.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="text-[9px] font-bold uppercase tracking-wider bg-[#1E1E28] text-[#8A8A86] border border-white/[0.07] px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                    {(activeProj?.tags.length ?? 0) > 5 && (
                      <span className="text-[9px] text-[#484844] px-2 py-1">+{(activeProj?.tags.length ?? 0) - 5}</span>
                    )}
                  </div>
                  <Link to={`/project/${activeProj?.id}`}
                    className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.3em] text-[#A0A09C] hover:text-gold transition-colors group"
                  >
                    Case Study <ArrowUpRight size={11} className="group-hover:rotate-45 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────────────────── */}
      <section id="skills" className="py-28 px-8 md:px-16 bg-[#111118] relative overflow-hidden">
        {/* dot grid pattern */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.18]"
          style={{ backgroundImage: "radial-gradient(circle, #C8A96E 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        {/* warm gold-tinted glow */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(200,169,110,0.07) 0%, transparent 65%)" }} />
        <Aurora a="bg-amber-950" b="bg-yellow-950" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up} className="mb-16">
            <Label n="05">Capabilities</Label>
            <h2 className="font-bodoni text-5xl md:text-7xl font-bold tracking-tight text-[#F0EDE8]">Skills</h2>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { cat: "Languages",         items: ["Python","Swift","JavaScript","TypeScript","R","SQL"] },
              { cat: "Frameworks",        items: ["React","Next.js","Node.js","SwiftUI","Tailwind CSS"] },
              { cat: "Tools & Platforms", items: ["AWS","Git","Docker","Figma","Xcode","Jupyter"] },
              { cat: "Data & ML",         items: ["Scikit-learn","Pandas","NumPy","Matplotlib","Statsmodels"] },
              { cat: "Design & Motion",   items: ["Framer Motion","UI/UX Design","Prototyping","Responsive Design"] },
            ].map((g) => (
              <motion.div key={g.cat} variants={up}
                className="p-6 rounded-2xl bg-[#13131A] border border-white/[0.07] hover:border-gold/15 transition-colors duration-300"
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-gold mb-5">{g.cat}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span key={item}
                      className="text-xs font-medium text-[#8A8A86] bg-[#1A1A24] border border-white/[0.06] px-3 py-1.5 rounded-lg hover:text-[#F0EDE8] hover:border-gold/15 transition-all duration-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RESUME ─────────────────────────────────────────────────────── */}
      <section id="resume" className="py-28 px-8 md:px-16 bg-[#111118]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-10 border-b border-white/[0.07] mb-10"
          >
            <div>
              <Label n="06">Documents</Label>
              <h2 className="font-bodoni text-5xl md:text-7xl font-bold tracking-tight text-[#F0EDE8]">Resume</h2>
            </div>
            <button onClick={() => setResumeOpen(true)}
              className="group flex-shrink-0 flex items-center gap-2.5 bg-gold text-black px-8 py-3.5 rounded-full font-bold uppercase tracking-[0.15em] text-[10px] hover:bg-gold-light transition-colors duration-200 shadow-[0_0_30px_rgba(200,169,110,0.2)]"
            >
              Open Resume
              <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
            </button>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up}
            onClick={() => setResumeOpen(true)}
            className="group cursor-pointer bg-[#13131A] border border-white/[0.07] hover:border-gold/15 transition-all duration-300 rounded-2xl h-48 flex flex-col items-center justify-center gap-3"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-[#484844]">PDF Document</p>
            <p className="text-[#303030] text-xs">Click to open</p>
            <ArrowUpRight size={16} className="text-[#303030] group-hover:rotate-45 group-hover:text-gold/40 transition-all duration-300 mt-1" />
          </motion.div>
        </div>

        <AnimatePresence>
          {resumeOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-[#06060A]/98 backdrop-blur-xl flex flex-col p-4 md:p-8"
            >
              <button onClick={() => setResumeOpen(false)}
                className="absolute top-6 right-8 text-[#606060] text-[9px] font-bold uppercase tracking-[0.45em] hover:text-gold z-50 transition-colors">
                Close ×
              </button>
              <div className="flex-1 w-full flex items-center justify-center overflow-auto mt-16">
                <iframe src={ResumePdf} className="w-full h-full max-w-4xl rounded-xl" title="Resume" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────── */}
      <section id="contact" className="relative py-36 px-8 md:px-16 bg-[#0C0C0F] overflow-hidden">
        <Aurora a="bg-amber-800" b="bg-orange-900" c="bg-yellow-900" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={up}>
            <Label n="07">Connect</Label>
            <h2 className="font-bodoni font-bold tracking-tight leading-[0.88] text-6xl md:text-[10vw] mb-6 mt-6 text-[#F0EDE8]">
              Let's Work<br />
              <span className="italic text-gold">Together.</span>
            </h2>
            <p className="text-[#60605C] text-base max-w-sm mx-auto mb-12 leading-relaxed">
              Open to new opportunities, research collaborations, and building things that matter.
            </p>
            <a href="mailto:er.jil.makwana@gmail.com"
              className="inline-flex items-center gap-3 bg-gold text-black px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-gold-light transition-colors duration-300 group mb-14 shadow-[0_0_40px_rgba(200,169,110,0.25)]"
            >
              Say Hello
              <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
            </a>
            <div className="flex justify-center gap-3">
              {[
                { icon: <Github size={16} />, href: "#" },
                { icon: <Linkedin size={16} />, href: "#" },
                { icon: <Mail size={16} />, href: "mailto:er.jil.makwana@gmail.com" },
              ].map((link, i) => (
                <a key={i} href={link.href}
                  className="p-3.5 bg-[#17171F] border border-white/[0.08] rounded-full text-[#60605C] hover:text-gold hover:border-gold/25 transition-all duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="bg-[#08080B] border-t border-white/[0.05] pt-2 pb-10 px-8 md:px-16 overflow-hidden">
        <div className="w-full overflow-hidden mb-8">
          <h1 className="text-[22vw] font-bold leading-none tracking-tighter text-white/[0.025] select-none font-bodoni lowercase">
            One Life
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-bodoni font-bold text-lg text-[#F0EDE8]">jil.mak</p>
          <nav className="flex flex-wrap justify-center gap-6 text-[9px] uppercase tracking-[0.35em]">
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                className="text-[#404040] hover:text-gold transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </nav>
          <p className="text-[#282826] text-[10px] tracking-wider">© {new Date().getFullYear()} Jil Makwana</p>
        </div>
      </footer>
    </div>
  );
}
