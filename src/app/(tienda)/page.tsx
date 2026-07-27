import { CategoryGrid } from "@/components/tienda/CategoryGrid";
import { ProductCard } from "@/components/tienda/ProductCard";
import { ServiceCard } from "@/components/tienda/ServiceCard";
import { CATEGORIAS_PRODUCTOS, CATEGORIAS_SERVICIOS } from "@/lib/constants";
import { getAllProductos } from "@/lib/products";
import { getAllServicios } from "@/lib/services";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const productos = getAllProductos().slice(0, 8);
  const servicios = getAllServicios().slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-lila-100 via-white to-lila-50 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-4 relative">
            <Image
              src="/images/logo.png"
              alt="La Tienda Diamante de Paula"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 112px, 144px"
              priority
            />
          </div>
          <h1 className="text-display font-display font-semibold text-gray-900 mb-3">
            Bienvenido a la tienda
          </h1>
          <p className="text-body-lg text-gray-600 max-w-md mx-auto">
            Pequeños tesoros hechos a mano por Paula
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/productos"
              className="inline-flex items-center justify-center gap-2 bg-lila-500 hover:bg-lila-600 text-white px-6 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all min-h-[48px]"
            >
              Ver productos →
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Categorías de productos */}
        <section className="py-8 md:py-12">
          <CategoryGrid
            title="Explora por categoría"
            categories={[...CATEGORIAS_PRODUCTOS]}
            basePath="/productos"
          />
        </section>

        {/* Servicios */}
        <section className="py-8 md:py-12">
          <h2 className="text-h2 font-display font-semibold text-gray-900 mb-4">
            Servicios
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-stagger">
            {CATEGORIAS_SERVICIOS.map((cat) => (
              <Link
                key={cat.id}
                href={`/servicios?categoria=${cat.id}`}
                className="flex flex-col items-center justify-center aspect-square bg-white border-2 border-lila-100 rounded-2xl p-4 hover:border-lila-300 hover:bg-lila-50 hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-sm transition-all duration-200 group"
              >
                {cat.imagenUrl ? (
                  <div className="w-20 h-20 md:w-24 md:h-24 mb-2 relative group-hover:scale-110 transition-transform">
                    <Image
                      src={cat.imagenUrl}
                      alt={cat.nombre}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 80px, 96px"
                    />
                  </div>
                ) : (
                  <span className="text-5xl md:text-6xl mb-2 group-hover:scale-110 transition-transform">
                    {cat.icono}
                  </span>
                )}
                <span className="text-body font-semibold text-lila-700 text-center">
                  {cat.nombre}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Productos destacados */}
        {productos.length > 0 && (
          <section className="py-8 md:py-12">
            <h2 className="text-h2 font-display font-semibold text-gray-900 mb-4">
              Productos destacados ✨
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-stagger">
              {productos.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  nombre={p.nombre}
                  descripcion={p.descripcion}
                  precio={p.precio}
                  imagenUrl={p.imagenUrl}
                  basePath="/productos"
                />
              ))}
            </div>
          </section>
        )}

        {/* Servicios disponibles */}
        {servicios.length > 0 && (
          <section className="py-8 md:py-12">
            <h2 className="text-h2 font-display font-semibold text-gray-900 mb-4">
              Servicios disponibles 💆
            </h2>
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
          </section>
        )}
      </div>
    </div>
  );
}
