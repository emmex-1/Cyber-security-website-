import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CheckCircle, X, ArrowUpRight,
  Users, Award, ChevronDown, Building,
  MapPin, GraduationCap, Zap, Shield, Star,
  BarChart2, Lock, Globe, BookOpen,
} from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "/images/byte.jpeg";

/* ── Individual Training Plans ── */
const individualPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    highlight: false,
    tag: null,
    description: "Explore cybersecurity basics with free access to introductory content and community resources.",
    features: [
      "Access to free intro modules",
      "Community forum access",
      "1 self-paced mini-course",
      "Certificate of participation",
    ],
    notIncluded: [
      "Live instructor sessions",
      "Lab environment access",
      "Certification prep",
      "Mentorship",
    ],
    cta: "Get Started Free",
    ctaLink: "/register?plan=free",
  },
  {
    id: "starter",
    name: "Starter",
    price: 120000,
    highlight: false,
    tag: null,
    description: "Intensive fast-track certification prep. Best for professionals who need to upskill quickly.",
    features: [
      "4 weeks intensive training",
      "1 certification track",
      "Live sessions (3× per week)",
      "Access to lab environment",
      "Study materials & recordings",
      "Exam prep mock tests",
    ],
    notIncluded: ["1-on-1 mentorship", "Career acceleration support"],
    cta: "Enrol — Starter",
    ctaLink: "/register?plan=starter",
  },
  {
    id: "professional",
    name: "Professional",
    price: 260000,
    highlight: true,
    tag: "Most Popular",
    description: "Our flagship program. Full certification prep with mentorship, career support, and live labs.",
    features: [
      "12 weeks comprehensive training",
      "Multiple certification tracks",
      "Live sessions (5× per week)",
      "Full lab access (24/7)",
      "Study materials & recordings",
      "Exam prep mock tests",
      "1-on-1 weekly mentorship",
      "Mock interview preparation",
    ],
    notIncluded: [],
    cta: "Enrol — Professional",
    ctaLink: "/register?plan=professional",
  },
  {
    id: "career",
    name: "Career Track",
    price: 340000,
    highlight: false,
    tag: null,
    description: "For those targeting advanced certifications (CISSP, OSCP, AWS Security) with full support.",
    features: [
      "16 weeks advanced training",
      "Advanced certification tracks",
      "Live sessions (5× per week)",
      "Full lab access (24/7)",
      "Study materials & recordings",
      "Exam prep mock tests",
      "Weekly 1-on-1 mentorship",
      "Mock interview preparation",
      "Career acceleration network access",
      "Job placement support",
    ],
    notIncluded: [],
    cta: "Enrol — Career Track",
    ctaLink: "/register?plan=career",
  },
];

/* ── Organisation Plans ── */
const orgPlans = [
  {
    id: "seat",
    name: "Corporate Training",
    price: 85000,
    priceNote: "per user / month",
    highlight: false,
    tag: null,
    icon: Users,
    iconColor: "#2563eb",
    description: "✔ Per User (Seat-Based Pricing) — Train individual employees with scalable per-user access.",
    features: [
      "Seat-based per-user access",
      "All core training tracks",
      "Live instructor-led sessions",
      "Admin dashboard & reporting",
      "Team progress tracking",
      "Minimum 5 seats",
      "Monthly or annual billing",
    ],
    notIncluded: ["Custom curriculum design", "Dedicated account manager"],
    cta: "Get Seats",
    ctaLink: "/register?plan=corporate&type=org",
  },
  {
    id: "program",
    name: "Advanced Team Upskilling",
    price: 1200000,
    priceNote: "per program",
    highlight: true,
    tag: "Best Value",
    icon: BookOpen,
    iconColor: "#2563eb",
    description: "✔ Program-Based Pricing — Pay for specific training programs tailored to your team.",
    features: [
      "Up to 25 staff per program",
      "Custom curriculum design",
      "Dedicated program manager",
      "Live sessions + recordings",
      "Full lab environment",
      "Post-training assessment",
      "Certificate of completion (all staff)",
      "Flexible schedule",
    ],
    notIncluded: [],
    cta: "Start a Program",
    ctaLink: "/register?plan=team-program&type=org",
  },
  {
    id: "enterprise",
    name: "Custom Programs",
    price: null,
    priceNote: "Custom quote",
    highlight: false,
    tag: null,
    icon: Globe,
    iconColor: "#d97706",
    description: "✔ Enterprise Licensing — Organization-wide access with custom learning paths and reporting.",
    features: [
      "Unlimited staff training",
      "Org-wide learning paths",
      "Custom branding (white-label)",
      "Advanced analytics & reporting",
      "API & LMS integration",
      "Dedicated account manager",
      "SLA & priority support",
      "Executive briefing sessions",
    ],
    notIncluded: [],
    cta: "Request Enterprise Quote",
    ctaLink: "/register?plan=enterprise&type=org",
  },
];

