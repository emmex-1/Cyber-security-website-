import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight, ArrowLeft, ArrowRight, Shield, Lock, Cloud,
  Database, Cpu, CheckCircle, Clock, Layers, ChevronDown,
  Check, Users, Monitor, Award, Star,
} from "lucide-react";
import Layout from "@/components/Layout";

/* ── Data ──────────────────────────────────────────────────────────── */
const tracks = [
  {
    id: "cybersecurity", icon: Lock, color: "#1d4ed8", bg: "#eff6ff",
    title: "Cybersecurity",
    paths: [
      { id: "cyber101",  name: "Cyber Security 101",       level: "Beginner",     hours: 40, price: 120000  },
      { id: "ceh",       name: "Ethical Hacking & CEH",    level: "Intermediate", hours: 60, price: 200000  },
      { id: "soc1",      name: "SOC Analyst Level 1",      level: "Beginner",     hours: 35, price: 140000  },
      { id: "security+", name: "CompTIA Security+",        level: "Intermediate", hours: 45, price: 160000  },
      { id: "cissp",     name: "CISSP Certification",      level: "Advanced",     hours: 80, price: 280000  },
      { id: "pentest",   name: "Penetration Testing Pro",  level: "Advanced",     hours: 70, price: 240000  },
    ],
  },
  {
    id: "data", icon: Database, color: "#1d4ed8", bg: "#f0fdfa",
    title: "Data Science",
    paths: [
      { id: "python-data",  name: "Python for Data Analysis",     level: "Beginner",     hours: 30, price: 100000  },
      { id: "ml-fund",      name: "Machine Learning Fundamentals", level: "Intermediate", hours: 50, price: 180000  },
      { id: "sec-analytics",name: "Security Analytics & SIEM",    level: "Intermediate", hours: 40, price: 160000  },
    ],
  },
  {
    id: "cloud", icon: Cloud, color: "#7c3aed", bg: "#f5f3ff",
    title: "Cloud Computing",
    paths: [
      { id: "cloud-found", name: "Cloud Foundations",         level: "Beginner", hours: 25, price: 80000   },
      { id: "aws-security",name: "AWS Security Specialty",    level: "Advanced",  hours: 55, price: 220000  },
      { id: "az500",       name: "Azure Security AZ-500",     level: "Advanced",  hours: 50, price: 200000  },
    ],
  },
  {
    id: "hardware", icon: Cpu, color: "#1d4ed8", bg: "#fffbeb",
    title: "Computer Hardware",
    paths: [
      { id: "aplus",    name: "CompTIA A+ Prep",   level: "Beginner",     hours: 38, price: 120000 },
      { id: "network+", name: "CompTIA Network+",  level: "Beginner",     hours: 35, price: 112000 },
      { id: "iot",      name: "IoT Security",       level: "Intermediate", hours: 30, price: 140000 },
    ],
  },
];

const deliveryModes = [
  { id: "self-paced", icon: Monitor, title: "Self-Paced", desc: "Learn at your own schedule, 24/7 access to all content and labs." },
  { id: "live",       icon: Users,   title: "Live Instructor-Led", desc: "Weekly live sessions, mentorship, and real-time Q&A." },
  { id: "corporate",  icon: Award,   title: "Corporate / Team", desc: "Custom program for your organisation or team." },
];

const STEPS = [
  { id: 1, label: "Track" },
  { id: 2, label: "Course" },
  { id: 3, label: "Delivery" },
  { id: 4, label: "Your Info" },
  { id: 5, label: "Confirm" },
];

