import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin, Phone, Mail, Clock, ArrowUpRight,
  CheckCircle, Send, Shield, Building, Lock,
  Cloud, Database, Cpu, Linkedin, Twitter, Youtube, Github,
} from "lucide-react";
import Layout from "@/components/Layout";

import heroImage from "/images/byte.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.45 } }),
};

const infoCards = [
  {
    icon: MapPin, color: "bg-blue-50 text-blue-600",
    title: "Office Address",
    lines: ["Sam Ewang Ext. Abeokuta", "ABK 110101, Ogun State, Nigeria", "Remote & On-Site Delivery"],
    action: null,
  },
  {
    icon: Phone, color: "bg-indigo-50 text-indigo-600",
    title: "Phone Number",
    lines: ["+234 901 547 5545", "Mon–Fri, 8:00am – 6:00pm"],
    action: { label: "Call Now", href: "tel:+234 901 547 5545" },
  },
  {
    icon: Mail, color: "bg-cyan-50 text-cyan-700",
    title: "Email Us",
    lines: ["info@bytitude.com", "We reply within 24 hours"],
    action: { label: "Send Email", href: "mailto:info@bytitude.com" },
  },
  {
    icon: Clock, color: "bg-slate-50 text-slate-600",
    title: "Support Hours",
    lines: ["Mon–Fri: 8:00am – 6:00pm", "Labs: 24/7 Access"],
    action: null,
  },
];

