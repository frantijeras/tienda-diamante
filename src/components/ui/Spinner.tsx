import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-3xl",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center py-12", className)}>
      <span className={cn("animate-spin", sizeMap[size])}>⏳</span>
    </div>
  );
}
