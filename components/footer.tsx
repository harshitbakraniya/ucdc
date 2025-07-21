import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="UCDC Logo"
                width={150}
                height={150}
                className="bg-white rounded-full p-1"
              />
              {/* <span className="font-bold text-xl">UCDC</span> */}
            </div>
            <p className="text-gray-400">
              Umiya Career Development Center (UCDC) is dedicated to empowering
              students with quality education and comprehensive training for
              competitive exams.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About UCDC
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-gray-400 hover:text-white"
                >
                  Courses Offered
                </Link>
              </li>
              <li>
                <Link
                  href="/facilities"
                  className="text-gray-400 hover:text-white"
                >
                  Facilities
                </Link>
              </li>
              <li>
                <Link
                  href="/student-corner"
                  className="text-gray-400 hover:text-white"
                >
                  Student Corner
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-400 hover:text-white"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/alumni" className="text-gray-400 hover:text-white">
                  Alumni
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-red-500" />
                <span className="text-gray-400">
                  UCDC Sola, Near Sardardham, S.G. Highway, Ahmedabad, Gujarat,
                  India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-red-500" />
                <Link
                  href="tel:+919876543210"
                  className="text-gray-400 hover:text-white"
                >
                  +91 98765 43210
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-red-500" />
                <Link
                  href="mailto:info@ucdc.co.in"
                  className="text-gray-400 hover:text-white"
                >
                  info@ucdc.co.in
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-gray-400">
              Subscribe to our newsletter to receive updates on new courses,
              events, and study materials.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} UCDC. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="text-gray-400 hover:text-white text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-400 hover:text-white text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
