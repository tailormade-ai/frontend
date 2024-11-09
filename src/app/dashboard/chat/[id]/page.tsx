import ChatInput from "@/components/ChatInput";
import { db } from "@/db";
import { eq, asc } from "drizzle-orm";
import { messageTable } from "@/db/schema";
import React from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatContainer from "@/components/ChatContainer";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const chatId = params.id;
  const messages = await db
    .select()
    .from(messageTable)
    .where(eq(messageTable.chatId, chatId))
    .orderBy(asc(messageTable.timestamp));

  return (
    <div className="max-w-4xl w-full mx-auto h-[calc(100vh-150px)] flex flex-col">
      <h1 className="text-2xl font-bold">Chat</h1>
      <ChatContainer initialMessages={messages} chatId={chatId} />
    </div>
  );
}
