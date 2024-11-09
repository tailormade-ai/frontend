import ClientReturn from "@/components/ClientReturn";
import { SidebarNav } from "@/components/SidebarNav";
import { Separator } from "@/components/ui/separator";
import React from "react";

const sidebarNavItems = [
  {
    title: "Integrations",
    href: "/dashboard/settings",
  },
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="space-y-0.5">
        <ClientReturn href="/dashboard" text="Return to Dashboard" />
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;
