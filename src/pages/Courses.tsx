import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search, Lock, Cloud, Database, Cpu, ArrowUpRight,
  CheckCircle, Clock, Layers, Award,
  Shield, Filter, X, BookOpen, GraduationCap, Users, Zap, Star,
} from "lucide-react";
import Layout from "@/components/Layout";
import { LucideIcon } from "lucide-react";

import heroImage from "/images/byte.jpeg";

/* ─── Fade-up variant ─────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.45 } }),
};

/* ─── Types ───────────────────────────────────────────────────────── */
interface Module {
  name:   string;
  topics: string[];
}
interface Course {
  id:             string;
  icon:           LucideIcon
  category:       string;
  level:          "Beginner" | "Intermediate" | "Advanced";
  tag:            string | null;
  title:          string;
  tagline:        string;
  duration:       string;
  hours:          number;
  moduleCount:    number;
  color:          string;
  bg:             string;
  image:          string;
  rating:         number;
  students:       string;
  overview:       string;
  outcomes:       string[];
  certifications: string[];
  modules:        Module[];
  link:           string;
}

/* ─── Course data ─────────────────────────────────────────────────── */
const allCourses: Course[] = [
  {
    id: "cyber-101",
    icon: Shield,
    category: "Cybersecurity",
    level: "Beginner",
    tag: null,
    title: "Cyber Security 101",
    tagline: "Foundation to cybersecurity fundamentals",
    duration: "4–6 weeks",
    hours: 40,
    moduleCount: 12,
    color: "#1d4ed8",
    bg: "#eff6ff",
    image: "/images/byte.jpeg",
    rating: 4.9,
    students: "1,200+",
    overview: "A comprehensive introduction to cybersecurity concepts designed for absolute beginners. You'll learn the fundamentals of networking, encryption, and security principles that underpin every specialist track.",
    outcomes: ["Understand core cybersecurity concepts and the CIA Triad", "Set up and navigate Linux and Windows security environments", "Grasp foundational cryptography and authentication principles", "Identify common attack vectors and defense strategies"],
    certifications: ["CompTIA Security+ (prep)", "eJPT"],
    modules: [
      { name: "Foundations of Cybersecurity", topics: ["CIA Triad & Security Concepts", "Networking Basics (TCP/IP, DNS, HTTP)", "Linux & Windows Security Fundamentals", "Cryptography Essentials", "Authentication & Access Control"] },
      { name: "Threat Landscape", topics: ["Common Attack Types (Phishing, Malware, MITM)", "Social Engineering Techniques", "Vulnerability vs Exploit", "OWASP Top 10 Overview"] },
      { name: "Defensive Basics", topics: ["Firewalls & IDS/IPS", "Security Policies & Best Practices", "Patch Management", "Incident Reporting Fundamentals"] },
    ],
    link: "/courses/cybersecurity",
  },
  {
    id: "ceh",
    icon: Lock,
    category: "Cybersecurity",
    level: "Intermediate",
    tag: "BESTSELLER",
    title: "Ethical Hacking & CEH",
    tagline: "Certified Ethical Hacker preparation",
    duration: "6–8 weeks",
    hours: 60,
    moduleCount: 16,
    color: "#4f46e5",
    bg: "#eef2ff",
    image: "/images/byt.jpeg",
    rating: 4.9,
    students: "2,400+",
    overview: "Master offensive security techniques used by real-world ethical hackers. This course prepares you for the EC-Council Certified Ethical Hacker exam while giving you practical lab experience with Metasploit, Nmap, and real exploitation scenarios.",
    outcomes: ["Perform real penetration tests end-to-end", "Use Metasploit, Burp Suite, and Nmap professionally", "Exploit web application vulnerabilities", "Pass the CEH (Certified Ethical Hacker) exam"],
    certifications: ["CEH (EC-Council)", "eJPT", "CompTIA PenTest+"],
    modules: [
      { name: "Reconnaissance & OSINT", topics: ["Passive Recon Techniques", "Google Dorking & OSINT Framework", "Shodan, Maltego & Recon-ng", "Target Profiling"] },
      { name: "Scanning & Enumeration", topics: ["Nmap & Masscan", "Vulnerability Scanning (Nessus, OpenVAS)", "Service & OS Fingerprinting", "Network Mapping"] },
      { name: "Exploitation", topics: ["Metasploit Framework Mastery", "Payload Creation & Delivery", "Privilege Escalation (Linux & Windows)", "Post-Exploitation & Persistence"] },
      { name: "Web App Attacks", topics: ["SQL Injection (Manual & Automated)", "Cross-Site Scripting (XSS)", "CSRF & SSRF", "Burp Suite Professional"] },
      { name: "CEH Exam Preparation", topics: ["EC-Council Exam Blueprint", "500+ Practice Questions", "Mock Exams & Review", "Exam Day Strategy"] },
    ],
    link: "/courses/cybersecurity",
  },
  {
    id: "soc",
    icon: Shield,
    category: "Cybersecurity",
    level: "Beginner",
    tag: null,
    title: "SOC Analyst Level 1",
    tagline: "Build your Security Operations Centre skills",
    duration: "4–5 weeks",
    hours: 35,
    moduleCount: 10,
    color: "#4f46e5",
    bg: "#f0fdfa",
    image: "/images/office.png",
    rating: 4.8,
    students: "980+",
    overview: "Learn to monitor, detect, and respond to security incidents from inside a Security Operations Centre. You'll work with real SIEM tools like Splunk, analyze threat intelligence feeds, and build playbooks for incident response.",
    outcomes: ["Monitor security alerts using Splunk and QRadar", "Perform triage and escalation of security incidents", "Build and follow incident response playbooks", "Understand threat intelligence feeds and IOCs"],
    certifications: ["CompTIA CySA+", "IBM QRadar SIEM"],
    modules: [
      { name: "SOC Fundamentals", topics: ["SOC Tiers & Roles", "Alert Triage Process", "SIEM Overview", "Log Management Basics"] },
      { name: "SIEM & Log Analysis", topics: ["Splunk Search & Queries", "QRadar Event Correlation", "Log Source Configuration", "Creating Dashboards & Reports"] },
      { name: "Incident Response", topics: ["Incident Response Lifecycle", "Playbook Creation", "Evidence Collection", "Escalation Procedures"] },
    ],
    link: "/courses/cybersecurity",
  },
  {
    id: "security-plus",
    icon: Award,
    category: "Cybersecurity",
    level: "Intermediate",
    tag: null,
    title: "CompTIA Security+",
    tagline: "Global entry-level security certification",
    duration: "5–6 weeks",
    hours: 45,
    moduleCount: 14,
    color: "#4f46e5",
    bg: "#fef2f2",
    image: "/images/hero-home.jpg",
    rating: 4.7,
    students: "3,100+",
    overview: "CompTIA Security+ is the world's most widely adopted entry-level cybersecurity certification. This course follows the SY0-701 exam objectives and combines video content, flashcards, and exam simulation to maximise your pass rate.",
    outcomes: ["Achieve 90%+ score on CompTIA Security+ SY0-701", "Understand governance, risk, and compliance (GRC)", "Configure secure network architectures", "Apply cryptographic solutions in real scenarios"],
    certifications: ["CompTIA Security+ SY0-701"],
    modules: [
      { name: "Threats, Attacks & Vulnerabilities", topics: ["Malware Types & Behaviours", "Social Engineering", "Application & Network Attacks", "Zero-Day Vulnerabilities"] },
      { name: "Architecture & Design", topics: ["Enterprise Security Architecture", "Virtualisation & Cloud Security", "Identity & Access Management", "Zero Trust Principles"] },
      { name: "Exam Simulation", topics: ["5 Full Practice Exams", "Performance-Based Questions", "Weakness Analysis", "Last-Minute Review Sheets"] },
    ],
    link: "/courses/cybersecurity",
  },
  {
    id: "cloud-aws",
    icon: Cloud,
    category: "Cloud",
    level: "Intermediate",
    tag: "HOT",
    title: "Cloud Security (AWS)",
    tagline: "Secure AWS infrastructure at enterprise scale",
    duration: "5–7 weeks",
    hours: 50,
    moduleCount: 13,
    color: "#4f46e5",
    bg: "#f5f3ff",
    image: "/images/byt.jpeg",
    rating: 4.8,
    students: "1,650+",
    overview: "Go from cloud beginner to certified cloud security architect. Learn how to deploy, monitor, and lock down AWS infrastructure with IAM, GuardDuty, CloudTrail, and modern DevSecOps pipelines — then pass the AWS Security Specialty exam.",
    outcomes: ["Deploy secure AWS infrastructure using IaC", "Implement zero-trust access with IAM & SCP", "Pass AWS Security Specialty (SCS-C02)", "Build a DevSecOps CI/CD pipeline"],
    certifications: ["AWS Solutions Architect Associate", "AWS Security Specialty SCS-C02"],
    modules: [
      { name: "AWS Core Services", topics: ["EC2, S3, VPC & IAM Foundations", "Networking (Route 53, CloudFront)", "RDS & Database Security", "Cost Management"] },
      { name: "Cloud Security Architecture", topics: ["IAM Policies & Permission Boundaries", "AWS Organizations & SCPs", "Data Encryption (KMS, ACM)", "Zero Trust Architecture on AWS"] },
      { name: "Monitoring & Incident Response", topics: ["CloudTrail & CloudWatch", "GuardDuty Threat Detection", "Security Hub Aggregation", "Automated Remediation with Lambda"] },
    ],
    link: "/courses/cloud-computing",
  },
  {
    id: "red-team",
    icon: Lock,
    category: "Cybersecurity",
    level: "Advanced",
    tag: null,
    title: "Red Teaming",
    tagline: "Advanced adversary simulation techniques",
    duration: "8–10 weeks",
    hours: 70,
    moduleCount: 18,
    color: "#4f46e5",
    bg: "#fef2f2",
    image: "/images/laps.png",
    rating: 4.9,
    students: "620+",
    overview: "Advanced offensive security for seasoned practitioners. Learn adversary simulation, C2 framework operations, Active Directory attacks, and covert operation techniques used by real nation-state actors.",
    outcomes: ["Operate Cobalt Strike and open-source C2 frameworks", "Compromise Active Directory environments", "Bypass modern EDR and AV solutions", "Write professional red team engagement reports"],
    certifications: ["OSCP", "CRTO (Certified Red Team Operator)"],
    modules: [
      { name: "C2 Framework Operations", topics: ["Cobalt Strike Fundamentals", "Custom Beacon Profiles", "Open-Source C2 (Havoc, Sliver)", "Listener & Payload Management"] },
      { name: "Active Directory Attacks", topics: ["Kerberoasting & AS-REP Roasting", "Pass-the-Hash & Pass-the-Ticket", "DCSync & Golden/Silver Tickets", "LAPS & BloodHound"] },
      { name: "Evasion & Persistence", topics: ["AV/EDR Bypass Techniques", "Living-off-the-Land (LOLBins)", "Persistence Mechanisms", "Covering Tracks"] },
    ],
    link: "/courses/cybersecurity",
  },
  {
    id: "data-science",
    icon: Database,
    category: "Data Science",
    level: "Intermediate",
    tag: null,
    title: "Data Science for Security",
    tagline: "ML-powered threat detection & analytics",
    duration: "6–8 weeks",
    hours: 55,
    moduleCount: 15,
    color: "#4f46e5",
    bg: "#f0fdfa",
    image: "/images/byte.jpeg",
    rating: 4.8,
    students: "890+",
    overview: "Apply machine learning and data science to real cybersecurity problems. Build anomaly detection models, automate threat intelligence with Python, and create security dashboards — while earning IBM and Google data certifications.",
    outcomes: ["Build anomaly detection models from scratch", "Automate threat intelligence with Python", "Create real-time security dashboards in Tableau", "Earn IBM Data Science Professional Certificate"],
    certifications: ["IBM Data Science Professional Certificate", "Google Data Analytics"],
    modules: [
      { name: "Python for Security Analytics", topics: ["Python & Jupyter Notebooks", "Pandas for Log Analysis", "API Data Collection", "Threat Feed Automation"] },
      { name: "Machine Learning Applied", topics: ["Supervised & Unsupervised Learning", "Anomaly Detection in Network Traffic", "Intrusion Detection with Scikit-learn", "Feature Engineering for Security Data"] },
      { name: "Dashboards & Reporting", topics: ["Tableau Security Dashboards", "Power BI for SIEM Reporting", "Real-time Alert Visualisation", "Executive Security Reports"] },
    ],
    link: "/courses/data-science",
  },
  {
    id: "network-plus",
    icon: Cpu,
    category: "Hardware",
    level: "Beginner",
    tag: null,
    title: "CompTIA Network+",
    tagline: "Network fundamentals for IT professionals",
    duration: "4–5 weeks",
    hours: 38,
    moduleCount: 11,
    color: "#4f46e5",
    bg: "#f5f3ff",
    image: "/images/byt.jpeg",
    rating: 4.7,
    students: "2,200+",
    overview: "Master the networking fundamentals that underpin every IT role. This course prepares you for CompTIA Network+ N10-009 with hands-on labs covering routing, switching, wireless security, and network troubleshooting.",
    outcomes: ["Configure and troubleshoot enterprise networks", "Understand routing protocols (OSPF, BGP, EIGRP)", "Secure wireless networks to industry standards", "Pass CompTIA Network+ N10-009"],
    certifications: ["CompTIA Network+ N10-009"],
    modules: [
      { name: "Networking Fundamentals", topics: ["OSI & TCP/IP Models", "IP Addressing & Subnetting", "Routing & Switching Basics", "DNS, DHCP & NAT"] },
      { name: "Network Security", topics: ["Firewall Configuration", "VPN Technologies", "Wireless Security (WPA3)", "Network Access Control"] },
      { name: "Troubleshooting", topics: ["Network Troubleshooting Methodology", "Wireshark Packet Analysis", "Common Issues & Resolutions", "Network+ Exam Prep"] },
    ],
    link: "/courses/computer-hardware",
  },
  {
    id: "cissp",
    icon: Award,
    category: "Cybersecurity",
    level: "Advanced",
    tag: "PREMIUM",
    title: "CISSP Certification",
    tagline: "The gold standard in information security",
    duration: "10–12 weeks",
    hours: 80,
    moduleCount: 20,
    color: "#4f46e5",
    bg: "#eff6ff",
    image: "/images/office.png",
    rating: 4.9,
    students: "540+",
    overview: "CISSP is the world's most prestigious cybersecurity certification. This advanced program covers all 8 CISSP domains — from security & risk management to software development security — with a focus on managerial and architectural thinking.",
    outcomes: ["Master all 8 ISC² CISSP domains", "Apply enterprise risk management frameworks", "Design security architectures at the enterprise level", "Pass the CISSP adaptive exam with confidence"],
    certifications: ["CISSP (ISC²)"],
    modules: [
      { name: "Security & Risk Management", topics: ["Security Governance Principles", "Legal, Regulatory & Compliance", "Risk Management Framework", "Business Continuity Planning"] },
      { name: "Asset Security & Architecture", topics: ["Data Classification & Ownership", "Security Engineering Principles", "Cryptography in Depth", "Physical Security Controls"] },
      { name: "Identity & Access Management", topics: ["IAM Models & Concepts", "Authentication Technologies", "Federated Identity & SSO", "Privileged Access Management"] },
      { name: "Security Assessment & Testing", topics: ["Vulnerability Assessment Methodologies", "Penetration Testing in CISSP Context", "Log Review & Monitoring", "Disaster Recovery Testing"] },
      { name: "CISSP Exam Simulation", topics: ["CAT (Computerized Adaptive Testing) Strategy", "6 Full Mock Exams", "Domain Weakness Analysis", "Exam-Day Mindset & Techniques"] },
    ],
    link: "/courses/cybersecurity",
  },
];

