import ChatInput from "@/components/ChatInput";
import { db } from "@/db";
import { chatTable, messageTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function createChat(formData: FormData) {
  "use server";

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const user_id = user.id;
  const message = formData.get("message") as string;

  const newChat = await db
    .insert(chatTable)
    .values({
      userId: user_id,
      chatTitle: "New Chat",
    })
    .returning();
  const chatId = newChat[0].chatId;
  await db.insert(messageTable).values({
    chatId,
    userId: user_id,
    messageText: message,
    role: "user",
  });
  redirect(`/dashboard/chat/${chatId}`);
}

export default function NewChatPage() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <div className="max-w-2xl w-full p-8 rounded-lg ">
        <Link href="/dashboard" className="flex items-center gap-2 mb-6">
          <ArrowLeft />
          Back
        </Link>
        <h1 className="text-2xl font-bold mb-6">Create a new workflow</h1>
        <p className="text-gray-600 mb-8">
          Start a new conversation with our AI assistant to help you create and
          manage your workflows.
        </p>
        <form action={createChat}>
          <ChatInput />
        </form>
      </div>
    </div>
  );
}
