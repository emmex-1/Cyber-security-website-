import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, Lock, Cloud, ArrowUpRight,
  CheckCircle, Clock, Layers, Award,
  Shield, X, BookOpen, GraduationCap, Users, Zap, Star,
  DollarSign, ChevronDown,
} from "lucide-react";
import Layout from "@/components/Layout";
import { LucideIcon } from "lucide-react";

import heroImage from "/images/office.png";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.45 } }),
};

/* ─── Currency config ─────────────────────────────────────────────── */
const CURRENCIES = [
  { code: "NGN", symbol: "₦",  rate: 1,        label: "Nigerian Naira (₦)" },
  { code: "USD", symbol: "$",  rate: 0.00065,  label: "US Dollar ($)" },
  { code: "GBP", symbol: "£",  rate: 0.00051,  label: "British Pound (£)" },
  { code: "EUR", symbol: "€",  rate: 0.00059,  label: "Euro (€)" },
  { code: "GHS", symbol: "₵",  rate: 0.0099,   label: "Ghanaian Cedi (₵)" },
  { code: "KES", symbol: "KSh",rate: 0.088,    label: "Kenyan Shilling (KSh)" },
];

type CourseType = "free" | "starter" | "premium" | "advanced";

interface Module { name: string; topics: string[]; }
interface Course {
  id:             string;
  icon:           LucideIcon;
  category:       string;
  level:          "Beginner" | "Intermediate" | "Advanced";
  type:           CourseType;
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
  priceNGN:       number | null; // null = free
  overview:       string;
  outcomes:       string[];
  certifications: string[];
  modules:        Module[];
  link:           string;
}

