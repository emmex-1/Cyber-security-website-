import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search, Clock, Calendar, BookOpen, Star,
  MessageCircle, ThumbsUp, ArrowUpRight, ArrowLeft,
  Twitter, Facebook, Link2, Reply, Send, Flame, ChevronRight,
} from "lucide-react";
import Layout from "@/components/Layout";

import heroImage from "/images/byte.jpeg";
import timsImage from "/images/office.png";
import timImage from "/images/laps.png";
import byteImage from "/images/byt.jpeg";

/* ── Types ─────────────────────────────────────────────────────────── */
interface Comment {
  id: string; postId: number; parentId: string | null;
  author: string; text: string; date: string; likes: number; liked: boolean;
}

interface Post {
  id: number; slug: string; category: string; featured: boolean;
  title: string; excerpt: string; date: string; readTime: string;
  author: string; image: string; body: string;
  avgRating: number; ratingCount: number;
}

/* ── Data ──────────────────────────────────────────────────────────── */
const CATEGORIES = ["All", "Threat Intelligence", "Ethical Hacking", "Cloud Security", "SOC & Defense", "Certifications", "Career"];

const CAT_COLORS: Record<string, string> = {
  "Threat Intelligence": "bg-red-100 text-red-700",
  "Ethical Hacking":     "bg-orange-100 text-orange-700",
  "Cloud Security":      "bg-purple-100 text-purple-700",
  "SOC & Defense":       "bg-blue-100 text-blue-700",
  "Certifications":      "bg-green-100 text-green-700",
  "Career":              "bg-slate-100 text-slate-700",
};

