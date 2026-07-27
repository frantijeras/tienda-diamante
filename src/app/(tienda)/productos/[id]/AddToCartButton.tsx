"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Toast } from "@/components/ui/Toast";
import Link from "next/link";

interface AddToCartButtonProps {
  itemId: string;
  nombreItem: string;
  precioUnitario: number;
  itemType: "producto" | "servicio";
  fechaReserva?: string;
  stock?: number;
}

export function AddToCartButton({
  itemId,
  nombreItem,
  precioUnitario,
  itemType,
  fechaReserva,
  stock,
}: AddToCartButtonProps) {
  const [peticion, setPeticion] = useState("");
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const outOfStock = itemType === "producto" && stock !== undefined && stock !== -1 && stock <= 0;

  const handleAdd = async () => {
    if (outOfStock) return;
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType,
          itemId,
          nombreItem,
          precioUnitario,
          cantidad: 1,
          peticionEspecial: peticion || undefined,
          fechaReserva,
        }),
      });

      if (res.ok) {
        setAdded(true);
        setToast("Producto añadido al carrito");
        setTimeout(() => setAdded(false), 2000);
      } else {
        const data = await res.json();
        setToast(data.error || "Error al añadir al carrito");
      }
    } catch {
      setToast("Error al añadir al carrito");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {itemType === "producto" && (
        <Textarea
          label="¿Algo especial? (opcional)"
          placeholder="Ej: Que sea con los colores rojo y azul"
          value={peticion}
          onChange={setPeticion}
          maxLength={200}
          rows={4}
        />
      )}

      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-lila-100 md:static md:border-0 md:p-0">
        {outOfStock ? (
          <Button
            variant="secondary"
            size="xl"
            fullWidth
            disabled
          >
            ❌ Agotado
          </Button>
        ) : (
          <Button
            variant="primary"
            size="xl"
            fullWidth
            loading={loading}
            onClick={handleAdd}
            leftIcon={added ? <Check className="size-6" /> : <ShoppingCart className="size-6" />}
          >
            {added
              ? "✅ ¡Añadido!"
              : itemType === "servicio"
              ? "📅 Reservar"
              : "🛒 Añadir al carrito"}
          </Button>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 mt-2">
        <Link
          href="/carrito"
          className="text-body-sm text-lila-600 hover:text-lila-700 font-medium"
        >
          Ver carrito →
        </Link>
      </div>

      {toast && (
        <Toast
          message={toast}
          variant={toast.includes("Error") ? "error" : "success"}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
