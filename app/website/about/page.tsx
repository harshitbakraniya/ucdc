import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, BookOpen, Building, Target } from "lucide-react";
import CommitteeSection from "@/components/CommitteeSection";

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-red-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About UCDC
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Learn about our mission, vision, and the people behind Umiya
              Career Development Center
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Our Story</h2>
              <p className="text-gray-500">
                Umiya Career Development Center (UCDC) was established with the
                vision of providing quality education and comprehensive training
                for competitive examinations. Founded in 2015, UCDC has since
                become a premier institution for civil services and competitive
                exam preparation in Gujarat.
              </p>
              <p className="text-gray-500">
                Our institute is built on the foundation of academic excellence,
                ethical values, and a commitment to student success. We believe
                in nurturing not just academic knowledge but also developing the
                overall personality of our students to help them become
                successful professionals and responsible citizens.
              </p>
              <p className="text-gray-500">
                Over the years, UCDC has produced numerous successful candidates
                in various competitive examinations including UPSC, GPSC, CDS,
                and IELTS. Our alumni are serving in prestigious positions
                across different sectors, making us proud of our contribution to
                nation-building.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="UCDC Building"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Faculty</h3>
                <p className="text-gray-500">
                  Our team consists of experienced educators, subject matter
                  experts, and successful civil servants who provide
                  personalized guidance to students.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Proven Track Record</h3>
                <p className="text-gray-500">
                  UCDC has a consistent record of producing successful
                  candidates in various competitive examinations with top ranks.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Comprehensive Approach
                </h3>
                <p className="text-gray-500">
                  We follow a holistic approach to education that focuses on
                  conceptual clarity, application skills, and exam strategies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chairman's Message Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">
            Chairman's Message
          </h2>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Chairman"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 order-1 lg:order-2">
              <blockquote className="border-l-4 border-red-600 pl-4 italic text-gray-500">
                "Education is the most powerful weapon which you can use to
                change the world. At UCDC, we are committed to providing quality
                education that empowers our students to achieve their dreams and
                contribute to society."
              </blockquote>
              <p className="text-gray-500">Dear Students and Parents,</p>
              <p className="text-gray-500">
                It gives me immense pleasure to welcome you to Umiya Career
                Development Center (UCDC). In today's competitive world, quality
                education and proper guidance are essential for success. At
                UCDC, we strive to provide both through our comprehensive
                training programs and state-of-the-art facilities.
              </p>
              <p className="text-gray-500">
                Our mission is to nurture talent and create future leaders who
                will contribute to the development of our nation. We believe in
                the potential of every student and are committed to helping them
                realize their dreams through hard work, dedication, and
                perseverance.
              </p>
              <div className="mt-4">
                <p className="font-semibold">Warm Regards,</p>
                <p>Chairman, UCDC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">
            Vision & Mission
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-gray-500 mb-4">
                  To be the premier institution for competitive exam
                  preparation, recognized for excellence in education,
                  innovation in teaching methodologies, and consistent results.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 mt-2 mr-2"></span>
                    <span className="text-gray-500">
                      Create a center of excellence for competitive exam
                      preparation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 mt-2 mr-2"></span>
                    <span className="text-gray-500">
                      Empower students to achieve their career goals
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 mt-2 mr-2"></span>
                    <span className="text-gray-500">
                      Foster a culture of continuous learning and improvement
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 mt-2 mr-2"></span>
                    <span className="text-gray-500">
                      Contribute to nation-building by producing capable civil
                      servants
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                    <Building className="h-6 w-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-gray-500 mb-4">
                  To provide comprehensive, quality education and training that
                  prepares students for competitive examinations and develops
                  their overall personality.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 mt-2 mr-2"></span>
                    <span className="text-gray-500">
                      Deliver high-quality education through experienced faculty
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 mt-2 mr-2"></span>
                    <span className="text-gray-500">
                      Provide a conducive learning environment with modern
                      facilities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 mt-2 mr-2"></span>
                    <span className="text-gray-500">
                      Develop not just academic knowledge but also soft skills
                      and ethical values
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 mt-2 mr-2"></span>
                    <span className="text-gray-500">
                      Constantly update teaching methodologies and study
                      materials
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 mt-2 mr-2"></span>
                    <span className="text-gray-500">
                      Provide personalized attention to each student
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold mb-4">Our Core Values</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <h4 className="font-semibold text-red-600">Excellence</h4>
                  <p className="text-sm text-gray-500">
                    Striving for the highest standards in everything we do
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <h4 className="font-semibold text-red-600">Integrity</h4>
                  <p className="text-sm text-gray-500">
                    Maintaining honesty and ethical conduct at all times
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <h4 className="font-semibold text-red-600">Innovation</h4>
                  <p className="text-sm text-gray-500">
                    Embracing new ideas and approaches to education
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <h4 className="font-semibold text-red-600">Empathy</h4>
                  <p className="text-sm text-gray-500">
                    Understanding and addressing the needs of our students
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Section */}
      <CommitteeSection />

      {/* Umiya Mataji Sansthan Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">
            Shree Umiya Mataji Sansthan
          </h2>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <p className="text-gray-500">
                Shree Umiya Mataji Sansthan is a renowned religious and social
                organization dedicated to the worship of Goddess Umiya, the
                family deity of the Kadva Patidar community. The organization
                has played a significant role in promoting education, social
                welfare, and community development.
              </p>
              <p className="text-gray-500">
                The Sansthan has established various educational institutions,
                including UCDC, to empower the youth with quality education and
                skills. Through its initiatives, the Sansthan aims to preserve
                cultural heritage while embracing modern education and values.
              </p>
              <p className="text-gray-500">
                The Umiya Mataji Temple, located in Unjha, Gujarat, is a
                significant pilgrimage site and serves as the spiritual center
                for the community. The Sansthan organizes various religious and
                cultural events throughout the year to promote unity and
                spiritual growth among its followers.
              </p>
              <div className="pt-4">
                <Link href="https://umiyamataji.org" target="_blank">
                  <Button variant="outline">
                    Visit Umiya Mataji Sansthan Website
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Umiya Mataji Temple"
                alt="Umiya Mataji Temple"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sardardham Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">
            About Sardardham
          </h2>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Sardardham"
                alt="Sardardham"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 order-1 lg:order-2">
              <p className="text-gray-500">
                Sardardham is a visionary project initiated by the Patidar
                community to create a comprehensive educational and cultural
                complex. Located in Ahmedabad, Gujarat, Sardardham aims to
                provide quality education, skill development, and career
                guidance to the youth.
              </p>
              <p className="text-gray-500">
                The organization focuses on holistic development through various
                initiatives including educational institutions, career
                development centers, and cultural activities. UCDC is proud to
                be associated with Sardardham and shares its vision of
                empowering the youth through education.
              </p>
              <p className="text-gray-500">
                Sardardham's state-of-the-art campus includes educational
                facilities, hostels, sports complexes, and cultural centers. The
                organization also conducts various programs for community
                development, women empowerment, and social welfare.
              </p>
              <div className="pt-4">
                <Link href="https://sardardham.org" target="_blank">
                  <Button variant="outline">Visit Sardardham Website</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-red-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Join the UCDC Family
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-6">
            Take the first step towards a successful career. Apply for our
            entrance test today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/student-corner/entrance-test">
              <Button className="bg-red-600 hover:bg-red-700">
                Apply for Entrance Test
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
