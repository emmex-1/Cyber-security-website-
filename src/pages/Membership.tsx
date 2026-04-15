import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle, ArrowUpRight, Users, BookOpen,
  Mic, Shield, TrendingUp, Calendar, Zap, Tag,
} from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "sonner";

/* ─── benefits with icons ────────────────────────────────────────────── */
const benefits = [
  { icon: Users,      label: "Monthly live group coaching sessions"              },
  { icon: BookOpen,   label: "Exclusive budgeting & financial planning tools"    },
  { icon: Shield,     label: "Access to member-only resources & guides"          },
  { icon: Zap,        label: "Priority workshop registration"                    },
  { icon: Mic,        label: "Private community forum access"                    },
  { icon: TrendingUp, label: "Monthly progress check-ins & accountability"       },
  { icon: Calendar,   label: "Guest expert sessions on credit, investing & more" },
  { icon: Tag,        label: "Discounts on future programs & events"             },
];

/* ─── scatter dot ─────────────────────────────────────────────────────── */
const Dot = ({ size, top, left, right, bottom, op }: {
  size: number; top?: string; left?: string; right?: string; bottom?: string; op: number;
}) => (
  <span
    aria-hidden
    className="pointer-events-none select-none absolute rounded-full bg-orange-500"
    style={{ width: size, height: size, top, left, right, bottom, opacity: op, zIndex: 0 }}
  />
);

