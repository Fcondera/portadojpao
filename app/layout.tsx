import type { Metadata } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portal do Japão | Natureza, café e pôr do sol em Manacapuru",
  description:
    "Uma experiência à beira do rio, com café regional, natureza e um pôr do sol inesquecível em Manacapuru, Amazonas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} ${notoSerif.variable}`}>{children}</body>
    </html>
  );
}
