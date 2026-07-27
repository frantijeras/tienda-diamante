import { sqliteTable, text, real, integer, index } from "drizzle-orm/sqlite-core";

export const productos = sqliteTable("productos", {
  id: text("id").primaryKey(),
  nombre: text("nombre").notNull(),
  descripcion: text("descripcion").notNull().default(""),
  precio: real("precio").notNull(),
  categoria: text("categoria").notNull(),
  imagenUrl: text("imagen_url"),
  activo: integer("activo", { mode: "boolean" }).notNull().default(true),
  stock: integer("stock").notNull().default(0),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const servicios = sqliteTable("servicios", {
  id: text("id").primaryKey(),
  nombre: text("nombre").notNull(),
  descripcion: text("descripcion").notNull().default(""),
  precio: real("precio").notNull(),
  categoria: text("categoria").notNull(),
  imagenUrl: text("imagen_url"),
  activo: integer("activo", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const encargos = sqliteTable(
  "encargos",
  {
    id: text("id").primaryKey(),
    clienteNombre: text("cliente_nombre").notNull(),
    fechaEncargo: text("fecha_encargo").notNull(),
    estado: text("estado").notNull().default("pendiente"),
    cancelado: integer("cancelado", { mode: "boolean" }).notNull().default(false),
    total: real("total").notNull().default(0),
    notas: text("notas").default(""),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => ({
    estadoIdx: index("idx_encargos_estado").on(table.estado),
  })
);

export const encargosItems = sqliteTable(
  "encargos_items",
  {
    id: text("id").primaryKey(),
    encargoId: text("encargo_id")
      .notNull()
      .references(() => encargos.id, { onDelete: "cascade" }),
    itemType: text("item_type").notNull(),
    itemId: text("item_id").notNull(),
    nombreItem: text("nombre_item").notNull(),
    precioUnitario: real("precio_unitario").notNull(),
    cantidad: integer("cantidad").notNull().default(1),
    peticionEspecial: text("peticion_especial"),
    fechaReserva: text("fecha_reserva"),
  },
  (table) => ({
    encargoIdx: index("idx_encargos_items_encargo").on(table.encargoId),
  })
);
