import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { UPLOAD_MAX_SIZE } from "@/lib/constants";
import sharp from "sharp";
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
        { error: `Archivo demasiado grande (máx 15MB). Tu foto pesa ${(file.size / 1024 / 1024).toFixed(1)}MB` },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Redimensionar y comprimir con sharp
    const optimized = await sharp(buffer)
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    const filename = `${uuidv4()}.jpg`;

    // Guardar donde Caddy pueda servirlo directamente
    const caddyDir = "/var/www/tienda-uploads/productos";
    if (!fs.existsSync(caddyDir)) fs.mkdirSync(caddyDir, { recursive: true });
    fs.writeFileSync(path.join(caddyDir, filename), optimized);

    // También guardar en public/ del proyecto por compatibilidad
    const devDir = path.join(process.cwd(), "public", "uploads", "productos");
    if (!fs.existsSync(devDir)) fs.mkdirSync(devDir, { recursive: true });
    fs.writeFileSync(path.join(devDir, filename), optimized);

    return NextResponse.json(
      { url: `/uploads/productos/${filename}` },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json(
      { error: `Error al procesar imagen: ${message}` },
      { status: 500 }
    );
  }
}
