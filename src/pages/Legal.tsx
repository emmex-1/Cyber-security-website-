import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Lock, FileText, Mail, ArrowUpRight, ChevronDown, Eye, Database, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";

import heroImage from "/images/byte.jpeg";

/* ─── sections data ──────────────────────────────────────────────────── */
const sections = [
  {
    id: "disclaimer",
    icon: Shield,
    tag: "01",
    color: "#1d4ed8",
    bg: "#eff6ff",
    title: "Educational Program Disclosure",
    content: [
      {
        type: "para",
        text: "BYTITUDE is a cybersecurity upskilling, certification, and talent assessment company. All information provided through courses, workshops, membership content, and written resources is intended for educational and professional development purposes only.",
      },
      {
        type: "highlight",
        text: "This program does not constitute financial advice, investment advice, tax advice, or legal counsel. All cybersecurity techniques taught are strictly for defensive purposes and authorised penetration testing. Participants are responsible for ensuring legal compliance in their respective jurisdictions.",
      },
    ],
  },
  {
    id: "ethical-use",
    icon: Lock,
    tag: "02",
    color: "#1d4ed8",
    bg: "#eef2ff",
    title: "Ethical Use Policy",
    content: [
      {
        type: "para",
        text: "All offensive security techniques, penetration testing methodologies, and ethical hacking tools taught through BYTITUDE programs must only be applied to systems and networks for which you have explicit written authorisation. Unauthorised access to computer systems is illegal under cybercrime laws in Nigeria and internationally.",
      },
      {
        type: "highlight",
        text: "BYTITUDE strongly condemns the use of any skills or knowledge gained through our programs for malicious, illegal, or unethical purposes. Violation of this policy will result in immediate termination of access without refund.",
      },
    ],
  },
  {
    id: "privacy",
    icon: Eye,
    tag: "03",
    color: "#1d4ed8",
    bg: "#f0fdfa",
    title: "Privacy Policy",
    content: [
      {
        type: "para",
        text: "We collect personal information — name, email, phone, and professional background — solely for course registration, platform access, and communication purposes. Your information is never sold to third parties.",
      },
      {
        type: "para",
        text: "We may use email to send course updates, certification announcements, and educational content. You may unsubscribe from communications at any time by clicking the unsubscribe link in any email or by contacting us directly. Lab activity and assessment data may be retained for up to 24 months for quality assurance purposes.",
      },
      {
        type: "highlight",
        text: "All student data is stored securely and encrypted at rest. We comply with applicable data protection regulations and do not share your information with employers or third parties without your explicit consent.",
      },
    ],
  },
  {
    id: "data-security",
    icon: Database,
    tag: "04",
    color: "#1d4ed8",
    bg: "#f5f3ff",
    title: "Data Security Commitment",
    content: [
      {
        type: "para",
        text: "As a cybersecurity company, we hold ourselves to the highest standards of data protection. All lab environments are isolated sandboxes — no real production systems or live infrastructure are exposed to students. Lab credentials are rotated after every session.",
      },
      {
        type: "highlight",
        text: "We conduct regular security audits of our own infrastructure. If you discover a security vulnerability in our platform, please disclose it responsibly to security@bytitude.com before any public disclosure.",
      },
    ],
  },
  {
    id: "certification",
    icon: AlertTriangle,
    tag: "05",
    color: "#1d4ed8",
    bg: "#fffbeb",
    title: "Certification & Results Disclaimer",
    content: [
      {
        type: "para",
        text: "BYTITUDE prepares students for third-party certification exams administered by EC-Council, ISC², CompTIA, AWS, Microsoft, and others. We are not affiliated with these certification bodies unless explicitly stated. Exam fees paid to certification bodies are separate from BYTITUDE training fees.",
      },
      {
        type: "highlight",
        text: "Exam pass rates and student outcomes referenced on our website reflect historical cohort performance and are not guarantees of individual results. Career outcomes depend on individual effort, market conditions, and prior experience.",
      },
    ],
  },
  {
    id: "terms",
    icon: FileText,
    tag: "06",
    color: "#1d4ed8",
    bg: "#f8fafc",
    title: "Terms of Use",
    content: [
      {
        type: "para",
        text: "By using this website and participating in our programs, you acknowledge that all content is educational in nature. Refunds are available within 7 days of purchase for digital courses, provided that less than 20% of course content has been accessed. Training cohort fees are non-refundable after the start date.",
      },
      {
        type: "highlight",
        text: "All content on this website — including course materials, lab scenarios, and documentation — is protected by copyright. Reproduction or distribution without written permission is prohibited. BYTITUDE reserves the right to update these terms at any time.",
      },
    ],
  },
];