const POSTS: Post[] = [
  {
    id: 1, slug: "ransomware-prevention-2025", category: "Threat Intelligence", featured: true,
    title: "Top Strategies to Prevent Ransomware Attacks in 2025",
    excerpt: "Ransomware groups have evolved. Here's what the latest threat intelligence tells us about protecting enterprise networks — and what still works.",
    date: "April 5, 2025", readTime: "7 min read", author: "Bytitude Team",
    image: heroImage, avgRating: 4.9, ratingCount: 38,
    body: `## The Ransomware Landscape in 2025

Ransomware-as-a-Service (RaaS) has fundamentally changed the threat landscape. Attack groups now operate like businesses — with affiliate programs, customer support, and SLAs.

In 2025, three trends dominate:
- **Double extortion** — data exfiltration before encryption means paying the ransom doesn't guarantee data privacy
- **Living-off-the-Land (LotL)** — attackers use legitimate system tools to evade AV detection
- **Initial Access Brokers (IABs)** — specialised criminals who sell network access to ransomware operators

## The Non-Negotiable Controls

**1. Immutable Backups**
Offline or immutable (WORM) backups remain the single most effective defence. Test restoration monthly — not annually.

**2. Privileged Access Management (PAM)**
Most ransomware attacks pivot through over-privileged service accounts. Implement least privilege. Audit standing admin access.

**3. Network Segmentation**
Flat networks let ransomware spread laterally in minutes. Segment your OT, IT, and cloud environments. Micro-segmentation stops lateral movement.

**4. Email Gateway Configuration**
Over 60% of ransomware arrives via phishing. Enforce DMARC, DKIM, SPF. Use sandboxing for attachments. Block macro-enabled Office files by policy.

**5. EDR with Behavioural Detection**
Traditional AV is dead against modern ransomware. Endpoint Detection and Response (EDR) tools with behavioural analysis catch LotL attacks that signature-based tools miss.

## Incident Response Preparedness

Having a tested IR plan before an incident is the difference between a bad week and a business-ending event.

> "The question isn't whether you'll be attacked. It's whether you'll be ready when you are." — Bytitude Security Team`,
  },
  {
    id: 2, slug: "ai-cyber-threats", category: "Threat Intelligence", featured: true,
    title: "AI-Powered Cyber Threats: Staying Ahead of Attackers",
    excerpt: "Generative AI has supercharged attackers. Deepfake phishing, AI-written malware, and autonomous reconnaissance are already operational threats.",
    date: "March 28, 2025", readTime: "8 min read", author: "Bytitude Team",
    image: timsImage, avgRating: 5.0, ratingCount: 52,
    body: `## AI Is No Longer Just a Defender's Tool

For years we talked about AI as a defensive capability — anomaly detection, SIEM correlation, user behaviour analytics. That picture has fundamentally changed.

**AI-Enabled Attacks in 2025:**
- Spear-phishing emails written by LLMs with zero grammatical errors, perfectly mimicking communication styles
- Deepfake audio calls impersonating executives for fraud (BEC 2.0)
- Autonomous vulnerability scanning that identifies targets and exploits faster than any human team

## Defending Against AI Attacks

**Identity Verification Layers**
Voice deepfakes are now indistinguishable from real. Implement out-of-band verification for any financial or access requests.

**Phishing-Resistant MFA**
Passkeys and hardware security keys (FIDO2) are immune to AI-crafted phishing lures. SMS OTP is not.

**Threat Intelligence Integration**
Your defences need to evolve as fast as the attacks. Automated threat intel feeds that update detection rules in real time are no longer optional.

> "AI doesn't change the fundamentals of security. It just raises the bar for how well we need to execute them." — Bytitude Team`,
  },
  {
    id: 3, slug: "cyber-defense-plan", category: "SOC & Defense", featured: false,
    title: "Building a Strong Cyber Defense Plan for Your Business",
    excerpt: "Most companies have security tools. Very few have a coherent security strategy. Here's how to build one that executives and technical teams can both execute.",
    date: "March 15, 2025", readTime: "6 min read", author: "Bytitude Team",
    image: heroImage, avgRating: 4.7, ratingCount: 22,
    body: `## Strategy First, Tools Second

Most organisations buy security tools and hope for the best. They don't have visibility into what they're protecting, who is responsible, or how they'd respond to an incident.

**The Three Questions Every Security Plan Must Answer:**
1. What are our crown jewels? (What data or systems, if compromised, would end the business?)
2. What are our likely threat actors and their capabilities?
3. What controls reduce the risk to an acceptable level?

## Framework Selection

NIST CSF 2.0, ISO 27001, and CIS Controls are your three main options. For most organisations:
- **CIS Controls v8** is the most practical starting point
- **NIST CSF** is required if you serve US federal clients
- **ISO 27001** is required for many enterprise procurement processes

Start with an asset inventory. You cannot protect what you haven't identified.`,
  },
  {
    id: 4, slug: "ceh-exam-prep", category: "Certifications", featured: false,
    title: "How to Pass the CEH Exam First Time",
    excerpt: "The Certified Ethical Hacker exam covers 20 domains. Here's how to study smarter, not harder — and what most candidates get wrong.",
    date: "March 5, 2025", readTime: "9 min read", author: "Bytitude Team",
    image: timsImage, avgRating: 4.8, ratingCount: 64,
    body: `## Why CEH Has a Reputation for Being Tricky

The CEH v12 exam is 125 questions across 20 domains, with a 4-hour time limit. The difficulty isn't the technical content — it's the way questions are framed.

EC-Council uses scenario-based questions where multiple answers appear correct. The key is understanding the *EC-Council preferred methodology* rather than what you'd do in practice.

## The 80/20 Study Plan

**High-weight domains (focus here first):**
- Hacking Methodologies & Concepts
- Network Scanning & Enumeration
- System Hacking
- Sniffing & Social Engineering
- Cryptography

**Tools you must know cold:**
- Nmap, Netcat, Wireshark
- Metasploit Framework
- Hydra, John the Ripper
- Burp Suite (basics)
- Maltego, Recon-ng

## Practice Exam Strategy

EC-Council's official Mat Exam is the closest simulation. Aim for 85%+ in practice before booking the real exam. Most candidates who fail did less than 500 practice questions.

> "The CEH is 80% methodology and 20% tools. Study like an EC-Council examiner wrote the questions — because they did." — Bytitude Training Team`,
  },
  {
    id: 5, slug: "cloud-security-aws", category: "Cloud Security", featured: false,
    title: "AWS Security Best Practices Every Cloud Engineer Must Know",
    excerpt: "S3 misconfigurations. Overprivileged IAM roles. Exposed EC2 metadata endpoints. The most common AWS security mistakes and how to prevent them.",
    date: "February 20, 2025", readTime: "7 min read", author: "Bytitude Team",
    image: byteImage, avgRating: 4.9, ratingCount: 41,
    body: `## The AWS Security Shared Responsibility Model

AWS secures the cloud infrastructure. You secure everything you run in it. This distinction causes more misconfigurations than anything else.

**The Most Common AWS Security Failures:**

**1. Public S3 Buckets**
Block public access at the account level. Use SCPs to prevent any role from creating public buckets. Audit with AWS Config rules.

**2. Overprivileged IAM**
Never use the root account for operations. Enforce MFA on all human users. Apply least privilege using IAM Access Analyzer to identify unused permissions.

**3. Unencrypted Data at Rest**
Enable default encryption for S3, EBS, and RDS. Use customer-managed KMS keys for sensitive workloads.

**4. Disabled CloudTrail**
CloudTrail should be enabled in all regions, with logs shipped to an immutable S3 bucket in a separate logging account.

**5. Exposed Instance Metadata**
Use IMDSv2 to prevent SSRF attacks that steal EC2 instance credentials.`,
  },
  {
    id: 6, slug: "cybersecurity-career-2025", category: "Career", featured: false,
    title: "How to Start a Cybersecurity Career in 2025 With No Experience",
    excerpt: "You don't need a computer science degree or years of IT experience. Here's the practical roadmap that's placing beginners in security roles in 6 months.",
    date: "February 10, 2025", readTime: "8 min read", author: "Bytitude Team",
    image: timImage, avgRating: 5.0, ratingCount: 87,
    body: `## The Good News

Cybersecurity has one of the highest talent deficits of any industry — 3.5 million unfilled positions globally. Employers are hiring people with the right certifications and demonstrable skills, not necessarily degrees.

## The 6-Month Beginner Roadmap

**Month 1–2: Foundations**
- CompTIA A+ or Network+ (pick one)
- Set up a home lab: Kali Linux in a VM, TryHackMe free tier
- Learn basic networking: TCP/IP, DNS, HTTP, subnetting

**Month 3–4: Security Fundamentals**
- CompTIA Security+ SY0-701
- TryHackMe "Pre-Security" and "SOC Level 1" paths
- Build your GitHub with writeups and lab notes

**Month 5–6: Specialise**
- Choose: SOC Analyst (blue team) or Ethical Hacker (red team)
- SOC: SIEM tools (Splunk free tier), log analysis, incident tickets
- Pentesting: TryHackMe/HTB easy boxes, Python scripting

## First Job Applications

Apply for: SOC Analyst Tier 1, Junior Penetration Tester, Cybersecurity Analyst. Entry-level roles in government and MSSPs often have lower barriers than private enterprise.

> "The only qualification that matters for your first security job is proof that you can do the work." — Bytitude Career Team`,
  },
];

