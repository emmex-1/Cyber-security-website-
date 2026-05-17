import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import logo from "/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/courses", label: "Courses" },
  { to: "/workshops", label: "Pricing" },
  { to: "/training", label: "Training" },
  // { to: "/membership", label: "Membership" },
  { to: "/organization", label: "Corporate" },
  // { to: "/gallery", label: "Testimonials" },
  { to: "/resources", label: "Blogs" },
  // { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden]     = useState(false);
  const lastY = useRef(0);

  /* ── scroll behaviour: hide on scroll-down, show on scroll-up ── */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    if (y > lastY.current && y > 80) setHidden(true);
    else setHidden(false);
    lastY.current = y;
  });

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Main pill bar ── */}
      <motion.nav
        // animate={{ y: hidden ? -90 : 0 }}
        // transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-4"
      >
<motion.div
  animate={{
boxShadow: scrolled
  ? "0 10px 40px rgba(0,0,0,0.35)"
  : "0 6px 25px rgba(0,0,0,0.2)",
    backgroundColor: scrolled
      ? "rgba(15, 23, 42, 0.65)"   // dark glass (nice for hero sections)
      : "rgba(15, 23, 42, 0.45)",
  }}
  transition={{ duration: 0.3 }}
className="flex items-center justify-between w-full max-w-7xl h-14 sm:h-16 px-4 sm:px-6 rounded-full backdrop-blur-2xl bg-white/5 border border-white/20"
>

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <motion.span
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0B1C3A] overflow-hidden shrink-0"
            >
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            </motion.span>
            <span className="font-bold text-white text-sm sm:text-base leading-tight tracking-tight">
              BYTITUDE
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link key={link.to} to={link.to} className="relative px-2.5 xl:px-3 py-1.5 group">
                  {/* animated active pill */}
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-blue-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* hover bg */}
                  {!active && (
                    <span className="absolute inset-0 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                  )}
                  <span
                    className={`relative z-10 text-[11px] xl:text-xs font-semibold whitespace-nowrap transition-colors duration-150
                      ${active ? "text-white" : "text-white group-hover:text-gray-900"}`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA + mobile burger ── */}
          <div className="flex items-center gap-2.5">
            <Link to="/register" className="hidden lg:flex shrink-0">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs xl:text-sm rounded-full pl-5 pr-1.5 py-1.5 transition-colors"
              >
                Register Now
                <motion.span
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center w-7 h-7 rounded-full bg-white shrink-0"
                >
                  <ArrowUpRight size={13} className="text-blue-500" />
                </motion.span>
              </motion.button>
            </Link>

            <motion.button
              whileTap={{ scale: 0.92 }}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-[#0B1C3A] text-white"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X size={17} />
                  </motion.span>
                ) : (
                  <motion.span key="menu"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu size={17} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

        </motion.div>
      </motion.nav>

      {/* ── Mobile backdrop ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 lg:hidden bg-white border border-gray-100 shadow-2xl rounded-3xl overflow-hidden flex flex-col"
            style={{ top: 72, left: 12, right: 12, maxHeight: "calc(100dvh - 88px)" }}
          >
            {/* Scrollable links */}
            <ul className="flex-1 overflow-y-auto overscroll-contain p-3 space-y-0.5 min-h-0">
              {navLinks.map((link, i) => {
                const active = location.pathname === link.to;
                return (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.032, duration: 0.28, ease: "easeOut" }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-colors
                        ${active ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"}`}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="w-2 h-2 rounded-full bg-white/70 shrink-0"
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            {/* Sticky CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.032 + 0.05, duration: 0.25 }}
              className="shrink-0 p-4 border-t border-gray-100 bg-white"
            >
              <Link to="/register" onClick={() => setOpen(false)}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm rounded-2xl px-6 py-4 transition-colors"
                >
                  Register Now
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shrink-0">
                    <ArrowUpRight size={13} className="text-blue-500" />
                  </span>
                </motion.button>
              </Link>
              <p className="text-center text-xs text-gray-400 mt-2">Next cohort — March, 2026</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;