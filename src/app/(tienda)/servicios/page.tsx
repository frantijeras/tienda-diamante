import { getAllServicios } from "@/lib/services";
import { CATEGORIAS_SERVICIOS } from "@/lib/constants";
import { ServiceCard } from "@/components/tienda/ServiceCard";
import { EmptyState } from "@/components/ui/EmptyState";
import Link from "next/link";

export default async function ServiciosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const params = await searchParams;
  const categoria = params.categoria;

  const servicios = categoria
    ? getAllServicios().filter((s) => s.categoria === categoria)
    : getAllServicios();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <h1 className="text-h1 font-display font-semibold text-gray-900 mb-6">
        Servicios
      </h1>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4 md:mx-0 md:px-0">
        <Link
          href="/servicios"
          className={`px-4 py-2 rounded-full text-body-sm font-semibold whitespace-nowrap transition-colors ${
            !categoria
              ? "bg-lila-500 text-white border border-lila-500"
              : "bg-white text-lila-700 border border-lila-200 hover:border-lila-400"
          }`}
        >
          Todos
        </Link>
        {CATEGORIAS_SERVICIOS.map((cat) => (
          <Link
            key={cat.id}
            href={`/servicios?categoria=${cat.id}`}
            className={`px-4 py-2 rounded-full text-body-sm font-semibold whitespace-nowrap transition-colors ${
              categoria === cat.id
                ? "bg-lila-500 text-white border border-lila-500"
                : "bg-white text-lila-700 border border-lila-200 hover:border-lila-400"
            }`}
          >
            {cat.icono} {cat.nombre}
          </Link>
        ))}
      </div>

      {/* Services grid */}
      {servicios.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-stagger">
          {servicios.map((s) => (
            <ServiceCard
              key={s.id}
              id={s.id}
              nombre={s.nombre}
              descripcion={s.descripcion}
              precio={s.precio}
              imagenUrl={s.imagenUrl}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<span className="text-4xl">🔍</span>}
          title="Pronto habrá servicios disponibles"
          description="¡Vuelve pronto! 🌸"
        />
      )}
    </div>
  );
}
