import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import type { AlumniMember } from "@/redux/slices/alumniSlice";

interface AlumniCardProps {
  alumni: AlumniMember;
}

export function AlumniCard({ alumni }: AlumniCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-64 w-full">
        <Image
          src={alumni.image || "/placeholder.svg"}
          alt={alumni.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-1">{alumni.name}</h3>
        <p className="text-orange-600 font-medium mb-2">{alumni.achievement}</p>
        <div className="text-sm text-gray-500 mb-4">
          <p>Batch: {alumni.batch}</p>
          <p>Course: {alumni.course}</p>
        </div>
        <p className="text-gray-600 italic mb-4 flex-1">
          "{alumni.testimonial}"
        </p>
        <div className="flex space-x-3">
          {alumni.socialMedia.linkedin && (
            <Link
              href={alumni.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5 text-gray-500 hover:text-blue-600" />
            </Link>
          )}
          {alumni.socialMedia.twitter && (
            <Link
              href={alumni.socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5 text-gray-500 hover:text-blue-400" />
            </Link>
          )}
          {alumni.socialMedia.facebook && (
            <Link
              href={alumni.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-5 w-5 text-gray-500 hover:text-blue-800" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
