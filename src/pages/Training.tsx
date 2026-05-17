import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpRight, Shield, Lock, Cloud, Database, Cpu,
  Monitor, Users, Award, CheckCircle, Clock, Calendar,
  MapPin, Wifi, Building, ChevronDown, ChevronRight,
  Star, Zap, BookOpen, GraduationCap, Bell, Play, Flame,
} from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "/images/laps.png";

/* ══════════════════════════════════════════════════════════════════════════
   COUNTDOWN HOOK
══════════════════════════════════════════════════════════════════════════ */
function useCountdown(targetDate: string) {
  const calc = () => {
    const target = new Date(targetDate).getTime();
    const diff = target - Date.now();
    if (isNaN(target) || diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

/* ══════════════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════════════ */

const nextCohort = {
  startDate: "Monday, March 2026",
  endDate: "Monday, 27 May 2026",
  applicationDeadline: "Friday, April 2026",
  orientation: "Wednesday, 2 March 2025",
  startISO: "2026-03-04T09:00:00",
  endISO: "2026-05-27T18:00:00Z",
};

const flagship = {
  title: "BYTITUDE Cybersecurity Flagship Training",
  highlights: [
    "Strong foundation in real-world cybersecurity",
    "Hands-on labs: Linux, networking, security tools & attacks",
    "FREE 3-Day CompTIA Security+ exam prep",
    "Career mentorship included",
    "Instructors: CISSP, CSSLP, CompTIA Security+, Microsoft Security certified",
  ],
  tags: ["Beginner-Friendly", "IT Professionals", "Job-Ready Skills", "Flexible Payment"],
};

/* ── Upcoming cohort sessions ── */
const upcomingSessions = [
  {
    id: 1,
    title: "Cybersecurity Fundamentals – Cohort 7",
    startDate: "4 Aug 2025",
    endDate: "29 Sep 2025",
    startISO: "2025-08-04T09:00:00",
    endISO: "2025-09-29T18:00:00",
    duration: "2 Months",
    mode: "Virtual",
    status: "Enrolling Now",
    statusColor: "#2e6dd2",
    spotsLeft: 8,
    totalSpots: 20,
    courses: ["Cyber Security 101", "CompTIA Security+", "SOC Analyst L1"],
    trackId: "cybersecurity",
    pathId: "security+",
  },
  {
    id: 2,
    title: "Ethical Hacking & CEH – Cohort 5",
    startDate: "4 Aug 2025",
    endDate: "27 Oct 2025",
    startISO: "2025-08-04T09:00:00",
    endISO: "2025-10-27T18:00:00",
    duration: "3 Months",
    mode: "Virtual",
    status: "Enrolling Now",
    statusColor: "#2e6dd2",
    spotsLeft: 5,
    totalSpots: 15,
    courses: ["Ethical Hacking & CEH", "Penetration Testing Pro", "Red Teaming"],
    trackId: "cybersecurity",
    pathId: "ceh",
  },
  {
    id: 3,
    title: "Cloud Security Track – Cohort 3",
    startDate: "1 Sep 2025",
    endDate: "24 Nov 2025",
    startISO: "2025-09-01T09:00:00",
    endISO: "2025-11-24T18:00:00",
    duration: "3 Months",
    mode: "Virtual",
    status: "Coming Soon",
    statusColor: "#2e6dd2",
    spotsLeft: 14,
    totalSpots: 20,
    courses: ["Cloud Foundations", "AWS Security Specialty", "Azure AZ-500"],
    trackId: "cloud",
    pathId: "aws-security",
  },
  {
    id: 4,
    title: "Enterprise Security Awareness – Q3",
    startDate: "15 Aug 2025",
    endDate: "15 Sep 2025",
    startISO: "2025-08-15T09:00:00",
    endISO: "2025-09-15T18:00:00",
    duration: "1 Month",
    mode: "On-site / Virtual",
    status: "Accepting Organisations",
    statusColor: "#2e6dd2",
    spotsLeft: null,
    totalSpots: null,
    courses: ["Security Awareness Program", "Phishing Simulation", "Policy & Compliance"],
    trackId: "cybersecurity",
    pathId: "cyber101",
  },
];

/* ── Bootcamps ── */
const bootcamps = [
  {
    id: "bc1",
    title: "Cybersecurity Bootcamp — Intensive",
    badge: "🔥 Flagship Bootcamp",
    startDate: "11 Aug 2025",
    endDate: "22 Aug 2025",
    startISO: "2025-08-11T09:00:00",
    endISO: "2025-08-22T18:00:00",
    duration: "2 Weeks",
    dailyHours: "8 hrs/day",
    mode: "Virtual",
    status: "Enrolling Now",
    statusColor: "#dc2626",
    spotsLeft: 12,
    totalSpots: 25,
    price: "₦95,000",
    programs: [
      { id: "intro-cyber", name: "Introduction to Cybersecurity", icon: Shield, desc: "Foundations of cybersecurity — CIA triad, threat actors, attack types, and defence principles.", duration: "2 days" },
      { id: "linux-basics", name: "Linux for Security Professionals", icon: Cpu, desc: "Command-line fundamentals, file system navigation, process management, and basic scripting.", duration: "2 days" },
      { id: "network-sec", name: "Network Security & Protocols", icon: Wifi, desc: "TCP/IP, OSI model, firewalls, IDS/IPS, VPNs, and network traffic analysis with Wireshark.", duration: "3 days" },
      { id: "ethical-hacking-intro", name: "Ethical Hacking Fundamentals", icon: Lock, desc: "Penetration testing methodology, Kali Linux, Nmap, Metasploit basics, and web app attacks.", duration: "3 days" },
    ],
    trackId: "cybersecurity",
    pathId: "bootcamp-cyber",
  },
  {
    id: "bc2",
    title: "Cloud & DevSecOps Bootcamp",
    badge: "☁️ Cloud Track",
    startDate: "8 Sep 2025",
    endDate: "19 Sep 2025",
    startISO: "2025-09-08T09:00:00",
    endISO: "2025-09-19T18:00:00",
    duration: "2 Weeks",
    dailyHours: "8 hrs/day",
    mode: "Virtual",
    status: "Coming Soon",
    statusColor: "#7c3aed",
    spotsLeft: 20,
    totalSpots: 25,
    price: "₦110,000",
    programs: [
      { id: "cloud-foundations", name: "Cloud Foundations", icon: Cloud, desc: "IaaS, PaaS, SaaS concepts, AWS and Azure core services, cloud deployment models.", duration: "2 days" },
      { id: "aws-security", name: "AWS Security Essentials", icon: Shield, desc: "IAM, VPC security, S3 bucket policies, CloudTrail, GuardDuty, and security best practices.", duration: "3 days" },
      { id: "devsecops", name: "DevSecOps & CI/CD Security", icon: Lock, desc: "Integrate security into pipelines — SAST, DAST, container security, and secrets management.", duration: "3 days" },
      { id: "azure-az500", name: "Azure AZ-500 Prep", icon: Database, desc: "Azure identity, platform protection, data security, and security operations overview.", duration: "2 days" },
    ],
    trackId: "cloud",
    pathId: "bootcamp-cloud",
  },
  {
    id: "bc3",
    title: "SOC Analyst Bootcamp",
    badge: "🛡️ Blue Team",
    startDate: "6 Oct 2025",
    endDate: "17 Oct 2025",
    startISO: "2025-10-06T09:00:00",
    endISO: "2025-10-17T18:00:00",
    duration: "2 Weeks",
    dailyHours: "8 hrs/day",
    mode: "Virtual",
    status: "Open Registration",
    statusColor: "#059669",
    spotsLeft: 18,
    totalSpots: 20,
    price: "₦100,000",
    programs: [
      { id: "soc-fundamentals", name: "SOC Fundamentals", icon: Monitor, desc: "SOC roles, tiers, tools, and workflows. Understand how a Security Operations Centre functions.", duration: "2 days" },
      { id: "siem-splunk", name: "SIEM & Splunk", icon: Database, desc: "Log management, event correlation, building dashboards, and investigating alerts in Splunk.", duration: "3 days" },
      { id: "incident-response", name: "Incident Response & Forensics", icon: Shield, desc: "Incident handling lifecycle, evidence collection, memory forensics, and IR playbooks.", duration: "3 days" },
      { id: "threat-intel", name: "Threat Intelligence & Hunting", icon: Lock, desc: "OSINT, threat feeds, IOCs, IOAs, MITRE ATT&CK framework, and proactive threat hunting.", duration: "2 days" },
    ],
    trackId: "cybersecurity",
    pathId: "bootcamp-soc",
  },
];

/* ── Training tracks ── */
const trainingTracks = [
  {
    id: "cybersecurity",
    icon: Lock, title: "Cybersecurity", color: "#1d4ed8", bg: "#eff6ff",
    courses: [
      { id: "cyber101", name: "Cyber Security 101" },
      { id: "ceh", name: "Ethical Hacking & CEH" },
      { id: "soc-l1", name: "SOC Analyst Level 1" },
      { id: "security+", name: "CompTIA Security+" },
      { id: "cissp", name: "CISSP Certification" },
      { id: "red-team", name: "Red Teaming" },
    ],
    deliveryModes: ["Virtual (Live)", "Self-paced", "On-site (Enterprise)"],
    nextStart: "4 Aug 2025",
    durations: ["1 Month", "2 Months", "3 Months", "4 Months"],
  },
  {
    id: "data",
    icon: Database, title: "Data Science", color: "#1d4ed8", bg: "#f0fdfa",
    courses: [
      { id: "python-data", name: "Python for Data Analysis" },
      { id: "ml-fundamentals", name: "Machine Learning Fundamentals" },
      { id: "siem-analytics", name: "Security Analytics & SIEM" },
      { id: "ibm-ds", name: "IBM Data Science Cert Prep" },
    ],
    deliveryModes: ["Virtual (Live)", "Self-paced"],
    nextStart: "1 Sep 2025",
    durations: ["2 Months", "3 Months"],
  },
  {
    id: "cloud",
    icon: Cloud, title: "Cloud Computing", color: "#1d4ed8", bg: "#f5f3ff",
    courses: [
      { id: "cloud-foundations", name: "Cloud Foundations" },
      { id: "aws-security", name: "AWS Security Specialty" },
      { id: "azure-az500", name: "Azure Security AZ-500" },
      { id: "gcp-security", name: "GCP Professional Cloud Security" },
    ],
    deliveryModes: ["Virtual (Live)", "Self-paced"],
    nextStart: "1 Sep 2025",
    durations: ["2 Months", "3 Months", "4 Months"],
  },
  {
    id: "hardware",
    icon: Cpu, title: "Computer Hardware", color: "#1d4ed8", bg: "#fffbeb",
    courses: [
      { id: "comptia-a+", name: "CompTIA A+ Prep" },
      { id: "network+", name: "CompTIA Network+" },
      { id: "iot-security", name: "IoT Security" },
      { id: "server-ccna", name: "Server+ & CCNA Intro" },
    ],
    deliveryModes: ["Virtual (Live)", "Self-paced", "On-site (Enterprise)"],
    nextStart: "4 Aug 2025",
    durations: ["1 Month", "2 Months"],
  },
];

const deliveryInfo = [
  {
    icon: Wifi, title: "Virtual — Live Instructor-Led", color: "#1d4ed8",
    desc: "Scheduled live sessions via video conferencing. Interact with instructors and cohort peers in real time. Sessions are recorded for review.",
    details: ["3–5 live sessions per week", "Real-time Q&A", "Breakout lab sessions", "Recorded for replay"],
  },
  {
    icon: Monitor, title: "Self-Paced Online", color: "#1d4ed8",
    desc: "Pre-recorded modules, lab access, and study materials available 24/7. Progress at your own schedule with async instructor support.",
    details: ["24/7 platform access", "Pre-recorded HD lessons", "Async instructor support", "Certificate on completion"],
  },
  {
    icon: Building, title: "On-site / Blended (Enterprise)", color: "#1d4ed8",
    desc: "We bring the training to your organisation. Customised schedule, on-location delivery, and a dedicated program manager.",
    details: ["Custom location & schedule", "Team progress reports", "On-site lab facilitation", "Executive briefing included"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45 } }),
};

/* ── Cohort card ── */
function CohortCard({ session, index }: { session: typeof upcomingSessions[0]; index: number }) {
  const navigate = useNavigate();
  const now = Date.now();
  const start = new Date(session.startISO).getTime();
  const end = new Date(session.endISO).getTime();
  const isOngoing = now >= start && now < end;
  const isFinished = now >= end;
  const countdown = useCountdown(isOngoing ? session.endISO : session.startISO);

  const handleCourseClick = (courseId: string) => {
    // Find the track that contains this course
    const track = trainingTracks.find(t => t.courses.some(c => c.id === courseId));
    if (track) {
      const el = document.getElementById(`track-${track.id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div custom={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className="bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-[#0a0f1e] font-bold text-base leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>{session.title}</h3>
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 whitespace-nowrap"
            style={{ color: session.statusColor, background: `${session.statusColor}14`, fontFamily: "'DM Sans', sans-serif" }}>
            {isOngoing ? "🟢 Ongoing" : session.status}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1.5"><Calendar size={12} className="text-blue-500" />{session.startDate} — {session.endDate}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} className="text-blue-500" />{session.duration}</span>
          <span className="flex items-center gap-1.5"><Wifi size={12} className="text-blue-500" />{session.mode}</span>
        </div>
        {/* Courses — clickable, navigate to track section */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {session.courses.map((c, ci) => {
            const courseObj = trainingTracks.flatMap(t => t.courses).find(co => co.name === c);
            return (
              <button key={ci} onClick={() => courseObj && handleCourseClick(courseObj.id)}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>{c}</button>
            );
          })}
        </div>
        {!isFinished && (
          <div className="mb-4 p-3 rounded-xl bg-[#f8fafc] border border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {isOngoing ? "Time remaining in program" : "Enrolment closes in"}
            </p>
            <div className="flex items-center gap-2">
              {[{ val: countdown.days, label: "Days" }, { val: countdown.hours, label: "Hrs" }, { val: countdown.minutes, label: "Min" }, { val: countdown.seconds, label: "Sec" }].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 min-w-[40px]">
                  <span className="text-[#0a0f1e] font-bold text-base leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>{String(val).padStart(2, "0")}</span>
                  <span className="text-gray-400 text-[9px] uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {session.spotsLeft !== null && session.totalSpots !== null && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>Spots remaining</span>
              <span className="text-xs font-bold" style={{ color: session.statusColor, fontFamily: "'DM Sans', sans-serif" }}>{session.spotsLeft} / {session.totalSpots} left</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all"
                style={{ width: `${((session.totalSpots - session.spotsLeft) / session.totalSpots) * 100}%`, background: session.statusColor }} />
            </div>
          </div>
        )}
        {session.spotsLeft === null && (
          <p className="text-xs text-gray-400 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Custom capacity based on your organisation size.</p>
        )}
        {/* Register with pre-filled params */}
        <Link to={`/register?trackId=${session.trackId}&pathId=${session.pathId}&cohort=${encodeURIComponent(session.title)}`} className="no-underline">
          <button className="w-full inline-flex items-center justify-center gap-2 bg-[#0a0f1e] hover:bg-blue-900 text-white font-bold text-sm rounded-xl py-2.5 transition-all border-none cursor-pointer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Register for This Cohort <ArrowUpRight size={13} />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Bootcamp card ── */
function BootcampCard({ bootcamp, index }: { bootcamp: typeof bootcamps[0]; index: number }) {
  const navigate = useNavigate();
  const now = Date.now();
  const start = new Date(bootcamp.startISO).getTime();
  const end = new Date(bootcamp.endISO).getTime();
  const isOngoing = now >= start && now < end;
  const isFinished = now >= end;
  const countdown = useCountdown(isOngoing ? bootcamp.endISO : bootcamp.startISO);
  const [expanded, setExpanded] = useState(false);

  const handleProgramClick = (programId: string) => {
    const el = document.getElementById(`program-${programId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <motion.div custom={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className="bg-white rounded-2xl border border-gray-100 hover:border-orange-100 hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500" />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-[10px] font-bold text-orange-500 mb-1 block" style={{ fontFamily: "'DM Sans', sans-serif" }}>{bootcamp.badge}</span>
            <h3 className="text-[#0a0f1e] font-bold text-base leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>{bootcamp.title}</h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 whitespace-nowrap"
            style={{ color: bootcamp.statusColor, background: `${bootcamp.statusColor}14`, fontFamily: "'DM Sans', sans-serif" }}>
            {isOngoing ? "🟢 Ongoing" : bootcamp.status}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1.5"><Calendar size={12} className="text-orange-400" />{bootcamp.startDate} — {bootcamp.endDate}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} className="text-orange-400" />{bootcamp.duration}</span>
          <span className="flex items-center gap-1.5"><Flame size={12} className="text-orange-400" />{bootcamp.dailyHours}</span>
          <span className="flex items-center gap-1.5"><Wifi size={12} className="text-orange-400" />{bootcamp.mode}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#0a0f1e] font-bold text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>{bootcamp.price}</span>
          <span className="text-xs text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>one-time</span>
        </div>

        {/* Programs offered — clickable pills */}
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Programs Offered</p>
          <div className="flex flex-wrap gap-1.5">
            {bootcamp.programs.map((prog, pi) => (
              <button key={pi} onClick={() => setExpanded(true)}
                id={`program-${prog.id}`}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100 cursor-pointer hover:bg-orange-100 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>{prog.name}</button>
            ))}
          </div>
        </div>

        {/* Expand programs */}
        <button onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-blue-600 transition-colors mb-4 bg-transparent border-none cursor-pointer p-0"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <ChevronDown size={13} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Hide program details" : "View program details"}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}
              className="overflow-hidden">
              <div className="space-y-3 mb-4">
                {bootcamp.programs.map((prog, pi) => (
                  <div key={pi} id={`program-${prog.id}`}
                    className="flex gap-3 p-3 rounded-xl bg-[#f8fafc] border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                      <prog.icon size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-[#0a0f1e] font-semibold text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{prog.name}</p>
                        <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{prog.duration}</span>
                      </div>
                      <p className="text-gray-500 text-[11px] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{prog.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Countdown */}
        {!isFinished && (
          <div className="mb-4 p-3 rounded-xl bg-orange-50 border border-orange-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {isOngoing ? "Bootcamp ends in" : "Bootcamp starts in"}
            </p>
            <div className="flex items-center gap-2">
              {[{ val: countdown.days, label: "Days" }, { val: countdown.hours, label: "Hrs" }, { val: countdown.minutes, label: "Min" }, { val: countdown.seconds, label: "Sec" }].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center bg-white border border-orange-100 rounded-lg px-2.5 py-1.5 min-w-[40px]">
                  <span className="text-[#0a0f1e] font-bold text-base leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>{String(val).padStart(2, "0")}</span>
                  <span className="text-orange-400 text-[9px] uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {bootcamp.spotsLeft !== null && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-400">Spots remaining</span>
              <span className="text-xs font-bold" style={{ color: bootcamp.statusColor }}>{bootcamp.spotsLeft} / {bootcamp.totalSpots} left</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${((bootcamp.totalSpots - bootcamp.spotsLeft) / bootcamp.totalSpots) * 100}%`, background: bootcamp.statusColor }} />
            </div>
          </div>
        )}

        <Link to={`/register?trackId=${bootcamp.trackId}&pathId=${bootcamp.pathId}&bootcamp=${encodeURIComponent(bootcamp.title)}`} className="no-underline">
          <button className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold text-sm rounded-xl py-2.5 transition-all border-none cursor-pointer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Register for Bootcamp <ArrowUpRight size={13} />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════ */
const Training = () => {
  const [openTrack, setOpenTrack] = useState<number | null>(0);
  const [scheduleTab, setScheduleTab] = useState<"cohorts" | "bootcamps">("cohorts");

  const now = Date.now();
  const programStart = new Date(nextCohort.startISO).getTime();
  const programEnd = new Date(nextCohort.endISO).getTime();
  const isOngoing = now >= programStart && now < programEnd;
  const bannerTarget = isOngoing ? nextCohort.endISO : nextCohort.startISO;
  const banner = useCountdown(bannerTarget);

  return (
    <Layout>
      <div className="w-full overflow-x-hidden">

        {/* ── HERO ── */}
        <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[480px]">
            <img src={heroImage} alt="Training" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/80" />
            <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[340px] lg:min-h-[480px] px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 pt-20 sm:pt-28">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Training Programs</span>
                </div>
                <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                  Your Next Cohort<br />
                  <span className="text-blue-400">Starts Soon.</span>
                </h1>
                <p className="text-white/65 text-base sm:text-lg max-w-xl leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Structured training in cybersecurity, data science, cloud computing, and hardware. Live instructor-led cohorts, flexible pricing, and globally recognised certifications.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/register" className="no-underline">
                    <button className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-full px-7 py-3 transition-all active:scale-95 border-none cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Register for Next Cohort
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/25 shrink-0">
                        <ArrowUpRight size={13} className="text-white" />
                      </span>
                    </button>
                  </Link>
                  <a href="#schedule" className="no-underline">
                    <button className="inline-flex items-center gap-2 border border-white/30 text-white/80 hover:bg-white/10 rounded-full font-bold text-sm px-7 py-3 transition-all bg-transparent cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      View Schedule <Calendar size={14} />
                    </button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── COUNTDOWN BANNER ── */}
        <section className="bg-blue-600 py-5 sm:py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Bell size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {isOngoing ? <>Program in progress · <span className="text-yellow-300">Ends {nextCohort.endDate}</span></> : <>Next Cohort Starts: <span className="text-yellow-300">{nextCohort.startDate}</span></>}
                  </p>
                  <p className="text-white/70 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {isOngoing ? `Orientation was ${nextCohort.orientation}` : `Application deadline: ${nextCohort.applicationDeadline} · Orientation: ${nextCohort.orientation}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {[{ val: banner.days, label: "Days" }, { val: banner.hours, label: "Hrs" }, { val: banner.minutes, label: "Min" }, { val: banner.seconds, label: "Sec" }].map(({ val, label }) => (
                    <div key={label} className="flex flex-col items-center bg-white/20 rounded-lg px-3 py-1.5 min-w-[44px]">
                      <span className="text-white font-bold text-lg leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>{String(val).padStart(2, "0")}</span>
                      <span className="text-white/60 text-[9px] uppercase tracking-widest">{label}</span>
                    </div>
                  ))}
                </div>
                <Link to="/register" className="no-underline">
                  <button className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-300 hover:text-blue-900 font-bold text-xs rounded-full px-5 py-2.5 transition-all border-none cursor-pointer"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Secure Your Spot <ArrowUpRight size={12} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FLAGSHIP PROGRAM ── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
            <div className="rounded-3xl overflow-hidden border border-blue-100 shadow-lg shadow-blue-50">
              <div className="bg-gradient-to-br from-[#0a0f1e] via-[#0d1530] to-[#0a1628] p-8 sm:p-10 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
                      <span className="text-yellow-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Flagship Program</span>
                    </div>
                    <h2 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                      BYTITUDE Cybersecurity<br /><span className="text-blue-400">Flagship Training</span>
                    </h2>
                    <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-6 max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      A 12-week, instructor-led program designed for beginners and IT professionals who want practical, job-ready skills.
                    </p>
                    <div className="space-y-2.5 mb-6">
                      {flagship.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle size={9} className="text-blue-400" />
                          </div>
                          <span className="text-white/70 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{h}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {flagship.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-white/60 border border-white/10"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}>{tag}</span>
                      ))}
                    </div>
                    <Link to="/register?trackId=cybersecurity&pathId=cissp&program=flagship" className="no-underline">
                      <button className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-full px-7 py-3.5 transition-all active:scale-95 border-none cursor-pointer"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Enrol in Flagship Program
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/25 shrink-0">
                          <ArrowUpRight size={13} />
                        </span>
                      </button>
                    </Link>
                  </div>
                  <div className="w-full lg:w-72 space-y-3 shrink-0">
                    {[
                      { icon: Clock, label: "Duration", value: "12 Weeks" },
                      { icon: Wifi, label: "Format", value: "Online (Live Sessions)" },
                      { icon: Users, label: "Cohort Size", value: "15 learners (personalised)" },
                      { icon: Calendar, label: "Next Start", value: nextCohort.startDate },
                      { icon: Shield, label: "Instructors", value: "CISSP, CSSLP, Security+ certified" },
                    ].map(({ icon: Icon, label, value }, i) => (
                      <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                          <Icon size={14} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white/40 text-[10px] uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
                          <p className="text-white font-semibold text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{value}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                      <Zap size={14} className="text-yellow-400 shrink-0" />
                      <p className="text-yellow-300 text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Flexible payment options available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SCHEDULE (COHORTS + BOOTCAMPS) ── */}
        <section id="schedule" className="py-16 sm:py-24 bg-[#f8fafc]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Schedule</span>
                </div>
                <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Training Schedule</h2>
                <p className="text-gray-400 text-sm mt-2 max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Live cohort-based programs and intensive bootcamps. Reserve your spot before the deadline.
                </p>
              </div>
              <Link to="/register" className="no-underline shrink-0">
                <button className="inline-flex items-center gap-2 bg-[#0a0f1e] hover:bg-blue-900 text-white font-bold text-sm rounded-full pl-5 pr-2 py-2.5 border-none cursor-pointer transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Request Training
                  <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <ArrowUpRight size={12} className="text-white" />
                  </span>
                </button>
              </Link>
            </div>

            {/* Tab toggle */}
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-sm w-fit mb-8">
              <button
                onClick={() => setScheduleTab("cohorts")}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all border-none cursor-pointer ${scheduleTab === "cohorts" ? "bg-[#0a0f1e] text-white shadow" : "text-gray-500 bg-transparent hover:text-gray-800"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Upcoming Cohorts
              </button>
              <button
                onClick={() => setScheduleTab("bootcamps")}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all border-none cursor-pointer flex items-center gap-2 ${scheduleTab === "bootcamps" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow" : "text-gray-500 bg-transparent hover:text-gray-800"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <Flame size={13} />
                Bootcamps
              </button>
            </div>

            <AnimatePresence mode="wait">
              {scheduleTab === "cohorts" && (
                <motion.div key="cohorts" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {upcomingSessions.map((session, i) => (
                    <CohortCard key={session.id} session={session} index={i} />
                  ))}
                </motion.div>
              )}
              {scheduleTab === "bootcamps" && (
                <motion.div key="bootcamps" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                  {/* Bootcamp intro */}
                  <div className="mb-6 p-5 rounded-2xl border border-orange-100 bg-orange-50 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                      <Flame size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-[#0a0f1e] font-bold text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>What is a Bootcamp?</h3>
                      <p className="text-gray-600 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Bootcamps are intensive 2-week programs with 8 hours of daily live instruction. They're designed for people who want to learn fast and go deep on a specific topic. Each bootcamp covers multiple programs (courses) packed into a structured daily schedule.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {bootcamps.map((bc, i) => (
                      <BootcampCard key={bc.id} bootcamp={bc} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── TRAINING TRACKS ── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Curriculum</span>
              </div>
              <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Training Tracks</h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Four specialised tracks with multiple courses and flexible delivery options. Click a course to explore it.
              </p>
            </div>

            <div className="space-y-3">
              {trainingTracks.map((track, i) => (
                <motion.div key={i} id={`track-${track.id}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:border-blue-100 transition-colors">
                  <button
                    onClick={() => setOpenTrack(openTrack === i ? null : i)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left cursor-pointer bg-transparent border-none">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: track.bg, border: `1px solid ${track.color}20` }}>
                      <track.icon size={20} style={{ color: track.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-[#0a0f1e] font-bold text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>{track.title}</h3>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                          style={{ color: track.color, background: `${track.color}10`, fontFamily: "'DM Sans', sans-serif" }}>
                          {track.courses.length} Courses
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        <Calendar size={10} /> Next start: {track.nextStart}
                        <span className="mx-1 text-gray-300">·</span>
                        {track.durations.join(" / ")}
                      </p>
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 shrink-0 ${openTrack === i ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {openTrack === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}>
                        <div className="px-6 pb-6 border-t border-gray-50">
                          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="sm:col-span-2">
                              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Courses in This Track</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {track.courses.map((c, ci) => (
                                  <div key={ci} id={`course-${c.id}`}
                                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#f8fafc] border border-gray-50 hover:border-blue-100 hover:bg-blue-50 transition-colors cursor-pointer group"
                                    onClick={() => {
                                      const el = document.getElementById(`course-${c.id}`);
                                      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                                    }}>
                                    <CheckCircle size={13} style={{ color: track.color }} className="shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-[#0a0f1e] text-sm group-hover:text-blue-700 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Delivery Options</p>
                              <div className="space-y-2 mb-4">
                                {track.deliveryModes.map((m, mi) => (
                                  <div key={mi} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: track.color }} />
                                    <span className="text-gray-600 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{m}</span>
                                  </div>
                                ))}
                              </div>
                              <Link to={`/register?trackId=${track.id}`} className="no-underline">
                                <button className="w-full inline-flex items-center justify-center gap-2 text-white font-bold text-sm rounded-xl py-2.5 transition-all border-none cursor-pointer"
                                  style={{ background: track.color, fontFamily: "'DM Sans', sans-serif" }}>
                                  Enrol Now <ArrowUpRight size={13} />
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DELIVERY MODES ── */}
        <section className="py-16 sm:py-24 bg-[#0a0f1e]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-[1200px]">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>How It Works</span>
              </div>
              <h2 className="text-white font-bold text-3xl sm:text-4xl" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Delivery Options</h2>
              <p className="text-white/50 text-sm mt-2 max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Whether you prefer live instruction, self-paced learning, or on-site corporate training, we have a format for you.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {deliveryInfo.map((d, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="rounded-2xl p-7 border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${d.color}20`, border: `1px solid ${d.color}30` }}>
                    <d.icon size={22} style={{ color: d.color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{d.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{d.desc}</p>
                  <div className="space-y-2">
                    {d.details.map((dt, di) => (
                      <div key={di} className="flex items-center gap-2.5">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${d.color}25`, border: `1px solid ${d.color}40` }}>
                          <CheckCircle size={9} style={{ color: d.color }} />
                        </span>
                        <span className="text-white/65 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{dt}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-white font-bold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
              Don't Miss the Next Cohort
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto mb-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Spots fill fast. Register now to secure your place in the next cohort starting{" "}
              <strong className="text-white">{nextCohort.startDate}</strong>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/register" className="no-underline w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-blue-700 hover:bg-blue-200 hover:text-blue-900 font-bold text-sm rounded-full px-8 py-3.5 transition-all border-none cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Register Now <ArrowUpRight size={15} />
                </button>
              </Link>
              <Link to="/contact" className="no-underline w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 rounded-full font-bold text-sm px-8 py-3.5 transition-all bg-transparent cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Request Organisation Training
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Training;