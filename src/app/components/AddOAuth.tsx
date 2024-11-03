"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React from "react";

const scopes = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "openid",
];

const AddOAuth = () => {
  const { user } = useUser();
  const handleOAuthSignIn = async () => {
    if (!user) return;

    try {
      const response = await fetch("/api/oauth/generate-oauth", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to generate OAuth URL");
      }

      const data = await response.json();

      // Redirect to the generated OAuth URL
      window.location.href = data.url;
    } catch (error) {
      console.error("Error generating OAuth URL:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleOAuthSignIn}>Add OAuth</Button>
    </div>
  );
};

export default AddOAuth;
