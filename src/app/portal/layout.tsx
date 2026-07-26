
'use client';

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { HeartPulse, LayoutDashboard, Calendar, Activity, User, LogOut, MessageSquare, Settings, Palette } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/firebase/auth/use-user";
import { useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useEffect } from "react";

const navItems = [
  { title: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { title: "Appointments", href: "/portal/appointments", icon: Calendar },
  { title: "Recovery Track", href: "/portal/recovery", icon: Activity },
  { title: "Support", href: "/portal/support", icon: MessageSquare },
  { title: "Website Theme", href: "/portal/theme", icon: Palette },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (isUserLoading) {
    return <div className="h-screen flex items-center justify-center">Loading portal...</div>;
  }

  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar className="border-r border-border/20 glassmorphic">
          <SidebarHeader className="p-6 border-b border-border/10">
            <Link href="/" className="flex items-center gap-2">
              <HeartPulse className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline text-foreground">
                Aries Portal
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                        <Link href={item.href}>
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-border/10">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="h-16 border-b border-border/10 flex items-center px-6 gap-4 bg-background/50 backdrop-blur-md">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">{user.displayName || 'Valued Patient'}</p>
                <p className="text-xs text-muted-foreground">{user.email || 'Guest User'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {user.displayName?.[0] || <User className="w-5 h-5" />}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
