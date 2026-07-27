"use client";

import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";

interface EncargoItem {
  id: string;
  itemType: string;
  nombreItem: string;
  precioUnitario: number;
  cantidad: number;
  peticionEspecial?: string | null;
  fechaReserva?: string | null;
}

interface Encargo {
  id: string;
  clienteNombre: string;
  fechaEncargo: string;
  estado: string;
  total: number;
  notas: string | null;
  items: EncargoItem[];
  createdAt: string;
}

export default function EncargoDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [encargo, setEncargo] = useState<Encargo | null>(null);
  const [loading, setLoading] = useState(true);
  const [notas, setNotas] = useState("");
  const [savingNotas, setSavingNotas] = useState(false);
  const [encargoId, setEncargoId] = useState("");

  useEffect(() => {
    params.then(({ id }) => {
      setEncargoId(id);
      fetch(`/api/encargos/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setEncargo(data.data);
            setNotas(data.data.notas || "");
          }
        })
        .finally(() => setLoading(false));
    });
  }, [params]);

  const handleEstadoChange = async (newEstado: string) => {
    await fetch(`/api/encargos/${encargoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: newEstado }),
    });
    const res = await fetch(`/api/encargos/${encargoId}`);
    const data = await res.json();
    if (data.data) setEncargo(data.data);
  };

  const handleSaveNotas = async () => {
    setSavingNotas(true);
    await fetch(`/api/encargos/${encargoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notas }),
    });
    setSavingNotas(false);
  };

  if (loading) return <Spinner />;
  if (!encargo) {
    return (
      <div className="text-center py-12">
        <p className="text-body text-gray-500">Encargo no encontrado</p>
        <Link
          href="/admin/encargos"
          className="text-body-sm text-lila-600 hover:text-lila-700 font-medium mt-4 inline-block"
        >
          Volver a encargos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/encargos"
        className="inline-flex items-center gap-1 text-body-sm text-lila-600 hover:text-lila-700 transition-colors mb-4"
      >
        <ChevronLeft className="size-4" />
        Volver a encargos
      </Link>

      <h1 className="text-h2 font-display font-semibold text-gray-900 mb-6">
        Encargo #{encargo.id.slice(-4).toUpperCase()}
      </h1>

      <div className="bg-white rounded-2xl border border-lila-100 shadow-sm p-6 mb-6">
        <h2 className="text-caption text-gray-500 uppercase tracking-wide font-semibold mb-1">
          Cliente
        </h2>
        <p className="text-h3 font-display font-semibold text-gray-900">
          {encargo.clienteNombre}
        </p>
        <p className="text-body-sm text-gray-500 mt-1">
          Pedido el {formatDate(encargo.fechaEncargo)}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-lila-100 shadow-sm p-6 mb-6">
        <h2 className="text-caption text-gray-500 uppercase tracking-wide font-semibold mb-3">
          Estado
        </h2>
        <select
          value={encargo.estado}
          onChange={(e) => handleEstadoChange(e.target.value)}
          className={`h-12 px-4 pr-10 text-body font-semibold rounded-full appearance-none cursor-pointer border-2 transition-colors ${
            encargo.estado === "pendiente"
              ? "bg-warning-100 text-warning-700 border-warning-300"
              : encargo.estado === "en_proceso"
              ? "bg-info-100 text-info-700 border-info-300"
              : "bg-success-100 text-success-700 border-success-300"
          }`}
        >
          <option value="pendiente">⏰ Pendiente</option>
          <option value="en_proceso">🔄 En proceso</option>
          <option value="completado">✓ Completado</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-lila-100 shadow-sm p-6 mb-6">
        <h2 className="text-caption text-gray-500 uppercase tracking-wide font-semibold mb-4">
          Items del encargo
        </h2>
        <div className="space-y-4">
          {encargo.items.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 rounded-xl">
              <p className="text-body font-semibold text-gray-900">
                {item.nombreItem}
              </p>
              <p className="text-body-sm text-gray-500 mt-0.5">
                {item.cantidad} {item.cantidad === 1 ? "unidad" : "unidades"} ·{" "}
                {formatCurrency(item.precioUnitario)}/u
              </p>
              <p className="text-body-sm font-semibold text-lila-700 mt-1">
                Subtotal: {formatCurrency(item.precioUnitario * item.cantidad)}
              </p>
              {item.peticionEspecial && (
                <p className="text-body-sm text-lila-600 mt-1">
                  💌 &ldquo;{item.peticionEspecial}&rdquo;
                </p>
              )}
              {item.fechaReserva && (
                <p className="text-body-sm text-lila-600 mt-1">
                  📅 {formatDate(item.fechaReserva)}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-lila-100 mt-4 pt-4">
          <div className="flex justify-between text-h4 font-display font-semibold text-lila-700">
            <span>Total</span>
            <span>{formatCurrency(encargo.total)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-lila-100 shadow-sm p-6">
        <h2 className="text-caption text-gray-500 uppercase tracking-wide font-semibold mb-3">
          Notas internas (solo tú las ves)
        </h2>
        <Textarea
          placeholder="Escribe notas para ti..."
          value={notas}
          onChange={setNotas}
          rows={3}
        />
        <Button
          variant="secondary"
          size="sm"
          className="mt-3"
          onClick={handleSaveNotas}
          loading={savingNotas}
        >
          Guardar notas
        </Button>
      </div>
    </div>
  );
}
