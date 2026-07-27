"use client";

import { useRouter } from "next/navigation";

interface AdminServiciosActionsProps {
  id: string;
  activo: boolean;
}

export function AdminServiciosActions({ id, activo }: AdminServiciosActionsProps) {
  const router = useRouter();

  const handleToggle = async () => {
    await fetch(`/api/servicios/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="flex items-center gap-1">
      <a
        href={`/admin/servicios/${id}/editar`}
        className="p-2 text-gray-400 hover:text-lila-600 transition-colors"
        title="Editar"
      >
        ✏️
      </a>
      <button
        onClick={handleToggle}
        className="p-2 text-gray-400 hover:text-warning-600 transition-colors"
        title={activo ? "Archivar" : "Desarchivar"}
      >
        {activo ? "📁" : "📂"}
      </button>
    </div>
  );
}
