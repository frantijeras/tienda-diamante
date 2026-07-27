import { NextRequest, NextResponse } from "next/server";
import { getAllServicios, createServicio } from "@/lib/services";
import { isAuthenticated } from "@/lib/auth";
import { CATEGORIAS_SERVICIOS } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria");
    const incluirInactivos = searchParams.get("incluirInactivos") === "true";

    let servicios;
    if (categoria) {
      servicios = getAllServicios(incluirInactivos).filter(
        (s) => s.categoria === categoria
      );
    } else {
      servicios = getAllServicios(incluirInactivos);
    }

    return NextResponse.json({ data: servicios, total: servicios.length });
  } catch {
    return NextResponse.json(
      { error: "Error al obtener servicios" },
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

    const validCats = CATEGORIAS_SERVICIOS.map((c) => c.id);
    if (!validCats.includes(categoria)) {
      return NextResponse.json(
        { error: "Categoría no válida" },
        { status: 400 }
      );
    }

    const servicio = createServicio({
      nombre,
      descripcion,
      precio: parseFloat(precio),
      categoria,
      imagenUrl,
    });

    return NextResponse.json({ data: servicio }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear servicio" },
      { status: 500 }
    );
  }
}
