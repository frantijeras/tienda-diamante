"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface ReservarButtonProps {
  servicioId: string;
  nombre: string;
  precio: number;
  minDate: string;
  maxDate: string;
}

export function ServicioReservarButton({
  servicioId,
  nombre,
  precio,
  minDate,
  maxDate,
}: ReservarButtonProps) {
  const [fecha, setFecha] = useState("");
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleReservar = async () => {
    if (!fecha) return;

    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: "servicio",
          itemId: servicioId,
          nombreItem: nombre,
          precioUnitario: precio,
          cantidad: 1,
          fechaReserva: fecha,
        }),
      });

      if (res.ok) {
        setAdded(true);
        setToast("Servicio añadido al carrito");
        setTimeout(() => setAdded(false), 2000);
      }
    } catch {
      setToast("Error al añadir al carrito");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-caption font-semibold text-gray-700 uppercase tracking-wide mb-2">
          Fecha de la reserva
        </label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-lila-500 pointer-events-none" />
          <input
            type="date"
            min={minDate}
            max={maxDate}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full h-14 pl-12 pr-4 text-body-lg bg-white border-2 border-lila-200 rounded-md focus:border-lila-500 focus:ring-4 focus:ring-lila-100 focus:outline-none transition-colors"
          />
        </div>
        <p className="text-body-sm text-gray-500 mt-1">
          Mínimo: {formatDate(minDate)}. Puedes reservar hasta 90 días.
        </p>
      </div>

      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-lila-100 md:static md:border-0 md:p-0">
        <Button
          variant="primary"
          size="xl"
          fullWidth
          loading={loading}
          disabled={!fecha}
          onClick={handleReservar}
>
          {added
            ? "¡Reservado! ✓"
            : fecha
            ? `📅 Reservar para ${formatDate(fecha)}`
            : "Elige una fecha para continuar"}
        </Button>
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
