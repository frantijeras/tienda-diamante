import { db, schema } from "./db";
import { eq, desc, asc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { descontarStock, devolverStock } from "./products";

export interface CreateEncargoInput {
  clienteNombre: string;
  items: {
    itemType: "producto" | "servicio";
    itemId: string;
    nombreItem: string;
    precioUnitario: number;
    cantidad: number;
    peticionEspecial?: string;
    fechaReserva?: string;
  }[];
}

export function getAllEncargos(estado?: string) {
  let query = db.select().from(schema.encargos);
  if (estado) {
    query = query.where(eq(schema.encargos.estado, estado)) as typeof query;
  }
  const encargos = query.orderBy(asc(schema.encargos.estado), desc(schema.encargos.createdAt)).all();

  return encargos.map((encargo) => ({
    ...encargo,
    items: db
      .select()
      .from(schema.encargosItems)
      .where(eq(schema.encargosItems.encargoId, encargo.id))
      .all(),
  }));
}

export function getEncargoById(id: string) {
  const encargo = db
    .select()
    .from(schema.encargos)
    .where(eq(schema.encargos.id, id))
    .get();
  if (!encargo) return null;

  const items = db
    .select()
    .from(schema.encargosItems)
    .where(eq(schema.encargosItems.encargoId, id))
    .all();

  return { ...encargo, items };
}

export function createEncargo(input: CreateEncargoInput) {
  const now = new Date().toISOString();
  const id = uuidv4();
  const total = input.items.reduce(
    (sum, item) => sum + item.precioUnitario * item.cantidad,
    0
  );

  db.insert(schema.encargos)
    .values({
      id,
      clienteNombre: input.clienteNombre,
      fechaEncargo: now.split("T")[0],
      estado: "pendiente",
      total,
      notas: "",
      createdAt: now,
      updatedAt: now,
    })
    .run();

  for (const item of input.items) {
    db.insert(schema.encargosItems)
      .values({
        id: uuidv4(),
        encargoId: id,
        itemType: item.itemType,
        itemId: item.itemId,
        nombreItem: item.nombreItem,
        precioUnitario: item.precioUnitario,
        cantidad: item.cantidad,
        peticionEspecial: item.peticionEspecial || null,
        fechaReserva: item.fechaReserva || null,
      })
      .run();
  }

  return getEncargoById(id);
}

function descontarStockEncargo(encargoId: string): void {
  const encargo = getEncargoById(encargoId);
  if (!encargo) return;

  for (const item of encargo.items) {
    if (item.itemType === "producto") {
      descontarStock(item.itemId, item.cantidad);
    }
  }
}

function devolverStockEncargo(encargoId: string): void {
  const encargo = getEncargoById(encargoId);
  if (!encargo) return;

  for (const item of encargo.items) {
    if (item.itemType === "producto") {
      devolverStock(item.itemId, item.cantidad);
    }
  }
}

export function updateEncargoEstado(id: string, estado: string) {
  const encargo = getEncargoById(id);
  if (!encargo) return null;

  const estadoAnterior = encargo.estado;
  const now = new Date().toISOString();

  db.update(schema.encargos)
    .set({ estado, updatedAt: now })
    .where(eq(schema.encargos.id, id))
    .run();

  // Descontar stock solo al pasar a "completado" (y no estaba ya completado)
  if (estado === "completado" && estadoAnterior !== "completado") {
    descontarStockEncargo(id);
  }

  // Devolver stock si se desmarca de "completado" a otro estado
  if (estadoAnterior === "completado" && estado !== "completado") {
    devolverStockEncargo(id);
  }

  return getEncargoById(id);
}

export function updateEncargoNotas(id: string, notas: string) {
  const now = new Date().toISOString();
  db.update(schema.encargos)
    .set({ notas, updatedAt: now })
    .where(eq(schema.encargos.id, id))
    .run();
  return getEncargoById(id);
}

export function getEncargosStats() {
  const all = db.select().from(schema.encargos).all();
  return {
    pendiente: all.filter((e) => e.estado === "pendiente").length,
    en_proceso: all.filter((e) => e.estado === "en_proceso").length,
    completado: all.filter((e) => e.estado === "completado").length,
    cancelado: all.filter((e) => e.cancelado).length,
    total: all.length,
  };
}

export function cancelarEncargo(id: string) {
  const encargo = getEncargoById(id);
  if (!encargo) return null;
  if (encargo.cancelado) return encargo;

  const now = new Date().toISOString();
  db.update(schema.encargos)
    .set({ cancelado: true, updatedAt: now })
    .where(eq(schema.encargos.id, id))
    .run();

  // Devolver stock solo si estaba completado (el stock fue descontado)
  if (encargo.estado === "completado") {
    devolverStockEncargo(id);
  }

  return getEncargoById(id);
}
