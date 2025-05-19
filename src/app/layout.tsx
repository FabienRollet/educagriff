import type { Metadata } from "next";
import { Gelasio } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ThemeProvider } from "next-themes";
import { Analytics } from '@vercel/analytics/next';

const gelasio = Gelasio({
  variable: "--font-gelasio-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Éducagriff | Éducateur Comportementaliste canin & félin, Petsitter en Gironde",
  description:
    "“Educagriff est une entreprise de prestations de services en lien avec les animaux de compagnie vous trouverez un service de petsitter, d'éducateur comportementaliste canin et félin sur Bordeaux et la CUB, cette entreprise à pour but de vous conseiller, vous accompagner, de s'occuper, d’éduquer et rééduquer vos animaux selon vos besoins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className={gelasio.variable}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Navbar />
          {children}
          <Analytics />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
