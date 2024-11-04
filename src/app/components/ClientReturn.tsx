import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import React from "react";

type Props = {
  href: string;
  text?: string;
};

const ClientReturn = ({ href, text }: Props) => {
  return (
    <Link
      className="flex items-center gap-2 text-sm font-medium mb-10"
      href={href}
    >
      <ArrowLeftIcon />
      {text}
    </Link>
  );
};

export default ClientReturn;
