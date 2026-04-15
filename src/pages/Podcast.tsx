import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Play, Pause, Search, Headphones, Calendar, ChevronRight,
  Youtube, SkipBack, SkipForward, Volume2, VolumeX,
  RotateCcw, RotateCw,
} from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "/images/hero-home.jpg";
import timImage from "/images/thumb1.jpg";
import timsImage from "/images/thumb2.jpg";
import timmImage from "/images/thumb3.jpg";
import timiImage from "/images/thumb4.jpg";
import timeImage from "/images/thumb5.jpg";
import timzImage from "/images/timz.jpg";
import timxImage from "/images/timx.jpg";

/* ═══════════════════════════════════════════════════════════════════════════
   SANITY CMS INTEGRATION GUIDE
   ─────────────────────────────────────────────────────────────────────────
   1. npm install @sanity/client
   2. Create /src/lib/sanity.ts with createClient()
   3. Schema fields: id, type, title, date, topic, desc,
      youtube, youtubeWatch, audioUrl, image, duration, season
   4. Replace STATIC_EPISODES with sanityClient.fetch(QUERY)
   5. Uncomment useEffect block below
═══════════════════════════════════════════════════════════════════════════ */

type EpisodeType = "video" | "audio" | "both";

interface Episode {
  id:           number;
  type:         EpisodeType;
  title:        string;
  date:         string;
  topic:        string;
  desc:         string;
  youtube:      string;
  youtubeWatch: string;
  audioUrl:     string;
  image:        string;
  duration:     string;
  season:       string;
}

/* ─── Static episode data ─────────────────────────────────────────────── */
const STATIC_EPISODES: Episode[] = [
  {
    id: 1, type: "video",
    title: "Why Behavioral Finance Matters for Homeownership",
    date: "March 5, 2026", topic: "Behavioral Finance",
    desc: "Exploring how your mindset about money shapes your ability to buy a home. Tim breaks down the psychological barriers that hold most families back from achieving homeownership.",
    youtube: "https://www.youtube.com/embed/Y7JF487uMQ4?si=enbrISj8ccOZps1u",
    youtubeWatch: "https://youtu.be/syZcdlQUg_o",
    audioUrl: "", image: timiImage, duration: "42:18", season: "Season 2",
  },
  {
    id: 2, type: "audio",
    title: "The Debt Trap: Breaking Free for Good",
    date: "February 26, 2026", topic: "Debt",
    desc: "Practical strategies for eliminating high-interest debt and building the financial resilience you need before applying for a mortgage. A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring.",
    youtube: "", youtubeWatch: "",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    image: timsImage, duration: "38:45", season: "Season 2",
  },
  {
    id: 3, type: "video",
    title: "Credit Scores Decoded",
    date: "February 19, 2026", topic: "Credit",
    desc: "What actually affects your credit score and how to improve it fast. The five factors most people ignore — and how Tim's clients fixed them in 90 days.",
    youtube: "https://www.youtube.com/embed/C8LAJte9YXE?si=uuJzB7GarhHKrv_Y",
    youtubeWatch: "https://youtu.be/dQw4w9WgXcQ",
    audioUrl: "", image: timmImage, duration: "35:22", season: "Season 2",
  },
  {
    id: 4, type: "both",
    title: "Building an Emergency Fund From Scratch",
    date: "February 12, 2026", topic: "Savings",
    desc: "How to start saving even when money is tight. Tim walks through the exact framework used in the Stabilization Phase of Own Your Home. A wonderful serenity has taken possession of my entire soul.",
    youtube: "https://www.youtube.com/embed/sS1-Ygjb27s?si=XjK2UVjLQXY-_Qb5",
    youtubeWatch: "https://www.youtube.com/watch?v=sS1-Ygjb27s",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    image: timzImage, duration: "29:54", season: "Season 2",
  },
  {
    id: 5, type: "audio",
    title: "First-Time Homebuyer Myths Busted",
    date: "February 5, 2026", topic: "Homebuying",
    desc: "Common misconceptions that keep people from pursuing homeownership — and the truth that could change everything for your family. I am alone, and feel the charm of existence in this spot.",
    youtube: "", youtubeWatch: "",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    image: timeImage, duration: "44:07", season: "Season 1",
  },
  {
    id: 6, type: "video",
    title: "Wellness & Wealth: The Connection",
    date: "January 29, 2026", topic: "Wellness",
    desc: "Why physical and mental health are essential to financial success. Tim explores how TC Lifestyle Fit bridges the gap between personal and financial wellness.",
    youtube: "https://www.youtube.com/embed/XSZMGnL8JIA?si=rAgHXb-W3FuwUT4e",
    youtubeWatch: "https://www.youtube.com/watch?v=XSZMGnL8JIA",
    audioUrl: "", image: timxImage, duration: "51:33", season: "Season 1",
  },
  {
    id: 7, type: "both",
    title: "Aligning Your Budget With Your Life Goals",
    date: "January 15, 2026", topic: "Budgeting",
    desc: "Tim reveals how to design a budget that doesn't feel restrictive — one that actually supports the life you're working toward right now.",
    youtube: "https://www.youtube.com/embed/poDzR1xyD_k?si=idV4jYBKCp17L6be",
    youtubeWatch: "https://www.youtube.com/watch?v=poDzR1xyD_k",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    image: timsImage, duration: "37:20", season: "Season 1",
  },
];

