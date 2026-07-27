import { NextRequest, NextResponse } from "next/server";
import { getAllEncargos, createEncargo } from "@/lib/orders";
import { isAuthenticated } from "@/lib/auth";
import { clearCart } from "@/lib/cart";
import { descontarStock } from "@/lib/products";

export async function GET(request: NextRequest) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const estado = searchParams.get("estado") || undefined;

    const encargos = getAllEncargos(estado);

    return NextResponse.json({ data: encargos, total: encargos.length });
  } catch {
    return NextResponse.json(
      { error: "Error al obtener encargos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clienteNombre, items } = body;

    if (!clienteNombre || !clienteNombre.trim()) {
      return NextResponse.json(
        { error: "El nombre es obligatorio" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío" },
        { status: 400 }
      );
    }

    // Verificar stock antes de crear el encargo
    const productosEnCarrito = items.filter((i: { itemType: string }) => i.itemType === "producto");
    for (const item of productosEnCarrito) {
      const { getProductoById } = await import("@/lib/products");
      const producto = getProductoById(item.itemId);
      if (!producto) {
        return NextResponse.json(
          { error: `Producto "${item.nombreItem}" no encontrado` },
          { status: 400 }
        );
      }
      if (producto.stock < item.cantidad) {
        return NextResponse.json(
          { error: `No hay suficiente stock de "${item.nombreItem}". Disponible: ${producto.stock}` },
          { status: 400 }
        );
      }
    }

    // Descontar stock de productos
    for (const item of productosEnCarrito) {
      descontarStock(item.itemId, item.cantidad);
    }

    const encargo = createEncargo({
      clienteNombre: clienteNombre.trim(),
      items,
    });

    // Clear the cart after successful order
    await clearCart();

    return NextResponse.json({ data: encargo }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear encargo" },
      { status: 500 }
    );
  }
}
