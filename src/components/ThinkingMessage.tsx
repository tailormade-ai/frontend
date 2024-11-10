import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";

export const ThinkingMessage = () => {
  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        transition: {
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 0.1, 0.9, 1],
        },
      }}
      data-role="assistant"
    >
      <div
        className={cn(
          "flex gap-4 items-center group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl",
          {
            "group-data-[role=user]/message:bg-muted": true,
          }
        )}
      >
        <motion.div
          className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border"
          animate={{
            scale: [1, 1.1, 1],
            transition: {
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            },
          }}
        >
          <SparklesIcon size={14} />
        </motion.div>

        <motion.div
          className="flex flex-col gap-2 w-full"
          animate={{
            opacity: [1, 1, 1, 1],
          }}
        >
          <div className="flex flex-col gap-4 text-muted-foreground">
            Thinking...
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
