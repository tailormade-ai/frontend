import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
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
    <div>
      <h1>This is a Dashboard</h1>
    </div>
  );
};

export default Dashboard;
