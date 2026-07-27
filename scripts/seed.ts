import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../src/lib/schema";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const dbPath = path.resolve("data/tienda.db");
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
const db = drizzle(sqlite, { schema });

// Create tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS productos (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT NOT NULL DEFAULT '',
    precio REAL NOT NULL,
    categoria TEXT NOT NULL,
    imagen_url TEXT,
    activo INTEGER NOT NULL DEFAULT 1,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS servicios (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT NOT NULL DEFAULT '',
    precio REAL NOT NULL,
    categoria TEXT NOT NULL,
    imagen_url TEXT,
    activo INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS encargos (
    id TEXT PRIMARY KEY,
    cliente_nombre TEXT NOT NULL,
    fecha_encargo TEXT NOT NULL,
    estado TEXT NOT NULL DEFAULT 'pendiente',
    cancelado INTEGER NOT NULL DEFAULT 0,
    total REAL NOT NULL DEFAULT 0,
    notas TEXT DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS encargos_items (
    id TEXT PRIMARY KEY,
    encargo_id TEXT NOT NULL REFERENCES encargos(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL,
    item_id TEXT NOT NULL,
    nombre_item TEXT NOT NULL,
    precio_unitario REAL NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 1,
    peticion_especial TEXT,
    fecha_reserva TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_encargos_estado ON encargos(estado);
  CREATE INDEX IF NOT EXISTS idx_encargos_items_encargo ON encargos_items(encargo_id);
`);

const now = new Date().toISOString();

// Seed products
const productos = [
  {
    id: uuidv4(),
    nombre: "Pulsera Arcoíris",
    descripcion: "Pulsera de hilo con todos los colores del arcoíris, hecha a mano con mucho cariño.",
    precio: 2.5,
    categoria: "pulseras",
    imagenUrl: null,
    activo: true,
    stock: 15,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: uuidv4(),
    nombre: "Pulsera de Corazones",
    descripcion: "Pulsera con charms de corazones en diferentes colores.",
    precio: 3.0,
    categoria: "pulseras",
    imagenUrl: null,
    activo: true,
    stock: 20,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: uuidv4(),
    nombre: "Pegatina Estrella",
    descripcion: "Pegatina brillante con forma de estrella para decorar lo que quieras.",
    precio: 1.0,
    categoria: "pegatinas",
    imagenUrl: null,
    activo: true,
    stock: 12,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: uuidv4(),
    nombre: "Pegatina Dinosaurio",
    descripcion: "Pegatina colorida de un dinosaurio simpático.",
    precio: 1.5,
    categoria: "pegatinas",
    imagenUrl: null,
    activo: true,
    stock: 18,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: uuidv4(),
    nombre: "Muñeco Gato",
    descripcion: "Adorable gato de plastilina en colores pastel.",
    precio: 4.0,
    categoria: "plastilina",
    imagenUrl: null,
    activo: true,
    stock: 10,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: uuidv4(),
    nombre: "Muñeco Unicornio",
    descripcion: "Unicornio mágico de plastilina con colores arcoíris.",
    precio: 5.0,
    categoria: "plastilina",
    imagenUrl: null,
    activo: true,
    stock: 8,
    createdAt: now,
    updatedAt: now,
  },
];

// Seed services
const servicios = [
  {
    id: uuidv4(),
    nombre: "Masaje Relajante",
    descripcion: "Masaje suave en espalda y hombros para relajarte después del cole.",
    precio: 5.0,
    categoria: "masajes",
    imagenUrl: null,
    activo: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: uuidv4(),
    nombre: "Masaje de Manos",
    descripcion: "Masaje con crema hidratante para manos suaves.",
    precio: 3.0,
    categoria: "masajes",
    imagenUrl: null,
    activo: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: uuidv4(),
    nombre: "Trenzas y Coletas",
    descripcion: "Te hago trenzas bonitas y coletas con lazos.",
    precio: 4.0,
    categoria: "peluqueria",
    imagenUrl: null,
    activo: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: uuidv4(),
    nombre: "Peinado Fiesta",
    descripcion: "Peinado especial para fiestas y cumpleaños con horquillas decorativas.",
    precio: 6.0,
    categoria: "peluqueria",
    imagenUrl: null,
    activo: true,
    createdAt: now,
    updatedAt: now,
  },
];

console.log("Seeding database...");

for (const p of productos) {
  db.insert(schema.productos).values(p).run();
  console.log(`  ✓ Producto: ${p.nombre}`);
}

for (const s of servicios) {
  db.insert(schema.servicios).values(s).run();
  console.log(`  ✓ Servicio: ${s.nombre}`);
}

console.log("\n✅ Database seeded successfully!");
console.log(`   ${productos.length} productos`);
console.log(`   ${servicios.length} servicios`);

sqlite.close();
