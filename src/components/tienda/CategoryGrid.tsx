import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  nombre: string;
  icono: string;
  imagenUrl?: string;
}

interface CategoryGridProps {
  title: string;
  categories: Category[];
  basePath: string;
}

export function CategoryGrid({ title, categories, basePath }: CategoryGridProps) {
  return (
    <section>
      <h2 className="text-h2 font-display font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-stagger">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`${basePath}?categoria=${cat.id}`}
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
  );
}
