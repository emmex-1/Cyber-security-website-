import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, CheckCircle, Users, Building, BarChart2, Shield,
  Globe, BookOpen, Zap, Award, Target, Clock, ChevronDown,
  TrendingUp, Lock, Cpu, Database, Cloud, Monitor, Wifi,
  Star, GraduationCap, MapPin, Settings, FileText, Bell,
} from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.09, duration: 0.45 } }),
};

/* ── Who It's For ── */
const audiences = [
  {
    icon: Building, color: "#2563eb", bg: "#eff6ff",
    title: "Corporate Enterprises",
    desc: "Banks, fintechs, telecoms, manufacturing, and oil & gas companies that need to build an internal cybersecurity-aware workforce.",
    examples: ["Banks & Financial Services", "Telecoms & ISPs", "Oil & Gas", "Manufacturing"],
  },
  {
    icon: Shield, color: "#059669", bg: "#ecfdf5",
    title: "Government & Public Sector",
    desc: "MDAs, security agencies, and parastatal bodies needing structured digital skills and cybersecurity compliance training.",
    examples: ["Ministries & Agencies", "Security & Defence", "Parastatals", "Tax & Revenue Bodies"],
  },
  {
    icon: GraduationCap, color: "#7c3aed", bg: "#f5f3ff",
    title: "Universities & Schools",
    desc: "Tertiary institutions, polytechnics, and secondary schools looking to integrate practical cybersecurity and ICT training.",
    examples: ["Universities", "Polytechnics", "Secondary Schools", "Vocational Institutes"],
  },
  {
    icon: Globe, color: "#d97706", bg: "#fffbeb",
    title: "NGOs & Nonprofits",
    desc: "Development organisations and NGOs that need affordable, high-quality digital literacy and security training for their staff.",
    examples: ["International NGOs", "Development Agencies", "Civil Society Orgs", "Foundations"],
  },
  {
    icon: Target, color: "#dc2626", bg: "#fef2f2",
    title: "SMEs & Startups",
    desc: "Fast-growing businesses and startups that want to build a skilled, security-conscious technical team from the ground up.",
    examples: ["Tech Startups", "SaaS Companies", "E-commerce", "Digital Agencies"],
  },
  {
    icon: Users, color: "#0891b2", bg: "#ecfeff",
    title: "Professional Associations",
    desc: "Trade bodies, professional guilds, and industry associations that want to offer CPD training to their members.",
    examples: ["Tech Associations", "Legal & Compliance Bodies", "HR Associations", "Industry Guilds"],
  },
];

/* ── Business Impact ── */
const impacts = [
  {
    icon: Shield, color: "#2563eb",
    stat: "73%",
    title: "Reduction in Security Incidents",
    desc: "Organisations that invest in regular security awareness training see significantly fewer successful phishing and social engineering attacks.",
  },
  {
    icon: TrendingUp, color: "#059669",
    stat: "4×",
    title: "ROI on Training Investment",
    desc: "Companies report up to 4x return on training investment through reduced breach costs, fewer downtime events, and improved productivity.",
  },
  {
    icon: Award, color: "#7c3aed",
    stat: "91%",
    title: "Staff Certification Rate",
    desc: "Over 91% of staff who complete our structured cohort programs pass their target certification exam on the first attempt.",
  },
  {
    icon: Clock, color: "#d97706",
    stat: "6 Weeks",
    title: "Average Deployment Time",
    desc: "From onboarding to first live session, our enterprise programs are typically deployed and running within 6 weeks of contract signing.",
  },
];

