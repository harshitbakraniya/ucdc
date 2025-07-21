"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StudentCornerItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
  createdAt: string;
}

export default function StudentCornerSection() {
  const [items, setItems] = useState<StudentCornerItem[]>([]);

  useEffect(() => {
    fetchStudentCorner();
  }, []);

  const fetchStudentCorner = async () => {
    try {
      const res = await fetch("/api/student-corner");
      const data = await res.json();
      setItems(data.slice(0, 6)); // Show only latest 6 items
    } catch (error) {
      console.error("Failed to fetch student corner:", error);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "announcement":
        return "bg-blue-100 text-blue-800";
      case "event":
        return "bg-green-100 text-green-800";
      case "news":
        return "bg-purple-100 text-purple-800";
      case "achievement":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Student Corner</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest announcements, events, and achievements
            from UCDC
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card
              key={item._id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <Badge
                  className={`absolute top-4 left-4 ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <p className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
