import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const deals = [
  {
    brand: "BoAt Lifestyle",
    category: "Electronics",
    offer: "₹2,50,000",
    status: "New",
  },
  {
    brand: "Nykaa",
    category: "Beauty",
    offer: "₹1,80,000",
    status: "Negotiating",
  },
  {
    brand: "Mamaearth",
    category: "Skincare",
    offer: "₹95,000",
    status: "Accepted",
  },
  { brand: "Noise", category: "Wearables", offer: "₹3,20,000", status: "New" },
  {
    brand: "Myntra",
    category: "Fashion",
    offer: "₹1,40,000",
    status: "Rejected",
  },
];

const statusColors: Record<string, string> = {
  New: "bg-[oklch(0.75_0.18_65/0.15)] text-[oklch(0.85_0.18_65)] border-[oklch(0.75_0.18_65/0.3)]",
  Negotiating:
    "bg-[oklch(0.58_0.22_293/0.15)] text-[oklch(0.75_0.18_293)] border-[oklch(0.58_0.22_293/0.3)]",
  Accepted: "bg-green-500/10 text-green-400 border-green-500/30",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/30",
};

const templates = [
  {
    title: "Brand Deal Inquiry Response",
    body: "Hi [Brand Name] team! 👋 Thanks for reaching out about a collaboration. I'd love to learn more about your campaign goals and how we can create authentic content for your audience. Can you share the campaign brief and timeline? Looking forward to connecting!",
  },
  {
    title: "Collaboration Acceptance",
    body: "Excited to confirm our collaboration! 🎉 I've reviewed the brief and I'm confident we can create amazing content together. I'll have the first draft ready by [date]. Please share the product/assets when convenient. Let's create something viral! 🚀",
  },
  {
    title: "Polite Rejection",
    body: "Thank you so much for thinking of me for this collaboration. After careful consideration, I don't think this is the right fit for my audience at this time. I truly appreciate the opportunity and hope we can collaborate in the future when the timing is better. Best of luck!",
  },
];

const kanbanCols = [
  {
    title: "In Discussion",
    color: "text-[oklch(0.75_0.18_65)]",
    deals: ["BoAt Lifestyle — ₹2,50,000", "Noise — ₹3,20,000"],
  },
  {
    title: "Offer Received",
    color: "text-[oklch(0.75_0.18_293)]",
    deals: ["Nykaa — ₹1,80,000"],
  },
  { title: "Closed", color: "text-green-400", deals: ["Mamaearth — ₹95,000"] },
];

export function GhostAgentPage() {
  const [copied, setCopied] = useState<number | null>(null);

  const copyTemplate = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    toast.success("Template copied!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Ghost-Agent AI</h1>
        <p className="text-[oklch(0.55_0.015_240)] mt-1">
          Your Automated Brand Manager — negotiate, reply, and close deals on
          autopilot.
        </p>
      </div>

      <Tabs defaultValue="inbox">
        <TabsList className="bg-[oklch(0.12_0.01_240)] border border-[oklch(0.22_0.015_240)]">
          <TabsTrigger
            data-ocid="ghost.inbox.tab"
            value="inbox"
            className="data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-black"
          >
            Deals Inbox
          </TabsTrigger>
          <TabsTrigger
            data-ocid="ghost.templates.tab"
            value="templates"
            className="data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-black"
          >
            DM Templates
          </TabsTrigger>
          <TabsTrigger
            data-ocid="ghost.tracker.tab"
            value="tracker"
            className="data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-black"
          >
            Negotiation Tracker
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox">
          <Card className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-[oklch(0.18_0.015_240)] hover:bg-transparent">
                    <TableHead className="text-[oklch(0.5_0.015_240)]">
                      Brand
                    </TableHead>
                    <TableHead className="text-[oklch(0.5_0.015_240)]">
                      Category
                    </TableHead>
                    <TableHead className="text-[oklch(0.5_0.015_240)]">
                      Offer
                    </TableHead>
                    <TableHead className="text-[oklch(0.5_0.015_240)]">
                      Status
                    </TableHead>
                    <TableHead className="text-[oklch(0.5_0.015_240)]">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deals.map((deal, i) => (
                    <TableRow
                      key={deal.brand}
                      data-ocid={`ghost.deals.item.${i + 1}`}
                      className="border-[oklch(0.18_0.015_240)]"
                    >
                      <TableCell className="text-white font-semibold">
                        {deal.brand}
                      </TableCell>
                      <TableCell className="text-[oklch(0.6_0.015_240)]">
                        {deal.category}
                      </TableCell>
                      <TableCell className="text-[oklch(0.85_0.18_65)] font-bold">
                        {deal.offer}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[deal.status]}>
                          {deal.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs text-[oklch(0.6_0.015_240)] hover:text-white"
                            onClick={() =>
                              toast.info(`Viewing ${deal.brand} deal`)
                            }
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            View
                          </Button>
                          {deal.status === "New" && (
                            <>
                              <Button
                                size="sm"
                                data-ocid={`ghost.accept.button.${i + 1}`}
                                className="h-7 text-xs bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                onClick={() =>
                                  toast.success(
                                    `Accepted deal from ${deal.brand}`,
                                  )
                                }
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                data-ocid={`ghost.reject.button.${i + 1}`}
                                variant="ghost"
                                className="h-7 text-xs text-red-400 hover:bg-red-500/10"
                                onClick={() =>
                                  toast.error(
                                    `Rejected deal from ${deal.brand}`,
                                  )
                                }
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="space-y-4">
            {templates.map((t, i) => (
              <Card
                key={t.title}
                data-ocid={`ghost.template.item.${i + 1}`}
                className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-white">
                      {t.title}
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="ghost"
                      data-ocid={`ghost.copy_template.button.${i + 1}`}
                      onClick={() => copyTemplate(i, t.body)}
                      className="h-7 text-xs text-[oklch(0.55_0.015_240)] hover:text-white"
                    >
                      {copied === i ? (
                        <Check className="w-3.5 h-3.5 mr-1 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 mr-1" />
                      )}
                      {copied === i ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[oklch(0.55_0.015_240)] leading-relaxed">
                    {t.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tracker">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {kanbanCols.map((col) => (
              <div
                key={col.title}
                data-ocid={`ghost.${col.title.toLowerCase().replace(/ /g, "_")}.panel`}
              >
                <h3
                  className={`text-sm font-bold mb-3 uppercase tracking-wide ${col.color}`}
                >
                  {col.title}
                </h3>
                <div className="space-y-2">
                  {col.deals.map((d) => (
                    <Card
                      key={d}
                      className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)] hover:border-[oklch(0.35_0.015_240)] transition-colors cursor-grab"
                    >
                      <CardContent className="p-3">
                        <p className="text-sm text-white">{d}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
