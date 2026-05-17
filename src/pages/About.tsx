import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Users, Award, GraduationCap, Mic,
  ArrowUpRight, CheckCircle, Lock, Cloud,
  Globe, Target, Zap, Quote, Building, Compass, Lightbulb,
  TrendingUp, Star,
} from "lucide-react";
import Layout from "@/components/Layout";

import heroImage  from "/images/byte.jpeg";
import aboutImage from "/images/byt.jpeg";
import timsImage  from "/images/office.png";
import aboutImage2 from "/images/hero-home.jpg";
import aboutImage3 from "/images/laps.png";

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

/* ── Stats ── */
const statsData = [
  { end: "200+", label: "Professionals Trained",  icon: Users },
  { end: "12+",  label: "Certifications Offered", icon: Award },
  { end: "98%",  label: "Pass Rate",              icon: TrendingUp },
  { end: "20+",  label: "Expert Instructors",     icon: GraduationCap },
  { end: "5★",   label: "Student Rating",         icon: Star },
];

/* ── Certificates the company holds ── */
const companyCertificates = [
  {
    image: "/images/comptia.svg",
    name: "CompTIA Authorized Partner",
    issuer: "CompTIA",
    desc: "Recognized as an authorized training partner for CompTIA Security+, Network+, A+, and CySA+ certification programs.",
    color: "#e53e3e",
    bg: "#fff5f5",
  },
  {
    image: "/images/ecouncil.png",
    name: "EC-Council Accredited Partner",
    issuer: "EC-Council",
    desc: "Accredited training partner for EC-Council's CEH (Certified Ethical Hacker), CPENT, and LPT certifications.",
    color: "#1d4ed8",
    bg: "#eff6ff",
  },
  {
    image: "/images/isc.png",
    name: "ISC² Official Training Provider",
    issuer: "ISC²",
    desc: "Official training provider for (ISC)² CISSP and SSCP certification preparation programs globally.",
    color: "#0f766e",
    bg: "#f0fdfa",
  },
  {
    image: "/images/sans.jpg",
    name: "SANS Institute Affiliate",
    issuer: "SANS Institute",
    desc: "Affiliated with the SANS Institute to deliver GIAC-aligned cybersecurity training content and curriculum.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    image: "/images/offsec.png",
    name: "Offensive Security Training Partner",
    issuer: "Offensive Security",
    desc: "Authorized partner for OSCP (Offensive Security Certified Professional) preparation and PWK course delivery.",
    color: "#b45309",
    bg: "#fffbeb",
  },
  {
    image: "/images/google.svg",
    name: "Google Cloud Training Partner",
    issuer: "Google Cloud",
    desc: "Authorized Google Cloud training partner delivering GCP security and infrastructure certification programs.",
    color: "#1d4ed8",
    bg: "#eff6ff",
  },
];

/* ── Partners ── */
const partners = [
  { icon: GraduationCap, title: "IT & Cybersecurity Professionals", desc: "Advanced training programs designed for professionals looking to upskill in cybersecurity, cloud security, and real-world threat defense." },
  { icon: Users,         title: "Students & Emerging Talent",       desc: "Supporting students and recent graduates with foundational skills, mentorship, and guided entry into cybersecurity careers." },
  { icon: Users,         title: "Corporate Organisations",          desc: "Workplace workshops that reduce breach risk and build a security-first culture." },
  { icon: Mic,           title: "SOC & Blue Team Training",         desc: "Hands-on experience in Security Operations Center workflows, threat detection, incident response, and real-world defense scenarios." },
];

