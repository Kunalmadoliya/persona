"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { useUser, useClerk } from "@clerk/nextjs";
import { IconLogout, IconMoon } from "@tabler/icons-react";

export function ProfileSheet() {
  const { profileOpen, setProfileOpen } = useDashboard();
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
      <SheetContent className="w-[320px] sm:w-[360px] bg-sidebar border-sidebar-border">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-base">Profile</SheetTitle>
        </SheetHeader>

        {/* Avatar + Info */}
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.fullName || "User"}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-muted-foreground">
                {user?.firstName?.charAt(0) || "U"}
              </span>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">
              {user?.fullName || "User"}
            </p>
            <p className="text-xs text-muted-foreground">
              {user?.primaryEmailAddress?.emailAddress || ""}
            </p>
          </div>
        </div>

        <Separator />

        {/* Settings */}
        <div className="py-4 space-y-1">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Preferences
          </p>
          <div className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-sidebar-accent/50 transition-colors">
            <div className="flex items-center gap-2.5">
              <IconMoon size={15} stroke={1.5} className="text-muted-foreground" />
              <span className="text-sm">Dark Mode</span>
            </div>
            <span className="text-xs text-muted-foreground">Active</span>
          </div>
        </div>

        <Separator />

        {/* Sign Out */}
        <div className="py-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => signOut({ redirectUrl: "/" })}
          >
            <IconLogout size={15} stroke={1.5} />
            Sign Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
