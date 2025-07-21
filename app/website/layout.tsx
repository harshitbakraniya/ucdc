import type React from "react";
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "UCDC",
  description: "UCDC website",
};

export default function WebLayout({ children }: { children: React.ReactNode }) {
  // Server-side redirect will be handled by middleware

  return (
    <>
      <Header />
      <div className="">{children}</div>
      <Footer />
    </>
  );
}
