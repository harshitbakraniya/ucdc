import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Home, Computer, Library, Coffee } from "lucide-react";
import Link from "next/link";

// This would come from your CMS in a real implementation
const facilities = [
  {
    id: 1,
    title: "Accommodation",
    description: "Comfortable and secure hostel facilities for students",
    icon: Home,
    link: "/facilities/accommodation",
  },
  {
    id: 2,
    title: "Library",
    description: "Well-stocked library with study materials for all exams",
    icon: Library,
    link: "/facilities/library",
  },
  {
    id: 3,
    title: "Modern Classrooms",
    description: "Spacious classrooms with modern teaching aids",
    icon: BookOpen,
    link: "/facilities/classrooms",
  },
  {
    id: 4,
    title: "Computer Lab",
    description: "State-of-the-art computer lab for online practice",
    icon: Computer,
    link: "/facilities/computer-lab",
  },
  {
    id: 5,
    title: "Canteen",
    description: "Hygienic canteen serving nutritious meals",
    icon: Coffee,
    link: "/facilities/canteen",
  },
];

export default function FacilitiesSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Our Facilities
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            UCDC provides world-class facilities to ensure a conducive learning
            environment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <Link key={facility.id} href={facility.link} className="group">
              <Card className="h-full transition-all duration-200 hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                    <facility.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
                  <p className="text-gray-500">{facility.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
