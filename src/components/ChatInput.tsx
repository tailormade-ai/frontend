"use client";
import { LucideCircleArrowUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  onEnter: (input: string) => void;
};

const ChatInput = ({ onEnter }: Props) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const listener = () => {
      if (!ref.current) {
        return;
      }
      if (input === "") {
        ref.current.style.height = "20px";
        return;
      }
      ref.current.style.height = ref.current.scrollHeight + "px";
      ref.current.style.removeProperty("padding");
    };
    if (ref.current) {
      ref.current.addEventListener("input", listener);
    }
  }, [ref, input]);

  return (
    <div className="grid grid-cols-1 gap-4 border border-gray-200 p-4 rounded-lg">
      <textarea
        ref={ref}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-10 flex-1 resize-y border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 font-sans ring-0 outline-none"
        placeholder="Let's get started"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
      />
      <div className="flex justify-end">
        <Button type="submit">
          <LucideCircleArrowUp />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
