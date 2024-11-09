import ChatInput from "@/components/ChatInput";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function createChat(formData: FormData) {
  "use server";

  const input = formData.get("input") as string;

  await fetch("/api/chat/new", {
    method: "POST",
    body: JSON.stringify({ input }),
  });

  redirect(`/dashboard/chat/${input}`);
}

export default function NewChatPage() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <div className="max-w-2xl w-full p-8 rounded-lg ">
        <Link href="/dashboard" className="flex items-center gap-2 mb-6">
          <ArrowLeft />
          Back
        </Link>
        <h1 className="text-2xl font-bold mb-6">Create a new workflow</h1>
        <p className="text-gray-600 mb-8">
          Start a new conversation with our AI assistant to help you create and
          manage your workflows.
        </p>
        <form action={createChat}>
          <ChatInput />
        </form>
      </div>
    </div>
  );
}
