import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  Code2,
  Database,
  Globe,
  Layers3,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  PanelsTopLeft,
  Box,
  Boxes,
  ExternalLink,
  Menu,
  X,
  Search,
  TrendingUp,
  BarChart2,
  FileText,
  Link2,
  CheckCircle2,
  ShoppingCart,
  Settings,
  Puzzle,
  Gauge,
} from "lucide-react";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";
/* ─────────────────────────── DATA ─────────────────────────── */

const skills = {
  Frontend: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Responsive Design",
    "UI/UX",
  ],
  Backend: ["Node.js", "Express.js", "REST APIs", "Entity Framework"],
  Database: [
    "SQL Server",
    "MySQL",
    "MongoDB",
    "Database Design",
    "Stored Procedures",
  ],
  Tools: [
    "Git",
    "VS Code",
    "Visual Studio",
    "Figma",
    "WordPress",
    "WooCommerce",
  ],
};

const services = [
  {
    title: "Website Strategy",
    desc: "Practical ideas for creating websites that look professional, feel trustworthy, and communicate clearly.",
    icon: Globe,
    highlight: true,
  },
  {
    title: "WordPress Development",
    desc: "Custom WordPress themes, plugins, and practical site builds with a clean structure and smooth editing flow.",
    icon: Puzzle,
    highlight: true,
  },
  {
    title: "SEO Optimization",
    desc: "Technical SEO, content structure, and website improvements that help pages become easier to discover.",
    icon: Search,
    highlight: true,
  },
  {
    title: "Full Stack Development",
    desc: "Modern web applications with frontend design, backend logic, and database planning.",
    icon: Layers3,
  },
  {
    title: "UI/UX Design",
    desc: "Simple, user-friendly interfaces designed to feel modern, clear, and easy to navigate.",
    icon: PanelsTopLeft,
  },
  {
    title: "E-Commerce Solutions",
    desc: "WooCommerce stores and product experiences that help digital commerce feel organised and smooth.",
    icon: Boxes,
  },
];

const projects = [
  {
    name: "Wolf Expense",
    type: "Expense management app",
    details:
      "A clean personal finance app built to help users track spending, manage budgets, and stay organised.",
    tag: "Productivity project",
    link: "https://expo.dev/accounts/sathish_web/projects/wolf-expense/builds/43ee76f4-4a88-4f11-a1d7-a11faf402c28",
  },
  {
    name: "WooCommerce Plugin",
    type: "WordPress extension",
    details:
      "A custom plugin for product metadata and import/export workflows designed to simplify store management.",
    tag: "WordPress automation",
    link: "https://sathishcraftfolio.in",
  },
  {
    name: "Portfolio Website",
    type: "Personal branding site",
    details:
      "A premium portfolio concept focused on clarity, motion, and a clean digital presence.",
    tag: "Brand presence",
    link: "https://sathishcraftfolio.in",
  },
];

const wordpressFeatures = [
  {
    icon: Puzzle,
    title: "Custom Themes",
    desc: "Lightweight WordPress themes built from scratch for speed, control, and a professional appearance.",
  },
  {
    icon: Settings,
    title: "Plugin Solutions",
    desc: "Custom plugin features that fit real needs instead of forcing everything into a template.",
  },
  {
    icon: ShoppingCart,
    title: "WooCommerce Stores",
    desc: "Online stores with smoother product pages, checkout flow, and organised store management.",
  },
  {
    icon: Gauge,
    title: "Performance First",
    desc: "Fast loading pages, better Core Web Vitals, and a smoother experience on mobile and desktop.",
  },
];

