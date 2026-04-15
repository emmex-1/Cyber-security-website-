import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, Shield, TrendingUp, Users,
  Mic, BookOpen, CheckCircle,
  ChevronDown, ChevronLeft, ChevronRight,
  Lock, Cloud, Database, Cpu, Monitor, AlertTriangle, Eye, Network,
  Clock, GraduationCap, Award, Layers, Rocket,
} from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import NewsletterForm from "@/components/NewsletterForm";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import { blogPosts } from "../data/blogPosts";

// Slide-specific hero images — each slide has its own background
import heroSlide1 from "/images/byte.jpeg";   // slide 1 — general IT training
import heroSlide2 from "/images/byt.jpeg";    // slide 2 — cybersecurity
import heroSlide3 from "/images/byte.jpeg";  // slide 3 — corporate/enterprise

import aboutImage from "/images/byt.jpeg";
import faqImage   from "/images/byte.jpeg";
import timImage  from "/images/hero-home.jpg";
import bytImage  from "/images/laps.png";
import byteImage  from "/images/office.png";

/* ─── Fade-up variant ────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

/* ══════════════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════════════ */
const statsData = [
  { end: 200, suffix: "+", label: "Professionals Trained" },
  { end: 12,  suffix: "+", label: "Certifications Offered" },
  { end: 98,  suffix: "%", label: "Pass Rate" },
  { end: 20,  suffix: "+", label: "Expert Instructors" },
  { end: 5,   suffix: "★", label: "Student Rating" },
];

const heroSlides = [
  {
    bgImage: heroSlide1,
    badge: "Get Trained in IT",
    h1: "Earn Certifications",
    h2: "with Practical Skills.",
    accentSecond: true,
    sub: "Master cybersecurity, cloud computing, and data science with hands-on labs, expert instructors, and industry-recognized certifications.",
    cta:  { label: "Register Now",  href: "/register" },
    cta2: { label: "View Courses",  href: "/courses"  },
    overlay: "from-black/90 via-black/70 to-black/30",
  },
  {
    bgImage: heroSlide2,
    badge: "Cybersecurity Training",
    h1: "Defend. Detect.",
    h2: "Respond.",
    accentSecond: true,
    sub: "From ethical hacking to SOC analysis — learn offensive and defensive security with real lab environments and expert mentors.",
    cta:  { label: "Start Your Path",   href: "/courses" },
    cta2: { label: "View Curriculum",   href: "/courses"               },
    overlay: "from-black/90 via-black/70 to-black/30",
  },
  {
    bgImage: heroSlide3,
    badge: "Corporate & Enterprise",
    h1: "Upskill Your",
    h2: "Entire Team.",
    accentSecond: true,
    sub: "Customised training programs for organisations, government agencies, and universities. On-site, virtual, or blended delivery.",
    cta:  { label: "Get Enterprise Quote", href: "/contact" },
    cta2: { label: "Learn More",           href: "/about"   },
    overlay: "from-black/90 via-black/70 to-black/30",
  },
];

const featuredPaths = [
  { title: "Cyber Security 101",       level: "Beginner",     tag: null,      hours: 40, modules: 12, gradient: "from-blue-900 to-blue-700",     image: "/images/hero-home.jpg",  link: "/courses"    },
  { title: "Ethical Hacking & CEH",    level: "Intermediate", tag: null,      hours: 60, modules: 16, gradient: "from-slate-800 to-indigo-900",   image: "/images/office.png",     link: "/courses"    },
  { title: "SOC Analyst Level 1",      level: "Beginner",     tag: null,      hours: 35, modules: 10, gradient: "from-teal-900 to-cyan-800",      image: "/images/byte.jpeg",      link: "/courses"    },
  { title: "CompTIA Security+",        level: "Intermediate", tag: null,      hours: 45, modules: 14, gradient: "from-red-900 to-rose-800",       image: "/images/laps.png",       link: "/courses"    },
  { title: "Cloud Security (AWS)",     level: "Advanced",     tag: null,      hours: 50, modules: 13, gradient: "from-orange-900 to-amber-800",   image: "/images/hero-home.jpg",  link: "/courses"  },
  { title: "Red Teaming",              level: "Advanced",     tag: null,      hours: 70, modules: 18, gradient: "from-rose-950 to-red-800",       image: "/images/byte.jpeg",      link: "/courses"    },
  { title: "Data Science for Security",level: "Intermediate", tag: null,      hours: 55, modules: 15, gradient: "from-emerald-900 to-green-700",  image: "/images/office.png",     link: "/courses"     },
  { title: "CompTIA Network+",         level: "Beginner",     tag: null,      hours: 38, modules: 11, gradient: "from-violet-900 to-purple-700",  image: "/images/byte.jpeg",      link: "/courses" },
  { title: "CISSP Certification",      level: "Advanced",     tag: null,      hours: 80, modules: 20, gradient: "from-sky-900 to-blue-800",       image: "/images/byt.jpeg",       link: "/courses"    },
];

/* ── Cybersecurity blog posts for the homepage preview ─────────────────── */
const cyberBlogPosts = [
  {
    title:  "Top 10 Cybersecurity Threats Every Professional Must Know in 2025",
    date:   "Apr 5, 2025",
    image:  "/images/office.png",
    link:   "/resources",
  },
  {
    title:  "How to Pass the CEH Exam: A Complete 90-Day Study Guide",
    date:   "Mar 28, 2025",
    image:  "/images/hero-home.jpg",
    link:   "/resources",
  },
  {
    title:  "Zero Trust Architecture Explained: Why 'Never Trust, Always Verify' Is the New Standard",
    date:   "Mar 20, 2025",
    image:  "/images/laps.png",
    link:   "/resources",
  },
];

