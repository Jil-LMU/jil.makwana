import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, GraduationCap } from "lucide-react";
import Lenis from "lenis";
import AbstractVideo from './assets/LA.mp4'; // Ensure this matches user's video path or use placeholder if not sure

// IMPORT IMAGES
import ExperienceImg from "./assets/1.jpg";
import EducationImg1 from "./P2.jpg";
import EducationImg2 from "./P1.jpeg";
import ResumePdf from "./Resume.pdf";
import { projects, educationData, experienceData } from "./data";


const AuroraBackground = ({ variant }) => {
  const colors = variant === "blue"
    ? ["bg-blue-500", "bg-purple-500", "bg-cyan-500"]
    : ["bg-orange-500", "bg-red-500", "bg-pink-500"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full mix-blend-screen opacity-20 blur-[100px] animate-aurora-1 ${colors[0]}`}></div>
      <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full mix-blend-screen opacity-20 blur-[100px] animate-aurora-2 ${colors[1]}`}></div>
      <div className={`absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-full mix-blend-screen opacity-15 blur-[120px] animate-aurora-3 ${colors[2]}`}></div>
    </div>
  );
};

export default function ResponsivePortfolioComponent() {
  const [open, setOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(1);
  const [selectedExp, setSelectedExp] = useState(0);

  // Detect scroll to change header color & visibility (Smart Header)
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Change background
      setIsScrolled(currentScrollY > 30);

      // Smart Header Logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true); // Scrolling down & past threshold -> Hide
      } else {
        setIsHidden(false); // Scrolling up -> Show
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize Lenis for Smooth Scrolling
  const lenisRef = React.useRef(null); // Use ref instead of state to prevent re-renders loop

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Slower duration for "heavy" feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Standard easing
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // ANIMATION VARIANTS
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden selection:bg-pink-500 selection:text-white">

      {/* ---------------------------------------------------------------- */}
      {/* ============================= HEADER =========================== */}
      {/* ---------------------------------------------------------------- */}

      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-black/50 backdrop-blur-md py-4" : "bg-transparent py-6"
          }`}
      >
        <div className="mx-auto px-8 py-4 flex justify-between items-center">
          {/* LEFT NAME */}
          <p className="text-gray-100 font-semibold tracking-wide text-lg mix-blend-difference font-outfit lowercase">
            jil.mak
          </p>

          {/* MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-white uppercase tracking-widest text-sm font-bold mix-blend-difference hover:opacity-70 transition-opacity z-50"
          >
            {open ? "Close" : "Menu"}
            <div className={`w-8 h-[2px] bg-white transition-all ${open ? "rotate-45 -translate-x-1" : ""}`}></div>
          </button>
        </div>
      </motion.nav>

      {/* FULL SCREEN MENU OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 overflow-hidden"
          >
            <AuroraBackground variant="blue" />

            <div className="relative z-10 flex flex-col items-center gap-8">
              {["Experience", "Education", "Projects", "Skills", "Resume", "Contact"].map((item, i) => (
                <a
                  key={item}
                  onClick={(e) => {
                    e.preventDefault();
                    // Check if lenisRef is ready, otherwise fallback
                    if (lenisRef.current) {
                      lenisRef.current.scrollTo(`#${item.toLowerCase()}`);
                    } else {
                      document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                    }
                    setOpen(false);
                  }}
                  className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter hover:text-gray-400 transition cursor-pointer font-outfit"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ---------------------------------------------------------------- */}
      {/* ============================== HERO ============================ */}
      {/* ---------------------------------------------------------------- */}

      <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* --- Video Background --- */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60 pointer-events-none"
        >
          <source src={AbstractVideo} type="video/mp4" />
        </video>

        {/* --- Text Mask Layer --- */}
        {/* --- Text Mask Layer --- */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center leading-[0.9] mix-blend-screen font-bodoni">

          <h1 className="text-[13.5vw] font-extrabold uppercase tracking-tight text-white drop-shadow-2xl">
            CREATIVE
          </h1>

          <h1 className="text-[13.5vw] font-extrabold uppercase tracking-tight text-white drop-shadow-2xl mt-0">
            MADNESS
          </h1>
        </div>

        {/* Quick Intro Box */}
        <div className="absolute bottom-8 md:bottom-12 max-w-md text-center px-4 glass-box p-4 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 z-20">
          <p className="text-gray-200 text-sm md:text-base leading-relaxed tracking-wide font-light">
            Crafting digital experiences through code, rhythm, and motion.
            My name is <span className="text-white font-bold">Jil Makwana</span>.
          </p>
        </div>
      </div>


      {/* ---------------------------------------------------------------- */}
      {/* =========================== EXPERIENCE ========================= */}
      {/* ---------------------------------------------------------------- */}


      <section id="experience" className="py-20 bg-white text-black font-outfit">
        <h3 className="text-5xl font-bold text-center mb-10">Experience</h3>

        <motion.div
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >

          {/* LIST */}
          <div className="space-y-8 px-6">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                onClick={() => setSelectedExp(index)}
                className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 border-l-4 ${selectedExp === index
                  ? "bg-gray-100 border-black shadow-lg"
                  : "bg-white border-transparent hover:bg-gray-50"
                  }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-black">{exp.role}</h4>
                  <span className="text-xs font-mono text-gray-500 bg-gray-200 px-2 py-1 rounded">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">{exp.company}</p>

                {/* Mobile-only preview of responsibilities */}
                <div className="block md:hidden text-gray-500 text-sm line-clamp-2">
                  {exp.responsibilities[0]}...
                </div>
              </motion.div>
            ))}
          </div>

          {/* DETAIL VIEW (Sticky) */}
          <div className="hidden md:block relative px-6">
            <div className="sticky top-24 p-8 bg-gray-50 rounded-3xl border border-gray-100 shadow-xl h-fit">
              <h4 className="text-3xl font-extrabold mb-2">{experienceData[selectedExp].role}</h4>
              <p className="text-lg text-gray-600 mb-6 font-medium">{experienceData[selectedExp].company}</p>

              <ul className="space-y-4">
                {experienceData[selectedExp].responsibilities.map((item, i) => (
                  <li key={i} className="flex gap-3 text-gray-700 leading-relaxed">
                    <span className="mt-1.5 w-2 h-2 bg-black rounded-full flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </motion.div>
      </section>


      {/* ---------------------------------------------------------------- */}
      {/* =========================== EDUCATION ========================== */}
      {/* ---------------------------------------------------------------- */}

      <section id="education" className="py-24 bg-black text-white relative">
        {/* Background Gradient Blob */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[120px]"></div>
          <div className="absolute top-40 left-20 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px]"></div>
        </div>

        {/* Section Header */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white font-outfit">
            Education
          </h2>
          <div className="mt-3 h-[3px] w-24 mx-auto bg-gradient-to-r from-blue-500 to-pink-500 rounded-full"></div>
        </div>

        {/* Education Cards */}
        <motion.div
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-6 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group relative bg-zinc-900/50 backdrop-blur-md rounded-3xl p-8 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="flex items-start gap-4 mb-6">
                <div className="bg-white p-3 rounded-2xl shadow-lg">
                  <GraduationCap className="text-black w-8 h-8" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-zinc-800 rounded-full text-xs font-mono text-zinc-400 mb-2">
                    {edu.year}
                  </span>
                  <h3 className="text-2xl font-bold leading-tight">{edu.degree}</h3>
                </div>
              </div>

              <p className="text-lg text-zinc-400 font-medium mb-4">{edu.university}</p>

              {/* Image Thumbnail with Overlay */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden mt-6 group/image">
                <img
                  src={edu.image}
                  alt={edu.university}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <p className="text-white text-sm font-medium opacity-0 translate-y-4 group-hover/image:opacity-100 group-hover/image:translate-y-0 transition-all duration-300">
                    {edu.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* ---------------------------------------------------------------- */}
      {/* ============================ PROJECTS ========================== */}
      {/* ---------------------------------------------------------------- */}

      <motion.section
        id="projects"
        className="py-20 px-6 bg-white text-black font-outfit"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-6xl font-extrabold mb-14 tracking-tight">
            Selected Projects
          </h3>

          <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12">

            {/* Project List */}
            <div className="space-y-4">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  onClick={() => setActiveProject(project.id)}
                  className={`group cursor-pointer py-6 border-b border-gray-200 flex justify-between items-center transition-all ${activeProject === project.id ? "opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                >
                  <span className="text-3xl md:text-4xl font-bold tracking-tighter">
                    {project.title}
                  </span>
                  <div className="flex items-center gap-4">
                    <Link to={`/project/${project.id}`} className="px-4 py-2 border rounded-full text-xs uppercase hover:bg-black hover:text-white transition" onClick={(e) => e.stopPropagation()}>
                      View Details
                    </Link>
                    <ArrowUpRight
                      size={32}
                      className={`transition-transform duration-300 ${activeProject === project.id ? "rotate-45" : "group-hover:rotate-45"}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Project Preview (Image) */}
            <motion.div
              variants={fadeInUp}
              className="relative h-[400px] md:h-[600px] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl"
            >
              <AnimatePresence mode="wait">
                {projects.map(
                  (project) =>
                    project.id === activeProject && (
                      <motion.img
                        key={project.id}
                        src={project.image}
                        alt={project.title}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )
                )}
              </AnimatePresence>

              {/* Floating Info Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                <p className="text-gray-600 mb-2 font-mono text-sm">
                  {projects.find((p) => p.id === activeProject)?.category}
                </p>
                <p className="text-lg font-medium leading-relaxed mb-4">
                  {projects.find((p) => p.id === activeProject)?.desc}
                </p>

                {/* Technologies and Links */}
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {projects.find((p) => p.id === activeProject)?.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white text-black px-2 py-1 rounded-full text-xs font-bold border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-6 pt-2 text-sm font-bold">
                    <a href={projects.find((p) => p.id === activeProject)?.demo} target="_blank" rel="noreferrer" className="underline hover:text-gray-600 transition">
                      Live Demo
                    </a>
                    <a href={projects.find((p) => p.id === activeProject)?.repo} target="_blank" rel="noreferrer" className="underline hover:text-gray-600 transition">
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ---------------------------------------------------------------- */}
      {/* =============================== SKILLS =========================== */}
      {/* ---------------------------------------------------------------- */}

      <section id="skills" className="relative bg-black py-20 px-6 font-outfit overflow-hidden">
        <AuroraBackground variant="blue" />

        <div className="relative z-10">
          <h3 className="text-5xl font-extrabold text-center mb-16 text-white font-bodoni">Skills</h3>

          <motion.div
            className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              "Python",
              "React",
              "Next.js",
              "Node.js",
              "Swift",
              "Tailwind",
              "Framer Motion",
              "SQL",
              "AWS",
              "Git",
            ].map((skill) => (
              <motion.div
                key={skill}
                variants={fadeInUp}
                className="p-6 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800 transition rounded-xl text-center font-bold text-lg text-gray-200"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* =============================== RESUME =========================== */}
      {/* ---------------------------------------------------------------- */}

      <section id="resume" className="bg-white py-20 px-6 font-outfit text-black">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-8">
            <div>
              <h3 className="text-6xl font-extrabold mb-4 tracking-tight font-bodoni">Resume</h3>
              <p className="max-w-sm text-gray-600">A detailed look at my professional journey and capabilities.</p>
            </div>
            <button
              onClick={() => setResumeOpen(true)}
              className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gray-900 transition mt-6 md:mt-0">
              View Full Resume
              <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>

        {/* --- LIGHTBOX --- */}
        <AnimatePresence>
          {resumeOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col p-4 md:p-8">
              {/* Close Button */}
              <button
                onClick={() => setResumeOpen(false)}
                className="absolute top-6 right-6 text-white text-sm font-bold uppercase tracking-widest hover:text-gray-400 z-50 flex items-center gap-2">
                Close <span className="text-2xl leading-none">&times;</span>
              </button>
              <div className="flex-1 w-full h-full flex items-center justify-center overflow-auto">
                {/* Actual Resume Image/PDF would go here */}
                {/* Resume PDF Viewer */}
                <iframe
                  src={ResumePdf}
                  className="w-full h-full rounded-lg bg-white"
                  title="Resume"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>


      {/* ---------------------------------------------------------------- */}
      {/* ============================== FOOTER ========================== */}
      {/* ---------------------------------------------------------------- */}

      <footer className="relative bg-black text-white py-20 px-6 font-outfit overflow-hidden">
        <AuroraBackground variant="red" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Top Row: Input & Links */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">

            {/* Left: Email Capture */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-md w-full"
            >
              <h3 className="text-3xl font-serif-display italic mb-8">Stay in touch™</h3>
              <p className="text-zinc-400 text-lg mb-8">
                Ready to start a project? Let's connect on social media or drop me a line directly.
              </p>

              <div className="flex gap-6">
                <a href="#" className="p-3 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition duration-300"><Github size={20} /></a>
                <a href="#" className="p-3 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition duration-300"><Linkedin size={20} /></a>
                <a href="#" className="p-3 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition duration-300"><Mail size={20} /></a>
              </div>
            </motion.div>

            {/* Right: Navigation Grid */}
            <div className="grid grid-cols-2 gap-12 md:gap-24 text-left">
              {/* Column 1 */}
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
                <h4 className="font-bold text-zinc-500 uppercase tracking-wider text-xs">Explore</h4>
                <ul className="space-y-4 font-medium text-zinc-300">
                  <li><a href="#experience" className="hover:text-white transition">Experience</a></li>
                  <li><a href="#projects" className="hover:text-white transition">Projects</a></li>
                  <li><a href="#resume" className="hover:text-white transition">Resume</a></li>
                </ul>
              </motion.div>

              {/* Column 2 */}
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
                <h4 className="font-bold text-zinc-500 uppercase tracking-wider text-xs">Profile</h4>
                <ul className="space-y-4 font-medium text-zinc-300">
                  <li><a href="#education" className="hover:text-white transition">Education</a></li>
                  <li><a href="#skills" className="hover:text-white transition">Skills</a></li>
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* GIANT TYPOGRAPHY */}
        <div className="relative z-10 w-full flex justify-center overflow-hidden pb-4 md:pb-8">
          <h1 className="text-[13vw] md:text-[15vw] font-bold leading-tight tracking-tighter text-white select-none font-outfit lowercase mix-blend-overlay opacity-50">
            jil.works
          </h1>
        </div>

        <div className="relative z-10 text-center text-zinc-500 mt-10 text-sm">
          © {new Date().getFullYear()} Jil Makwana. All rights reserved.
        </div>
      </footer>

    </div >
  );
}
