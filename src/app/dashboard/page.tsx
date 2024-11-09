import ChatContainer from "@/components/ChatContainer";
import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React from "react";

const upsertUser = async (userId: string, email: string) => {
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userId, userId));
  if (!existingUser.length) {
    await db.insert(usersTable).values({ userId, email });
  }
};

const Dashboard = async () => {
  const user = await currentUser();

  const emailAddress = user?.emailAddresses[0].emailAddress;
  const userId = user?.id;

  if (!emailAddress || !userId) return null;
  await upsertUser(userId, emailAddress);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          href="/dashboard/chat"
          className={buttonVariants({ variant: "outline" })}
        >
          Start a New Chat
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
