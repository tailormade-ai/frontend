import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "./components/Header";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { FeatureSection } from "./components/Features";

export default function Home() {
  return (
    <Header>
      <section id="hero">
        <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center space-y-6">
            <GradualSpacing
              className="font-display text-center text-4xl font-bold -tracking-widest  text-black dark:text-white md:text-7xl md:leading-[5rem]"
              text="Tailormade"
            />
            <p className="text-muted-foreground text-center max-w-[600px]">
              We build autonomous agents that work around the clock for you.
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
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <FeatureSection />
      <section id="cta">
        <div className="px-5 py-14 lg:px-0">
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-y-5 rounded-2xl border border-slate-500/20 bg-neutral-50 p-10 shadow-inner dark:bg-neutral-900">
            <h3 className="mx-auto max-w-2xl text-balance text-center text-2xl font-bold text-neutral-800 dark:text-white md:text-3xl lg:text-4xl">
              Get Access Today
            </h3>
            <p className="mx-auto text-balance text-center md:text-lg">
              We're currently in beta with some initial customers. Sign up for
              our waitlist here
            </p>
            <a
              href="#"
              className="shadow-small flex h-10 w-48 items-center justify-center gap-2.5 rounded-full border border-neutral-300/30 bg-neutral-900 font-medium text-white shadow-[4px_4px_0_0_rgba(0,0,0,0.9)] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:scale-95 active:shadow-none"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </section>
    </Header>
  );
}
