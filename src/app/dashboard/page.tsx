import CreateChatContainer from "@/components/CreateChatContainer";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

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
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <div className="max-w-2xl w-full p-8 rounded-lg ">
        <h1 className="text-2xl font-bold mb-6">Create a new workflow</h1>
        <p className="text-gray-600 mb-8">
          Start a new conversation with our AI assistant to help you create and
          manage your workflows.
        </p>
        <CreateChatContainer />
      </div>
    </div>
  );
};

export default Dashboard;
