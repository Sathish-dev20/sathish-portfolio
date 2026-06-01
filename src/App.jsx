import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Code2,
  Database,
  Globe,
  Layers3,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Zap,
  Cpu,
  PanelsTopLeft,
  Box,
  Boxes,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
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
  Star,
} from "lucide-react";

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
    title: "WordPress Development",
    desc: "Custom themes, plugins, and full site builds on WordPress — fast, secure, and easy to manage.",
    icon: Puzzle,
    highlight: true,
  },
  {
    title: "SEO Optimization",
    desc: "Technical SEO, on-page optimization, and speed improvements to rank higher and attract more clients.",
    icon: Search,
    highlight: true,
  },
  {
    title: "Business Websites",
    desc: "Professional websites designed to build credibility, communicate value clearly, improve customer trust, and convert visitors into long-term clients.",
    icon: Globe,
  },
  {
    title: "Full Stack Development",
    desc: "Custom web applications built with modern technologies, scalable architecture, optimized databases, and seamless integrations for business operations.",
    icon: Layers3,
  },
  {
    title: "UI/UX Design",
    desc: "User-centered interfaces crafted with modern design principles, intuitive navigation, engaging interactions, and refined experiences across devices.",
    icon: PanelsTopLeft,
  },
  {
    title: "E-Commerce Solutions",
    desc: "WooCommerce stores tailored for growth with optimized shopping experiences, custom functionality, secure payments, and streamlined product management.",
    icon: Boxes,
  },
];

const projects = [
  {
    name: "Wolf Expense",
    type: "Expense management app",
    details:
      "A personal finance and budget tracking solution designed for clarity, speed, and everyday use.",
    tag: "Productivity-focused",
    link: "https://expo.dev/accounts/sathish_web/projects/wolf-expense/builds/43ee76f4-4a88-4f11-a1d7-a11faf402c28",
  },
  {
    name: "WooCommerce Plugin",
    type: "WordPress extension",
    details:
      "A custom plugin for adding product metadata and improving store workflows with import/export support.",
    tag: "Commerce automation",
  },
];

const wordpressFeatures = [
  {
    icon: Puzzle,
    title: "Custom Theme Development",
    desc: "Pixel-perfect themes built from scratch — no bloated page builders, just clean code that loads fast.",
  },
  {
    icon: Settings,
    title: "Plugin Development",
    desc: "Bespoke plugins tailored to your business logic — extend WordPress exactly the way you need.",
  },
  {
    icon: ShoppingCart,
    title: "WooCommerce Stores",
    desc: "Full e-commerce setups with custom product flows, payment gateways, and order management.",
  },
  {
    icon: Gauge,
    title: "Speed & Performance",
    desc: "Core Web Vitals optimisation, caching, CDN setup, and image pipelines for sub-2s load times.",
  },
];

const seoFeatures = [
  {
    icon: Search,
    title: "Technical SEO Audit",
    desc: "Site crawl, indexability fixes, structured data, canonical tags, and sitemap submission.",
  },
  {
    icon: FileText,
    title: "On-Page Optimisation",
    desc: "Title tags, meta descriptions, header hierarchy, keyword mapping, and content structure.",
  },
  {
    icon: Link2,
    title: "Internal Linking Strategy",
    desc: "Logical link architecture that distributes authority and improves crawl efficiency.",
  },
  {
    icon: TrendingUp,
    title: "Core Web Vitals",
    desc: "LCP, CLS, and INP improvements so Google rewards your site with better rankings.",
  },
  {
    icon: BarChart2,
    title: "Analytics & Tracking",
    desc: "GA4 setup, Search Console integration, and monthly ranking reports.",
  },
  {
    icon: CheckCircle2,
    title: "Local SEO",
    desc: "Google Business Profile, NAP consistency, and geo-targeted landing pages for local visibility.",
  },
];

