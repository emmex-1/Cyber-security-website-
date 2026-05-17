import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Eye, AlertTriangle, Network, ArrowUpRight,
  Lock, Cloud, GraduationCap, CheckCircle,
  Building, Users, Target, Zap,
  Globe, ClipboardList, Lightbulb, Settings, Award,
  Monitor, Cpu, ChevronRight,
} from "lucide-react";
import Layout from "@/components/Layout";

import heroImage  from "/images/byt.jpeg";
import aboutImage from "/images/byte.jpeg";

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

/* ─── Data ────────────────────────────────────────────────────────────── */

/* What We Offer — 4 pillar cards */
const whatWeOffer = [
  {
    icon: Shield,
    title: "Cybersecurity Training",
    desc: "Hands-on, instructor-led training in offensive and defensive security — from beginner to advanced certifications.",
    stat: "12+ Certifications",
    color: "#1d4ed8",
    bg: "#eff6ff",
    link: "/courses",
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    desc: "Master AWS, Azure, and GCP security architectures with DevSecOps practices and certification pathways.",
    stat: "3 Cloud Platforms",
    color: "#7c3aed",
    bg: "#f5f3ff",
    link: "/courses",
  },
  {
    icon: Monitor,
    title: "Security Consulting",
    desc: "End-to-end security advisory for organisations — gap analysis, risk assessment, and framework implementation.",
    stat: "Enterprise Grade",
    color: "#0f766e",
    bg: "#f0fdfa",
    link: "/contact",
  },
  {
    icon: Users,
    title: "Corporate Training",
    desc: "Customised programs for teams of any size — on-site, virtual, or blended delivery with dedicated support.",
    stat: "500+ Trained",
    color: "#b45309",
    bg: "#fffbeb",
    link: "/organization",
  },
];

/* Work Process — Cybersecurity style */
const workProcess = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Consultation",
    desc: "We begin with a detailed consultation to understand your cybersecurity goals, current skill level, and training requirements.",
    color: "#1d4ed8",
  },
  {
    step: "02",
    icon: Lightbulb,
    title: "Strategy",
    desc: "Our experts design a custom learning or security strategy tailored to your objectives, timeline, and certification targets.",
    color: "#1d4ed8",
  },
  {
    step: "03",
    icon: Settings,
    title: "Implementation",
    desc: "We deliver training through live instructor-led sessions, hands-on labs, and real-world scenarios to ensure practical mastery.",
    color: "#1d4ed8",
  },
  {
    step: "04",
    icon: Award,
    title: "Final Result",
    desc: "Learners achieve certifications, organisations gain a security-ready workforce, and everyone receives ongoing post-training support.",
    color: "#1d4ed8",
  },
];

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
    icon: Cloud,
    title: "Cloud Computing Training",
    tag: "Infrastructure",
    tagColor: "#0f766e",
    desc: "AWS, Azure, and GCP certification pathways combined with cloud security architecture and DevSecOps best practices for modern infrastructure teams.",
    certs: ["AWS Solutions Architect", "Azure AZ-500", "GCP Pro Security"],
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════ */
const Services = () => (
  <Layout>

    {/* ══ HERO ══ */}
    <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[440px]">
        <img src={heroImage} alt="Services" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute top-0 right-0 h-full flex items-center gap-1.5 pr-6 sm:pr-10 pointer-events-none">
          <div className="w-2.5 rounded-full bg-blue-500" style={{ height: "55%" }} />
          <div className="w-2.5 rounded-full bg-blue-700/60" style={{ height: "38%" }} />
        </div>
        <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[340px] lg:min-h-[440px] px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 pt-20 sm:pt-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2 mb-4">
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

    {/* ══ WHAT WE OFFER ════════════════════════════════════════════════ */}
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>What We Offer</span>
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            From certification prep and live labs to consulting and enterprise training — we support your entire cybersecurity journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whatWeOffer.map((item, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Link to={item.link} className="group block h-full no-underline">
                <div className="relative h-full flex flex-col rounded-2xl p-6 border border-gray-100 bg-white hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-100 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: item.color }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0"
                    style={{ background: item.bg, border: `1px solid ${item.color}20` }}>
                    <item.icon size={22} style={{ color: item.color }} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: item.color, fontFamily: "'DM Sans', sans-serif" }}>
                    {item.stat}
                  </p>
                  <h3 className="text-[#0a0f1e] font-bold text-lg leading-snug mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-50">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: item.color, fontFamily: "'DM Sans', sans-serif" }}>
                      Learn More
                    </span>
                    <ArrowUpRight size={13} style={{ color: item.color }} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ WORK PROCESS — Cybersecurity Style ═══════════════════════════ */}
    <section className="py-16 sm:py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>// Our Work Process</span>
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            Our Proven <span className="text-blue-600">Work Process</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            A structured, proven approach to delivering cybersecurity training and consulting that gets results every time.
          </p>
        </div>

        {/* Desktop — horizontal connected steps */}
        <div className="hidden lg:block relative">
          {/* Connector line */}
          <div className="absolute top-[52px] left-[12%] right-[12%] h-0.5 bg-gray-200 z-0" />
          {/* Blue progress line (for visual effect) */}
          <div className="absolute top-[52px] left-[12%] w-[38%] h-0.5 bg-blue-500 z-0" />

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {workProcess.map((step, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex flex-col items-center text-center">
                {/* Circle with number */}
                <div className="relative mb-6">
                  <div className="w-[104px] h-[104px] rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-white"
                    style={{ background: i <= 1 ? "#1d4ed8" : "#e5e7eb" }}>
                    <step.icon size={28} className={i <= 1 ? "text-white" : "text-gray-500"} />
                    <span className={`text-[10px] font-bold mt-1 ${i <= 1 ? "text-white/70" : "text-gray-400"}`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.step}</span>
                  </div>
                </div>
                <h3 className="text-[#0a0f1e] font-bold text-lg mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile — vertical steps */}
        <div className="lg:hidden space-y-0">
          {workProcess.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-md border-4 border-white shrink-0"
                  style={{ background: i <= 1 ? "#1d4ed8" : "#e5e7eb" }}>
                  <step.icon size={18} className={i <= 1 ? "text-white" : "text-gray-500"} />
                </div>
                {i < workProcess.length - 1 && <div className="w-0.5 bg-gray-200 flex-1 my-2" />}
              </div>
              <div className="pb-8 pt-1">
                <p className="text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.step}</p>
                <h3 className="text-[#0a0f1e] font-bold text-base mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.desc}</p>
              </div>
            </div>
          ))}
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
              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-full px-6 py-2.5 border-none cursor-pointer transition-all active:scale-95"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
              <button className="inline-flex items-center gap-2 border border-blue-400/50 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold text-sm rounded-full px-6 py-2.5 bg-transparent cursor-pointer transition-all active:scale-95"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
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