/* ─── animation ──────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

/* ═══════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════ */
const Legal = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <Layout>

      {/* ── HERO — rounded format matching site style ── */}
      <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[360px] lg:min-h-[460px]">
          <img
            src={heroImage}
            alt="BYTITUDE Legal"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/80" />
          {/* Subtle diagonal lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.5) 0px,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 60px)" }}
          />
          {/* Blue glow */}
          <div className="absolute top-0 left-1/4 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[360px] lg:min-h-[460px] px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 pt-20 sm:pt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Legal</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white font-bold leading-tight mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(34px, 6vw, 72px)" }}
            >
              Legal &amp; Disclaimer
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="text-white/60 max-w-lg leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}
            >
              Everything you need to know about how BYTITUDE operates — our ethical use policy, privacy commitments, data security practices, and terms of service.
            </motion.p>

            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div
                className="inline-flex items-center gap-1.5 border border-white/30 rounded-full px-4 py-2"
                style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}
              >
                <Link to="/" className="text-white/70 hover:text-white text-xs font-medium transition-colors no-underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>Home</Link>
                <span className="text-white/40 text-xs">/</span>
                <span className="text-white text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Legal</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── QUICK NAV ── */}
      <section className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex overflow-x-auto gap-0" style={{ scrollbarWidth: "none" }}>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="shrink-0 px-4 sm:px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all no-underline whitespace-nowrap"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {s.title.split(" ")[0]}
              </a>
            ))}
            <a
              href="#contact"
              className="shrink-0 px-4 sm:px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all no-underline whitespace-nowrap"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="bg-[#f8fafc] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1000px] mx-auto space-y-4">

          {sections.map((sec, i) => (
            <motion.div
              key={sec.id}
              id={sec.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-md transition-all duration-300"
            >
              {/* Clickable header */}
              <button
                onClick={() => setExpandedSection(expandedSection === sec.id ? null : sec.id)}
                className="w-full text-left cursor-pointer bg-transparent border-none p-0"
              >
                <div className="flex items-center gap-0">
                  {/* Left accent strip */}
                  <div
                    className="flex flex-col items-center justify-center gap-3 px-5 py-6 shrink-0 w-20 sm:w-24 border-r border-gray-100 group-hover:border-gray-200 transition-colors"
                    style={{ background: sec.bg }}
                  >
                    <span
                      className="font-bold leading-none text-2xl sm:text-3xl"
                      style={{ color: `${sec.color}30`, fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {sec.tag}
                    </span>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: sec.color }}
                    >
                      <sec.icon size={16} className="text-white" />
                    </div>
                  </div>

                  {/* Title + chevron */}
                  <div className="flex-1 flex items-center justify-between px-6 py-5">
                    <h2
                      className="text-[#0a0f1e] font-bold text-base sm:text-lg leading-snug"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {sec.title}
                    </h2>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ml-4 ${expandedSection === sec.id ? "" : "bg-gray-100"}`}
                      style={{ background: expandedSection === sec.id ? sec.color : undefined }}
                    >
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-300 ${expandedSection === sec.id ? "rotate-180 text-white" : "text-gray-500"}`}
                      />
                    </span>
                  </div>
                </div>
              </button>

              {/* Expandable content */}
              <AnimatePresence>
                {expandedSection === sec.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 sm:px-8 pb-7 pt-1 border-t border-gray-50 ml-20 sm:ml-24">
                      <div className="space-y-4 pt-5">
                        {sec.content.map((block, j) =>
                          block.type === "highlight" ? (
                            <div
                              key={j}
                              className="flex gap-3 rounded-xl px-4 py-3.5 border"
                              style={{ background: sec.bg, borderColor: `${sec.color}20` }}
                            >
                              <span
                                className="w-1 rounded-full shrink-0 self-stretch"
                                style={{ background: sec.color }}
                              />
                              <p
                                className="text-gray-700 text-sm leading-relaxed"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                {block.text}
                              </p>
                            </div>
                          ) : (
                            <p
                              key={j}
                              className="text-gray-500 text-sm leading-relaxed"
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                              {block.text}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* ── Contact card ── */}
          <motion.div
            id="contact"
            custom={sections.length}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative rounded-2xl overflow-hidden bg-[#0a0f1e]"
          >
            {/* Dot grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{ backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            />
            {/* Blue glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 sm:p-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Mail size={14} className="text-blue-400" />
                  <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.28em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Get In Touch
                  </span>
                </div>
                <h3 className="text-white font-bold text-xl sm:text-2xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Questions about our policies?
                </h3>
                <p className="text-white/50 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Our team is happy to clarify any legal terms, privacy practices, or ethical use questions.
                </p>
              </div>
              <a
                href="mailto:info@bytitude.com"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all text-white font-bold text-sm rounded-full pl-6 pr-2 py-3 no-underline shrink-0"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                info@bytitude.com
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 shrink-0">
                  <ArrowUpRight size={14} className="text-white" />
                </span>
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Footer note ── */}
      <div className="bg-[#f8fafc] pb-10 px-4">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-gray-300 text-xs text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Last updated April 2025 · BYTITUDE · All rights reserved · Sam Ewang Ext., Abeokuta, Ogun State, Nigeria
          </p>
        </div>
      </div>

    </Layout>
  );
};

export default Legal;