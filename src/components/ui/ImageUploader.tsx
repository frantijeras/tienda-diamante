"use client";

import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  error?: string;
}

export function ImageUploader({ value, onChange, error }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        const data = await res.json();
        alert(data.error || "Error subiendo imagen");
      }
    } catch {
      alert("Error subiendo imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  if (value) {
    return (
      <div className="space-y-2">
        <div className="relative w-full max-w-xs">
          <img
            src={value}
            alt="Preview"
            className="w-full aspect-square object-cover rounded-xl border-2 border-lila-100"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <X className="size-4 text-gray-600" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="text-body-sm text-lila-600 hover:text-lila-700 font-medium"
        >
          Cambiar imagen
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className={cn(
          "w-full border-2 border-dashed border-lila-300 rounded-2xl p-6 text-center",
          "bg-lila-50/50 hover:bg-lila-50 transition-colors cursor-pointer",
          uploading && "opacity-50 cursor-wait"
        )}
      >
        <Upload className="size-10 text-lila-500 mx-auto mb-3" />
        <p className="text-body text-gray-700 font-medium">
          {uploading ? "Subiendo..." : "Toca para subir o hacer foto"}
        </p>
        <p className="text-caption text-gray-500 mt-1">
          Desde móvil puedes hacer foto con la cámara 📸
        </p>
      </button>
      {error && <p className="mt-1.5 text-body-sm text-danger-500">{error}</p>}
    </div>
  );
}
