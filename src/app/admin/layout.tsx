"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { usePathname } from "next/navigation";

const breadcrumbMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/productos": "Productos",
  "/admin/productos/nuevo": "Nuevo producto",
  "/admin/servicios": "Servicios",
  "/admin/servicios/nuevo": "Nuevo servicio",
  "/admin/encargos": "Encargos",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Don't wrap login page with admin layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const breadcrumb =
    breadcrumbMap[pathname] ||
    (pathname.includes("/editar") ? "Editar" : "Admin");

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          breadcrumb={breadcrumb}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
