"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Banner {
  _id?: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  isActive: boolean;
  order: number;
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState<Banner>({
    title: "",
    description: "",
    image: "",
    link: "",
    isActive: true,
    order: 1,
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/banners");
      const data = await res.json();
      setBanners(data);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingBanner
        ? `/api/banners/${editingBanner._id}`
        : "/api/banners";
      const method = editingBanner ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchBanners();
        resetForm();
      }
    } catch (error) {
      console.error("Failed to save banner:", error);
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData(banner);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      try {
        const res = await fetch(`/api/banners/${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchBanners();
        }
      } catch (error) {
        console.error("Failed to delete banner:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      link: "",
      isActive: true,
      order: 1,
    });
    setEditingBanner(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Banner Management</h1>
          <p className="text-muted-foreground">Manage homepage banners</p>
        </div>
        <Button
          onClick={() => setIsEditing(true)}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Banner
        </Button>
      </div>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingBanner ? "Edit Banner" : "Add New Banner"}
            </CardTitle>
            <CardDescription>Fill in the banner details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="link">Link (Optional)</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: Number.parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isActive: checked })
                    }
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {editingBanner ? "Update" : "Create"} Banner
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {banners.map((banner) => (
          <Card key={banner._id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{banner.title}</h3>
                  <p className="text-muted-foreground mt-1">
                    {banner.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>Order: {banner.order}</span>
                    <span
                      className={
                        banner.isActive ? "text-green-600" : "text-red-600"
                      }
                    >
                      {banner.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(banner)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(banner._id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
