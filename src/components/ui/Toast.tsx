"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  variant?: "success" | "error";
  duration?: number;
  onClose: () => void;
}

export function Toast({
  message,
  variant = "success",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-[100]",
        "flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg",
        "transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2",
        variant === "success"
          ? "bg-success-50 text-success-700 border border-success-200"
          : "bg-danger-50 text-danger-700 border border-danger-200"
      )}
    >
      <span className="flex-shrink-0">{variant === "success" ? "✅" : "⚠️"}</span>
      <p className="text-body font-medium">{message}</p>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-2 p-0.5 hover:opacity-70 transition-opacity"
      >
        ❌
      </button>
    </div>
  );
}
