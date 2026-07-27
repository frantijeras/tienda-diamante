import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string | null;
  basePath: string;
  stock?: number;
}

export function ProductCard({
  id,
  nombre,
  descripcion,
  precio,
  imagenUrl,
  basePath,
  stock,
}: ProductCardProps) {
  return (
    <Link
      href={`${basePath}/${id}`}
      className="group bg-white rounded-2xl shadow-sm border border-lila-100 overflow-hidden hover:shadow-md hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
    >
      <div className="aspect-square bg-lila-50 relative overflow-hidden">
        <Image
          src={imagenUrl || "/images/placeholder.svg"}
          alt={nombre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-h4 font-display font-medium text-gray-900 line-clamp-1">
          {nombre}
        </h3>
        <p className="text-body-sm text-gray-500 line-clamp-2 mt-1 min-h-[2.5rem]">
          {descripcion}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-h3 font-display font-semibold text-lila-700">
            {formatCurrency(precio)}
          </span>
          <div className="flex flex-col items-end gap-1">
            {stock !== undefined && stock <= 5 && (
              <span className={`text-body-xs font-semibold ${stock === 0 ? "text-danger-500" : "text-warning-500"}`}>
                {stock === 0 ? "❌ Agotado" : `⚠️ Quedan ${stock}`}
              </span>
            )}
            <span className="inline-flex items-center justify-center w-10 h-10 bg-lila-500 text-white rounded-full group-hover:bg-lila-600 transition-colors">
              <Plus className="size-5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