const fadeSlide = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
const Register = () => {
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Pre-fill from query params (e.g. ?trackId=cybersecurity&pathId=ceh) */
  const [selectedTrack, setSelectedTrack] = useState(searchParams.get("trackId") ?? "");
  const [selectedPath, setSelectedPath]   = useState(searchParams.get("pathId")  ?? "");
  const [selectedMode, setSelectedMode]   = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", org: "", hearFrom: "" });

  /* If both trackId and pathId are pre-filled from URL, jump straight to step 3 */
  useEffect(() => {
    const tId = searchParams.get("trackId");
    const pId = searchParams.get("pathId");
    if (tId && pId) {
      const trackExists = tracks.find((t) => t.id === tId);
      const pathExists  = trackExists?.paths.find((p) => p.id === pId);
      if (trackExists && pathExists) {
        setSelectedTrack(tId);
        setSelectedPath(pId);
        setStep(3);
      }
    }
  }, []);

  const goNext = () => { setDir(1); setStep((s) => s + 1); };
  const goBack = () => { setDir(-1); setStep((s) => s - 1); };

  const canNext = () => {
    if (step === 1) return !!selectedTrack;
    if (step === 2) return !!selectedPath;
    if (step === 3) return !!selectedMode;
    if (step === 4) return !!(form.firstName && form.lastName && form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email));
    return true;
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  const track = tracks.find((t) => t.id === selectedTrack);
  const path  = track?.paths.find((p) => p.id === selectedPath);

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#f8fafc]">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="text-center max-w-lg">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Check size={38} className="text-white" strokeWidth={3} />
            </motion.div>
            <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Registration Submitted</p>
            <h1 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
              Welcome, {form.firstName}!
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Your registration for <strong>{path?.name}</strong> has been received. We'll be in touch within 24 hours with login details and next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/training" className="no-underline">
                <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-full px-6 py-3 border-none cursor-pointer transition-all active:scale-95"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Browse All Courses <ArrowUpRight size={14} />
                </button>
              </Link>
              <Link to="/" className="no-underline">
                <button className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-sm rounded-full px-6 py-3 bg-white cursor-pointer transition-all active:scale-95"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Back to Home
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex flex-col lg:flex-row">

        {/* ── LEFT SIDEBAR ── */}
        <div className="relative bg-[#0a0f1e] w-full lg:w-[400px] xl:w-[420px] flex-shrink-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <div className="relative z-10 flex flex-col gap-7 px-7 sm:px-10 lg:px-10 py-8 sm:py-10 lg:py-12">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2.5 no-underline group w-fit">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                <Shield size={16} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                BYTITUDE
              </span>
            </Link>

            {/* Headline */}
            <div>
              <p className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.22em] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Enrol Today</p>
              <h2 className="text-white font-bold leading-tight mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 36px)" }}>
                Register for Your<br /><span className="text-blue-400">Certification Path</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Choose from 15+ learning paths across cybersecurity, data science, cloud, and hardware engineering.
              </p>
            </div>

            {/* Trust points */}
            <div className="space-y-2.5">
              {[
                "Hands-on labs with real-world environments",
                "Live instructor-led sessions available",
                "Industry-recognised certifications",
              ].map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={9} className="text-blue-400" />
                  </div>
                  <span className="text-white/60 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{pt}</span>
                </div>
              ))}
            </div>

            {/* Selected path preview */}
            {track && path && (
              <div className="border border-white/10 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.05)" }}>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Selected Course</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${track.color}20`, border: `1px solid ${track.color}30` }}>
                    <track.icon size={14} style={{ color: track.color }} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{path.name}</p>
                    <p className="text-white/40 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {path.level} · {path.hours}h · {formatNaira(path.price)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step progress */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-start gap-0.5 mb-3">
                {STEPS.map((s) => (
                  <div key={s.id} className="flex-1 text-center">
                    <span className={`text-[9px] font-bold uppercase tracking-wider block transition-colors ${step === s.id ? "text-white" : step > s.id ? "text-blue-400" : "text-white/25"}`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                {STEPS.map((s, i) => (
                  <div key={s.id} className="flex items-center flex-1 last:flex-none">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300
                      ${step > s.id ? "bg-blue-600 text-white" : step === s.id ? "bg-white text-[#0a0f1e]" : "bg-white/10 text-white/30"}`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {step > s.id ? <Check size={12} /> : s.id}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-px mx-1 transition-colors duration-300 ${step > s.id ? "bg-blue-600" : "bg-white/10"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT FORM AREA ── */}
        <div className="flex-1 bg-[#f8fafc] lg:h-screen lg:overflow-y-auto">
          <div className="px-6 sm:px-10 lg:px-12 xl:px-14 py-10 lg:py-12 max-w-2xl w-full mx-auto">

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Step {step} of {STEPS.length}
                </span>
                <span className="text-gray-300 text-xs">—</span>
                <span className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{STEPS[step - 1].label}</span>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div className="h-full bg-blue-600 rounded-full"
                  animate={{ width: `${(step / STEPS.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeInOut" }} />
              </div>
            </div>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={step} custom={dir}
                variants={fadeSlide} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.32, ease: "easeInOut" }}>

                {/* ── STEP 1: Choose Track ── */}
                {step === 1 && (
                  <div>
                    <h2 className="text-[#0a0f1e] font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Choose a Learning Track</h2>
                    <p className="text-gray-400 text-sm mb-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>Select the discipline that matches your career goal.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {tracks.map((t) => (
                        <button key={t.id} type="button" onClick={() => { setSelectedTrack(t.id); setSelectedPath(""); }}
                          className={`relative text-left rounded-2xl border-2 p-5 transition-all duration-200 cursor-pointer group
                            ${selectedTrack === t.id ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm"}`}>
                          {selectedTrack === t.id && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                              <Check size={10} className="text-white" strokeWidth={3} />
                            </div>
                          )}
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: t.bg }}>
                            <t.icon size={19} style={{ color: t.color }} />
                          </div>
                          <p className="text-[#0a0f1e] font-bold text-base mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.title}</p>
                          <p className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.paths.length} learning paths available</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Choose Course ── */}
                {step === 2 && track && (
                  <div>
                    <h2 className="text-[#0a0f1e] font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                      Select Your {track.title} Course
                    </h2>
                    <p className="text-gray-400 text-sm mb-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Choose the learning path that fits your current level and certification goal.
                    </p>
                    <div className="space-y-3">
                      {track.paths.map((p) => (
                        <button key={p.id} type="button" onClick={() => setSelectedPath(p.id)}
                          className={`w-full text-left flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                            ${selectedPath === p.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-200"}`}>
                          {selectedPath === p.id && (
                            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                              <Check size={10} className="text-white" strokeWidth={3} />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[#0a0f1e] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.name}</span>
                              <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border flex-shrink-0"
                                style={{ color: track.color, borderColor: `${track.color}30`, background: `${track.color}08`, fontFamily: "'DM Sans', sans-serif" }}>
                                {p.level}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              <span className="flex items-center gap-1"><Clock size={10} />{p.hours}h</span>
                              <span className="flex items-center gap-1"><Layers size={10} />Labs included</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[#0a0f1e] font-bold text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>{formatNaira(p.price)}</p>
                            <p className="text-gray-400 text-[10px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>one-time</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Delivery Mode ── */}
                {step === 3 && (
                  <div>
                    <h2 className="text-[#0a0f1e] font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>How Do You Want to Learn?</h2>
                    <p className="text-gray-400 text-sm mb-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>Choose the delivery format that fits your schedule and learning style.</p>

                    {/* Pre-filled notice banner */}
                    {searchParams.get("trackId") && searchParams.get("pathId") && (
                      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50 border border-blue-100 mb-6">
                        <CheckCircle size={15} className="text-blue-600 shrink-0" />
                        <p className="text-blue-700 text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Course pre-selected: <strong>{path?.name}</strong>. Jump back to Step 1 to change it.
                        </p>
                      </div>
                    )}

                    <div className="space-y-4">
                      {deliveryModes.map((m) => (
                        <button key={m.id} type="button" onClick={() => setSelectedMode(m.id)}
                          className={`w-full text-left flex items-start gap-4 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                            ${selectedMode === m.id ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-blue-200"}`}>
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${selectedMode === m.id ? "bg-blue-600" : "bg-gray-100"}`}>
                            <m.icon size={19} className={selectedMode === m.id ? "text-white" : "text-gray-500"} />
                          </div>
                          <div className="flex-1">
                            <p className="text-[#0a0f1e] font-bold text-base mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{m.title}</p>
                            <p className="text-gray-500 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{m.desc}</p>
                          </div>
                          {selectedMode === m.id && (
                            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={10} className="text-white" strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── STEP 4: Personal Info ── */}
                {step === 4 && (
                  <div>
                    <h2 className="text-[#0a0f1e] font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Your Information</h2>
                    <p className="text-gray-400 text-sm mb-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>We'll use this to confirm your enrolment and send access details.</p>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {[["First Name *", "firstName", "text"], ["Last Name *", "lastName", "text"]].map(([label, field, type]) => (
                          <div key={field}>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</label>
                            <input type={type} placeholder={label.replace(" *", "")} value={(form as any)[field]}
                              onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              style={{ fontFamily: "'DM Sans', sans-serif" }} />
                          </div>
                        ))}
                      </div>
                      {[["Email Address *", "email", "email", "you@email.com"], ["Phone (optional)", "phone", "tel", "+234 (0) 000-0000"]].map(([label, field, type, ph]) => (
                        <div key={field}>
                          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</label>
                          <input type={type} placeholder={ph} value={(form as any)[field]}
                            onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                            className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            style={{ fontFamily: "'DM Sans', sans-serif" }} />
                        </div>
                      ))}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Organisation (optional)</label>
                        <input type="text" placeholder="Your company or university" value={form.org}
                          onChange={(e) => setForm((f) => ({ ...f, org: e.target.value }))}
                          className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          style={{ fontFamily: "'DM Sans', sans-serif" }} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>How Did You Find Us?</label>
                        <div className="relative">
                          <select value={form.hearFrom} onChange={(e) => setForm((f) => ({ ...f, hearFrom: e.target.value }))}
                            className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            <option value="">Select one...</option>
                            {["Google Search", "Social Media", "Referral / Friend", "YouTube", "LinkedIn", "University / College", "Other"].map((h) => (
                              <option key={h} value={h}>{h}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 5: Confirm ── */}
                {step === 5 && (
                  <div>
                    <h2 className="text-[#0a0f1e] font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Confirm Your Enrolment</h2>
                    <p className="text-gray-400 text-sm mb-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>Review your details before submitting.</p>
                    <div className="space-y-4 mb-6">
                      {track && path && (
                        <div className="bg-white rounded-2xl border border-gray-100 p-5">
                          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Selected Course</p>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: track.bg }}>
                              <track.icon size={18} style={{ color: track.color }} />
                            </div>
                            <div>
                              <p className="text-[#0a0f1e] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{path.name}</p>
                              <p className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                {path.level} · {path.hours}h · {formatNaira(path.price)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Delivery Mode</p>
                        <p className="text-[#0a0f1e] font-semibold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {deliveryModes.find((m) => m.id === selectedMode)?.title}
                        </p>
                      </div>
                      <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Your Details</p>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: "Name",         value: `${form.firstName} ${form.lastName}` },
                            { label: "Email",        value: form.email },
                            { label: "Phone",        value: form.phone || "—" },
                            { label: "Organisation", value: form.org || "—" },
                          ].map(({ label, value }) => (
                            <div key={label}>
                              <p className="text-gray-400 text-[10px] uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
                              <p className="text-[#0a0f1e] text-xs font-semibold truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button onClick={handleSubmit} disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 active:scale-95 transition-all text-white font-bold text-sm rounded-full py-4 border-none cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {loading ? (
                        <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Submitting...</>
                      ) : (
                        <>Complete Enrolment<span className="flex items-center justify-center w-8 h-8 rounded-full bg-white shrink-0"><CheckCircle size={15} className="text-blue-600" /></span></>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              {step > 1 ? (
                <button onClick={goBack} className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0a0f1e] text-sm font-semibold transition-colors border-none bg-transparent cursor-pointer p-0"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <ArrowLeft size={15} /> Back
                </button>
              ) : (
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm font-semibold no-underline transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <ArrowLeft size={15} /> Home
                </Link>
              )}
              {step < STEPS.length && (
                <button onClick={goNext} disabled={!canNext()}
                  className={`inline-flex items-center gap-2.5 rounded-full font-bold text-sm transition-all active:scale-95 border-none cursor-pointer
                    ${canNext() ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                  style={{ padding: "11px 20px 11px 24px", fontFamily: "'DM Sans', sans-serif" }}>
                  Continue
                  <span className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 ${canNext() ? "bg-white" : "bg-gray-300"}`}>
                    <ArrowRight size={13} className={canNext() ? "text-blue-600" : "text-gray-400"} />
                  </span>
                </button>
              )}
            </div>

            <p className="text-center text-gray-400 text-xs mt-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Already enrolled?{" "}
              <Link to="/contact" className="text-blue-600 hover:text-blue-800 font-semibold no-underline transition-colors">Contact us</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;