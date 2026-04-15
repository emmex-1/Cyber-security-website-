import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Shield, Lock, FileText, Mail, ArrowUpRight } from "lucide-react";

/* ─── sections data ──────────────────────────────────────────────────── */
const sections = [
  {
    id: "disclaimer",
    icon: Shield,
    tag: "01",
    title: "Educational Program Disclosure",
    content: [
      {
        type: "para",
        text: "Own Your Home is an educational program focused on behavioral finance, financial literacy, and homeownership preparation. All information provided through workshops, membership content, podcasts, and written resources is intended for educational purposes only.",
      },
      {
        type: "highlight",
        text: "This program does not constitute financial advice, investment advice, tax advice, or legal counsel. Participants should consult with qualified financial professionals before making any financial decisions.",
      },
    ],
  },
  {
    id: "independence",
    icon: FileText,
    tag: "02",
    title: "Independence from Nebraska Realty",
    content: [
      {
        type: "para",
        text: "Tim Collins is a licensed real estate agent affiliated with Nebraska Realty. However, Own Your Home and TC Lifestyle Fit LLC are independent entities that operate separately from Nebraska Realty.",
      },
      {
        type: "highlight",
        text: "These programs are not affiliated with, endorsed by, or sponsored by Nebraska Realty in any way.",
      },
    ],
  },
  {
    id: "privacy",
    icon: Lock,
    tag: "03",
    title: "Privacy Policy",
    content: [
      {
        type: "para",
        text: "We collect personal information — name, email, phone — solely for program registration and communication purposes. Your information is never sold to third parties.",
      },
      {
        type: "para",
        text: "We may use email to send program updates, workshop announcements, and educational content. You may unsubscribe from communications at any time by clicking the unsubscribe link in any email or by contacting us directly.",
      },
    ],
  },
  {
    id: "terms",
    icon: FileText,
    tag: "04",
    title: "Terms of Use",
    content: [
      {
        type: "para",
        text: "By using this website and participating in our programs, you acknowledge that all content is educational in nature. Results may vary based on individual effort, financial circumstances, and market conditions. Past results of other participants do not guarantee your success.",
      },
      {
        type: "highlight",
        text: "All content on this website is protected by copyright. Reproduction or distribution without written permission is prohibited.",
      },
    ],
  },
];

/* ─── animation ──────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

/* ═══════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════ */
const Legal = () => (
  <Layout>

    {/* ══════════════════════════════════════════════════════════════
        HERO — minimal dark strip with large label
    ══════════════════════════════════════════════════════════════ */}
    <section className="bg-[#0B1C3A] pt-32 pb-16 px-5 sm:px-10 relative overflow-hidden">
      {/* subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.32em] mb-5"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          · Legal
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.6 }}
          className="text-white font-bold leading-[1.05] mb-6"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(42px, 7vw, 88px)" }}
        >
          Legal &amp;<br />
          <span className="text-orange-400">Disclaimer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
          className="text-white/45 text-sm sm:text-base max-w-md leading-relaxed"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          Everything you need to know about how Own Your Home operates, what we are, and what we are not.
        </motion.p>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════════════════
        QUICK-NAV — jump links for each section
    ══════════════════════════════════════════════════════════════ */}
    <section className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-5 sm:px-10">
        <div className="flex overflow-x-auto gap-0 scrollbar-hide">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 px-5 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-orange-500 border-b-2 border-transparent hover:border-orange-500 transition-all no-underline whitespace-nowrap"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {s.title.split(" ")[0]}
            </a>
          ))}
          <a
            href="#contact"
            className="shrink-0 px-5 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-orange-500 border-b-2 border-transparent hover:border-orange-500 transition-all no-underline whitespace-nowrap"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Contact
          </a>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════════════════
        CONTENT — numbered section cards
    ══════════════════════════════════════════════════════════════ */}
    <section className="bg-[#F8F7F5] py-16 sm:py-24 px-5 sm:px-10">
      <div className="max-w-5xl mx-auto space-y-5">
        {sections.map((sec, i) => (
          <motion.div
            key={sec.id}
            id={sec.id}
            custom={i}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-orange-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row">

              {/* Left accent strip — tag + icon */}
              <div className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-start gap-4 sm:gap-6 bg-[#F8F7F5] group-hover:bg-orange-50 transition-colors duration-300 px-6 py-5 sm:py-8 sm:w-28 shrink-0 border-b sm:border-b-0 sm:border-r border-gray-100 group-hover:border-orange-100">
                <span
                  className="text-gray-200 group-hover:text-orange-200 font-bold leading-none transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36 }}
                >
                  {sec.tag}
                </span>
                <div className="w-9 h-9 rounded-xl bg-white group-hover:bg-orange-500 border border-gray-100 group-hover:border-orange-500 flex items-center justify-center transition-all duration-300">
                  <sec.icon size={17} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>

              {/* Right — content */}
              <div className="flex-1 p-6 sm:p-8">
                <h2
                  className="text-[#0B1C3A] font-bold text-xl sm:text-2xl mb-5 leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {sec.title}
                </h2>

                <div className="space-y-4">
                  {sec.content.map((block, j) =>
                    block.type === "highlight" ? (
                      <div
                        key={j}
                        className="flex gap-3 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3.5"
                      >
                        <span className="w-1 rounded-full bg-orange-400 shrink-0 self-stretch" />
                        <p
                          className="text-gray-700 text-sm leading-relaxed"
                          style={{ fontFamily: "'Lato', sans-serif" }}
                        >
                          {block.text}
                        </p>
                      </div>
                    ) : (
                      <p
                        key={j}
                        className="text-gray-500 text-sm leading-relaxed"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        {block.text}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* ── Contact card ── */}
        <motion.div
          id="contact"
          custom={sections.length}
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="bg-[#0B1C3A] rounded-2xl overflow-hidden relative"
        >
          {/* dot grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 sm:p-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mail size={14} className="text-orange-400" />
                <span className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.28em]" style={{ fontFamily: "'Lato', sans-serif" }}>
                  Get In Touch
                </span>
              </div>
              <h3
                className="text-white font-bold text-xl sm:text-2xl mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Questions about this disclaimer?
              </h3>
              <p className="text-white/50 text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>
                We're happy to clarify anything about our privacy practices or legal terms.
              </p>
            </div>
            <a
              href="mailto:info@ownyourhome.com"
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-bold text-sm rounded-full pl-6 pr-2 py-3 no-underline shrink-0"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              tcownyourhome@gmail.com
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white shrink-0">
                <ArrowUpRight size={14} className="text-orange-500" />
              </span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>

    {/* ── Footer note ── */}
    <div className="bg-[#F8F7F5] pb-10 px-5 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <p className="text-gray-300 text-xs text-center" style={{ fontFamily: "'Lato', sans-serif" }}>
          Last updated January 2025 · Own Your Home · All rights reserved
        </p>
      </div>
    </div>

  </Layout>
);

export default Legal;