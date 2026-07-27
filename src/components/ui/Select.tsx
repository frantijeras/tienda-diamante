"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  className?: string;
}

export function Select({
  label,
  value,
  onChange,
  options,
  error,
  required,
  disabled,
  name,
  className,
}: SelectProps) {
  return (
    <div>
      {label && (
        <label className="block text-caption font-semibold text-gray-700 uppercase tracking-wide mb-2">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          name={name}
          className={cn(
            "w-full h-12 px-4 pr-10 text-body bg-white",
            "border-2 rounded-md appearance-none cursor-pointer",
            "focus:outline-none transition-colors",
            "disabled:bg-gray-50 disabled:cursor-not-allowed",
            error
              ? "border-danger-500 focus:ring-4 focus:ring-danger-100"
              : "border-gray-200 focus:border-lila-500 focus:ring-4 focus:ring-lila-100",
            className
          )}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
      </div>
      {error && <p className="mt-1.5 text-body-sm text-danger-500">{error}</p>}
    </div>
  );
}
