"use client";
import React from "react";
import ChatInput from "./ChatInput";
import { useMutation } from "@tanstack/react-query";
import { ThinkingMessage } from "./ThinkingMessage";
import { motion } from "framer-motion";
import { useCreateChat } from "@/hooks/use-create-chat";

const CreateChatContainer = () => {
  const { createChat, isCreatingChat } = useCreateChat();

  return (
    <>
      <div style={{ position: "relative" }}>
        {isCreatingChat && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ position: "absolute", width: "100%" }}
          >
            <ThinkingMessage />
          </motion.div>
        )}
        <motion.div
          animate={{
            opacity: isCreatingChat ? 0 : 1,
            y: isCreatingChat ? 10 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <form action={createChat}>
            <ChatInput />
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default CreateChatContainer;
