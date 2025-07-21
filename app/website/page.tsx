import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FacilitiesSection from "@/components/facilities-section";
import AchieversSection from "@/components/achievers-section";
import StudentCornerSection from "@/components/student-corner-section";
import BannerSection from "@/components/banner-slider";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Banner Slider */}
      <BannerSection />

      {/* Welcome Message */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Welcome to UCDC
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Umiya Career Development Center (UCDC) is dedicated to
                empowering students with quality education and comprehensive
                training for competitive exams. Our mission is to nurture talent
                and create future leaders.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/about">
                  <Button className="bg-red-600 hover:bg-red-700">
                    Learn More <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline">Explore Courses</Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="UCDC Campus"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <FacilitiesSection />

      {/* Our Achievers */}
      <AchieversSection />

      {/* Student Corner */}
      <StudentCornerSection />

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-red-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Begin Your Success Journey
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-6">
            Join UCDC and prepare for a bright future with our expert guidance
            and comprehensive study programs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-red-600 hover:bg-red-700">
                Contact Us
              </Button>
            </Link>
            <Link href="/student-corner/entrance-test">
              <Button variant="outline">Apply for Entrance Test</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
