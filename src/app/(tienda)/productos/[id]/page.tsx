import { getProductoById } from "@/lib/products";
import { getCategoriaInfo } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "./AddToCartButton";

export default async function ProductoDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const producto = getProductoById(id);

  if (!producto || !producto.activo) {
    notFound();
  }

  const catInfo = getCategoriaInfo(producto.categoria);

  const stockDisplay = () => {
    const stock = producto.stock ?? 0;
    if (stock > 5) return <span className="text-body text-success-600">✅ En stock</span>;
    if (stock > 0) return <span className="text-body text-warning-600">⚠️ Quedan pocos ({stock})</span>;
    return <span className="text-body text-danger-600">❌ Agotado</span>;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
      {/* Back + breadcrumb */}
      <div className="mb-6">
        <Link
          href="/productos"
          className="inline-flex items-center gap-1 text-body-sm text-lila-600 hover:text-lila-700 transition-colors mb-2"
        >
          ← Volver a productos
        </Link>
        <p className="text-caption text-gray-500">
          {catInfo.nombre} {catInfo.icono}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="aspect-[4/3] bg-lila-50 rounded-xl overflow-hidden relative">
          <Image
            src={producto.imagenUrl || "/images/placeholder.svg"}
            alt={producto.nombre}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Details */}
        <div>
          <p className="text-caption text-gray-500 uppercase tracking-wide font-semibold mb-1">
            {catInfo.nombre} {catInfo.icono}
          </p>
          <h1 className="text-h1 font-display font-semibold text-gray-900 mb-3">
            {producto.nombre}
          </h1>
          <p className="text-body-lg text-gray-600 mb-4">
            {producto.descripcion}
          </p>
          <div className="mb-2">{stockDisplay()}</div>
          <p className="text-h3 font-display font-semibold text-lila-700 mb-8">
            {formatCurrency(producto.precio)}
          </p>

          <AddToCartButton
            itemId={producto.id}
            nombreItem={producto.nombre}
            precioUnitario={producto.precio}
            itemType="producto"
            stock={producto.stock ?? 0}
          />
        </div>
      </div>
    </div>
  );
}
