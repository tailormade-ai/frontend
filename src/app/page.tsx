import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section id="hero">
      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center space-y-6">
          <h1 className="text-[42px] font-medium text-center text-balance max-w-3xl tracking-tighter">
            Autonomous Agents working around the clock for you
          </h1>
          <p className="text-muted-foreground text-center max-w-[600px]">
            Boost productivity, enhance collaboration and simplify your job
            without lifting a finger.
          </p>
          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: "default",
              size: "lg",
            })}
          >
            Get started today
          </Link>
        </div>
      </div>
    </section>
  );
}
