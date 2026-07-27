import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `${amount.toFixed(2)} €`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
}

export function formatTimeAgo(isoStr: string): string {
  const now = Date.now();
  const then = new Date(isoStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "ahora mismo";
  if (diffMin < 60) return `hace ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `hace ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  return `hace ${diffD}d`;
}

export function getCategoriaInfo(id: string) {
  const cats = [
    { id: "pulseras", nombre: "Pulseras", icono: "🧵" },
    { id: "pegatinas", nombre: "Pegatinas", icono: "⭐" },
    { id: "plastilina", nombre: "Figuras de Plastilina", icono: "🌈" },
    { id: "masajes", nombre: "Masajes", icono: "💆" },
    { id: "peluqueria", nombre: "Peluquería", icono: "💇" },
    { id: "maquillaje", nombre: "Maquillaje", icono: "💄" },
  ];
  return cats.find((c) => c.id === id) || { id, nombre: id, icono: "📦" };
}

export function getTomorrowDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export function getMaxDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 90);
  return d.toISOString().split("T")[0];
}

export function getOrderNumber(id: string): string {
  return `#${id.slice(-4).toUpperCase()}`;
}
