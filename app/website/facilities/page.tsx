"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  BookOpen,
  Users,
  Monitor,
  UtensilsCrossed,
  Bed,
  Clock,
  Phone,
} from "lucide-react";

interface Facility {
  _id: string;
  type: string;
  title: string;
  description: string;
  features: string[];
  images: { url: string; alt: string }[];
  capacity?: string;
  timings?: string;
  contact?: string;
}

const facilityIcons = {
  accommodation: Bed,
  library: BookOpen,
  classroom: Users,
  "computer-lab": Monitor,
  canteen: UtensilsCrossed,
};

const facilityColors = {
  accommodation: "bg-blue-500",
  library: "bg-green-500",
  classroom: "bg-purple-500",
  "computer-lab": "bg-orange-500",
  canteen: "bg-red-500",
};

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await fetch("/api/facilities");
      const data = await response.json();
      if (data.success) {
        setFacilities(data.data);
      }
    } catch (error) {
      console.error("Error fetching facilities:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupedFacilities = facilities.reduce((acc, facility) => {
    if (!acc[facility.type]) {
      acc[facility.type] = [];
    }
    acc[facility.type].push(facility);
    return acc;
  }, {} as Record<string, Facility[]>);

  const renderFacilitySection = (type: string, facilityList: Facility[]) => {
    const Icon = facilityIcons[type as keyof typeof facilityIcons] || Building2;
    const colorClass =
      facilityColors[type as keyof typeof facilityColors] || "bg-gray-500";

    return (
      <div className="space-y-6">
        {facilityList.map((facility) => (
          <Card key={facility._id} className="overflow-hidden">
            <div className="md:flex">
              {/* Image Gallery */}
              <div className="md:w-1/2">
                {facility.images && facility.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {facility.images.slice(0, 4).map((image, index) => (
                      <div
                        key={index}
                        className="relative h-32 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={
                            image.url || "/placeholder.svg?height=128&width=200"
                          }
                          alt={image.alt || facility.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 bg-gray-100 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="md:w-1/2 p-6">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {facility.title}
                      </CardTitle>
                      <CardDescription className="capitalize">
                        {type.replace("-", " ")}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <p className="text-gray-600 mb-4">{facility.description}</p>

                  {/* Features */}
                  {facility.features && facility.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Features:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {facility.features.map((feature, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  <div className="space-y-2">
                    {facility.capacity && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>
                          <strong>Capacity:</strong> {facility.capacity}
                        </span>
                      </div>
                    )}
                    {facility.timings && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>
                          <strong>Timings:</strong> {facility.timings}
                        </span>
                      </div>
                    )}
                    {facility.contact && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>
                          <strong>Contact:</strong> {facility.contact}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading facilities...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Facilities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our world-class facilities designed to provide the best
            learning environment for our students.
          </p>
        </div>

        {/* Facilities Tabs */}
        <Tabs defaultValue="accommodation" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger
              value="accommodation"
              className="flex items-center space-x-2"
            >
              <Bed className="w-4 h-4" />
              <span className="hidden sm:inline">Accommodation</span>
            </TabsTrigger>
            <TabsTrigger
              value="library"
              className="flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Library</span>
            </TabsTrigger>
            <TabsTrigger
              value="classroom"
              className="flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Classroom</span>
            </TabsTrigger>
            <TabsTrigger
              value="computer-lab"
              className="flex items-center space-x-2"
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">Computer Lab</span>
            </TabsTrigger>
            <TabsTrigger
              value="canteen"
              className="flex items-center space-x-2"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span className="hidden sm:inline">Canteen</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accommodation">
            {groupedFacilities.accommodation ? (
              renderFacilitySection(
                "accommodation",
                groupedFacilities.accommodation
              )
            ) : (
              <div className="text-center py-12">
                <Bed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Accommodation Details Available
                </h3>
                <p className="text-gray-600">
                  Accommodation information will be updated soon.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="library">
            {groupedFacilities.library ? (
              renderFacilitySection("library", groupedFacilities.library)
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Library Details Available
                </h3>
                <p className="text-gray-600">
                  Library information will be updated soon.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="classroom">
            {groupedFacilities.classroom ? (
              renderFacilitySection("classroom", groupedFacilities.classroom)
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Classroom Details Available
                </h3>
                <p className="text-gray-600">
                  Classroom information will be updated soon.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="computer-lab">
            {groupedFacilities["computer-lab"] ? (
              renderFacilitySection(
                "computer-lab",
                groupedFacilities["computer-lab"]
              )
            ) : (
              <div className="text-center py-12">
                <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Computer Lab Details Available
                </h3>
                <p className="text-gray-600">
                  Computer lab information will be updated soon.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="canteen">
            {groupedFacilities.canteen ? (
              renderFacilitySection("canteen", groupedFacilities.canteen)
            ) : (
              <div className="text-center py-12">
                <UtensilsCrossed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Canteen Details Available
                </h3>
                <p className="text-gray-600">
                  Canteen information will be updated soon.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
