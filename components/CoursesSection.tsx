"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  fees: number;
  image: string;
  features: string[];
}

export default function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const categories = ["all", "upsc", "gpsc", "ielts", "cds", "other"];

  console.log(
    Object.keys(courses).filter(
      (course) => course === activeTab && courses[activeTab]
    )
  );

  const filteredCourses = courses
    ? activeTab === "all"
      ? Object.values(courses).flat()
      : courses[activeTab]
    : [];

  console.log(filteredCourses);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive training programs designed to help you succeed in
            competitive exams
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="capitalize"
              >
                {category === "all" ? "All Courses" : category?.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses &&
                filteredCourses?.map((course) => (
                  <Card
                    key={course._id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-orange-600">
                        {course.category?.toUpperCase()}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Duration:
                          </span>
                          <span className="text-sm font-medium">
                            {course.duration}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Fees:</span>
                          <span className="text-sm font-medium">
                            ₹{course.fees}
                          </span>
                        </div>
                      </div>
                      {course.features && course.features.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">
                            Features:
                          </h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {course.features
                              .slice(0, 3)
                              .map((feature, index) => (
                                <li key={index}>• {feature}</li>
                              ))}
                          </ul>
                        </div>
                      )}
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        Enroll Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