const categories = ["All", "Cybersecurity", "Cloud", "Data Science", "Hardware"];
const levels     = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const levelColors: Record<string, string> = {
  Beginner:     "bg-green-100 text-green-800",
  Intermediate: "bg-amber-100 text-amber-800",
  Advanced:     "bg-red-100 text-red-800",
};

/* ─── Course Card — no price ──────────────────────────────────────── */
const CourseCard = ({ course, i, onExpand }: { course: Course; i: number; onExpand: (id: string) => void }) => (
  <motion.div
    custom={i}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
  >
    {/* Top — background image */}
    <div className="relative h-48 overflow-hidden">
      <img
        src={course.image}
        alt={course.title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/60" />

      {course.tag && (
        <div className="absolute top-4 left-4 z-10">
          <span
            className="text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-2.5 py-1 rounded-full border border-white/30"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            ✦ {course.tag}
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-5 pb-4">
        <span
          className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${levelColors[course.level]}`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {course.level}
        </span>
        <div className="flex items-center gap-1.5">
          <Star size={11} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{course.rating}</span>
          <span className="text-white/60 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>({course.students})</span>
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <span
        className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
        style={{ color: course.color, fontFamily: "'DM Sans', sans-serif" }}
      >
        {course.category}
      </span>
      <h3
        className="text-[#0a0f1e] font-bold text-lg leading-snug mb-1"
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}
      >
        {course.title}
      </h3>
      <p className="text-gray-400 text-xs mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>{course.tagline}</p>

      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center gap-1.5 text-gray-400 text-xs"><Clock size={11} /> {course.hours}h</span>
        <span className="flex items-center gap-1.5 text-gray-400 text-xs"><Layers size={11} /> {course.moduleCount} modules</span>
        <span className="flex items-center gap-1.5 text-gray-400 text-xs"><Clock size={11} /> {course.duration}</span>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {course.overview.slice(0, 120)}…
      </p>

      {/* Certification pills */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {course.certifications.map((cert) => (
          <span
            key={cert}
            className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
            style={{ color: course.color, borderColor: `${course.color}30`, background: course.bg, fontFamily: "'DM Sans', sans-serif" }}
          >
            {cert}
          </span>
        ))}
      </div>

      {/* Footer — no price, just actions */}
      <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-50">
        <button
          onClick={() => onExpand(course.id)}
          className="text-xs font-bold uppercase tracking-widest border border-gray-200 rounded-full px-3 py-1.5 hover:border-gray-400 transition-colors cursor-pointer bg-white"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#374151" }}
        >
          Details
        </button>
        <Link to="/register" className="no-underline">
          <button
            className="inline-flex items-center gap-1.5 text-white text-xs font-bold rounded-full px-4 py-1.5 border-none cursor-pointer"
            style={{ background: course.color, fontFamily: "'DM Sans', sans-serif" }}
          >
            Enroll <ArrowUpRight size={11} />
          </button>
        </Link>
      </div>
    </div>
  </motion.div>
);

/* ─── Expanded course detail panel ───────────────────────────────── */
const CourseDetail = ({ course, onClose }: { course: Course; onClose: () => void }) => {
  const [activeModule, setActiveModule] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border-2 overflow-hidden bg-white mb-8"
      style={{ borderColor: `${course.color}30` }}
    >
      {/* Header — real image background */}
      <div className="relative px-8 sm:px-10 py-8 overflow-hidden">
        <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/72" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-2 block" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {course.category} · {course.level}
            </span>
            <h2 className="text-white font-bold text-2xl sm:text-3xl mb-1" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
              {course.title}
            </h2>
            <p className="text-white/70 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{course.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center border-none cursor-pointer shrink-0 transition-colors ml-4"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-6 mt-5">
          {[
            { icon: Clock,  val: `${course.hours}h total`        },
            { icon: Layers, val: `${course.moduleCount} modules` },
            { icon: Clock,  val: course.duration                  },
            { icon: Star,   val: `${course.rating} rated`         },
            { icon: Users,  val: `${course.students} enrolled`    },
          ].map(({ icon: Icon, val }, j) => (
            <span key={j} className="flex items-center gap-1.5 text-white/80 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <Icon size={12} /> {val}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-2 p-8 border-b lg:border-b-0 lg:border-r border-gray-100 bg-[#f8fafc]">
          <h3 className="text-[#0a0f1e] font-bold text-base mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Course Overview</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 pb-6 border-b border-gray-100" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {course.overview}
          </p>
          <h3 className="text-[#0a0f1e] font-bold text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>What You'll Gain</h3>
          <ul className="space-y-2.5 mb-6 pb-6 border-b border-gray-100">
            {course.outcomes.map((o, j) => (
              <li key={j} className="flex items-start gap-2.5">
                <CheckCircle size={14} style={{ color: course.color }} className="shrink-0 mt-0.5" />
                <span className="text-gray-600 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{o}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-[#0a0f1e] font-bold text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Certifications</h3>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {course.certifications.map((cert) => (
              <span key={cert} className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                style={{ color: course.color, borderColor: `${course.color}30`, background: `${course.color}08`, fontFamily: "'DM Sans', sans-serif" }}>
                {cert}
              </span>
            ))}
          </div>
          <h3 className="text-[#0a0f1e] font-bold text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Modules</h3>
          <div className="space-y-2">
            {course.modules.map((mod, mi) => (
              <button
                key={mi}
                onClick={() => setActiveModule(mi)}
                className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer border"
                style={{ background: activeModule === mi ? `${course.color}08` : "white", borderColor: activeModule === mi ? `${course.color}30` : "#f3f4f6" }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{ background: activeModule === mi ? course.color : "#f3f4f6", color: activeModule === mi ? "white" : "#6b7280", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {mi + 1}
                </span>
                <span className="text-[#0a0f1e] text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{mod.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${course.id}-${activeModule}`}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: course.color, fontFamily: "'DM Sans', sans-serif" }}>
                Module {activeModule + 1}
              </p>
              <h4 className="text-[#0a0f1e] font-bold text-xl mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {course.modules[activeModule].name}
              </h4>
              <p className="text-gray-400 text-sm mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Topics covered in this module:</p>
              <div className="space-y-2.5 mb-6">
                {course.modules[activeModule].topics.map((topic, ti) => (
                  <motion.div
                    key={ti}
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ti * 0.06 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-50 bg-[#f8fafc]"
                  >
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${course.color}12`, border: `1px solid ${course.color}20` }}
                    >
                      <CheckCircle size={14} style={{ color: course.color }} />
                    </span>
                    <span className="text-[#0a0f1e] text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{topic}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-5 border-t border-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
                <div className="flex items-center gap-3">
                  <Link to={course.link} className="no-underline">
                    <button className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full border border-gray-200 text-[#0a0f1e] hover:border-gray-400 transition-all bg-white cursor-pointer" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      View Full Course
                    </button>
                  </Link>
                  <Link to="/register" className="no-underline">
                    <button className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full text-white border-none cursor-pointer transition-all active:scale-95"
                      style={{ background: course.color, fontFamily: "'DM Sans', sans-serif" }}>
                      Enroll Now <ArrowUpRight size={14} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
const Courses = () => {
  const [search,         setSearch]   = useState("");
  const [activeCategory, setCategory] = useState("All");
  const [activeLevel,    setLevel]    = useState("All Levels");
  const [expandedId,     setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return allCourses.filter((c) => {
      const matchCat    = activeCategory === "All" || c.category === activeCategory;
      const matchLevel  = activeLevel === "All Levels" || c.level === activeLevel;
      const matchSearch = !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.tagline.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchLevel && matchSearch;
    });
  }, [search, activeCategory, activeLevel]);

  const expandedCourse = expandedId ? allCourses.find((c) => c.id === expandedId) ?? null : null;

  const handleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
    setTimeout(() => {
      document.getElementById(`course-detail-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <Layout>

      {/* ── 1. HERO ── */}
      <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[420px] lg:min-h-[500px]">
          <img
            src={heroImage}
            alt="BYTITUDE Courses"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/80" />

          <div className="relative z-10 flex flex-col justify-end h-full min-h-[320px] sm:min-h-[420px] lg:min-h-[500px] px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 pt-20 sm:pt-28">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>All Courses</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white font-bold leading-tight mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(38px, 6.5vw, 82px)" }}
            >
              Our Courses
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="text-white/70 max-w-sm sm:max-w-lg leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}
            >
              Industry-recognised cybersecurity training — from beginner fundamentals to advanced red teaming. Every course includes hands-on labs and a clear path to certification.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3 max-w-lg w-full mb-6"
            >
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses…"
                  className="w-full pl-11 pr-10 py-3 rounded-full text-white placeholder-white/40 text-sm focus:outline-none transition-all border"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    backdropFilter: "blur(12px)",
                    background: "rgba(255,255,255,0.12)",
                    borderColor: "rgba(255,255,255,0.25)",
                  }}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer p-0"
                  >
                    <X size={14} className="text-white/60 hover:text-white transition-colors" />
                  </button>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div
                className="inline-flex items-center gap-1.5 border border-white/30 rounded-full px-4 py-2"
                style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}
              >
                <Link to="/" className="text-white/70 hover:text-white text-xs sm:text-sm font-medium transition-colors no-underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>Home</Link>
                <span className="text-white/40 text-xs">/</span>
                <span className="text-white text-xs sm:text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Courses</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. FILTER BAR ── */}
      <section className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" style={{ scrollbarWidth: "none" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="shrink-0 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all cursor-pointer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: activeCategory === cat ? "#1d4ed8" : "white",
                    color: activeCategory === cat ? "white" : "#374151",
                    borderColor: activeCategory === cat ? "#1d4ed8" : "#e5e7eb",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="hidden sm:block w-px h-6 bg-gray-200 mx-1" />

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" style={{ scrollbarWidth: "none" }}>
              {levels.map((lv) => (
                <button
                  key={lv}
                  onClick={() => setLevel(lv)}
                  className="shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all cursor-pointer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: activeLevel === lv ? "#0f172a" : "white",
                    color: activeLevel === lv ? "white" : "#6b7280",
                    borderColor: activeLevel === lv ? "#0f172a" : "#e5e7eb",
                  }}
                >
                  {lv}
                </button>
              ))}
            </div>

            <div className="ml-auto text-xs text-gray-400 shrink-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {filtered.length} course{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. COURSE GRID ── */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <BookOpen size={40} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>No courses match your filters.</p>
              <button
                onClick={() => { setSearch(""); setCategory("All"); setLevel("All Levels"); }}
                className="mt-4 text-blue-600 text-sm font-bold border-none bg-transparent cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((course, i) => (
                  <div key={course.id}>
                    <CourseCard course={course} i={i} onExpand={handleExpand} />
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {expandedCourse && (
                  <div id={`course-detail-${expandedCourse.id}`} className="mt-10">
                    <CourseDetail course={expandedCourse} onClose={() => setExpanded(null)} />
                  </div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </section>

      {/* ── 4. LEARNING PATHS ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Learning Paths</span>
            </div>
            <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
              Not Sure Where to Start?
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-sm mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Choose a path based on your experience level and follow the recommended course sequence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: "Complete Beginner", step: "Start here", path: ["Cyber Security 101", "CompTIA Network+", "SOC Analyst Level 1"], note: "Build from zero to your first SOC role." },
              { label: "Career Changer",    step: "Fast-track", path: ["CompTIA Security+", "Ethical Hacking & CEH", "Cloud Security (AWS)"], note: "Already in IT? Move into cybersecurity quickly." },
              { label: "Security Professional", step: "Go advanced", path: ["Red Teaming", "CISSP Certification", "Data Science for Security"], note: "Seasoned practitioner? Master the highest-level skills." },
            ].map((path, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{path.step}</span>
                <h3 className="text-[#0a0f1e] font-bold text-base mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{path.label}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{path.note}</p>
                <ul className="space-y-3 flex-1 mb-6">
                  {path.path.map((step, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center shrink-0 text-[11px] font-bold text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>{j + 1}</span>
                      <span className="text-[#0a0f1e] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="no-underline">
                  <button className="w-full inline-flex items-center justify-center gap-2 text-white text-xs font-bold py-2.5 rounded-full border-none cursor-pointer transition-all active:scale-95 bg-[#0a0f1e] hover:bg-blue-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Start This Path <ArrowUpRight size={12} />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHAT'S INCLUDED ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
              Everything Included in Every Course
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield,        title: "Hands-on Labs",       desc: "Real attack/defense lab environments — 24/7 access from day one." },
              { icon: GraduationCap, title: "Expert Instructors",  desc: "Certified professionals with 10+ years of active industry experience." },
              { icon: Award,         title: "Cert Prep Materials", desc: "Practice exams, flashcards, and exam strategies aligned to the latest objectives." },
              { icon: Zap,           title: "Career Acceleration", desc: "CV reviews, LinkedIn optimisation, mock interviews, and professional skills workshops." },
            ].map((item, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 shrink-0">
                  <item.icon size={20} className="text-blue-600" />
                </div>
                <h3 className="text-[#0a0f1e] font-bold text-base mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. ENROLL CTA ── */}
      <section className="py-14 sm:py-20 bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Get Started Today</span>
          </div>
          <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            Ready to Advance Your Career?
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-md mx-auto mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Register for a course, request a training consultation, or get a free security assessment for your organisation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/register" className="no-underline w-full sm:w-auto">
              <button className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm rounded-full px-8 py-3 transition-all border-none cursor-pointer" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Enroll Now <ArrowUpRight size={15} />
              </button>
            </Link>
            <Link to="/contact" className="no-underline w-full sm:w-auto">
              <button className="inline-flex items-center justify-center w-full sm:w-auto border border-white/20 text-white hover:bg-white/10 rounded-full font-bold text-sm px-8 py-3 transition-all bg-transparent cursor-pointer" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Request Enterprise Training
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 opacity-60">
            {["CEH Prep", "CISSP Prep", "CompTIA Partner", "AWS Training", "IBM Certified", "ISC² Aligned"].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-white/80 text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <CheckCircle size={12} className="text-blue-400" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Courses;