import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-lila-100 bg-lila-50/50 mt-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💎</span>
            <span className="text-h4 font-display font-semibold text-gray-900">
              La Tienda Diamante de Paula
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/productos"
              className="text-body-sm text-gray-600 hover:text-lila-700 transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/servicios"
              className="text-body-sm text-gray-600 hover:text-lila-700 transition-colors"
            >
              Servicios
            </Link>
            <Link
              href="/carrito"
              className="text-body-sm text-gray-600 hover:text-lila-700 transition-colors"
            >
              Carrito
            </Link>
          </nav>
        </div>
        <p className="text-caption text-gray-400 text-center mt-6">
          © {new Date().getFullYear()} Paula — Hecho con 💜
        </p>
      </div>
    </footer>
  );
}
