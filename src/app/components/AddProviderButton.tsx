"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { generateGoogleOAuthUrl } from "../lib/oauth";

type Provider = keyof typeof providerToHandler;

type AddProviderButtonProps = {
  provider: Provider;
};

const providerToHandler = {
  Google: generateGoogleOAuthUrl,
};

const AddProviderButton = ({ provider }: AddProviderButtonProps) => {
  const { toast } = useToast();

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
      await providerToHandler[provider]();
      toast({
        title: "Added provider",
        description: `Starting OAuth flow for ${provider}`,
      });
    } catch (error) {
      toast({
        title: "Error adding provider",
        description: `Error adding ${provider} provider`,
        variant: "default",
      });
    }
  };
  return (
    <Button className="max-w-sm mt-4" onClick={handleOnClick}>
      Add {provider} Account
    </Button>
  );
};

export default AddProviderButton;
