import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-[transform,box-shadow,background-color,color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-primary/35 bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(158_48%_28%))] text-primary-foreground shadow-[0_14px_30px_hsl(var(--primary)/0.22)] hover:-translate-y-0.5 hover:shadow-[0_18px_38px_hsl(var(--primary)/0.28)] before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.08)_32%,rgba(255,255,255,0.45)_50%,rgba(255,255,255,0.08)_68%,transparent_100%)] before:animate-[button-shine_4.4s_ease-in-out_infinite] before:pointer-events-none",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background/92 shadow-[0_10px_24px_rgba(30,35,38,0.06)] hover:bg-accent hover:text-accent-foreground hover:border-primary/35",
        secondary:
          "border border-border/70 bg-[linear-gradient(135deg,hsl(var(--secondary)),hsl(var(--background)))] text-secondary-foreground shadow-[0_10px_22px_rgba(30,35,38,0.08)] hover:-translate-y-0.5 hover:border-primary/30 before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.06)_34%,rgba(255,255,255,0.34)_50%,rgba(255,255,255,0.06)_66%,transparent_100%)] before:animate-[button-shine_5s_ease-in-out_infinite] before:pointer-events-none",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:border-primary/25",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };




