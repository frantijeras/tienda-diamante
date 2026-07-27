import { NextRequest, NextResponse } from "next/server";
import { removeCartItem } from "@/lib/cart";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { index } = body;
    const cart = await removeCartItem(index);
    return NextResponse.json(cart);
  } catch {
    return NextResponse.json(
      { error: "Error al eliminar del carrito" },
      { status: 400 }
    );
  }
}
