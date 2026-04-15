import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Eye, AlertTriangle, Network, ArrowUpRight,
  Lock, Cloud, Database, Cpu, GraduationCap, CheckCircle,
  Building, Users, Target, Zap, ChevronRight,
  Globe, Quote, Mic, BookOpen,
} from "lucide-react";
import Layout from "@/components/Layout";

import heroImage  from "/images/byt.jpeg";
import aboutImage from "/images/byt.jpeg";
import timsImage  from "/images/byte.jpeg";

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

/* ─── Data ────────────────────────────────────────────────────────────── */
const cyberServices = [
  {
    icon: Shield,
    title: "Cybersecurity Consulting",
    tag: "Strategy",
    tagColor: "#1d4ed8",
    desc: "End-to-end security advisory — from initial gap analysis through risk prioritisation to a fully implemented security framework. We assess your posture, design your defence, and help you execute.",
    deliverables: ["Security Posture Assessment", "Risk Register & Remediation Plan", "Security Policy Development", "Board-level Reporting"],
    ideal: "Organisations building or maturing a security program",
  },
  {
    icon: Eye,
    title: "Security Risk Assessment",
    tag: "Assessment",
    tagColor: "#1d4ed8",
    desc: "Identify your most critical vulnerabilities before attackers do. We deliver comprehensive threat and risk analysis across your infrastructure, applications, and people — with prioritised findings you can act on.",
    deliverables: ["Vulnerability Discovery Report", "CVSS-Scored Risk Matrix", "Threat Modelling", "Remediation Roadmap"],
    ideal: "Pre-audit preparation, compliance readiness, regulatory requirements",
  },
  {
    icon: AlertTriangle,
    title: "Security Awareness Training",
    tag: "People",
    tagColor: "#1d4ed8",
    desc: "Human error accounts for 90% of breaches. Our behavioural security training turns your employees from your biggest risk into your first line of defence — using psychology-backed techniques that actually change behaviour.",
    deliverables: ["Phishing Simulation Campaigns", "Awareness Workshop Delivery", "Custom Training Content", "Post-Training Assessment"],
    ideal: "All staff levels — from frontline employees to executives",
  },
  {
    icon: Network,
    title: "Network Security Monitoring",
    tag: "Operations",
    tagColor: "#1d4ed8",
    desc: "Continuous 24/7 visibility into your network perimeter. We deploy monitoring tools, configure detection rules, and provide real-time threat alerting with escalation procedures tailored to your environment.",
    deliverables: ["SIEM Deployment & Configuration", "Custom Detection Rules", "24/7 Alert Monitoring", "Monthly Threat Reports"],
    ideal: "Businesses requiring continuous security operations without an internal SOC",
  },
];

const trainingServices = [
  {
    icon: Lock,
    title: "Cybersecurity Training",
    tag: "Certification",
    tagColor: "#0f766e",
    desc: "Offensive and defensive security — ethical hacking, penetration testing, SOC operations, threat intelligence, and compliance certifications from CEH to CISSP.",
    certs: ["CEH", "CISSP", "CompTIA Security+", "OSCP", "eJPT"],
  },
  {
    icon: Database,
    title: "Data Science Training",
    tag: "Analytics",
    tagColor: "#0f766e",
    desc: "Machine learning, Python analytics, and AI-powered security applications — from data fundamentals to professional certification through IBM, Google, and AWS.",
    certs: ["IBM Data Science", "Google Analytics", "AWS ML Specialty"],
  },
  {
    icon: Cloud,
    title: "Cloud Computing Training",
    tag: "Infrastructure",
    tagColor: "#0f766e",
    desc: "AWS, Azure, and GCP certification pathways combined with cloud security architecture and DevSecOps best practices for modern infrastructure teams.",
    certs: ["AWS Solutions Architect", "Azure AZ-500", "GCP Pro Security"],
  },
  {
    icon: Cpu,
    title: "Computer Hardware Engineering",
    tag: "Foundations",
    tagColor: "#0f766e",
    desc: "Systems architecture, network hardware, infrastructure design, and IoT security — fully aligned to CompTIA A+, Network+, Server+, and Cisco CCNA.",
    certs: ["CompTIA A+", "Network+", "Server+", "Cisco CCNA"],
  },
];

