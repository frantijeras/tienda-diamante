import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "size-4",
  md: "size-6",
  lg: "size-10",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center py-12", className)}>
      <Loader2 className={cn("animate-spin text-lila-500", sizeMap[size])} />
    </div>
  );
}
