import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface ServiceCardProps {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string | null;
}

export function ServiceCard({
  id,
  nombre,
  descripcion,
  precio,
  imagenUrl,
}: ServiceCardProps) {
  return (
    <Link
      href={`/servicios/${id}`}
      className="group bg-white rounded-2xl shadow-sm border border-lila-100 overflow-hidden hover:shadow-md hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
    >
      <div className="aspect-square bg-lila-50 relative overflow-hidden">
        <Image
          src={imagenUrl || "/images/placeholder.svg"}
          alt={nombre}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="info" size="sm">
            <Calendar className="size-3" />
            Por reserva
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-h4 font-display font-medium text-gray-900 line-clamp-1">
          {nombre}
        </h3>
        <p className="text-body-sm text-gray-500 line-clamp-2 mt-1 min-h-[2.5rem]">
          {descripcion}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-h3 font-display font-semibold text-lila-700">
            {formatCurrency(precio)}
          </span>
          <span className="text-body-sm font-semibold text-lila-600 flex items-center gap-1">
            <Calendar className="size-4" />
            Reservar
          </span>
        </div>
      </div>
    </Link>
  );
}