const whyMe = [
  "Premium design taste with a clean, modern visual system.",
  "Strong technical mindset across frontend, backend, and databases.",
  "Business-first thinking: websites built to attract clients, not just look good.",
  "Responsive communication and reliable delivery for freelance and agency work.",
  "WordPress & SEO expertise that helps businesses rank higher and convert more visitors.",
  "Every project is optimised for speed, accessibility, and long-term scalability.",
];

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Projects Built" },
  { value: "100%", label: "Client Focus" },
  { value: "5★", label: "Quality Standard" },
];

const floatingIcons = [Code2, Database, Sparkles, Zap, Globe, Cpu];
const iconPositions = [
  { top: "0%", left: "50%", transform: "translate(-50%,-50%)" },
  { top: "18%", right: "0%", transform: "translateX(0)" },
  { top: "68%", right: "0%", transform: "translateX(0)" },
  { top: "100%", left: "50%", transform: "translate(-50%,-50%)" },
  { top: "68%", left: "0%", transform: "translateX(0)" },
  { top: "18%", left: "0%", transform: "translateX(0)" },
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
    <div className="flex items-center gap-3 mb-10">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
      <span className="rounded-full border border-sky-400/30 bg-sky-400/8 px-5 py-2 text-[10px] tracking-[0.32em] text-sky-300 font-semibold uppercase backdrop-blur-xl whitespace-nowrap">
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
        <span className="text-sky-300 tabular-nums font-medium">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
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
          className="absolute left-0 top-full z-50 w-full border-b border-white/10 bg-[#05070d]/98 backdrop-blur-2xl px-6 py-6 flex flex-col gap-5"
        >
          {["About", "Skills", "WordPress", "SEO", "Projects", "Contact"].map(
            (s) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-sky-300 transition-colors"
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
      "Full Stack Web Developer",
      "WordPress Developer",
      "SEO Specialist",
      "UI/UX Designer",
      "React & Node.js Expert",
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

// Global mouse spotlight (works everywhere, doesn't dim content)
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
          <div className="relative flex items-center justify-center py-9 px-9">
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
              <img src="/Sathishk.jpeg" alt="Profile" />
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
              Professional Profile
            </p>
            <h2 className="mt-1.5 text-xl font-bold text-white">Sathish K</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Full Stack Developer · WordPress · SEO
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {[
                ["Focus", "Business Websites"],
                ["Stack", "React · Node · SQL"],
                ["SEO", "Technical SEO"],
                ["Goal", "Premium Clients"],
              ].map(([k, v], i) => (
                <motion.div
                  key={k}
                  className="rounded-xl border border-white/10 bg-white/5 p-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.05 + i * 0.07 }}
                >
                  <p className="text-sky-400/90 text-[9px] uppercase tracking-wider font-semibold">
                    {k}
                  </p>
                  <p className="mt-0.5 font-medium text-slate-200 leading-snug">
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
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
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
      {" "}
      <GlobalSpotlight />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />
      {/* ═══ NAVBAR ═══ */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/8 bg-[#05070d]/88 backdrop-blur-2xl shadow-[0_1px_24px_rgba(0,0,0,0.45)]"
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
              <p className="text-sm font-semibold text-white leading-tight">
                Sathish K
              </p>
              <p className="text-[10px] tracking-[0.28em] text-sky-300/70 uppercase">
                Portfolio
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
                  className="relative hover:text-white transition-colors group"
                >
                  {s}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-sky-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ),
            )}
            <a
              href="#contact"
              className="ml-1 rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sky-300 font-medium transition hover:bg-sky-400/20 hover:border-sky-400/50"
            >
              Hire Me
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
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-[100vh] flex flex-col justify-center overflow-hidden"
      >
        <HeroOrbs />
        <HeroGrid />
        <HeroParticles />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8"
        >
          <div className="grid items-center gap-10 py-20 lg:grid-cols-[1.18fr_0.82fr] lg:py-24 xl:gap-20">
            {/* LEFT COLUMN */}
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
                <span>Available for freelance work</span>
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
                  Fast &amp;{" "}
                  <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                    Business&#8209;Focused
                  </span>{" "}
                  Digital Solutions
                </h1>
              </motion.div>

              <motion.p
                variants={item}
                className="max-w-xl text-base leading-[1.75] text-slate-300 sm:text-lg"
              >
                I'm <span className="font-semibold text-white">Sathish K</span>{" "}
                — Full Stack Developer, WordPress specialist &amp; SEO expert
                from Coimbatore. I build websites that{" "}
                <span className="text-sky-300">
                  generate leads, rank on Google,
                </span>{" "}
                and grow your business online.
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
                ].map((t, i) => (
                  <motion.span
                    key={t}
                    className="rounded-full border border-sky-400/22 bg-sky-400/7 px-3.5 py-1.5 text-sky-200 font-medium backdrop-blur-xl"
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
                <div className="inline-flex min-h-[3.2rem] items-center rounded-2xl border border-sky-400/25 bg-white/[0.04] px-5 py-3 text-base font-semibold backdrop-blur-xl shadow-[0_0_30px_rgba(14,165,233,0.14)]">
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
                    View Projects
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
                    Contact Me
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-4"
              >
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-center backdrop-blur-xl"
                    whileHover={{
                      scale: 1.04,
                      borderColor: "rgba(56,189,248,0.3)",
                      boxShadow: "0 0 20px rgba(14,165,233,0.12)",
                    }}
                    transition={{ type: "spring", stiffness: 350 }}
                  >
                    <div className="text-xl font-bold text-sky-300">
                      {s.value}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-400 leading-snug">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN — PROFILE CARD */}
            <ProfileCard />
          </div>
        </motion.div>
      </section>
      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8">
        {/* ABOUT */}
        <section id="about" className="py-16 sm:py-20">
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
                  A developer who designs for
                  <br />
                  <span className="text-sky-300">business results.</span>
                </h3>
                <p className="mt-5 leading-7 text-slate-300">
                  I build websites and applications that feel premium, work
                  smoothly, and help businesses communicate value clearly. My
                  approach combines technical execution with strong visual
                  design so every project feels trustworthy, modern, and ready
                  for real customers.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    ["Location", "Coimbatore, Tamil Nadu"],
                    ["Role", "Full Stack Developer · WordPress · SEO"],
                    ["Specialty", "Business websites, e-commerce, lead gen"],
                    ["Delivery", "Fast, clean, responsive"],
                  ].map(([l, v]) => (
                    <div key={l} className="flex items-start gap-3 text-sm">
                      <span className="h-1.5 w-1.5 mt-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                      <span className="text-slate-500 w-20 flex-shrink-0">
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
                <p className="mb-6 text-xs font-bold text-sky-300 uppercase tracking-[0.28em]">
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
        <section id="skills" className="py-16 sm:py-20">
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
        <section className="py-16 sm:py-20">
          <FadeInSection>
            <SectionLabel>Services</SectionLabel>
          </FadeInSection>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <FadeInSection key={svc.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`h-full rounded-[2rem] p-6 backdrop-blur-2xl transition-all cursor-default ${
                      svc.highlight
                        ? "border border-sky-400/30 bg-[linear-gradient(135deg,rgba(14,165,233,0.12),rgba(37,99,235,0.07))] shadow-[0_0_40px_rgba(14,165,233,0.10)] hover:shadow-[0_0_60px_rgba(14,165,233,0.18)]"
                        : "border border-white/10 bg-white/5 hover:shadow-[0_0_32px_rgba(14,165,233,0.08)]"
                    }`}
                  >
                    <div className="mb-5 flex flex-col gap-3">
                      {svc.highlight && (
                        <span className="self-start inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                          <Sparkles className="h-3 w-3" /> Core Speciality
                        </span>
                      )}
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        className={`self-start inline-flex rounded-2xl border p-3.5 ${
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
        <section id="wordpress" className="py-16 sm:py-20">
          <FadeInSection>
            <SectionLabel>WordPress Development</SectionLabel>
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-sky-400/25 bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(37,99,235,0.08)_50%,rgba(5,7,13,0.95))] p-8 sm:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(14,165,233,0.10)]">
              <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.12),transparent_55%)]" />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-300">
                    <Sparkles className="h-3.5 w-3.5" /> Core Speciality
                  </div>
                  <h2 className="text-3xl font-bold leading-snug text-white sm:text-4xl">
                    WordPress that works
                    <br />
                    <span className="text-sky-300">as hard as you do.</span>
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    I build custom WordPress sites that go far beyond templates
                    — fast-loading, SEO-ready, and built to convert visitors
                    into clients. From bespoke themes and plugins to full
                    WooCommerce store setups, every project is crafted for
                    performance and real business outcomes.
                  </p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_24px_rgba(56,189,248,0.35)] hover:bg-sky-300 transition-colors"
                  >
                    Start a WordPress Project <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:w-80 lg:flex-shrink-0">
                  {[
                    ["Custom Themes", "Built from scratch — no page builders"],
                    ["WooCommerce", "Full store setups & payment flows"],
                    ["Plugin Dev", "Bespoke solutions for your business"],
                    ["Speed Tuned", "Sub-2s load times, Core Web Vitals"],
                  ].map(([t, s]) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-sky-400/15 bg-black/35 p-5"
                    >
                      <p className="text-sm font-bold text-sky-300 leading-snug">
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
                    className="h-full rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl hover:border-sky-400/20 transition-all hover:shadow-[0_0_28px_rgba(14,165,233,0.08)]"
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
        <section id="seo" className="py-16 sm:py-20">
          <FadeInSection>
            <SectionLabel>SEO Optimization</SectionLabel>
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.10),rgba(5,150,105,0.06)_50%,rgba(5,7,13,0.95))] p-8 sm:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(16,185,129,0.08)]">
              <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.10),transparent_55%)]" />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/8 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
                    <Sparkles className="h-3.5 w-3.5" /> Core Speciality
                  </div>
                  <h2 className="text-3xl font-bold leading-snug text-white sm:text-4xl">
                    Rank higher.
                    <br />
                    <span className="text-emerald-300">
                      Get found. Grow faster.
                    </span>
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    SEO isn't just keywords — it's the full technical, on-page,
                    and strategic foundation that makes search engines trust
                    your site. I deliver technical audits, Core Web Vitals
                    improvements, and content optimisation strategies that bring
                    real organic traffic.
                  </p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:bg-emerald-300 transition-colors"
                  >
                    Improve My SEO <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:w-80 lg:flex-shrink-0">
                  {[
                    ["Technical SEO", "Crawl, index & structured data fixes"],
                    ["Core Web Vitals", "LCP · CLS · INP improvements"],
                    ["On-page SEO", "Titles, meta, schema & headers"],
                    ["Local SEO", "Google Business & geo-targeting"],
                  ].map(([t, s]) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-emerald-400/15 bg-black/35 p-5"
                    >
                      <p className="text-sm font-bold text-emerald-300 leading-snug">
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
                    className="h-full rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl hover:border-emerald-400/20 transition-all hover:shadow-[0_0_28px_rgba(16,185,129,0.07)]"
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
        <section id="projects" className="py-16 sm:py-20">
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
                  <div className="relative h-44 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.22),rgba(5,7,13,0.95)_70%)] p-6 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-blue-600/5 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative flex items-start justify-between">
                      <span className="rounded-full border border-sky-400/25 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-wider text-sky-300 font-medium">
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
                    <p className="text-[10px] uppercase tracking-[0.25em] text-sky-300/80 font-semibold">
                      {proj.type}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {proj.details}
                    </p>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-xs text-sky-300/50 group-hover:text-sky-300 transition-colors duration-200"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>View Project</span>
                    </a>
                  </div>
                </motion.article>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* WHY WORK WITH ME – MOBILE-SAFE REDESIGN */}
        <section className="py-16 sm:py-20">
          <FadeInSection>
            <SectionLabel>Why Work With Me</SectionLabel>
          </FadeInSection>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {/* LEFT COLUMN – whyMe list */}
            <div className="h-full rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-8 overflow-hidden transition-all duration-300 hover:border-sky-400/30">
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                {whyMe.map((item, i) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4 break-words transition-all duration-200 hover:border-sky-400/30"
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

            {/* RIGHT COLUMN – premium description */}
            <div className="h-full rounded-[2rem] border border-sky-400/20 bg-gradient-to-br from-sky-400/5 via-transparent to-transparent p-5 sm:p-8 overflow-hidden transition-all duration-300 hover:border-sky-400/40">
              <h3 className="text-xl sm:text-2xl font-bold leading-snug text-white">
                Built to feel premium.
                <br />
                <span className="text-sky-300">Built to perform.</span>
              </h3>
              <p className="mt-3 sm:mt-4 text-sm leading-7 text-slate-300">
                The goal is simple: create a digital presence that looks
                expensive, feels smooth on every device, and gives potential
                clients confidence in your brand from the very first second.
              </p>
              <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  ["Design", "Glassmorphism, neon accents, elegant motion"],
                  ["Development", "Responsive, modular, scalable code"],
                  ["WordPress", "Custom themes, plugins, WooCommerce"],
                  ["SEO", "Technical, on-page & local optimisation"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-2xl border border-white/10 bg-black/22 p-3 sm:p-4 break-words transition-all duration-200 hover:border-sky-400/30"
                  >
                    <p className="text-[10px] text-sky-300 mb-1.5 uppercase tracking-wider font-bold">
                      {k}
                    </p>
                    <p className="text-xs leading-5 text-slate-300">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add keyframe animation for fade-in (no motion library needed) */}
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
        <section id="contact" className="py-16 sm:py-20">
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
                  Let's build something{" "}
                  <span className="text-sky-300">premium.</span>
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Available for freelance websites, WordPress builds, SEO
                  projects, business applications, UI/UX design, and custom
                  WooCommerce work.
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
                          className="break-all hover:text-sky-300 transition-colors"
                        >
                          {label}
                        </a>
                      ) : (
                        <span>{label}</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </FadeInSection>
            <FadeInSection delay={0.16}>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-[2rem] border border-sky-400/20 bg-[linear-gradient(180deg,rgba(14,165,233,0.10),rgba(255,255,255,0.03))] p-8 backdrop-blur-2xl"
              >
                <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-black/22 p-7">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-sky-300/80 font-semibold">
                      Ready for high-value clients
                    </p>
                    <h3 className="mt-3 text-2xl font-bold leading-snug text-white">
                      A digital presence that feels{" "}
                      <span className="text-sky-300">
                        trustworthy &amp; modern.
                      </span>
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      Clean motion, clear messaging, high-end visual polish, and
                      SEO-optimised WordPress builds that create the kind of
                      first impression premium clients remember.
                    </p>
                  </div>
                  <div className="mt-8">
                    <motion.a
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      href="mailto:sathishcraftfolio@gmail.com"
                      className="inline-flex items-center gap-2 rounded-xl bg-sky-400 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_24px_rgba(56,189,248,0.35)] hover:bg-sky-300 transition-colors"
                    >
                      Start a Project <ArrowRight className="h-4 w-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </FadeInSection>
          </div>
        </section>
      </div>
      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/8 py-8 text-center text-xs text-slate-500">
        <p>
          © {new Date().getFullYear()} Sathish K · Full Stack Developer ·
          WordPress · SEO
        </p>
      </footer>
    </div>
  );
}
