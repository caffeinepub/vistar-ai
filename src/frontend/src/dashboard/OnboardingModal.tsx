import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Props {
  principal: string;
  onComplete: (name: string, handle: string) => void;
}

export function OnboardingModal({ principal, onComplete }: Props) {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");

  const truncated =
    principal.length > 12
      ? `${principal.slice(0, 6)}...${principal.slice(-4)}`
      : principal;

  const submit = () => {
    if (!name.trim()) {
      setError("Please enter your display name.");
      return;
    }
    onComplete(name.trim(), handle.trim());
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-md rounded-2xl border border-[oklch(0.22_0.015_240)] bg-[oklch(0.1_0.01_240)] p-8 shadow-2xl"
        >
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black text-black"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
              }}
            >
              V
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-1">
            Welcome to Vistar.ai
          </h2>
          <p className="text-[oklch(0.55_0.015_240)] text-sm text-center mb-6">
            Set up your creator profile to personalise your dashboard.
          </p>

          {/* Principal badge */}
          <div className="flex items-center gap-2 bg-[oklch(0.15_0.01_240)] border border-[oklch(0.22_0.015_240)] rounded-lg px-3 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
            <span className="text-xs text-[oklch(0.5_0.015_240)] font-mono">
              Identity: {truncated}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-xs text-[oklch(0.55_0.015_240)] mb-1.5 block">
                Display Name{" "}
                <span className="text-[oklch(0.75_0.18_65)]">*</span>
              </Label>
              <Input
                data-ocid="onboarding.name.input"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                autoFocus
                className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.08_0.008_240)] text-white placeholder:text-[oklch(0.35_0.01_240)]"
              />
              {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
            </div>

            <div>
              <Label className="text-xs text-[oklch(0.55_0.015_240)] mb-1.5 block">
                YouTube / Instagram Handle{" "}
                <span className="text-[oklch(0.4_0.01_240)]">(optional)</span>
              </Label>
              <Input
                data-ocid="onboarding.handle.input"
                placeholder="@yourchannel"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.08_0.008_240)] text-white placeholder:text-[oklch(0.35_0.01_240)]"
              />
            </div>

            <Button
              data-ocid="onboarding.submit.button"
              onClick={submit}
              className="w-full text-black font-bold mt-2"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
              }}
            >
              Enter Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
