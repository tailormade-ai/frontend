import { cn } from "@/lib/utils";
import React from "react";
import { SelectMessage } from "@/db/schema";
import Markdown from "react-markdown";

type Props = {
  content: string;
  role: string;
};
const ChatMessage = ({ content, role }: Props) => {
  return (
    <div
      className="w-full mx-auto max-w-4xl px-4 group/message"
      data-role={role}
    >
      <div
        className={cn(
          "flex w-full max-w-2xl px-4 py-2 rounded-2xl",
          role === "user"
            ? "bg-blue-500 text-white ml-auto group-data-[role=user]/message:w-fit"
            : "bg-gray-200 text-gray-900 group-data-[role=assistant]/message:w-fit"
        )}
      >
        <div className="w-full">
          <p
            className={cn(
              "text-sm mb-1",
              role === "user" ? "text-blue-100" : "text-gray-500"
            )}
          >
            {role}
          </p>
          <div className="prose dark:prose-invert">
            <Markdown>{content}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
