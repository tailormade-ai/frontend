import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { EllipsisVerticalIcon } from "lucide-react";
import { eq } from "drizzle-orm";
import React from "react";

const upsertUser = async () => {
  const user = await currentUser();

  const emailAddress = user?.emailAddresses[0].emailAddress;
  const userId = user?.id;

  if (!emailAddress || !userId) return null;

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userId, userId));

  if (!existingUser.length) {
    await db.insert(usersTable).values({ userId, email: emailAddress });
  }
};

const Dashboard = async () => {
  await upsertUser();

  return (
    <div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        {/* <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
