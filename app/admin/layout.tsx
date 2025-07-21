import type React from "react";
import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "UCDC Admin Panel",
  description: "Admin panel for UCDC website",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side redirect will be handled by middleware

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
