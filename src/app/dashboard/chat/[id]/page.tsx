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

  return (
    <div className="">
      <ChatContainer chatId={chatId} />
    </div>
  );
}
