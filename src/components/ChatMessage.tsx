import { cn } from "@/lib/utils";
import React from "react";
import { SelectMessage } from "@/db/schema";

type Props = {
  content: string;
  role: string;
};
const ChatMessage = ({ content, role }: Props) => {
  return (
    <div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      data-role={role}
    >
      <div
        className={cn(
          "group-data-[role=user]/message:bg-primary group-data-[role=user]/message:text-primary-foreground flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl"
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