/* ─── animation ──────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }),
};

/* ═══════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════ */
const Membership = () => {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) { toast.error("Please fill in all fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { toast.error("Please enter a valid email."); return; }
    toast.success("Welcome! Check your email for membership details.");
    setForm({ name: "", email: "" });
  };

  return (
    <Layout>

      {/* ══════════════════════════════════════════════════════════════
          HERO — dark split: serif headline left, price circle right
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0B1C3A] overflow-hidden">
        <Dot size={340} top="-90px"  left="-90px"  op={0.05} />
        <Dot size={110} top="35%"    right="6%"    op={0.07} />
        <Dot size={40}  bottom="18%" left="42%"    op={0.09} />
        <Dot size={14}  top="65%"    left="15%"    op={0.11} />
        <Dot size={8}   bottom="28%" right="28%"   op={0.12} />

        {/* Diagonal rule */}
        <div
          className="absolute bg-white/[0.04] pointer-events-none"
          style={{ width: 2, height: "150%", top: "-25%", left: "58%", transform: "rotate(10deg)", transformOrigin: "top" }}
        />

        <div className="relative z-10 container mx-auto px-5 sm:px-10 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-28 lg:py-36">

            {/* Left */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-orange-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.32em] mb-5"
                style={{ fontFamily: "'Lato',sans-serif" }}
              >
                · Monthly Program
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.65 }}
                className="text-white font-bold leading-[1.0] mb-6"
                style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(50px,7.5vw,100px)" }}
              >
                Own Your<br />
                <span className="text-orange-400">Home</span><br />
                Membership
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
                className="text-white/55 text-sm sm:text-base leading-relaxed max-w-sm mb-10"
                style={{ fontFamily: "'Lato',sans-serif" }}
              >
                Ongoing coaching, an accountable community, and exclusive resources — every month, for as long as you need it.
              </motion.p>

              <motion.a
                href="#join"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-bold text-sm rounded-full pl-7 pr-2 py-3 no-underline cursor-pointer"
                style={{ fontFamily: "'Lato',sans-serif" }}
              >
                Join Today — $49/mo
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white shrink-0">
                  <ArrowUpRight size={15} className="text-orange-500" />
                </span>
              </motion.a>
            </div>

            {/* Right — circular price stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.32, duration: 0.7, ease: "easeOut" }}
              className="flex justify-center lg:justify-end"
            >
              <div
                className="relative flex flex-col items-center justify-center text-center"
                style={{
                  width: "clamp(220px,36vw,340px)",
                  height: "clamp(220px,36vw,340px)",
                  borderRadius: "50%",
                  border: "1px solid rgba(249,115,22,0.22)",
                  background: "rgba(249,115,22,0.055)",
                }}
              >
                <div className="absolute inset-5 rounded-full border border-orange-500/12" />
                <p
                  className="text-orange-400 font-bold leading-none"
                  style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(68px,11vw,108px)" }}
                >
                  $49
                </p>
                <p className="text-white/45 text-xs font-semibold uppercase tracking-widest mt-1"
                  style={{ fontFamily: "'Lato',sans-serif" }}>
                  per month
                </p>
                <p className="text-white/25 text-[10px] mt-0.5" style={{ fontFamily: "'Lato',sans-serif" }}>
                  cancel anytime
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BENEFITS — horizontal numbered rows (unique layout)
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        <Dot size={280} bottom="-60px" right="-60px" op={0.05} />
        <Dot size={70}  top="20%"      left="2%"     op={0.06} />
        <Dot size={18}  top="60%"      right="10%"   op={0.09} />

        <div className="container mx-auto px-5 sm:px-10 lg:px-16 max-w-7xl relative z-10">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
                <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.28em]"
                  style={{ fontFamily: "'Lato',sans-serif" }}>Everything Included</span>
              </div>
              <h2
                className="text-[#0B1C3A] font-bold leading-tight"
                style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(30px,4.2vw,52px)" }}
              >
                What You Get Every<br className="hidden sm:block" /> Single Month
              </h2>
            </div>
            <p className="text-gray-400 text-sm sm:text-base max-w-xs leading-relaxed lg:text-right"
              style={{ fontFamily: "'Lato',sans-serif" }}>
              8 member-only benefits built to keep you moving forward.
            </p>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="group flex items-center gap-5 sm:gap-8 py-5 hover:bg-orange-50
                  -mx-4 px-4 sm:-mx-8 sm:px-8 rounded-xl transition-colors duration-200 cursor-default"
              >
                {/* Number */}
                <span
                  className="text-gray-200 group-hover:text-orange-200 font-bold leading-none shrink-0 transition-colors duration-200 w-10 text-right"
                  style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon box */}
                <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-orange-500 border border-gray-100 group-hover:border-orange-500 flex items-center justify-center shrink-0 transition-all duration-200">
                  <b.icon size={18} className="text-gray-400 group-hover:text-white transition-colors duration-200" />
                </div>

                {/* Label */}
                <p className="text-[#0B1C3A] text-sm sm:text-base font-medium flex-1"
                  style={{ fontFamily: "'Lato',sans-serif" }}>
                  {b.label}
                </p>

                {/* Arrow */}
                <ArrowUpRight size={16}
                  className="text-orange-400 opacity-0 group-hover:opacity-100 shrink-0 transition-opacity duration-200" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PROMISE STRIP — orange full-width band
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-orange-500 py-12 sm:py-14">
        <div className="container mx-auto px-5 sm:px-10 max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <h2
              className="text-white font-bold text-xl sm:text-2xl text-center sm:text-left"
              style={{ fontFamily: "'Cormorant Garamond',Georgia,serif" }}
            >
              No contracts. No catch.<br className="sm:hidden" /> Cancel any time.
            </h2>
            <div className="flex flex-wrap justify-center sm:justify-end gap-x-8 gap-y-2">
              {["Cancel with one click", "Full access from day one", "No hidden fees"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-white/80 shrink-0" />
                  <span className="text-white/80 text-sm" style={{ fontFamily: "'Lato',sans-serif" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          JOIN — split: summary card left, form right
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#F8F7F5] relative overflow-hidden" id="join">
        <Dot size={380} bottom="-110px" right="-110px" op={0.04} />
        <Dot size={90}  top="12%"       left="-18px"   op={0.06} />
        <Dot size={24}  top="52%"       right="16%"    op={0.09} />

        <div className="container mx-auto px-5 sm:px-10 lg:px-16 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
                <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.28em]"
                  style={{ fontFamily: "'Lato',sans-serif" }}>Get Started</span>
              </div>
              <h2
                className="text-[#0B1C3A] font-bold leading-tight mb-5"
                style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(30px,4vw,50px)" }}
              >
                Start Your<br />Membership Today
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8"
                style={{ fontFamily: "'Lato',sans-serif" }}>
                Fill in the form and you'll be welcomed into the Own Your Home community within 24 hours — with instant access to the resource library.
              </p>

              {/* Mini price summary */}
              <div className="rounded-2xl border border-orange-100 bg-white p-6 mb-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[#0B1C3A] font-bold text-sm" style={{ fontFamily: "'Lato',sans-serif" }}>
                    Monthly Membership
                  </span>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28 }}
                    className="text-orange-500 font-bold leading-none">
                    $49<span className="text-gray-400 text-sm font-normal">/mo</span>
                  </span>
                </div>
                <div className="space-y-2.5">
                  {benefits.slice(0, 4).map((b, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle size={13} className="text-orange-500 shrink-0" />
                      <span className="text-gray-500 text-sm" style={{ fontFamily: "'Lato',sans-serif" }}>{b.label}</span>
                    </div>
                  ))}
                  <p className="text-orange-500 text-xs font-semibold pt-0.5" style={{ fontFamily: "'Lato',sans-serif" }}>
                    + {benefits.length - 4} more benefits included
                  </p>
                </div>
              </div>

              <p className="text-gray-400 text-xs" style={{ fontFamily: "'Lato',sans-serif" }}>
                Payment details collected after registration. Cancel anytime.
              </p>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10"
              style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.07)" }}
            >
              <h3
                className="text-[#0B1C3A] font-bold text-xl mb-1"
                style={{ fontFamily: "'Cormorant Garamond',Georgia,serif" }}
              >
                Join Membership
              </h3>
              <p className="text-gray-400 text-sm mb-7" style={{ fontFamily: "'Lato',sans-serif" }}>
                Takes less than 60 seconds.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5"
                    style={{ fontFamily: "'Lato',sans-serif" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    style={{ fontFamily: "'Lato',sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5"
                    style={{ fontFamily: "'Lato',sans-serif" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    style={{ fontFamily: "'Lato',sans-serif" }}
                  />
                </div>

                <p className="text-xs text-gray-400" style={{ fontFamily: "'Lato',sans-serif" }}>
                  Payment details will be collected after registration.
                </p>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-bold text-sm rounded-full px-6 py-3.5 border-none cursor-pointer mt-2"
                  style={{ fontFamily: "'Lato',sans-serif" }}
                >
                  Join Membership — $49/mo
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white shrink-0">
                    <ArrowUpRight size={14} className="text-orange-500" />
                  </span>
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Membership;