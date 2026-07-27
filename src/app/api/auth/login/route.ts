import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Contraseña requerida" },
        { status: 400 }
      );
    }

    let hash = process.env.ADMIN_PASSWORD_HASH || "";
    if (!hash) {
      const configFile = path.join(process.cwd(), "config.production.json");
      if (fs.existsSync(configFile)) {
        const cfg = JSON.parse(fs.readFileSync(configFile, "utf-8"));
        hash = cfg.ADMIN_PASSWORD_HASH || "";
      }
    }

    const valid = await bcrypt.compare(password, hash);

    if (!valid) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    await createSession();

    return NextResponse.json({ success: true, redirectTo: "/admin" });
  } catch {
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
