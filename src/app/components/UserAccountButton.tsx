"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserRoundCog } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";

const UserAccountButton = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  return (
    <Popover>
      <PopoverTrigger>
        <UserRoundCog className="w-5 h-5" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-0">
        <div className="flex items-center justify-start gap-2 p-2 pt-2">
          <div className="flex flex-col space-y-1 leading-none px-2">
            <p className="font-medium text-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <Separator />

        <Link
          className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-4 py-2.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          href="/dashboard/settings"
        >
          Settings
        </Link>
        <Separator />
        <div
          className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-4 py-2.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          onClick={() => signOut()}
        >
          Logout
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAccountButton;
