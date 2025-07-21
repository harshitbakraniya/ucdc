import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UCDC - Umiya Career Development Center",
  description:
    "Empowering students with quality education and comprehensive training for competitive exams",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="flex-grow">{children}</div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
