import React from "react";
import UserAccountButton from "../../components/UserAccountButton";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <header className="supports-backdrop-blur:bg-background/90 sticky top-0 z-40 w-full bg-background/40 backdrop-blur-lg">
        <div className="flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link
              href="/dashboard"
              className="hidden font-bold md:inline-block"
            >
              Tailormade
            </Link>
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              Beta
            </div>
          </div>
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <ClerkProvider dynamic>
              <UserAccountButton />
            </ClerkProvider>
          </div>
        </div>
      </header>
      <div className="hidden space-y-6 py-10 pb-16 md:block">{children}</div>
    </div>
  );
};

export default DashboardLayout;
