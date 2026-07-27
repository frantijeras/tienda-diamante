import { NextRequest, NextResponse } from "next/server";
import { getAllProductos, createProducto } from "@/lib/products";
import { isAuthenticated } from "@/lib/auth";
import { CATEGORIAS_PRODUCTOS } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria");
    const incluirInactivos = searchParams.get("incluirInactivos") === "true";

    let productos;
    if (categoria) {
      productos = getAllProductos(incluirInactivos).filter(
        (p) => p.categoria === categoria
      );
    } else {
      productos = getAllProductos(incluirInactivos);
    }

    return NextResponse.json({ data: productos, total: productos.length });
  } catch {
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { nombre, descripcion, precio, categoria, imagenUrl } = body;

    if (!nombre || !precio || !categoria) {
      return NextResponse.json(
        { error: "Nombre, precio y categoría son requeridos" },
        { status: 400 }
      );
    }

    const validCats = CATEGORIAS_PRODUCTOS.map((c) => c.id);
    if (!validCats.includes(categoria)) {
      return NextResponse.json(
        { error: "Categoría no válida" },
        { status: 400 }
      );
    }

    const producto = createProducto({
      nombre,
      descripcion,
      precio: parseFloat(precio),
      categoria,
      imagenUrl,
    });

    return NextResponse.json({ data: producto }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 }
    );
  }
}