/* ─── Course data — Cybersecurity & Cloud only ────────────────────── */
const allCourses: Course[] = [
  {
    id: "cyber-101",
    icon: Shield,
    category: "Cybersecurity",
    level: "Beginner",
    type: "free",
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
    priceNGN: null,
    overview: "A comprehensive introduction to cybersecurity concepts designed for absolute beginners. You'll learn the fundamentals of networking, encryption, and security principles that underpin every specialist track.",
    outcomes: ["Understand core cybersecurity concepts and the CIA Triad", "Set up and navigate Linux and Windows security environments", "Grasp foundational cryptography and authentication principles", "Identify common attack vectors and defense strategies"],
    certifications: ["CompTIA Security+ (prep)", "eJPT"],
    modules: [
      { name: "Foundations of Cybersecurity", topics: ["CIA Triad & Security Concepts", "Networking Basics (TCP/IP, DNS, HTTP)", "Linux & Windows Security Fundamentals", "Cryptography Essentials", "Authentication & Access Control"] },
      { name: "Threat Landscape", topics: ["Common Attack Types (Phishing, Malware, MITM)", "Social Engineering Techniques", "Vulnerability vs Exploit", "OWASP Top 10 Overview"] },
      { name: "Defensive Basics", topics: ["Firewalls & IDS/IPS", "Security Policies & Best Practices", "Patch Management", "Incident Reporting Fundamentals"] },
    ],
    link: "/courses",
  },
  {
    id: "soc",
    icon: Shield,
    category: "Cybersecurity",
    level: "Beginner",
    type: "starter",
    tag: null,
    title: "SOC Analyst Level 1",
    tagline: "Build your Security Operations Centre skills",
    duration: "4–5 weeks",
    hours: 35,
    moduleCount: 10,
    color: "#0f766e",
    bg: "#f0fdfa",
    image: "/images/office.png",
    rating: 4.8,
    students: "980+",
    priceNGN: 45000,
    overview: "Learn to monitor, detect, and respond to security incidents from inside a Security Operations Centre. You'll work with real SIEM tools like Splunk and analyze threat intelligence feeds.",
    outcomes: ["Monitor security alerts using Splunk and QRadar", "Perform triage and escalation of security incidents", "Build and follow incident response playbooks", "Understand threat intelligence feeds and IOCs"],
    certifications: ["CompTIA CySA+", "IBM QRadar SIEM"],
    modules: [
      { name: "SOC Fundamentals", topics: ["SOC Tiers & Roles", "Alert Triage Process", "SIEM Overview", "Log Management Basics"] },
      { name: "SIEM & Log Analysis", topics: ["Splunk Search & Queries", "QRadar Event Correlation", "Log Source Configuration", "Creating Dashboards & Reports"] },
      { name: "Incident Response", topics: ["Incident Response Lifecycle", "Playbook Creation", "Evidence Collection", "Escalation Procedures"] },
    ],
    link: "/courses",
  },
  {
    id: "ceh",
    icon: Lock,
    category: "Cybersecurity",
    level: "Intermediate",
    type: "premium",
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
    priceNGN: 120000,
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
    link: "/courses",
  },
  {
    id: "security-plus",
    icon: Award,
    category: "Cybersecurity",
    level: "Intermediate",
    type: "premium",
    tag: "BESTSELLER",
    title: "CompTIA Security+",
    tagline: "Global entry-level security certification",
    duration: "5–6 weeks",
    hours: 45,
    moduleCount: 14,
    color: "#dc2626",
    bg: "#fef2f2",
    image: "/images/hero-home.jpg",
    rating: 4.7,
    students: "3,100+",
    priceNGN: 95000,
    overview: "CompTIA Security+ is the world's most widely adopted entry-level cybersecurity certification. This course follows the SY0-701 exam objectives and combines video content, flashcards, and exam simulation.",
    outcomes: ["Achieve 90%+ score on CompTIA Security+ SY0-701", "Understand governance, risk, and compliance (GRC)", "Configure secure network architectures", "Apply cryptographic solutions in real scenarios"],
    certifications: ["CompTIA Security+ SY0-701"],
    modules: [
      { name: "Threats, Attacks & Vulnerabilities", topics: ["Malware Types & Behaviours", "Social Engineering", "Application & Network Attacks", "Zero-Day Vulnerabilities"] },
      { name: "Architecture & Design", topics: ["Enterprise Security Architecture", "Virtualisation & Cloud Security", "Identity & Access Management", "Zero Trust Principles"] },
      { name: "Exam Simulation", topics: ["5 Full Practice Exams", "Performance-Based Questions", "Weakness Analysis", "Last-Minute Review Sheets"] },
    ],
    link: "/courses",
  },
  {
    id: "network-plus",
    icon: Shield,
    category: "Cybersecurity",
    level: "Beginner",
    type: "starter",
    tag: null,
    title: "CompTIA Network+",
    tagline: "Network fundamentals for IT professionals",
    duration: "4–5 weeks",
    hours: 38,
    moduleCount: 11,
    color: "#7c3aed",
    bg: "#f5f3ff",
    image: "/images/byt.jpeg",
    rating: 4.7,
    students: "2,200+",
    priceNGN: 55000,
    overview: "Master the networking fundamentals that underpin every IT role. This course prepares you for CompTIA Network+ N10-009 with hands-on labs covering routing, switching, wireless security, and network troubleshooting.",
    outcomes: ["Configure and troubleshoot enterprise networks", "Understand routing protocols (OSPF, BGP, EIGRP)", "Secure wireless networks to industry standards", "Pass CompTIA Network+ N10-009"],
    certifications: ["CompTIA Network+ N10-009"],
    modules: [
      { name: "Networking Fundamentals", topics: ["OSI & TCP/IP Models", "IP Addressing & Subnetting", "Routing & Switching Basics", "DNS, DHCP & NAT"] },
      { name: "Network Security", topics: ["Firewall Configuration", "VPN Technologies", "Wireless Security (WPA3)", "Network Access Control"] },
      { name: "Troubleshooting", topics: ["Network Troubleshooting Methodology", "Wireshark Packet Analysis", "Common Issues & Resolutions", "Network+ Exam Prep"] },
    ],
    link: "/courses",
  },
  {
    id: "cloud-aws",
    icon: Cloud,
    category: "Cloud",
    level: "Intermediate",
    type: "premium",
    tag: "HOT",
    title: "Cloud Security (AWS)",
    tagline: "Secure AWS infrastructure at enterprise scale",
    duration: "5–7 weeks",
    hours: 50,
    moduleCount: 13,
    color: "#b45309",
    bg: "#fffbeb",
    image: "/images/byt.jpeg",
    rating: 4.8,
    students: "1,650+",
    priceNGN: 130000,
    overview: "Go from cloud beginner to certified cloud security architect. Learn how to deploy, monitor, and lock down AWS infrastructure with IAM, GuardDuty, CloudTrail, and modern DevSecOps pipelines.",
    outcomes: ["Deploy secure AWS infrastructure using IaC", "Implement zero-trust access with IAM & SCP", "Pass AWS Security Specialty (SCS-C02)", "Build a DevSecOps CI/CD pipeline"],
    certifications: ["AWS Solutions Architect Associate", "AWS Security Specialty SCS-C02"],
    modules: [
      { name: "AWS Core Services", topics: ["EC2, S3, VPC & IAM Foundations", "Networking (Route 53, CloudFront)", "RDS & Database Security", "Cost Management"] },
      { name: "Cloud Security Architecture", topics: ["IAM Policies & Permission Boundaries", "AWS Organizations & SCPs", "Data Encryption (KMS, ACM)", "Zero Trust Architecture on AWS"] },
      { name: "Monitoring & Incident Response", topics: ["CloudTrail & CloudWatch", "GuardDuty Threat Detection", "Security Hub Aggregation", "Automated Remediation with Lambda"] },
    ],
    link: "/courses",
  },
  {
    id: "red-team",
    icon: Lock,
    category: "Cybersecurity",
    level: "Advanced",
    type: "advanced",
    tag: null,
    title: "Red Teaming",
    tagline: "Advanced adversary simulation techniques",
    duration: "8–10 weeks",
    hours: 70,
    moduleCount: 18,
    color: "#dc2626",
    bg: "#fef2f2",
    image: "/images/laps.png",
    rating: 4.9,
    students: "620+",
    priceNGN: 220000,
    overview: "Advanced offensive security for seasoned practitioners. Learn adversary simulation, C2 framework operations, Active Directory attacks, and covert operation techniques used by real nation-state actors.",
    outcomes: ["Operate Cobalt Strike and open-source C2 frameworks", "Compromise Active Directory environments", "Bypass modern EDR and AV solutions", "Write professional red team engagement reports"],
    certifications: ["OSCP", "CRTO (Certified Red Team Operator)"],
    modules: [
      { name: "C2 Framework Operations", topics: ["Cobalt Strike Fundamentals", "Custom Beacon Profiles", "Open-Source C2 (Havoc, Sliver)", "Listener & Payload Management"] },
      { name: "Active Directory Attacks", topics: ["Kerberoasting & AS-REP Roasting", "Pass-the-Hash & Pass-the-Ticket", "DCSync & Golden/Silver Tickets", "LAPS & BloodHound"] },
      { name: "Evasion & Persistence", topics: ["AV/EDR Bypass Techniques", "Living-off-the-Land (LOLBins)", "Persistence Mechanisms", "Covering Tracks"] },
    ],
    link: "/courses",
  },
  {
    id: "cissp",
    icon: Award,
    category: "Cybersecurity",
    level: "Advanced",
    type: "advanced",
    tag: "PREMIUM",
    title: "CISSP Certification",
    tagline: "The gold standard in information security",
    duration: "10–12 weeks",
    hours: 80,
    moduleCount: 20,
    color: "#1d4ed8",
    bg: "#eff6ff",
    image: "/images/office.png",
    rating: 4.9,
    students: "540+",
    priceNGN: 280000,
    overview: "CISSP is the world's most prestigious cybersecurity certification. This advanced program covers all 8 CISSP domains — from security & risk management to software development security.",
    outcomes: ["Master all 8 ISC² CISSP domains", "Apply enterprise risk management frameworks", "Design security architectures at the enterprise level", "Pass the CISSP adaptive exam with confidence"],
    certifications: ["CISSP (ISC²)"],
    modules: [
      { name: "Security & Risk Management", topics: ["Security Governance Principles", "Legal, Regulatory & Compliance", "Risk Management Framework", "Business Continuity Planning"] },
      { name: "Asset Security & Architecture", topics: ["Data Classification & Ownership", "Security Engineering Principles", "Cryptography in Depth", "Physical Security Controls"] },
      { name: "Identity & Access Management", topics: ["IAM Models & Concepts", "Authentication Technologies", "Federated Identity & SSO", "Privileged Access Management"] },
      { name: "Security Assessment & Testing", topics: ["Vulnerability Assessment Methodologies", "Penetration Testing in CISSP Context", "Log Review & Monitoring", "Disaster Recovery Testing"] },
      { name: "CISSP Exam Simulation", topics: ["CAT (Computerized Adaptive Testing) Strategy", "6 Full Mock Exams", "Domain Weakness Analysis", "Exam-Day Mindset & Techniques"] },
    ],
    link: "/courses",
  },
  {
    id: "azure-500",
    icon: Cloud,
    category: "Cloud",
    level: "Advanced",
    type: "advanced",
    tag: null,
    title: "Azure Security AZ-500",
    tagline: "Microsoft Azure Security Technologies",
    duration: "6–8 weeks",
    hours: 55,
    moduleCount: 14,
    color: "#0078d4",
    bg: "#f0f8ff",
    image: "/images/hero-home.jpg",
    rating: 4.7,
    students: "780+",
    priceNGN: 180000,
    overview: "Become an Azure Security Engineer. This course covers identity management, platform protection, security operations, and data & application security on Microsoft Azure.",
    outcomes: ["Implement Azure identity & access management", "Secure Azure platform and infrastructure", "Pass the AZ-500 exam", "Build automated security responses in Azure"],
    certifications: ["Azure Security Engineer AZ-500"],
    modules: [
      { name: "Identity & Access Management", topics: ["Azure Active Directory", "Privileged Identity Management", "Conditional Access Policies", "MFA & Identity Protection"] },
      { name: "Platform Protection", topics: ["Network Security Groups & Firewalls", "Azure DDoS Protection", "Container Security (AKS)", "Key Vault & Encryption"] },
      { name: "Security Operations", topics: ["Microsoft Sentinel SIEM", "Azure Defender for Cloud", "Incident Response in Azure", "Threat Intelligence Integration"] },
    ],
    link: "/courses",
  },
];

