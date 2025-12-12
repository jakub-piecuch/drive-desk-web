"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Car,
  ChevronLeft, ChevronRight,
  CircleUserRound,
  HardHat,
  HomeIcon,
  HousePlus,
  LogOut,
  Menu,
  Train
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Key for localStorage
const SIDEBAR_STATE_KEY = "sidebar-collapsed-state";

export interface AppSidebarProps {
  isMobileView?: boolean;
}

export function AppSidebar({ isMobileView = false }: AppSidebarProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize collapsed state from localStorage if available
  const [collapsed, setCollapsed] = useState(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
      return savedState ? JSON.parse(savedState) : false;
    }
    return false;
  });

  // Save collapsed state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && !isMobileView) {
      localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(collapsed));
    }
  }, [collapsed, isMobileView]);

  // Reset mobile sidebar state when screen size changes
  useEffect(() => {
    if (!isMobileView) {
      setSidebarOpen(false);
    }
  }, [isMobileView]);

  // Replace NavLink with a Next.js compatible version
  const NavItem = ({
    to,
    icon: Icon,
    label
  }: {
    to: string;
    icon: React.ComponentType<{
      className?: string;
    }>;
    label: string;
  }) => {
    const isActive = pathname === to;

    return (
      <Link
        href={to}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 transition-all hover:text-white dark:text-gray-200 dark:hover:text-white",
          isActive ? "bg-primary text-white" : "hover:bg-secondary dark:hover:bg-secondary",
          collapsed && !isMobileView && "justify-center px-2"
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {(!collapsed || isMobileView) && <span>{label}</span>}
      </Link>
    );
  };

  const sidebarContent = (
    <nav className={cn(
      "flex flex-col h-full p-4 transition-all duration-300 ease-in-out",
      !isMobileView && (collapsed ? "w-[60px]" : "w-64")
    )}>
      {/* This wrapper contains all content except the sign out button */}
      <div className="flex flex-col flex-grow min-h-0">
        <div className="flex items-center justify-between mb-4">
          {(!collapsed || isMobileView) && <span className="text-lg font-semibold">DriveDesk</span>}
          {!isMobileView && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Company Selector */}
        {(!collapsed || isMobileView)}

        <div className="flex-grow overflow-y-auto mt-4">
          <div className="mb-4">
            <p className={cn("text-xs font-semibold text-gray-200 mb-2 uppercase", collapsed && !isMobileView && "text-center")}>
              {collapsed && !isMobileView ? "" : "Main"}
            </p>
            <div className="space-y-1">
              <NavItem to="/home/dashboard" icon={HomeIcon} label="Dashboard" />
              <NavItem to="/home/schedules" icon={Calendar} label="Schedules" />
              <NavItem to="/home/cars" icon={Car} label="Cars" />
              <NavItem to="/home/instructors" icon={HardHat} label="Instructors" />
              <NavItem to="/home/trainees" icon={Train} label="Trainees" />
            </div>
          </div>

          <div className="mb-4">
            <p className={cn("text-xs font-semibold text-gray-200 mb-2 uppercase", collapsed && !isMobileView && "text-center")}>
              {collapsed && !isMobileView ? "" : "Settings"}
            </p>
            <div className="space-y-1">
              <NavItem to="/settings" icon={CircleUserRound} label="settings" />
              {/* <NavItem to="/configuration" icon={Settings} label="Configuration" /> */}
              {/* <NavItem to="/companies" icon={HousePlus} label="Companies" /> */}
              {/* <NavItem to="/account" icon={UserCog} label="Account Settings" /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Sign out button - always at the bottom */}
      <div className="mt-auto pt-4">
        <Button
          onClick={() => signOut({ callbackUrl: '/' })}
          className={cn("flex mb-2 items-center justify-center gap-2 w-full", collapsed && !isMobileView && "px-2")}
        >
          <LogOut className="h-4 w-4" />
          {(!collapsed || isMobileView) && <span>Sign out</span>}
        </Button>
      </div>
    </nav>
  );

  // For mobile devices, render a header bar and drawer
  if (isMobileView) {
    return (
      <>
        {/* Mobile header bar */}
        <div className="w-full border-b bg-background shadow-sm py-2 px-4 flex items-center justify-between sticky top-0 z-10">
          <span className="text-lg font-semibold">DriveDesk</span>
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              {sidebarContent}
            </SheetContent>
          </Sheet>
        </div>
      </>
    );
  }

  // For desktop, render the regular sidebar
  return (
    <div className={cn(
      "border-r bg-background transition-all duration-300 ease-in-out",
      collapsed ? "w-[60px]" : "w-64"
    )}>
      {sidebarContent}
    </div>
  );
}