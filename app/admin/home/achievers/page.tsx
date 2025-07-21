"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  fetchAchievers,
  createAchiever,
  updateAchiever,
  deleteAchiever,
} from "@/lib/redux/slices/achieverSlice";
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

export default function AchieversPage() {
  const dispatch = useAppDispatch();
  const { achievers, loading } = useAppSelector((state) => state.achievers);

  const [isEditing, setIsEditing] = useState(false);
  const [editingAchiever, setEditingAchiever] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    exam: "",
    rank: "",
    year: new Date().getFullYear(),
    image: "",
    testimonial: "",
    isActive: true,
  });

  useEffect(() => {
    dispatch(fetchAchievers());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAchiever) {
      dispatch(updateAchiever({ id: editingAchiever._id, data: formData }));
    } else {
      dispatch(createAchiever(formData));
    }

    resetForm();
  };

  const handleEdit = (achiever: any) => {
    setEditingAchiever(achiever);
    setFormData(achiever);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this achiever?")) {
      dispatch(deleteAchiever(id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      exam: "",
      rank: "",
      year: new Date().getFullYear(),
      image: "",
      testimonial: "",
      isActive: true,
    });
    setEditingAchiever(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Achievers Management</h1>
          <p className="text-muted-foreground">
            Manage student achievers and toppers
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(true)}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Achiever
        </Button>
      </div>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingAchiever ? "Edit Achiever" : "Add New Achiever"}
            </CardTitle>
            <CardDescription>Fill in the achiever details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
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
                  <Label htmlFor="exam">Exam</Label>
                  <Input
                    id="exam"
                    value={formData.exam}
                    onChange={(e) =>
                      setFormData({ ...formData, exam: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rank">Rank</Label>
                  <Input
                    id="rank"
                    value={formData.rank}
                    onChange={(e) =>
                      setFormData({ ...formData, rank: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: Number.parseInt(e.target.value),
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

              <div className="space-y-2">
                <Label htmlFor="testimonial">Testimonial</Label>
                <Textarea
                  id="testimonial"
                  value={formData.testimonial}
                  onChange={(e) =>
                    setFormData({ ...formData, testimonial: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {editingAchiever ? "Update" : "Create"} Achiever
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
        {achievers.map((achiever) => (
          <Card key={achiever._id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{achiever.name}</h3>
                  <p className="text-muted-foreground">
                    {achiever.rank} in {achiever.exam} - {achiever.year}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span
                      className={
                        achiever.isActive ? "text-green-600" : "text-red-600"
                      }
                    >
                      {achiever.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(achiever)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(achiever._id!)}
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
