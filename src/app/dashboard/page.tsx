import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import React from "react";
import AddOAuth from "../components/AddOAuth";

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
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div>
        <SignedIn>
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
      <div>
        <AddOAuth />
      </div>
    </div>
  );
};

export default Dashboard;