/* ── How It Works ── */
const steps = [
  {
    num: "01",
    title: "Discovery & Needs Assessment",
    desc: "We meet with your HR, IT, and leadership teams to understand your goals, skill gaps, compliance requirements, and preferred delivery format.",
    icon: Target,
  },
  {
    num: "02",
    title: "Curriculum Design",
    desc: "Our instructional designers build a customised training roadmap aligned to your industry, team roles, and target certifications.",
    icon: BookOpen,
  },
  {
    num: "03",
    title: "Cohort Setup & Onboarding",
    desc: "We onboard your staff to the platform, set up your admin dashboard, assign learning paths, and brief your dedicated program manager.",
    icon: Users,
  },
  {
    num: "04",
    title: "Live Training Delivery",
    desc: "Cohort-based live sessions run on your preferred schedule — on-site, virtual, or blended. All sessions are recorded for replay.",
    icon: Monitor,
  },
  {
    num: "05",
    title: "Assessment & Certification",
    desc: "Staff complete hands-on labs, mock exams, and a final assessment. Certificates of completion are issued to all who pass.",
    icon: Award,
  },
  {
    num: "06",
    title: "Post-Training Support & Reporting",
    desc: "You receive detailed progress reports, an executive briefing, and optional 30-day post-training support for your team.",
    icon: BarChart2,
  },
];

/* ── Platform Capabilities ── */
const capabilities = [
  {
    icon: BarChart2, color: "#2563eb", bg: "#eff6ff",
    title: "Admin Dashboard & Analytics",
    desc: "Real-time visibility into every learner's progress — completion rates, quiz scores, lab time, and certification readiness — all in one place.",
    features: ["Live progress tracking", "Exportable reports", "Attendance management", "Completion certificates"],
  },
  {
    icon: Lock, color: "#7c3aed", bg: "#f5f3ff",
    title: "Role-Based Learning Paths",
    desc: "Assign different training tracks to different staff roles. SOC analysts get one path; executives get a security awareness track; developers get a secure coding path.",
    features: ["Role-based assignment", "Custom learning paths", "Dept-level reporting", "Multi-admin support"],
  },
  {
    icon: Cpu, color: "#059669", bg: "#ecfdf5",
    title: "Hands-On Lab Environment",
    desc: "Cloud-hosted, browser-accessible labs that simulate real-world attack and defence scenarios — no installation required.",
    features: ["Cloud-based labs", "Real attack simulations", "Guided lab sheets", "Lab progress grading"],
  },
  {
    icon: Settings, color: "#d97706", bg: "#fffbeb",
    title: "LMS & API Integration",
    desc: "Connect BYTITUDE to your existing HR or LMS systems (SAP, Workday, Moodle, Canvas) via standard APIs and SSO authentication.",
    features: ["REST API access", "SSO / SAML support", "LMS connectors", "Webhook events"],
  },
  {
    icon: FileText, color: "#dc2626", bg: "#fef2f2",
    title: "Compliance & Audit Support",
    desc: "Generate audit-ready training records and compliance reports for ISO 27001, NDPR, PCIDSS, SOC 2, and other frameworks.",
    features: ["ISO 27001 mapping", "NDPR compliance", "Audit trail logs", "Policy acknowledgement"],
  },
  {
    icon: Bell, color: "#0891b2", bg: "#ecfeff",
    title: "White-Label & Custom Branding",
    desc: "Enterprise clients can brand the platform with their logo, colour scheme, and custom domain for a fully integrated experience.",
    features: ["Custom logo & colours", "Custom domain", "Branded certificates", "Email white-labelling"],
  },
];

/* ── Pricing tiers ── */
const orgTiers = [
  {
    id: "seat",
    name: "Corporate Training",
    price: "₦85,000",
    priceNote: "per user / month",
    tag: null,
    highlight: false,
    icon: Users,
    iconColor: "#2563eb",
    desc: "Seat-based access for individual employees. Scale up or down as your team grows.",
    features: ["All core training tracks", "Live instructor-led sessions", "Admin dashboard", "Team reporting", "Min. 5 seats"],
  },
  {
    id: "program",
    name: "Advanced Team Upskilling",
    price: "₦1,200,000",
    priceNote: "per program",
    tag: "Best Value",
    highlight: true,
    icon: BookOpen,
    iconColor: "#2563eb",
    desc: "One-time fee for a complete training program delivered to up to 25 staff.",
    features: ["Custom curriculum", "Dedicated program manager", "Full lab access", "Post-training assessment", "All staff certificates"],
  },
  {
    id: "enterprise",
    name: "Custom Programs",
    price: "Custom",
    priceNote: "quote",
    tag: null,
    highlight: false,
    icon: Globe,
    iconColor: "#d97706",
    desc: "Enterprise licensing for org-wide access with custom learning paths and full reporting.",
    features: ["Unlimited staff", "Custom learning paths", "White-label option", "LMS integration", "Dedicated account manager", "SLA support"],
  },
];

