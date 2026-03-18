import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  Rocket,
  Settings,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FanToFounderPage } from "./FanToFounderPage";
import { GhostAgentPage } from "./GhostAgentPage";
import { LingoBridgePage } from "./LingoBridgePage";
import { OnboardingModal } from "./OnboardingModal";
import { OverviewPage } from "./OverviewPage";
import { SettingsPage } from "./SettingsPage";

type Page = "overview" | "lingo" | "ghost" | "f2f" | "settings";

const navItems: { id: Page; label: string; Icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", Icon: LayoutDashboard },
  { id: "lingo", label: "Lingo-Bridge AI", Icon: Globe },
  { id: "ghost", label: "Ghost-Agent AI", Icon: Bot },
  { id: "f2f", label: "Fan-to-Founder OS", Icon: Rocket },
  { id: "settings", label: "Settings", Icon: Settings },
];

function truncatePrincipal(p: string) {
  if (!p || p.length < 12) return p;
  return `${p.slice(0, 6)}...${p.slice(-4)}`;
}

function profileKey(principal: string) {
  return `vistar_profile_${principal}`;
}

interface StoredProfile {
  name: string;
  handle: string;
}

export function Dashboard({
  principal,
  onLogout,
}: { principal: string; onLogout: () => void }) {
  const [page, setPage] = useState<Page>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<StoredProfile | null>(null);
  const [onboardingDone, setOnboardingDone] = useState(false);

  // Load stored profile on mount
  useEffect(() => {
    const stored = localStorage.getItem(profileKey(principal));
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
        setOnboardingDone(true);
      } catch {
        setOnboardingDone(false);
      }
    } else {
      setOnboardingDone(false);
    }
  }, [principal]);

  const handleOnboardingComplete = (name: string, handle: string) => {
    const p: StoredProfile = { name, handle };
    localStorage.setItem(profileKey(principal), JSON.stringify(p));
    setProfile(p);
    setOnboardingDone(true);
  };

  const handleProfileUpdate = (name: string, handle: string) => {
    const p: StoredProfile = { name, handle };
    localStorage.setItem(profileKey(principal), JSON.stringify(p));
    setProfile(p);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[oklch(0.18_0.015_240)]">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-black flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.75 0.18 65), oklch(0.62 0.18 60))",
          }}
        >
          V
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          Vistar<span style={{ color: "oklch(0.75 0.18 65)" }}>.ai</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            data-ocid={`dashboard.${id}.link`}
            onClick={() => {
              setPage(id);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              page === id
                ? "text-black"
                : "text-[oklch(0.6_0.015_240)] hover:text-white hover:bg-[oklch(0.18_0.015_240)]"
            }`}
            style={
              page === id
                ? {
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                  }
                : {}
            }
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-[oklch(0.18_0.015_240)]">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
            }}
          >
            {profile?.name ? profile.name[0].toUpperCase() : "?"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {profile?.name ?? "Setting up..."}
            </p>
            <p className="text-xs text-[oklch(0.45_0.015_240)] font-mono truncate">
              {truncatePrincipal(principal)}
            </p>
          </div>
        </div>
        <Button
          data-ocid="dashboard.logout.button"
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="w-full justify-start gap-2 text-[oklch(0.5_0.015_240)] hover:text-white hover:bg-[oklch(0.18_0.015_240)] text-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          Log out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Onboarding gate */}
      {!onboardingDone && (
        <OnboardingModal
          principal={principal}
          onComplete={handleOnboardingComplete}
        />
      )}

      <div className="flex h-screen bg-[oklch(0.08_0.008_240)] overflow-hidden">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-60 flex-col border-r border-[oklch(0.15_0.015_240)] bg-[oklch(0.09_0.009_240)] flex-shrink-0">
          <SidebarContent />
        </aside>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-black/60 md:hidden"
              />
              <motion.aside
                initial={{ x: -240 }}
                animate={{ x: 0 }}
                exit={{ x: -240 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed left-0 top-0 bottom-0 z-50 w-60 flex flex-col border-r border-[oklch(0.15_0.015_240)] bg-[oklch(0.09_0.009_240)] md:hidden"
              >
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-4 right-4 p-1 text-[oklch(0.5_0.015_240)] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
                <SidebarContent />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top bar (mobile) */}
          <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[oklch(0.15_0.015_240)] bg-[oklch(0.09_0.009_240)]">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-1 text-[oklch(0.5_0.015_240)] hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-white font-semibold text-sm capitalize">
              {navItems.find((n) => n.id === page)?.label ?? "Overview"}
            </span>
            <button
              type="button"
              onClick={onLogout}
              className="p-1 text-[oklch(0.5_0.015_240)] hover:text-white"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </header>

          {/* Page */}
          <ScrollArea className="flex-1">
            <main className="p-4 md:p-8 max-w-6xl mx-auto">
              {page === "overview" && (
                <OverviewPage
                  userName={profile?.name ?? null}
                  principal={principal}
                />
              )}
              {page === "lingo" && <LingoBridgePage />}
              {page === "ghost" && <GhostAgentPage />}
              {page === "f2f" && <FanToFounderPage />}
              {page === "settings" && (
                <SettingsPage
                  onDisconnect={onLogout}
                  initialName={profile?.name ?? ""}
                  initialHandle={profile?.handle ?? ""}
                  onProfileUpdate={handleProfileUpdate}
                />
              )}
            </main>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
