import { db, schema } from "./db";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import type { CategoriaProducto } from "./constants";

export interface CreateProductoInput {
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria: CategoriaProducto;
  imagenUrl?: string;
  stock?: number;
}

export interface UpdateProductoInput {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  categoria?: CategoriaProducto;
  imagenUrl?: string;
  activo?: boolean;
  stock?: number;
}

export function getAllProductos(incluirInactivos = false) {
  if (incluirInactivos) {
    return db.select().from(schema.productos).all();
  }
  return db
    .select()
    .from(schema.productos)
    .where(eq(schema.productos.activo, true))
    .all();
}

export function getProductosByCategoria(categoria: string) {
  return db
    .select()
    .from(schema.productos)
    .where(
      and(eq(schema.productos.categoria, categoria), eq(schema.productos.activo, true))
    )
    .all();
}

export function getProductoById(id: string) {
  return db
    .select()
    .from(schema.productos)
    .where(eq(schema.productos.id, id))
    .get();
}

export function createProducto(input: CreateProductoInput) {
  const now = new Date().toISOString();
  const id = uuidv4();
  db.insert(schema.productos)
    .values({
      id,
      nombre: input.nombre,
      descripcion: input.descripcion || "",
      precio: input.precio,
      categoria: input.categoria,
      imagenUrl: input.imagenUrl || null,
      activo: true,
      stock: input.stock ?? 0,
      createdAt: now,
      updatedAt: now,
    })
    .run();
  return getProductoById(id);
}

export function updateProducto(id: string, input: UpdateProductoInput) {
  const now = new Date().toISOString();
  const updates: Record<string, unknown> = { updatedAt: now };
  if (input.nombre !== undefined) updates.nombre = input.nombre;
  if (input.descripcion !== undefined) updates.descripcion = input.descripcion;
  if (input.precio !== undefined) updates.precio = input.precio;
  if (input.categoria !== undefined) updates.categoria = input.categoria;
  if (input.imagenUrl !== undefined) updates.imagenUrl = input.imagenUrl;
  if (input.activo !== undefined) updates.activo = input.activo;
  if (input.stock !== undefined) updates.stock = input.stock;

  db.update(schema.productos)
    .set(updates)
    .where(eq(schema.productos.id, id))
    .run();
  return getProductoById(id);
}

export function archiveProducto(id: string) {
  return updateProducto(id, { activo: false });
}

export function unarchiveProducto(id: string) {
  return updateProducto(id, { activo: true });
}

export function deleteProducto(id: string) {
  db.delete(schema.productos).where(eq(schema.productos.id, id)).run();
}

export function descontarStock(productoId: string, cantidad: number): boolean {
  const producto = getProductoById(productoId);
  if (!producto) return false;
  if (producto.stock < cantidad) return false;

  db.update(schema.productos)
    .set({ stock: producto.stock - cantidad, updatedAt: new Date().toISOString() })
    .where(eq(schema.productos.id, productoId))
    .run();
  return true;
}

export function devolverStock(productoId: string, cantidad: number): void {
  const producto = getProductoById(productoId);
  if (!producto) return;

  db.update(schema.productos)
    .set({ stock: producto.stock + cantidad, updatedAt: new Date().toISOString() })
    .where(eq(schema.productos.id, productoId))
    .run();
}
