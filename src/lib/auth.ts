import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { SESSION_COOKIE_NAME, SESSION_DURATION_MS } from "./constants";

function sign(data: string): string {
  return createHmac("sha256", process.env.COOKIE_SECRET!)
    .update(data)
    .digest("hex");
}

export async function createSession(): Promise<void> {
  const timestamp = Date.now().toString();
  const signature = sign(timestamp);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, `${timestamp}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_DURATION_MS / 1000,
    path: "/",
  });
}

export function verifySession(token: string): boolean {
  try {
    const [timestamp, signature] = token.split(".");
    if (!timestamp || !signature) return false;

    const age = Date.now() - parseInt(timestamp, 10);
    if (age > SESSION_DURATION_MS) return false;

    const expectedSig = sign(timestamp);
    return timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSig, "hex")
    );
  } catch {
    return false;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  if (!session?.value) return false;
  return verifySession(session.value);
}