const About = () => (
  <Layout>

    {/* ── HERO ── */}
    <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[440px]">
        <img src={heroImage} alt="About BYTITUDE" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute top-0 right-0 h-full flex items-center gap-1.5 pr-6 sm:pr-10 pointer-events-none">
          <div className="w-2.5 rounded-full bg-blue-500" style={{ height: "55%" }} />
          <div className="w-2.5 rounded-full bg-blue-700/60" style={{ height: "38%" }} />
          <div className="w-2.5 rounded-full bg-blue-900/40" style={{ height: "22%" }} />
        </div>
        <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[340px] lg:min-h-[440px] px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 pt-20 sm:pt-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>About BYTITUDE</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
            className="text-white font-bold leading-tight mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(38px, 7vw, 88px)" }}>
            About Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
            className="text-white/70 max-w-md leading-relaxed mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}>
            Cybersecurity educators. Certified trainers. Community builders.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}>
            <div className="inline-flex items-center gap-1.5 border border-white/30 rounded-full px-4 py-2"
              style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}>
              <Link to="/" className="text-white/70 hover:text-white text-xs font-medium no-underline transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Home</Link>
              <span className="text-white/40 text-xs">/</span>
              <span className="text-white text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>About</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════════════════
        WHO WE ARE — Redesigned like the reference image
        Left: image collage with badge overlay
        Right: text + bullet points + CTA
    ══════════════════════════════════════════════════════════════ */}
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left — layered image collage ── */}
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            className="relative order-2 lg:order-1">

            {/* Main large image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: 420 }}>
              <img src={aboutImage} alt="BYTITUDE team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent" />
            </div>

            {/* Overlapping smaller image — bottom right */}
            <div className="absolute -bottom-6 -right-4 sm:-right-8 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
              style={{ width: 200, height: 140 }}>
              <img src={aboutImage2} alt="Training session" className="w-full h-full object-cover" />
            </div>

            {/* Years badge — top left overlap */}
            <div className="absolute -top-5 -left-5 sm:-left-8 z-10">
              <div className="w-[120px] h-[120px] rounded-2xl bg-blue-600 flex flex-col items-center justify-center shadow-2xl shadow-blue-200">
                <span className="text-white font-black text-3xl leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>10+</span>
                <span className="text-white/80 text-[11px] font-bold uppercase tracking-widest mt-1 text-center leading-tight px-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Years of Experience</span>
              </div>
            </div>

            {/* Dot pattern decoration */}
            <div className="absolute -bottom-4 -left-4 z-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle,#3b82f6 1px,transparent 1px)", backgroundSize: "14px 14px", width: 100, height: 100 }} />
          </motion.div>

          {/* ── Right — text ── */}
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
            className="order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Who We Are</span>
            </div>
            <h2 className="text-[#0a0f1e] font-bold leading-tight mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              One of the Fastest Ways<br />to Gain <em className="not-italic text-blue-600">Cyber Expertise</em>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4 text-sm sm:text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              BYTITUDE is a leading Cybersecurity upskilling, certification, and talent assessment company, enabling individuals, businesses, government institutions, and universities to sharpen their offensive and defensive security expertise.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6 text-sm sm:text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              With institutional collaborations across colleges, corporations, and community organisations, our certified instructors bring real-world impact — changing careers across the globe.
            </p>

            {/* Development Special Services style checkboxes */}
            <div className="mb-8">
              <p className="text-[#0a0f1e] font-bold text-sm mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Our Core Services:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                {[
                  "Hands-on Cybersecurity Labs",
                  "Live Instructor-Led Sessions",
                  "Industry-Recognized Certifications",
                  "Corporate Training Programs",
                  "Career Mentorship & Guidance",
                  "24/7 Lab Access & Support",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                      <CheckCircle size={11} className="text-white" />
                    </div>
                    <span className="text-gray-600 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/courses" className="no-underline">
              <button className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all text-white font-bold text-sm rounded-full pl-6 pr-2 py-3 border-none cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Get A Quote
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 shrink-0"><ArrowUpRight size={14} className="text-white" /></span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════════════════
        STATS BAR
    ══════════════════════════════════════════════════════════════ */}
    <section className="py-14 bg-[#0a0f1e]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {statsData.map((stat, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-3">
                <stat.icon size={20} className="text-blue-400" />
              </div>
              <span className="text-white font-black text-3xl sm:text-4xl leading-none mb-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>{stat.end}</span>
              <span className="text-white/50 text-xs font-semibold uppercase tracking-wider"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════════════════
        MISSION & VISION — Redesigned like reference (image + text)
    ══════════════════════════════════════════════════════════════ */}
    <section className="py-20 sm:py-28 bg-[#f8fafc] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">

        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Our Purpose</span>
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Mission &amp; Vision</h2>
        </div>

        {/* MISSION — Image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            className="relative rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1" style={{ height: 380 }}>
            <img src={aboutImage} alt="Our Mission" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0"><Compass size={18} className="text-white" /></span>
                <div>
                  <p className="text-[#0a0f1e] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Our Mission</p>
                  <p className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>Equip next-gen cyber defenders</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
            className="order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Our Mission</span>
            </div>
            <h3 className="text-[#0a0f1e] font-bold leading-tight mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 38px)" }}>
              Equip the World's Next<br />Generation of Cyber Defenders
            </h3>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              To provide accessible, high-impact cybersecurity education and professional certification training that empowers individuals and organisations to protect the digital world — regardless of geography, background, or prior experience.
            </p>
            <div className="space-y-3">
              {[
                "Fostering World-Class Cybersecurity Education",
                "Bridging the Global Talent Gap",
                "Delivering Real-World Skills Through Hands-on Labs",
                "Partnering with Institutions to Embed Security Culture",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <CheckCircle size={11} className="text-white" />
                  </div>
                  <span className="text-gray-600 text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* VISION — text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 inline-block" />
              <span className="text-indigo-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Our Vision</span>
            </div>
            <h3 className="text-[#0a0f1e] font-bold leading-tight mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 38px)" }}>
              A World Where Every<br />Organisation is Cyber-Resilient
            </h3>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We envision a future where cybersecurity expertise is not the privilege of a few elite institutions — but the shared foundation of every professional, every business, and every government. BYTITUDE will be the catalyst for that transformation across Africa, Europe, and the world.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Global Reach",        desc: "Training professionals across 5 continents" },
                { label: "Institutional Change", desc: "Embedding security into academic curricula" },
                { label: "Talent Pipeline",      desc: "Directly placing graduates with top employers" },
                { label: "Zero Barriers",        desc: "Flexible formats for every learner everywhere" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-indigo-200 transition-colors">
                  <p className="text-[#0a0f1e] font-bold text-xs mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</p>
                  <p className="text-gray-400 text-[11px] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden shadow-xl" style={{ height: 380 }}>
            <img src={aboutImage3} alt="Our Vision" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tl from-indigo-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0"><Lightbulb size={18} className="text-white" /></span>
                <div>
                  <p className="text-[#0a0f1e] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Our Vision</p>
                  <p className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>A cyber-resilient world for all</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── PHILOSOPHY QUOTE ── */}
    <section className="bg-[#0a0f1e] py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.5) 0px,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 60px)" }} />
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 max-w-4xl text-center relative z-10">
        <Quote size={36} className="text-blue-500/40 mx-auto mb-6" />
        <motion.blockquote initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-white font-bold leading-snug mb-6"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(20px, 2.8vw, 38px)" }}>
          "Cybersecurity is not a product you buy — it's a mindset you build. We train people to think like attackers, so they can defend like professionals."
        </motion.blockquote>
        <p className="text-blue-400 font-bold text-sm uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>— BYTITUDE Team</p>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════════════════
        CERTIFICATIONS & ACCREDITATIONS
    ══════════════════════════════════════════════════════════════ */}
    <section className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Credentials</span>
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            Our Certifications &amp; Accreditations
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            BYTITUDE holds accreditations from the world's most respected cybersecurity and technology certification bodies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {companyCertificates.map((cert, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* Top accent */}
              <div className="h-1 w-full" style={{ background: cert.color }} />
              <div className="p-6">
                {/* Logo + issuer */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 border border-gray-100"
                    style={{ background: cert.bg }}>
                    <img src={cert.image} alt={cert.issuer} className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: cert.color, fontFamily: "'DM Sans', sans-serif" }}>
                      {cert.issuer}
                    </p>
                    <h3 className="text-[#0a0f1e] font-bold text-base leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {cert.name}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {cert.desc}
                </p>

                {/* Verified badge */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: cert.color }}>
                    <CheckCircle size={10} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>Verified Accreditation</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── INSTITUTIONAL WORK ── */}
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative">
            <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.10)" }}>
              <img src={timsImage} alt="Institutional Work" className="w-full h-72 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e]/70 to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-4" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
              <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>500+</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>Lives Impacted</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Who We Work With</span>
            </div>
            <h2 className="text-[#0a0f1e] font-bold leading-tight mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 44px)" }}>
              Institutional &amp;<br />Community Partnerships
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We partner with schools, universities, corporations, and government organisations to deliver cybersecurity training that blends technical rigour, mindset development, and real-world readiness.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partners.map((w, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="flex items-start gap-3 bg-white rounded-2xl p-5 border border-gray-100">
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

    {/* ── WHY CHOOSE US ── */}
    <section className="py-20 sm:py-24 bg-[#0a0f1e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px] relative z-10">
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
              {["Expert instructors with 10+ years of active industry experience", "Real lab environments simulating actual attack and defense scenarios", "Globally recognised certifications — CEH, CISSP, CompTIA, AWS, Azure", "Corporate and enterprise training with flexible delivery options", "Blended online and on-site learning formats for every learner"].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-white/75 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/register" className="no-underline">
                <button className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm rounded-full px-7 py-2.5 transition-all border-none cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Register Now <ArrowUpRight size={14} />
                </button>
              </Link>
              <Link to="/contact" className="no-underline">
                <button className="inline-flex items-center border border-white/20 text-white hover:bg-white/10 rounded-full font-bold text-sm px-7 py-2.5 transition-all bg-transparent cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Get a Consultation
                </button>
              </Link>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            className="hidden lg:block relative">
            <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img src={heroImage} alt="BYTITUDE training" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0"><Zap size={18} className="text-white" /></span>
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