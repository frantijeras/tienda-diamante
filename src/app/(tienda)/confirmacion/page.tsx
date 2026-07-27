import { getEncargoById } from "@/lib/orders";
import { formatCurrency, formatDate, getOrderNumber } from "@/lib/utils";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const id = params.id;

  if (!id) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">⚠️</span>
        </div>
        <h1 className="text-h2 font-display font-semibold text-gray-900 mb-2">
          Encargo no encontrado
        </h1>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-lila-500 hover:bg-lila-600 text-white px-5 py-3 rounded-xl font-semibold transition-colors mt-4"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const encargo = getEncargoById(id);

  if (!encargo) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">⚠️</span>
        </div>
        <h1 className="text-h2 font-display font-semibold text-gray-900 mb-2">
          Encargo no encontrado
        </h1>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-lila-500 hover:bg-lila-600 text-white px-5 py-3 rounded-xl font-semibold transition-colors mt-4"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-success-50 via-white to-lila-50 min-h-[60vh]">
      <div className="max-w-md mx-auto px-4 py-12 md:py-16 text-center">
        <div className="mb-6">
          <span className="text-6xl">🎉</span>
        </div>

        <h1 className="text-h1 font-display font-semibold text-gray-900 mb-2">
          ¡Gracias, {encargo.clienteNombre}!
        </h1>
        <p className="text-body-lg text-gray-600 mb-6">
          Tu encargo está en camino
        </p>

        <div className="bg-white rounded-2xl border border-lila-100 shadow-sm p-6 mb-8">
          <p className="text-caption text-gray-500 uppercase tracking-wide font-semibold mb-1">
            Número de encargo
          </p>
          <p className="text-display font-display font-semibold text-lila-700">
            {getOrderNumber(encargo.id)}
          </p>
          <p className="text-body-sm text-gray-500 mt-2">
            📌 Guarda este número
          </p>
        </div>

        <div className="text-left bg-white rounded-2xl border border-lila-100 shadow-sm p-6 mb-8">
          <h2 className="text-h4 font-display font-semibold text-gray-900 mb-4">
            Resumen del encargo
          </h2>
          <div className="space-y-3">
            {encargo.items.map((item) => (
              <div key={item.id} className="flex justify-between text-body">
                <div>
                  <span className="text-gray-900">{item.nombreItem}</span>
                  <span className="text-gray-500"> × {item.cantidad}</span>
                  {item.fechaReserva && (
                    <p className="text-body-sm text-lila-600">
                      📅 {formatDate(item.fechaReserva)}
                    </p>
                  )}
                  {item.peticionEspecial && (
                    <p className="text-body-sm text-lila-600">
                      💌 &ldquo;{item.peticionEspecial}&rdquo;
                    </p>
                  )}
                </div>
                <span className="font-semibold text-lila-700">
                  {formatCurrency(item.precioUnitario * item.cantidad)}
                </span>
              </div>
            ))}
            <div className="border-t border-lila-100 pt-3">
              <div className="flex justify-between text-h4 font-display font-semibold text-lila-700">
                <span>Total</span>
                <span>{formatCurrency(encargo.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-body text-gray-600 mb-2">
          Paula te confirmará pronto.
        </p>
        <p className="text-body text-gray-600 mb-8">
          ¡Muchas gracias! 💜
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-white text-lila-700 border-2 border-lila-200 hover:border-lila-400 hover:bg-lila-50 px-6 py-3.5 rounded-xl font-semibold transition-colors"
        >
          <ShoppingBag className="size-5" />
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}
