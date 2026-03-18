import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Eye, Handshake, TrendingUp, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const subscriberData = [
  { month: "Sep", subscribers: 820000 },
  { month: "Oct", subscribers: 920000 },
  { month: "Nov", subscribers: 1020000 },
  { month: "Dec", subscribers: 1080000 },
  { month: "Jan", subscribers: 1150000 },
  { month: "Feb", subscribers: 1200000 },
];

const revenueData = [
  { month: "Sep", revenue: 320000 },
  { month: "Oct", revenue: 410000 },
  { month: "Nov", revenue: 380000 },
  { month: "Dec", revenue: 520000 },
  { month: "Jan", revenue: 460000 },
  { month: "Feb", revenue: 482000 },
];

const recentActivity = [
  {
    icon: "🎙️",
    text: "Lingo-Bridge job completed: Tamil dub",
    time: "2 hours ago",
    color: "text-saffron",
  },
  {
    icon: "🤝",
    text: "New brand deal from BoAt — ₹2,50,000 offer",
    time: "5 hours ago",
    color: "text-green-400",
  },
  {
    icon: "📈",
    text: "Regional Reach milestone: 9M views",
    time: "Yesterday",
    color: "text-purple-400",
  },
  {
    icon: "🎬",
    text: "Lingo-Bridge job completed: Telugu & Kannada dubs",
    time: "2 days ago",
    color: "text-saffron",
  },
  {
    icon: "💸",
    text: "Merch payout received: ₹48,000",
    time: "3 days ago",
    color: "text-green-400",
  },
];

const chartConfig = {
  subscribers: { label: "Subscribers", color: "oklch(0.75 0.18 65)" },
  revenue: { label: "Revenue (₹)", color: "oklch(0.58 0.22 293)" },
};

function truncatePrincipal(p: string) {
  if (!p || p.length < 12) return p;
  return `${p.slice(0, 6)}...${p.slice(-4)}`;
}

interface Props {
  userName: string | null;
  principal: string;
}

export function OverviewPage({ userName, principal }: Props) {
  const displayName = userName ?? "Creator";

  const stats = [
    {
      icon: Users,
      label: "Total Subscribers",
      value: "1.2M",
      sub: "+4.3% this month",
      color: "text-saffron",
    },
    {
      icon: TrendingUp,
      label: "Monthly Revenue",
      value: "₹4,82,000",
      sub: "+12.1% this month",
      color: "text-green-400",
    },
    {
      icon: Eye,
      label: "Content Reach",
      value: "8.9M",
      sub: "Across all languages",
      color: "text-purple-400",
    },
    {
      icon: Handshake,
      label: "Active Deals",
      value: "7",
      sub: "2 pending approval",
      color: "text-blue-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {displayName} 👋
        </h1>
        <p className="text-[oklch(0.55_0.015_240)] mt-1">
          Here's your growth snapshot for today.
        </p>
        {/* Identity badge */}
        <div className="inline-flex items-center gap-1.5 mt-2 bg-[oklch(0.13_0.01_240)] border border-[oklch(0.2_0.015_240)] rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-xs text-[oklch(0.45_0.015_240)] font-mono">
            {truncatePrincipal(principal)}
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            data-ocid={`overview.${s.label.toLowerCase().replace(/ /g, "_")}.card`}
            className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-[oklch(0.5_0.015_240)] font-medium uppercase tracking-wide">
                  {s.label}
                </p>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-[oklch(0.45_0.015_240)] mt-1">
                {s.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-white">
              Subscriber Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={subscriberData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.2 0.01 240)"
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "oklch(0.5 0.015 240)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "oklch(0.5 0.015 240)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="subscribers"
                    stroke="oklch(0.75 0.18 65)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-white">
              Monthly Revenue (₹)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.2 0.01 240)"
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "oklch(0.5 0.015 240)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "oklch(0.5 0.015 240)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="revenue"
                    fill="oklch(0.58 0.22 293)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-white">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((item, i) => (
            <div
              key={item.text}
              data-ocid={`overview.activity.item.${i + 1}`}
              className="flex items-center gap-3 py-2 border-b border-[oklch(0.18_0.015_240)] last:border-0"
            >
              <span className="text-lg">{item.icon}</span>
              <p className="text-sm text-[oklch(0.75_0.015_240)] flex-1">
                {item.text}
              </p>
              <span className="text-xs text-[oklch(0.45_0.015_240)]">
                {item.time}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
