"use client";

import { useRouter } from "next/navigation";
import { Edit, Archive, ArchiveRestore, Trash2 } from "lucide-react";

interface AdminServiciosActionsProps {
  id: string;
  activo: boolean;
}

export function AdminServiciosActions({ id, activo }: AdminServiciosActionsProps) {
  const router = useRouter();

  const handleToggle = async () => {
    await fetch(`/api/servicios/${id}`, { method: "PATCH" });
    router.refresh();
  };

  const handleDelete = async () => {
    if (confirm("¿Seguro que quieres eliminar este servicio? No se puede deshacer.")) {
      await fetch(`/api/servicios/${id}`, { method: "DELETE" });
      router.refresh();
    }
  };

  return (
    <div className="flex items-center gap-1">
      <a
        href={`/admin/servicios/${id}/editar`}
        className="p-2 text-gray-400 hover:text-lila-600 transition-colors"
        title="Editar"
      >
        <Edit className="size-5" />
      </a>
      <button
        onClick={handleToggle}
        className="p-2 text-gray-400 hover:text-warning-600 transition-colors"
        title={activo ? "Archivar" : "Desarchivar"}
      >
        {activo ? (
          <Archive className="size-5" />
        ) : (
          <ArchiveRestore className="size-5" />
        )}
      </button>
      <button
        onClick={handleDelete}
        className="p-2 text-gray-400 hover:text-danger-500 transition-colors"
        title="Eliminar"
      >
        <Trash2 className="size-5" />
      </button>
    </div>
  );
}
