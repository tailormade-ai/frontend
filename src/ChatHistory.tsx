import React from "react";
import { db } from "./db";
import { chatTable } from "./db/schema";

const ChatHistory = async () => {
  const chats = await db.select().from(chatTable);
  return (
    <div>
      <h1>Chat History</h1>
      {chats.map((chat) => (
        <div key={chat.chatId}>{chat.chatTitle}</div>
      ))}
    </div>
  );
};

export default ChatHistory;
