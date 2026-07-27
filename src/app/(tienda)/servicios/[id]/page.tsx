import { getServicioById } from "@/lib/services";
import { getCategoriaInfo, formatCurrency, getTomorrowDate, getMaxDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ServicioReservarButton } from "./ReservarButton";

export const dynamic = "force-dynamic";

export default async function ServicioDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const servicio = getServicioById(id);

  if (!servicio || !servicio.activo) {
    notFound();
  }

  const catInfo = getCategoriaInfo(servicio.categoria);
  const minDate = getTomorrowDate();
  const maxDate = getMaxDate();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-6">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-1 text-body-sm text-lila-600 hover:text-lila-700 transition-colors mb-2"
        >
          <ChevronLeft className="size-4" />
          Volver a servicios
        </Link>
        <p className="text-caption text-gray-500">
          {catInfo.nombre} {catInfo.icono}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-[4/3] bg-lila-50 rounded-xl overflow-hidden relative">
          <Image
            src={servicio.imagenUrl || "/images/placeholder.svg"}
            alt={servicio.nombre}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute top-4 right-4">
            <Badge variant="info">
              <Calendar className="size-3" />
              Por reserva
            </Badge>
          </div>
        </div>

        <div>
          <p className="text-caption text-gray-500 uppercase tracking-wide font-semibold mb-1">
            {catInfo.nombre} {catInfo.icono}
          </p>
          <h1 className="text-h1 font-display font-semibold text-gray-900 mb-3">
            {servicio.nombre}
          </h1>
          <p className="text-body-lg text-gray-600 mb-6">
            {servicio.descripcion}
          </p>
          <p className="text-h3 font-display font-semibold text-lila-700 mb-8">
            {formatCurrency(servicio.precio)}
          </p>

          <ServicioReservarButton
            servicioId={servicio.id}
            nombre={servicio.nombre}
            precio={servicio.precio}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      </div>
    </div>
  );
}
