"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import {
  LayoutDashboard,
  Home,
  BookOpen,
  Users,
  ImageIcon,
  Phone,
  FileText,
  LogOut,
  Settings,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Home Page",
    href: "/admin/home",
    icon: Home,
    children: [
      {
        title: "Banner Section",
        href: "/admin/home/banners",
      },
      {
        title: "Student Corner",
        href: "/admin/home/student-corner",
      },
      {
        title: "Achievers Section",
        href: "/admin/home/achievers",
      },
    ],
  },
  {
    title: "About Page",
    href: "/admin/about",
    icon: FileText,
    children: [
      {
        title: "Management Committee",
        href: "/admin/about/committee",
      },
    ],
  },
  {
    title: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    title: "Alumni",
    href: "/admin/alumni",
    icon: Users,
  },
  {
    title: "Contact",
    href: "/admin/contact",
    icon: Phone,
    children: [
      {
        title: "Branches",
        href: "/admin/contact/branches",
      },
      {
        title: "Messages",
        href: "/admin/contact/messages",
      },
    ],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const toggleExpand = (title: string) => {
    if (expanded === title) {
      setExpanded(null)
    } else {
      setExpanded(title)
    }
  }

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button variant="outline" size="icon" onClick={() => setMobileOpen(!mobileOpen)} className="bg-white">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 p-4 border-b">
            <Image src="/placeholder.svg?height=40&width=40" alt="UCDC Logo" width={40} height={40} />
            <div>
              <h2 className="text-lg font-bold">UCDC Admin</h2>
              <p className="text-xs text-muted-foreground">Content Management</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.title}>
                  {item.children ? (
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-start", isActive(item.href) && "bg-gray-100 text-orange-600")}
                        onClick={() => toggleExpand(item.title)}
                      >
                        <item.icon className="mr-2 h-5 w-5" />
                        {item.title}
                        <span className="ml-auto">
                          {expanded === item.title ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="m18 15-6-6-6 6" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          )}
                        </span>
                      </Button>
                      {expanded === item.title && (
                        <ul className="pl-6 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "block py-2 px-3 rounded-md text-sm",
                                  isActive(child.href)
                                    ? "bg-orange-50 text-orange-600"
                                    : "text-gray-600 hover:bg-gray-50",
                                )}
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center py-2 px-3 rounded-md",
                        isActive(item.href) ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50",
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileOpen(false)} />}
    </>
  )
}
