"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: string;
  className?: string;
}

const variantStyles = {
  primary:
    "bg-lila-500 text-white hover:bg-lila-600 shadow-sm hover:shadow-md active:translate-y-0.5",
  secondary:
    "bg-white text-lila-700 border-2 border-lila-200 hover:border-lila-400 hover:bg-lila-50",
  ghost: "bg-transparent text-lila-700 hover:bg-lila-50",
  danger: "bg-danger-500 text-white hover:bg-danger-700",
  success: "bg-success-500 text-white hover:bg-success-700",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-body-sm min-h-[32px]",
  md: "px-4 py-2.5 text-body min-h-[40px]",
  lg: "px-5 py-3 text-body min-h-[48px]",
  xl: "px-6 py-3.5 text-h4 min-h-[56px]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  href,
  className,
}: ButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2",
    "rounded-xl font-semibold",
    "focus-visible:ring-4 focus-visible:ring-lila-200 focus:outline-none",
    "transition-all duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0",
    "cursor-pointer",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    loading && "cursor-wait",
    className
  );

  const content = (
    <>
      {loading && <span className="animate-spin">⏳</span>}
      {children}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
}
