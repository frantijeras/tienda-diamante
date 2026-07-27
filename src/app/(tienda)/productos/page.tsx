import { getAllProductos } from "@/lib/products";
import { CATEGORIAS_PRODUCTOS } from "@/lib/constants";
import { ProductCard } from "@/components/tienda/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Search } from "lucide-react";
import Link from "next/link";

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const params = await searchParams;
  const categoria = params.categoria;

  const productos = categoria
    ? getAllProductos().filter((p) => p.categoria === categoria)
    : getAllProductos();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <h1 className="text-h1 font-display font-semibold text-gray-900 mb-6">
        Productos
      </h1>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4 md:mx-0 md:px-0">
        <Link
          href="/productos"
          className={`px-4 py-2 rounded-full text-body-sm font-semibold whitespace-nowrap transition-colors ${
            !categoria
              ? "bg-lila-500 text-white border border-lila-500"
              : "bg-white text-lila-700 border border-lila-200 hover:border-lila-400"
          }`}
        >
          Todos
        </Link>
        {CATEGORIAS_PRODUCTOS.map((cat) => (
          <Link
            key={cat.id}
            href={`/productos?categoria=${cat.id}`}
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

      {/* Products grid */}
      {productos.length > 0 ? (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-stagger">
          {productos.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              nombre={p.nombre}
              descripcion={p.descripcion}
              precio={p.precio}
              imagenUrl={p.imagenUrl}
              stock={p.stock}
              basePath="/productos"
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Search className="size-10 text-lila-500" />}
          title={
            categoria
              ? `Pronto habrá productos en esta categoría`
              : "No hay productos aún"
          }
          description="¡Vuelve pronto! 🌸"
          action={
            <Link
              href="/productos"
              className="inline-flex items-center justify-center bg-lila-500 hover:bg-lila-600 text-white px-5 py-3 rounded-xl font-semibold transition-colors"
            >
              Ver todos
            </Link>
          }
        />
      )}
    </div>
  );
}