const courseOutlines = [
  {
    icon: Lock, title: "Cybersecurity", color: "#1d4ed8", bg: "#eff6ff",
    tagline: "From zero to certified defender", duration: "3–6 months",
    overview: "A comprehensive deep-dive into both offensive and defensive cybersecurity. Graduate job-ready for roles like Security Analyst, Penetration Tester, and SOC Engineer — with certifications employers trust.",
    outcomes: ["Perform real penetration tests", "Build and monitor a SOC", "Pass CEH, CISSP & CompTIA Security+", "Respond to live cyber incidents"],
    certifications: ["CEH", "CISSP", "CompTIA Security+", "OSCP", "eJPT"],
    modules: [
      { name: "Foundations of Cybersecurity",          topics: ["CIA Triad & Security Concepts", "Networking Basics (TCP/IP, DNS, HTTP)", "Linux & Windows Security Fundamentals", "Cryptography Essentials", "Authentication & Access Control"] },
      { name: "Ethical Hacking & Penetration Testing", topics: ["Reconnaissance & OSINT Techniques", "Vulnerability Scanning (Nmap, Nessus, OpenVAS)", "Exploitation with Metasploit Framework", "Web App Attacks (SQLi, XSS, CSRF)", "Social Engineering & Phishing Simulation"] },
      { name: "Defensive Security & SOC",              topics: ["SIEM Setup & Log Analysis (Splunk, QRadar)", "Incident Response Procedures & Playbooks", "Threat Intelligence & Threat Hunting", "Malware Analysis Basics", "Endpoint Detection & Response (EDR)"] },
      { name: "Compliance & Governance",               topics: ["NIST, ISO 27001 & CIS Frameworks", "GDPR & Data Protection Regulations", "Risk Assessment & Management", "Security Policy Development"] },
      { name: "Certification Exam Prep",               topics: ["CEH (Certified Ethical Hacker) — EC-Council", "CISSP — ISC²", "CompTIA Security+ SY0-701", "OSCP — Offensive Security", "eJPT — eLearnSecurity"] },
    ],
    link: "/courses/cybersecurity",
  },
  {
    icon: Database, title: "Data Science", color: "#0f766e", bg: "#f0fdfa",
    tagline: "Turn raw data into actionable intelligence", duration: "3–5 months",
    overview: "Master data science with a cybersecurity lens. Build ML pipelines, detect anomalies in logs, and automate threat intelligence — while earning certifications from Google, IBM, and AWS.",
    outcomes: ["Build real ML models from scratch", "Automate threat intelligence workflows", "Create security dashboards & reports", "Earn IBM & Google Data certifications"],
    certifications: ["IBM Data Science", "Google Data Analytics", "AWS ML Specialty", "Microsoft DP-100"],
    modules: [
      { name: "Python & Data Fundamentals",       topics: ["Python for Data Analysis (Jupyter, VS Code)", "Pandas, NumPy & Matplotlib Mastery", "Data Cleaning, Wrangling & Transformation", "SQL for Data Analysts", "APIs & Web Scraping for Data Collection"] },
      { name: "Statistics & Machine Learning",    topics: ["Descriptive & Inferential Statistics", "Supervised Learning (Regression, Classification)", "Unsupervised Learning (Clustering, PCA)", "Scikit-learn Model Training & Evaluation", "Feature Engineering & Selection"] },
      { name: "Security Analytics",               topics: ["SIEM Log Analytics & Correlation Rules", "Anomaly Detection in Network Traffic", "Threat Intelligence Automation with Python", "Building Intrusion Detection Systems", "Fraud Detection & Behavioral Analysis"] },
      { name: "Data Visualization & Reporting",   topics: ["Tableau & Power BI Dashboards", "Matplotlib & Seaborn Charts", "Executive Security Reporting", "Real-time Alert Dashboards"] },
      { name: "Certification Exam Prep",          topics: ["IBM Data Science Professional Certificate", "Google Data Analytics Certificate", "AWS Machine Learning Specialty", "Microsoft Azure DP-100"] },
    ],
    link: "/courses/data-science",
  },
  {
    icon: Cloud, title: "Cloud Computing", color: "#7c3aed", bg: "#f5f3ff",
    tagline: "Build & secure infrastructure at scale", duration: "2–4 months",
    overview: "Go from cloud beginner to certified cloud security architect. Understand how AWS, Azure, and GCP work — then learn how to lock them down, monitor them, and pass the world's most respected cloud certifications.",
    outcomes: ["Deploy secure cloud infrastructure", "Implement zero-trust cloud access", "Pass AWS, Azure & GCP security certs", "Build DevSecOps CI/CD pipelines"],
    certifications: ["AWS Solutions Architect", "AWS Security Specialty", "Azure AZ-500", "GCP Pro Security", "CompTIA Cloud+"],
    modules: [
      { name: "Cloud Fundamentals",                    topics: ["Cloud Service Models (IaaS, PaaS, SaaS)", "AWS, Azure & GCP Core Services", "Virtualization & Containerization", "Cloud Networking (VPC, Subnets, Load Balancers)", "Cost Optimization & Resource Management"] },
      { name: "Cloud Security Architecture",           topics: ["IAM & Role-Based Access Controls", "Cloud Security Posture Management (CSPM)", "Data Encryption at Rest & In Transit", "Zero Trust Network Architecture", "Shared Responsibility Model"] },
      { name: "DevSecOps",                             topics: ["CI/CD Pipeline Security with GitHub Actions", "Docker Container Security", "Kubernetes Security (RBAC, Network Policies)", "Infrastructure as Code with Terraform", "Secrets Management (Vault, AWS SSM)"] },
      { name: "Cloud Monitoring & Incident Response",  topics: ["AWS CloudTrail & GuardDuty", "Azure Sentinel SIEM", "GCP Security Command Center", "Cloud Forensics & Incident Response", "Automated Remediation Workflows"] },
      { name: "Certification Exam Prep",               topics: ["AWS Solutions Architect Associate/Professional", "AWS Security Specialty (SCS-C02)", "Azure Security Engineer AZ-500", "GCP Professional Cloud Security Engineer", "CompTIA Cloud+ CV0-004"] },
    ],
    link: "/courses/cloud-computing",
  },
  {
    icon: Cpu, title: "Computer Hardware", color: "#b45309", bg: "#fffbeb",
    tagline: "Master the physical backbone of IT", duration: "2–3 months",
    overview: "Understand how computers actually work — from the silicon level to full enterprise infrastructure. Ideal for IT support professionals pursuing CompTIA A+ or Network+ certification.",
    outcomes: ["Build, maintain & troubleshoot PCs", "Design enterprise network infrastructure", "Understand IoT security risks", "Pass CompTIA A+, Network+ & Server+"],
    certifications: ["CompTIA A+", "CompTIA Network+", "CompTIA Server+", "Cisco CCNA"],
    modules: [
      { name: "Hardware Fundamentals",   topics: ["PC Components & System Architecture", "Motherboards, CPUs, RAM & Storage", "Power Supplies & Cooling Systems", "Storage Technologies (SSD, HDD, NVMe, RAID)", "Hardware Troubleshooting Techniques"] },
      { name: "Networking Hardware",     topics: ["Routers, Switches, Hubs & Firewalls", "Cabling Standards (Cat5e, Cat6, Fiber)", "Physical Network Infrastructure Design", "Wireless Networks (WiFi 6, 802.11 Standards)", "Network Troubleshooting & Diagnostics"] },
      { name: "Server Infrastructure",  topics: ["Server Hardware & Rack Configuration", "Virtualization with VMware & Hyper-V", "Storage Area Networks (SAN/NAS)", "Backup & Disaster Recovery Systems", "Data Center Infrastructure Basics"] },
      { name: "IoT & Embedded Systems", topics: ["IoT Architecture, Protocols & Standards", "Raspberry Pi & Arduino Projects", "IoT Security Vulnerabilities & Mitigations", "Firmware Analysis Basics", "Smart Device Pentesting Introduction"] },
      { name: "Certification Exam Prep",topics: ["CompTIA A+ Core 1 & Core 2 (220-1101/1102)", "CompTIA Network+ N10-009", "CompTIA Server+ SK0-005", "Cisco CCNA 200-301 Introduction"] },
    ],
    link: "/courses/computer-hardware",
  },
];

