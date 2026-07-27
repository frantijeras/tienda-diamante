import { NextRequest, NextResponse } from "next/server";
import { getEncargoById, updateEncargoEstado, updateEncargoNotas } from "@/lib/orders";
import { isAuthenticated } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const encargo = getEncargoById(id);

    if (!encargo) {
      return NextResponse.json(
        { error: "Encargo no encontrado" },
        { status: 404 }
      );
    }

    // Public access for confirmation page, but limited data
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({
        data: {
          id: encargo.id,
          clienteNombre: encargo.clienteNombre,
          total: encargo.total,
          estado: encargo.estado,
          items: encargo.items,
        },
      });
    }

    return NextResponse.json({ data: encargo });
  } catch {
    return NextResponse.json(
      { error: "Error al obtener encargo" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    if (body.estado) {
      updateEncargoEstado(id, body.estado);
    }
    if (body.notas !== undefined) {
      updateEncargoNotas(id, body.notas);
    }

    const encargo = getEncargoById(id);
    return NextResponse.json({ data: encargo });
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar encargo" },
      { status: 500 }
    );
  }
}