const categories = ["All", "Cybersecurity", "Cloud"];
const levels     = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const typeFilters = ["All", "Free", "Starter", "Premium", "Advanced"];

const levelColors: Record<string, string> = {
  Beginner:     "bg-green-100 text-green-800",
  Intermediate: "bg-amber-100 text-amber-800",
  Advanced:     "bg-red-100 text-red-800",
};

const typeColors: Record<CourseType, { bg: string; text: string; border: string }> = {
  free:     { bg: "#f0fdf4", text: "#166534", border: "#bbf7d0" },
  starter:  { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  premium:  { bg: "#fef9c3", text: "#854d0e", border: "#fde68a" },
  advanced: { bg: "#fdf2f8", text: "#86198f", border: "#f5d0fe" },
};

const typeLabels: Record<CourseType, string> = {
  free:     "Free",
  starter:  "Starter",
  premium:  "Premium",
  advanced: "Advanced",
};

function formatPrice(priceNGN: number | null, currency: typeof CURRENCIES[0]): string {
  if (priceNGN === null) return "Free";
  const converted = priceNGN * currency.rate;
  if (currency.code === "NGN") return `${currency.symbol}${converted.toLocaleString("en-NG")}`;
  if (converted >= 1000) return `${currency.symbol}${converted.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  return `${currency.symbol}${converted.toFixed(2)}`;
}

/* ─── Course Card ─────────────────────────────────────────────────── */
const CourseCard = ({ course, i, onExpand, currency }: {
  course: Course; i: number;
  onExpand: (id: string) => void;
  currency: typeof CURRENCIES[0];
}) => {
  const tc = typeColors[course.type];
  const isFree = course.priceNGN === null;

  return (
    <motion.div
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col group"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        <img src={course.image} alt={course.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/50" />

        {/* Type badge — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm"
            style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`, fontFamily: "'DM Sans', sans-serif" }}>
            {typeLabels[course.type]}
          </span>
        </div>

        {/* Bestseller/tag badge — top right */}
        {course.tag && (
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>{course.tag}</span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${levelColors[course.level]}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}>{course.level}</span>
          <div className="flex items-center gap-1">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{course.rating}</span>
            <span className="text-white/60 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>({course.students})</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[#0a0f1e] font-bold text-sm leading-snug mb-1 hover:text-blue-600 transition-colors cursor-pointer"
          onClick={() => onExpand(course.id)}
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
          {course.title}
        </h3>
        <p className="text-gray-500 text-xs mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{course.tagline}</p>

        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1 text-gray-400 text-xs"><Clock size={10} /> {course.hours}h</span>
          <span className="flex items-center gap-1 text-gray-400 text-xs"><Layers size={10} /> {course.moduleCount} modules</span>
        </div>

        {/* Cert pills */}
        <div className="flex flex-wrap gap-1 mb-3 flex-1">
          {course.certifications.slice(0, 2).map((cert) => (
            <span key={cert} className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm border"
              style={{ color: course.color, borderColor: `${course.color}30`, background: course.bg, fontFamily: "'DM Sans', sans-serif" }}>
              {cert}
            </span>
          ))}
        </div>

        {/* Price + actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            {isFree ? (
              <span className="text-green-600 font-black text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>Free</span>
            ) : (
              <div>
                <span className="text-[#0a0f1e] font-black text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {formatPrice(course.priceNGN, currency)}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => onExpand(course.id)}
              className="text-[10px] font-bold border border-gray-300 rounded px-2.5 py-1.5 hover:border-gray-500 transition-colors cursor-pointer bg-white"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#374151" }}>
              Preview
            </button>
            <Link to={`/register?course=${course.id}&title=${encodeURIComponent(course.title)}`} className="no-underline">
              <button className="text-[10px] font-bold text-white rounded px-2.5 py-1.5 border-none cursor-pointer transition-all"
                style={{ background: course.color, fontFamily: "'DM Sans', sans-serif" }}>
                {isFree ? "Enroll Free" : "Enroll Now"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Free vs Paid comparison strip (Udemy style) ─────────────────── */
const FreeVsPaidStrip = () => (
  <div className="bg-[#f8fafc] rounded-xl border border-gray-200 p-6 mt-10">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div>
        <p className="text-[#0a0f1e] font-bold text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Try free courses or enroll in paid courses</p>
        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3 flex items-start gap-2">
          <BookOpen size={14} className="text-blue-600 mt-0.5 shrink-0" />
          <p className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Not sure? All paid courses come with a 14-day money-back satisfaction guarantee.
          </p>
        </div>
        <Link to="/courses" className="no-underline">
          <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs py-2 rounded transition-all cursor-pointer bg-white"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            View All Courses
          </button>
        </Link>
      </div>
      <div>
        <p className="text-[#0a0f1e] font-bold text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Free courses</p>
        <div className="space-y-2">
          {[
            { has: true,  label: "Online video content" },
            { has: false, label: "Certificate of completion" },
            { has: false, label: "Instructor Q&A" },
            { has: false, label: "Instructor direct message" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              {item.has
                ? <CheckCircle size={14} className="text-green-500 shrink-0" />
                : <X size={14} className="text-red-400 shrink-0" />}
              <span className="text-gray-600 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[#0a0f1e] font-bold text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Paid courses</p>
        <div className="space-y-2">
          {[
            { has: true, label: "Online video content" },
            { has: true, label: "Certificate of completion" },
            { has: true, label: "Instructor Q&A" },
            { has: true, label: "Instructor direct message" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-500 shrink-0" />
              <span className="text-gray-600 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Expanded course detail panel ───────────────────────────────── */
const CourseDetail = ({ course, onClose, currency }: { course: Course; onClose: () => void; currency: typeof CURRENCIES[0] }) => {
  const [activeModule, setActiveModule] = useState(0);
  const isFree = course.priceNGN === null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border-2 overflow-hidden bg-white mb-8"
      style={{ borderColor: `${course.color}30` }}
    >
      {/* Header */}
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
          <button onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center border-none cursor-pointer shrink-0 transition-colors ml-4">
            <X size={16} className="text-white" />
          </button>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-5 mt-4">
          {[
            { icon: Clock,  val: `${course.hours}h total` },
            { icon: Layers, val: `${course.moduleCount} modules` },
            { icon: Star,   val: `${course.rating} rated` },
            { icon: Users,  val: `${course.students} enrolled` },
          ].map(({ icon: Icon, val }, j) => (
            <span key={j} className="flex items-center gap-1.5 text-white/80 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <Icon size={12} /> {val}
            </span>
          ))}
          <span className="text-white font-black text-lg ml-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {isFree ? "Free" : formatPrice(course.priceNGN, currency)}
          </span>
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
          <ul className="space-y-2.5 mb-6">
            {course.outcomes.map((o, j) => (
              <li key={j} className="flex items-start gap-2.5">
                <CheckCircle size={14} style={{ color: course.color }} className="shrink-0 mt-0.5" />
                <span className="text-gray-600 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{o}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2">
            {course.modules.map((mod, mi) => (
              <button key={mi} onClick={() => setActiveModule(mi)}
                className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer border"
                style={{ background: activeModule === mi ? `${course.color}08` : "white", borderColor: activeModule === mi ? `${course.color}30` : "#f3f4f6" }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{ background: activeModule === mi ? course.color : "#f3f4f6", color: activeModule === mi ? "white" : "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>
                  {mi + 1}
                </span>
                <span className="text-[#0a0f1e] text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{mod.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 p-8">
          <AnimatePresence mode="wait">
            <motion.div key={`${course.id}-${activeModule}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: course.color, fontFamily: "'DM Sans', sans-serif" }}>Module {activeModule + 1}</p>
              <h4 className="text-[#0a0f1e] font-bold text-xl mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{course.modules[activeModule].name}</h4>
              <div className="space-y-2.5 mb-6">
                {course.modules[activeModule].topics.map((topic, ti) => (
                  <motion.div key={ti} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ti * 0.06 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-50 bg-[#f8fafc]">
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${course.color}12`, border: `1px solid ${course.color}20` }}>
                      <CheckCircle size={14} style={{ color: course.color }} />
                    </span>
                    <span className="text-[#0a0f1e] text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{topic}</span>
                  </motion.div>
                ))}
              </div>
              <div className="pt-5 border-t border-gray-50 flex items-center justify-end gap-3">
                <Link to={`/register?course=${course.id}&title=${encodeURIComponent(course.title)}`} className="no-underline">
                  <button className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full text-white border-none cursor-pointer transition-all active:scale-95"
                    style={{ background: course.color, fontFamily: "'DM Sans', sans-serif" }}>
                    {course.priceNGN === null ? "Enroll Free" : `Enroll — ${formatPrice(course.priceNGN, currency)}`} <ArrowUpRight size={14} />
                  </button>
                </Link>
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
  const [activeType,     setType]     = useState("All");
  const [expandedId,     setExpanded] = useState<string | null>(null);
  const [showCurrencyDD, setShowCurrencyDD] = useState(false);
  const [currency, setCurrency] = useState(CURRENCIES[0]);

  const filtered = useMemo(() => {
    return allCourses.filter((c) => {
      const matchCat   = activeCategory === "All" || c.category === activeCategory;
      const matchLevel = activeLevel === "All Levels" || c.level === activeLevel;
      const matchType  = activeType === "All" || c.type === activeType.toLowerCase();
      const matchSearch = !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.tagline.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchLevel && matchType && matchSearch;
    });
  }, [search, activeCategory, activeLevel, activeType]);

  const expandedCourse = expandedId ? allCourses.find((c) => c.id === expandedId) ?? null : null;

  const handleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
    setTimeout(() => {
      document.getElementById(`course-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <Layout>

      {/* ── HERO ── */}
      <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[420px] lg:min-h-[500px]">
          <img src={heroImage} alt="BYTITUDE Courses" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/80" />
          <div className="relative z-10 flex flex-col justify-end h-full min-h-[320px] sm:min-h-[420px] lg:min-h-[500px] px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 pt-20 sm:pt-28">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>All Courses</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white font-bold leading-tight mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(38px, 6.5vw, 82px)" }}>
              Our Courses
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
              className="text-white/70 max-w-sm sm:max-w-lg leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}>
              Industry-recognised cybersecurity and cloud training — from free beginner fundamentals to advanced red teaming. Every course includes hands-on labs and a clear certification path.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3 max-w-lg w-full mb-6">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses…"
                  className="w-full pl-11 pr-10 py-3 rounded-full text-white placeholder-white/40 text-sm focus:outline-none transition-all border"
                  style={{ fontFamily: "'DM Sans', sans-serif", backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.25)" }} />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer p-0">
                    <X size={14} className="text-white/60 hover:text-white transition-colors" />
                  </button>
                )}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
              <div className="inline-flex items-center gap-1.5 border border-white/30 rounded-full px-4 py-2"
                style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}>
                <Link to="/" className="text-white/70 hover:text-white text-xs sm:text-sm font-medium transition-colors no-underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>Home</Link>
                <span className="text-white/40 text-xs">/</span>
                <span className="text-white text-xs sm:text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Courses</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-3">
            {/* Category */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" style={{ scrollbarWidth: "none" }}>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className="shrink-0 text-xs font-bold uppercase tracking-widest px-3.5 py-2 rounded-full border transition-all cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif", background: activeCategory === cat ? "#1d4ed8" : "white", color: activeCategory === cat ? "white" : "#374151", borderColor: activeCategory === cat ? "#1d4ed8" : "#e5e7eb" }}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="hidden sm:block w-px h-5 bg-gray-200 mx-1" />

            {/* Level */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" style={{ scrollbarWidth: "none" }}>
              {levels.map((lv) => (
                <button key={lv} onClick={() => setLevel(lv)}
                  className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif", background: activeLevel === lv ? "#0f172a" : "white", color: activeLevel === lv ? "white" : "#6b7280", borderColor: activeLevel === lv ? "#0f172a" : "#e5e7eb" }}>
                  {lv}
                </button>
              ))}
            </div>

            <div className="hidden sm:block w-px h-5 bg-gray-200 mx-1" />

            {/* Type */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" style={{ scrollbarWidth: "none" }}>
              {typeFilters.map((tf) => (
                <button key={tf} onClick={() => setType(tf)}
                  className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: activeType === tf ? "#6366f1" : "white",
                    color: activeType === tf ? "white" : "#6b7280",
                    borderColor: activeType === tf ? "#6366f1" : "#e5e7eb",
                  }}>
                  {tf}
                </button>
              ))}
            </div>

            {/* Currency selector */}
            <div className="ml-auto relative shrink-0">
              <button onClick={() => setShowCurrencyDD(!showCurrencyDD)}
                className="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-gray-400 transition-colors cursor-pointer bg-white"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <DollarSign size={12} />
                {currency.code}
                <ChevronDown size={12} className={`transition-transform ${showCurrencyDD ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {showCurrencyDD && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                    style={{ minWidth: 220 }}>
                    {CURRENCIES.map((c) => (
                      <button key={c.code} onClick={() => { setCurrency(c); setShowCurrencyDD(false); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-blue-50 transition-colors cursor-pointer border-none ${currency.code === c.code ? "bg-blue-50 text-blue-700" : "bg-white text-gray-700"}`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {c.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span className="text-xs text-gray-400 shrink-0 hidden sm:block" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {filtered.length} course{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* ── COURSE GRID ── */}
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">

          {/* Udemy-style section header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[#0a0f1e] font-bold text-2xl" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                Top courses in <span className="text-blue-600">Cybersecurity</span> and <span className="text-blue-600">Cloud Security</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} · Prices shown in {currency.label}
              </p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <BookOpen size={40} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>No courses match your filters.</p>
              <button onClick={() => { setSearch(""); setCategory("All"); setLevel("All Levels"); setType("All"); }}
                className="mt-4 text-blue-600 text-sm font-bold border-none bg-transparent cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {/* Course grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((course, i) => (
                  <div key={course.id} id={`course-${course.id}`}>
                    <CourseCard course={course} i={i} onExpand={handleExpand} currency={currency} />
                  </div>
                ))}
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {expandedCourse && (
                  <div className="mt-8">
                    <CourseDetail course={expandedCourse} onClose={() => setExpanded(null)} currency={currency} />
                  </div>
                )}
              </AnimatePresence>

              {/* Free vs Paid strip */}
              <FreeVsPaidStrip />
            </>
          )}
        </div>
      </section>

      {/* ── LEARNING PATHS ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Learning Paths</span>
            </div>
            <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Not Sure Where to Start?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: "Complete Beginner", step: "Start here", path: ["Cyber Security 101 (Free)", "CompTIA Network+", "SOC Analyst Level 1"], note: "Build from zero to your first SOC role." },
              { label: "Career Changer",    step: "Fast-track", path: ["CompTIA Security+", "Ethical Hacking & CEH", "Cloud Security (AWS)"], note: "Already in IT? Move into cybersecurity quickly." },
              { label: "Security Professional", step: "Go advanced", path: ["Red Teaming", "CISSP Certification", "Azure Security AZ-500"], note: "Seasoned practitioner? Master the highest-level skills." },
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

      {/* ── ENROLL CTA ── */}
      <section className="py-14 sm:py-20 bg-[#0a0f1e] relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
            Ready to Advance Your Career?
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-md mx-auto mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Start free, upgrade anytime. All paid courses include hands-on labs and certification prep.
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
            {["Free Starter Courses", "CEH Prep", "CISSP Prep", "AWS Training", "14-Day Guarantee", "ISC² Aligned"].map((badge) => (
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