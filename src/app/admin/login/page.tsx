"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Contraseña incorrecta");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-lila-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-lila-500 rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-2xl">💎</span>
          </div>
          <h1 className="text-h1 font-display font-semibold text-gray-900">
            Panel de Paula
          </h1>
          <p className="text-body text-gray-500 mt-1">La Tienda Diamante</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="password"
            label="Contraseña"
            placeholder="Contraseña"
            value={password}
            onChange={setPassword}
            error={error}
            leftIcon={<span>🔒</span>}
            autoComplete="current-password"
            autoFocus
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="xl"
            fullWidth
            loading={loading}
          >
            Entrar
          </Button>

          <div className="text-center">
            <Link
              href="/"
              className="text-body-sm text-lila-600 hover:text-lila-700 transition-colors"
            >
              ← Ver la tienda
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
