"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React from "react";

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
