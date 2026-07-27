import { getEncargosStats, getAllEncargos } from "@/lib/orders";
import { StatCard } from "@/components/admin/StatCard";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatTimeAgo } from "@/lib/utils";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const stats = getEncargosStats();
  const encargos = getAllEncargos().slice(0, 5);

  return (
    <div>
      <h1 className="text-h2 font-display font-semibold text-gray-900 mb-2">
        ¡Hola, Paula! 👋
      </h1>
      <p className="text-body text-gray-500 mb-8">
        Aquí tienes el resumen de hoy.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Pendientes"
          value={stats.pendiente}
          description="Encargos por gestionar"
          variant="pendiente"
        />
        <StatCard
          label="En proceso"
          value={stats.en_proceso}
          description="En curso"
          variant="en_proceso"
        />
        <StatCard
          label="Completados"
          value={stats.completado}
          description="Este mes"
          variant="completado"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-lila-100 shadow-sm p-5">
          <h2 className="text-h4 font-display font-semibold text-gray-900 mb-4">
            Encargos recientes
          </h2>
          {encargos.length > 0 ? (
            <div className="space-y-3">
              {encargos.map((encargo) => (
                <Link
                  key={encargo.id}
                  href={`/admin/encargos#${encargo.id}`}
                  className="block p-4 bg-gray-50 rounded-xl hover:bg-lila-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-body font-semibold text-gray-900 truncate">
                        {encargo.clienteNombre}
                      </p>
                      <p className="text-body-sm text-gray-500 mt-0.5">
                        {encargo.items.length}{" "}
                        {encargo.items.length === 1 ? "ítem" : "ítems"} ·{" "}
                        {formatTimeAgo(encargo.createdAt)}
                      </p>
                    </div>
                    <Badge
                      variant={
                        encargo.estado === "pendiente"
                          ? "pendiente"
                          : encargo.estado === "en_proceso"
                          ? "en_proceso"
                          : "completado"
                      }
                      size="sm"
                    >
                      {encargo.estado === "pendiente"
                        ? "Pendiente"
                        : encargo.estado === "en_proceso"
                        ? "En proceso"
                        : "Completado"}
                    </Badge>
                  </div>
                  <p className="text-h4 font-display font-semibold text-lila-700 mt-2">
                    {formatCurrency(encargo.total)}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-body-sm text-gray-500">
              No hay encargos aún. Cuando alguien reserve aparecerá aquí.
            </p>
          )}
          {encargos.length > 0 && (
            <Link
              href="/admin/encargos"
              className="block text-center text-body-sm text-lila-600 hover:text-lila-700 font-medium mt-4 pt-4 border-t border-lila-100"
            >
              Ver todos los encargos →
            </Link>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-lila-100 shadow-sm p-5">
          <h2 className="text-h4 font-display font-semibold text-gray-900 mb-4">
            Acciones rápidas
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/productos/nuevo"
              className="block p-4 bg-lila-50 rounded-xl hover:bg-lila-100 transition-colors text-body font-semibold text-lila-700"
            >
              ➕ Nuevo producto
            </Link>
            <Link
              href="/admin/servicios/nuevo"
              className="block p-4 bg-lila-50 rounded-xl hover:bg-lila-100 transition-colors text-body font-semibold text-lila-700"
            >
              ➕ Nuevo servicio
            </Link>
            <Link
              href="/admin/encargos"
              className="block p-4 bg-lila-50 rounded-xl hover:bg-lila-100 transition-colors text-body font-semibold text-lila-700"
            >
              📋 Ver todos los encargos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
