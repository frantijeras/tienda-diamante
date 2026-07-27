"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/utils";
import type { Cart } from "@/lib/cart";

interface ConfirmOrderModalProps {
  open: boolean;
  onClose: () => void;
  cart: Cart;
}

export function ConfirmOrderModal({
  open,
  onClose,
  cart,
}: ConfirmOrderModalProps) {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const numProductos = cart.items.filter(
    (i) => i.itemType === "producto"
  ).length;
  const numServicios = cart.items.filter(
    (i) => i.itemType === "servicio"
  ).length;

  const handleConfirm = async () => {
    if (!nombre.trim()) {
      setError("Tu nombre es obligatorio");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/encargos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clienteNombre: nombre.trim(),
          items: cart.items,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        window.location.href = `/confirmacion?id=${data.data.id}`;
      } else {
        const data = await res.json();
        setError(data.error || "Error al procesar el encargo");
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center mb-4">
        <div className="w-16 h-16 mx-auto mb-3 bg-lila-100 rounded-full flex items-center justify-center">
          <Sparkles className="size-8 text-lila-500" />
        </div>
        <h3 className="text-h2 font-display font-semibold text-gray-900">
          ¡Casi listo!
        </h3>
        <p className="text-body text-gray-600 mt-1">
          Dinos tu nombre para confirmar el encargo
        </p>
      </div>

      <div className="bg-lila-50 rounded-xl p-4 mb-4 space-y-1">
        {numProductos > 0 && (
          <div className="flex justify-between text-body">
            <span className="text-gray-700">Productos</span>
            <span className="font-semibold">{numProductos}</span>
          </div>
        )}
        {numServicios > 0 && (
          <div className="flex justify-between text-body">
            <span className="text-gray-700">Servicios</span>
            <span className="font-semibold">{numServicios}</span>
          </div>
        )}
        <div className="border-t border-lila-200 my-2" />
        <div className="flex justify-between text-h4 font-display font-semibold text-lila-700">
          <span>Total</span>
          <span>{formatCurrency(cart.total)}</span>
        </div>
      </div>

      <div className="mb-4">
        <Input
          label="Tu nombre"
          placeholder="Ej: María, abuelo Paco..."
          value={nombre}
          onChange={setNombre}
          error={error}
          autoFocus
          required
        />
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-3">
        <Button variant="secondary" fullWidth onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          fullWidth
          loading={loading}
          onClick={handleConfirm}
        >
          Confirmar encargo ✨
        </Button>
      </div>
    </Modal>
  );
}
