import { cn } from "@/lib/utils";
import React from "react";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
    >
      <div className="w-20 h-20 bg-lila-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-h3 text-gray-900 font-display font-medium mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-body text-gray-500 mb-6 max-w-sm">{description}</p>
      )}
      {action}
    </div>
  );
}