const ALL_TOPICS = ["All", ...Array.from(new Set(STATIC_EPISODES.map((e) => e.topic)))];

const TOPIC_COLORS: Record<string, string> = {
  "Behavioral Finance": "bg-orange-500/20 text-orange-400",
  "Debt":               "bg-red-500/20    text-red-400",
  "Credit":             "bg-blue-500/20   text-blue-400",
  "Savings":            "bg-green-500/20  text-green-400",
  "Homebuying":         "bg-purple-500/20 text-purple-400",
  "Wellness":           "bg-pink-500/20   text-pink-400",
  "Budgeting":          "bg-yellow-500/20 text-yellow-400",
};

/* ═══════════════════════════════════════════════════════════════════════════
   INLINE AUDIO PLAYER — matches reference image exactly
   Dark background, thumbnail left, title/meta/desc right,
   full player bar at bottom: ← rewind | play | forward →  ——— seek bar ——— time  🔊——
═══════════════════════════════════════════════════════════════════════════ */
const InlineAudioPlayer = ({
  ep,
  index,
}: {
  ep: Episode;
  index: number;
}) => {
  const audioRef  = useRef<HTMLAudioElement>(null);
  const [playing,  setPlaying ] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current,  setCurrent ] = useState(0);
  const [dur,      setDur     ] = useState(0);
  const [volume,   setVolume  ] = useState(1);
  const [muted,    setMuted   ] = useState(false);

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => { setCurrent(a.currentTime); setProgress((a.currentTime / (a.duration || 1)) * 100); };
    const onLoad = () => setDur(a.duration);
    const onEnd  = () => { setPlaying(false); setProgress(0); setCurrent(0); };
    a.addEventListener("timeupdate",    onTime);
    a.addEventListener("loadedmetadata", onLoad);
    a.addEventListener("ended",         onEnd);
    return () => {
      a.removeEventListener("timeupdate",    onTime);
      a.removeEventListener("loadedmetadata", onLoad);
      a.removeEventListener("ended",         onEnd);
    };
  }, []);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else         { a.play();  setPlaying(true);  }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    a.currentTime = pct * a.duration;
  };

  const skip = (s: number) => {
    const a = audioRef.current;
    if (a) a.currentTime = Math.max(0, Math.min(a.duration || 0, a.currentTime + s));
  };

  const handleVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) { audioRef.current.volume = v; audioRef.current.muted = v === 0; }
    setMuted(v === 0);
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !muted;
    setMuted(!muted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="rounded-2xl overflow-hidden border border-white/8"
      style={{ background: "#1a1a1a" }}
    >
      <audio ref={audioRef} src={ep.audioUrl} preload="metadata" />

      {/* ── Top row: thumbnail left + content right ── */}
      <div className="flex gap-0">

        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-32 sm:w-40 md:w-48 self-stretch">
          <img
            src={ep.image}
            alt={ep.title}
            className="w-full h-full object-cover"
            style={{ minHeight: 130 }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="flex-1 px-5 py-4 min-w-0">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${TOPIC_COLORS[ep.topic] ?? "bg-white/10 text-white/60"}`}
              style={{ fontFamily: "'Lato',sans-serif" }}
            >
              {ep.topic}
            </span>
            <span className="text-white/30 text-xs">·</span>
            <span className="text-white/40 text-[11px]" style={{ fontFamily: "'Lato',sans-serif" }}>
              {ep.date}
            </span>
            <span className="text-white/30 text-xs">·</span>
            <span className="text-white/40 text-[11px]" style={{ fontFamily: "'Lato',sans-serif" }}>
              {ep.season}
            </span>
            <span className="text-white/30 text-xs">·</span>
            <span className="text-white/40 text-[11px]" style={{ fontFamily: "'Lato',sans-serif" }}>
              {ep.duration}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-white font-bold text-base sm:text-lg leading-snug mb-2"
            style={{ fontFamily: "'Cormorant Garamond',Georgia,serif" }}
          >
            {ep.title}
          </h3>

          {/* Description */}
          <p
            className="text-white/45 text-xs sm:text-sm leading-relaxed line-clamp-2"
            style={{ fontFamily: "'Lato',sans-serif" }}
          >
            {ep.desc}
          </p>
        </div>
      </div>

      {/* ── Player bar at bottom — matches reference exactly ── */}
      <div
        className="flex items-center gap-3 px-4 sm:px-5 py-3 border-t border-white/8"
        style={{ background: "#141414" }}
      >
        {/* Rewind 15s */}
        <button
          onClick={() => skip(-15)}
          className="text-white/50 hover:text-white transition-colors border-none bg-transparent cursor-pointer p-1 flex-shrink-0"
          title="Rewind 15s"
        >
          <RotateCcw size={16} />
        </button>

        {/* Play / Pause — green circle like reference */}
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-none cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-lg"
          style={{ background: "#22c55e" }}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing
            ? <Pause size={14} fill="white" className="text-white" />
            : <Play  size={14} fill="white" className="text-white ml-0.5" />
          }
        </button>

        {/* Forward 15s */}
        <button
          onClick={() => skip(15)}
          className="text-white/50 hover:text-white transition-colors border-none bg-transparent cursor-pointer p-1 flex-shrink-0"
          title="Forward 15s"
        >
          <RotateCw size={16} />
        </button>

        {/* Current time */}
        <span
          className="text-white/40 text-[11px] flex-shrink-0 tabular-nums"
          style={{ fontFamily: "'Lato',sans-serif", minWidth: 32 }}
        >
          {fmt(current)}
        </span>

        {/* ── Seek / Progress bar ── */}
        <div
          className="flex-1 relative h-1.5 rounded-full cursor-pointer group"
          style={{ background: "rgba(255,255,255,0.12)" }}
          onClick={seek}
        >
          {/* Filled portion */}
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-none"
            style={{ width: `${progress}%`, background: "#22c55e" }}
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>

        {/* Total duration */}
        <span
          className="text-white/40 text-[11px] flex-shrink-0 tabular-nums"
          style={{ fontFamily: "'Lato',sans-serif", minWidth: 32 }}
        >
          {fmt(dur)}
        </span>

        {/* Volume icon */}
        <button
          onClick={toggleMute}
          className="text-white/50 hover:text-white transition-colors border-none bg-transparent cursor-pointer p-1 flex-shrink-0"
        >
          {muted || volume === 0
            ? <VolumeX size={15} />
            : <Volume2 size={15} />
          }
        </button>

        {/* Volume slider */}
        <input
          type="range"
          min="0" max="1" step="0.05"
          value={muted ? 0 : volume}
          onChange={handleVol}
          className="w-16 sm:w-20 h-1 cursor-pointer flex-shrink-0"
          style={{ accentColor: "#22c55e" }}
        />

        {/* Headphones icon — decorative */}
        <Headphones size={15} className="text-white/30 flex-shrink-0 hidden sm:block" />
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   VIDEO CARD — full 16:9 box, description + date + YouTube button below
═══════════════════════════════════════════════════════════════════════════ */
const VideoCard = ({ ep, index }: { ep: Episode; index: number }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Full-width 16:9 video box */}
      <div className="relative w-full bg-gray-900 overflow-hidden" style={{ paddingBottom: "56.25%" }}>
        {!playing ? (
          <>
            <img
              src={ep.image}
              alt={ep.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />

            {/* Video badge top-left */}
            <div className="absolute top-3 left-3">
              <span
                className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ fontFamily: "'Lato',sans-serif" }}
              >
                <Play size={8} fill="white" /> Video
              </span>
            </div>

            {/* Duration badge top-right */}
            <div className="absolute top-3 right-3">
              <span
                className="bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded"
                style={{ fontFamily: "'Lato',sans-serif" }}
              >
                {ep.duration}
              </span>
            </div>

            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group border-none bg-transparent cursor-pointer"
              aria-label="Play video"
            >
              <span className="w-14 h-14 rounded-full bg-orange-500 group-hover:bg-orange-600 flex items-center justify-center shadow-2xl transition-all duration-200 group-hover:scale-110">
                <Play size={22} fill="white" className="text-white ml-1" />
              </span>
            </button>
          </>
        ) : (
          <iframe
            src={`${ep.youtube}?autoplay=1`}
            title={ep.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Content below */}
      <div className="flex flex-col flex-1 p-5">
        {/* Topic + date */}
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
              TOPIC_COLORS[ep.topic]?.replace("bg-", "bg-").replace("/20", "/15").replace("text-", "text-") ??
              "bg-gray-100 text-gray-600"
            }`}
            style={{
              fontFamily: "'Lato',sans-serif",
              background: "rgba(249,115,22,0.10)",
              color: "#f97316",
            }}
          >
            {ep.topic}
          </span>
          <span className="text-gray-300 text-xs">•</span>
          <span
            className="text-[11px] text-gray-400 flex items-center gap-1"
            style={{ fontFamily: "'Lato',sans-serif" }}
          >
            <Calendar size={10} /> {ep.date}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-[#0B1C3A] font-bold text-base leading-snug mb-2 flex-1"
          style={{ fontFamily: "'Cormorant Garamond',Georgia,serif" }}
        >
          {ep.title}
        </h3>

        {/* Description */}
        <p
          className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4"
          style={{ fontFamily: "'Lato',sans-serif" }}
        >
          {ep.desc}
        </p>

        {/* Watch on YouTube */}
        <a
          href={ep.youtubeWatch || ep.youtube.replace("embed/", "watch?v=")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 no-underline w-fit"
        >
          <span
            className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-red-700 transition-colors text-white text-xs font-bold rounded-full px-4 py-2 cursor-pointer"
            style={{ fontFamily: "'Lato',sans-serif" }}
          >
            <Youtube size={13} /> Watch on YouTube
          </span>
        </a>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PODCAST PAGE
═══════════════════════════════════════════════════════════════════════════ */
const Podcast = () => {
  const [search,      setSearch     ] = useState("");
  const [topicFilter, setTopicFilter] = useState("All");
  const [typeFilter,  setTypeFilter ] = useState<"all" | "video" | "audio">("all");
  const [episodes]                    = useState<Episode[]>(STATIC_EPISODES);

  /* ── Sanity fetch (uncomment when ready) ──────────────────────────────
     useEffect(() => {
       import("@/lib/sanity").then(({ sanityClient }) => {
         sanityClient
           .fetch(`*[_type == "episode"] | order(date desc) {
             id, type, title, date, topic, desc, youtube, youtubeWatch, audioUrl,
             "image": image.asset->url, duration, season
           }`)
           .then((data) => setEpisodes(data));
       });
     }, []);
  ──────────────────────────────────────────────────────────────────────── */

  const filtered = episodes.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.desc.toLowerCase().includes(search.toLowerCase());
    const matchTopic = topicFilter === "All" || e.topic === topicFilter;
    const matchType =
      typeFilter === "all"   ? true :
      typeFilter === "video" ? (e.type === "video" || e.type === "both") :
      typeFilter === "audio" ? (e.type === "audio" || e.type === "both") :
      true;
    return matchSearch && matchTopic && matchType;
  });

  const videoEps = filtered.filter((e) => e.type === "video" || e.type === "both");
  const audioEps = filtered.filter((e) => e.type === "audio" || e.type === "both");

  return (
    <Layout>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[220px] sm:min-h-[280px] lg:min-h-[340px]">
          <img src={heroImage} alt="Podcast & Videos" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/80" />
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.3) 0px,rgba(255,255,255,0.3) 1px,transparent 1px,transparent 60px)" }}
          />
          <div className="relative z-10 flex flex-col justify-end h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[340px] px-6 sm:px-10 lg:px-16 pb-8 sm:pb-10 pt-20 sm:pt-24">
            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white font-bold leading-tight mb-3"
              style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(36px,6vw,80px)" }}
            >
              Podcast & Videos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
              className="text-white/75 max-w-sm sm:max-w-md leading-relaxed mb-6"
              style={{ fontFamily: "'Lato',sans-serif", fontSize: "clamp(13px,1.6vw,16px)" }}
            >
              Weekly insights on money, mindset, and the path to homeownership.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}>
              <div
                className="inline-flex items-center gap-1.5 border border-white/30 rounded-full px-4 py-2"
                style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}
              >
                <Link to="/" className="text-white/70 hover:text-white text-xs sm:text-sm font-medium transition-colors no-underline" style={{ fontFamily: "'Lato',sans-serif" }}>Home</Link>
                <span className="text-white/40 text-xs">/</span>
                <span className="text-white text-xs sm:text-sm font-semibold" style={{ fontFamily: "'Lato',sans-serif" }}>Podcast</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          EPISODES
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Section header */}
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
              <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'Lato',sans-serif" }}>Listen & Learn</span>
            </div>
            <h2 className="text-[#0B1C3A] font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-1" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
              Our Episodes
            </h2>
            <p className="text-gray-400 text-sm" style={{ fontFamily: "'Lato',sans-serif" }}>
              Watch the full video or listen to the audio — your choice on every episode.
            </p>
          </div>

          {/* ── Search ── */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search episodes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              style={{ fontFamily: "'Lato',sans-serif" }}
            />
          </div>

          {/* ── Type filter ── */}
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              { value: "all",   label: "All Types",  icon: null },
              { value: "video", label: "Video",      icon: <Play size={10} fill="currentColor" /> },
              { value: "audio", label: "Audio Only", icon: <Headphones size={10} /> },
            ].map(({ value, label, icon }) => (
              <button
                key={value}
                onClick={() => setTypeFilter(value as typeof typeFilter)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 border cursor-pointer
                  ${typeFilter === value
                    ? "bg-[#0B1C3A] text-white border-[#0B1C3A] shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#0B1C3A] hover:text-[#0B1C3A]"
                  }`}
                style={{ fontFamily: "'Lato',sans-serif" }}
              >
                {icon}{label}
              </button>
            ))}
          </div>

          {/* ── Topic filter ── */}
          <div className="flex flex-wrap gap-2 mb-10">
            {ALL_TOPICS.map((t) => (
              <button
                key={t}
                onClick={() => setTopicFilter(t)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 border cursor-pointer
                  ${topicFilter === t
                    ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-500"
                  }`}
                style={{ fontFamily: "'Lato',sans-serif" }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Results count */}
          {(search || topicFilter !== "All" || typeFilter !== "all") && (
            <p className="text-xs text-gray-400 mb-6" style={{ fontFamily: "'Lato',sans-serif" }}>
              {filtered.length} episode{filtered.length !== 1 ? "s" : ""} found
            </p>
          )}

          {/* ════════════════════════════════════════
              VIDEO EPISODES — 3 per row
          ════════════════════════════════════════ */}
          {(typeFilter === "all" || typeFilter === "video") && videoEps.length > 0 && (
            <div className="mb-14 sm:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Play size={13} className="text-orange-500" fill="currentColor" />
                </div>
                <h3 className="text-[#0B1C3A] font-bold text-xl sm:text-2xl" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
                  Video Episodes
                </h3>
                <span className="text-xs font-bold text-gray-400 bg-gray-200 px-2.5 py-1 rounded-full" style={{ fontFamily: "'Lato',sans-serif" }}>
                  {videoEps.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {videoEps.map((ep, i) => (
                  <VideoCard key={ep.id} ep={ep} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════
              AUDIO EPISODES — full-width dark rows
              like the reference image
          ════════════════════════════════════════ */}
          {(typeFilter === "all" || typeFilter === "audio") && audioEps.length > 0 && (
            <div className="mb-14 sm:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
                  <Headphones size={13} className="text-green-600" />
                </div>
                <h3 className="text-[#0B1C3A] font-bold text-xl sm:text-2xl" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
                  Audio Episodes
                </h3>
                <span className="text-xs font-bold text-gray-400 bg-gray-200 px-2.5 py-1 rounded-full" style={{ fontFamily: "'Lato',sans-serif" }}>
                  {audioEps.length}
                </span>
              </div>

              {/* Full-width dark rows — matching reference */}
              <div className="space-y-4">
                {audioEps.map((ep, i) => (
                  <InlineAudioPlayer key={ep.id} ep={ep} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Headphones size={48} className="text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 text-base font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
                No episodes found
              </p>
              <p className="text-gray-300 text-sm" style={{ fontFamily: "'Lato',sans-serif" }}>
                Try adjusting your search or filter
              </p>
            </div>
          )}

          {/* CTAs */}
          {filtered.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <a
                href="https://www.youtube.com/@TimCollins-ownyourhome"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-bold text-sm rounded-full pl-6 pr-2 py-3 no-underline border-none cursor-pointer"
                style={{ fontFamily: "'Lato',sans-serif" }}
              >
                Subscribe on YouTube
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white shrink-0">
                  <ChevronRight size={14} className="text-orange-500" />
                </span>
              </a>
              <button
                className="inline-flex items-center gap-3 bg-[#0B1C3A] hover:bg-[#132847] active:scale-95 transition-all text-white font-bold text-sm rounded-full pl-6 pr-2 py-3 border-none cursor-pointer"
                style={{ fontFamily: "'Lato',sans-serif" }}
              >
                All Episodes
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 shrink-0">
                  <ChevronRight size={14} className="text-white" />
                </span>
              </button>
            </div>
          )}

        </div>
      </section>

    </Layout>
  );
};

export default Podcast;