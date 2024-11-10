import { z } from "zod";

export const messageSchema = z.object({
  message_id: z.string(),
  chat_id: z.string(),
  role: z.enum(["user", "assistant"]),
  message_text: z.string(),
  created_at: z.string(),
});

export const createChatResponseSchema = z.object({
  chat_id: z.string(),
  messages: z.array(messageSchema),
});

export const chatSchema = z.object({
  chat_id: z.string(),
  chat_title: z.string(),
  created_at: z.coerce.date(),
  user_id: z.string(),
});

export const ChatArraySchema = z.array(chatSchema);
