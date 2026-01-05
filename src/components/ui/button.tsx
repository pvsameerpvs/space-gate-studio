import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition will-change-transform select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        neon:
          "text-white bg-white/5 border border-white/10 shadow-glow hover:border-white/20 hover:shadow-neon",
        ghost:
          "text-white/80 hover:text-white bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-7 text-base"
      }
    },
    defaultVariants: { variant: "neon", size: "md" }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
