"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  provider: string;
  provider_key: string;
};

const OAuthProviderCard = ({ provider, provider_key }: Props) => {
  const router = useRouter();
  const handleRemoveProvider = async () => {
    const res = await fetch(`/api/oauth/delete-provider/`, {
      method: "POST",
      body: JSON.stringify({ provider_key, provider }),
    });
    router.refresh();
  };
  return (
    <div
      key={`${provider}-${provider_key}`}
      className="flex items-center justify-between p-4 rounded-lg border"
    >
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="text-xs">
          {provider}
        </Badge>
        <p className="text-md font-medium">{provider_key}</p>
      </div>
      <AlertDialog>
        <AlertDialogTrigger>
          <div
            onClick={handleRemoveProvider}
            className="text-muted-foreground hover:text-destructive transition-colors"
            aria-label={`Remove ${provider} integration`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will remove the {provider} integration for{" "}
              {provider_key}. This might break any existing agents that use this
              integration.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveProvider}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OAuthProviderCard;
