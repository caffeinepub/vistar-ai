import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { toast } from "sonner";

interface Props {
  onDisconnect: () => void;
  initialName: string;
  initialHandle: string;
  onProfileUpdate: (name: string, handle: string) => void;
}

export function SettingsPage({
  onDisconnect,
  initialName,
  initialHandle,
  onProfileUpdate,
}: Props) {
  const [profile, setProfile] = useState({
    name: initialName || "Arjun Sharma",
    handle: initialHandle || "@arjuncomedy",
    bio: "Comedy creator | 1.2M subscribers | Making India laugh",
    subscribers: "1,200,000",
  });
  const [notifs, setNotifs] = useState({
    deals: true,
    milestones: true,
    reports: false,
  });

  const save = () => {
    onProfileUpdate(profile.name, profile.handle);
    toast.success("Profile saved!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-[oklch(0.55_0.015_240)] mt-1">
          Manage your Vistar.ai profile and preferences.
        </p>
      </div>

      {/* Profile */}
      <Card className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]">
        <CardHeader>
          <CardTitle className="text-white text-sm">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-[oklch(0.55_0.015_240)] mb-1.5 block">
                Display Name
              </Label>
              <Input
                data-ocid="settings.name.input"
                value={profile.name}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, name: e.target.value }))
                }
                className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.1_0.008_240)]"
              />
            </div>
            <div>
              <Label className="text-xs text-[oklch(0.55_0.015_240)] mb-1.5 block">
                YouTube Handle
              </Label>
              <Input
                data-ocid="settings.handle.input"
                value={profile.handle}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, handle: e.target.value }))
                }
                className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.1_0.008_240)]"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs text-[oklch(0.55_0.015_240)] mb-1.5 block">
              Bio
            </Label>
            <Textarea
              data-ocid="settings.bio.textarea"
              value={profile.bio}
              onChange={(e) =>
                setProfile((p) => ({ ...p, bio: e.target.value }))
              }
              className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.1_0.008_240)]"
              rows={2}
            />
          </div>
          <div>
            <Label className="text-xs text-[oklch(0.55_0.015_240)] mb-1.5 block">
              Subscriber Count
            </Label>
            <Input
              data-ocid="settings.subscribers.input"
              value={profile.subscribers}
              onChange={(e) =>
                setProfile((p) => ({ ...p, subscribers: e.target.value }))
              }
              className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.1_0.008_240)]"
            />
          </div>
          <Button
            data-ocid="settings.save.button"
            onClick={save}
            className="text-black font-semibold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
            }}
          >
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Platform Connections */}
      <Card className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]">
        <CardHeader>
          <CardTitle className="text-white text-sm">
            Platform Connections
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              icon: SiYoutube,
              name: "YouTube",
              connected: true,
              color: "text-red-500",
            },
            {
              icon: SiInstagram,
              name: "Instagram",
              connected: false,
              color: "text-pink-500",
            },
            {
              icon: SiX,
              name: "Twitter / X",
              connected: false,
              color: "text-white",
            },
          ].map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between py-2 border-b border-[oklch(0.18_0.015_240)] last:border-0"
            >
              <div className="flex items-center gap-3">
                <p.icon className={`w-5 h-5 ${p.color}`} />
                <span className="text-sm text-white">{p.name}</span>
                {p.connected && (
                  <Badge className="bg-green-500/15 text-green-400 border-green-500/30 text-xs">
                    Connected
                  </Badge>
                )}
              </div>
              {p.connected ? (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-[oklch(0.5_0.015_240)] hover:text-white"
                  onClick={() => toast.success(`${p.name} disconnected`)}
                >
                  Disconnect
                </Button>
              ) : (
                <Button
                  size="sm"
                  data-ocid={`settings.connect_${p.name.toLowerCase().replace(/\//g, "").replace(/ /g, "_")}.button`}
                  className="text-xs text-black font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                  }}
                  onClick={() => toast.info(`Connecting ${p.name}...`)}
                >
                  Connect
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]">
        <CardHeader>
          <CardTitle className="text-white text-sm">
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              key: "deals" as const,
              label: "New Brand Deals",
              desc: "Get notified when brands reach out",
            },
            {
              key: "milestones" as const,
              label: "Growth Milestones",
              desc: "Alerts for subscriber/view milestones",
            },
            {
              key: "reports" as const,
              label: "Weekly Reports",
              desc: "Receive weekly performance summary",
            },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm text-white">{n.label}</p>
                <p className="text-xs text-[oklch(0.45_0.015_240)]">{n.desc}</p>
              </div>
              <Switch
                data-ocid={`settings.${n.key}_notif.switch`}
                checked={notifs[n.key]}
                onCheckedChange={(v) =>
                  setNotifs((prev) => ({ ...prev, [n.key]: v }))
                }
                className="data-[state=checked]:bg-[oklch(0.75_0.18_65)]"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/30 bg-red-500/5">
        <CardHeader>
          <CardTitle className="text-red-400 text-sm">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">Disconnect Account</p>
              <p className="text-xs text-[oklch(0.45_0.015_240)]">
                Log out and disconnect from Vistar.ai
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  data-ocid="settings.disconnect.button"
                  size="sm"
                  variant="ghost"
                  className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                >
                  Disconnect
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent
                data-ocid="settings.disconnect.dialog"
                className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]"
              >
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">
                    Disconnect Account?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-[oklch(0.55_0.015_240)]">
                    You will be logged out and returned to the landing page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    data-ocid="settings.disconnect_cancel.button"
                    className="border-[oklch(0.22_0.015_240)] text-white hover:bg-[oklch(0.18_0.015_240)]"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    data-ocid="settings.disconnect_confirm.button"
                    onClick={onDisconnect}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Disconnect
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
