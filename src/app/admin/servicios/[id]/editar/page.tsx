"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { CATEGORIAS_SERVICIOS } from "@/lib/constants";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/ui/Spinner";

export default function EditarServicioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState<string>(CATEGORIAS_SERVICIOS[0].id);
  const [imagenUrl, setImagenUrl] = useState("");
  const [servicioId, setServicioId] = useState("");

  useEffect(() => {
    params.then(({ id }) => {
      setServicioId(id);
      fetch(`/api/servicios/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setNombre(data.data.nombre);
            setDescripcion(data.data.descripcion || "");
            setPrecio(data.data.precio.toString());
            setCategoria(data.data.categoria);
            setImagenUrl(data.data.imagenUrl || "");
          }
        })
        .finally(() => setFetching(false));
    });
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    if (!precio || parseFloat(precio) <= 0) {
      setError("Introduce un precio válido");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/servicios/${servicioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          descripcion: descripcion.trim(),
          precio: parseFloat(precio),
          categoria,
          imagenUrl: imagenUrl || null,
        }),
      });

      if (res.ok) {
        router.push("/admin/servicios");
      } else {
        const data = await res.json();
        setError(data.error || "Error al actualizar servicio");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Spinner />;

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/servicios"
        className="inline-flex items-center gap-1 text-body-sm text-lila-600 hover:text-lila-700 transition-colors mb-4"
      >
        <ChevronLeft className="size-4" />
        Volver a servicios
      </Link>

      <h1 className="text-h2 font-display font-semibold text-gray-900 mb-6">
        Editar servicio
      </h1>

      {error && (
        <div className="bg-danger-50 border border-danger-200 rounded-xl p-4 mb-6 text-body text-danger-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <ImageUploader value={imagenUrl} onChange={setImagenUrl} />

        <Input
          label="Nombre"
          placeholder="Nombre del servicio"
          value={nombre}
          onChange={setNombre}
          required
          maxLength={100}
        />

        <Textarea
          label="Descripción"
          placeholder="Describe el servicio..."
          value={descripcion}
          onChange={setDescripcion}
          maxLength={500}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Precio (€)"
            type="number"
            step="0.01"
            min="0.01"
            max="9999.99"
            placeholder="0.00"
            value={precio}
            onChange={setPrecio}
            required
          />

          <Select
            label="Categoría"
            value={categoria}
            onChange={setCategoria}
            options={CATEGORIAS_SERVICIOS.map((c) => ({
              value: c.id,
              label: `${c.icono} ${c.nombre}`,
            }))}
          />
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-3 pt-4">
          <Link
            href="/admin/servicios"
            className="inline-flex items-center justify-center px-4 py-2.5 text-body font-semibold text-lila-700 border-2 border-lila-200 rounded-lg hover:border-lila-400 hover:bg-lila-50 transition-colors"
          >
            Cancelar
          </Link>
          <Button type="submit" variant="primary" size="lg" loading={loading}>
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
}