const audiences = [
  { icon: Users,        title: "Individuals",   desc: "Career changers, graduates, and professionals seeking cybersecurity certifications and job placement." },
  { icon: Building,     title: "Enterprises",   desc: "Corporate teams needing security upskilling, compliance training, or custom program delivery." },
  { icon: GraduationCap,title: "Universities",  desc: "Embedded cybersecurity modules and blended learning solutions for higher education institutions." },
  { icon: Target,       title: "Government",    desc: "Tailored programs for public sector agencies requiring cleared, compliant, and mission-aligned training." },
];

// /* From About page — Four Pillars */
// const pillars = [
//   {
//     icon:    Lock,
//     color:   "#1d4ed8",
//     bg:      "#eff6ff",
//     tag:     "Core Training",
//     name:    "Cybersecurity",
//     tagline: "Offensive & Defensive Security",
//     desc:    "From ethical hacking to SOC operations — our cybersecurity track prepares you for roles as a penetration tester, security analyst, or incident responder with industry-recognised certifications.",
//     link:    "/courses/cybersecurity",
//     cta:     "Explore Cybersecurity",
//   },
//   {
//     icon:    Database,
//     color:   "#0f766e",
//     bg:      "#f0fdfa",
//     tag:     "Data & AI",
//     name:    "Data Science",
//     tagline: "Analytics & Machine Learning",
//     desc:    "Master Python, machine learning, and AI-powered security analytics. Build real models, automate threat intelligence workflows, and earn certifications from IBM, Google, and AWS.",
//     link:    "/courses/data-science",
//     cta:     "Explore Data Science",
//   },
//   {
//     icon:    Cloud,
//     color:   "#7c3aed",
//     bg:      "#f5f3ff",
//     tag:     "Infrastructure",
//     name:    "Cloud Computing",
//     tagline: "AWS · Azure · GCP",
//     desc:    "Deploy and secure cloud infrastructure at scale. Understand AWS, Azure, and GCP architecture, implement zero-trust access, and pass the world's most respected cloud certifications.",
//     link:    "/courses/cloud-computing",
//     cta:     "Explore Cloud",
//   },
//   {
//     icon:    Cpu,
//     color:   "#b45309",
//     bg:      "#fffbeb",
//     tag:     "Hardware & Networking",
//     name:    "Computer Hardware",
//     tagline: "CompTIA A+ · Network+ · CCNA",
//     desc:    "Understand the physical backbone of IT — from systems architecture and network infrastructure to IoT security. Ideal for CompTIA A+, Network+, Server+, and Cisco CCNA candidates.",
//     link:    "/courses/computer-hardware",
//     cta:     "Explore Hardware",
//   },
// ];

/* From About page — Credentials */
const credentials = [
  { icon: Shield,        label: "Cybersecurity Experts"          },
  { icon: GraduationCap, label: "Certified Instructors"          },
  { icon: Globe,         label: "Global Training Delivery"       },
  { icon: Building,      label: "Institutional Collaborator"     },
  { icon: Target,        label: "Offensive Security Specialists" },
];

