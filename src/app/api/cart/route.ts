import { NextRequest, NextResponse } from "next/server";
import { getCart, addToCart } from "@/lib/cart";

export async function GET() {
  const cart = await getCart();
  return NextResponse.json(cart);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const item = {
      itemType: body.itemType as "producto" | "servicio",
      itemId: body.itemId,
      nombreItem: body.nombreItem,
      precioUnitario: body.precioUnitario,
      cantidad: body.cantidad || 1,
      peticionEspecial: body.peticionEspecial || undefined,
      fechaReserva: body.fechaReserva || undefined,
    };

    const cart = await addToCart(item);
    return NextResponse.json({ success: true, cart });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al añadir al carrito";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
