import { SelectMessage } from "@/db/schema";
import { messageSchema } from "@/schema/chat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

type Props = {
  chatId: string;
};

export function useChat({ chatId }: Props) {
  const queryClient = useQueryClient();
  const { data: messages, isFetching } = useQuery<
    z.infer<typeof messageSchema>[]
  >({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`/api/backend/chat/${chatId}`).then(async (res) => {
        const resp = await res.json();
        return resp.map((message: any) => messageSchema.parse(message));
      }),
    throwOnError: true,
  });

  const { mutate: sendMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: async (message: string) => {
      queryClient.setQueryData(["chat", chatId], (oldData: any) => {
        return [
          ...(oldData || []),
          {
            message_id: "",
            chat_id: chatId,
            role: "user",
            message_text: message,
          },
        ];
      });
      const response = await fetch("/api/backend/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          message,
        }),
      });
      const resp = await response.json();
      console.log(resp);
      return resp.map((message: any) => messageSchema.parse(message));
    },
    onSuccess: (resp) => {
      queryClient.setQueryData(["chat", chatId], (oldData: any) => {
        return oldData.slice(0, -1).concat(resp);
      });
    },
    throwOnError: true,
  });

  return {
    messages,
    isFetchingMessages: isFetching,
    isSendingMessage,
    sendMessage,
  };
}
