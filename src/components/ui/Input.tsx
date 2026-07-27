"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  maxLength?: number;
  autoComplete?: string;
  autoFocus?: boolean;
  name?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  id?: string;
  className?: string;
}

export function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  hint,
  required,
  disabled,
  leftIcon,
  maxLength,
  autoComplete,
  autoFocus,
  name,
  min,
  max,
  step,
  id,
  className,
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-caption font-semibold text-gray-700 uppercase tracking-wide mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          name={name}
          min={min}
          max={max}
          step={step}
          className={cn(
            "w-full h-12 px-4 text-body text-gray-900",
            "bg-white border-2 border-gray-200 rounded-md",
            "placeholder:text-gray-400",
            "focus:border-lila-500 focus:ring-4 focus:ring-lila-100 focus:outline-none",
            "transition-colors",
            "disabled:bg-gray-50 disabled:cursor-not-allowed",
            leftIcon && "pl-12",
            error && "border-danger-500 focus:border-danger-500 focus:ring-danger-100",
            className
          )}
        />
      </div>
      {hint && !error && (
        <p className="mt-1.5 text-body-sm text-gray-500">{hint}</p>
      )}
      {error && <p className="mt-1.5 text-body-sm text-danger-500">{error}</p>}
    </div>
  );
}
