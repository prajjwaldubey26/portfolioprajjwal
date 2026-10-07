import { cn, isPlaceholder } from "@/lib/utils";

export function Slot({ value, className }: { value: string; className?: string }) {
  if (isPlaceholder(value)) {
    return (
      <span
        className={cn(
          "inline-flex rounded-md border border-dashed border-line px-2 py-0.5 align-middle font-mono text-xs font-normal text-muted",
          className,
        )}
      >
        {value}
      </span>
    );
  }

  return <span className={className}>{value}</span>;
}