const inquiryTypes = [
  { value: "cybersecurity", label: "Cybersecurity Training", icon: Lock },
  { value: "cloud", label: "Cloud Computing",  icon: Cloud },
  { value: "data", label: "Data Science",       icon: Database },
  { value: "hardware", label: "Computer Hardware", icon: Cpu },
  { value: "corporate", label: "Corporate / Enterprise", icon: Building },
  { value: "consulting", label: "Security Consulting", icon: Shield },
];

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", inquiry: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <Layout>

      {/* ── HERO ── */}
      <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[440px]">
          <img src={heroImage} alt="Contact" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.5) 0px,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 60px)" }} />
          <div className="absolute top-0 right-0 h-full flex items-center gap-1.5 pr-6 sm:pr-10 pointer-events-none">
            <div className="w-2.5 rounded-full bg-blue-500" style={{ height: "55%" }} />
            <div className="w-2.5 rounded-full bg-blue-700/60" style={{ height: "38%" }} />
            <div className="w-2.5 rounded-full bg-blue-900/40" style={{ height: "22%" }} />
          </div>
          <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[340px] lg:min-h-[440px] px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 pt-20 sm:pt-28">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Get In Touch</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
              className="text-white font-bold leading-tight mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(38px, 7vw, 88px)" }}>
              Contact Us
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
              className="text-white/70 max-w-md leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}>
              Have a question about training, certification paths, or corporate programs? We'd love to hear from you.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}>
              <div className="inline-flex items-center gap-1.5 border border-white/30 rounded-full px-4 py-2"
                style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}>
                <Link to="/" className="text-white/70 hover:text-white text-xs font-medium no-underline transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Home</Link>
                <span className="text-white/40 text-xs">/</span>
                <span className="text-white text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Contact</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INFO CARDS ── */}
      <section className="bg-[#f8fafc] py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {infoCards.map((card, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
                <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center mb-4 shrink-0`}>
                  <card.icon size={20} />
                </div>
                <p className="text-[#0a0f1e] font-bold text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{card.title}</p>
                {card.lines.map((line, j) => (
                  <p key={j} className={`text-sm leading-relaxed ${j === 0 ? "text-gray-600 font-medium" : "text-gray-400"}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>{line}</p>
                ))}
                {card.action && (
                  <a href={card.action.href} className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wide no-underline hover:gap-2.5 transition-all duration-200 mt-4">
                    {card.action.label} <ArrowUpRight size={11} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + EXTRAS ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Send a Message</span>
              </div>
              <h2 className="text-[#0a0f1e] font-bold leading-tight mb-3"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 44px)" }}>
                We'd Love to<br />Hear From You
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Fill out the form and a team member will respond within 24 hours. For urgent enquiries, call us directly.
              </p>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-white" />
                  </div>
                  <h3 className="text-[#0a0f1e] font-bold text-xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Message Sent!</h3>
                  <p className="text-gray-500 text-sm mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", inquiry: "", message: "" }); }}
                    className="text-blue-600 text-sm font-bold border-none bg-transparent cursor-pointer hover:text-blue-800 transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>Send another message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[["Full Name *", "name", "Your full name", "text"], ["Email Address *", "email", "you@email.com", "email"]].map(([label, field, ph, type]) => (
                      <div key={field}>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</label>
                        <input type={type} placeholder={ph} value={(form as any)[field]}
                          onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                          required={label.includes("*")}
                          className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          style={{ fontFamily: "'DM Sans', sans-serif" }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Phone (optional)</label>
                    <input type="tel" placeholder="+234 123 567 890" value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      style={{ fontFamily: "'DM Sans', sans-serif" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>I'm Enquiring About</label>
                    <div className="flex flex-wrap gap-2">
                      {inquiryTypes.map((t) => (
                        <button key={t.value} type="button" onClick={() => setForm((f) => ({ ...f, inquiry: t.value }))}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            background: form.inquiry === t.value ? "#2563eb" : "#f8fafc",
                            color: form.inquiry === t.value ? "white" : "#374151",
                            borderColor: form.inquiry === t.value ? "#2563eb" : "#e5e7eb",
                          }}>
                          <t.icon size={12} /> {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Message *</label>
                    <textarea placeholder="Tell us how we can help you..." rows={5} value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      style={{ fontFamily: "'DM Sans', sans-serif" }} />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 active:scale-95 transition-all text-white font-bold text-sm rounded-full py-3.5 border-none cursor-pointer"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {loading ? (
                      <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Sending...</>
                    ) : (
                      <>Send Message<span className="flex items-center justify-center w-8 h-8 rounded-full bg-white shrink-0"><Send size={13} className="text-blue-600" /></span></>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right: Map + social */}
            <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
              className="flex flex-col gap-5">
              {/* Map */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-100" style={{ height: "clamp(250px, 35vw, 380px)" }}>
                <iframe
                  title="BYTITUDE Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48000!2d-96.18!3d41.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87!2sWorld!5e0!3m2!1sen!2sus!4v1700000000000"
                  width="100%" height="100%"
                  style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                      <Shield size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[#0a0f1e] font-bold text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>BYTITUDE</p>
                      <p className="text-gray-400 text-[10px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Global · Remote & On-Site</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick contact strip */}
              <div className="grid grid-cols-2 gap-4">
                <a href="tel:+234 901 547 5545"
                  className="flex items-center gap-3 bg-[#0a0f1e] hover:bg-blue-900 rounded-2xl px-5 py-4 no-underline group transition-colors duration-200">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    <Phone size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>Call Us</p>
                    <p className="text-white font-bold text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>+234 901 547 5545</p>
                  </div>
                </a>
                <a href="mailto:info@bytitude.com"
                  className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 rounded-2xl px-5 py-4 no-underline transition-colors duration-200">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[10px] uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>Email Us</p>
                    <p className="text-white font-bold text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>Send an Email</p>
                  </div>
                </a>
              </div>

              {/* Social */}
              <div className="bg-[#f8fafc] rounded-2xl border border-gray-100 p-5">
                <p className="text-[#0a0f1e] font-bold text-sm mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Follow BYTITUDE</p>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Linkedin, href: "#", label: "LinkedIn", cls: "hover:bg-blue-50 hover:text-blue-600" },
                    { icon: Twitter,  href: "#", label: "Twitter",  cls: "hover:bg-sky-50 hover:text-sky-500" },
                    { icon: Youtube,  href: "#", label: "YouTube",  cls: "hover:bg-red-50 hover:text-red-600" },
                    { icon: Github,   href: "#", label: "GitHub",   cls: "hover:bg-gray-100 hover:text-gray-800" },
                  ].map(({ icon: Icon, href, label, cls }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className={`w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 transition-all duration-200 no-underline ${cls}`}>
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;