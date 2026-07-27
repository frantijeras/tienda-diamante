"use client";

import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/lib/cart";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, cantidad: number) => void;
  onRemove: (itemId: string) => void;
}

export function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-lila-100 shadow-sm">
      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-lila-50 rounded-xl overflow-hidden relative">
        <Image
          src="/images/placeholder.svg"
          alt={item.nombreItem}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-h4 font-display font-medium text-gray-900 line-clamp-1">
            {item.nombreItem}
          </h3>
          <button
            onClick={() => onRemove(item.itemId)}
            className="p-1 text-gray-400 hover:text-danger-500 transition-colors flex-shrink-0"
            aria-label="Eliminar"
          >
            ❌
          </button>
        </div>

        <p className="text-body-sm text-gray-500 mt-0.5">
          {formatCurrency(item.precioUnitario)} / unidad
        </p>

        {item.peticionEspecial && (
          <div className="mt-2 p-2 bg-lila-50 rounded-md">
            <p className="text-caption text-lila-700 font-medium">
              💌 Petición:
            </p>
            <p className="text-body-sm text-lila-900 line-clamp-2">
              &ldquo;{item.peticionEspecial}&rdquo;
            </p>
          </div>
        )}

        {item.fechaReserva && (
          <div className="mt-2 inline-flex items-center gap-1.5 text-body-sm text-lila-700">
            📅 {formatDate(item.fechaReserva)}
          </div>
        )}

        {item.itemType === "producto" && (
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 bg-lila-50 rounded-full p-1">
              <button
                onClick={() => onUpdateQuantity(item.itemId, item.cantidad - 1)}
                disabled={item.cantidad <= 1}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-lila-700 disabled:opacity-40 shadow-sm transition-colors"
                aria-label="Disminuir cantidad"
              >
                ➖
              </button>
              <span className="w-8 text-center font-semibold text-gray-900">
                {item.cantidad}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.itemId, item.cantidad + 1)}
                disabled={item.cantidad >= 99}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-lila-700 disabled:opacity-40 shadow-sm transition-colors"
                aria-label="Aumentar cantidad"
              >
                ➕
              </button>
            </div>
            <span className="text-h4 font-display font-semibold text-lila-700">
              {formatCurrency(item.precioUnitario * item.cantidad)}
            </span>
          </div>
        )}

        {item.itemType === "servicio" && (
          <div className="flex items-center justify-end mt-3">
            <span className="text-h4 font-display font-semibold text-lila-700">
              {formatCurrency(item.precioUnitario * item.cantidad)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
