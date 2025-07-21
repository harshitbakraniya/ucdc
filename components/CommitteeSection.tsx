"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface CommitteeMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  bio?: string;
}

export default function CommitteeSection() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);

  useEffect(() => {
    fetchCommittee();
  }, []);

  const fetchCommittee = async () => {
    try {
      const res = await fetch("/api/committee");
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error("Failed to fetch committee:", error);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Management Committee</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our dedicated leadership team committed to providing quality
            education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <Card
              key={member._id}
              className="text-center overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-xl mb-2">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-4">
                  {member.position}
                </p>
                {member.bio && (
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