/* From About page — Institutional / community partnerships */
const partners = [
  {
    icon: GraduationCap,
    title: "IT & Cybersecurity Professionals",
    desc: "Advanced training programs designed for professionals looking to upskill in cybersecurity, cloud security, and real-world threat defense."
  },
  {
    icon: Users,
    title: "Students & Emerging Talent",
    desc: "Supporting students and recent graduates with foundational skills, mentorship, and guided entry into cybersecurity careers."
  },
  { icon: Users,         title: "Corporate Organisations", desc: "Workplace workshops that reduce breach risk and build a security-first culture." },
  {
    icon: Mic,
    title: "SOC & Blue Team Training",
    desc: "Hands-on experience in Security Operations Center workflows, threat detection, incident response, and real-world defense scenarios."
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════ */
const Services = () => (
  <Layout>

    {/* ══ HERO ══════════════════════════════════════════════════════════ */}
    <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[440px]">
        <img src={heroImage} alt="Services" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/80" />
        {/* Decorative stripes */}
        <div className="absolute top-0 right-0 h-full flex items-center gap-1.5 pr-6 sm:pr-10 pointer-events-none">
          <div className="w-2.5 rounded-full bg-blue-500" style={{ height: "55%" }} />
          <div className="w-2.5 rounded-full bg-blue-700/60" style={{ height: "38%" }} />
        </div>
        <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[340px] lg:min-h-[440px] px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 pt-20 sm:pt-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>What We Do</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
            className="text-white font-bold leading-tight mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(38px, 7vw, 88px)" }}>
            Our Services
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
            className="text-white/70 max-w-md leading-relaxed mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}>
            Two pillars — professional cybersecurity services for organisations, and career-defining training for individuals.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}>
            <div className="inline-flex items-center gap-1.5 border border-white/30 rounded-full px-4 py-2"
              style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}>
              <Link to="/" className="text-white/70 hover:text-white text-xs font-medium no-underline transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Home</Link>
              <span className="text-white/40 text-xs">/</span>
              <span className="text-white text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Services</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══ CYBERSECURITY SERVICES ════════════════════════════════════════ */}
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <Shield size={15} className="text-white" />
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-2xl sm:text-3xl" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            Cybersecurity Services
          </h2>
          <div className="flex-1 h-px bg-gray-200 ml-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {cyberServices.map((s, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="group bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: s.tagColor }} />
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${s.tagColor}10`, border: `1px solid ${s.tagColor}20` }}>
                  <s.icon size={21} style={{ color: s.tagColor }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ color: s.tagColor, background: `${s.tagColor}10`, fontFamily: "'DM Sans', sans-serif" }}>
                  {s.tag}
                </span>
              </div>
              <h3 className="text-[#0a0f1e] font-bold text-lg mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Deliverables</p>
                <div className="space-y-1.5">
                  {s.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <ChevronRight size={12} style={{ color: s.tagColor }} className="shrink-0" /> {d}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <p className="text-xs text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span className="font-bold text-gray-500">Ideal for:</span> {s.ideal}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ TRAINING PROGRAMS ════════════════════════════════════════════ */}
    <section className="py-16 sm:py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-lg bg-[#0a0f1e] flex items-center justify-center shrink-0">
            <GraduationCap size={15} className="text-white" />
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-2xl sm:text-3xl" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            Training Programs
          </h2>
          <div className="flex-1 h-px bg-gray-200 ml-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {trainingServices.map((s, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="group bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: s.tagColor }} />
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${s.tagColor}10`, border: `1px solid ${s.tagColor}20` }}>
                  <s.icon size={21} style={{ color: s.tagColor }} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: s.tagColor, fontFamily: "'DM Sans', sans-serif" }}>{s.tag}</span>
                  <h3 className="text-[#0a0f1e] font-bold text-lg leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.title}</h3>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.certs.map((cert) => (
                  <span key={cert} className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
                    style={{ color: s.tagColor, borderColor: `${s.tagColor}30`, background: `${s.tagColor}08`, fontFamily: "'DM Sans', sans-serif" }}>
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ PHILOSOPHY QUOTE ════════════════════════════════════════════ */}
    <section className="bg-[#0a0f1e] py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.5) 0px,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 60px)" }} />
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 max-w-4xl text-center relative z-10">
        <Quote size={36} className="text-blue-500/40 mx-auto mb-6" />
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white font-bold leading-snug mb-6"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(22px, 3.2vw, 42px)" }}
        >
          "Cybersecurity is not a product you buy — it's a mindset you build. We train people to think like attackers, so they can defend like professionals."
        </motion.blockquote>
        <p className="text-blue-400 font-bold text-sm uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>— BYTITUDE Team</p>
      </div>
    </section>

    {/* ══ FOUR CORE DISCIPLINES (pillars from About) ═══════════════════
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Four Disciplines</span>
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            Our Core Training Areas
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Each discipline is independently structured but united by a single mission — educate, certify, and elevate the professionals the industry needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: p.bg }}>
                  <p.icon size={26} style={{ color: p.color }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right max-w-[140px] leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {p.tag}
                </span>
              </div>
              <h3 className="text-[#0a0f1e] font-bold leading-tight mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(20px, 2.2vw, 26px)" }}>
                {p.name}
              </h3>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {p.tagline}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {p.desc}
              </p>
              <Link to={p.link} className="inline-flex items-center gap-2.5 no-underline w-fit">
                <span className="text-[#0a0f1e] text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {p.cta}
                </span>
                <span className="w-7 h-7 rounded-full bg-[#0a0f1e] flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <ArrowUpRight size={12} className="text-white" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section> */}

    {/* ══ WHO WE SERVE ════════════════════════════════════════════════ */}
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Who We Serve</span>
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            Built for Every Audience
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="flex flex-col items-start p-6 rounded-2xl border border-gray-100 bg-white hover:-translate-y-1 hover:shadow-md hover:border-blue-100 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 shrink-0">
                <a.icon size={21} className="text-blue-600" />
              </div>
              <h3 className="text-[#0a0f1e] font-bold text-base mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ CREDENTIALS (from About) ════════════════════════════════════ */}
    <section className="py-16 sm:py-20 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Credentials</span>
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            Background & Expertise
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {credentials.map((c, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 bg-white">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                <c.icon size={22} className="text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-[#0a0f1e] leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ INSTITUTIONAL PARTNERSHIPS (from About) ═════════════════════ */}
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image with floating stat */}
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            className="relative">
            <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.10)" }}>
              <img src={timsImage} alt="Institutional Work" className="w-full h-72 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e]/70 to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-4" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
              <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>500+</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>Lives Impacted</p>
            </div>
          </motion.div>

          {/* Text + partner grid */}
          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Who We Work With</span>
            </div>
            <h2 className="text-[#0a0f1e] font-bold leading-tight mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 44px)" }}>
              Institutional &<br />Community Partnerships
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We partner with schools, universities, corporations, and government organisations to deliver cybersecurity training that blends technical rigour, mindset development, and real-world readiness.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partners.map((w, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="flex items-start gap-3 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <w.icon size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[#0a0f1e] font-bold text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{w.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══ WHY BYTITUDE (from About — Why Choose Us) ═══════════════════ */}
    <section className="py-20 sm:py-24 bg-[#535761] relative overflow-hidden">
      {/* <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} /> */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Why BYTITUDE</span>
            </div>
            <h2 className="text-white font-bold leading-tight mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 46px)" }}>
              What Sets Us<br />Apart
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We don't just teach theory. We build professionals the industry actually wants to hire — with hands-on labs, expert mentors, and globally recognised certifications.
            </p>
            <ul className="space-y-4">
              {[
                "Expert instructors with 10+ years of active industry experience",
                "Real lab environments simulating actual attack and defense scenarios",
                "Globally recognised certifications — CEH, CISSP, CompTIA, AWS, Azure",
                "Corporate and enterprise training with flexible delivery options",
                "Job placement support including CV reviews and mock interviews",
                "Blended online and on-site learning formats for every learner",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-white/75 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            className="hidden lg:block relative">
            <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img src={aboutImage} alt="BYTITUDE training" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                    <Zap size={18} className="text-white" />
                  </span>
                  <div>
                    <p className="text-[#0a0f1e] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Career-Ready in Months</p>
                    <p className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>From beginner to certified professional</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══ DUAL CTA ════════════════════════════════════════════════════ */}
    <section className="py-14 bg-[#0a0f1e] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <Zap size={28} className="text-blue-400 mb-4" />
            <h3 className="text-white font-bold text-2xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>For Individuals</h3>
            <p className="text-white/55 text-sm leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Start your cybersecurity career today. Enrol in a certification track, access live labs, and get mentored to job-readiness.
            </p>
            <Link to="/register" className="no-underline">
              <button
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-full px-6 py-2.5 border-none cursor-pointer transition-all active:scale-95"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Register Now <ArrowUpRight size={14} />
              </button>
            </Link>
          </div>
          <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-8">
            <Building size={28} className="text-blue-400 mb-4" />
            <h3 className="text-white font-bold text-2xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>For Organisations</h3>
            <p className="text-white/55 text-sm leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Request a security assessment or customised training program for your team, department, or entire organisation.
            </p>
            <Link to="/contact" className="no-underline">
              <button
                className="inline-flex items-center gap-2 border border-blue-400/50 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold text-sm rounded-full px-6 py-2.5 bg-transparent cursor-pointer transition-all active:scale-95"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Get a Consultation <ArrowUpRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>

  </Layout>
);

export default Services;