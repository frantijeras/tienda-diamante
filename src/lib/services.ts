import { db, schema } from "./db";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import type { CategoriaServicio } from "./constants";

export interface CreateServicioInput {
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria: CategoriaServicio;
  imagenUrl?: string;
}

export interface UpdateServicioInput {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  categoria?: CategoriaServicio;
  imagenUrl?: string;
  activo?: boolean;
}

export function getAllServicios(incluirInactivos = false) {
  if (incluirInactivos) {
    return db.select().from(schema.servicios).all();
  }
  return db
    .select()
    .from(schema.servicios)
    .where(eq(schema.servicios.activo, true))
    .all();
}

export function getServiciosByCategoria(categoria: string) {
  return db
    .select()
    .from(schema.servicios)
    .where(
      and(eq(schema.servicios.categoria, categoria), eq(schema.servicios.activo, true))
    )
    .all();
}

export function getServicioById(id: string) {
  return db
    .select()
    .from(schema.servicios)
    .where(eq(schema.servicios.id, id))
    .get();
}

export function createServicio(input: CreateServicioInput) {
  const now = new Date().toISOString();
  const id = uuidv4();
  db.insert(schema.servicios)
    .values({
      id,
      nombre: input.nombre,
      descripcion: input.descripcion || "",
      precio: input.precio,
      categoria: input.categoria,
      imagenUrl: input.imagenUrl || null,
      activo: true,
      createdAt: now,
      updatedAt: now,
    })
    .run();
  return getServicioById(id);
}

export function updateServicio(id: string, input: UpdateServicioInput) {
  const now = new Date().toISOString();
  const updates: Record<string, unknown> = { updatedAt: now };
  if (input.nombre !== undefined) updates.nombre = input.nombre;
  if (input.descripcion !== undefined) updates.descripcion = input.descripcion;
  if (input.precio !== undefined) updates.precio = input.precio;
  if (input.categoria !== undefined) updates.categoria = input.categoria;
  if (input.imagenUrl !== undefined) updates.imagenUrl = input.imagenUrl;
  if (input.activo !== undefined) updates.activo = input.activo;

  db.update(schema.servicios)
    .set(updates)
    .where(eq(schema.servicios.id, id))
    .run();
  return getServicioById(id);
}

export function archiveServicio(id: string) {
  return updateServicio(id, { activo: false });
}

export function unarchiveServicio(id: string) {
  return updateServicio(id, { activo: true });
}