const trustedLogos = [
  { name: "Google",             image: "/images/google.svg"    },
  { name: "",                   image: "/images/comptia.svg"   },
  { name: "",                   image: "/images/kpmg-logo.svg" },
  { name: "",                   image: "/images/RSM.png"       },
  { name: "",                   image: "/images/Epitech.png"   },
  { name: "EC-Council",         image: "/images/ecouncil.png"  },
  { name: "",                   image: "/images/isc.png"       },
  { name: "SANS Institute",     image: "/images/sans.jpg"      },
  { name: "Offensive Security", image: "/images/offsec.png"    },
];

const marqueeTopics = [
  "Network Security","Endpoint Protection","Threat Intelligence","Penetration Testing",
  "Cloud Security","Ethical Hacking","SOC Analysis","Risk Assessment",
  "Incident Response","Zero Trust","SIEM & SOAR","Data Science","Cloud Computing",
];

const whyChooseUs = [
  { icon: Monitor,    title: "Hands-on Labs",       desc: "Real lab environments that simulate actual attack/defense scenarios used by professionals." },
  { icon: Users,      title: "Expert Instructors",  desc: "Certified professionals with 10+ years of active industry experience in their specialties." },
  { icon: TrendingUp, title: "Industry-Recognized", desc: "Certifications respected by top employers globally — CompTIA, ISC², EC-Council, AWS, and more." },
  { icon: Shield,     title: "Cost-Effective",      desc: "Premium training at a fraction of traditional bootcamp costs, with flexible payment plans." },
];

const faqs = [
  { q: "Do I need prior experience to start?",        a: "No. We offer beginner-to-advanced tracks. Our curriculum is designed to take you from zero to certified at your own pace." },
  { q: "Are the certifications industry-recognised?", a: "Yes. We prepare you for globally recognised certifications including CEH, CISSP, CompTIA, AWS, Azure, and more." },
  { q: "Is training available online?",               a: "All courses are available online with live instructor sessions, recorded content, and 24/7 lab access." },
  { q: "How long does each course take?",             a: "Courses range from 4 weeks (short certifications) to 6 months (comprehensive programs) depending on the track." },
  { q: "Do you offer corporate/group training?",      a: "Yes. We have dedicated enterprise packages with customisable curriculum, scheduling, and on-site options." },
];

