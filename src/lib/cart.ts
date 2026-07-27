import { cookies } from "next/headers";
import { CART_COOKIE_NAME, CART_MAX_ITEMS, CART_MAX_QUANTITY } from "./constants";

export interface CartItem {
  itemType: "producto" | "servicio";
  itemId: string;
  nombreItem: string;
  precioUnitario: number;
  cantidad: number;
  peticionEspecial?: string;
  fechaReserva?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  updatedAt: string;
}

function getEmptyCart(): Cart {
  return { items: [], total: 0, updatedAt: new Date().toISOString() };
}

export async function getCart(): Promise<Cart> {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get(CART_COOKIE_NAME)?.value;
    if (!raw) return getEmptyCart();
    const parsed = JSON.parse(raw) as Cart;
    if (!parsed.items || !Array.isArray(parsed.items)) return getEmptyCart();
    return parsed;
  } catch {
    return getEmptyCart();
  }
}

export async function saveCart(cart: Cart): Promise<void> {
  cart.updatedAt = new Date().toISOString();
  cart.total = cart.items.reduce(
    (sum, item) => sum + item.precioUnitario * item.cantidad,
    0
  );
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE_NAME, JSON.stringify(cart), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
}

export async function addToCart(item: CartItem): Promise<Cart> {
  const cart = await getCart();

  if (cart.items.length >= CART_MAX_ITEMS) {
    throw new Error("El carrito está lleno");
  }

  if (item.cantidad > CART_MAX_QUANTITY) {
    item.cantidad = CART_MAX_QUANTITY;
  }

  const existing = cart.items.find(
    (i) => i.itemId === item.itemId && i.itemType === item.itemType
  );

  if (existing) {
    existing.cantidad = Math.min(
      existing.cantidad + item.cantidad,
      CART_MAX_QUANTITY
    );
    if (item.peticionEspecial) {
      existing.peticionEspecial = item.peticionEspecial;
    }
    if (item.fechaReserva) {
      existing.fechaReserva = item.fechaReserva;
    }
  } else {
    cart.items.push(item);
  }

  await saveCart(cart);
  return cart;
}

export async function updateCartItemQuantity(
  itemId: string,
  cantidad: number
): Promise<Cart> {
  const cart = await getCart();
  const item = cart.items.find((i) => i.itemId === itemId);
  if (item) {
    if (cantidad <= 0) {
      cart.items = cart.items.filter((i) => i.itemId !== itemId);
    } else {
      item.cantidad = Math.min(cantidad, CART_MAX_QUANTITY);
    }
  }
  await saveCart(cart);
  return cart;
}

export async function removeFromCart(itemId: string): Promise<Cart> {
  const cart = await getCart();
  cart.items = cart.items.filter((i) => i.itemId !== itemId);
  await saveCart(cart);
  return cart;
}

export async function clearCart(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CART_COOKIE_NAME);
}

export async function getCartItemCount(): Promise<number> {
  const cart = await getCart();
  return cart.items.reduce((sum, item) => sum + item.cantidad, 0);
}

export async function updateCartItem(
  index: number,
  cantidad: number
): Promise<Cart> {
  const cart = await getCart();
  if (index < 0 || index >= cart.items.length) return cart;

  if (cantidad <= 0) {
    cart.items.splice(index, 1);
  } else {
    cart.items[index].cantidad = Math.min(cantidad, CART_MAX_QUANTITY);
  }

  await saveCart(cart);
  return cart;
}

export async function removeCartItem(index: number): Promise<Cart> {
  const cart = await getCart();
  if (index >= 0 && index < cart.items.length) {
    cart.items.splice(index, 1);
  }
  await saveCart(cart);
  return cart;
}
