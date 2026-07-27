import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
  href?: string;
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
};

export function Card({
  children,
  className,
  padding = "md",
  interactive = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-lila-100",
        paddingClasses[padding],
        interactive &&
          "hover:shadow-md hover:-translate-y-1 active:translate-y-0 active:shadow-sm cursor-pointer transition-all duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}
