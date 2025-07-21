"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Achiever {
  _id: string;
  name: string;
  exam: string;
  rank: string;
  year: number;
  image: string;
  testimonial?: string;
}

export default function AchieversSection() {
  const [achievers, setAchievers] = useState<Achiever[]>([]);

  useEffect(() => {
    fetchAchievers();
  }, []);

  const fetchAchievers = async () => {
    try {
      const res = await fetch("/api/achievers");
      const data = await res.json();
      setAchievers(data.filter((achiever: Achiever) => achiever));
    } catch (error) {
      console.error("Failed to fetch achievers:", error);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Achievers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Celebrating the success stories of our students who have achieved
            excellence in various competitive exams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievers.map((achiever) => (
            <Card
              key={achiever._id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={achiever.image || "/placeholder.svg"}
                    alt={achiever.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{achiever.name}</h3>
                    <p className="text-orange-600 font-medium">
                      {achiever.exam} - Rank {achiever.rank}
                    </p>
                    <p className="text-sm text-gray-500">{achiever.year}</p>
                  </div>
                </div>
                {achiever.testimonial && (
                  <p className="text-gray-600 text-sm italic">
                    "{achiever.testimonial}"
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
