
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Globe, AlertTriangle, TrendingUp, Shield } from "lucide-react";
import { projects } from "./data";
import Lenis from "lenis";

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

export default function ProjectDetails() {
    const { id } = useParams();
    const project = projects.find((p) => p.id === parseInt(id));

    // Initialize Lenis for Smooth Scrolling
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    if (!project) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white">
                <h1 className="text-4xl font-bold">Project Not Found</h1>
                <Link to="/" className="ml-4 underline text-gray-400">Go Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen text-white overflow-hidden font-outfit selection:bg-pink-500 selection:text-white">
            {/* Scroll to top on mount */}
            <ScrollToTop />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* HEADER / NAV */}
                <nav className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
                    <Link to="/" className="flex items-center gap-2 text-white hover:opacity-70 transition group">
                        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold uppercase tracking-widest text-sm">Back to Home</span>
                    </Link>
                </nav>

                {/* HERO SECTION */}
                <div className="relative pt-32 pb-20 px-6">
                    <AuroraBackground variant="blue" />

                    <div className="max-w-6xl mx-auto relative z-10">
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6"
                        >
                            {project.title}
                        </motion.h1>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
                        >
                            {project.desc}
                        </motion.p>

                        {/* MAIN IMAGE */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-16"
                        >
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </motion.div>

                        {/* CONTENT GRID */}
                        <div className="grid md:grid-cols-[1fr,2fr] gap-16">

                            {/* LEFT SIDEBAR (Meta) */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">Role</h3>
                                    <p className="text-xl font-medium">{project.role}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">Client</h3>
                                    <p className="text-xl font-medium">{project.client}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">Year</h3>
                                    <p className="text-xl font-medium">{project.year}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="border border-zinc-700 px-3 py-1 rounded-full text-sm text-zinc-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 pt-4">
                                    {project.demo && project.demo !== '#' && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold justify-center hover:bg-gray-200 transition"
                                        >
                                            <Globe size={18} /> Live Demo
                                        </a>
                                    )}
                                    {project.repo && project.repo !== '#' && (
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 border border-zinc-700 text-white px-6 py-3 rounded-full font-bold justify-center hover:bg-zinc-900 transition"
                                        >
                                            <Github size={18} /> View Code
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT CONTENT - CASE STUDY */}
                            <div className="text-lg text-gray-300 leading-loose space-y-12">

                                {/* Overview */}
                                <section>
                                    <h2 className="text-3xl font-bold text-white mb-4">The Challenge</h2>
                                    <p className="text-gray-300">{project.problem || project.description}</p>
                                </section>

                                <section>
                                    <h2 className="text-3xl font-bold text-white mb-4">Approach & Analysis</h2>
                                    <p className="text-gray-300">{project.approach || "Analysis phase details coming soon..."}</p>
                                </section>

                                {project.keyVariables && (
                                    <section>
                                        <h2 className="text-3xl font-bold text-white mb-6">Key Variable Interpretation</h2>
                                        <div className="grid gap-6">
                                            {project.keyVariables.map((variable, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className={`p-6 rounded-2xl border ${variable.type === 'risk' ? 'border-red-500/20 bg-red-500/5' : 'border-green-500/20 bg-green-500/5'}`}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className={`p-3 rounded-xl ${variable.type === 'risk' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                                            {variable.type === 'risk' ? (
                                                                variable.title === "Crime Rate" ? <AlertTriangle size={24} /> : <TrendingUp size={24} />
                                                            ) : (
                                                                <Shield size={24} />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-bold text-white mb-1">{variable.title}</h3>
                                                            <p className={`text-sm font-semibold mb-3 ${variable.type === 'risk' ? 'text-red-400' : 'text-green-400'}`}>
                                                                {variable.sub}
                                                            </p>
                                                            <p className="text-gray-400 text-base mb-3 leading-relaxed">
                                                                {variable.description}
                                                            </p>
                                                            <div className="flex flex-wrap gap-4 text-sm">
                                                                <div className="bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                                                                    <span className="text-gray-500 mr-2">Hazard Ratio:</span>
                                                                    <span className="text-white font-mono">{variable.hazardRatio}</span>
                                                                </div>
                                                                <div className="bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                                                                    <span className="text-gray-500 mr-2">Insight:</span>
                                                                    <span className="text-white">{variable.insight}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                <section>
                                    <h2 className="text-3xl font-bold text-white mb-4">The Solution</h2>
                                    <p className="text-gray-300">{project.solution || project.desc}</p>
                                </section>

                                <section>
                                    <h2 className="text-3xl font-bold text-white mb-4">Impact</h2>
                                    <p className="text-gray-300">{project.impact || project.highlight}</p>
                                </section>

                                {/* Placeholder for more images if available */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                    <div className="bg-zinc-900 rounded-xl h-64 w-full flex items-center justify-center text-zinc-700">Project Asset 1</div>
                                    <div className="bg-zinc-900 rounded-xl h-64 w-full flex items-center justify-center text-zinc-700">Project Asset 2</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// Utility to scroll top on change
function ScrollToTop() {
    const { pathname } = window.location;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}
