import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Shield, Lock, Cloud, Database, Cpu, ArrowUpRight, Github, Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#020812] text-white relative overflow-hidden">
      {/* Subtle grid lines */}
      {/* <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} /> */}
      {/* Blue glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-blue-600 to-transparent" />

      <div className="container mx-auto px-4 sm:px-8 lg:px-14 max-w-[1200px] relative z-10">

        {/* Top strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
              <Shield size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>BYTITUDE</span>
          </div>
          <p className="text-white/40 text-xs text-center sm:text-right" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Cybersecurity Upskilling · Certification · Talent Assessment
          </p>
          <div className="flex items-center gap-2">
            {[
              { icon: Twitter,  href: "#",  label: "Twitter"  },
              { icon: Linkedin, href: "#",  label: "LinkedIn" },
              { icon: Youtube,  href: "#",  label: "YouTube"  },
              { icon: Github,   href: "#",  label: "GitHub"   },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-blue-600 flex items-center justify-center text-white/40 hover:text-white transition-all duration-200 no-underline">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <p className="text-white/50 text-xs leading-relaxed mb-5 max-w-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              A leading cybersecurity upskilling, certification, and talent assessment company — enabling individuals, businesses, and universities to sharpen their offensive and defensive security expertise.
            </p>
            <div className="space-y-2">
              <a href="mailto:info@bytitude.com"
                className="flex items-center gap-2.5 text-white/50 hover:text-blue-400 text-xs transition-colors no-underline"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <Mail size={13} className="shrink-0" /> info@bytitude.com
              </a>
              <a href="tel:+1234567890"
                className="flex items-center gap-2.5 text-white/50 hover:text-blue-400 text-xs transition-colors no-underline"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <Phone size={13} className="shrink-0" /> +234 901 547 5545
              </a>
              <span className="flex items-center gap-2.5 text-white/50 text-xs"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <MapPin size={13} className="shrink-0" /> Sam Ewang Ext. Abeokuta<br></br>
ABK 110101, Ogun State, Nigeria
              </span>
            </div>
          </div>

          {/* Courses */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Courses</p>
            <div className="space-y-2.5">
              {[
                { label: "Cybersecurity", icon: Lock, href: "/courses/cybersecurity" },
                { label: "Data Science",   icon: Database, href: "/courses/data-science" },
                { label: "Cloud Computing",icon: Cloud, href: "/courses/cloud-computing" },
                { label: "Computer Hardware",icon: Cpu, href: "/courses/computer-hardware" },
              ].map(({ label, icon: Icon, href }) => (
                <Link key={label} to={href}
                  className="flex items-center gap-2 text-white/50 hover:text-white text-xs transition-colors no-underline group"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <Icon size={11} className="text-blue-600 shrink-0 group-hover:text-blue-400 transition-colors" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Company</p>
            <div className="space-y-2.5">
              {[
                // { label: "About Us",    href: "/about"    },
                { label: "Services",    href: "/services" },
                { label: "Training",    href: "/training" },
                { label: "Pricing",     href: "/pricing"  },
                { label: "Contact",     href: "/contact"  },
              ].map(({ label, href }) => (
                <Link key={label} to={href}
                  className="block text-white/50 hover:text-white text-xs transition-colors no-underline"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Resources</p>
            <div className="space-y-2.5">
              {[
                { label: "Blog & Articles", href: "/resources" },
                { label: "Testimonials",    href: "/testimonials" },
                { label: "Register",        href: "/register"  },
              ].map(({ label, href }) => (
                <Link key={label} to={href}
                  className="block text-white/50 hover:text-white text-xs transition-colors no-underline"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Cert badges row */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-white/5">
          {["CEH Prep", "CISSP Prep", "CompTIA Security+", "AWS Security", "Azure AZ-500", "OSCP Track"].map((badge) => (
            <span key={badge}
              className="text-[10px] font-bold text-blue-400/70 border border-blue-600/20 px-2.5 py-1 rounded-full bg-blue-600/5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-[11px] text-white/30"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <p>© {new Date().getFullYear()} BYTITUDE. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/legal" className="hover:text-white/60 transition-colors no-underline">Privacy Policy</Link>
            <Link to="/legal" className="hover:text-white/60 transition-colors no-underline">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;