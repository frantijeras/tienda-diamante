import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  description: string;
  variant: "pendiente" | "en_proceso" | "completado";
}

const emojiMap = {
  pendiente: "⏰",
  en_proceso: "🔄",
  completado: "✅",
};

const bgMap = {
  pendiente: "bg-warning-100",
  en_proceso: "bg-info-100",
  completado: "bg-success-100",
};

export function StatCard({ label, value, description, variant }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-caption text-gray-500 uppercase tracking-wide font-semibold">
            {label}
          </p>
          <p className="text-display font-display font-semibold text-gray-900 mt-1">
            {value}
          </p>
          <p className="text-body-sm text-gray-500 mt-1">{description}</p>
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
            bgMap[variant]
          )}
        >
          {emojiMap[variant]}
        </div>
      </div>
    </Card>
  );
}
