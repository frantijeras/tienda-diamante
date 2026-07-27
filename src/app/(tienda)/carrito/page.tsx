import { getCart } from "@/lib/cart";
import { CartClient } from "./CartClient";

export default async function CarritoPage() {
  const cart = await getCart();

  return <CartClient initialCart={cart} />;
}
