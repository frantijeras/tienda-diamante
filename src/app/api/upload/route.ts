import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { UPLOAD_MAX_SIZE, UPLOAD_ALLOWED_TYPES } from "@/lib/constants";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No se ha proporcionado ningún archivo" },
        { status: 400 }
      );
    }

    if (file.size > UPLOAD_MAX_SIZE) {
      return NextResponse.json(
        { error: "Archivo demasiado grande (máx 5MB)" },
        { status: 413 }
      );
    }

    if (!UPLOAD_ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Formato no soportado. Usar jpg, png o webp" },
        { status: 415 }
      );
    }

    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${uuidv4()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "productos");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(uploadDir, filename), buffer);

    return NextResponse.json(
      { url: `/uploads/productos/${filename}` },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al subir archivo" },
      { status: 500 }
    );
  }
}
