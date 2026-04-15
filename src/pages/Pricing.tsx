import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CheckCircle, X, ArrowUpRight, Shield, Lock, Database, Cloud, Cpu,
  Users, BookOpen, Award, Zap, HelpCircle, ChevronDown, Building,
  MapPin, GraduationCap,
} from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "/images/byte.jpeg";

/* ─── data ───────────────────────────────────────────────────────────────── */

/* ── Subscription plans (existing) ── */
const plans = [
  {
    id: "free",
    name: "Free",
    tagline: "Best for individuals who want the basics.",
    price: { monthly: 0, annual: 0 },
    cta: "Get Started Free",
    ctaLink: "/register",
    featured: false,
    badge: null,
    features: [
      "Access to free course previews",
      "Community forum access",
      "3 practice lab sessions / month",
      "Basic cybersecurity learning paths",
      "500+ free learning resources",
      "Limited web-based lab environment",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Best for individuals who want to hit their goals faster.",
    price: { monthly: 49, annual: 39 },
    cta: "Get Started",
    ctaLink: "/register?plan=premium",
    featured: true,
    badge: "Most Popular",
    features: [
      "Full access to all courses",
      "Unlimited lab sessions",
      "Live instructor-led sessions",
      "Certification exam prep materials",
      "1-on-1 mentorship (2 sessions/month)",
      "Job placement assistance",
      "Private community & accountability groups",
      "Downloadable study guides & cheatsheets",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "Best for teams that want to close skills gaps effectively.",
    price: { monthly: 199, annual: 159 },
    cta: "Train Your Team",
    ctaLink: "/contact?plan=business",
    featured: false,
    badge: null,
    features: [
      "Everything in Premium",
      "Up to 25 team seats",
      "Custom learning & career paths",
      "Immersive training simulations",
      "Advanced business reporting & analytics",
      "Create labs with custom scenarios",
      "Dedicated customer success manager",
      "On-site or virtual corporate training",
    ],
  },
];

const compareRows = [
  { feature: "Free course previews",          free: "✓",           premium: "✓",          business: "✓" },
  { feature: "Full course library access",    free: "✗",           premium: "✓",          business: "✓" },
  { feature: "Lab sessions per month",        free: "3 sessions",  premium: "Unlimited",  business: "Unlimited" },
  { feature: "Live instructor sessions",      free: "✗",           premium: "✓",          business: "✓" },
  { feature: "Certification prep materials",  free: "Basic",       premium: "Full",       business: "Full" },
  { feature: "1-on-1 mentorship",             free: "✗",           premium: "2/month",    business: "Unlimited" },
  { feature: "Job placement support",         free: "✗",           premium: "✓",          business: "✓" },
  { feature: "Team management dashboard",     free: "✗",           premium: "✗",          business: "✓" },
  { feature: "Custom learning paths",         free: "✗",           premium: "✗",          business: "✓" },
  { feature: "Business reporting",            free: "✗",           premium: "✗",          business: "✓" },
  { feature: "Dedicated CSM",                 free: "✗",           premium: "✗",          business: "✓" },
  { feature: "On-site training",              free: "✗",           premium: "✗",          business: "✓" },
];

/* ── Training / Cohort plans (in Naira) ── */
const trainingPlans = [
  {
    id: "crash",
    name: "1-Month Crash Course",
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
    notIncluded: ["1-on-1 mentorship", "Job placement support"],
    cta: "Enrol in Crash Course",
  },
  {
    id: "standard",
    name: "2-Month Course",
    price: 180000,
    highlight: false,
    tag: null,
    description: "The most popular choice. Balanced pace with deeper coverage and instructor support.",
    features: [
      "8 weeks of structured training",
      "1–2 certification tracks",
      "Live sessions (4× per week)",
      "Full lab access (24/7)",
      "Study materials & recordings",
      "Exam prep mock tests",
      "Email support from instructors",
    ],
    notIncluded: ["Job placement support"],
    cta: "Enrol — 2 Month",
  },
  {
    id: "full",
    name: "3-Month Full Course",
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
      "CV review & LinkedIn optimisation",
      "Mock interview preparation",
    ],
    notIncluded: [],
    cta: "Enrol — 3 Month",
  },
  {
    id: "advanced",
    name: "4-Month Advanced",
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
      "CV review & LinkedIn optimisation",
      "Mock interview preparation",
      "Job placement network access",
    ],
    notIncluded: [],
    cta: "Enrol — 4 Month",
  },
];

