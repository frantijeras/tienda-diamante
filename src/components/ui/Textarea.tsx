"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  rows?: number;
  name?: string;
  className?: string;
  id?: string;
}

export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
  required,
  disabled,
  maxLength,
  rows = 4,
  name,
  className,
  id,
}: TextareaProps) {
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
      <textarea
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        rows={rows}
        name={name}
        className={cn(
          "w-full min-h-[120px] px-4 py-3 text-body text-gray-900",
          "bg-white border-2 border-gray-200 rounded-md",
          "placeholder:text-gray-400",
          "focus:border-lila-500 focus:ring-4 focus:ring-lila-100 focus:outline-none",
          "transition-colors resize-y",
          "disabled:bg-gray-50 disabled:cursor-not-allowed",
          error && "border-danger-500 focus:border-danger-500 focus:ring-danger-100",
          className
        )}
      />
      {hint && !error && (
        <p className="mt-1.5 text-body-sm text-gray-500">{hint}</p>
      )}
      {error && <p className="mt-1.5 text-body-sm text-danger-500">{error}</p>}
    </div>
  );
}
