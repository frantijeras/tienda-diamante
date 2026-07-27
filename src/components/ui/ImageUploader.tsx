"use client";

import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  error?: string;
}

export function ImageUploader({ value, onChange, error }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      // Limpiar object URL al desmontar
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  const handleUpload = async (file: File) => {
    // Mostrar preview local inmediato
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = objectUrl;

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
        setLocalPreview(null);
        if (previewRef.current) URL.revokeObjectURL(previewRef.current);
        previewRef.current = null;
        onChange(data.url);
      } else {
        const data = await res.json();
        alert(data.error || "Error subiendo imagen");
        setLocalPreview(null);
      }
    } catch {
      alert("Error subiendo imagen");
      setLocalPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const displayUrl = localPreview || value;

  if (displayUrl) {
    return (
      <div className="space-y-2">
        <div className="relative w-full max-w-xs">
          <img
            src={displayUrl}
            alt="Preview"
            className="w-full aspect-square object-cover rounded-xl border-2 border-lila-100"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
              <div className="bg-white/90 rounded-full px-4 py-2 text-body-sm font-medium text-lila-700 shadow-lg">
                Comprimiendo y subiendo...
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              if (previewRef.current) URL.revokeObjectURL(previewRef.current);
              previewRef.current = null;
              setLocalPreview(null);
              onChange("");
            }}
            disabled={uploading}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <X className="size-4 text-gray-600" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="text-body-sm text-lila-600 hover:text-lila-700 font-medium disabled:opacity-50"
        >
          {uploading ? "Subiendo..." : "Cambiar imagen"}
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
