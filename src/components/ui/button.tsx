import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-ink shadow-glow hover:brightness-110",
  secondary:
    "border border-line bg-card text-fg backdrop-blur hover:border-[#FF9900]/50",
  ghost: "text-fg hover:bg-fg/5",
  icon: "h-11 w-11 border border-line bg-card text-fg backdrop-blur hover:border-[#FF9900]/50 hover:text-accent-text",
};

export function buttonStyles(variant: Variant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-medium transition",
    variant === "icon" ? "px-0" : "px-5",
    variants[variant],
    className,
  );
}
