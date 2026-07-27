"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: LucideIcon | React.ReactNode;
  rightIcon?: LucideIcon | React.ReactNode;
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

function isLucideIcon(
  icon: LucideIcon | React.ReactNode
): icon is LucideIcon {
  return typeof icon === "function";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
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

  const renderLeftIcon = () => {
    if (loading) return <Loader2 className="size-5 animate-spin" />;
    if (!LeftIcon) return null;
    if (isLucideIcon(LeftIcon)) return <LeftIcon className="size-5" />;
    return LeftIcon;
  };

  const renderRightIcon = () => {
    if (loading || !RightIcon) return null;
    if (isLucideIcon(RightIcon)) return <RightIcon className="size-5" />;
    return RightIcon;
  };

  const content = (
    <>
      {renderLeftIcon()}
      {children}
      {renderRightIcon()}
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
