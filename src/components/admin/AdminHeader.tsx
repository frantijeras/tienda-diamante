"use client";

import Link from "next/link";

interface AdminHeaderProps {
  breadcrumb: string;
  onMenuClick: () => void;
}

export function AdminHeader({ breadcrumb, onMenuClick }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-lila-100 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden p-2 -ml-2">
          <span className="text-xl">☰</span>
        </button>
        <h1 className="text-h4 font-display font-medium text-gray-900 hidden md:block">
          {breadcrumb}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="p-2 text-gray-500 hover:text-lila-600 hidden md:flex items-center gap-1.5 text-body-sm"
        >
          <span>🔗</span>
          Ver tienda
        </Link>
        <div className="w-9 h-9 bg-lila-100 rounded-full flex items-center justify-center font-semibold text-lila-700">
          P
        </div>
      </div>
    </header>
  );
}
