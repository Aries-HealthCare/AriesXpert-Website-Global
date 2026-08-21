'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useProviderAuth } from '@/services/provider-auth-context';
import {
  LayoutDashboard,
  Radio,
  CalendarCheck,
  Navigation,
  Users,
  Wallet,
  TrendingUp,
  Share2,
  Award,
  GraduationCap,
  Bell,
  Bot,
  User,
  Clock,
  FileText,
  HelpCircle,
  Settings,
  Power,
  Menu,
  X,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  LogOut,
  AlertTriangle,
  Stethoscope,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

const NAV_ITEMS = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/leads', label: 'Lead Stream', icon: Radio, badge: 'Live' },
  { href: '/app/appointments', label: 'Appointments', icon: CalendarCheck },
  { href: '/app/visits', label: 'Active Visits', icon: Navigation, badge: 'Workflow' },
  { href: '/app/patients', label: 'Patients', icon: Users },
  { href: '/app/wallet', label: 'Wallet & Payouts', icon: Wallet },
  { href: '/app/earnings', label: 'Earnings Analytics', icon: TrendingUp },
  { href: '/app/referrals', label: 'Referral Program', icon: Share2 },
  { href: '/app/rewards', label: 'Rewards & Tiers', icon: Award },
  { href: '/app/training', label: 'Clinical Academy', icon: GraduationCap },
  { href: '/app/notifications', label: 'Notifications', icon: Bell, badge: '3' },
  { href: '/app/buddy', label: 'AI Clinical Buddy', icon: Bot, highlight: true },
  { href: '/app/profile', label: 'My Profile', icon: User },
  { href: '/app/availability', label: 'Availability & Slots', icon: Clock },
  { href: '/app/documents', label: 'KYC Documents', icon: FileText },
  { href: '/app/support', label: 'Support & SOS', icon: HelpCircle },
  { href: '/app/settings', label: 'App Settings', icon: Settings },
];

const MOBILE_BOTTOM_TABS = [
  { href: '/app', label: 'Home', icon: LayoutDashboard },
  { href: '/app/leads', label: 'Leads', icon: Radio, badge: '3' },
  { href: '/app/visits', label: 'Visits', icon: Navigation },
  { href: '/app/wallet', label: 'Wallet', icon: Wallet },
  { href: '/app/buddy', label: 'AI Buddy', icon: Bot },
];

