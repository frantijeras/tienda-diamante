import { getAllServicios } from "@/lib/services";
import { getCategoriaInfo, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import Image from "next/image";
import { AdminServiciosActions } from "./AdminServiciosActions";

export const dynamic = "force-dynamic";

export default function AdminServiciosPage() {
  const servicios = getAllServicios(true);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-h2 font-display font-semibold text-gray-900">
          Servicios
        </h1>
        <Link
          href="/admin/servicios/nuevo"
          className="hidden md:inline-flex items-center justify-center bg-lila-500 hover:bg-lila-600 text-white px-5 py-3 rounded-xl font-semibold transition-colors min-h-[48px]"
        >
          + Nuevo servicio
        </Link>
      </div>

      {servicios.length > 0 ? (
        <div className="space-y-3">
          {servicios.map((servicio) => {
            const catInfo = getCategoriaInfo(servicio.categoria);
            return (
              <div
                key={servicio.id}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-lila-300 transition-colors"
              >
                <div className="w-16 h-16 flex-shrink-0 bg-lila-50 rounded-lg overflow-hidden relative">
                  <Image
                    src={servicio.imagenUrl || "/images/placeholder.svg"}
                    alt={servicio.nombre}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body font-semibold text-gray-900 truncate">
                    {servicio.nombre}
                  </p>
                  <p className="text-body-sm text-gray-500 truncate">
                    {catInfo.nombre} {catInfo.icono}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-body-sm font-semibold text-lila-700">
                      {formatCurrency(servicio.precio)}
                    </span>
                    <Badge
                      variant={servicio.activo ? "success" : "neutral"}
                      size="sm"
                    >
                      {servicio.activo ? "Activo" : "Archivado"}
                    </Badge>
                  </div>
                </div>
                <AdminServiciosActions
                  id={servicio.id}
                  activo={servicio.activo}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-body text-gray-500 mb-4">
            Aún no has creado ningún servicio
          </p>
          <Link
            href="/admin/servicios/nuevo"
            className="inline-flex items-center justify-center bg-lila-500 hover:bg-lila-600 text-white px-5 py-3 rounded-xl font-semibold transition-colors"
          >
            Crear el primero
          </Link>
        </div>
      )}

      <Link
        href="/admin/servicios/nuevo"
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-lila-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-lila-600 active:scale-95 transition-all z-30"
      >
        <span className="text-2xl">+</span>
      </Link>
    </div>
  );
}