const seoFeatures = [
  {
    icon: Search,
    title: "Technical SEO",
    desc: "Fix crawl issues, indexing problems, structured data, sitemaps, and site health basics.",
  },
  {
    icon: FileText,
    title: "On-Page SEO",
    desc: "Titles, meta descriptions, headings, keyword structure, and page content that makes sense.",
  },
  {
    icon: Link2,
    title: "Internal Linking",
    desc: "A stronger site structure that helps visitors move naturally and helps search engines understand pages.",
  },
  {
    icon: TrendingUp,
    title: "Core Web Vitals",
    desc: "Improve loading speed, layout stability, and interaction quality for better search and usability.",
  },
  {
    icon: BarChart2,
    title: "Tracking Setup",
    desc: "Analytics and Search Console setup so performance can be measured clearly.",
  },
  {
    icon: CheckCircle2,
    title: "Local SEO",
    desc: "Help local businesses appear more clearly in nearby searches and map results.",
  },
];

const whyMe = [
  "Strong experience building modern, responsive web applications.",
  "Business-focused approach that balances design, performance, and usability.",
  "Solid knowledge of frontend, backend, database, and WordPress technologies.",
  "Commitment to writing clean, maintainable, and scalable code.",
  "Focused on performance, accessibility, and SEO best practices.",
  "Continuous learner who stays updated with modern web technologies.",
];

/* ─────────────────────────── HELPER COMPONENTS ─────────────────────────── */

function FadeInSection({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="mb-10 flex items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
      <span className="whitespace-nowrap rounded-full border border-sky-400/30 bg-sky-400/8 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-sky-300 backdrop-blur-xl">
        {children}
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
    </div>
  );
}

