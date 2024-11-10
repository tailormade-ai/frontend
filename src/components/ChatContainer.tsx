"use client";
import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useChat } from "@/hooks/use-chat";
import { Skeleton } from "./ui/skeleton";
import { SparklesIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThinkingMessage } from "./ThinkingMessage";

type Props = {
  chatId: string;
};

const ChatContainer = ({ chatId }: Props) => {
  const { messages, isFetchingMessages, sendMessage, isSendingMessage } =
    useChat({
      chatId,
    });
  const messagesDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesDivRef.current?.scrollTo({
      top: messagesDivRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;
    sendMessage(message);
    e.currentTarget.reset();
  };

  if (isFetchingMessages) {
    return (
      <div className="flex flex-col gap-4 h-[calc(100vh-5rem)] max-w-4xl w-full mx-auto">
        <div className="pt-4 flex-1 overflow-y-auto my-4">
          <Skeleton className="h-[50px] rounded-lg mb-6 w-[60%] ml-auto" />

          <Skeleton className="h-[50px] rounded-lg my-2 w-[60%]" />
          <Skeleton className="h-[50px] rounded-lg my-2 w-[60%]" />

          <Skeleton className="h-[50px] rounded-lg my-6 w-[60%] ml-auto" />
        </div>
        <ChatInput disabled={true} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <div
        ref={messagesDivRef}
        className="flex-1 overflow-y-auto space-y-4 my-4"
      >
        {messages?.map((item, idx) => {
          return (
            <ChatMessage
              key={idx}
              content={item["message_text"]}
              role={item["role"]}
            />
          );
        })}
        <div className="pb-4">{isSendingMessage && <ThinkingMessage />}</div>
      </div>
      <div className="max-w-4xl w-full mx-auto">
        <form onSubmit={handleSubmit}>
          <ChatInput />
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
