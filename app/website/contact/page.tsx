"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

// This would come from your CMS in a real implementation
const branches = [
  {
    id: 1,
    name: "UCDC Sola (Main Campus)",
    address: "Near Sardardham, S.G. Highway, Ahmedabad, Gujarat, India",
    phone: "+91 98765 43210",
    email: "info@ucdc.co.in",
    timing: "Monday to Saturday: 9:00 AM - 6:00 PM",
    mapUrl: "https://maps.google.com",
  },
  {
    id: 2,
    name: "UCDC City Center",
    address: "Near Gujarat University, Navrangpura, Ahmedabad, Gujarat, India",
    phone: "+91 98765 43211",
    email: "city@ucdc.co.in",
    timing: "Monday to Saturday: 9:00 AM - 6:00 PM",
    mapUrl: "https://maps.google.com",
  },
  {
    id: 3,
    name: "UCDC Gandhinagar",
    address: "Sector 23, Near Govt. Offices, Gandhinagar, Gujarat, India",
    phone: "+91 98765 43212",
    email: "gandhinagar@ucdc.co.in",
    timing: "Monday to Saturday: 9:00 AM - 6:00 PM",
    mapUrl: "https://maps.google.com",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    branch: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the data to your backend
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      branch: "",
    });
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-red-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Contact Us
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get in touch with us for any inquiries about our courses,
              admissions, or facilities
            </p>
          </div>
        </div>
      </section>

      {/* Map and Contact Form Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Map */}
            <div className="order-2 lg:order-1">
              <div className="rounded-lg overflow-hidden h-[400px] mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.6979157244417!2d72.5006!3d23.0365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAyJzExLjQiTiA3MsKwMzAnMDIuMiJF!5e0!3m2!1sen!2sin!4v1651825200000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="UCDC Location"
                ></iframe>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Our Branches</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {branches.map((branch) => (
                    <Card key={branch.id}>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-2">
                          {branch.name}
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-red-600 mr-2 mt-0.5 shrink-0" />
                            <span>{branch.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-red-600 mr-2 shrink-0" />
                            <Link
                              href={`tel:${branch.phone}`}
                              className="hover:underline"
                            >
                              {branch.phone}
                            </Link>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-red-600 mr-2 shrink-0" />
                            <Link
                              href={`mailto:${branch.email}`}
                              className="hover:underline"
                            >
                              {branch.email}
                            </Link>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-red-600 mr-2 shrink-0" />
                            <span>{branch.timing}</span>
                          </div>
                          <div>
                            <Link
                              href={branch.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-600 hover:underline flex items-center mt-2"
                            >
                              View on Map{" "}
                              <ExternalLink className="h-4 w-4 ml-1" />
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch">Select Branch</Label>
                      <Select
                        value={formData.branch}
                        onValueChange={(value) =>
                          handleSelectChange("branch", value)
                        }
                      >
                        <SelectTrigger id="branch">
                          <SelectValue placeholder="Select a branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem
                              key={branch.id}
                              value={branch.id.toString()}
                            >
                              {branch.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter the subject of your message"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                        rows={5}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="mt-8 space-y-6">
                <h2 className="text-2xl font-bold">Connect With Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <Phone className="h-6 w-6 text-red-600" />
                      </div>
                      <h3 className="font-bold mb-2">Call Us</h3>
                      <Link
                        href="tel:+919876543210"
                        className="text-red-600 hover:underline"
                      >
                        +91 98765 43210
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <Mail className="h-6 w-6 text-red-600" />
                      </div>
                      <h3 className="font-bold mb-2">Email Us</h3>
                      <Link
                        href="mailto:info@ucdc.co.in"
                        className="text-red-600 hover:underline"
                      >
                        info@ucdc.co.in
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <Clock className="h-6 w-6 text-red-600" />
                      </div>
                      <h3 className="font-bold mb-2">Working Hours</h3>
                      <p className="text-sm">Monday to Saturday</p>
                      <p className="text-sm">9:00 AM - 6:00 PM</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[700px] mx-auto text-gray-500">
              Find quick answers to common questions about contacting and
              visiting UCDC
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">
                  How can I schedule a campus visit?
                </h3>
                <p className="text-gray-500">
                  You can schedule a campus visit by calling our main office at
                  +91 98765 43210 or by filling out the contact form on this
                  page. We recommend scheduling your visit at least 2-3 days in
                  advance.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">
                  Is parking available at UCDC?
                </h3>
                <p className="text-gray-500">
                  Yes, we have ample parking space available at all our
                  branches. Visitors can park their vehicles free of charge in
                  the designated parking areas.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">
                  How can I get admission information?
                </h3>
                <p className="text-gray-500">
                  For admission information, you can contact our admission cell
                  directly at +91 98765 43215 or email at admissions@ucdc.co.in.
                  You can also visit any of our branches during working hours.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">
                  Do you offer virtual counseling sessions?
                </h3>
                <p className="text-gray-500">
                  Yes, we offer virtual counseling sessions for students who
                  cannot visit our campus in person. You can schedule a virtual
                  session by contacting our counseling department.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Link href="/faq">
              <Button variant="outline">View All FAQs</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
