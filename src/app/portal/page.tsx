
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar, Activity, CheckCircle2, ArrowUpRight, TrendingUp,
  Star, Clock, HeartPulse, Zap, Trophy, ChevronRight, Phone
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Area, AreaChart, RadialBar, RadialBarChart } from "recharts";
import Link from "next/link";
import BookAppointmentButton from "@/components/book-appointment-button";

const recoveryData = [
  { day: 'Mon', score: 45, pain: 7 },
  { day: 'Tue', score: 52, pain: 6 },
  { day: 'Wed', score: 48, pain: 6 },
  { day: 'Thu', score: 61, pain: 5 },
  { day: 'Fri', score: 65, pain: 4 },
  { day: 'Sat', score: 72, pain: 3 },
  { day: 'Sun', score: 80, pain: 2 },
];

const weeklyData = [
  { week: 'W1', sessions: 2 },
  { week: 'W2', sessions: 3 },
  { week: 'W3', sessions: 2 },
  { week: 'W4', sessions: 4 },
];

const chartConfig = {
  score: { label: "Recovery Score", color: "hsl(var(--primary))" },
  pain: { label: "Pain Level", color: "hsl(var(--accent))" },
};

const upcomingAppointments = [
  { date: 'Mar 12', day: 'Wed', time: '10:00 AM', service: 'Home Physiotherapy', therapist: 'Dr. Kajal Vora', status: 'Confirmed' },
  { date: 'Mar 15', day: 'Sat', time: '03:30 PM', service: 'Neuromuscular Rehab', therapist: 'Dr. Twinkle Patel', status: 'Pending' },
];

const milestones = [
  { icon: Trophy, label: '10 Sessions Completed', done: true },
  { icon: Star, label: 'Pain reduced by 60%', done: true },
  { icon: HeartPulse, label: 'Full range of motion', done: false },
  { icon: Zap, label: 'Return to activity', done: false },
];

export default function PortalDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome back! 👋</h1>
          <p className="text-muted-foreground mt-1">Here's your recovery overview for this week.</p>
        </div>
        <BookAppointmentButton size="sm" className="font-bold px-6">
          Book Next Session
        </BookAppointmentButton>
      </div>

      {/* ── KPI Stats ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            icon: Calendar,
            title: 'Upcoming Sessions',
            value: '2',
            sub: 'Next: Wed, Mar 12 at 10 AM',
            trend: null,
            accent: false,
          },
          {
            icon: Activity,
            title: 'Recovery Score',
            value: '80%',
            sub: '+12% from last week',
            trend: 'up',
            accent: false,
          },
          {
            icon: CheckCircle2,
            title: 'Tasks Completed',
            value: '14/18',
            sub: 'Exercises & Assessments',
            trend: null,
            accent: false,
          },
          {
            icon: HeartPulse,
            title: 'Pain Level Today',
            value: '2/10',
            sub: 'Significantly improved',
            trend: 'down',
            accent: true,
          },
        ].map((stat, i) => (
          <div key={i} className="premium-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground">{stat.title}</p>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.accent ? 'bg-accent/15' : 'bg-primary/10'}`}>
                <stat.icon className={`h-5 w-5 ${stat.accent ? 'text-accent' : 'text-primary'}`} />
              </div>
            </div>
            <div>
              <div className={`text-3xl font-black ${stat.accent ? 'text-accent' : ''}`}>{stat.value}</div>
              <p className={`text-xs mt-1 flex items-center gap-1 font-medium ${stat.trend === 'up' ? 'text-emerald-500' :
                  stat.trend === 'down' ? 'text-emerald-500' :
                    'text-muted-foreground'
                }`}>
                {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                {stat.trend === 'down' && '↓ '}
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recovery Trend — spans 2 cols */}
        <div className="premium-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-headline font-bold text-lg">Recovery Trend</h2>
              <p className="text-muted-foreground text-sm">Mobility score vs pain level over 7 days</p>
            </div>
            <Badge variant="secondary" className="font-semibold">This Week</Badge>
          </div>
          <ChartContainer config={chartConfig} className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recoveryData}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.06} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={10} className="text-xs" />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone" dataKey="score"
                  stroke="hsl(var(--primary))" strokeWidth={2.5}
                  fill="url(#scoreGrad)"
                  dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "white" }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone" dataKey="pain"
                  stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="5 3"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex items-center gap-5 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-primary rounded" />Recovery Score</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-accent rounded border-dashed" />Pain Level</div>
          </div>
        </div>

        {/* Milestones */}
        <div className="premium-card p-6">
          <div className="mb-5">
            <h2 className="font-headline font-bold text-lg">Recovery Goals</h2>
            <p className="text-muted-foreground text-sm">Your treatment milestones</p>
          </div>
          <div className="space-y-3">
            {milestones.map((m, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${m.done ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-secondary/30'}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${m.done ? 'bg-emerald-500' : 'bg-secondary'}`}>
                  <m.icon className={`w-4 h-4 ${m.done ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <span className={`text-sm font-medium ${m.done ? 'text-emerald-700 dark:text-emerald-300 line-through' : 'text-foreground'}`}>
                  {m.label}
                </span>
                {m.done && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto" />}
              </div>
            ))}
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Progress</span><span>2 / 4 goals</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000" style={{ width: '50%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Appointments + Quick Actions ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Upcoming Appointments — spans 2 */}
        <div className="premium-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-headline font-bold text-lg">Upcoming Appointments</h2>
              <p className="text-muted-foreground text-sm">Stay on track with your therapy schedule</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary gap-1 font-semibold" asChild>
              <Link href="/portal/appointments">View All <ChevronRight className="w-3 h-3" /></Link>
            </Button>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map((app, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/30 hover:border-primary/20 hover:bg-primary/5 transition-all group">
                <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-xl w-14 h-14 flex-shrink-0 shadow-sm shadow-primary/20">
                  <span className="text-[10px] uppercase font-bold opacity-80">{app.day}</span>
                  <span className="text-lg font-black leading-none">{app.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{app.service}</p>
                  <p className="text-xs text-muted-foreground">{app.therapist} · {app.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={app.status === 'Confirmed' ? 'default' : 'secondary'} className="text-xs font-semibold">
                    {app.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-primary h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="premium-card p-6">
          <h2 className="font-headline font-bold text-lg mb-5">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { icon: Calendar, label: 'Book New Session', href: '/book-appointment', variant: 'default' as const },
              { icon: Activity, label: 'Log Recovery Entry', href: '/portal/recovery', variant: 'outline' as const },
              { icon: Clock, label: 'View Appointments', href: '/portal/appointments', variant: 'outline' as const },
              { icon: Phone, label: 'Call Your Therapist', href: 'tel:+919136447006', variant: 'outline' as const },
            ].map((action, i) => (
              <Button key={i} variant={action.variant} className="w-full justify-start gap-3 font-semibold h-11" asChild>
                <a href={action.href}>
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </a>
              </Button>
            ))}
          </div>

          {/* Support Banner */}
          <div className="mt-5 p-4 rounded-xl bg-primary/8 border border-primary/15">
            <p className="font-bold text-sm mb-1">Need Help?</p>
            <p className="text-xs text-muted-foreground mb-3">Our care team is available 24x7</p>
            <Button size="sm" className="w-full font-bold h-9 gap-2" asChild>
              <a href="tel:+919136447006">
                <Phone className="w-3.5 h-3.5" /> +91 9136447006
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
