import type { Metadata } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portal-do-japao.netlify.app";
const siteTitle = "Portal do Japão | Café regional na Amazônia em Manacapuru";
const siteDescription =
  "Café regional na Amazônia com natureza, pôr do sol, vista para o rio e experiências especiais no Portal do Japão, em Manacapuru, Amazonas.";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Portal do Japão",
  },
  description: siteDescription,
  applicationName: "Portal do Japão",
  authors: [{ name: "Portal do Japão" }],
  creator: "Portal do Japão",
  publisher: "Portal do Japão",
  category: "Café regional, turismo na Amazônia e experiências em Manacapuru",
  keywords: [
    "café na Amazônia",
    "café regional na Amazônia",
    "café regional Manacapuru",
    "Portal do Japão",
    "Portal do Japonês",
    "pôr do sol em Manacapuru",
    "turismo em Manacapuru",
    "cafeteria na Amazônia",
    "experiência na natureza Amazonas",
    "café com vista para o rio",
    "eventos em Manacapuru",
    "Novo Airão Manacapuru",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Portal do Japão",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/img-portal.jpeg",
        width: 1200,
        height: 630,
        alt: "Portal do Japão com vista para a natureza em Manacapuru, Amazonas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/img-portal.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} ${notoSerif.variable}`}>{children}</body>
    </html>
  );
}
