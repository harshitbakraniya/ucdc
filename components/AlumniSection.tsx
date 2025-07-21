"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchAlumni } from "@/lib/redux/slices/alumniSlice";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AlumniSection() {
  const dispatch = useAppDispatch();
  const { alumni, loading } = useAppSelector((state) => state.alumni);
  const [activeTab, setActiveTab] = useState("all");

  console.log(alumni);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    batch: "",
    currentPosition: "",
    company: "",
    testimonial: "",
  });

  useEffect(() => {
    dispatch(fetchAlumni());
  }, [dispatch]);

  const approvedAlumni = alumni.filter((alum) => alum.isApproved);
  const courses = ["all", "UPSC", "GPSC", "IELTS", "CDS"];
  const filteredAlumni =
    activeTab === "all"
      ? approvedAlumni
      : approvedAlumni.filter((alum) => alum.course === activeTab);

  console.log(filteredAlumni, approvedAlumni, activeTab);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          isApproved: false,
          isActive: true,
        }),
      });

      if (res.ok) {
        alert(
          "Registration submitted successfully! We'll review and approve it soon."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          course: "",
          batch: "",
          currentPosition: "",
          company: "",
          testimonial: "",
        });
      }
    } catch (error) {
      console.error("Failed to submit registration:", error);
      alert("Failed to submit registration. Please try again.");
    }
  };

  const getCourseColor = (course: string) => {
    switch (course) {
      case "UPSC":
        return "bg-blue-100 text-blue-800";
      case "GPSC":
        return "bg-green-100 text-green-800";
      case "IELTS":
        return "bg-purple-100 text-purple-800";
      case "CDS":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Alumni</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Meet our successful alumni who have made their mark in various
            fields
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700">
                Register as Alumni
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Alumni Registration</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course *</Label>
                    <Select
                      value={formData.course}
                      onValueChange={(value) =>
                        setFormData({ ...formData, course: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UPSC">UPSC</SelectItem>
                        <SelectItem value="GPSC">GPSC</SelectItem>
                        <SelectItem value="IELTS">IELTS</SelectItem>
                        <SelectItem value="CDS">CDS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batch">Batch Year *</Label>
                    <Input
                      id="batch"
                      value={formData.batch}
                      onChange={(e) =>
                        setFormData({ ...formData, batch: e.target.value })
                      }
                      placeholder="2020-21"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentPosition">Current Position</Label>
                  <Input
                    id="currentPosition"
                    value={formData.currentPosition}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentPosition: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonial">Testimonial (Optional)</Label>
                  <Textarea
                    id="testimonial"
                    value={formData.testimonial}
                    onChange={(e) =>
                      setFormData({ ...formData, testimonial: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Submit Registration
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {courses.map((course) => (
              <TabsTrigger key={course} value={course} className="capitalize">
                {course === "all" ? "All" : course}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAlumni.map((alum) => (
                  <Card
                    key={alum._id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Image
                          src={alum.image || "/placeholder.svg"}
                          alt={alum.name}
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{alum.name}</h3>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getCourseColor(alum.course)}>
                              {alum.course}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {alum.batch}
                            </span>
                          </div>
                          {alum.currentPosition && (
                            <p className="text-sm text-gray-600">
                              {alum.currentPosition}
                            </p>
                          )}
                          {alum.company && (
                            <p className="text-sm text-gray-500">
                              {alum.company}
                            </p>
                          )}
                        </div>
                      </div>
                      {alum.testimonial && (
                        <p className="text-gray-600 text-sm italic line-clamp-3">
                          "{alum.testimonial}"
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