const trainingCompareRows = [
  { feature: "Training duration",       crash: "4 weeks",   standard: "8 weeks",    full: "12 weeks",  advanced: "16 weeks"  },
  { feature: "Certification tracks",    crash: "1 track",   standard: "1–2 tracks", full: "Multiple",  advanced: "Advanced"  },
  { feature: "Live sessions / week",    crash: "3×",        standard: "4×",         full: "5×",        advanced: "5×"        },
  { feature: "Lab access",              crash: "Limited",   standard: "24/7",       full: "24/7",      advanced: "24/7"      },
  { feature: "Study materials",         crash: "✓",         standard: "✓",          full: "✓",         advanced: "✓"         },
  { feature: "Mock exams",              crash: "✓",         standard: "✓",          full: "✓",         advanced: "✓"         },
  { feature: "Email instructor support",crash: "✗",         standard: "✓",          full: "✓",         advanced: "✓"         },
  { feature: "1-on-1 mentorship",       crash: "✗",         standard: "✗",          full: "Weekly",    advanced: "Weekly"    },
  { feature: "CV & LinkedIn review",    crash: "✗",         standard: "✗",          full: "✓",         advanced: "✓"         },
  { feature: "Mock interview prep",     crash: "✗",         standard: "✗",          full: "✓",         advanced: "✓"         },
  { feature: "Job placement network",   crash: "✗",         standard: "✗",          full: "✗",         advanced: "✓"         },
];

const faqs = [
  { q: "Can I switch plans at any time?",        a: "Yes. You can upgrade, downgrade, or cancel at any time. Changes take effect at the next billing cycle." },
  { q: "Is there a free trial for Premium?",     a: "We offer a 7-day free trial on the Premium plan. No credit card required to get started." },
  { q: "What certifications do you prepare for?", a: "CEH, CISSP, CompTIA Security+, CompTIA Network+, CompTIA A+, AWS Security, Azure AZ-500, and more." },
  { q: "Do you offer group/corporate discounts?", a: "Yes. Business plans support up to 25 seats and custom enterprise pricing is available for larger teams." },
  { q: "What payment methods do you accept?",    a: "We accept Visa, Mastercard, PayPal, and bank transfer. All payments are processed securely." },
  { q: "Are training plan prices in Naira?",     a: "Yes. All cohort / training program fees are displayed in Nigerian Naira (₦). Subscription plans are in USD." },
];

const formatNaira = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

const CellValue = ({ value, featured }: { value: string; featured: boolean }) => {
  if (value === "✓") return <CheckCircle size={16} className={featured ? "text-blue-500" : "text-green-500"} />;
  if (value === "✗") return <X size={16} className="text-gray-300" />;
  return <span className="text-xs font-semibold text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>{value}</span>;
};

