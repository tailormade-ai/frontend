"use client";
import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useChat, Message } from "@ai-sdk/react";
import ChatMessage from "./ChatMessage";
import { SelectMessage } from "@/db/schema";
import ChatInput from "./ChatInput";

type Props = {
  initialMessages: SelectMessage[];
  chatId: string;
};

const ChatContainer = ({ initialMessages, chatId }: Props) => {
  const { messages, append, setMessages } = useChat({
    api: "/api/backend/chat/completions",
    initialMessages: initialMessages.map((item) => ({
      id: item.messageId.toString(),
      role: item.role as Message["role"],
      content: item.messageText,
    })),
    experimental_prepareRequestBody: ({ messages }) => {
      return {
        chat_id: chatId,
        message: messages[messages.length - 1].content,
      };
    },
    onResponse: async (response) => {
      const respBody = await response.json();
      setMessages([
        ...messages,
        {
          id: respBody.message_id,
          role: "assistant",
          content: respBody.message,
        },
      ]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    append({ content: e.currentTarget.message.value, role: "user" });
  };

  console.log(messages);
  return (
    <div className="flex flex-col gap-4 h-[700px] border p-4 border-gray-200 rounded-lg">
      <div className="pt-4 flex-1 overflow-y-auto my-4">
        {messages.map((item) => {
          return (
            <ChatMessage
              key={item.id}
              content={item.content}
              role={item.role}
            />
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <ChatInput />
      </form>
    </div>
  );
};

export default ChatContainer;
