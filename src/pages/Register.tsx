import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight, ArrowLeft, ArrowRight, Shield,
  CheckCircle, ChevronDown, Check, Users,
  Monitor, Award, User, Mail, Phone, MapPin, Building2,
  Globe, Briefcase, BookOpen, AlertCircle,
} from "lucide-react";
import Layout from "@/components/Layout";

/* ═══════════════════════════════════════════════════════════════════
   TYPES & CONSTANTS
═══════════════════════════════════════════════════════════════════ */
interface FormState {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  category: string;
  orgName: string;
  trainingChoice: string;
  cyberDomain: string;
  industry: string;
  trainingPreference: string;
}

const INITIAL_FORM: FormState = {
  firstName: "", lastName: "", gender: "", email: "", phone: "",
  city: "", country: "", category: "", orgName: "",
  trainingChoice: "", cyberDomain: "", industry: "", trainingPreference: "",
};

const GENDER_OPTIONS    = ["Man", "Woman", "Non-binary", "Prefer not to say"];
const CATEGORY_OPTIONS  = [
  "Individual - Online",
  "Organization - Online",
  "Organization - Onsite",
  "Dissertation Project (Masters)",
  "Dissertation Project (PhD)",
];
const TRAINING_OPTIONS  = [
  "Security Awareness",
  "Cybersecurity - Basic/Intermediate",
  "Cybersecurity - Advanced",
];
const CYBER_DOMAINS = [
  "Cybersecurity Analyst",
  "SOC Analyst",
  "Cybersecurity Engineer",
];
const INDUSTRIES = [
  "Education", "Technology & IT", "Energy",
  "Transportation", "Finance", "Healthcare", "Government",
];
const TRAINING_PREFERENCES = [
  "1-Month Crash Course",
  "2-Months Course",
  "3-Months Full Course",
  "4-Months Advanced Course",
  "Organization Security Awareness Program",
];
const PREF_DESC: Record<string, string> = {
  "1-Month Crash Course":                   "4 weeks · Intensive certification prep",
  "2-Months Course":                        "8 weeks · Balanced pace with deeper coverage",
  "3-Months Full Course":                   "12 weeks · Flagship program with mentorship",
  "4-Months Advanced Course":               "16 weeks · Advanced certs + job placement",
  "Organization Security Awareness Program":"Custom · Tailored for teams & organisations",
};
const COUNTRIES = [
  "Nigeria","Ghana","Kenya","South Africa","United Kingdom",
  "United States","Canada","Australia","Germany","France",
  "India","United Arab Emirates","Other",
];
const STEPS = [
  { id: 1, label: "Personal",  icon: User },
  { id: 2, label: "Contact",   icon: Phone },
  { id: 3, label: "Training",  icon: BookOpen },
  { id: 4, label: "Confirm",   icon: CheckCircle },
];

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION
═══════════════════════════════════════════════════════════════════ */
const slideVariants = {
  enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ? 52 : -52 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -52 : 52 }),
};

/* ═══════════════════════════════════════════════════════════════════
   PRIMITIVES
═══════════════════════════════════════════════════════════════════ */
const ff = "'DM Sans', sans-serif";

const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2"
    style={{ fontFamily: ff }}>
    {children}{required && <span className="text-blue-500 ml-1">*</span>}
  </label>
);

const ErrMsg = ({ msg }: { msg?: string }) => msg ? (
  <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5" style={{ fontFamily: ff }}>
    <AlertCircle size={11} />{msg}
  </p>
) : null;

const baseCls = "w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
const errBorder = "border-red-400 ring-1 ring-red-300";

const SelectField = ({
  value, onChange, options, placeholder, icon: Icon, err,
}: {
  value: string; onChange: (v: string) => void; options: string[];
  placeholder: string; icon?: React.ElementType; err?: string;
}) => (
  <div>
    <div className="relative">
      {Icon && <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />}
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className={`${baseCls} appearance-none cursor-pointer ${err ? errBorder : ""}`}
        style={{ fontFamily: ff, paddingLeft: Icon ? "2.5rem" : "1rem" }}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
    <ErrMsg msg={err} />
  </div>
);

