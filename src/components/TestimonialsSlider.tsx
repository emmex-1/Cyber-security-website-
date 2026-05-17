import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Cloud, Shield, Database, Cpu } from "lucide-react";

const testimonials = [
  {
    quote:
      " Their services are so professional and focused on satisfying their customers.",
    name: "Rodiat",
    jobTitle: "Security Analyst",
    location: "Lagos, Nigeria",
    track: "CYBERSECURITY — CEH TRACK",
    // trackIcon: Lock,
    rating: 5,
  },
  {
    quote:
      " BYTITUDE keep to their promises and they provide excellent services. I will patronize them over and over again. ",
    name: "Sesan",
    jobTitle: "Security Engineer",
    location: "Abuja, Nigeria",
    track: "CLOUD COMPUTING — AWS TRACK",
    // trackIcon: Cloud,
    rating: 5,
  },
  {
    quote:
      " BYTITUDE is one of a kind and they definitely know how to keep organizations data and assets secure .",
    name: "Oladapo",
    jobTitle: "Security Analyst",
    location: "Port Harcourt, Nigeria",
    track: "CYBERSECURITY — SOC TRACK",
    // trackIcon: Shield,
    rating: 5,
  },
  {
    quote:
      "BYTITUDE's Data Science for Security course opened my eyes to how machine learning can be applied to threat detection.",
    name: "Taiwo Adeyemi",
    jobTitle: "Threat Intelligence Analyst",
    location: "Ibadan, Nigeria",
    track: "DATA SCIENCE — SECURITY TRACK",
    // trackIcon: Database,
    rating: 5,
  },
  {
    quote:
      "The CompTIA Network+ course gave me the networking foundation I needed. Passed on the first attempt.",
    name: "Oluwaseun Balogun",
    jobTitle: "Network Security Technician",
    location: "Abeokuta, Nigeria",
    track: "HARDWARE — NETWORK+ TRACK",
    // trackIcon: Cpu,
    rating: 5,
  },
];

/* ⭐ Stars */
const StarRating = ({ count }: { count: number }) => (
  <div className="flex items-center gap-1 mb-4">
    {Array.from({ length: count }).map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="#f59e0b"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ITEMS_PER_VIEW = 3;

const TestimonialsSlider = () => {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  /* Auto slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + ITEMS_PER_VIEW) % total);
    }, 9000);

    return () => clearInterval(interval);
  }, [total]);

  const visible = testimonials.slice(index, index + ITEMS_PER_VIEW);

  const display =
    visible.length < ITEMS_PER_VIEW
      ? [
          ...visible,
          ...testimonials.slice(0, ITEMS_PER_VIEW - visible.length),
        ]
      : visible;

  return (
    <section className="py-16 sm:py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.22em]">
            Student Stories
          </span>
          <h2 className="text-[#0a0f1e] font-bold text-3xl sm:text-4xl">
            What Our Students Say
          </h2>
        </div>

        {/* GRID SLIDER */}
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {display.map((t, i) => {
            // const TrackIcon = t.trackIcon;

            return (
              <div
                key={i}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
              >
                {/* Track badge */}
                <div className="inline-flex items-center border border-gray-200 rounded-full px-3 py-1.5 mb-4">

                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {t.track}
                  </span>
                </div>

                <StarRating count={t.rating} />

                <p className="text-[#0a0f1e] text-sm leading-relaxed mb-6">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#0a0f1e] font-bold text-sm">
                      {t.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {t.jobTitle} · {t.location}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;