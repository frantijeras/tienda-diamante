import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "pendiente" | "en_proceso" | "completado" | "cancelado" | "info" | "success" | "warning" | "neutral" | "lila";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  pendiente: "bg-warning-100 text-warning-700",
  en_proceso: "bg-info-100 text-info-700",
  completado: "bg-success-100 text-success-700",
  cancelado: "bg-danger-100 text-danger-700",
  info: "bg-info-100 text-info-700",
  success: "bg-success-100 text-success-700",
  warning: "bg-warning-100 text-warning-700",
  neutral: "bg-gray-100 text-gray-600",
  lila: "bg-lila-100 text-lila-700",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-caption",
  md: "px-2.5 py-1 text-caption",
};

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
