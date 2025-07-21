"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitAlumniRegistration } from "@/lib/api/alumniService";
import { useToast } from "@/components/ui/use-toast";

export function AlumniRegistrationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    batch: "",
    course: "",
    achievement: "",
    currentOrganization: "",
    testimonial: "",
    image: "/placeholder.svg?height=300&width=300&text=Alumni",
    socialMedia: {
      linkedin: "",
      twitter: "",
      facebook: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value,
      },
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitAlumniRegistration(formData);

      if (result.success) {
        toast({
          title: "Registration Successful",
          description:
            "Thank you for submitting your information! We'll review and add you to our alumni network.",
          variant: "default",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          batch: "",
          course: "",
          achievement: "",
          currentOrganization: "",
          testimonial: "",
          image: "/placeholder.svg?height=300&width=300&text=Alumni",
          socialMedia: {
            linkedin: "",
            twitter: "",
            facebook: "",
          },
        });
      } else {
        toast({
          title: "Registration Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold mb-6">Register as an Alumni</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batch">Batch Year</Label>
            <Select
              value={formData.batch}
              onValueChange={(value) => handleSelectChange("batch", value)}
            >
              <SelectTrigger id="batch">
                <SelectValue placeholder="Select your batch year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022-23">2022-23</SelectItem>
                <SelectItem value="2021-22">2021-22</SelectItem>
                <SelectItem value="2020-21">2020-21</SelectItem>
                <SelectItem value="2019-20">2019-20</SelectItem>
                <SelectItem value="2018-19">2018-19</SelectItem>
                <SelectItem value="2017-18">2017-18</SelectItem>
                <SelectItem value="2016-17">2016-17</SelectItem>
                <SelectItem value="2015-16">2015-16</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Course Attended</Label>
            <Select
              value={formData.course}
              onValueChange={(value) => handleSelectChange("course", value)}
            >
              <SelectTrigger id="course">
                <SelectValue placeholder="Select your course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UPSC">UPSC</SelectItem>
                <SelectItem value="GPSC">GPSC</SelectItem>
                <SelectItem value="IELTS">IELTS</SelectItem>
                <SelectItem value="CDS">CDS</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="achievement">Current Achievement</Label>
            <Input
              id="achievement"
              name="achievement"
              value={formData.achievement}
              onChange={handleChange}
              placeholder="E.g., IAS Officer, Deputy Collector, etc."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentOrganization">Current Organization</Label>
            <Input
              id="currentOrganization"
              name="currentOrganization"
              value={formData.currentOrganization}
              onChange={handleChange}
              placeholder="Enter your current organization"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="testimonial">Your Experience at UCDC</Label>
          <Textarea
            id="testimonial"
            name="testimonial"
            value={formData.testimonial}
            onChange={handleChange}
            placeholder="Share your experience and how UCDC helped you achieve your goals"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Social Media Links (Optional)</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-sm">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={formData.socialMedia.linkedin}
                onChange={handleSocialMediaChange}
                placeholder="LinkedIn profile URL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter" className="text-sm">
                Twitter
              </Label>
              <Input
                id="twitter"
                name="twitter"
                value={formData.socialMedia.twitter}
                onChange={handleSocialMediaChange}
                placeholder="Twitter profile URL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-sm">
                Facebook
              </Label>
              <Input
                id="facebook"
                name="facebook"
                value={formData.socialMedia.facebook}
                onChange={handleSocialMediaChange}
                placeholder="Facebook profile URL"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Information"}
        </Button>
      </form>
    </div>
  );
}
