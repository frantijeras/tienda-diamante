"use client";

import { useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { CartItemComponent } from "@/components/tienda/CartItem";
import { ConfirmOrderModal } from "@/components/tienda/ConfirmOrderModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency } from "@/lib/utils";
import type { Cart } from "@/lib/cart";
import Link from "next/link";

interface CartClientProps {
  initialCart: Cart;
}

export function CartClient({ initialCart }: CartClientProps) {
  const [cart, setCart] = useState<Cart>(initialCart);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const numProductos = cart.items.filter((i) => i.itemType === "producto").length;
  const numServicios = cart.items.filter((i) => i.itemType === "servicio").length;

  const refreshCart = async () => {
    const res = await fetch("/api/cart");
    if (res.ok) {
      setCart(await res.json());
    }
  };

  const handleUpdateQuantity = async (itemId: string, cantidad: number) => {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update", itemId, cantidad }),
    });
    refreshCart();
  };

  const handleRemove = async (itemId: string) => {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "remove", itemId }),
    });
    refreshCart();
  };

  const handleClear = async () => {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "clear" }),
    });
    setShowClearModal(false);
    refreshCart();
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <EmptyState
          icon={<ShoppingCart className="size-10 text-lila-500" />}
          title="Tu carrito está vacío"
          description="Añade productos o servicios para hacer un encargo a Paula."
          action={
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-lila-500 hover:bg-lila-600 text-white px-5 py-3 rounded-xl font-semibold transition-colors"
            >
              Explorar la tienda
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-h1 font-display font-semibold text-gray-900">
          Tu carrito
        </h1>
        <button
          onClick={() => setShowClearModal(true)}
          className="flex items-center gap-1.5 text-body-sm text-gray-500 hover:text-danger-500 transition-colors"
        >
          <Trash2 className="size-4" />
          Vaciar
        </button>
      </div>

      <p className="text-body-sm text-gray-500 mb-6">
        {numProductos > 0 && `${numProductos} producto${numProductos > 1 ? "s" : ""}`}
        {numProductos > 0 && numServicios > 0 && ", "}
        {numServicios > 0 && `${numServicios} servicio${numServicios > 1 ? "s" : ""}`}
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <CartItemComponent
              key={item.itemId}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <div>
          <div className="sticky top-24 bg-white rounded-2xl border border-lila-100 shadow-sm p-6">
            <h2 className="text-h3 font-display font-semibold text-gray-900 mb-4">
              Resumen
            </h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-body">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatCurrency(cart.total)}</span>
              </div>
              <div className="border-t border-lila-100 my-2" />
              <div className="flex justify-between text-h4 font-display font-semibold text-lila-700">
                <span>Total</span>
                <span>{formatCurrency(cart.total)}</span>
              </div>
            </div>
            <Button
              variant="primary"
              size="xl"
              fullWidth
              onClick={() => setShowConfirm(true)}
            >
              Confirmar encargo →
            </Button>
          </div>
        </div>
      </div>

      <ConfirmOrderModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        cart={cart}
      />

      <Modal
        open={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="¿Vaciar el carrito?"
      >
        <p className="text-body text-gray-600 mb-6">
          Se eliminarán todos los productos y servicios que has añadido. Esta
          acción no se puede deshacer.
        </p>
        <div className="flex flex-col-reverse md:flex-row gap-3">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setShowClearModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="danger" fullWidth onClick={handleClear}>
            Sí, vaciar carrito
          </Button>
        </div>
      </Modal>
    </div>
  );
}
