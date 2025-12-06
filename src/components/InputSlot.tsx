import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode } from "react";
import { cn } from "../lib/utils";

// eslint-disable-next-line react-refresh/only-export-components
export const inputVariants = cva("w-15 h-15 border grid place-items-center", {
  variants: {
    variant: {
      default: "",
      correct: "bg-green-400",
      almost: "bg-yellow-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const InputSlot = ({
  content,
  variant = "default",
}: {
  content: ReactNode;
  correctLetter: string;
  variant: VariantProps<typeof inputVariants>["variant"];
}) => {
  return (
    <div
      className={cn(
        inputVariants({
          variant,
        })
      )}
    >
      <span className="text-2xl uppercase">{content}</span>
    </div>
  );
};
