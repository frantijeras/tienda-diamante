"use client";

import { useRouter } from "next/navigation";

interface EncargosActionsProps {
  id: string;
  estado: string;
}

export function EncargosActions({ id, estado }: EncargosActionsProps) {
  const router = useRouter();

  const handleChangeEstado = async (newEstado: string) => {
    await fetch(`/api/encargos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: newEstado }),
    });
    router.refresh();
  };

  return (
    <select
      value={estado}
      onChange={(e) => handleChangeEstado(e.target.value)}
      className={`h-10 px-3 pr-8 text-body-sm font-semibold rounded-full appearance-none cursor-pointer border-2 transition-colors ${
        estado === "pendiente"
          ? "bg-warning-100 text-warning-700 border-warning-300"
          : estado === "en_proceso"
          ? "bg-info-100 text-info-700 border-info-300"
          : "bg-success-100 text-success-700 border-success-300"
      }`}
    >
      <option value="pendiente">⏰ Pendiente</option>
      <option value="en_proceso">🔄 En proceso</option>
      <option value="completado">✓ Completado</option>
    </select>
  );
}
