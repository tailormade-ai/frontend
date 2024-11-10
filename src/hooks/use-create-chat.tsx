import { createChatResponseSchema } from "@/schema/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useCreateChat() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: createChat, isPending: isCreatingChat } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/backend/chat/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: formData.get("message"),
        }),
      });
      const data = await response.json();
      return createChatResponseSchema.parse(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["chat", data.chat_id], data.messages);
      router.push(`/dashboard/chat/${data.chat_id}`);
    },
  });

  return {
    createChat,
    isCreatingChat,
  };
}