const faqs = [
  { q: "What's the minimum team size for an organisation program?", a: "For seat-based plans, the minimum is 5 users. For program-based training, we typically work with groups of 10 to 200 staff per cohort. For enterprise licensing, there is no minimum." },
  { q: "Can training be delivered on-site at our office?", a: "Yes. We offer on-site delivery for organisations in Lagos and other major Nigerian cities. Virtual delivery is available nationwide and internationally." },
  { q: "How long does it take to set up an enterprise program?", a: "From contract signing to first live session, our average enterprise deployment time is 4–6 weeks, depending on curriculum customisation scope." },
  { q: "Do staff receive certificates?", a: "Yes. All staff who complete the program and pass the final assessment receive a BYTITUDE certificate of completion. For certification-track programs, we also prep staff for vendor-issued certs (CompTIA, EC-Council, etc.)." },
  { q: "Is there a demo or pilot option?", a: "Yes. We offer a pilot cohort (typically 5–10 staff, 2 weeks) so your organisation can evaluate the training quality before committing to a full program." },
];

const Organisation = () => {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <Layout>
      <div className="w-full overflow-x-hidden">

        {/* ── HERO ── */}
        <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-[520px]"
            style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1a3a 50%, #0a1628 100%)" }}>
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
            {/* Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #3b82f6, transparent)", transform: "translate(30%, -30%)" }} />

            <div className="relative z-10 flex flex-col justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[520px] px-6 sm:px-10 lg:px-16 py-16">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>For Organisations</span>
                </div>
                <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                  Build a Cyber-Ready<br />
                  <span className="text-blue-400">Organisation.</span>
                </h1>
                <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Scalable, customised cybersecurity and tech training programs for enterprises, government agencies, universities, and NGOs. From 5 to 5,000 staff.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/register?plan=enterprise&type=org" className="no-underline">
                    <button className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-full px-7 py-3.5 transition-all border-none cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Request a Proposal
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/25 shrink-0">
                        <ArrowUpRight size={13} />
                      </span>
                    </button>
                  </Link>
                  <Link to="/contact" className="no-underline">
                    <button className="inline-flex items-center gap-2 border border-white/30 text-white/80 hover:bg-white/10 rounded-full font-bold text-sm px-7 py-3.5 transition-all bg-transparent cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Schedule a Demo
                    </button>
                  </Link>
                </div>
              </motion.div>

              {/* Stats strip */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { val: "500+", label: "Staff Trained" },
                  { val: "30+", label: "Organisations Served" },
                  { val: "91%", label: "Certification Pass Rate" },
                  { val: "6 Wks", label: "Avg. Deployment Time" },
                ].map((s, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <p className="text-white font-bold text-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.val}</p>
                    <p className="text-white/50 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── WHO IT'S FOR ── */}
        <section className="py-16 sm:py-24 bg-[#f8fafc]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Who It's For</span>
              </div>
              <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                Built for Every Type of Organisation
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Whether you're a large enterprise or a small NGO, we have a program that fits your size, budget, and goals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {audiences.map((a, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: a.bg }}>
                    <a.icon size={20} style={{ color: a.color }} />
                  </div>
                  <h3 className="text-[#0a0f1e] font-bold text-base mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {a.examples.map((ex, ei) => (
                      <span key={ei} className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                        style={{ color: a.color, background: a.bg, borderColor: `${a.color}20`, fontFamily: "'DM Sans', sans-serif" }}>{ex}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BUSINESS IMPACT ── */}
        <section className="py-16 sm:py-24 bg-[#0a0f1e]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Business Impact</span>
              </div>
              <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                Real Results for Real Organisations
              </h2>
              <p className="text-white/50 text-sm sm:text-base max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Training your team isn't a cost — it's an investment with measurable returns.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {impacts.map((item, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="rounded-2xl p-7 border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}>
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <p className="text-white font-bold text-4xl mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.stat}</p>
                  <p className="text-blue-400 font-bold text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>How It Works</span>
              </div>
              <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                From Enquiry to Graduation
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A structured, end-to-end process that takes your team from signup to certified — with minimal admin on your side.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {steps.map((step, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div>
                      <span className="text-blue-600 font-bold text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.num}</span>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mt-1">
                        <step.icon size={18} className="text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[#0a0f1e] font-bold text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.desc}</p>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-5 h-px bg-blue-200" />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link to="/register?plan=enterprise&type=org" className="no-underline">
                <button className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-full px-7 py-3.5 transition-all border-none cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Start the Process <ArrowUpRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── PLATFORM CAPABILITIES ── */}
        <section className="py-16 sm:py-24 bg-[#f8fafc]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Platform Capabilities</span>
              </div>
              <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                Everything You Need to Manage Training at Scale
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A purpose-built platform with the tools your HR, IT, and L&D teams need to run training efficiently.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {capabilities.map((cap, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: cap.bg }}>
                    <cap.icon size={20} style={{ color: cap.color }} />
                  </div>
                  <h3 className="text-[#0a0f1e] font-bold text-base mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{cap.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>{cap.desc}</p>
                  <div className="space-y-1.5">
                    {cap.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2">
                        <CheckCircle size={11} style={{ color: cap.color }} className="shrink-0" />
                        <span className="text-gray-600 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING TIERS ── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1000px]">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pricing</span>
              </div>
              <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Organisation Pricing</h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Three flexible models. Pick the one that fits your team size and goals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {orgTiers.map((tier, i) => (
                <motion.div key={tier.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className={`relative rounded-2xl overflow-hidden border flex flex-col ${tier.highlight ? "border-blue-500 shadow-lg shadow-blue-100" : "border-gray-200 bg-white hover:border-blue-100 hover:shadow-md"} transition-all`}>
                  {tier.tag && (
                    <div className="absolute top-0 left-0 right-0 flex justify-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white px-4 py-1 rounded-b-lg"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>{tier.tag}</span>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1" style={{ paddingTop: tier.tag ? "2.5rem" : "1.5rem", background: "white" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${tier.iconColor}15` }}>
                      <tier.icon size={17} style={{ color: tier.iconColor }} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{tier.name}</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-[#0a0f1e] font-bold text-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>{tier.price}</span>
                      <span className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{tier.priceNote}</span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{tier.desc}</p>
                    <div className="space-y-2 flex-1 mb-5">
                      {tier.features.map((f, fi) => (
                        <div key={fi} className="flex items-start gap-2">
                          <CheckCircle size={12} className="text-blue-600 shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={`/register?plan=${tier.id}&type=org`} className="no-underline mt-auto">
                      <button
                        className="w-full inline-flex items-center justify-center gap-2 font-bold text-sm rounded-xl py-3 transition-all border-none cursor-pointer active:scale-95"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          background: tier.highlight ? "#1d4ed8" : "#f3f4f6",
                          color: tier.highlight ? "white" : "#0a0f1e",
                        }}
                      >
                        Get Started <ArrowUpRight size={13} />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-gray-400 text-xs mt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              All prices in Nigerian Naira (₦). Volume discounts available for large teams —{" "}
              <Link to="/contact" className="text-blue-600 font-semibold no-underline hover:underline">contact us</Link> to discuss.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 sm:py-20 bg-[#f8fafc] px-4">
          <div className="max-w-[700px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Organisation FAQs</h2>
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

        {/* ── BOTTOM CTA ── */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-white font-bold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
              Ready to Train Your Organisation?
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto mb-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Talk to our enterprise team. We'll design a training program that fits your goals, team size, and budget.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/register?plan=enterprise&type=org" className="no-underline w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-blue-700 hover:bg-blue-200 font-bold text-sm rounded-full px-8 py-3.5 transition-all border-none cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Request a Proposal <ArrowUpRight size={15} />
                </button>
              </Link>
              <Link to="/contact" className="no-underline w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 rounded-full font-bold text-sm px-8 py-3.5 transition-all bg-transparent cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Schedule a Call
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Organisation;