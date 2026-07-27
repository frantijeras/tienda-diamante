import { getAllEncargos } from "@/lib/orders";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatTimeAgo } from "@/lib/utils";
import Link from "next/link";
import { EncargosActions } from "./EncargosActions";

export const dynamic = "force-dynamic";

export default async function AdminEncargosPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const params = await searchParams;
  const estado = params.estado;
  const encargos = getAllEncargos(estado);

  return (
    <div>
      <h1 className="text-h2 font-display font-semibold text-gray-900 mb-6">
        Encargos
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4 md:mx-0 md:px-0">
        <Link
          href="/admin/encargos"
          className={`px-4 py-2 rounded-full text-body-sm font-semibold whitespace-nowrap transition-colors ${
            !estado
              ? "bg-lila-500 text-white border border-lila-500"
              : "bg-white text-lila-700 border border-lila-200 hover:border-lila-400"
          }`}
        >
          Todos
        </Link>
        <Link
          href="/admin/encargos?estado=pendiente"
          className={`px-4 py-2 rounded-full text-body-sm font-semibold whitespace-nowrap transition-colors ${
            estado === "pendiente"
              ? "bg-lila-500 text-white border border-lila-500"
              : "bg-white text-lila-700 border border-lila-200 hover:border-lila-400"
          }`}
        >
          Pendientes
        </Link>
        <Link
          href="/admin/encargos?estado=en_proceso"
          className={`px-4 py-2 rounded-full text-body-sm font-semibold whitespace-nowrap transition-colors ${
            estado === "en_proceso"
              ? "bg-lila-500 text-white border border-lila-500"
              : "bg-white text-lila-700 border border-lila-200 hover:border-lila-400"
          }`}
        >
          En proceso
        </Link>
        <Link
          href="/admin/encargos?estado=completado"
          className={`px-4 py-2 rounded-full text-body-sm font-semibold whitespace-nowrap transition-colors ${
            estado === "completado"
              ? "bg-lila-500 text-white border border-lila-500"
              : "bg-white text-lila-700 border border-lila-200 hover:border-lila-400"
          }`}
        >
          Completados
        </Link>
      </div>

      {encargos.length > 0 ? (
        <div className="space-y-3">
          {encargos.map((encargo) => (
            <div
              key={encargo.id}
              id={encargo.id}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-lila-300 transition-colors scroll-mt-24"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="text-body font-semibold text-gray-900">
                    {encargo.clienteNombre}
                  </p>
                  <p className="text-body-sm text-gray-500">
                    #{encargo.id.slice(-4).toUpperCase()} ·{" "}
                    {formatTimeAgo(encargo.createdAt)}
                  </p>
                </div>
                <Badge
                  variant={
                    encargo.cancelado
                      ? "cancelado"
                      : encargo.estado === "pendiente"
                      ? "pendiente"
                      : encargo.estado === "en_proceso"
                      ? "en_proceso"
                      : "completado"
                  }
                >
                  {encargo.cancelado
                    ? "Cancelado"
                    : encargo.estado === "pendiente"
                    ? "Pendiente"
                    : encargo.estado === "en_proceso"
                    ? "En proceso"
                    : "Completado"}
                </Badge>
              </div>

              <p className="text-body-sm text-gray-500 mb-2">
                {encargo.items.length}{" "}
                {encargo.items.length === 1 ? "ítem" : "ítems"}
              </p>
              <p className="text-h4 font-display font-semibold text-lila-700 mb-3">
                {formatCurrency(encargo.total)}
              </p>

              <div className="flex items-center gap-2">
                <EncargosActions
                  id={encargo.id}
                  estado={encargo.estado}
                  cancelado={encargo.cancelado}
                />
                <Link
                  href={`/admin/encargos/${encargo.id}`}
                  className="text-body-sm text-lila-600 hover:text-lila-700 font-medium"
                >
                  Ver detalle →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-body text-gray-500">
            No hay encargos{estado ? ` con estado "${estado}"` : ""} aún.
          </p>
        </div>
      )}
    </div>
  );
}
