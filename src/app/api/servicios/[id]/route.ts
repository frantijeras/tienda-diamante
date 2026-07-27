import { NextRequest, NextResponse } from "next/server";
import { getServicioById, updateServicio, archiveServicio, unarchiveServicio } from "@/lib/services";
import { isAuthenticated } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const servicio = getServicioById(id);
    if (!servicio) {
      return NextResponse.json(
        { error: "Servicio no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: servicio });
  } catch {
    return NextResponse.json(
      { error: "Error al obtener servicio" },
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
    const servicio = updateServicio(id, body);

    if (!servicio) {
      return NextResponse.json(
        { error: "Servicio no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: servicio });
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar servicio" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const servicio = getServicioById(id);

    if (!servicio) {
      return NextResponse.json(
        { error: "Servicio no encontrado" },
        { status: 404 }
      );
    }

    if (servicio.activo) {
      archiveServicio(id);
    } else {
      unarchiveServicio(id);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al archivar servicio" },
      { status: 500 }
    );
  }
}
