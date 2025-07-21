"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, BookOpen, ImageIcon, Award, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    banners: 0,
    achievers: 0,
    courses: 0,
    gallery: 0,
    alumni: 0,
    contacts: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [banners, achievers, courses, gallery, alumni, contacts] =
        await Promise.all([
          fetch("/api/banners").then((res) => res.json()),
          fetch("/api/achievers").then((res) => res.json()),
          fetch("/api/courses").then((res) => res.json()),
          fetch("/api/gallery").then((res) => res.json()),
          fetch("/api/alumni").then((res) => res.json()),
          fetch("/api/contact").then((res) => res.json()),
        ]);

      setStats({
        banners: banners.length || 0,
        achievers: achievers.length || 0,
        courses: courses.length || 0,
        gallery: gallery.length || 0,
        alumni: alumni.length || 0,
        contacts: contacts.length || 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const statCards = [
    {
      title: "Total Banners",
      value: stats.banners,
      description: "Active homepage banners",
      icon: ImageIcon,
      color: "text-blue-600",
    },
    {
      title: "Achievers",
      value: stats.achievers,
      description: "Student achievers and toppers",
      icon: Award,
      color: "text-green-600",
    },
    {
      title: "Courses",
      value: stats.courses,
      description: "Available courses",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      title: "Gallery Images",
      value: stats.gallery,
      description: "Images in gallery",
      icon: ImageIcon,
      color: "text-orange-600",
    },
    {
      title: "Alumni",
      value: stats.alumni,
      description: "Registered alumni",
      icon: Users,
      color: "text-indigo-600",
    },
    {
      title: "Contact Messages",
      value: stats.contacts,
      description: "Received messages",
      icon: MessageSquare,
      color: "text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to UCDC Admin Panel</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates across all sections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New achiever added</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Banner updated</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New course added</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
                Add New Banner
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
                Add New Course
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
                View Contact Messages
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
                Approve Alumni
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
