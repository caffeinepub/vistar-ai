import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Globe,
  Loader2,
  MessageCircle,
  Package,
  Play,
  Shield,
  Star,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Dashboard } from "./dashboard/Dashboard";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useSubmitWaitlist, useWaitlistCount } from "./hooks/useQueries";

const queryClient = new QueryClient();

const LANGUAGES = [
  "Tamil",
  "Telugu",
  "Marathi",
  "Bengali",
  "Punjabi",
  "Kannada",
  "Gujarati",
  "Odia",
];

const CHIP_POSITIONS = [
  {
    top: "8%",
    left: "4%",
    animClass: "animate-float-1",
    colorClass: "animate-pulse-saffron",
    isSaffron: true,
  },
  {
    top: "15%",
    right: "6%",
    animClass: "animate-float-2",
    colorClass: "animate-pulse-purple",
    isSaffron: false,
  },
  {
    top: "32%",
    left: "2%",
    animClass: "animate-float-3",
    colorClass: "animate-pulse-purple",
    isSaffron: false,
  },
  {
    top: "65%",
    left: "5%",
    animClass: "animate-float-4",
    colorClass: "animate-pulse-saffron",
    isSaffron: true,
  },
  {
    top: "75%",
    right: "3%",
    animClass: "animate-float-5",
    colorClass: "animate-pulse-saffron",
    isSaffron: true,
  },
  {
    top: "45%",
    right: "2%",
    animClass: "animate-float-6",
    colorClass: "animate-pulse-purple",
    isSaffron: false,
  },
  {
    top: "55%",
    left: "1%",
    animClass: "animate-float-7",
    colorClass: "animate-pulse-saffron",
    isSaffron: true,
  },
  {
    top: "25%",
    right: "8%",
    animClass: "animate-float-8",
    colorClass: "animate-pulse-purple",
    isSaffron: false,
  },
];

function LanguageChip({
  lang,
  isSaffron,
  animClass,
}: { lang: string; isSaffron: boolean; animClass: string }) {
  return (
    <div
      className={`absolute hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold select-none pointer-events-none z-20 ${animClass} ${
        isSaffron
          ? "border border-[oklch(0.75_0.18_65/0.5)] bg-[oklch(0.75_0.18_65/0.08)] text-[oklch(0.85_0.15_70)] animate-pulse-saffron"
          : "border border-[oklch(0.65_0.22_293/0.5)] bg-[oklch(0.58_0.22_293/0.08)] text-[oklch(0.75_0.18_293)] animate-pulse-purple"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isSaffron ? "bg-[oklch(0.75_0.18_65)]" : "bg-[oklch(0.65_0.22_293)]"}`}
      />
      {lang}
    </div>
  );
}