export default function ProviderAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, dutyStatus, toggleDutyStatus, logout, isAuthenticated } = useProviderAuth();
  const isDutyActive = dutyStatus;

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSOSActive, setIsSOSActive] = useState(false);

  const therapistName = user?.fullName || user?.name || (user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Dr. Rohan Sharma, BPT');
  const axId = user?.axId || 'AX-IND-4892';
  const isApproved = user?.status === 'Active' || user?.status === 'Approved' || user?.status === 'ACTIVE';
  const isUnderReview = user?.status === 'Pending' || user?.status === 'UNDER_REVIEW' || user?.status === 'Incomplete';

  const handleSOSTrigger = () => {
    setIsSOSActive(true);
    // In production broadcasts live GPS to clinical escalation center
    setTimeout(() => {
      alert('🚨 EMERGENCY SOS TRIGGERED: Dispatch team and Clinical Director notified. GPS Coordinates transmitted.');
      setIsSOSActive(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 h-16 border-b border-border/80 bg-card/95 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between shadow-sm">
        {/* Brand & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
            className="lg:hidden p-2 rounded-xl bg-muted/60 hover:bg-muted text-foreground"
          >
            {isMobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/app" className="flex items-center gap-2" prefetch={false}>
            <div className="relative h-9 w-32 sm:w-40">
              <Image
                src="/logo-light.png"
                alt="Aries PhysioCare"
                fill
                className="object-contain block dark:hidden object-left"
                priority
              />
              <Image
                src="/logo-dark.png"
                alt="Aries PhysioCare"
                fill
                className="object-contain hidden dark:block object-left"
                priority
              />
            </div>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest font-extrabold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Xpert Provider
            </span>
          </Link>
        </div>

        {/* Center/Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Duty Status Switch */}
          <button
            type="button"
            onClick={() => toggleDutyStatus()}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-sm ${
              isDutyActive
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20'
                : 'bg-muted/80 border-border text-muted-foreground hover:bg-muted'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${isDutyActive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="hidden sm:inline">{isDutyActive ? 'On Duty (Receiving Leads)' : 'Off Duty'}</span>
            <span className="sm:hidden">{isDutyActive ? 'Online' : 'Offline'}</span>
          </button>

          {/* SOS Emergency Button */}
          <button
            type="button"
            onClick={handleSOSTrigger}
            className="p-2 rounded-full bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-white transition-all shadow-sm flex items-center gap-1 text-xs font-bold"
            title="Trigger Emergency SOS"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span className="hidden md:inline">SOS</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Profile dropdown */}
          <div className="flex items-center gap-2 pl-2 border-l border-border/80">
            <Link href="/app/profile" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-md">
                {therapistName.charAt(0) || 'D'}
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold text-foreground leading-tight group-hover:text-primary transition-colors truncate max-w-[120px]">
                  {therapistName.split(',')[0]}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono leading-none">
                  {axId}
                </div>
              </div>
            </Link>

            <button
              type="button"
              onClick={logout}
              className="p-1.5 text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
              title="Sign Out"
            >
              <Power className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Under Review Notification Banner */}
      {isUnderReview && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-600 dark:text-amber-400 px-4 py-2 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              <strong>Application Under Verification:</strong> Your KYC documents and clinical credentials are being verified by our Clinical Director. You can explore all modules and test simulation leads.
            </span>
          </div>
          <Link href="/app/documents" className="font-bold underline shrink-0 ml-2">
            Check Status →
          </Link>
        </div>
      )}

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-border/80 bg-card/50 p-4 shrink-0 overflow-y-auto max-h-[calc(100vh-4rem)] sticky top-16">
          <div className="space-y-1">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground px-3 py-1 mb-1">
              Clinical Operations
            </div>
            {NAV_ITEMS.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                  prefetch={false}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                        isActive ? 'bg-white text-primary' : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground px-3 py-1 mb-1">
              Finance & Growth
            </div>
            {NAV_ITEMS.slice(5, 10).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                  prefetch={false}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-muted text-muted-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground px-3 py-1 mb-1">
              AI & Administration
            </div>
            {NAV_ITEMS.slice(10).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : item.highlight
                      ? 'bg-accent/10 text-accent hover:bg-accent/20 font-extrabold'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                  prefetch={false}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white text-primary' : 'bg-primary/20 text-primary'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Support Badge in Sidebar bottom */}
          <div className="mt-auto pt-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>24x7 Ops Helpline</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Direct coordinator hotline for doorstep assistance.
              </p>
              <Link
                href="/app/support"
                className="mt-2 text-xs font-bold text-primary hover:underline block"
              >
                Contact Ops Desk →
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Fullscreen Navigation Drawer */}
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileDrawerOpen(false)}
            />
            <div className="relative w-80 bg-card border-r border-border h-full flex flex-col p-4 shadow-2xl overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                <span className="font-extrabold text-sm text-foreground">AriesXpert Menu</span>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileDrawerOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold ${
                        isActive ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'
                      }`}
                      prefetch={false}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={logout}
                  className="w-full py-2.5 px-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of AriesXpert</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Workspace Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border/80 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {MOBILE_BOTTOM_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || (tab.href !== '/app' && pathname.startsWith(tab.href));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all relative ${
                isActive ? 'text-primary font-extrabold scale-105' : 'text-muted-foreground hover:text-foreground'
              }`}
              prefetch={false}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{tab.label}</span>
              {tab.badge && (
                <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-primary animate-ping" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
