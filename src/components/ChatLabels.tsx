"use client";
import React from "react";
import { useChats } from "@/hooks/chats";
import Link from "next/link";
import { ChatArraySchema } from "@/schema/chat";

const ChatLabels = ({ initialChats }: Props) => {
  console.log(initialChats);
  const { chats } = useChats();

  return (
    <div className="mt-4 px-2 gap-4">
      {chats?.map((item) => (
        <Link
          key={item.chat_id}
          className="block p-2 mb-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          href={`/dashboard/chat/${item.chat_id}`}
        >
          <span>{item.chat_title}</span>
        </Link>
      ))}
    </div>
  );
};

{
  /* {.map((item) => (
            <Link
              key={item.chatId}
              className="text-sm text-left underline"
              href={`/dashboard/chat/${item.chatId}`}
            >
              <span>{item.chatTitle}</span>
            </Link>
          ))} */
}

export default ChatLabels;
