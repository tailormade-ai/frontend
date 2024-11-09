import { SelectMessage } from "@/db/schema";
import { Message } from "@ai-sdk/react";
import { useMutation, useQuery } from "@tanstack/react-query";

type Props = {
  messages: SelectMessage[];
};
export function useChat({ messages }: Props) {}
