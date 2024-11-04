"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import { generateGoogleOAuthUrl, generateNotionOAuthUrl } from "../lib/oauth";
import { useUser } from "@clerk/nextjs";

type Provider = keyof typeof providerToHandler;

type AddProviderButtonProps = {
  provider: Provider;
};

const providerToHandler = {
  Google: generateGoogleOAuthUrl,
  Notion: generateNotionOAuthUrl,
};

const AddProviderButton = ({ provider }: AddProviderButtonProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const handleOnClick = async () => {
    if (!providerToHandler[provider]) {
      toast({
        title: "Error adding provider",
        description: `No handler for ${provider}`,
        variant: "default",
      });
      return;
    }

    try {
      if (provider === "Notion") {
        await generateNotionOAuthUrl(user?.id);
      } else if (provider === "Google") {
        await generateGoogleOAuthUrl();
      } else {
        throw new Error(`No handler for ${provider}`);
      }
    } catch {
      toast({
        title: "Error adding provider",
        description: `Error adding ${provider} provider`,
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      className="max-w-sm mt-4"
      onClick={handleOnClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <PulseLoader color="white" speedMultiplier={0.3} size={10} />
      ) : (
        `Add ${provider} Account`
      )}
    </Button>
  );
};

export default AddProviderButton;