const compareRows = [
  { feature: "Training duration",        free: "Mini-course", starter: "4 weeks",   professional: "12 weeks",  career: "16 weeks"  },
  { feature: "Certification tracks",     free: "—",           starter: "1 track",   professional: "Multiple",  career: "Advanced"  },
  { feature: "Live sessions / week",     free: "—",           starter: "3×",        professional: "5×",        career: "5×"        },
  { feature: "Lab access",               free: "—",           starter: "Limited",   professional: "24/7",      career: "24/7"      },
  { feature: "Study materials",          free: "✓",           starter: "✓",         professional: "✓",         career: "✓"         },
  { feature: "Mock exams",               free: "✗",           starter: "✓",         professional: "✓",         career: "✓"         },
  { feature: "Email instructor support", free: "✗",           starter: "✗",         professional: "✓",         career: "✓"         },
  { feature: "1-on-1 mentorship",        free: "✗",           starter: "✗",         professional: "Weekly",    career: "Weekly"    },
  { feature: "Mock interview prep",      free: "✗",           starter: "✗",         professional: "✓",         career: "✓"         },
  { feature: "Job placement support",    free: "✗",           starter: "✗",         professional: "✗",         career: "✓"         },
];

const faqs = [
  { q: "Are training plan prices in Naira?", a: "Yes. All cohort / training program fees are displayed in Nigerian Naira (₦)." },
  { q: "What certifications do you prepare for?", a: "CEH, CISSP, CompTIA Security+, CompTIA Network+, CompTIA A+, AWS Security, Azure AZ-500, and more." },
  { q: "Do you offer group/corporate discounts?", a: "Yes. Enterprise plans are available for teams of any size with custom pricing and curriculum." },
  { q: "What payment methods do you accept?", a: "We accept bank transfer, card payments, and flexible instalment plans. Contact us to discuss options." },
  { q: "Can I pay in instalments?", a: "Yes. Flexible instalment payment plans are available for all cohort programs. Contact us for details." },
  { q: "Is training available online?", a: "All courses are available online with live instructor sessions, recorded content, and 24/7 lab access." },
  { q: "What is the difference between seat-based and program-based pricing?", a: "Seat-based pricing gives each employee their own access to the platform (billed per user). Program-based pricing covers a complete training program for a group, typically 10–25 staff, with a single fixed price and custom curriculum." },
  { q: "Can we get a demo before committing to an enterprise plan?", a: "Absolutely. Contact our sales team to schedule a live demo and discuss your organisation's specific training needs." },
];

const formatNaira = (amount: number | null) =>
  amount === null ? "Custom" : amount === 0 ? "Free" : `₦${amount.toLocaleString("en-NG")}`;

const CellValue = ({ value, featured }: { value: string; featured: boolean }) => {
  if (value === "✓") return <CheckCircle size={16} className={featured ? "text-blue-500" : "text-green-500"} />;
  if (value === "✗") return <X size={16} className="text-gray-300" />;
  return <span className="text-xs font-semibold text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>{value}</span>;
};

