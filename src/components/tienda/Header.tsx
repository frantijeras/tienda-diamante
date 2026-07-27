import Link from "next/link";
import Image from "next/image";
import { CartIcon } from "./CartIcon";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-lila-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 relative">
            <Image
              src="/images/logo-tienda-diamante.png"
              alt="La Tienda Diamante de Paula"
              fill
              className="object-contain"
              sizes="40px"
            />
          </div>
          <span className="text-h4 font-display font-semibold text-gray-900 hidden sm:block">
            La Tienda Diamante de Paula
          </span>
          <span className="text-h4 font-display font-semibold text-gray-900 sm:hidden">
            Tienda Diamante
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/productos"
            className="text-body font-medium text-lila-700 hover:text-lila-900 transition-colors"
          >
            Productos
          </Link>
          <Link
            href="/servicios"
            className="text-body font-medium text-lila-700 hover:text-lila-900 transition-colors"
          >
            Servicios
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
