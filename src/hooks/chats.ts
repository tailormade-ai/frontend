import { ChatArraySchema } from "@/schema/chat";
import { useQuery } from "@tanstack/react-query";

interface Chat {
  // Define chat interface based on your API response
  id: string;
  // Add other chat properties
}

export const useChats = () => {
  const { data: chats } = useQuery<Zod.infer<typeof ChatArraySchema>>({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await fetch("/api/backend/chat/");
      if (!response.ok) {
        throw new Error("Failed to fetch chats");
      }
      const data = await response.json();
      console.log(data);
      const parsedData = ChatArraySchema.parse(data);

      return parsedData;
    },
    throwOnError: true,
  });

  return { chats };
};