/* ─── Pricing page ───────────────────────────────────────────────────────── */
const Pricing = () => {
  const [annual, setAnnual] = useState(true);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"subscription" | "training" | "enterprise">("subscription");

  return (
    <Layout>
      <div className="w-full overflow-x-hidden">

        {/* ── PAGE HEADER ── */}
        <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[440px]">
            <img src={heroImage} alt="Pricing" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/80" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.5) 0px,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 60px)" }} />
            <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[340px] lg:min-h-[440px] px-6 sm:px-10 lg:px-16 text-center pb-8 sm:pb-12 pt-20 sm:pt-28">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pricing</span>
                </div>
                <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl mb-4" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                  Simple, Transparent Pricing
                </h1>
                <p className="text-white/55 text-base sm:text-lg max-w-lg mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Choose the plan that fits your goals. No hidden fees, cancel anytime.
                </p>
              </motion.div>

              {/* Billing toggle (subscription) */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
                className="flex justify-center mt-8">
                <div className="inline-flex items-center gap-3 bg-white/10 rounded-full p-1">
                  <button onClick={() => setAnnual(false)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer border-none ${!annual ? "bg-white text-[#0a0f1e]" : "text-white/60 hover:text-white bg-transparent"}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Monthly
                  </button>
                  <button onClick={() => setAnnual(true)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer border-none flex items-center gap-2 ${annual ? "bg-white text-[#0a0f1e]" : "text-white/60 hover:text-white bg-transparent"}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Annual
                    <span className="text-[10px] font-bold bg-green-500 text-white px-2 py-0.5 rounded-full">Save 20%</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PLAN TYPE TABS ── */}
        <section className="bg-[#f8fafc] pt-10 pb-0 px-4">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {[
                { key: "subscription", label: "Subscription Plans" },
                { key: "training",     label: "Training / Cohort Plans (₦)" },
                { key: "enterprise",   label: "Enterprise" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as typeof activeTab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border-none cursor-pointer ${
                    activeTab === key
                      ? "bg-[#0a0f1e] text-white shadow-md"
                      : "bg-white text-gray-500 border border-gray-200 hover:border-blue-200"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLAN CARDS ── */}
        <AnimatePresence mode="wait">
          {activeTab === "subscription" && (
            <motion.section key="subscription" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
              className="bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-[1100px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                  {plans.map((plan, i) => (
                    <motion.div key={plan.id}
                      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, duration: 0.45 }}
                      className={`relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 ${
                        plan.featured ? "border-blue-500 shadow-xl shadow-blue-100" : "border-gray-200 bg-white hover:shadow-md"
                      }`}
                      style={{ background: "white" }}>
                      {plan.badge && (
                        <div className="bg-blue-600 text-white text-xs font-bold text-center py-2 tracking-widest uppercase"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          ★ {plan.badge}
                        </div>
                      )}
                      <div className="flex flex-col flex-1 p-7">
                        <h2 className="text-[#0a0f1e] font-bold text-2xl mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.name}</h2>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.tagline}</p>
                        <div className="mb-6">
                          {plan.price.monthly === 0 ? (
                            <div className="flex items-end gap-1">
                              <span className="text-5xl font-bold text-[#0a0f1e]" style={{ fontFamily: "'DM Sans', sans-serif" }}>$0</span>
                              <span className="text-gray-400 text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Always free</span>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-end gap-2">
                                {annual && (
                                  <span className="text-gray-300 line-through text-lg font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                    ${plan.price.monthly}
                                  </span>
                                )}
                                <span className="text-5xl font-bold text-[#0a0f1e]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                  ${annual ? plan.price.annual : plan.price.monthly}
                                </span>
                                <span className="text-gray-400 text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>/ month</span>
                              </div>
                              {annual && (
                                <p className="text-gray-400 text-xs mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                  Billed annually, or ${plan.price.monthly}/mo monthly
                                </p>
                              )}
                            </>
                          )}
                        </div>
                        <Link to={plan.ctaLink} className="no-underline mb-6">
                          <button className="w-full py-3 rounded-xl text-sm font-bold transition-all active:scale-95 border-none cursor-pointer"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              background: plan.featured ? "#2563eb" : "transparent",
                              color: plan.featured ? "white" : "#0a0f1e",
                              border: plan.featured ? "none" : "2px solid #e5e7eb",
                              boxShadow: plan.featured ? "0 4px 14px rgba(37,99,235,0.3)" : "none",
                            }}>
                            {plan.cta}
                          </button>
                        </Link>
                        <div className="border-t border-gray-100 mb-5" />
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {plan.id === "free" ? "Free features" : plan.id === "premium" ? "All Free features plus" : "All Premium features plus"}
                        </p>
                        <ul className="space-y-3 flex-1">
                          {plan.features.map((feat, fi) => (
                            <li key={fi} className="flex items-start gap-2.5">
                              <CheckCircle size={15} className={plan.featured ? "text-blue-500 shrink-0 mt-0.5" : "text-green-500 shrink-0 mt-0.5"} />
                              <span className="text-gray-600 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* ── SUBSCRIPTION COMPARE TABLE ── */}
                <div className="mt-14">
                  <div className="text-center mb-8">
                    <h2 className="text-[#0a0f1e] font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                      Compare Subscription Plans
                    </h2>
                    <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto" />
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
                    <table className="w-full min-w-[640px]">
                      <thead>
                        <tr>
                          <th className="text-left py-5 px-6 text-[#0a0f1e] font-bold text-sm bg-[#f8fafc] border-b border-gray-100 w-2/5"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}>Feature</th>
                          {plans.map((plan) => (
                            <th key={plan.id} className={`py-5 px-6 text-center text-sm font-bold border-b border-gray-100 ${plan.featured ? "bg-blue-50" : "bg-[#f8fafc]"}`}>
                              {plan.featured && (
                                <div className="text-[10px] font-bold text-white bg-blue-600 rounded-full px-2 py-0.5 mb-1 inline-block"
                                  style={{ fontFamily: "'DM Sans', sans-serif" }}>★ Save 20%</div>
                              )}
                              <span className={`block ${plan.featured ? "text-blue-600" : "text-[#0a0f1e]"}`}
                                style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.name}</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {compareRows.map((row, ri) => (
                          <tr key={ri} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-6 text-gray-600 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{row.feature}</td>
                            {[row.free, row.premium, row.business].map((val, vi) => (
                              <td key={vi} className={`py-4 px-6 text-center ${vi === 1 ? "bg-blue-50/40" : ""}`}>
                                <div className="flex items-center justify-center">
                                  <CellValue value={val} featured={vi === 1} />
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === "training" && (
            <motion.section key="training" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
              className="bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-[1200px] mx-auto">

                <div className="text-center mb-8">
                  <p className="text-gray-500 text-sm max-w-xl mx-auto mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    All training / cohort program fees are one-time payments displayed in <strong>Nigerian Naira (₦)</strong>. 
                    Flexible instalment options available — <Link to="/contact" className="text-blue-600 font-semibold no-underline hover:underline">contact us</Link>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
                  {trainingPlans.map((plan, i) => (
                    <motion.div key={plan.id} custom={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }}
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
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.name}</p>
                        <div className="flex items-baseline gap-1 mb-3">
                          <span className="text-[#0a0f1e] font-bold text-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>{formatNaira(plan.price)}</span>
                          <span className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>one-time</span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.description}</p>
                        <div className="space-y-2 flex-1 mb-5">
                          {plan.features.map((f, fi) => (
                            <div key={fi} className="flex items-start gap-2">
                              <CheckCircle size={12} className="text-blue-600 shrink-0 mt-0.5" />
                              <span className="text-gray-600 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                            </div>
                          ))}
                          {plan.notIncluded.map((f, fi) => (
                            <div key={fi} className="flex items-start gap-2 opacity-40">
                              <div className="w-3 h-3 shrink-0 mt-0.5 flex items-center justify-center">
                                <div className="w-2.5 h-px bg-gray-400 rounded" />
                              </div>
                              <span className="text-gray-400 text-xs line-through" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                            </div>
                          ))}
                        </div>
                        <Link to="/register" className="no-underline mt-auto">
                          <button
                            className="w-full inline-flex items-center justify-center gap-2 font-bold text-sm rounded-xl py-3 transition-all border-none cursor-pointer"
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
                </div>

                {/* ── TRAINING COMPARE TABLE ── */}
                <div className="text-center mb-8">
                  <h2 className="text-[#0a0f1e] font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                    Compare Training Plans
                  </h2>
                  <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto" />
                </div>
                <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
                  <table className="w-full min-w-[720px]">
                    <thead>
                      <tr>
                        <th className="text-left py-5 px-6 text-[#0a0f1e] font-bold text-sm bg-[#f8fafc] border-b border-gray-100 w-[30%]"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}>Feature</th>
                        {trainingPlans.map((plan) => (
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
                      {trainingCompareRows.map((row, ri) => (
                        <tr key={ri} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-6 text-gray-600 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{row.feature}</td>
                          {[row.crash, row.standard, row.full, row.advanced].map((val, vi) => (
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

                <p className="text-center text-gray-400 text-xs mt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  All prices in Nigerian Naira (₦). Flexible instalment payment plans available —{" "}
                  <Link to="/contact" className="text-blue-600 font-semibold no-underline hover:underline">contact us</Link> to discuss.
                </p>
              </div>
            </motion.section>
          )}

          {activeTab === "enterprise" && (
            <motion.section key="enterprise" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
              className="bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-[900px] mx-auto">
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
                        "Custom curriculum design",
                        "Flexible schedule & format",
                        "On-site or virtual delivery",
                        "Group discount pricing",
                        "Dedicated account manager",
                        "Progress tracking & reports",
                        "Post-training assessment",
                        "Certificate of completion (all staff)",
                      ].map((f, fi) => (
                        <div key={fi} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                          <CheckCircle size={14} className="text-amber-400 shrink-0" />
                          <span className="text-white/70 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to="/register" className="no-underline flex-1">
                        <button className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm rounded-xl py-3.5 transition-all border-none cursor-pointer"
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
                    { icon: Users,        label: "Teams & Organisations", desc: "5 to 500+ staff" },
                    { icon: MapPin,       label: "On-site or Virtual",    desc: "Your location or online" },
                    { icon: GraduationCap,label: "Customised Curriculum", desc: "Built around your goals" },
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
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── ENTERPRISE CTA STRIP (always visible) ── */}
        <section className="py-14 bg-white px-4">
          <div className="max-w-[900px] mx-auto">
            <div className="rounded-2xl border border-gray-200 bg-[#f8fafc] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Enterprise</p>
                <h3 className="text-[#0a0f1e] font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Need a custom plan?
                </h3>
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
        <section className="py-16 sm:py-20 bg-[#f8fafc] px-4">
          <div className="max-w-[700px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                Pricing FAQs
              </h2>
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