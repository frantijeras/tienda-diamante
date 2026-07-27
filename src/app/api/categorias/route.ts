import { NextResponse } from "next/server";
import { CATEGORIAS_PRODUCTOS, CATEGORIAS_SERVICIOS } from "@/lib/constants";

export async function GET() {
  return NextResponse.json({
    productos: CATEGORIAS_PRODUCTOS,
    servicios: CATEGORIAS_SERVICIOS,
  });
}
