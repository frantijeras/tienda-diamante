"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export function CartIcon() {
  const [count, setCount] = useState(0);

  const updateCount = async () => {
    try {
      const res = await fetch("/api/cart/count", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setCount(data.count);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    updateCount();
    const interval = setInterval(updateCount, 5000);
    window.addEventListener("focus", updateCount);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", updateCount);
    };
  }, []);

  return (
    <Link
      href="/carrito"
      className="relative p-2 -mr-2"
      aria-label={`Carrito, ${count} ${count === 1 ? "ítem" : "ítems"}`}
    >
      <ShoppingCart className="size-6 text-lila-700" />
      {count > 0 && (
        <span
          key={count}
          className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 bg-lila-500 text-white rounded-full text-caption font-bold flex items-center justify-center ring-2 ring-white animate-bounce-small"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
