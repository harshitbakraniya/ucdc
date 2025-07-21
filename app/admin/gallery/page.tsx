"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  fetchGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "@/lib/redux/slices/gallerySlice";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react";
import Image from "next/image";

interface GalleryFormData {
  title: string;
  description: string;
  image: string;
  category: string;
}

export default function GalleryAdminPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.gallery);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<GalleryFormData>({
    title: "",
    description: "",
    image: "",
    category: "event",
  });

  const categories = [
    { value: "event", label: "Event" },
    { value: "classroom", label: "Classroom" },
    { value: "achievement", label: "Achievement" },
    { value: "facility", label: "Facility" },
    { value: "other", label: "Other" },
  ];

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem) {
      await dispatch(
        updateGalleryItem({ id: editingItem._id, data: formData })
      );
    } else {
      await dispatch(createGalleryItem(formData));
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      image: item.image || "",
      category: item.category || "event",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this gallery item?")) {
      await dispatch(deleteGalleryItem(id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      category: "event",
    });
    setEditingItem(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "event":
        return "bg-blue-100 text-blue-800";
      case "classroom":
        return "bg-green-100 text-green-800";
      case "achievement":
        return "bg-orange-100 text-orange-800";
      case "facility":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <p className="text-gray-600">Manage gallery images and categories</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Image
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{items.length}</div>
          </CardContent>
        </Card>
        {categories.map((cat) => (
          <Card key={cat.value}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{cat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {items.filter((item) => item.category === cat.value).length}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gallery Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
          <CardDescription>
            Manage all gallery images and their categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map((item) => (
                <Card key={item._id} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <Badge
                      className={`absolute top-2 left-2 ${getCategoryColor(
                        item.category
                      )}`}
                    >
                      {item.category.charAt(0).toUpperCase() +
                        item.category.slice(1)}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm mb-1 truncate">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}
            </DialogTitle>
            <DialogDescription>
              {editingItem
                ? "Update gallery item information"
                : "Add a new image to the gallery"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter image title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter image description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL *</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
                required
              />
              {formData.image && (
                <div className="relative aspect-video w-full mt-2">
                  <Image
                    src={formData.image || "/placeholder.svg"}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingItem ? "Update Item" : "Add Item"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
