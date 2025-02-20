import type { Metadata } from "next";
import { Gelasio } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ThemeProvider } from "next-themes";

const gelasio = Gelasio({
  variable: "--font-gelasio-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Educagriff",
  description:
    "“Educagriff vous offre des solutions sur mesure grâce à notre éducateur comportementaliste, petsitter canin et félin en vous accompagnant pour le bien-être de vos animaux.",
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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
