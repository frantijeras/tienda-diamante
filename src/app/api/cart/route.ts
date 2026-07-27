import { NextRequest, NextResponse } from "next/server";
import { getCart, addToCart, updateCartItemQuantity, removeFromCart, clearCart } from "@/lib/cart";

export async function GET() {
  const cart = await getCart();
  return NextResponse.json(cart);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // Añadir item al carrito
    if (!action || action === "add") {
      const { itemType, itemId, nombreItem, precioUnitario, cantidad, peticionEspecial, fechaReserva } = body;

      if (!itemId || !nombreItem || precioUnitario === undefined) {
        return NextResponse.json(
          { error: "Datos del item incompletos" },
          { status: 400 }
        );
      }

      const cart = await addToCart({
        itemType: itemType || "producto",
        itemId,
        nombreItem,
        precioUnitario,
        cantidad: Math.max(1, cantidad || 1),
        peticionEspecial,
        fechaReserva,
      });

      return NextResponse.json({ success: true, cart });
    }

    if (action === "update") {
      const { itemId, cantidad } = body;
      if (!itemId || cantidad === undefined) {
        return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
      }
      const cart = await updateCartItemQuantity(itemId, cantidad);
      return NextResponse.json(cart);
    }

    if (action === "remove") {
      const { itemId } = body;
      if (!itemId) {
        return NextResponse.json({ error: "Falta itemId" }, { status: 400 });
      }
      const cart = await removeFromCart(itemId);
      return NextResponse.json(cart);
    }

    if (action === "clear") {
      await clearCart();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: "Error en el carrito" },
      { status: 500 }
    );
  }
}
