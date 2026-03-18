import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Globe, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const LANGS = [
  "Hindi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Marathi",
  "Punjabi",
  "Gujarati",
  "Odia",
];

const PROCESSING_STEPS = [
  "Transcribing",
  "Translating",
  "Dubbing",
  "Finalizing",
];

const completedJobs = [
  {
    title: "My Vlog EP.12",
    languages: "Tamil, Telugu",
    status: "Completed",
    views: "2.1M views generated",
  },
  {
    title: "Product Review: iPhone 16",
    languages: "Hindi, Bengali",
    status: "Completed",
    views: "890K views",
  },
  {
    title: "Travel Series: Goa",
    languages: "Kannada, Malayalam",
    status: "Processing",
    views: "—",
  },
];

export function LingoBridgePage() {
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleLang = (lang: string) => {
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
  };

  const startProcessing = () => {
    if (!hasFile) {
      toast.error("Please upload a video first");
      return;
    }
    if (selectedLangs.length === 0) {
      toast.error("Select at least one language");
      return;
    }
    setProcessing(true);
    setStepIndex(0);
    setProgress(0);
    setDone(false);
    let step = 0;
    let prog = 0;
    const interval = setInterval(() => {
      prog += 5;
      setProgress(Math.min(prog, 100));
      if (prog % 25 === 0 && step < PROCESSING_STEPS.length - 1) {
        step++;
        setStepIndex(step);
      }
      if (prog >= 100) {
        clearInterval(interval);
        setProcessing(false);
        setDone(true);
        toast.success("Localization complete! Your videos are ready.");
      }
    }, 200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Lingo-Bridge AI</h1>
        <p className="text-[oklch(0.55_0.015_240)] mt-1">
          Go Viral in 10 Languages — Upload once, reach millions.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload Zone */}
        <Card className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]">
          <CardHeader>
            <CardTitle className="text-white text-sm">Upload Video</CardTitle>
          </CardHeader>
          <CardContent>
            <button
              type="button"
              data-ocid="lingo.dropzone"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                setHasFile(true);
                toast.success("Video uploaded!");
              }}
              onClick={() => setHasFile(true)}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? "border-[oklch(0.75_0.18_65)] bg-[oklch(0.75_0.18_65/0.08)]"
                  : hasFile
                    ? "border-green-500 bg-green-500/5"
                    : "border-[oklch(0.25_0.015_240)] hover:border-[oklch(0.45_0.015_240)] hover:bg-[oklch(0.15_0.01_240)]"
              }`}
            >
              {hasFile ? (
                <>
                  <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
                  <p className="text-white font-semibold">my_vlog_ep13.mp4</p>
                  <p className="text-xs text-[oklch(0.45_0.015_240)] mt-1">
                    Click to change
                  </p>
                </>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-[oklch(0.45_0.015_240)] mx-auto mb-3" />
                  <p className="text-white font-semibold mb-1">
                    Drop your video here
                  </p>
                  <p className="text-xs text-[oklch(0.45_0.015_240)]">
                    MP4, MOV, AVI up to 4GB
                  </p>
                </>
              )}
            </button>

            {/* Source lang */}
            <div className="mt-4">
              <Label className="text-xs text-[oklch(0.55_0.015_240)] mb-2 block">
                Source Language
              </Label>
              <Select defaultValue="english">
                <SelectTrigger
                  data-ocid="lingo.source_lang.select"
                  className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.1_0.008_240)]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="tamil">Tamil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Language selector */}
        <Card className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]">
          <CardHeader>
            <CardTitle className="text-white text-sm">
              Target Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2.5">
              {LANGS.map((lang) => (
                <div key={lang} className="flex items-center gap-2">
                  <Checkbox
                    id={`lang-${lang}`}
                    data-ocid={`lingo.${lang.toLowerCase()}.checkbox`}
                    checked={selectedLangs.includes(lang)}
                    onCheckedChange={() => toggleLang(lang)}
                    className="border-[oklch(0.35_0.015_240)] data-[state=checked]:bg-[oklch(0.75_0.18_65)] data-[state=checked]:border-[oklch(0.75_0.18_65)]"
                  />
                  <Label
                    htmlFor={`lang-${lang}`}
                    className="text-sm text-[oklch(0.75_0.015_240)] cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5 inline mr-1 text-[oklch(0.55_0.015_240)]" />
                    {lang}
                  </Label>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[oklch(0.18_0.015_240)]">
              <p className="text-xs text-[oklch(0.45_0.015_240)]">
                {selectedLangs.length} language
                {selectedLangs.length !== 1 ? "s" : ""} selected
              </p>
            </div>

            {/* Processing */}
            {(processing || done) && (
              <div data-ocid="lingo.processing_state" className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white flex items-center gap-2">
                    {processing ? (
                      <Loader2 className="w-4 h-4 animate-spin text-saffron" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                    {done
                      ? "Localization Complete!"
                      : PROCESSING_STEPS[stepIndex]}
                  </span>
                  <span className="text-xs text-[oklch(0.55_0.015_240)]">
                    {processing ? Math.round(progress) : 100}%
                  </span>
                </div>
                <Progress value={done ? 100 : progress} className="h-1.5" />
                {processing && (
                  <div className="flex gap-1 mt-2">
                    {PROCESSING_STEPS.map((s, i) => (
                      <span
                        key={s}
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          i < stepIndex
                            ? "bg-green-500/20 text-green-400"
                            : i === stepIndex
                              ? "bg-[oklch(0.75_0.18_65/0.2)] text-saffron"
                              : "bg-[oklch(0.18_0.015_240)] text-[oklch(0.4_0.015_240)]"
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Button
              data-ocid="lingo.start_localization.button"
              onClick={startProcessing}
              disabled={processing}
              className="w-full mt-4 font-semibold text-black"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
              }}
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Start Localization"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Completed Jobs */}
      <Card className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]">
        <CardHeader>
          <CardTitle className="text-white text-sm">
            Localization Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[oklch(0.18_0.015_240)] hover:bg-transparent">
                <TableHead className="text-[oklch(0.5_0.015_240)]">
                  Video
                </TableHead>
                <TableHead className="text-[oklch(0.5_0.015_240)]">
                  Languages
                </TableHead>
                <TableHead className="text-[oklch(0.5_0.015_240)]">
                  Status
                </TableHead>
                <TableHead className="text-[oklch(0.5_0.015_240)]">
                  Result
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedJobs.map((job, i) => (
                <TableRow
                  key={job.title}
                  data-ocid={`lingo.jobs.item.${i + 1}`}
                  className="border-[oklch(0.18_0.015_240)]"
                >
                  <TableCell className="text-white font-medium">
                    {job.title}
                  </TableCell>
                  <TableCell className="text-[oklch(0.6_0.015_240)]">
                    {job.languages}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        job.status === "Completed"
                          ? "bg-green-500/15 text-green-400 border-green-500/30"
                          : "bg-[oklch(0.75_0.18_65/0.15)] text-saffron border-[oklch(0.75_0.18_65/0.3)]"
                      }
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[oklch(0.6_0.015_240)]">
                    {job.views}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
