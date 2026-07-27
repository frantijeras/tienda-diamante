"use client";

import { useRouter } from "next/navigation";
import { Edit, Archive, ArchiveRestore, Trash2 } from "lucide-react";

interface AdminProductosActionsProps {
  id: string;
  activo: boolean;
}

export function AdminProductosActions({ id, activo }: AdminProductosActionsProps) {
  const router = useRouter();

  const handleToggle = async () => {
    await fetch(`/api/productos/${id}`, { method: "PATCH" });
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    await fetch(`/api/productos/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="flex items-center gap-1">
      <a
        href={`/admin/productos/${id}/editar`}
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
        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
        title="Eliminar"
      >
        <Trash2 className="size-5" />
      </button>
    </div>
  );
}