const Pricing = () => {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [pricingMode, setPricingMode] = useState<"individual" | "organisation">("individual");

  const activePlans = pricingMode === "individual" ? individualPlans : orgPlans;

  return (
    <Layout>
      <div className="w-full overflow-x-hidden">

        {/* ── PAGE HEADER ── */}
        <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[440px]">
            <img src={heroImage} alt="Pricing" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/80" />
            <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[340px] lg:min-h-[440px] px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 pt-20 sm:pt-28">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pricing</span>
                </div>
                <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl mb-4" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                  Simple, Transparent Pricing
                </h1>
                <p className="text-white/55 text-base sm:text-lg max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  One-time cohort fees with everything included. No subscriptions, no hidden costs — just career-changing training.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="mt-6">
                <div className="inline-flex items-center gap-1.5 border border-white/30 rounded-full px-4 py-2" style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}>
                  <Link to="/" className="text-white/70 hover:text-white text-xs font-medium transition-colors no-underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>Home</Link>
                  <span className="text-white/40 text-xs">/</span>
                  <span className="text-white text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pricing</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TOGGLE ── */}
        <section className="bg-[#f8fafc] pt-12 pb-0 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
                <button
                  onClick={() => setPricingMode("individual")}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border-none cursor-pointer ${pricingMode === "individual" ? "bg-[#0a0f1e] text-white shadow" : "text-gray-500 bg-transparent hover:text-gray-800"}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Individual
                </button>
                <button
                  onClick={() => setPricingMode("organisation")}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border-none cursor-pointer ${pricingMode === "organisation" ? "bg-[#0a0f1e] text-white shadow" : "text-gray-500 bg-transparent hover:text-gray-800"}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Organisation
                </button>
              </div>
              <AnimatePresence mode="wait">
                {pricingMode === "organisation" && (
                  <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    className="text-blue-600 text-xs font-semibold mt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    🏢 Organisation pricing — seat-based, program-based, or full enterprise licensing
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── PLAN CARDS ── */}
        <section className="bg-[#f8fafc] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1200px] mx-auto">

            {pricingMode === "individual" && (
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Individual Plans</span>
                </div>
                <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Choose Your Cohort</h2>
                <p className="text-gray-400 text-sm max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  All training / cohort program fees are one-time payments displayed in <strong>Nigerian Naira (₦)</strong>.{" "}
                  Flexible instalment options available — <Link to="/contact" className="text-blue-600 font-semibold no-underline hover:underline">contact us</Link>.
                </p>
              </div>
            )}

            {pricingMode === "organisation" && (
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Organisation Plans</span>
                </div>
                <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Train Your Entire Team</h2>
                <p className="text-gray-400 text-sm max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Three flexible pricing models to match your organisation's size and goals.{" "}
                  <Link to="/organisation" className="text-blue-600 font-semibold no-underline hover:underline">Learn more about our Organisation programs →</Link>
                </p>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={pricingMode}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14"
              >
                {activePlans.map((plan: any, i: number) => (
                  <motion.div key={plan.id} custom={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }}
                    className={`relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col ${
                      plan.highlight ? "border-blue-500 shadow-lg shadow-blue-100" : "border-gray-200 bg-white hover:border-blue-100 hover:shadow-md"
                    }`}>
                    {plan.tag && (
                      <div className="absolute top-0 left-0 right-0 flex justify-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white px-4 py-1 rounded-b-lg"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.tag}</span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1" style={{ paddingTop: plan.tag ? "2.5rem" : "1.5rem", background: "white" }}>
                      {plan.icon && (
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${plan.iconColor}15` }}>
                          <plan.icon size={17} style={{ color: plan.iconColor }} />
                        </div>
                      )}
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.name}</p>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-[#0a0f1e] font-bold text-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>{formatNaira(plan.price)}</span>
                        {plan.price !== 0 && (
                          <span className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.priceNote || "one-time"}</span>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.description}</p>
                      <div className="space-y-2 flex-1 mb-5">
                        {plan.features.map((f: string, fi: number) => (
                          <div key={fi} className="flex items-start gap-2">
                            <CheckCircle size={12} className="text-blue-600 shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                          </div>
                        ))}
                        {plan.notIncluded?.map((f: string, fi: number) => (
                          <div key={fi} className="flex items-start gap-2 opacity-40">
                            <div className="w-3 h-3 shrink-0 mt-0.5 flex items-center justify-center">
                              <div className="w-2.5 h-px bg-gray-400 rounded" />
                            </div>
                            <span className="text-gray-400 text-xs line-through" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link to={plan.ctaLink || "/register"} className="no-underline mt-auto">
                        <button
                          className="w-full inline-flex items-center justify-center gap-2 font-bold text-sm rounded-xl py-3 transition-all border-none cursor-pointer active:scale-95"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            background: plan.highlight ? "#1d4ed8" : "#f3f4f6",
                            color: plan.highlight ? "white" : "#0a0f1e",
                          }}
                        >
                          {plan.cta}
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* ── Organisation Pricing Models explanation ── */}
            {pricingMode === "organisation" && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                className="bg-white border border-blue-100 rounded-2xl p-8 mb-14">
                <h3 className="text-[#0a0f1e] font-bold text-xl mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>Three Ways to Train Your Organisation</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Users, color: "#2563eb", bg: "#eff6ff",
                      title: "Per User (Seat-Based)",
                      desc: "Train individual employees with scalable per-user access. Each seat gets full platform access, live sessions, and reporting. Ideal for growing teams that need flexibility.",
                    },
                    {
                      icon: BookOpen, color: "#059669", bg: "#ecfdf5",
                      title: "Program-Based Pricing",
                      desc: "Pay for specific training programs tailored to your team. One fixed price covers a complete cohort with custom curriculum, dedicated program manager, and group assessments.",
                    },
                    {
                      icon: Globe, color: "#d97706", bg: "#fffbeb",
                      title: "Enterprise Licensing",
                      desc: "Organisation-wide access with custom learning paths and reporting. Includes white-labeling, LMS integration, API access, and a dedicated account manager.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-3 p-5 rounded-xl border border-gray-100">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: item.bg }}>
                        <item.icon size={18} style={{ color: item.color }} />
                      </div>
                      <p className="text-[#0a0f1e] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>✔ {item.title}</p>
                      <p className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/organisation" className="no-underline">
                    <button className="inline-flex items-center gap-2 bg-[#0a0f1e] text-white font-bold text-sm rounded-full px-6 py-2.5 border-none cursor-pointer hover:bg-blue-900 transition-all"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Learn About Organisation Programs <ArrowUpRight size={13} />
                    </button>
                  </Link>
                  <Link to="/contact" className="no-underline">
                    <button className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 font-bold text-sm rounded-full px-6 py-2.5 bg-transparent cursor-pointer hover:bg-gray-50 transition-all"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Schedule a Demo
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* ── COMPARE TABLE (individual only) ── */}
            {pricingMode === "individual" && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-[#0a0f1e] font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Compare Plans</h2>
                  <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto" />
                </div>
                <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-6">
                  <table className="w-full min-w-[720px]">
                    <thead>
                      <tr>
                        <th className="text-left py-5 px-6 text-[#0a0f1e] font-bold text-sm bg-[#f8fafc] border-b border-gray-100 w-[30%]"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}>Feature</th>
                        {individualPlans.map((plan) => (
                          <th key={plan.id} className={`py-5 px-5 text-center text-xs font-bold border-b border-gray-100 ${plan.highlight ? "bg-blue-50" : "bg-[#f8fafc]"}`}>
                            {plan.highlight && (
                              <div className="text-[9px] font-bold text-white bg-blue-600 rounded-full px-2 py-0.5 mb-1 inline-block"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}>★ Popular</div>
                            )}
                            <span className={`block text-xs ${plan.highlight ? "text-blue-600" : "text-[#0a0f1e]"}`}
                              style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.name}</span>
                            <span className="block text-[10px] font-bold text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {formatNaira(plan.price)}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {compareRows.map((row, ri) => (
                        <tr key={ri} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-6 text-gray-600 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{row.feature}</td>
                          {[row.free, row.starter, row.professional, row.career].map((val, vi) => (
                            <td key={vi} className={`py-4 px-5 text-center ${vi === 2 ? "bg-blue-50/40" : ""}`}>
                              <div className="flex items-center justify-center">
                                <CellValue value={val} featured={vi === 2} />
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-center text-gray-400 text-xs mb-14" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  All prices in Nigerian Naira (₦). Flexible instalment payment plans available —{" "}
                  <Link to="/contact" className="text-blue-600 font-semibold no-underline hover:underline">contact us</Link> to discuss.
                </p>
              </>
            )}
          </div>
        </section>

        {/* ── ENTERPRISE SECTION ── */}
        <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Enterprise</span>
              </div>
              <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                Training for Teams & Organisations
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Bespoke programs for companies, government agencies, NGOs, and universities — delivered on-site or virtually.
              </p>
            </div>

            <div className="bg-[#0a0f1e] rounded-3xl overflow-hidden">
              <div className="p-8 sm:p-10 lg:p-12">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                    <Building size={22} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-amber-400 text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>Enterprise & Organisation</p>
                    <h3 className="text-white font-bold text-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>Custom Pricing</h3>
                  </div>
                </div>
                <p className="text-white/65 text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Tailored programs for companies, government agencies, NGOs, and universities. On-site or virtual delivery with custom curriculum and group discount pricing.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    "Custom curriculum design", "Flexible schedule & format",
                    "On-site or virtual delivery", "Group discount pricing",
                    "Dedicated account manager", "Progress tracking & reports",
                    "Post-training assessment", "Certificate of completion (all staff)",
                  ].map((f, fi) => (
                    <div key={fi} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <CheckCircle size={14} className="text-amber-400 shrink-0" />
                      <span className="text-white/70 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/register?plan=enterprise&type=org" className="no-underline flex-1">
                    <button className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm rounded-xl py-3.5 transition-all border-none cursor-pointer active:scale-95"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Request Enterprise Quote <ArrowUpRight size={14} />
                    </button>
                  </Link>
                  <Link to="/contact" className="no-underline flex-1">
                    <button className="w-full inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10 font-bold text-sm rounded-xl py-3.5 transition-all bg-transparent cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Schedule a Call
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: Users, label: "Teams & Organisations", desc: "5 to 500+ staff" },
                { icon: MapPin, label: "On-site or Virtual", desc: "Your location or online" },
                { icon: GraduationCap, label: "Customised Curriculum", desc: "Built around your goals" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 text-center border border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-2">
                    <item.icon size={15} className="text-blue-600" />
                  </div>
                  <p className="text-[#0a0f1e] font-bold text-xs mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</p>
                  <p className="text-gray-400 text-[10px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENTERPRISE CTA STRIP ── */}
        <section className="py-14 bg-[#f8fafc] px-4">
          <div className="max-w-[900px] mx-auto">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Enterprise</p>
                <h3 className="text-[#0a0f1e] font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Need a custom plan?</h3>
                <p className="text-gray-400 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  We offer bespoke training programs for government agencies, universities, and large corporations.
                </p>
              </div>
              <Link to="/contact" className="no-underline shrink-0">
                <button className="inline-flex items-center gap-3 bg-[#0a0f1e] hover:bg-blue-900 text-white font-bold text-sm rounded-full pl-6 pr-2 py-3 transition-all active:scale-95 border-none cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Contact Sales
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 shrink-0">
                    <ArrowUpRight size={14} className="text-white" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 sm:py-20 bg-white px-4">
          <div className="max-w-[700px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Pricing FAQs</h2>
              <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto" />
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:border-blue-100 transition-colors">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer bg-transparent border-none">
                    <span className="font-semibold text-[#0a0f1e] text-sm pr-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>{faq.q}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${faqOpen === i ? "bg-blue-600" : "bg-gray-100"}`}>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${faqOpen === i ? "rotate-180 text-white" : "text-gray-500"}`} />
                    </span>
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}>
                        <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Pricing;