/* ══════════════════════════════════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════════════════════════════════ */

function useCountUp(end: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);
  return count;
}

/* ── Ticker ──────────────────────────────────────────────────────────────── */
const TickerBar = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.18, duration: 0.45 }}
    className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-7 flex-wrap"
  >
    {[
      { name: "Firewall Hits",      price: "1,024,124", change: "+1%", up: true, bg: "#00796B", label: "F" },
      { name: "Malware Prevented",  price: "7,312",     change: "+6%", up: true, bg: "#C2185B", label: "M" },
      { name: "Blocked Attacks",    price: "3,512",     change: "+2%", up: true, bg: "#4CAF50", label: "B" },
    ].map((t) => (
      <div key={t.name} className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
        <span className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-white shrink-0 font-bold"
          style={{ background: t.bg, fontSize: 10 }}>{t.label}</span>
        <span className="text-[#0B1C3A] font-bold text-[11px] sm:text-xs">{t.name}</span>
        <span className="text-gray-600 text-[11px] sm:text-xs font-semibold">{t.price}</span>
        <span className="text-[10px] sm:text-[11px] font-bold" style={{ color: t.up ? "#16a34a" : "#dc2626" }}>{t.change}</span>
      </div>
    ))}
  </motion.div>
);

/* ── Stats bar ───────────────────────────────────────────────────────────── */
const StatCounter = ({ s, started }: { s: typeof statsData[0]; started: boolean }) => {
  const n = useCountUp(s.end, 1600, started);
  return (
    <>
      <span className="block font-bold text-white leading-none mb-1.5 text-2xl sm:text-3xl lg:text-[42px]"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        {started ? `${n}${s.suffix}` : `${s.end}${s.suffix}`}
      </span>
      <span className="block text-white/60 text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-tight">{s.label}</span>
    </>
  );
};

const HeroStatsBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.55 }}
      className="absolute bottom-0 left-0 right-0 z-20"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      <div className="relative z-10 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 max-w-7xl mx-auto px-4 sm:px-12 lg:px-20">
        {statsData.map((s, i) => (
          <div key={s.label} className={[
            "flex flex-col py-4 sm:py-8 px-3 sm:pr-6 sm:pr-10",
            i > 0 ? "sm:pl-10 border-l border-white/10 sm:border-l-0" : "",
            i >= 3 ? "hidden lg:flex" : "",
          ].join(" ")}>
            <StatCounter s={s} started={inView} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/* ── Marquee ─────────────────────────────────────────────────────────────── */
const MarqueeBar = () => (
  <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 py-3.5">
    <div className="flex items-center whitespace-nowrap" style={{ animation: "marquee 28s linear infinite", width: "max-content" }}>
      {[...marqueeTopics, ...marqueeTopics].map((t, i) => (
        <span key={i} className="inline-flex items-center gap-3 px-5">
          <span className="text-white/90 font-semibold text-sm tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t}</span>
          <span className="text-white/40 text-lg font-thin">/</span>
        </span>
      ))}
    </div>
    <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
  </div>
);

/* ── Trusted By ──────────────────────────────────────────────────────────── */
const TrustedBySection = () => {
  const doubled = [...trustedLogos, ...trustedLogos];
  return (
    <section className="py-10 bg-[#f8fafc] border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-xl font-bold uppercase tracking-[0.22em] text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Trusted & Recognized By
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #f8fafc, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #f8fafc, transparent)" }} />
        <div className="flex items-center gap-0" style={{ animation: "marquee 22s linear infinite", width: "max-content" }}>
          {doubled.map((logo, i) => (
            <div key={i} className="flex items-center gap-3 px-8 shrink-0">
              <img src={logo.image} alt={logo.name} className="h-8 w-auto object-contain shrink-0" />
              <span className="text-gray-500 font-semibold text-sm whitespace-nowrap" style={{ fontFamily: "'DM Sans', sans-serif" }}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Featured Paths Slider ───────────────────────────────────────────────── */
const FeaturedPathsSlider = () => {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const total = Math.ceil(featuredPaths.length / perPage);
  const goPrev = () => setPage((p) => (p - 1 + total) % total);
  const goNext = () => setPage((p) => (p + 1) % total);
  const visible = featuredPaths.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="py-16 sm:py-24 bg-[#0d1117]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-14 max-w-[1200px]">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Learning Paths</span>
            </div>
            <h2 className="text-white font-bold text-3xl sm:text-4xl" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Featured Courses</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={goPrev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer bg-transparent">
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button onClick={goNext} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer bg-transparent">
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {visible.map((path, i) => (
              <Link key={i} to={path.link} className="no-underline group">
                <div className="relative rounded-2xl overflow-hidden h-[340px] flex flex-col justify-end p-6 cursor-pointer transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl">
                  <img
                    src={path.image}
                    alt={path.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent" />
                  <div className="relative z-10">
                    {path.tag && (
                      <div className="absolute top-5 left-5">
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-500 text-white px-2.5 py-1 rounded-full"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}>✦ {path.tag}</span>
                      </div>
                    )}
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>{path.level}</span>
                    <h3 className="text-white font-bold text-xl leading-snug mb-3"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>{path.title}</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex items-center gap-1 text-white/60 text-xs"><Clock size={11} /> {path.hours}h</span>
                      <span className="flex items-center gap-1 text-white/60 text-xs"><Layers size={11} /> {path.modules} modules</span>
                    </div>
                    <button
                      className="w-fit inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-lg transition-all border border-white/20 cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Enrol in Path <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-2 mt-7">
          {Array.from({ length: total }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)}
              className="rounded-full border-none cursor-pointer p-0 transition-all duration-300 h-2"
              style={{ width: i === page ? 24 : 8, background: i === page ? "#3b82f6" : "#374151" }} />
          ))}
        </div>

        <div className="flex justify-center mt-9">
          <Link to="/courses" className="no-underline">
            <button
              className="inline-flex items-center gap-3 border border-white/20 hover:bg-white/10 text-white font-bold text-sm rounded-full pl-6 pr-2 py-3 transition-all active:scale-95 bg-transparent cursor-pointer"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              View All Courses
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 shrink-0">
                <ArrowUpRight size={14} className="text-white" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ── Course Curriculum Preview ───────────────────────────────────────────── */
const CoursePreviewSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMod, setActiveMod] = useState(0);
  const c = courseOutlines[activeTab];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Course Curriculum</span>
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>What You'll Learn</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Structured modules, hands-on labs, certification pathways, and clear career outcomes for every program.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {courseOutlines.map((co, i) => (
            <button key={i} onClick={() => { setActiveTab(i); setActiveMod(0); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border cursor-pointer"
              style={{ fontFamily: "'DM Sans', sans-serif", background: activeTab === i ? co.color : "white", color: activeTab === i ? "white" : "#374151", borderColor: activeTab === i ? co.color : "#e5e7eb", boxShadow: activeTab === i ? `0 4px 14px ${co.color}30` : "none" }}>
              <co.icon size={15} />{co.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            {/* Left */}
            <div className="lg:col-span-2 bg-[#f8fafc] p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: c.bg, border: `1px solid ${c.color}20` }}>
                  <c.icon size={21} style={{ color: c.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-[#0a0f1e] text-lg leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.title}</h3>
                  <p className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.tagline}</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed mb-4 pb-4 border-b border-gray-100" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.overview}</p>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={13} className="text-gray-400" />
                <span className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>Duration: {c.duration}</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Certifications</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {c.certifications.map((cert, ci) => (
                  <span key={ci} className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
                    style={{ color: c.color, borderColor: `${c.color}30`, background: `${c.color}08`, fontFamily: "'DM Sans', sans-serif" }}>{cert}</span>
                ))}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Modules</p>
              <div className="space-y-2">
                {c.modules.map((mod, mi) => (
                  <button key={mi} onClick={() => setActiveMod(mi)}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer border"
                    style={{ background: activeMod === mi ? `${c.color}08` : "white", borderColor: activeMod === mi ? `${c.color}30` : "#f3f4f6" }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                      style={{ background: activeMod === mi ? c.color : "#f3f4f6", color: activeMod === mi ? "white" : "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>{mi + 1}</span>
                    <span className="text-[#0a0f1e] text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{mod.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-3 p-6 sm:p-8 bg-white">
              <AnimatePresence mode="wait">
                <motion.div key={`${activeTab}-${activeMod}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: c.color, fontFamily: "'DM Sans', sans-serif" }}>Module {activeMod + 1}</p>
                  <h4 className="text-[#0a0f1e] font-bold text-xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.modules[activeMod].name}</h4>
                  <p className="text-gray-400 text-sm mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Topics covered in this module:</p>
                  <div className="space-y-2.5">
                    {c.modules[activeMod].topics.map((topic, ti) => (
                      <motion.div key={ti} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ti * 0.06 }}
                        className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-50 bg-[#f8fafc]">
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${c.color}12`, border: `1px solid ${c.color}20` }}>
                          <CheckCircle size={14} style={{ color: c.color }} />
                        </span>
                        <span className="text-[#0a0f1e] text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{topic}</span>
                      </motion.div>
                    ))}
                  </div>
                  {activeMod === 0 && (
                    <div className="mt-6 p-4 rounded-xl border" style={{ borderColor: `${c.color}20`, background: `${c.color}06` }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: c.color, fontFamily: "'DM Sans', sans-serif" }}>What You'll Gain</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {c.outcomes.map((o, oi) => (
                          <div key={oi} className="flex items-start gap-2">
                            <Award size={13} style={{ color: c.color }} className="shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{o}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {c.modules.length} modules · {c.modules.reduce((a, m) => a + m.topics.length, 0)} topics
                    </p>
                    <Link to={c.link} className="no-underline">
                      <button className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full text-white transition-all active:scale-95 border-none cursor-pointer"
                        style={{ background: c.color, fontFamily: "'DM Sans', sans-serif" }}>
                        View Full Course <ArrowUpRight size={14} />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ── What We Offer ───────────────────────────────────────────────────────── */
const OfferingsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const offerings = [
    { icon: GraduationCap, title: "Certification Programs",   desc: "Structured pathways to globally recognised certifications CEH, CISSP, CompTIA, AWS, Azure, and more.", stat: "12+ Certifications", link: "/courses" },
    { icon: Monitor,       title: "Virtual Labs & Sandboxes", desc: "24/7 access to isolated, hands-on lab environments where you practice real attack and defense scenarios safely.", stat: "100+ Live Labs",    link: "/training" },
    { icon: Users,         title: "Live Mentorship",          desc: "1-on-1 sessions with certified instructors career guidance, exam strategy, and code reviews from active professionals.", stat: "20+ Mentors",   link: "/services" },
  {
    icon: Rocket,
    title: "Career Acceleration",
    desc: "Develop job-ready cybersecurity skills through hands-on training, practical labs, and structured learning paths aligned with industry needs.",
    stat: "Industry Ready",
    link: "/courses"
  },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/hero-bg.jpg')"
      }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ y }}
      >
        <img
          src={heroSlide1}
          alt=""
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
      </motion.div>

      <div className="absolute inset-0 bg-[#0a0f1e]/90 z-[1]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-400 text-xs font-bold uppercase tracking-[0.28em] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            What We Offer
          </span>

          <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            Everything You Need<br />to Succeed
          </h2>

          <p className="text-white/60 text-sm sm:text-base max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            From certification prep and live labs to mentorship and career acceleration, we support your entire journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {offerings.map((o, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="h-full"
            >
              <Link to={o.link} className="group block h-full no-underline">
                <div
                  className="relative h-full flex flex-col rounded-2xl p-6 sm:p-7 border border-white/10 hover:-translate-y-1.5 hover:border-blue-500/40 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)"
                  }}
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center mb-5 shrink-0 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                    <o.icon size={20} className="text-blue-400 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <p className="text-blue-400 text-xs font-bold mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {o.stat}
                  </p>

                  <h3 className="text-white font-bold text-lg leading-snug mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {o.title}
                  </h3>

                  <p className="text-white/55 text-sm leading-relaxed flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {o.desc}
                  </p>

                  <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Learn More
                    </span>
                    <ArrowUpRight size={13} className="text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Services Section ────────────────────────────────────────────────────── */
const ServicesSection = () => {
  const groups = [
    {
      category: "Cybersecurity Services", categoryIcon: Shield, accent: "#1d4ed8",
      items: [
        { icon: Shield,        title: "Cybersecurity Consulting",    desc: "End-to-end security advisory — from gap analysis to a fully implemented security framework tailored for your organisation." },
        { icon: Eye,           title: "Security Risk Assessment",    desc: "Identify critical vulnerabilities before attackers do. Detailed risk reports with prioritised remediation plans." },
        { icon: AlertTriangle, title: "Security Awareness Training", desc: "Human error causes 90% of breaches. Our behavioural training turns your staff into a vigilant first line of defence." },
        { icon: Network,       title: "Network Security Monitoring", desc: "Continuous 24/7 network monitoring with real-time threat detection, alerting, and incident response support." },
      ],
    },
    {
      category: "Training Programs", categoryIcon: GraduationCap, accent: "#0f766e",
      items: [
        { icon: Lock,     title: "Cybersecurity Training",        desc: "Offensive and defensive security — ethical hacking, penetration testing, SOC operations, and threat intelligence." },
        { icon: Database, title: "Data Science Training",         desc: "Machine learning, Python analytics, and AI-powered security applications — from fundamentals to professional certification." },
        { icon: Cloud,    title: "Cloud Computing Training",      desc: "AWS, Azure, and GCP certification pathways combined with cloud security architecture and DevSecOps best practices." },
        { icon: Cpu,      title: "Computer Hardware Engineering", desc: "Systems architecture, network hardware, infrastructure design, and IoT security — aligned to CompTIA A+, Net+ and Server+." },
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Services</span>
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>What We Do</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Professional cybersecurity services for organisations, and career-defining training for individuals.
          </p>
        </div>
        <div className="space-y-10">
          {groups.map((group, gi) => (
            <div key={gi}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: group.accent }}>
                  <group.categoryIcon size={15} className="text-white" />
                </div>
                <h3 className="text-[#0a0f1e] font-bold text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>{group.category}</h3>
                <div className="flex-1 h-px bg-gray-200 ml-2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.items.map((item, ii) => (
                  <motion.div key={ii} custom={ii} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="group relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: group.accent }} />
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${group.accent}10`, border: `1px solid ${group.accent}20` }}>
                        <item.icon size={20} style={{ color: group.accent }} />
                      </div>
                      <div>
                        <h4 className="text-[#0a0f1e] font-bold text-base mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── FAQ ─────────────────────────────────────────────────────────────────── */
const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>FAQ</span>
            </div>
            <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Questions &amp; Answers</h2>
            <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-md" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Protect your career with industry-recognised training — we prepare you to defend, detect, and respond.
            </p>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:border-blue-100 transition-colors">
                  <button onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer bg-transparent border-none">
                    <span className="font-semibold text-[#0a0f1e] text-sm pr-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>{faq.q}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${open === i ? "bg-blue-600" : "bg-gray-100"}`}>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${open === i ? "rotate-180 text-white" : "text-gray-500"}`} />
                    </span>
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}>
                        <p className="px-5 pb-5 text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            className="hidden lg:block relative">
            <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img src={faqImage} alt="Cybersecurity professional" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0"><Shield size={18} className="text-white" /></span>
                  <div>
                    <p className="text-[#0a0f1e] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>98% Pass Rate</p>
                    <p className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>Across all certification exams</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle,#3b82f6 1px,transparent 1px)", backgroundSize: "12px 12px" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ── Blog — cybersecurity content ────────────────────────────────────────── */
const BlogSection = () => {
  const posts = cyberBlogPosts;
  const total = posts.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const iRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (iRef.current) clearInterval(iRef.current);
    if (!paused) iRef.current = setInterval(() => setActive((p) => (p + 1) % total), 4000);
    return () => { if (iRef.current) clearInterval(iRef.current); };
  }, [paused, total]);

  const visibleIndices = [0, 1, 2].map((off) => (active + off) % total);

  return (
    <section
      className="bg-white py-14 sm:py-20 overflow-x-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-14">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Latest</span>
            </div>
            <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Blog &amp; Articles</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setActive((p) => (p - 1 + total) % total)} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer border-none">
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button onClick={() => setActive((p) => (p + 1) % total)} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer border-none">
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Desktop 3-col */}
        <div className="hidden lg:grid grid-cols-3 gap-5">
          {visibleIndices.map((postIdx, i) => {
            const post = posts[postIdx];
            return (
              <Link key={`${post.title}-${active}-${i}`} to={post.link} className="block no-underline group">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="relative rounded-2xl overflow-hidden"
                  style={{ height: 320 }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-blue-600 px-3 py-1 rounded-full"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>Cyber Insights</span>
                  </div>
                  <div className="absolute bottom-0 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                        <span className="text-white text-[9px] font-bold">B</span>
                      </div>
                      <span className="text-white/70 text-xs">Bytitude Team</span>
                      <span className="text-white/40 text-xs">·</span>
                      <span className="text-white/60 text-xs">{post.date}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.title}</h3>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Mobile scroll */}
        <div className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4" style={{ scrollbarWidth: "none" }}>
          {posts.map((post, i) => (
            <Link key={i} to={post.link} className="min-w-[85%] snap-start no-underline shrink-0">
              <div className="relative rounded-2xl overflow-hidden" style={{ height: 260 }}>
                <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <p className="text-white/60 text-xs uppercase mb-1">{post.date}</p>
                  <h3 className="text-white font-bold text-lg leading-snug">{post.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/resources" className="no-underline">
            <button
              className="inline-flex items-center gap-3 bg-[#0a0f1e] hover:bg-blue-900 text-white font-bold text-sm rounded-full pl-6 pr-2 py-3 transition-all active:scale-95 border-none cursor-pointer"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              See All Articles
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 shrink-0"><ArrowUpRight size={14} className="text-white" /></span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ── Newsletter CTA ──────────────────────────────────────────────────────── */
const YoutubeCTABanner = () => (
  <section className="bg-[#f8fafc] px-3 sm:px-4 lg:px-6 py-8 sm:py-10">
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[300px] lg:min-h-[340px]"
    >
      <img src={byteImage} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-12 lg:px-16 py-10 sm:py-14">
        <SectionHeading
          label="Stay Connected"
          title="Join Our Community"
          description="Get weekly tips, workshop announcements, and resources delivered to your inbox."
          light={true}
        />
        <div className="mt-6 w-full max-w-xl"><NewsletterForm dark={true} /></div>
      </div>
    </motion.div>
  </section>
);

/* ══════════════════════════════════════════════════════════════════════════
   HERO — 3 slides, each with its own background image
══════════════════════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const [slide, setSlide] = useState(0);
  const [dir,   setDir  ] = useState(1);
  const total = heroSlides.length;
  const iRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number, d: number) => {
    setDir(d);
    setSlide(next);
  }, []);

  useEffect(() => {
    iRef.current = setInterval(() => go((slide + 1) % total, 1), 6000);
    return () => { if (iRef.current) clearInterval(iRef.current); };
  }, [slide, go, total]);

  const goPrev = () => { if (iRef.current) clearInterval(iRef.current); go((slide - 1 + total) % total, -1); };
  const goNext = () => { if (iRef.current) clearInterval(iRef.current); go((slide + 1) % total, 1); };

  const s = heroSlides[slide];

  const textVariants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, transition: { duration: 0.35 } }),
  };

  return (
    <section className="relative bg-[#050810] pb-0">
      <div className="relative min-h-[100vh] overflow-hidden">

        {/* ── Per-slide background image (cross-fades) ── */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`bg-${slide}`}
            src={s.bgImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        </AnimatePresence>

        {/* ── Per-slide colour overlay ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`ov-${slide}`}
            className={`absolute inset-0 bg-gradient-to-r ${s.overlay}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        {/* Constant dark base so text is always readable */}
        <div className="absolute inset-0 bg-black/40" />

        {/* ── Content — padding-right increased on mobile to avoid arrow overlap ── */}
        <div className="relative z-10 flex items-start min-h-[100vh] px-6 sm:px-12 lg:px-20 pr-20 sm:pr-24 lg:pr-20 pt-28 sm:pt-36 pb-44 sm:pb-52">
          <div className="max-w-2xl w-full">
            <TickerBar />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={slide} custom={dir} variants={textVariants} initial="enter" animate="center" exit="exit">
                <p
                  className="text-blue-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 sm:mb-5"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >{s.badge}</p>
                <h1
                  className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-tight mb-5 sm:mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {s.h1}<br />
                  {s.accentSecond ? <span className="text-blue-400">{s.h2}</span> : s.h2}
                </h1>
                <p
                  className="text-white/75 text-base sm:text-lg mb-8 sm:mb-10 max-w-xl leading-relaxed"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >{s.sub}</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to={s.cta.href} className="w-full sm:w-auto">
                    <button
                      className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold text-sm px-7 py-2.5 transition-all active:scale-95 border-none cursor-pointer"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {s.cta.label}
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/25 shrink-0">
                        <ArrowUpRight size={14} className="text-white" />
                      </span>
                    </button>
                  </Link>
                  <Link to={s.cta2.href} className="w-full sm:w-auto">
                    <button
                      className="inline-flex items-center justify-center w-full sm:w-auto border border-blue-400/60 text-blue-400 hover:bg-white/10 rounded-full font-bold text-sm px-8 py-2.5 transition-all active:scale-95 bg-transparent cursor-pointer"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {s.cta2.label}
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Prev / Next arrows — moved to bottom-right on mobile to avoid content overlap */}
        <div className="absolute right-4 sm:right-10 bottom-48 sm:top-1/2 sm:-translate-y-1/2 z-30 flex flex-col gap-3">
          <button onClick={goPrev} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all cursor-pointer">
            <ChevronLeft size={16} className="text-white" />
          </button>
          <button onClick={goNext} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all cursor-pointer">
            <ChevronRight size={16} className="text-white" />
          </button>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-36 sm:bottom-44 left-6 sm:left-12 lg:left-20 z-20 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > slide ? 1 : -1)}
              className="rounded-full border-none cursor-pointer p-0 transition-all duration-300 h-2"
              style={{ width: i === slide ? 28 : 8, background: i === slide ? "#3b82f6" : "rgba(255,255,255,0.4)" }}
            />
          ))}
        </div>

        <HeroStatsBar />
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   TESTIMONIALS — updated with job title, no photo
══════════════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════════ */
const Index = () => (
  <Layout>
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <MarqueeBar />

      {/* About teaser */}
      <section className="pt-16 sm:pt-20 pb-16 sm:pb-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[72px] items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
              className="relative flex justify-center lg:justify-start order-2 lg:order-1"
            >
              <div className="absolute -bottom-6 -left-6 w-full h-full rounded-3xl bg-blue-500/8 z-0" style={{ border: "1px solid rgba(59,130,246,0.12)" }} />
              <div className="absolute -top-3 -right-3 z-0 opacity-30"
                style={{ backgroundImage: "radial-gradient(circle,#3b82f6 1px,transparent 1px)", backgroundSize: "14px 14px", width: 120, height: 120 }} />
              <div className="relative z-10 rounded-[28px] overflow-hidden shadow-2xl w-full max-w-[540px]">
                <img src={aboutImage} alt="BYTITUDE team" className="w-full h-[500px] object-cover block" />
                <div className="absolute bottom-5 right-5 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-xl border border-blue-50">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 shrink-0"><Shield size={16} className="text-white" /></span>
                  <div>
                    <p className="text-[#0a0f1e] font-bold text-[13px] leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>10+ Years</p>
                    <p className="text-gray-400 text-[10px] leading-none mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Industry Experience</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Welcome to BYTITUDE</span>
              </div>
              <h2 className="text-[#0a0f1e] font-bold leading-tight mb-5 text-3xl sm:text-4xl" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                Your Success Journey<br />Starts With Us.
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                BYTITUDE is a leading Cybersecurity upskilling, certification, and talent assessment company, enabling individuals, businesses, government institutions, and universities to sharpen their offensive and defensive security expertise.
              </p>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                We provide ideal solutions for cybersecurity professionals and organisations to continuously enhance their cyber-attack readiness by improving their red, blue, and purple team capabilities.
              </p>
              <ul className="space-y-3 mb-8">
                {["Expert Trainers & Certified Instructors", "Online & On-site Learning Formats", "Industry-Recognised Certifications"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/services" className="no-underline">
                <button
                  className="inline-flex items-center gap-3 bg-[#0a0f1e] hover:bg-blue-900 active:scale-95 transition-all text-white font-bold text-sm rounded-full pl-6 pr-2 py-2.5 border-none cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Read More
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 shrink-0"><ArrowUpRight size={14} className="text-white" /></span>
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <TrustedBySection />
      <OfferingsSection />
      <ServicesSection />
      <FeaturedPathsSlider />
      <CoursePreviewSection />

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Why BYTITUDE</span>
            </div>
            <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>What Sets Us Apart</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>We don't just teach theory. We build professionals the industry actually wants to hire.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {whyChooseUs.map((w, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex flex-col items-start p-6 sm:p-7 rounded-2xl border border-gray-100 bg-white hover:-translate-y-1.5 hover:shadow-md hover:border-blue-100 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 shrink-0">
                  <w.icon size={21} className="text-blue-600" />
                </div>
                <h3 className="text-[#0a0f1e] font-bold text-lg mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{w.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSlider />
      <BlogSection />

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-[#0a0f1e] relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Get Started</span>
          </div>
          <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Ready to Advance Your Career?</h2>
          <p className="text-white/55 text-sm sm:text-base max-w-md mx-auto mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Request a training consultation or get a free security assessment for your organisation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/register" className="no-underline w-full sm:w-auto">
              <button
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm rounded-full px-8 py-3 transition-all border-none cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Request Training <ArrowUpRight size={15} />
              </button>
            </Link>
            <Link to="/contact" className="no-underline w-full sm:w-auto">
              <button
                className="inline-flex items-center justify-center w-full sm:w-auto border border-white/20 text-white hover:bg-white/10 rounded-full font-bold text-sm px-8 py-3 transition-all bg-transparent cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Get Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>

      <FAQSection />
      <YoutubeCTABanner />
    </div>
  </Layout>
);

export default Index;