import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Star, Quote, ArrowUpRight, ChevronLeft, ChevronRight,
  Shield, Lock, Cloud, Database, Cpu, ArrowLeft, ArrowRight,
} from "lucide-react";
import Layout from "@/components/Layout";

import heroImage from "/images/byte.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

/* ── Data ──────────────────────────────────────────────────────────── */
const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "Security Analyst",
    company: "FinTech Solutions Ltd",
    location: "Lagos, Nigeria",
    rating: 5,
    course: "Cybersecurity — CEH Track",
    courseIcon: Lock,
    courseColor: "#1d4ed8",
    quote: "Before BYTITUDE I had zero security experience. Six months later I passed the CEH and landed a junior analyst role at a fintech firm. The lab environments are unlike anything I'd seen in other online platforms — it feels like a real SOC.",
    avatar: "A",
    avatarBg: "#1d4ed8",
    featured: true,
  },
  {
    name: "James Thornton",
    role: "Cloud Security Engineer",
    company: "NexaCloud UK",
    location: "London, UK",
    rating: 5,
    course: "Cloud Computing — AWS Security",
    courseIcon: Cloud,
    courseColor: "#7c3aed",
    quote: "I had the AWS Solutions Architect cert already but needed the Security Specialty. BYTITUDE's course was incredibly focused — no filler, just exactly what you need. Passed first attempt with a score of 870.",
    avatar: "J",
    avatarBg: "#7c3aed",
    featured: true,
  },
  {
    name: "Fatima Al-Hassan",
    role: "Data Security Analyst",
    company: "Gulf Insurance Group",
    location: "Dubai, UAE",
    rating: 5,
    course: "Data Science for Security",
    courseIcon: Database,
    courseColor: "#0f766e",
    quote: "The security analytics module completely changed how our team handles threat intelligence. The Python automation techniques alone saved us hours every week. Best professional investment I've made.",
    avatar: "F",
    avatarBg: "#0f766e",
    featured: false,
  },
  {
    name: "Kwame Asante",
    role: "IT Manager",
    company: "GhanaGov Digital Services",
    location: "Accra, Ghana",
    rating: 5,
    course: "Corporate Training Program",
    courseIcon: Shield,
    courseColor: "#1d4ed8",
    quote: "We enrolled 15 staff across three departments for a customised security awareness program. The instructors tailored the content to our government context perfectly. Within 3 months our phishing click rate dropped by 74%.",
    avatar: "K",
    avatarBg: "#0a0f1e",
    featured: false,
  },
  {
    name: "Sofia Mendez",
    role: "Network Security Engineer",
    company: "Telecomunicaciones España",
    location: "Madrid, Spain",
    rating: 5,
    course: "CompTIA Network+ & Security+",
    courseIcon: Cpu,
    courseColor: "#b45309",
    quote: "I took Network+ and Security+ back to back through BYTITUDE. The instructors kept the content grounded in real-world scenarios rather than just exam memorisation. Passed both within 8 weeks.",
    avatar: "S",
    avatarBg: "#b45309",
    featured: false,
  },
  {
    name: "Emmanuel Chidera",
    role: "Penetration Tester",
    company: "RedForce Security",
    location: "Nairobi, Kenya",
    rating: 5,
    course: "Cybersecurity — OSCP Track",
    courseIcon: Lock,
    courseColor: "#1d4ed8",
    quote: "The Red Teaming course pushed me harder than I expected. The CTF-style lab challenges were genuinely difficult but that's exactly what prepared me for the OSCP. The mentorship sessions with the instructor made all the difference.",
    avatar: "E",
    avatarBg: "#be123c",
    featured: true,
  },
  {
    name: "Priya Sharma",
    role: "Cloud Architect",
    company: "TechMahindra",
    location: "Bangalore, India",
    rating: 5,
    course: "Cloud Computing — Azure AZ-500",
    courseIcon: Cloud,
    courseColor: "#7c3aed",
    quote: "The Azure security course was incredibly thorough. From Azure AD to Sentinel SIEM configuration — everything was covered with hands-on labs. I felt fully prepared walking into the exam.",
    avatar: "P",
    avatarBg: "#7c3aed",
    featured: false,
  },
  {
    name: "Marcus Webb",
    role: "SOC Team Lead",
    company: "CyberGuard Americas",
    location: "Houston, TX, USA",
    rating: 5,
    course: "SOC Analyst Level 1 & 2",
    courseIcon: Shield,
    courseColor: "#0f766e",
    quote: "Sent three junior analysts through the SOC program. All three are now performing confidently on real incidents. The practical Splunk labs are the closest thing to production environments I've seen in any training.",
    avatar: "M",
    avatarBg: "#0f766e",
    featured: false,
  },
  {
    name: "Nadia Petrov",
    role: "Information Security Officer",
    company: "Baltic Bank Group",
    location: "Tallinn, Estonia",
    rating: 5,
    course: "CISSP Certification Track",
    courseIcon: Lock,
    courseColor: "#1d4ed8",
    quote: "CISSP is notoriously difficult and BYTITUDE's structured approach made it manageable. The study materials were comprehensive, the practice questions were very close to the real exam, and the instructor's experience showed in every session.",
    avatar: "N",
    avatarBg: "#475569",
    featured: false,
  },
];

// const stats = [
//   { value: "98%",  label: "Pass Rate" },
//   { value: "200+", label: "Students" },
//   { value: "4.9",  label: "Average Rating" },
//   { value: "5★",   label: "Avg. Review Score" },
// ];