function Navbar({
  onRequestAccess,
  isLoggedIn,
  onDashboard,
  onWatchDemo,
}: {
  onRequestAccess: () => void;
  isLoggedIn: boolean;
  onDashboard: () => void;
  onWatchDemo: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-[oklch(0.22_0.015_240/0.5)] py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-black"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.75 0.18 65), oklch(0.62 0.18 60))",
            }}
          >
            V
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Vistar<span className="text-saffron">.ai</span>
          </span>
        </div>

        {/* Centered pill nav */}
        <div className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full glass-sm">
          {["Platform", "Solutions", "How It Works", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              data-ocid={`nav.${item.toLowerCase().replace(/ /g, "-")}.link`}
              className="flex items-center gap-0.5 px-3 py-1.5 rounded-full text-sm text-[oklch(0.62_0.015_240)] hover:text-white hover:bg-[oklch(0.22_0.015_240/0.6)] transition-all duration-200"
            >
              {item} <ChevronDown className="w-3 h-3" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          {!isLoggedIn && (
            <button
              type="button"
              onClick={onWatchDemo}
              data-ocid="nav.watch_demo.button"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-[oklch(0.62_0.015_240)] hover:text-white border border-[oklch(0.22_0.015_240)] hover:border-[oklch(0.35_0.015_240)] transition-all duration-200"
            >
              <Play className="w-3 h-3 fill-current" /> Demo
            </button>
          )}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={onDashboard}
              data-ocid="nav.dashboard.button"
              className="px-4 py-2 rounded-full text-sm font-semibold text-black transition-all duration-200 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                boxShadow: "0 0 20px oklch(0.75 0.18 65 / 0.4)",
              }}
            >
              Launch App →
            </button>
          ) : (
            <button
              type="button"
              onClick={onRequestAccess}
              data-ocid="nav.request_access.button"
              className="px-4 py-2 rounded-full text-sm font-semibold text-black transition-all duration-200 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                boxShadow: "0 0 20px oklch(0.75 0.18 65 / 0.4)",
              }}
            >
              Request Access
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function HeroSection({
  onRequestAccess,
  onWatchDemo,
}: { onRequestAccess: () => void; onWatchDemo: () => void }) {
  const [langIndex, setLangIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLangIndex((i) => (i + 1) % LANGUAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="platform"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.18 0.05 280 / 0.35) 0%, transparent 70%), linear-gradient(180deg, oklch(0.085 0.005 240) 0%, oklch(0.09 0.008 250) 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.75 0.18 65) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.18 65) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating language chips */}
      {CHIP_POSITIONS.map((pos, i) => (
        <div
          key={LANGUAGES[i % LANGUAGES.length]}
          style={{ position: "absolute", ...pos }}
        >
          <LanguageChip
            lang={LANGUAGES[i % LANGUAGES.length]}
            isSaffron={pos.isSaffron}
            animClass={pos.animClass}
          />
        </div>
      ))}

      {/* Glow orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "oklch(0.75 0.18 65)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
        style={{ background: "oklch(0.58 0.22 293)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.75_0.18_65/0.3)] bg-[oklch(0.75_0.18_65/0.06)] mb-8">
          <span className="w-2 h-2 rounded-full bg-[oklch(0.75_0.18_65)] animate-pulse" />
          <span className="text-sm font-medium text-saffron">
            The Creator Expansion Engine
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.08] tracking-tight">
          Go Viral in{" "}
          <span
            key={langIndex}
            className="inline-block text-saffron shimmer-text transition-all duration-500"
            style={{ minWidth: "2ch" }}
          >
            {LANGUAGES[langIndex]}
          </span>
          <br />
          <span className="text-white">& 9 More Languages</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-[oklch(0.62_0.015_240)] max-w-2xl mx-auto mb-10 leading-relaxed">
          The AI Operating System for Indian Creators. Scale your content to{" "}
          <span className="text-white font-medium">500M+ regional viewers</span>{" "}
          — without re-filming a single second.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onRequestAccess}
            data-ocid="hero.request_access.button"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-black transition-all duration-200 hover:scale-105 hover:shadow-saffron"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
              boxShadow: "0 0 25px oklch(0.75 0.18 65 / 0.45)",
            }}
          >
            Request Access
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onWatchDemo}
            data-ocid="hero.watch_demo.button"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white border border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240/0.5)] hover:bg-[oklch(0.18_0.015_240/0.7)] hover:border-[oklch(0.35_0.015_240)] transition-all duration-200"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[oklch(0.22_0.015_240)]">
              <Play className="w-3 h-3 fill-white" />
            </div>
            Watch Demo
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[oklch(0.45_0.015_240)]">
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-saffron" /> No credit card
            required
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-saffron" /> Early access —
            limited spots
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-saffron" /> Results in 24 hours
          </span>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, oklch(0.085 0.005 240), transparent)",
        }}
      />
    </section>
  );
}

function StatsBar() {
  const stats = [
    {
      value: "10+",
      label: "Regional Languages",
      sub: "Including Tamil, Telugu, Marathi & more",
    },
    {
      value: "500M+",
      label: "Regional Viewers",
      sub: "Untapped audience waiting for your content",
    },
    {
      value: "3x",
      label: "Average Reach Multiplier",
      sub: "Within the first 30 days",
    },
  ];

  return (
    <section
      className="relative py-16 border-y border-[oklch(0.22_0.015_240/0.5)]"
      style={{ background: "oklch(0.1 0.008 240)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-[oklch(0.22_0.015_240/0.5)]">
          {stats.map((s) => (
            <div key={s.value} className="text-center px-8">
              <div className="text-4xl font-bold mb-1 shimmer-text">
                {s.value}
              </div>
              <div className="text-white font-semibold text-base mb-1">
                {s.label}
              </div>
              <div className="text-xs text-[oklch(0.5_0.015_240)]">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LingoBridgeSection() {
  const [activeLang, setActiveLang] = useState("Tamil");
  const langs = ["Tamil", "Telugu", "Marathi", "Bengali"];

  const contentMap: Record<
    string,
    { title: string; views: string; likes: string }
  > = {
    Tamil: {
      title: "எப்படி யூடியூப்பில் வைரல் ஆவது",
      views: "2.4M தோட்டம்",
      likes: "124K விருப்பங்கள்",
    },
    Telugu: {
      title: "YouTube లో వైరల్ ఎలా అవ్వాలి",
      views: "2.4M వీక్షణలు",
      likes: "124K లైక్లు",
    },
    Marathi: {
      title: "YouTube वर व्हायरल कसे व्हायचे",
      views: "2.4M दृश्ये",
      likes: "124K आवडी",
    },
    Bengali: {
      title: "ইউটিউবে ভাইরাল কীভাবে হবেন",
      views: "2.4M ভিউ",
      likes: "124K লাইক",
    },
  };

  return (
    <section
      id="solutions"
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.085 0.005 240)" }}
    >
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-5"
        style={{ background: "oklch(0.75 0.18 65)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[oklch(0.75_0.18_65/0.3)] bg-[oklch(0.75_0.18_65/0.06)] mb-6">
          <Globe className="w-3.5 h-3.5 text-saffron" />
          <span className="text-xs font-semibold text-saffron uppercase tracking-widest">
            Hero Feature
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Lingo-Bridge AI —
              <br />
              <span className="text-saffron">Culture-First Dubbing</span>
            </h2>
            <p className="text-[oklch(0.62_0.015_240)] text-lg mb-10 leading-relaxed">
              Not just translation. AI that understands cultural context —
              swapping references, adapting slang, and syncing lips — so your
              content feels locally made.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Globe,
                  title: "Contextual Dubbing",
                  desc: 'AI adapts "Starbucks" to "filter coffee" in South Indian dubs automatically. Every cultural reference lands perfectly.',
                },
                {
                  icon: Zap,
                  title: "Lipsync 2.0",
                  desc: "High-fidelity video manipulation syncs the creator's mouth movements to the regional language in real time.",
                },
                {
                  icon: TrendingUp,
                  title: "Regional Distribution Bot",
                  desc: "Automatically posts dubbed versions to ShareChat, Moj, and 12+ regional-heavy platforms.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "oklch(0.75 0.18 65 / 0.12)",
                      border: "1px solid oklch(0.75 0.18 65 / 0.25)",
                    }}
                  >
                    <Icon className="w-4 h-4 text-saffron" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-[oklch(0.55_0.015_240)] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive mockup */}
          <div className="relative">
            {/* Cultural AI badge */}
            <div
              className="absolute -top-4 -right-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold text-black"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.75 0.18 65), oklch(0.68 0.2 58))",
                boxShadow: "0 0 20px oklch(0.75 0.18 65 / 0.5)",
              }}
            >
              ✦ Cultural AI
            </div>

            <div
              className="glass rounded-2xl p-6"
              style={{
                boxShadow:
                  "0 0 0 1px oklch(0.75 0.18 65 / 0.2), 0 20px 60px oklch(0 0 0 / 0.5)",
              }}
            >
              {/* Language selector */}
              <div className="flex gap-2 mb-5 flex-wrap">
                {langs.map((lang) => (
                  <button
                    type="button"
                    key={lang}
                    data-ocid={`lingo.${lang.toLowerCase()}.tab`}
                    onClick={() => setActiveLang(lang)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
                      activeLang === lang
                        ? "text-black animate-pulse-saffron"
                        : "border border-[oklch(0.22_0.015_240)] text-[oklch(0.55_0.015_240)] hover:border-[oklch(0.35_0.015_240)] hover:text-white"
                    }`}
                    style={
                      activeLang === lang
                        ? {
                            background:
                              "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                          }
                        : {}
                    }
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Video card mockup */}
              <div className="rounded-xl overflow-hidden border border-[oklch(0.22_0.015_240/0.5)] bg-[oklch(0.08_0.005_240)]">
                <div className="relative aspect-video bg-gradient-to-br from-[oklch(0.15_0.05_280)] to-[oklch(0.08_0.02_240)] flex items-center justify-center">
                  <img
                    src="/assets/generated/vistar-hero-mockup.dim_1200x700.png"
                    alt="Content preview"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20">
                      <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                    </div>
                  </div>
                  {/* Active language badge */}
                  <div
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-black"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                    }}
                  >
                    {activeLang}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-white font-semibold text-sm mb-1 transition-all duration-300">
                    {contentMap[activeLang].title}
                  </p>
                  <div className="flex gap-4 text-xs text-[oklch(0.5_0.015_240)]">
                    <span>▶ {contentMap[activeLang].views}</span>
                    <span>♥ {contentMap[activeLang].likes}</span>
                  </div>
                </div>
              </div>

              {/* AI processing indicator */}
              <div className="mt-4 p-3 rounded-xl bg-[oklch(0.1_0.008_240)] border border-[oklch(0.22_0.015_240/0.4)] flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-t-[oklch(0.75_0.18_65)] border-[oklch(0.22_0.015_240/0.4)] animate-spin" />
                <span className="text-xs text-[oklch(0.55_0.015_240)]">
                  Cultural AI adapting content for{" "}
                  <span className="text-saffron">{activeLang}</span> audience...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowToSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      number: "01",
      title: "Connect",
      icon: Globe,
      color: "saffron",
      headline: "Link Your Channel",
      desc: "Connect your YouTube or Instagram in one click. Vistar AI immediately analyzes your top-performing content, engagement patterns, and audience demographics.",
      details: [
        "Analyze top 50 videos",
        "Map audience language preferences",
        "Identify viral content patterns",
        "Segment regional interest clusters",
      ],
    },
    {
      number: "02",
      title: "Localize",
      icon: Zap,
      color: "purple",
      headline: "AI Translates & Adapts",
      desc: "AI selects your top 5 videos and translates them into 3 regional languages — with full cultural context adaptation. Slang, references, humor — all preserved.",
      details: [
        "Cultural reference adaptation",
        "Lipsync video generation",
        "Regional subtitle files",
        "Auto-upload to regional platforms",
      ],
    },
    {
      number: "03",
      title: "Monetize",
      icon: TrendingUp,
      color: "saffron",
      headline: "Ghost-Agent Activates",
      desc: "Your AI agent handles incoming regional brand deal DMs, negotiates rates in your voice, manages community, and filters toxic content — 24/7, without you.",
      details: [
        "Brand deal negotiation AI",
        "Regional community management",
        "Revenue tracking dashboard",
        "Mental health filter active",
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = stepsRef.current.indexOf(
              entry.target as HTMLDivElement,
            );
            if (idx !== -1) setActiveStep(idx);
          }
        }
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" },
    );

    for (const el of stepsRef.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-24 relative"
      style={{ background: "oklch(0.09 0.007 245)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[oklch(0.58_0.22_293/0.3)] bg-[oklch(0.58_0.22_293/0.06)] mb-6">
            <span className="text-xs font-semibold text-purple uppercase tracking-widest">
              3-Step Process
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            From One Language to Ten.
          </h2>
          <p className="text-[oklch(0.6_0.015_240)] text-lg max-w-2xl mx-auto">
            Vistar's three-phase system transforms any creator into a pan-India
            powerhouse.
          </p>
        </div>

        {/* Sticky scroll layout */}
        <div className="lg:grid lg:grid-cols-5 lg:gap-12">
          {/* Sticky step indicator (desktop) */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-28">
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <button
                    type="button"
                    key={step.title}
                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 w-full text-left ${
                      activeStep === i
                        ? step.color === "saffron"
                          ? "glass saffron-border-glow"
                          : "glass purple-border-glow"
                        : "opacity-40 hover:opacity-70"
                    }`}
                    onClick={() => {
                      stepsRef.current[i]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                      style={{
                        background:
                          activeStep === i
                            ? step.color === "saffron"
                              ? "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))"
                              : "linear-gradient(135deg, oklch(0.65 0.22 293), oklch(0.5 0.24 280))"
                            : "oklch(0.16 0.01 240)",
                        color:
                          activeStep === i ? "black" : "oklch(0.55 0.015 240)",
                      }}
                    >
                      {step.number}
                    </div>
                    <div>
                      <div
                        className={`font-bold text-base ${activeStep === i ? "text-white" : ""}`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-[oklch(0.5_0.015_240)]">
                        {step.headline}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scrollable step panels */}
          <div className="lg:col-span-3 space-y-8 lg:space-y-32">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  ref={(el) => {
                    stepsRef.current[i] = el;
                  }}
                  className="glass rounded-2xl p-8"
                  style={{
                    border: `1px solid oklch(${
                      step.color === "saffron"
                        ? "0.75 0.18 65 / 0.2"
                        : "0.58 0.22 293 / 0.2"
                    })`,
                    boxShadow: `0 20px 60px oklch(0 0 0 / 0.4), 0 0 40px oklch(${
                      step.color === "saffron"
                        ? "0.75 0.18 65 / 0.05"
                        : "0.58 0.22 293 / 0.05"
                    })`,
                  }}
                >
                  {/* Step badge - mobile */}
                  <div className="lg:hidden flex items-center gap-3 mb-6">
                    <div
                      className="px-3 py-1 rounded-full text-xs font-bold text-black"
                      style={{
                        background:
                          step.color === "saffron"
                            ? "oklch(0.75 0.18 65)"
                            : "oklch(0.65 0.22 293)",
                      }}
                    >
                      Step {step.number}
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background:
                          step.color === "saffron"
                            ? "oklch(0.75 0.18 65 / 0.12)"
                            : "oklch(0.58 0.22 293 / 0.12)",
                        border: `1px solid oklch(${step.color === "saffron" ? "0.75 0.18 65 / 0.3" : "0.58 0.22 293 / 0.3"})`,
                      }}
                    >
                      <Icon
                        className={`w-5 h-5 ${step.color === "saffron" ? "text-saffron" : "text-purple"}`}
                      />
                    </div>
                    <div>
                      <div
                        className={`text-xs font-semibold uppercase tracking-widest mb-1 ${step.color === "saffron" ? "text-saffron" : "text-purple"}`}
                      >
                        {step.title}
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {step.headline}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[oklch(0.6_0.015_240)] leading-relaxed mb-6">
                    {step.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {step.details.map((d) => (
                      <div
                        key={d}
                        className="flex items-center gap-2 text-sm text-[oklch(0.65_0.015_240)]"
                      >
                        <Check
                          className={`w-3.5 h-3.5 flex-shrink-0 ${step.color === "saffron" ? "text-saffron" : "text-purple"}`}
                        />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div ref={sectionRef} />
    </section>
  );
}

function GhostAgentSection() {
  const [activeMessage, setActiveMessage] = useState(0);

  const messages = [
    {
      from: "BrandX",
      text: "Hi! We'd love to collab for ₹15,000 flat.",
      time: "2:14 PM",
      isAI: false,
    },
    {
      from: "Vistar AI",
      text: "Thanks for reaching out! Based on Arjun's reach (2.4M regional viewers), our standard rate is ₹45,000 + usage rights. Can we discuss?",
      time: "2:14 PM",
      isAI: true,
    },
    {
      from: "BrandX",
      text: "We can do ₹30,000?",
      time: "2:16 PM",
      isAI: false,
    },
    {
      from: "Vistar AI",
      text: "₹38,000 with 30-day exclusivity is our best offer. We'll include a dedicated Tamil & Telugu cut at no extra charge. Deal?",
      time: "2:16 PM",
      isAI: true,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMessage((i) => (i + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.085 0.005 240)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 100% 50%, oklch(0.58 0.22 293 / 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: DM Mockup */}
          <div className="order-2 lg:order-1">
            <div
              className="glass rounded-2xl overflow-hidden"
              style={{
                boxShadow:
                  "0 0 0 1px oklch(0.58 0.22 293 / 0.25), 0 20px 60px oklch(0 0 0 / 0.5)",
              }}
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-[oklch(0.22_0.015_240/0.5)] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[oklch(0.58_0.22_293/0.2)] text-purple">
                  B
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    BrandX India
                  </div>
                  <div className="text-xs text-[oklch(0.5_0.015_240)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Negotiation in progress
                  </div>
                </div>
                <div className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-[oklch(0.58_0.22_293/0.15)] text-purple border border-[oklch(0.58_0.22_293/0.3)]">
                  AI Active
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-4 min-h-[280px]">
                {messages.slice(0, activeMessage + 1).map((msg) => (
                  <div
                    key={`msg-${msg.from}-${msg.time}`}
                    className={`flex ${msg.isAI ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.isAI
                          ? "rounded-tr-sm text-black"
                          : "rounded-tl-sm bg-[oklch(0.18_0.015_240)] text-[oklch(0.75_0.015_240)] border border-[oklch(0.25_0.015_240/0.5)]"
                      }`}
                      style={
                        msg.isAI
                          ? {
                              background:
                                "linear-gradient(135deg, oklch(0.65 0.22 293), oklch(0.5 0.24 280))",
                            }
                          : {}
                      }
                    >
                      {msg.isAI && (
                        <div className="text-[10px] font-bold mb-1 opacity-70">
                          Vistar AI (acting as Arjun)
                        </div>
                      )}
                      {msg.text}
                      <div
                        className={`text-[10px] mt-1 ${msg.isAI ? "opacity-60" : "text-[oklch(0.45_0.015_240)]"}`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Typing indicator */}
              <div className="px-5 py-3 border-t border-[oklch(0.22_0.015_240/0.5)] flex items-center gap-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={`k-${i}`}
                      className="w-1.5 h-1.5 rounded-full bg-purple"
                      style={{
                        animation: `float-1 1.2s ease-in-out infinite ${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-[oklch(0.5_0.015_240)]">
                  Ghost-Agent is composing response...
                </span>
              </div>
            </div>
          </div>

          {/* Right: Copy */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[oklch(0.58_0.22_293/0.3)] bg-[oklch(0.58_0.22_293/0.06)] mb-6">
              <MessageCircle className="w-3.5 h-3.5 text-purple" />
              <span className="text-xs font-semibold text-purple uppercase tracking-widest">
                Layer 2
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Ghost-Agent AI —
              <br />
              <span className="text-purple">Your 24/7 Manager</span>
            </h2>
            <p className="text-[oklch(0.62_0.015_240)] text-lg mb-10 leading-relaxed">
              Top creators lose lakhs in revenue because they can't reply fast
              enough. Ghost-Agent mimics your voice, negotiates deals, and
              manages your community — while you sleep.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: MessageCircle,
                  title: "Negotiation AI",
                  desc: "Trained on 50,000+ influencer contracts. Fights for the best rate, in your exact tone.",
                },
                {
                  icon: Star,
                  title: "Parasocial Manager",
                  desc: "Responds to DMs in your specific vibe — your slang, your emojis, your warmth — keeping superfans engaged.",
                },
                {
                  icon: Shield,
                  title: "Privacy Filter",
                  desc: "Blocks toxic comments and creep DMs before you ever see them. Protecting your mental health is non-negotiable.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-xl bg-[oklch(0.12_0.01_240/0.5)] border border-[oklch(0.22_0.015_240/0.3)] hover:border-[oklch(0.58_0.22_293/0.3)] transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-[oklch(0.58_0.22_293/0.12)] border border-[oklch(0.58_0.22_293/0.25)]">
                    <Icon className="w-4 h-4 text-purple" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {title}
                    </h3>
                    <p className="text-xs text-[oklch(0.52_0.015_240)] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FanToFounderSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.09 0.007 245)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 0% 50%, oklch(0.75 0.18 65 / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[oklch(0.75_0.18_65/0.3)] bg-[oklch(0.75_0.18_65/0.06)] mb-6">
              <Package className="w-3.5 h-3.5 text-saffron" />
              <span className="text-xs font-semibold text-saffron uppercase tracking-widest">
                Layer 3
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Fan-to-Founder —
              <br />
              <span className="text-saffron">Your Own D2C Brand</span>
            </h2>
            <p className="text-[oklch(0.62_0.015_240)] text-lg mb-10 leading-relaxed">
              Most Indian creators struggle to launch their own brands because
              they don't understand logistics. Vistar does it for them — from
              AI-predicted product ideas to verified manufacturers.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: TrendingUp,
                  title: "Sentiment Product Engine",
                  desc: "AI scans thousands of your comments to find recurring pain points and product requests from your audience.",
                },
                {
                  icon: Package,
                  title: "Automated Supply Chain",
                  desc: "Connects you with verified white-label manufacturers in Tirupur, Sialkot via AI matching — no logistics expertise needed.",
                },
                {
                  icon: Globe,
                  title: "Dynamic Landing Pages",
                  desc: "Generates a personalized storefront that changes based on who's clicking — regional language, preferred style, purchase history.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-xl bg-[oklch(0.12_0.01_240/0.5)] border border-[oklch(0.22_0.015_240/0.3)] hover:border-[oklch(0.75_0.18_65/0.3)] transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-[oklch(0.75_0.18_65/0.12)] border border-[oklch(0.75_0.18_65/0.25)]">
                    <Icon className="w-4 h-4 text-saffron" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {title}
                    </h3>
                    <p className="text-xs text-[oklch(0.52_0.015_240)] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product insight card */}
          <div>
            <div
              className="glass rounded-2xl p-6 mb-4"
              style={{
                boxShadow:
                  "0 0 0 1px oklch(0.75 0.18 65 / 0.2), 0 20px 60px oklch(0 0 0 / 0.5)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[oklch(0.75_0.18_65/0.15)] border border-[oklch(0.75_0.18_65/0.3)]">
                  <TrendingUp className="w-4 h-4 text-saffron" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    Product Insight
                  </div>
                  <div className="text-xs text-[oklch(0.5_0.015_240)]">
                    AI analysis · Last 30 days
                  </div>
                </div>
                <div
                  className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold text-black"
                  style={{ background: "oklch(0.75 0.18 65)" }}
                >
                  LIVE
                </div>
              </div>

              <div
                className="p-4 rounded-xl mb-4"
                style={{
                  background: "oklch(0.75 0.18 65 / 0.08)",
                  border: "1px solid oklch(0.75 0.18 65 / 0.2)",
                }}
              >
                <div className="text-3xl font-bold text-saffron mb-1">72%</div>
                <p className="text-sm text-white font-medium">
                  of your audience asked about ethnic fashion in the last 30
                  days
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Ethnic Kurtas", pct: 72 },
                  { label: "Traditional Jewelry", pct: 58 },
                  { label: "Festival Wear", pct: 44 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[oklch(0.65_0.015_240)]">
                        {label}
                      </span>
                      <span className="text-saffron font-semibold">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[oklch(0.18_0.015_240)]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background:
                            "linear-gradient(90deg, oklch(0.75 0.18 65), oklch(0.85 0.15 70))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-[oklch(0.22_0.015_240/0.4)]">
                <p className="text-xs text-[oklch(0.5_0.015_240)] mb-3">
                  Recommended action
                </p>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[oklch(0.14_0.01_240)] border border-[oklch(0.22_0.015_240/0.5)]">
                  <Package className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span className="text-xs text-white">
                    Launch an ethnic kurta line via verified Tirupur
                    manufacturers. Estimated ROI:{" "}
                    <span className="text-saffron font-semibold">340%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection({ onRequestAccess }: { onRequestAccess: () => void }) {
  const plans = [
    {
      name: "Starter",
      price: "₹1,999",
      period: "/month",
      desc: "Perfect for creators starting their regional expansion journey.",
      features: [
        "3 Regional Languages",
        "5 Videos / month",
        "Basic Ghost-Agent (community only)",
        "Regional distribution to 5 platforms",
        "Analytics Dashboard",
        "Email support",
      ],
      cta: "Request Early Access",
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹4,999",
      period: "/month",
      desc: "For serious creators ready to become pan-India powerhouses.",
      features: [
        "10+ Regional Languages",
        "Unlimited Videos",
        "Full Ghost-Agent (negotiation + community)",
        "Fan-to-Founder Suite",
        "Regional distribution to 20+ platforms",
        "Priority support + dedicated manager",
      ],
      cta: "Claim Pro Access",
      highlight: true,
      note: "+ 2–5% on Fan-to-Founder sales",
    },
  ];

  return (
    <section
      id="pricing"
      className="py-24 relative"
      style={{ background: "oklch(0.085 0.005 240)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[oklch(0.75_0.18_65/0.3)] bg-[oklch(0.75_0.18_65/0.06)] mb-6">
            <span className="text-xs font-semibold text-saffron uppercase tracking-widest">
              Simple Pricing
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Built for Ambitious Creators
          </h2>
          <p className="text-[oklch(0.6_0.015_240)] text-lg">
            Early access pricing — locked in for your first 12 months.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              data-ocid={`pricing.${plan.name.toLowerCase()}.card`}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlight
                  ? "glass saffron-border-glow hover:scale-[1.02]"
                  : "bg-[oklch(0.12_0.01_240)] border border-[oklch(0.22_0.015_240)] hover:border-[oklch(0.35_0.015_240)]"
              }`}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-black"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                  }}
                >
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div
                  className={`text-sm font-semibold uppercase tracking-widest mb-2 ${plan.highlight ? "text-saffron" : "text-[oklch(0.55_0.015_240)]"}`}
                >
                  {plan.name}
                </div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-[oklch(0.5_0.015_240)] mb-1">
                    {plan.period}
                  </span>
                </div>
                {plan.note && (
                  <div className="text-xs text-saffron mt-1">{plan.note}</div>
                )}
                <p className="text-sm text-[oklch(0.55_0.015_240)] mt-3">
                  {plan.desc}
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 text-sm text-[oklch(0.7_0.015_240)]"
                  >
                    <Check
                      className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-saffron" : "text-[oklch(0.45_0.015_240)]"}`}
                    />
                    {f}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={onRequestAccess}
                data-ocid={`pricing.${plan.name.toLowerCase()}.button`}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.highlight
                    ? "text-black hover:scale-105 hover:shadow-saffron"
                    : "text-white border border-[oklch(0.22_0.015_240)] hover:border-[oklch(0.75_0.18_65/0.4)] hover:bg-[oklch(0.16_0.012_240)]"
                }`}
                style={
                  plan.highlight
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                      }
                    : {}
                }
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState<bigint | null>(null);
  const { mutateAsync: submitWaitlist, isPending } = useSubmitWaitlist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const pos = await submitWaitlist(email.trim());
      setPosition(pos);
      toast.success(`You're #${pos.toString()} on the waitlist!`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.09 0.008 250)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.75 0.18 65 / 0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "oklch(0.58 0.22 293)" }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[oklch(0.75_0.18_65/0.35)] bg-[oklch(0.75_0.18_65/0.08)] mb-8">
          <span className="w-2 h-2 rounded-full bg-[oklch(0.75_0.18_65)] animate-pulse" />
          <span className="text-sm font-semibold text-saffron">
            Limited Early Access
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          You're Early.
          <br />
          <span className="shimmer-text">That's Your Advantage.</span>
        </h2>

        <p className="text-lg text-[oklch(0.6_0.015_240)] mb-12 max-w-xl mx-auto">
          Join 2,847 creators already on the waitlist. The next 500 get founding
          member pricing — locked for life.
        </p>

        {position !== null ? (
          <div
            data-ocid="waitlist.success_state"
            className="glass rounded-2xl p-8 saffron-border-glow"
          >
            <div className="text-5xl font-bold text-saffron mb-2">
              #{position.toString()}
            </div>
            <div className="text-white font-semibold text-xl mb-2">
              You're in!
            </div>
            <div className="text-[oklch(0.6_0.015_240)] text-sm">
              We'll reach out with your early access link soon. Share with
              creator friends to move up the list.
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            data-ocid="waitlist.dialog"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-ocid="waitlist.input"
              className="flex-1 px-5 py-3.5 rounded-xl bg-[oklch(0.13_0.01_240)] border border-[oklch(0.22_0.015_240)] text-white placeholder-[oklch(0.45_0.015_240)] focus:outline-none focus:border-[oklch(0.75_0.18_65/0.6)] focus:ring-1 focus:ring-[oklch(0.75_0.18_65/0.4)] text-sm transition-all duration-200"
            />
            <button
              type="submit"
              disabled={isPending}
              data-ocid="waitlist.submit_button"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-black whitespace-nowrap transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                boxShadow: "0 0 25px oklch(0.75 0.18 65 / 0.4)",
              }}
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isPending ? "Joining..." : "Claim My Spot"}
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-[oklch(0.4_0.015_240)]">
          No spam. Cancel anytime. Your data stays private.
        </p>
      </div>
    </section>
  );
}

function Footer({ onRequestAccess }: { onRequestAccess: () => void }) {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t border-[oklch(0.18_0.015_240/0.6)] py-16"
      style={{ background: "oklch(0.07 0.005 240)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-black"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.75 0.18 65), oklch(0.62 0.18 60))",
                }}
              >
                V
              </div>
              <span className="text-white font-bold text-lg">
                Vistar<span className="text-saffron">.ai</span>
              </span>
            </div>
            <p className="text-sm text-[oklch(0.5_0.015_240)] leading-relaxed max-w-xs mb-6">
              The Creator Expansion Engine. Built for the next 500 million
              regional viewers — and the creators who'll reach them.
            </p>
            <button
              type="button"
              onClick={onRequestAccess}
              data-ocid="footer.request_access.button"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-black transition-all duration-200 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
              }}
            >
              Request Early Access
            </button>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.4_0.015_240)] mb-4">
              Platform
            </div>
            <ul className="space-y-2">
              {[
                "Lingo-Bridge AI",
                "Ghost-Agent",
                "Fan-to-Founder",
                "Analytics",
                "Pricing",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="/#"
                    className="text-sm text-[oklch(0.55_0.015_240)] hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.4_0.015_240)] mb-4">
              Company
            </div>
            <ul className="space-y-2">
              {["About", "Blog", "Careers", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="/#"
                    className="text-sm text-[oklch(0.55_0.015_240)] hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[oklch(0.18_0.015_240/0.5)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[oklch(0.4_0.015_240)]">
            © {year} Vistar.ai. Built for the next 500M creators.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[oklch(0.4_0.015_240)] hover:text-[oklch(0.6_0.015_240)] transition-colors duration-200 flex items-center gap-1"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

function WaitlistModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState<bigint | null>(null);
  const { mutateAsync: submitWaitlist, isPending } = useSubmitWaitlist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const pos = await submitWaitlist(email.trim());
      setPosition(pos);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        data-ocid="waitlist.modal"
        className="relative w-full max-w-md glass rounded-2xl p-8 saffron-border-glow"
        style={{ boxShadow: "0 0 60px oklch(0.75 0.18 65 / 0.2)" }}
      >
        <button
          type="button"
          onClick={onClose}
          data-ocid="waitlist.close_button"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[oklch(0.5_0.015_240)] hover:text-white hover:bg-[oklch(0.22_0.015_240)] transition-all duration-200"
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <div
            className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center text-xl font-bold text-black"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.75 0.18 65), oklch(0.62 0.18 60))",
            }}
          >
            V
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Join the Waitlist
          </h3>
          <p className="text-sm text-[oklch(0.55_0.015_240)]">
            2,847 creators already waiting. Secure your spot.
          </p>
        </div>

        {position !== null ? (
          <div data-ocid="waitlist.success_state" className="text-center py-4">
            <div className="text-5xl font-bold text-saffron mb-3">
              #{position.toString()}
            </div>
            <div className="text-white font-semibold text-lg mb-2">
              You're on the list! 🎉
            </div>
            <div className="text-sm text-[oklch(0.6_0.015_240)] mb-6">
              We'll reach out with your early access link soon.
            </div>
            <button
              type="button"
              onClick={onClose}
              data-ocid="waitlist.confirm_button"
              className="px-6 py-2.5 rounded-full font-semibold text-sm text-black"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-ocid="waitlist.input"
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl bg-[oklch(0.13_0.01_240)] border border-[oklch(0.22_0.015_240)] text-white placeholder-[oklch(0.4_0.015_240)] focus:outline-none focus:border-[oklch(0.75_0.18_65/0.6)] text-sm mb-4 transition-all duration-200"
            />
            <button
              type="submit"
              disabled={isPending}
              data-ocid="waitlist.submit_button"
              className="w-full py-3.5 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] disabled:opacity-70"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                boxShadow: "0 0 25px oklch(0.75 0.18 65 / 0.4)",
              }}
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isPending ? "Claiming..." : "Claim My Spot 🚀"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function WatchDemoModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        data-ocid="demo.modal"
        className="relative w-full max-w-3xl glass rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 0 60px oklch(0.75 0.18 65 / 0.15)" }}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-[oklch(0.22_0.015_240)]">
          <span className="text-white font-semibold text-sm">
            Vistar.ai — Platform Demo
          </span>
          <button
            type="button"
            onClick={onClose}
            data-ocid="demo.close_button"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[oklch(0.5_0.015_240)] hover:text-white hover:bg-[oklch(0.22_0.015_240)] transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
            title="Vistar.ai Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function LandingPage({
  onRequestAccess,
  onWatchDemo,
  isLoggedIn,
  onDashboard,
}: {
  onRequestAccess: () => void;
  onWatchDemo: () => void;
  isLoggedIn: boolean;
  onDashboard: () => void;
}) {
  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.085 0.005 240)" }}
    >
      <Navbar
        onRequestAccess={onRequestAccess}
        isLoggedIn={isLoggedIn}
        onDashboard={onDashboard}
        onWatchDemo={onWatchDemo}
      />
      <main>
        <HeroSection
          onRequestAccess={onRequestAccess}
          onWatchDemo={onWatchDemo}
        />
        <StatsBar />
        <LingoBridgeSection />
        <HowToSection />
        <GhostAgentSection />
        <FanToFounderSection />
        <PricingSection onRequestAccess={onRequestAccess} />
        <WaitlistSection />
      </main>
      <Footer onRequestAccess={onRequestAccess} />
    </div>
  );
}

function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const isLoggedIn = loginStatus === "success" && !!identity;
  const principal = identity?.getPrincipal().toString() ?? "";

  const handleRequestAccess = async () => {
    if (isLoggedIn) {
      // already logged in, open waitlist as fallback
      setWaitlistOpen(true);
      return;
    }
    try {
      await login();
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  if (isLoggedIn) {
    return (
      <QueryClientProvider client={queryClient}>
        <Dashboard principal={principal} onLogout={() => clear()} />
        <Toaster />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LandingPage
        onRequestAccess={handleRequestAccess}
        onWatchDemo={() => setDemoOpen(true)}
        isLoggedIn={isLoggedIn}
        onDashboard={() => {}}
      />
      <WaitlistModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />
      <WatchDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
