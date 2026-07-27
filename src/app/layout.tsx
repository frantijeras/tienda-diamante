import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Tienda Diamante de Paula",
  description:
    "Pequeños tesoros hechos a mano. Productos y servicios de Paula para familiares y amigos.",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "La Tienda Diamante de Paula",
    description: "Pequeños tesoros hechos a mano",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1408,
        height: 768,
        alt: "La Tienda Diamante de Paula",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${fredoka.variable} ${nunito.variable}`}
    >
      <body className="font-body text-body antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
