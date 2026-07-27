export const CATEGORIAS_PRODUCTOS = [
  { id: "pulseras", nombre: "Pulseras", icono: "🧵" },
  { id: "pegatinas", nombre: "Pegatinas", icono: "⭐" },
  { id: "plastilina", nombre: "Muñecos de Plastilina", icono: "🪀" },
  { id: "maquillaje", nombre: "Maquillaje", icono: "💄" },
] as const;

export const CATEGORIAS_SERVICIOS = [
  { id: "masajes", nombre: "Masajes", icono: "💆" },
  { id: "peluqueria", nombre: "Peluquería", icono: "💇" },
] as const;

export type CategoriaProducto = (typeof CATEGORIAS_PRODUCTOS)[number]["id"];
export type CategoriaServicio = (typeof CATEGORIAS_SERVICIOS)[number]["id"];

export const TODAS_CATEGORIAS = [
  ...CATEGORIAS_PRODUCTOS,
  ...CATEGORIAS_SERVICIOS,
];

export const ESTADOS_ENCARGO = [
  { id: "pendiente", nombre: "Pendiente", color: "bg-warning-100 text-warning-700", icon: "Clock" },
  { id: "en_proceso", nombre: "En proceso", color: "bg-info-100 text-info-700", icon: "Loader2" },
  { id: "completado", nombre: "Completado", color: "bg-success-100 text-success-700", icon: "CheckCircle2" },
] as const;

export type EstadoEncargo = (typeof ESTADOS_ENCARGO)[number]["id"];

export const CART_COOKIE_NAME = "cart";
export const CART_MAX_ITEMS = 50;
export const CART_MAX_QUANTITY = 99;
export const CART_TTL_DAYS = 7;

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

export const UPLOAD_MAX_SIZE = 5 * 1024 * 1024; // 5MB
export const UPLOAD_ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const UPLOAD_DIR = "public/uploads/productos";
