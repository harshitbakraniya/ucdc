"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNavItems = [
  {
    title: "Home",
    href: "/website",
  },
  {
    title: "About UCDC",
    href: "/website/about",
    // children: [
    //   {
    //     title: "About",
    //     href: "/website/about",
    //   },
    //   {
    //     title: "Chairman's Message",
    //     href: "/website/about/chairmans-message",
    //   },
    //   {
    //     title: "Vision & Mission",
    //     href: "/website/about/vision-mission",
    //   },
    //   {
    //     title: "Committee",
    //     href: "/website/about/committee",
    //   },
    //   {
    //     title: "Shree Umiya Mataji Sansthan",
    //     href: "/website/about/umiya-mataji-sansthan",
    //   },
    //   {
    //     title: "About Sardardham",
    //     href: "/website/about/sardardham",
    //   },
    // ],
  },
  {
    title: "Courses Offered",
    href: "/website/courses",
    children: [
      {
        title: "UPSC",
        href: "/website/courses#upsc",
      },
      {
        title: "GPSC",
        href: "/website/courses#gpsc",
      },
      {
        title: "IELTS",
        href: "/website/courses#ielts",
      },
      {
        title: "CDS",
        href: "/website/courses#cds",
      },
    ],
  },
  {
    title: "Facilities",
    href: "/website/facilities",
    children: [
      {
        title: "Accommodation",
        href: "/website/facilities#accommodation",
      },
      {
        title: "Library",
        href: "/website/facilities#library",
      },
      {
        title: "Class Room",
        href: "/website/facilities#classroom",
      },
      {
        title: "Computer Lab",
        href: "/website/facilities#computer-lab",
      },
      {
        title: "Canteen",
        href: "/website/facilities#canteen",
      },
    ],
  },
  {
    title: "Student Corner",
    href: "/website/student-corner",
    children: [
      {
        title: "Courses & Batches",
        href: "/website/student-corner#batches",
      },
      {
        title: "Entrance Test",
        href: "/website/student-corner#entrance-test",
      },
      {
        title: "Entrance Test Results",
        href: "/website/student-corner#test-results",
      },
      {
        title: "Study Material",
        href: "/website/student-corner#materials",
      },
    ],
  },
  {
    title: "Gallery",
    href: "/website/gallery",
  },
  {
    title: "Alumni",
    href: "/website/alumni",
  },
  {
    title: "FAQ",
    href: "/website/faq",
  },
  {
    title: "Contact Us",
    href: "/website/contact",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center p-2 lg:p-0">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] ">
              <div className="px-2 py-6 overflow-hidden h-full">
                <Link
                  href="/"
                  className="flex items-center gap-2 mb-6"
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src="/logo.png"
                    alt="UCDC Logo"
                    width={40}
                    height={40}
                  />
                  <span className="font-bold text-xl">UCDC</span>
                </Link>
                <nav className="flex flex-col gap-4 overflow-auto h-full">
                  {mainNavItems.map((item) =>
                    item.children ? (
                      <div key={item.title} className="space-y-3">
                        <div className="font-medium">{item.title}</div>
                        <div className="pl-4 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.href}
                              className="block text-muted-foreground hover:text-foreground"
                              onClick={() => setIsOpen(false)}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="font-medium hover:text-red-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="UCDC Logo" width={120} height={120} />
            {/* <span className="font-bold text-xl hidden sm:inline-block">
              UCDC
            </span> */}
          </Link>
        </div>

        {/* Responsive navigation */}
        <div className="hidden lg:flex items-center justify-between w-full">
          <nav className="flex items-center gap-1 ml-6 flex-wrap">
            {mainNavItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.title}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-1 h-auto py-2 px-3"
                    >
                      {item.title}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.title} asChild>
                        <Link href={child.href}>{child.title}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-sm font-medium hover:text-red-600 transition-colors px-3 py-2"
                >
                  {item.title}
                </Link>
              )
            )}
          </nav>
          <div className="flex items-center">
            <Link href="/student-corner/entrance-test">
              <Button className="bg-red-600 hover:bg-red-700">Apply Now</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Apply Now button */}
        <div className="ml-auto lg:hidden">
          <Link href="/student-corner/entrance-test">
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              Apply
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
