"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", emoji: "📊" },
  { href: "/admin/productos", label: "Productos", emoji: "📦" },
  { href: "/admin/servicios", label: "Servicios", emoji: "✂️" },
  { href: "/admin/encargos", label: "Encargos", emoji: "🛍️" },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-lila-800 text-white",
          "transform transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
          "md:sticky md:top-0 md:translate-x-0 md:w-64 md:h-screen md:z-auto"
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lila-500 rounded-xl flex items-center justify-center">
                <span className="text-lg">💎</span>
              </div>
              <div>
                <p className="font-display font-semibold">Paula</p>
                <p className="text-caption text-lila-200">Administradora</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-1 text-lila-200 hover:text-white"
            >
              ❌
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-body font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-lila-600 text-white"
                    : "text-lila-100 hover:bg-lila-700"
                )}
              >
                <span className="text-lg">{item.emoji}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-lila-700">
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-body font-medium text-lila-100 hover:bg-lila-700 transition-colors"
            >
              <span>🚪</span>
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
