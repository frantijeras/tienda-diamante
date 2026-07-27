import { NextRequest, NextResponse } from "next/server";
import { getCart, addToCart } from "@/lib/cart";

export async function GET() {
  const cart = await getCart();
  return NextResponse.json(cart);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
  } catch {
    return NextResponse.json(
      { error: "Error al añadir al carrito" },
      { status: 500 }
    );
  }
}