const RadioGroup = ({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) => (
  <div className="grid grid-cols-2 gap-2">
    {options.map((opt) => (
      <button key={opt} type="button" onClick={() => onChange(opt)}
        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer text-sm font-semibold
          ${value === opt ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-600 hover:border-blue-200"}`}
        style={{ fontFamily: ff }}>
        <span className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
          ${value === opt ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}>
          {value === opt && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
        </span>
        {opt}
      </button>
    ))}
  </div>
);

const OptionCard = ({
  label, selected, onClick, description,
}: { label: string; selected: boolean; onClick: () => void; description?: string }) => (
  <button type="button" onClick={onClick}
    className={`w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer
      ${selected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50"}`}>
    <span className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
      ${selected ? "border-blue-500 bg-blue-600" : "border-gray-300"}`}>
      {selected && <Check size={10} className="text-white" strokeWidth={3} />}
    </span>
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-semibold leading-tight ${selected ? "text-blue-700" : "text-gray-700"}`}
        style={{ fontFamily: ff }}>{label}</p>
      {description && (
        <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: ff }}>{description}</p>
      )}
    </div>
  </button>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  value ? (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-b-0">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 w-[130px] shrink-0 pt-0.5"
        style={{ fontFamily: ff }}>{label}</span>
      <span className="text-sm font-semibold text-gray-800 flex-1 break-words"
        style={{ fontFamily: ff }}>{value}</span>
    </div>
  ) : null
);

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
const Register = () => {
  const [searchParams]    = useSearchParams();
  const [step, setStep]   = useState(1);
  const [dir,  setDir]    = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState<Partial<Record<keyof FormState, string>>>({});
  const [form,  setForm]  = useState<FormState>(INITIAL_FORM);

  useEffect(() => {
    const pref = searchParams.get("preference");
    const cat  = searchParams.get("category");
    if (pref || cat) setForm((f) => ({ ...f, ...(pref ? { trainingPreference: pref } : {}), ...(cat ? { trainingChoice: cat } : {}) }));
  }, []);

  const set = (field: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (step === 1) {
      if (!form.firstName.trim()) e.firstName = "First name is required";
      if (!form.lastName.trim())  e.lastName  = "Last name is required";
      if (!form.gender)           e.gender    = "Please select your gender";
    }
    if (step === 2) {
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "A valid email address is required";
      if (!form.phone.trim()) e.phone   = "WhatsApp / phone number is required";
      if (!form.city.trim())  e.city    = "City is required";
      if (!form.country)      e.country = "Please select your country";
    }
    if (step === 3) {
      if (!form.category)           e.category           = "Please select a category";
      if (!form.trainingChoice)     e.trainingChoice     = "Please select a training track";
      if (!form.industry)           e.industry           = "Please select your industry";
      if (!form.trainingPreference) e.trainingPreference = "Please select your training preference";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validate()) return;
    setDir(1); setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goBack = () => {
    setDir(-1); setStep((s) => s - 1); setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600);
  };

  const isOrg   = form.category.startsWith("Organization");
  const isCyber = form.trainingChoice.toLowerCase().includes("cybersecurity");

  /* ── SUCCESS ── */
  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#f8fafc]">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="text-center max-w-lg w-full">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-200">
              <Check size={42} className="text-white" strokeWidth={2.5} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }}>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em] mb-3" style={{ fontFamily: ff }}>Registration Submitted</p>
              <h1 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-3" style={{ fontFamily: ff, fontWeight: 700 }}>
                Welcome, {form.firstName}!
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-2" style={{ fontFamily: ff }}>
                Your registration for <strong className="text-gray-700">{form.trainingPreference}</strong> has been received.
                We'll reach you at <strong className="text-gray-700">{form.email}</strong> and on WhatsApp within 24 hours.
              </p>
              <p className="text-gray-400 text-xs mb-8" style={{ fontFamily: ff }}>
                Please check your spam/junk folder if you don't see our email.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/training" className="no-underline">
                  <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-full px-7 py-3 border-none cursor-pointer transition-all active:scale-95"
                    style={{ fontFamily: ff }}>
                    View Training Schedule <ArrowUpRight size={14} />
                  </button>
                </Link>
                <Link to="/" className="no-underline">
                  <button className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-sm rounded-full px-7 py-3 bg-white cursor-pointer transition-all active:scale-95"
                    style={{ fontFamily: ff }}>
                    Back to Home
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  /* ── MAIN ── */
  return (
    <Layout>
      {/*
        pt-24 clears the fixed navbar (navbar is ~68px tall + 4px pt gap).
        pb-16 gives breathing room above the footer.
        The outer div uses min-h-screen so short forms still push the footer down.
      */}
      <div className="min-h-screen bg-[#f8fafc] pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto w-full">

          {/* ── PAGE HEADING ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: ff }}>Enrolment Form</span>
            </div>
            <h1 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-2" style={{ fontFamily: ff, fontWeight: 700 }}>
              Register for Training
            </h1>
            <p className="text-gray-400 text-sm max-w-sm mx-auto" style={{ fontFamily: ff }}>
              Complete all steps to secure your place. Fields marked{" "}
              <span className="text-blue-500 font-bold">*</span> are required.
            </p>
          </motion.div>

          {/* ── STEP INDICATOR ── */}
          <div className="mb-8 px-2">
            {/* Desktop stepper */}
            <div className="hidden sm:flex items-center relative">
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 z-0" />
              <div
                className="absolute top-5 left-5 h-0.5 bg-blue-500 z-0 transition-all duration-500 ease-out"
                style={{ width: `calc(${((step - 1) / (STEPS.length - 1)) * 100}% - 0px)` }}
              />
              {STEPS.map((s) => {
                const done = step > s.id; const cur = step === s.id;
                return (
                  <div key={s.id} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${done ? "bg-blue-600 border-blue-600 text-white"
                        : cur  ? "bg-white border-blue-500 text-blue-600 shadow-md shadow-blue-100"
                        : "bg-white border-gray-200 text-gray-400"}`}>
                      {done ? <Check size={15} strokeWidth={3} /> : <s.icon size={16} />}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider
                      ${cur ? "text-blue-600" : done ? "text-blue-400" : "text-gray-300"}`}
                      style={{ fontFamily: ff }}>{s.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Mobile progress bar */}
            <div className="sm:hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-600 text-xs font-bold" style={{ fontFamily: ff }}>
                  Step {step} of {STEPS.length} — {STEPS[step - 1].label}
                </span>
                <span className="text-gray-400 text-xs" style={{ fontFamily: ff }}>
                  {Math.round((step / STEPS.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div className="h-full bg-blue-500 rounded-full"
                  animate={{ width: `${(step / STEPS.length) * 100}%` }}
                  transition={{ duration: 0.4 }} />
              </div>
            </div>
          </div>

          {/* ── FORM CARD ── */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="p-6 sm:p-8"
              >

                {/* ═══════ STEP 1 — PERSONAL ═══════ */}
                {step === 1 && (
                  <div>
                    <h2 className="text-[#0a0f1e] font-bold text-xl sm:text-2xl mb-1" style={{ fontFamily: ff, fontWeight: 700 }}>
                      Personal Details
                    </h2>
                    <p className="text-gray-400 text-sm mb-7" style={{ fontFamily: ff }}>Tell us a bit about yourself.</p>

                    <div className="space-y-5">
                      {/* Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label required>First Name</Label>
                          <div className="relative">
                            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="John" value={form.firstName}
                              onChange={(e) => set("firstName")(e.target.value)}
                              className={`${baseCls} pl-10 ${errors.firstName ? errBorder : ""}`}
                              style={{ fontFamily: ff }} />
                          </div>
                          <ErrMsg msg={errors.firstName} />
                        </div>
                        <div>
                          <Label required>Last Name</Label>
                          <div className="relative">
                            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Doe" value={form.lastName}
                              onChange={(e) => set("lastName")(e.target.value)}
                              className={`${baseCls} pl-10 ${errors.lastName ? errBorder : ""}`}
                              style={{ fontFamily: ff }} />
                          </div>
                          <ErrMsg msg={errors.lastName} />
                        </div>
                      </div>

                      {/* Gender */}
                      <div>
                        <Label required>Your Gender</Label>
                        <RadioGroup options={GENDER_OPTIONS} value={form.gender} onChange={set("gender")} />
                        <ErrMsg msg={errors.gender} />
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══════ STEP 2 — CONTACT ═══════ */}
                {step === 2 && (
                  <div>
                    <h2 className="text-[#0a0f1e] font-bold text-xl sm:text-2xl mb-1" style={{ fontFamily: ff, fontWeight: 700 }}>
                      Contact & Location
                    </h2>
                    <p className="text-gray-400 text-sm mb-7" style={{ fontFamily: ff }}>
                      We'll use these to confirm your enrolment and send updates.
                    </p>

                    <div className="space-y-5">
                      {/* Email */}
                      <div>
                        <Label required>Your Email</Label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type="email" placeholder="you@example.com" value={form.email}
                            onChange={(e) => set("email")(e.target.value)}
                            className={`${baseCls} pl-10 ${errors.email ? errBorder : ""}`}
                            style={{ fontFamily: ff }} />
                        </div>
                        <ErrMsg msg={errors.email} />
                      </div>

                      {/* Phone */}
                      <div>
                        <Label required>WhatsApp / Phone Number</Label>
                        <div className="relative">
                          <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type="tel" placeholder="+234 (0) 800 000 0000" value={form.phone}
                            onChange={(e) => set("phone")(e.target.value)}
                            className={`${baseCls} pl-10 ${errors.phone ? errBorder : ""}`}
                            style={{ fontFamily: ff }} />
                        </div>
                        <ErrMsg msg={errors.phone} />
                      </div>

                      {/* City + Country */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label required>City</Label>
                          <div className="relative">
                            <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Lagos" value={form.city}
                              onChange={(e) => set("city")(e.target.value)}
                              className={`${baseCls} pl-10 ${errors.city ? errBorder : ""}`}
                              style={{ fontFamily: ff }} />
                          </div>
                          <ErrMsg msg={errors.city} />
                        </div>
                        <div>
                          <Label required>Country</Label>
                          <SelectField value={form.country} onChange={set("country")}
                            options={COUNTRIES} placeholder="Select country" icon={Globe} err={errors.country} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══════ STEP 3 — TRAINING ═══════ */}
                {step === 3 && (
                  <div>
                    <h2 className="text-[#0a0f1e] font-bold text-xl sm:text-2xl mb-1" style={{ fontFamily: ff, fontWeight: 700 }}>
                      Training Details
                    </h2>
                    <p className="text-gray-400 text-sm mb-7" style={{ fontFamily: ff }}>
                      Help us tailor the right program for you.
                    </p>

                    <div className="space-y-7">

                      {/* Category */}
                      <div>
                        <Label required>Training or Consultancy Category</Label>
                        <div className="space-y-2">
                          {CATEGORY_OPTIONS.map((opt) => (
                            <OptionCard key={opt} label={opt} selected={form.category === opt}
                              onClick={() => set("category")(opt)} />
                          ))}
                        </div>
                        <ErrMsg msg={errors.category} />
                      </div>

                      {/* Organisation name (conditional) */}
                      <AnimatePresence>
                        {isOrg && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}>
                            <Label>Name of Organisation</Label>
                            <div className="relative">
                              <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input type="text" placeholder="Your company / institution" value={form.orgName}
                                onChange={(e) => set("orgName")(e.target.value)}
                                className={`${baseCls} pl-10`} style={{ fontFamily: ff }} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Training track */}
                      <div>
                        <Label required>Choose Training / Consulting</Label>
                        <div className="space-y-2">
                          {TRAINING_OPTIONS.map((opt) => (
                            <OptionCard key={opt} label={opt} selected={form.trainingChoice === opt}
                              onClick={() => set("trainingChoice")(opt)} />
                          ))}
                        </div>
                        <ErrMsg msg={errors.trainingChoice} />
                      </div>

                      {/* Cyber domain (conditional) */}
                      <AnimatePresence>
                        {isCyber && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}>
                            <Label>Cybersecurity Domain of Interest</Label>
                            <div className="space-y-2">
                              {CYBER_DOMAINS.map((opt) => (
                                <OptionCard key={opt} label={opt} selected={form.cyberDomain === opt}
                                  onClick={() => set("cyberDomain")(opt)} />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Industry */}
                      <div>
                        <Label required>Your Industry</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {INDUSTRIES.map((ind) => (
                            <button key={ind} type="button" onClick={() => set("industry")(ind)}
                              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-semibold text-left transition-all cursor-pointer
                                ${form.industry === ind
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 bg-white text-gray-600 hover:border-blue-200"}`}
                              style={{ fontFamily: ff }}>
                              <Briefcase size={12} className={form.industry === ind ? "text-blue-500" : "text-gray-400"} />
                              {ind}
                            </button>
                          ))}
                        </div>
                        <ErrMsg msg={errors.industry} />
                      </div>

                      {/* Training preference */}
                      <div>
                        <Label required>Select Your Training Preference</Label>
                        <div className="space-y-2">
                          {TRAINING_PREFERENCES.map((opt) => (
                            <OptionCard key={opt} label={opt} description={PREF_DESC[opt]}
                              selected={form.trainingPreference === opt}
                              onClick={() => set("trainingPreference")(opt)} />
                          ))}
                        </div>
                        <ErrMsg msg={errors.trainingPreference} />
                      </div>

                    </div>
                  </div>
                )}

                {/* ═══════ STEP 4 — CONFIRM ═══════ */}
                {step === 4 && (
                  <div>
                    <h2 className="text-[#0a0f1e] font-bold text-xl sm:text-2xl mb-1" style={{ fontFamily: ff, fontWeight: 700 }}>
                      Review & Confirm
                    </h2>
                    <p className="text-gray-400 text-sm mb-7" style={{ fontFamily: ff }}>
                      Please review your details before submitting.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="bg-[#f8fafc] rounded-2xl border border-gray-100 p-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: ff }}>Personal</p>
                        <SummaryRow label="Full Name" value={`${form.firstName} ${form.lastName}`} />
                        <SummaryRow label="Gender"    value={form.gender} />
                      </div>

                      <div className="bg-[#f8fafc] rounded-2xl border border-gray-100 p-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: ff }}>Contact</p>
                        <SummaryRow label="Email"    value={form.email} />
                        <SummaryRow label="WhatsApp" value={form.phone} />
                        <SummaryRow label="Location" value={`${form.city}, ${form.country}`} />
                      </div>

                      <div className="bg-[#f8fafc] rounded-2xl border border-gray-100 p-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: ff }}>Training</p>
                        <SummaryRow label="Category"    value={form.category} />
                        <SummaryRow label="Organisation" value={form.orgName} />
                        <SummaryRow label="Track"       value={form.trainingChoice} />
                        <SummaryRow label="Domain"      value={form.cyberDomain} />
                        <SummaryRow label="Industry"    value={form.industry} />
                        <SummaryRow label="Preference"  value={form.trainingPreference} />
                      </div>
                    </div>

                    {/* Privacy notice */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 mb-6">
                      <AlertCircle size={15} className="text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-blue-700 text-xs leading-relaxed" style={{ fontFamily: ff }}>
                        When you submit this form, your details will only be used by BYTITUDE to process your enrolment and communicate about your training. We will not share your information with third parties.
                      </p>
                    </div>

                    {/* Submit */}
                    <button onClick={handleSubmit} disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 active:scale-[0.99] transition-all text-white font-bold text-sm rounded-2xl py-4 border-none cursor-pointer shadow-lg shadow-blue-100"
                      style={{ fontFamily: ff }}>
                      {loading ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Complete Registration
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white shrink-0">
                            <CheckCircle size={15} className="text-blue-600" />
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* ── NAV FOOTER (inside card) ── */}
            <div className={`flex items-center px-6 sm:px-8 py-5 border-t border-gray-100 bg-gray-50/60 ${step === 4 ? "justify-start" : "justify-between"}`}>
              {step > 1 ? (
                <button onClick={goBack}
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0a0f1e] text-sm font-semibold transition-colors border-none bg-transparent cursor-pointer"
                  style={{ fontFamily: ff }}>
                  <ArrowLeft size={15} /> {step === 4 ? "Back to edit" : "Back"}
                </button>
              ) : (
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm font-semibold no-underline transition-colors"
                  style={{ fontFamily: ff }}>
                  <ArrowLeft size={15} /> Home
                </Link>
              )}

              {step < 4 && (
                <button onClick={goNext}
                  className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-full transition-all active:scale-95 border-none cursor-pointer shadow-md shadow-blue-100"
                  style={{ padding: "11px 20px 11px 26px", fontFamily: ff }}>
                  Continue
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shrink-0">
                    <ArrowRight size={13} className="text-blue-600" />
                  </span>
                </button>
              )}
            </div>

          </div>{/* end card */}

          <p className="text-center text-gray-400 text-xs mt-6" style={{ fontFamily: ff }}>
            Already enrolled?{" "}
            <Link to="/contact" className="text-blue-600 hover:text-blue-800 font-semibold no-underline">Contact us</Link>
          </p>

        </div>
      </div>
    </Layout>
  );
};

export default Register;