function SkillBar({ label, level, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-slate-200">{label}</span>
        <span className="font-medium tabular-nums text-sky-300">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-500"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function MobileNav({ open, setOpen }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
          className="absolute left-0 top-full z-50 flex w-full flex-col gap-5 border-b border-white/10 bg-[#05070d]/98 px-6 py-6 backdrop-blur-2xl"
        >
          {["About", "Skills", "WordPress", "SEO", "Projects", "Contact"].map(
            (s) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-slate-200 transition-colors hover:text-sky-300"
              >
                {s}
              </a>
            ),
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypingText() {
  const phrases = useMemo(
    () => [
      "Sharing website ideas",
      "Explaining SEO in simple words",
      "Posting useful web tips",
      "Building clean digital presence",
      "Learning and creating every day",
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [fwd, setFwd] = useState(true);

  useEffect(() => {
    const t = setTimeout(
      () => {
        const cur = phrases[index];
        if (fwd) {
          if (sub < cur.length) setSub((v) => v + 1);
          else setFwd(false);
        } else {
          if (sub > 0) setSub((v) => v - 1);
          else {
            setFwd(true);
            setIndex((v) => (v + 1) % phrases.length);
          }
        }
      },
      fwd ? 58 : 26,
    );
    return () => clearTimeout(t);
  }, [phrases, index, sub, fwd]);

  return (
    <span className="inline-flex items-center gap-2 text-sky-300">
      <span>{phrases[index].slice(0, sub)}</span>
      <motion.span
        className="inline-block h-[1.15em] w-[2px] rounded-full bg-sky-400"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
      />
    </span>
  );
}

function GlobalSpotlight() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-all duration-300"
      style={{
        background: `radial-gradient(circle 600px at ${mouse.x}% ${mouse.y}%, rgba(56,189,248,0.12) 0%, rgba(14,165,233,0.05) 45%, transparent 70%)`,
      }}
    />
  );
}

function HeroParticles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 0.6,
        dur: Math.random() * 16 + 10,
        delay: Math.random() * -14,
        opacity: Math.random() * 0.25 + 0.08,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-sky-400"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
          }}
          animate={{
            y: [-14, 14],
            opacity: [d.opacity * 0.4, d.opacity, d.opacity * 0.4],
          }}
          transition={{
            duration: d.dur,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function HeroGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_40%,rgba(5,7,13,0.85)_100%)]" />
      {[15, 35, 65, 82].map((pct, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-px bg-gradient-to-b from-transparent via-sky-400/20 to-transparent"
          style={{ left: `${pct}%`, height: "100%" }}
          animate={{ opacity: [0, 0.6, 0], scaleY: [0.3, 1, 0.3] }}
          transition={{
            duration: 6 + i * 1.2,
            delay: i * 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/25 to-transparent"
        initial={{ top: "0%" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3,
        }}
      />
    </div>
  );
}

function HeroOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute rounded-full bg-sky-500/14 blur-[90px]"
        style={{ width: 360, height: 360, top: "5%", left: "3%" }}
        animate={{ x: [-20, 20], y: [-15, 15] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute rounded-full bg-blue-600/10 blur-[110px]"
        style={{ width: 440, height: 440, top: "0%", right: "5%" }}
        animate={{ x: [15, -15], y: [-10, 20] }}
        transition={{
          duration: 13,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute rounded-full bg-cyan-500/10 blur-[80px]"
        style={{ width: 260, height: 260, bottom: "8%", left: "28%" }}
        animate={{ x: [-10, 18], y: [10, -10] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}

function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[340px] xl:max-w-[370px]"
    >
      <motion.div
        className="absolute inset-[-16px] rounded-[2.5rem] border border-sky-400/10"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-[-32px] rounded-[3rem] border border-sky-400/5"
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.03, 1] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <div className="relative rounded-[2rem] border border-white/12 bg-white/[0.04] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(56,189,248,0.14),transparent_45%,rgba(37,99,235,0.09))]" />
        <div className="relative space-y-3">
          <div className="relative flex items-center justify-center px-9 py-9">
            <motion.div
              className="relative z-10 overflow-hidden rounded-[1.4rem] border-2 border-sky-400/30 shadow-[0_0_48px_rgba(14,165,233,0.22)]"
              style={{ width: "calc(100% - 0px)", aspectRatio: "1" }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.7,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                src="/Sathishk.jpeg"
                alt="Sathish K profile"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </motion.div>
          </div>
          <motion.div
            className="rounded-[1.4rem] border border-white/10 bg-[rgba(8,12,20,0.72)] p-5 backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.9,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.32em] text-sky-300/80">
              Digital Profile
            </p>
            <h2 className="mt-1.5 text-xl font-bold text-white">Sathish K</h2>
            <p className="mt-0.5 text-xs text-slate-300">
              Full Stack Developer · WordPress · SEO
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {[
                ["Focus", "Business Websites"],
                ["Stack", "React · Node · SQL"],
                ["Years Experience", "3+"],
                ["Style", "Clean & Professional"],
              ].map(([k, v], i) => (
                <motion.div
                  key={k}
                  className="rounded-xl border border-white/10 bg-white/5 p-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.05 + i * 0.07 }}
                >
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-sky-400/90">
                    {k}
                  </p>
                  <p className="mt-0.5 font-medium leading-snug text-slate-200">
                    {v}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════ MAIN ══════════════════════════════════════ */

export default function PortfolioWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    const topFn = () => setShowTop(window.scrollY > 500);

    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("scroll", topFn, { passive: true });

    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("scroll", topFn);
    };
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070d] text-white">
      <GlobalSpotlight />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* NAVBAR */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/8 bg-[#05070d]/88 shadow-[0_1px_24px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            : ""
        }`}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/40 bg-sky-400/10 shadow-[0_0_20px_rgba(14,165,233,0.25)]">
              <span className="text-sm font-bold tracking-widest text-sky-300">
                SK
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-tight text-white">
                Sathish K
              </p>
              <p className="text-[10px] uppercase tracking-[0.28em] text-sky-300/70">
                Personal Brand
              </p>
            </div>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden items-center gap-6 text-sm text-slate-300 md:flex"
          >
            {["About", "Skills", "WordPress", "SEO", "Projects", "Contact"].map(
              (s) => (
                <a
                  key={s}
                  href={`#${s.toLowerCase()}`}
                  className="group relative transition-colors hover:text-white"
                >
                  {s}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-sky-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ),
            )}
            <a
              href="#contact"
              className="ml-1 rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-2 font-medium text-sky-300 transition hover:border-sky-400/50 hover:bg-sky-400/20"
            >
              Explore
            </a>
          </motion.nav>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-slate-200 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
          <MobileNav open={menuOpen} setOpen={setMenuOpen} />
        </div>
      </header>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative z-10 flex min-h-[100vh] flex-col justify-center overflow-hidden"
      >
        <HeroOrbs />
        <HeroGrid />
        <HeroParticles />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8"
        >
          <div className="grid items-center gap-10 py-20 lg:grid-cols-[1.18fr_0.82fr] lg:py-24 xl:gap-20">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-7"
            >
              <motion.div
                variants={item}
                className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/30 bg-sky-400/8 px-4 py-2 text-xs text-slate-200 backdrop-blur-xl"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span>Sharing useful web content</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">Coimbatore, Tamil Nadu</span>
              </motion.div>

              <motion.div variants={item}>
                <h1 className="max-w-2xl text-[2.65rem] font-bold leading-[1.07] tracking-tight text-white sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]">
                  Building{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                      Modern,
                    </span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-sky-400 to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        delay: 0.9,
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </span>{" "}
                  Clear &amp;{" "}
                  <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                    Business-Focused
                  </span>{" "}
                  Digital Experiences
                </h1>
              </motion.div>

              <motion.p
                variants={item}
                className="max-w-xl text-base leading-[1.75] text-slate-300 sm:text-lg"
              >
                I'm <span className="font-semibold text-white">Sathish K</span>{" "}
                — a Full Stack Developer, WordPress specialist, and SEO-focused
                creator from Coimbatore. I share simple website ideas, SEO tips,
                and clean digital design thinking for people who want a stronger
                online presence.
              </motion.p>

              <motion.div
                variants={item}
                className="flex flex-wrap gap-2 text-sm"
              >
                {[
                  "React",
                  "Node.js",
                  "WordPress",
                  "SEO",
                  "UI/UX",
                  "TypeScript",
                ].map((t) => (
                  <motion.span
                    key={t}
                    className="rounded-full border border-sky-400/22 bg-sky-400/7 px-3.5 py-1.5 font-medium text-sky-200 backdrop-blur-xl"
                    whileHover={{
                      scale: 1.07,
                      borderColor: "rgba(56,189,248,0.45)",
                      backgroundColor: "rgba(56,189,248,0.14)",
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div variants={item} className="space-y-4">
                <div className="inline-flex min-h-[3.2rem] items-center rounded-2xl border border-sky-400/25 bg-white/[0.04] px-5 py-3 text-base font-semibold shadow-[0_0_30px_rgba(14,165,233,0.14)] backdrop-blur-xl">
                  <TypingText />
                </div>
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href="#projects"
                    className="group inline-flex items-center gap-2 rounded-xl bg-sky-400 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_32px_rgba(56,189,248,0.45)] transition-all duration-300"
                    whileHover={{
                      y: -3,
                      boxShadow: "0 0 52px rgba(56,189,248,0.65)",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    See My Work{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                  <motion.a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-sky-400/30 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-xl"
                    whileHover={{
                      y: -3,
                      borderColor: "rgba(56,189,248,0.55)",
                      backgroundColor: "rgba(255,255,255,0.08)",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Connect
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            <ProfileCard />
          </div>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8">
        {/* ABOUT */}
        <section id="about" className="py-10 sm:py-14">
          <FadeInSection>
            <SectionLabel>About Me</SectionLabel>
          </FadeInSection>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <FadeInSection delay={0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
              >
                <h3 className="text-2xl font-bold leading-snug text-white">
                  A developer who shares value
                  <br />
                  <span className="text-sky-300">before showing results.</span>
                </h3>
                <p className="mt-5 leading-7 text-slate-300">
                  I build websites and web applications that feel premium, work
                  smoothly, and help businesses communicate clearly. Alongside
                  development, I share practical tips about websites, SEO, and
                  digital branding so people can understand what makes a strong
                  online presence.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    ["Location", "Coimbatore, Tamil Nadu"],
                    ["Role", "Full Stack Developer · WordPress · SEO"],
                    ["Specialty", "Scalable web apps"],
                    ["Style", "Clean, modern, responsive"],
                  ].map(([l, v]) => (
                    <div key={l} className="flex items-start gap-3 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-400" />
                      <span className="w-20 flex-shrink-0 text-slate-500">
                        {l}:
                      </span>
                      <span className="text-slate-200">{v}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </FadeInSection>

            <FadeInSection delay={0.16}>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-[2rem] border border-sky-400/20 bg-[linear-gradient(180deg,rgba(14,165,233,0.08),rgba(255,255,255,0.03))] p-8 backdrop-blur-2xl"
              >
                <p className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-sky-300">
                  Core Strengths
                </p>
                <div className="space-y-5">
                  {[
                    { label: "React / Frontend", level: 90 },
                    { label: "WordPress / WooCommerce", level: 88 },
                    { label: "SEO Optimisation", level: 85 },
                    { label: "Node.js / Backend", level: 82 },
                    { label: "UI/UX Design", level: 85 },
                    { label: "Database Design", level: 78 },
                  ].map((s, i) => (
                    <SkillBar key={s.label} {...s} delay={0.18 + i * 0.07} />
                  ))}
                </div>
              </motion.div>
            </FadeInSection>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-10 sm:py-14">
          <FadeInSection>
            <SectionLabel>Skills</SectionLabel>
          </FadeInSection>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {Object.entries(skills).map(([cat, items], ci) => (
              <FadeInSection key={cat} delay={ci * 0.09}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.012 }}
                  className="h-full rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-shadow hover:border-sky-400/25 hover:shadow-[0_0_32px_rgba(14,165,233,0.10)]"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-400/25 bg-sky-400/10 text-sky-300">
                      {cat === "Frontend" && (
                        <PanelsTopLeft className="h-4 w-4" />
                      )}
                      {cat === "Backend" && <Code2 className="h-4 w-4" />}
                      {cat === "Database" && <Database className="h-4 w-4" />}
                      {cat === "Tools" && <Sparkles className="h-4 w-4" />}
                    </div>
                    <h3 className="font-bold text-white">{cat}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item, ii) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.06 + ii * 0.045 }}
                        className="rounded-full border border-sky-400/15 bg-black/25 px-3 py-1.5 text-xs text-slate-200"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-10 sm:py-14">
          <FadeInSection>
            <SectionLabel>What I Share & Build</SectionLabel>
          </FadeInSection>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <FadeInSection key={svc.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`h-full cursor-default rounded-[2rem] p-6 backdrop-blur-2xl transition-all ${
                      svc.highlight
                        ? "border border-sky-400/30 bg-[linear-gradient(135deg,rgba(14,165,233,0.12),rgba(37,99,235,0.07))] shadow-[0_0_40px_rgba(14,165,233,0.10)] hover:shadow-[0_0_60px_rgba(14,165,233,0.18)]"
                        : "border border-white/10 bg-white/5 hover:shadow-[0_0_32px_rgba(14,165,233,0.08)]"
                    }`}
                  >
                    <div className="mb-5 flex flex-col gap-3">
                      {svc.highlight && (
                        <span className="inline-flex self-start items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                          <Sparkles className="h-3 w-3" /> Core Focus
                        </span>
                      )}
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        className={`inline-flex self-start rounded-2xl border p-3.5 ${
                          svc.highlight
                            ? "border-sky-400/30 bg-sky-400/12 text-sky-300"
                            : "border-sky-400/15 bg-black/25 text-sky-300"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {svc.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-slate-300">
                      {svc.desc}
                    </p>
                  </motion.div>
                </FadeInSection>
              );
            })}
          </div>
        </section>

        {/* WORDPRESS SPOTLIGHT */}
        <section id="wordpress" className="py-10 sm:py-14">
          <FadeInSection>
            <SectionLabel>WordPress Development</SectionLabel>
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-sky-400/25 bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(37,99,235,0.08)_50%,rgba(5,7,13,0.95))] p-8 shadow-[0_0_60px_rgba(14,165,233,0.10)] backdrop-blur-2xl sm:p-10">
              <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.12),transparent_55%)]" />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-300">
                    <Sparkles className="h-3.5 w-3.5" /> Key Service
                  </div>
                  <h2 className="text-3xl font-bold leading-snug text-white sm:text-4xl">
                    WordPress that feels
                    <br />
                    <span className="text-sky-300">
                      simple, fast, and reliable.
                    </span>
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    I build WordPress websites that do more than look nice. They
                    are structured for speed, easy editing, better SEO, and
                    smoother user journeys. From themes to plugins to
                    WooCommerce, the focus stays on usefulness.
                  </p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-400 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.35)]"
                  >
                    Read More <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:w-80 lg:flex-shrink-0">
                  {[
                    ["Custom Themes", "Built from scratch for flexibility"],
                    ["WooCommerce", "Stores designed for growth"],
                    ["Plugin Dev", "Business logic made simple"],
                    ["Speed Tuned", "Performance and Core Web Vitals"],
                  ].map(([t, s]) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-sky-400/15 bg-black/35 p-5"
                    >
                      <p className="text-sm font-bold leading-snug text-sky-300">
                        {t}
                      </p>
                      <p className="mt-1.5 text-xs leading-5 text-slate-300">
                        {s}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {wordpressFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeInSection key={f.title} delay={i * 0.09}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="h-full rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all hover:border-sky-400/20 hover:shadow-[0_0_28px_rgba(14,165,233,0.08)]"
                  >
                    <div className="mb-4 inline-flex rounded-2xl border border-sky-400/20 bg-sky-400/8 p-3 text-sky-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{f.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-300">
                      {f.desc}
                    </p>
                  </motion.div>
                </FadeInSection>
              );
            })}
          </div>
        </section>

        {/* SEO SPOTLIGHT */}
        <section id="seo" className="py-10 sm:py-14">
          <FadeInSection>
            <SectionLabel>SEO Optimization</SectionLabel>
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.10),rgba(5,150,105,0.06)_50%,rgba(5,7,13,0.95))] p-8 shadow-[0_0_60px_rgba(16,185,129,0.08)] backdrop-blur-2xl sm:p-10">
              <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.10),transparent_55%)]" />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/8 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
                    <Sparkles className="h-3.5 w-3.5" /> Key Service
                  </div>
                  <h2 className="text-3xl font-bold leading-snug text-white sm:text-4xl">
                    Rank higher.
                    <br />
                    <span className="text-emerald-300">
                      Get found. Grow smarter.
                    </span>
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    SEO is not just keywords. It is the technical structure, the
                    content clarity, and the overall experience that helps a
                    website earn visibility. I focus on the parts that improve
                    trust, discoverability, and long-term traffic.
                  </p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.35)]"
                  >
                    Read SEO Notes <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:w-80 lg:flex-shrink-0">
                  {[
                    ["Technical SEO", "Health, crawl, and index issues"],
                    ["Core Web Vitals", "Speed and usability improvements"],
                    ["On-page SEO", "Titles, meta, schema, headings"],
                    ["Local SEO", "Nearby search visibility"],
                  ].map(([t, s]) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-emerald-400/15 bg-black/35 p-5"
                    >
                      <p className="text-sm font-bold leading-snug text-emerald-300">
                        {t}
                      </p>
                      <p className="mt-1.5 text-xs leading-5 text-slate-300">
                        {s}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {seoFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeInSection key={f.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="h-full rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all hover:border-emerald-400/20 hover:shadow-[0_0_28px_rgba(16,185,129,0.07)]"
                  >
                    <div className="mb-4 inline-flex rounded-2xl border border-emerald-400/20 bg-emerald-400/6 p-3 text-emerald-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{f.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-300">
                      {f.desc}
                    </p>
                  </motion.div>
                </FadeInSection>
              );
            })}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-10 sm:py-14">
          <FadeInSection>
            <SectionLabel>Featured Projects</SectionLabel>
          </FadeInSection>
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((proj, i) => (
              <FadeInSection key={proj.name} delay={i * 0.11}>
                <motion.article
                  whileHover={{ y: -10 }}
                  className="group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl transition-all hover:border-sky-400/20 hover:shadow-[0_12px_60px_rgba(14,165,233,0.13)]"
                >
                  <div className="relative h-44 overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.22),rgba(5,7,13,0.95)_70%)] p-6">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-blue-600/5 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative flex items-start justify-between">
                      <span className="rounded-full border border-sky-400/25 bg-black/35 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-sky-300">
                        {proj.tag}
                      </span>
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="rounded-xl border border-white/12 bg-white/8 p-2.5 text-sky-300"
                      >
                        <Box className="h-4 w-4" />
                      </motion.div>
                    </div>
                    <h3 className="absolute bottom-5 left-6 text-xl font-bold text-white">
                      {proj.name}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
                      {proj.type}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {proj.details}
                    </p>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-xs text-sky-300/50 transition-colors duration-200 group-hover:text-sky-300"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Open Project</span>
                    </a>
                  </div>
                </motion.article>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* WHY WORK WITH ME */}
        <section className="py-10 sm:py-14">
          <FadeInSection>
            <SectionLabel>Crafting Modern Digital Experiences.</SectionLabel>
          </FadeInSection>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-sky-400/30 sm:p-8">
              <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                {whyMe.map((item, i) => (
                  <div
                    key={item}
                    className="flex gap-3 break-words rounded-2xl border border-white/10 bg-black/20 p-3 transition-all duration-200 hover:border-sky-400/30 sm:p-4"
                    style={{
                      animationDelay: `${i * 0.05}s`,
                      opacity: 0,
                      animation: "fadeInUp 0.5s ease forwards",
                    }}
                  >
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-400" />
                    <p className="text-sm leading-6 text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-full overflow-hidden rounded-[2rem] border border-sky-400/20 bg-gradient-to-br from-sky-400/5 via-transparent to-transparent p-5 transition-all duration-300 hover:border-sky-400/40 sm:p-8">
              <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
                Crafting Modern
                <br />
                <span className="text-sky-300">Digital Experiences.</span>
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:mt-4">
                I enjoy building modern digital experiences that combine clean
                design, strong performance, and intuitive user experiences. My
                focus is creating websites and applications that are reliable,
                scalable, and user-friendly.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4">
                {[
                  ["Frontend", "React, TypeScript, responsive interfaces"],
                  ["Backend", "Node.js, APIs, server-side development"],
                  ["WordPress", "Custom themes, plugins, WooCommerce"],
                  ["SEO", "Technical optimisation and performance"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="break-words rounded-2xl border border-white/10 bg-black/22 p-3 transition-all duration-200 hover:border-sky-400/30 sm:p-4"
                  >
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                      {k}
                    </p>
                    <p className="text-xs leading-5 text-slate-300">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(12px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @media (max-width: 640px) {
              .backdrop-blur-2xl, .backdrop-blur-sm, .backdrop-blur {
                backdrop-filter: none !important;
              }
              [class*="backdrop-blur"] {
                backdrop-filter: none !important;
              }
            }
          `}</style>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-10 sm:py-14">
          <FadeInSection>
            <SectionLabel>Contact</SectionLabel>
          </FadeInSection>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <FadeInSection delay={0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
              >
                <h3 className="text-2xl font-bold text-white">
                  Let’s create something{" "}
                  <span className="text-sky-300">useful and polished.</span>
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  This space is for sharing ideas, website tips, SEO notes, and
                  clean digital work. It is also a place to connect about web
                  design, WordPress, and online presence improvement.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    {
                      icon: Mail,
                      label: "sathishcraftfolio@gmail.com",
                      href: "mailto:sathishcraftfolio@gmail.com",
                    },
                    {
                      icon: Phone,
                      label: "+91 6374646370",
                      href: "tel:+916374646370",
                    },
                    {
                      icon: MapPin,
                      label: "Coimbatore, Tamil Nadu, India",
                      href: null,
                    },
                  ].map(({ icon: Icon, label, href }) => (
                    <motion.div
                      key={label}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-200"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-sky-400" />
                      {href ? (
                        <a
                          href={href}
                          className="break-all transition-colors hover:text-sky-300"
                        >
                          {label}
                        </a>
                      ) : (
                        <span>{label}</span>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8">
                  {/* Social Media */}
                  <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-6">
                    <motion.a
                      whileHover={{ y: -3, scale: 1.1 }}
                      href="https://www.instagram.com/sathish_web/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 transition-all hover:bg-pink-500/20"
                    >
                      <FaInstagram className="h-5 w-5" />
                    </motion.a>

                    <motion.a
                      whileHover={{ y: -3, scale: 1.1 }}
                      href="https://www.linkedin.com/in/sathish-webexp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 transition-all hover:bg-sky-500/20"
                    >
                      <FaLinkedinIn className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </FadeInSection>

            <FadeInSection delay={0.16}>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-[2rem] border border-sky-400/20 bg-[linear-gradient(180deg,rgba(14,165,233,0.10),rgba(255,255,255,0.03))] p-8 backdrop-blur-2xl"
              >
                <div className="flex h-full flex-col">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-300/80">
                      Built for trust
                    </p>
                    <h3 className="mt-3 text-2xl font-bold leading-snug text-white">
                      A digital presence that feels{" "}
                      <span className="text-sky-300">clean and modern.</span>
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      Clean motion, clear messaging, and SEO-ready structure
                      help create a stronger first impression. The aim is not
                      only to look good, but also to communicate well.
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      [
                        "Web Design Tips",
                        "Simple ideas to improve layout and clarity",
                      ],
                      ["SEO Notes", "Practical ways to get found on Google"],
                      [
                        "WordPress Ideas",
                        "Useful ways to build and manage websites",
                      ],
                      ["Brand Growth", "Content that builds trust over time"],
                    ].map(([title, desc]) => (
                      <div
                        key={title}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4"
                      >
                        <p className="text-sm font-semibold text-sky-300">
                          {title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-300">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8">
                    <motion.a
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      href="mailto:sathishcraftfolio@gmail.com"
                      className="inline-flex items-center gap-2 rounded-xl bg-sky-400 px-7 py-3.5 text-sm font-bold text-slate-950 transition-colors hover:bg-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.35)]"
                    >
                      Start a Conversation <ArrowRight className="h-4 w-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </FadeInSection>
          </div>
        </section>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-28 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-sky-400/30 bg-sky-500 shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300 hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp className="h-6 w-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/916374646370"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="flex items-center gap-3">
          <div className="pointer-events-none opacity-0 translate-x-3 rounded-xl border border-white/10 bg-[#0b1220]/95 px-4 py-2 text-sm text-white backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Chat on WhatsApp
          </div>

          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-[0_0_40px_rgba(37,211,102,0.6)] transition-all duration-300 group-hover:scale-110">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
            <FaWhatsapp className="h-8 w-8 text-white" />
          </div>
        </div>
      </a>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/8 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Sathish K · Full Stack Developer </p>
      </footer>
    </div>
  );
}
