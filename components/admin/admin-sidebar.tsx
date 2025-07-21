"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth-actions"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Home, BookOpen, Users, ImageIcon, Phone, FileText, LogOut } from "lucide-react"
import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Image from "next/image"

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/admin/login")
    router.refresh()
  }

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader className="border-b">
          <div className="flex items-center gap-2 px-4 py-2">
            <Image src="/placeholder.svg?height=40&width=40" alt="UCDC Logo" width={40} height={40} />
            <div>
              <h2 className="text-lg font-bold">UCDC Admin</h2>
              <p className="text-xs text-muted-foreground">Content Management</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin")}>
                <Link href="/admin">
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Home Page Management */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/home")}>
                <Link href="/admin/home">
                  <Home className="h-5 w-5" />
                  <span>Home Page</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={isActive("/admin/home/banners")}>
                  <Link href="/admin/home/banners">Banner Section</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={isActive("/admin/home/student-corner")}>
                  <Link href="/admin/home/student-corner">Student Corner</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={isActive("/admin/home/achievers")}>
                  <Link href="/admin/home/achievers">Achievers Section</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>

            {/* About Page Management */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/about")}>
                <Link href="/admin/about">
                  <FileText className="h-5 w-5" />
                  <span>About Page</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={isActive("/admin/about/committee")}>
                  <Link href="/admin/about/committee">Management Committee</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>

            {/* Courses Management */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/courses")}>
                <Link href="/admin/courses">
                  <BookOpen className="h-5 w-5" />
                  <span>Courses</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Gallery Management */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/gallery")}>
                <Link href="/admin/gallery">
                  <ImageIcon className="h-5 w-5" />
                  <span>Gallery</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Alumni Management */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/alumni")}>
                <Link href="/admin/alumni">
                  <Users className="h-5 w-5" />
                  <span>Alumni</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Contact Management */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/contact")}>
                <Link href="/admin/contact">
                  <Phone className="h-5 w-5" />
                  <span>Contact</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>
      <div className="flex items-center h-16 px-4 border-b lg:hidden">
        <SidebarTrigger />
        <div className="ml-4">
          <Image src="/placeholder.svg?height=32&width=32" alt="UCDC Logo" width={32} height={32} />
        </div>
      </div>
    </SidebarProvider>
  )
}