const StarRow = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map((s) => (
      <Star key={s} size={13} fill={s <= rating ? "#f59e0b" : "none"} className={s <= rating ? "text-amber-500" : "text-gray-300"} />
    ))}
  </div>
);

/* ── Featured carousel ─────────────────────────────────────────── */
const FeaturedCarousel = () => {
  const featured = testimonials.filter((t) => t.featured);
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (next: number, d: number) => { setDir(d); setIdx(next); };
  const t = featured[idx];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.3 } }),
  };

  return (
    <div className="relative bg-[#0a0f1e] rounded-3xl overflow-hidden p-8 sm:p-12">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-6 left-8 opacity-10">
        <Quote size={80} className="text-blue-400" />
      </div>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={idx} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
          className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Quote side */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${t.courseColor}20`, border: `1px solid ${t.courseColor}30` }}>
                <t.courseIcon size={13} style={{ color: t.courseColor }} />
              </div>
              <span className="text-xs font-bold" style={{ color: t.courseColor, fontFamily: "'DM Sans', sans-serif" }}>{t.course}</span>
            </div>
            <blockquote className="text-white font-medium text-lg sm:text-xl leading-relaxed mb-8"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              "{t.quote}"
            </blockquote>
            <StarRow rating={t.rating} />
          </div>

          {/* Person side */}
          <div className="flex flex-col items-center lg:items-end gap-5">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl"
              style={{ background: t.avatarBg, fontFamily: "'DM Sans', sans-serif" }}>
              {t.avatar}
            </div>
            <div className="text-center lg:text-right">
              <p className="text-white font-bold text-xl mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.name}</p>
              <p className="text-blue-400 text-sm font-semibold mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.role}</p>
              <p className="text-white/40 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.company} · {t.location}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="relative z-10 flex items-center justify-between mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2">
          {featured.map((_, i) => (
            <button key={i} onClick={() => go(i, i > idx ? 1 : -1)}
              className="rounded-full border-none cursor-pointer p-0 transition-all duration-300 h-1.5"
              style={{ width: i === idx ? 24 : 8, background: i === idx ? "#3b82f6" : "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => go((idx - 1 + featured.length) % featured.length, -1)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border-none cursor-pointer transition-all">
            <ChevronLeft size={16} className="text-white" />
          </button>
          <button onClick={() => go((idx + 1) % featured.length, 1)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border-none cursor-pointer transition-all">
            <ChevronRight size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
const Testimonials = () => (
  <Layout>

    {/* ── HERO ── */}
    <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[440px]">
                 <img src={heroImage} alt="Blog" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.5) 0px,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 60px)" }} />
          <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[340px] lg:min-h-[440px] px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 pt-20 sm:pt-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Student Stories</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
            className="text-white font-bold leading-tight mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(38px, 7vw, 88px)" }}>
            What Our Students Say
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
            className="text-white/70 max-w-md leading-relaxed mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}>
            Real results from professionals who transformed their careers through BYTITUDE.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}>
            <div className="inline-flex items-center gap-1.5 border border-white/30 rounded-full px-4 py-2"
              style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}>
              <Link to="/" className="text-white/70 hover:text-white text-xs font-medium no-underline transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Home</Link>
              <span className="text-white/40 text-xs">/</span>
              <span className="text-white text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Testimonials</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── STATS ──
    <section className="bg-[#0a0f1e] py-6">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-white/10">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center py-3">
              <span className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>{s.value}</span>
              <span className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section> */}

    {/* ── FEATURED CAROUSEL ── */}
    <section className="py-16 sm:py-20 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Featured Stories</span>
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            Career Transformations
          </h2>
        </div>
        <FeaturedCarousel />
      </div>
    </section>

    {/* ── ALL TESTIMONIALS GRID ── */}
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>All Reviews</span>
          </div>
          <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            Every Voice Counts
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={i} custom={i % 6} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col">
              {/* Course tag */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${t.courseColor}15`, border: `1px solid ${t.courseColor}20` }}>
                  <t.courseIcon size={12} style={{ color: t.courseColor }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest truncate"
                  style={{ color: t.courseColor, fontFamily: "'DM Sans', sans-serif" }}>{t.course}</span>
              </div>

              {/* Quote */}
              <div className="relative mb-5 flex-1">
                <Quote size={16} className="text-gray-200 mb-2" />
                <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>"{t.quote}"</p>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <StarRow rating={t.rating} />
              </div>

              {/* Person */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ background: t.avatarBg, fontFamily: "'DM Sans', sans-serif" }}>{t.avatar}</div>
                <div>
                  <p className="text-[#0a0f1e] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.name}</p>
                  <p className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.role} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="py-14 bg-[#0a0f1e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-white font-bold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
          Ready to Write Your Own Story?
        </h2>
        <p className="text-white/55 text-sm max-w-md mx-auto mb-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Join hundreds of professionals who chose BYTITUDE to certify, advance, and transform their careers.
        </p>
        <Link to="/register" className="no-underline">
          <button className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-full pl-6 pr-2 py-3 transition-all active:scale-95 border-none cursor-pointer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Start Your Journey
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/25 shrink-0">
              <ArrowUpRight size={14} className="text-white" />
            </span>
          </button>
        </Link>
      </div>
    </section>
  </Layout>
);

export default Testimonials;