const COMMENTS: Comment[] = [
  { id: "c1", postId: 1, parentId: null, author: "Tunde A.", text: "The section on immutable backups is exactly what we implemented last quarter. Saved us during a ransomware attempt.", date: "April 7, 2025", likes: 14, liked: false },
  { id: "c2", postId: 2, parentId: null, author: "Sarah K.", text: "The deepfake audio section hit hard. We had an attempted CEO fraud via voice clone last month — nearly worked.", date: "March 30, 2025", likes: 22, liked: false },
];

/* ── Helpers ────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } }),
};

const StarRating = ({ value }: { value: number }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map((s) => (
      <Star key={s} size={11} fill={s <= Math.round(value) ? "#f59e0b" : "none"} className={s <= Math.round(value) ? "text-amber-500" : "text-gray-300"} />
    ))}
  </div>
);

const renderBody = (body: string) => {
  const els: JSX.Element[] = [];
  let key = 0;
  const bold = (txt: string) => txt.split(/\*\*(.*?)\*\*/g).map((p, i) => i % 2 === 1 ? <strong key={i} className="text-[#0a0f1e]">{p}</strong> : p);
  for (const raw of body.trim().split("\n")) {
    const line = raw.trim();
    if (!line) { els.push(<div key={key++} className="h-3" />); continue; }
    if (line.startsWith("## ")) els.push(<h2 key={key++} className="text-[#0a0f1e] font-bold text-xl sm:text-2xl mt-8 mb-3" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>{line.slice(3)}</h2>);
    else if (line.startsWith("**") && line.endsWith("**")) els.push(<p key={key++} className="text-[#0a0f1e] font-bold text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{line.slice(2,-2)}</p>);
    else if (line.startsWith("> ")) els.push(<blockquote key={key++} className="border-l-4 border-blue-500 pl-4 py-1 my-5 bg-blue-50 rounded-r-xl"><p className="text-blue-800 italic text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{line.slice(2)}</p></blockquote>);
    else if (line.startsWith("- ") || line.startsWith("* ")) els.push(<li key={key++} className="flex items-start gap-2.5 mb-2 text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" /><span>{bold(line.slice(2))}</span></li>);
    else if (/^\d+\. /.test(line)) { const num = line.match(/^(\d+)/)?.[1]; els.push(<li key={key++} className="flex items-start gap-2.5 mb-2 text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}><span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{num}</span><span>{bold(line.replace(/^\d+\. /,""))}</span></li>); }
    else els.push(<p key={key++} className="text-gray-500 text-sm leading-relaxed mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{bold(line)}</p>);
  }
  return els;
};

/* ── Article Reader ─────────────────────────────────────────────────── */
const ArticleReader = ({ post, allPosts, comments: allComments, onClose, onPostClick, onAddComment, onLikeComment }: {
  post: Post; allPosts: Post[]; comments: Comment[];
  onClose: () => void; onPostClick: (p: Post) => void;
  onAddComment: (c: Omit<Comment, "id" | "likes" | "liked">) => void;
  onLikeComment: (id: string) => void;
}) => {
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [ratedMsg, setRatedMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const postComments = allComments.filter((c) => c.postId === post.id && !c.parentId);
  const related = allPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  const recent = allPosts.filter((p) => p.id !== post.id).slice(0, 4);
  const popular = [...allPosts].filter((p) => p.id !== post.id).sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 4);

  const submitComment = () => {
    if (!commentText.trim() || !commentName.trim()) return;
    onAddComment({ postId: post.id, parentId: null, author: commentName, text: commentText, date: "Just now" });
    setCommentText(""); setCommentName("");
  };

  const handleRate = (v: number) => {
    setUserRating(v); setRatedMsg(`Rated ${v} stars — thank you!`);
    setTimeout(() => setRatedMsg(""), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-8 py-3 flex items-center justify-between">
        <button onClick={onClose} className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0a0f1e] text-sm font-semibold transition-colors border-none bg-transparent cursor-pointer p-0"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={15} /> Back to Blog
        </button>
        <div className="flex items-center gap-2">
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-500 flex items-center justify-center text-gray-500 transition-colors no-underline"><Twitter size={12} /></a>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-500 flex items-center justify-center text-gray-500 transition-colors border-none cursor-pointer">
            <Link2 size={12} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
          {/* Article */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${CAT_COLORS[post.category] ?? "bg-gray-100 text-gray-600"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.category}</span>
              <span className="text-gray-400 text-xs flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
              <span className="text-gray-400 text-xs flex items-center gap-1"><Calendar size={10} />{post.date}</span>
            </div>
            <h1 className="text-[#0a0f1e] font-bold leading-tight mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 44px)" }}>{post.title}</h1>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">B</div>
                <div>
                  <p className="text-[#0a0f1e] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.author}</p>
                  <p className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>BYTITUDE Security Team</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StarRating value={post.avgRating} />
                <span className="text-gray-500 text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.avgRating.toFixed(1)} ({post.ratingCount})</span>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden mb-8" style={{ paddingBottom: "46%" }}>
              <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-7 border-l-4 border-blue-500 pl-4 italic"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.excerpt}</p>
            <div>{renderBody(post.body)}</div>

            {/* Rate */}
            <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
              <p className="text-[#0a0f1e] font-bold text-base mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Rate this article</p>
              <p className="text-gray-400 text-xs mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Help others find quality security content</p>
              <div className="flex justify-center gap-1.5 mb-3">
                {[1,2,3,4,5].map((s) => (
                  <button key={s} onClick={() => handleRate(s)} className="border-none bg-transparent cursor-pointer transition-transform hover:scale-125 p-0.5">
                    <Star size={26} fill={s <= userRating ? "#f59e0b" : "none"} className={s <= userRating ? "text-amber-500" : "text-gray-200"} />
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {ratedMsg && (<motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-blue-600 text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{ratedMsg}</motion.p>)}
              </AnimatePresence>
            </div>

            {/* Comments */}
            <div className="mt-10">
              <h3 className="text-[#0a0f1e] font-bold text-xl mb-5 flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <MessageCircle size={18} className="text-blue-500" /> Comments ({postComments.length})
              </h3>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5 shadow-sm">
                <input value={commentName} onChange={(e) => setCommentName(e.target.value)} placeholder="Your name"
                  className="w-full h-10 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: "'DM Sans', sans-serif" }} />
                <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Share your thoughts..." rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm resize-none mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: "'DM Sans', sans-serif" }} />
                <button onClick={submitComment} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full px-5 py-2.5 border-none cursor-pointer transition-all active:scale-95"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <Send size={12} /> Post Comment
                </button>
              </div>
              <div className="space-y-4">
                {postComments.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>Be the first to comment.</p>
                ) : postComments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">{c.author[0].toUpperCase()}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#0a0f1e] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.author}</span>
                        <span className="text-gray-400 text-xs">{c.date}</span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.text}</p>
                      <button onClick={() => onLikeComment(c.id)}
                        className={`flex items-center gap-1 text-xs font-semibold border-none bg-transparent cursor-pointer p-0 transition-colors ${c.liked ? "text-blue-600" : "text-gray-400 hover:text-blue-500"}`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        <ThumbsUp size={11} fill={c.liked ? "currentColor" : "none"} /> {c.likes > 0 && c.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-12 pt-10 border-t border-gray-200">
                <h3 className="text-[#0a0f1e] font-bold text-xl mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Related Articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((p) => (
                    <button key={p.id} onClick={() => onPostClick(p)} className="text-left rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all cursor-pointer group bg-white p-0 border-none">
                      <div className="relative overflow-hidden" style={{ paddingBottom: "55%" }}>
                        <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      <div className="p-4">
                        <p className="text-[#0a0f1e] font-bold text-sm leading-snug group-hover:text-blue-600 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.title}</p>
                        <p className="text-gray-400 text-xs mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.readTime}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4"><Flame size={14} className="text-blue-500" /><p className="text-[#0a0f1e] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Popular</p></div>
              <div className="space-y-3">
                {popular.map((p, i) => (
                  <button key={p.id} onClick={() => onPostClick(p)} className="w-full text-left flex items-start gap-3 group border-none bg-transparent cursor-pointer p-0">
                    <span className="text-blue-600 font-bold text-sm w-5 shrink-0 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>0{i+1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#0a0f1e] text-xs font-semibold leading-snug group-hover:text-blue-600 transition-colors line-clamp-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.title}</p>
                      <div className="flex items-center gap-1 mt-1"><StarRating value={p.avgRating} /><span className="text-gray-400 text-[10px]">({p.ratingCount})</span></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4"><Clock size={14} className="text-blue-500" /><p className="text-[#0a0f1e] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Recent</p></div>
              <div className="space-y-3">
                {recent.map((p) => (
                  <button key={p.id} onClick={() => onPostClick(p)} className="w-full text-left flex items-start gap-3 group border-none bg-transparent cursor-pointer p-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#0a0f1e] text-xs font-semibold leading-snug group-hover:text-blue-600 transition-colors line-clamp-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.title}</p>
                      <p className="text-gray-400 text-[10px] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.date}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-[#0a0f1e] rounded-2xl p-5 text-center">
              <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Ready to Learn?</p>
              <p className="text-white font-bold text-base mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Start Your Certification Track</p>
              <p className="text-white/50 text-xs mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Turn what you're reading into a certified career.</p>
              <Link to="/register" className="no-underline">
                <button className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl py-2.5 border-none cursor-pointer transition-all active:scale-95"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Register Now <ArrowUpRight size={12} />
                </button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   BLOG PAGE
══════════════════════════════════════════════════════════════════ */
const Blog = () => {
  const [posts, setPosts] = useState<Post[]>(POSTS);
  const [comments, setComments] = useState<Comment[]>(COMMENTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<Post | null>(null);

  const addComment = (c: Omit<Comment, "id" | "likes" | "liked">) => {
    setComments((prev) => [...prev, { ...c, id: `c${Date.now()}`, likes: 0, liked: false }]);
  };
  const likeComment = (id: string) => {
    setComments((prev) => prev.map((c) => c.id === id ? { ...c, likes: c.liked ? c.likes - 1 : c.likes + 1, liked: !c.liked } : c));
  };

  const filtered = posts.filter((p) => {
    const ms = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const mc = category === "All" || p.category === category;
    return ms && mc;
  });
  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <Layout>
      <AnimatePresence>
        {active && (
          <ArticleReader post={active} allPosts={posts} comments={comments}
            onClose={() => setActive(null)} onPostClick={(p) => setActive(p)}
            onAddComment={addComment} onLikeComment={likeComment} />
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[440px]">
          <img src={heroImage} alt="Blog" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.5) 0px,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 60px)" }} />
          <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[340px] lg:min-h-[440px] px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 pt-20 sm:pt-28">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Security Intelligence</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
              className="text-white font-bold leading-tight mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(38px, 7vw, 88px)" }}>
              Blog &amp; Articles
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
              className="text-white/70 max-w-md leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}>
              Threat intelligence, certification guides, career advice, and hands-on cybersecurity insights.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}>
              <div className="inline-flex items-center gap-1.5 border border-white/30 rounded-full px-4 py-2"
                style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}>
                <Link to="/" className="text-white/70 hover:text-white text-xs font-medium no-underline transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Home</Link>
                <span className="text-white/40 text-xs">/</span>
                <span className="text-white text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Blog</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LISTING ── */}
      <section className="py-14 sm:py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1 max-w-lg">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                style={{ fontFamily: "'DM Sans', sans-serif" }} />
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 border cursor-pointer
                  ${category === c ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {c}
              </button>
            ))}
          </div>

          {/* Featured */}
          {featured.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Featured</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {featured.map((post, i) => (
                  <motion.div key={post.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    onClick={() => setActive(post)}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col">
                    <div className="relative overflow-hidden" style={{ paddingBottom: "48%" }}>
                      <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-4 left-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${CAT_COLORS[post.category] ?? "bg-gray-100 text-gray-600"}`}
                          style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.category}</span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-2 text-gray-400 text-[11px]">
                        <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                        <span>·</span>
                        <span>{post.date}</span>
                        <span>·</span>
                        <div className="flex items-center gap-1"><StarRating value={post.avgRating} /><span>({post.ratingCount})</span></div>
                      </div>
                      <h2 className="text-[#0a0f1e] font-bold text-xl leading-snug mb-2 group-hover:text-blue-600 transition-colors flex-1"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>{post.title}</h2>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">B</div>
                          <span className="text-[#0a0f1e] text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.author}</span>
                        </div>
                        <span className="text-blue-600 text-xs font-bold flex items-center gap-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Read Article <ArrowUpRight size={11} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Regular grid */}
          {regular.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                <span className="text-gray-500 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {category === "All" ? "All Articles" : category}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {regular.map((post, i) => (
                  <motion.div key={post.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    onClick={() => setActive(post)}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col">
                    <div className="relative overflow-hidden" style={{ paddingBottom: "52%" }}>
                      <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-3 left-3">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${CAT_COLORS[post.category] ?? "bg-gray-100 text-gray-600"}`}
                          style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.category}</span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2 text-gray-400 flex-wrap text-[10px]">
                        <span className="flex items-center gap-1"><Clock size={9} />{post.readTime}</span>
                        <span>·</span><span>{post.date}</span>
                        <span>·</span>
                        <div className="flex items-center gap-1"><StarRating value={post.avgRating} /><span>({post.ratingCount})</span></div>
                      </div>
                      <h3 className="text-[#0a0f1e] font-bold text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors flex-1"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>{post.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[9px] font-bold shrink-0">B</div>
                          <span className="text-gray-400 text-[10px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.author}</span>
                        </div>
                        <span className="text-blue-600 text-[10px] font-bold flex items-center gap-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Read <ArrowUpRight size={9} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <BookOpen size={44} className="text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 text-base font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>No articles found</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;