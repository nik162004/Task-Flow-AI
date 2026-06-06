import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" };

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-brand text-brand-ink hover:bg-brand/90",
        variant === "ghost" && "hover:bg-muted",
        variant === "outline" && "border border-border bg-transparent hover:bg-muted",
        className
      )}
      {...props}
    />
  );
}
