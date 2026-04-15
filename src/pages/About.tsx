import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Users, Award, GraduationCap, Mic, BookOpen,
  ArrowUpRight, CheckCircle, Lock, Cloud, Database, Cpu,
  Globe, Target, Zap, Quote, Building, Eye,
} from "lucide-react";
import Layout from "@/components/Layout";

import heroImage  from "/images/byte.jpeg";
import aboutImage from "/images/byt.jpeg";
import timsImage  from "/images/thumb4.jpg";

/* ─── Fade-up variant ─────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

/* ─── Data ────────────────────────────────────────────────────────── */
const pillars = [
  {
    icon:    Lock,
    color:   "#1d4ed8",
    bg:      "#eff6ff",
    // border:  "#bfdbfe",
    tag:     "Core Training",
    name:    "Cybersecurity",
    tagline: "Offensive & Defensive Security",
    desc:    "From ethical hacking to SOC operations — our cybersecurity track prepares you for roles as a penetration tester, security analyst, or incident responder with industry-recognised certifications.",
    link:    "/courses/cybersecurity",
    cta:     "Explore Cybersecurity",
  },
  {
    icon:    Database,
    color:   "#0f766e",
    bg:      "#f0fdfa",
    // border:  "#99f6e4",
    tag:     "Data & AI",
    name:    "Data Science",
    tagline: "Analytics & Machine Learning",
    desc:    "Master Python, machine learning, and AI-powered security analytics. Build real models, automate threat intelligence workflows, and earn certifications from IBM, Google, and AWS.",
    link:    "/courses/data-science",
    cta:     "Explore Data Science",
  },
  {
    icon:    Cloud,
    color:   "#7c3aed",
    bg:      "#f5f3ff",
    // border:  "#c4b5fd",
    tag:     "Infrastructure",
    name:    "Cloud Computing",
    tagline: "AWS · Azure · GCP",
    desc:    "Deploy and secure cloud infrastructure at scale. Understand AWS, Azure, and GCP architecture, implement zero-trust access, and pass the world's most respected cloud certifications.",
    link:    "/courses/cloud-computing",
    cta:     "Explore Cloud",
  },
  {
    icon:    Cpu,
    color:   "#b45309",
    bg:      "#fffbeb",
    // border:  "#fcd34d",
    tag:     "Hardware & Networking",
    name:    "Computer Hardware",
    tagline: "CompTIA A+ · Network+ · CCNA",
    desc:    "Understand the physical backbone of IT — from systems architecture and network infrastructure to IoT security. Ideal for CompTIA A+, Network+, Server+, and Cisco CCNA candidates.",
    link:    "/courses/computer-hardware",
    cta:     "Explore Hardware",
  },
];

const services = [
  { icon: Shield,        title: "Cybersecurity Consulting",    desc: "End-to-end advisory from gap analysis to fully implemented security frameworks." },
  { icon: Eye,           title: "Security Risk Assessments",   desc: "Identify critical vulnerabilities before attackers do — with prioritised remediation plans." },
  { icon: Users,         title: "Corporate Training",          desc: "Customised programs for organisations, government agencies, and universities." },
  { icon: Mic,           title: "Public Speaking & Workshops", desc: "Keynote talks and hands-on workshops on cybersecurity trends and best practices." },
  { icon: BookOpen,      title: "University Programs",         desc: "Accredited modules and blended learning solutions for higher education institutions." },
  { icon: GraduationCap, title: "Youth & Outreach Programs",  desc: "Life-skills and cyber-readiness training delivered directly to schools and youth organisations." },
];

const credentials = [
  { icon: Shield,        label: "Cybersecurity Experts"          },
  { icon: GraduationCap, label: "Certified Instructors"          },
  { icon: Globe,         label: "Global Training Delivery"       },
  { icon: Building,      label: "Institutional Collaborator"     },
  { icon: Target,        label: "Offensive Security Specialists" },
];

const partners = [
  { icon: BookOpen,      title: "Community Colleges",      desc: "Delivering security education modules embedded into accredited college curricula." },
  { icon: GraduationCap, title: "Universities",            desc: "Blending cybersecurity, cloud, and data science into university partner programs nationally." },
  { icon: Users,         title: "Corporate Organisations", desc: "Workplace workshops that reduce breach risk and build a security-first culture." },
  { icon: Mic,           title: "Youth Programmes",        desc: "Cyber-readiness and life-skills training delivered directly to the next generation." },
];

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
const About = () => (
  <Layout>

    {/* ══════════════════════════════════════════════════════
        1. HERO — white bg, rounded card, diagonal lines,
           content pinned to bottom (first-code style)
    ══════════════════════════════════════════════════════ */}
    <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[440px]">
        <img
          src={heroImage}
          alt="About BYTITUDE"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/72" />
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,rgba(255,255,255,0.3) 0px,rgba(255,255,255,0.3) 1px,transparent 1px,transparent 60px)",
          }}
        />

        <div className="relative z-10 flex flex-col justify-end h-full min-h-[260px] sm:min-h-[340px] lg:min-h-[440px] px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 pt-20 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            <span
              className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              About BYTITUDE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white font-bold leading-tight mb-3"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(40px, 7vw, 88px)",
            }}
          >
            About Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="text-white/70 max-w-sm sm:max-w-md leading-relaxed mb-6"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(13px, 1.6vw, 16px)",
            }}
          >
            Cybersecurity educators. Certified trainers. Community builders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <div
              className="inline-flex items-center gap-1.5 border border-white/30 rounded-full px-4 py-2"
              style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}
            >
              <Link
                to="/"
                className="text-white/70 hover:text-white text-xs sm:text-sm font-medium transition-colors no-underline"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Home
              </Link>
              <span className="text-white/40 text-xs">/</span>
              <span
                className="text-white text-xs sm:text-sm font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                About
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════════
        2. WHO WE ARE — asymmetric two-column
    ══════════════════════════════════════════════════════ */}
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div
              className="absolute -bottom-6 -left-6 w-full h-full rounded-3xl z-0"
              style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}
            />
            <div
              className="absolute -top-3 -right-3 z-0 opacity-25"
              style={{
                backgroundImage: "radial-gradient(circle,#3b82f6 1px,transparent 1px)",
                backgroundSize: "14px 14px",
                width: 120,
                height: 120,
              }}
            />
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl w-full max-w-[520px]">
              <img
                src={aboutImage}
                alt="BYTITUDE team"
                className="w-full h-[460px] sm:h-[500px] object-cover block"
              />
              <div
                className="absolute bottom-5 right-5 bg-white rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.14)" }}
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 shrink-0">
                  <Shield size={16} className="text-white" />
                </span>
                <div>
                  <p className="text-[#0a0f1e] font-bold text-[13px] leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>10+ Years</p>
                  <p className="text-gray-400 text-[10px] leading-none mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Industry Experience</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Who We Are</span>
            </div>
            <h2
              className="text-[#0a0f1e] font-bold leading-tight mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 50px)" }}
            >
              Your Success Journey<br />Starts With Us.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4 text-sm sm:text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              BYTITUDE is a leading Cybersecurity upskilling, certification, and talent assessment company, enabling individuals, businesses, government institutions, and universities to sharpen their offensive and defensive security expertise.
            </p>
            <p className="text-gray-500 leading-relaxed mb-4 text-sm sm:text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We provide ideal solutions for cybersecurity professionals and organisations to continuously enhance their cyber-attack readiness by improving their red, blue, and purple team capabilities.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8 text-sm sm:text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              With institutional collaborations across colleges, corporations, and community organisations, our certified instructors and expert practitioners bring a reputation for credibility and real-world impact — changing careers across the globe.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Cybersecurity", "Cloud Computing", "Data Science", "Hardware Engineering", "Corporate Training", "Nonprofit Outreach"].map((tag) => (
                <span key={tag} className="text-[11px] font-semibold text-[#0a0f1e] bg-gray-100 px-3 py-1.5 rounded-full" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {tag}
                </span>
              ))}
            </div>
            <Link to="/courses" className="no-underline">
              <button
                className="inline-flex items-center gap-3 bg-[#0a0f1e] hover:bg-blue-900 active:scale-95 transition-all text-white font-bold text-sm rounded-full pl-6 pr-2 py-2.5 border-none cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                View Our Courses
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 shrink-0">
                  <ArrowUpRight size={14} className="text-white" />
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════════
        3. PHILOSOPHY QUOTE — dark band
    ══════════════════════════════════════════════════════ */}
    <section className="bg-[#0a0f1e] py-16 sm:py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,rgba(255,255,255,0.5) 0px,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 60px)",
        }}
      />
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

    {/* ══════════════════════════════════════════════════════
        4. FOUR PILLARS — 2×2 card grid
    ══════════════════════════════════════════════════════ */}
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
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl p-8 sm:p-10 border-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              
            >
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
    </section>

    {/* ══════════════════════════════════════════════════════
        5. CREDENTIALS — icon row
    ══════════════════════════════════════════════════════ */}
    <section className="py-20 sm:py-24 bg-white">
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
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                <c.icon size={22} className="text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-[#0a0f1e] leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════════
        6. INSTITUTIONAL WORK — image + grid
    ══════════════════════════════════════════════════════ */}
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.10)" }}>
              <img src={timsImage} alt="Institutional Work" className="w-full h-72 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e]/70 to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-4" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
              <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>500+</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>Lives Impacted</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Who We Work With</span>
            </div>
            <h2
              className="text-[#0a0f1e] font-bold leading-tight mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 44px)" }}
            >
              Institutional &<br />Community Partnerships
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We partner with schools, universities, corporations, and government organisations to deliver cybersecurity training that blends technical rigour, mindset development, and real-world readiness.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partners.map((w, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-3 bg-white rounded-2xl p-5 border border-gray-100"
                >
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

    {/* ══════════════════════════════════════════════════════
        7. SERVICES — icon card grid
    ══════════════════════════════════════════════════════ */}
    <section className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Services</span>
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            How BYTITUDE Can Help You
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex items-start gap-4 bg-gray-50 rounded-2xl px-5 py-5 border border-gray-100 hover:border-blue-200 hover:bg-white transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                <s.icon size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-[#0a0f1e] font-bold text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.title}</p>
                <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════════
        8. WHY CHOOSE US — dark two-column
    ══════════════════════════════════════════════════════ */}
    <section className="py-20 sm:py-24 bg-[#0a0f1e] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Why BYTITUDE</span>
            </div>
            <h2
              className="text-white font-bold leading-tight mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 46px)" }}
            >
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
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/register" className="no-underline">
                <button className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm rounded-full px-7 py-2.5 transition-all border-none cursor-pointer" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Register Now <ArrowUpRight size={14} />
                </button>
              </Link>
              <Link to="/contact" className="no-underline">
                <button className="inline-flex items-center border border-white/20 text-white hover:bg-white/10 rounded-full font-bold text-sm px-7 py-2.5 transition-all bg-transparent cursor-pointer" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Get a Consultation
                </button>
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img src={heroImage} alt="BYTITUDE training" className="w-full h-full object-cover" />
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

  </Layout>
);

export default About;