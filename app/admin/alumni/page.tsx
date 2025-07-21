"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  fetchAlumni,
  createAlumni,
  updateAlumni,
  deleteAlumni,
} from "@/lib/redux/slices/alumniSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

interface AlumniFormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  batch: string;
  currentPosition: string;
  company: string;
  image: string;
  testimonial: string;
  isApproved: boolean;
  isActive: boolean;
}

export default function AlumniAdminPage() {
  const dispatch = useAppDispatch();
  const { alumni, loading, error } = useAppSelector((state) => state.alumni);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAlumni, setEditingAlumni] = useState<any>(null);
  const [formData, setFormData] = useState<AlumniFormData>({
    name: "",
    email: "",
    phone: "",
    course: "",
    batch: "",
    currentPosition: "",
    company: "",
    image: "",
    testimonial: "",
    isApproved: false,
    isActive: true,
  });

  useEffect(() => {
    dispatch(fetchAlumni());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAlumni) {
      await dispatch(updateAlumni({ id: editingAlumni._id, data: formData }));
    } else {
      await dispatch(createAlumni(formData));
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (alumni: any) => {
    setEditingAlumni(alumni);
    setFormData({
      name: alumni.name || "",
      email: alumni.email || "",
      phone: alumni.phone || "",
      course: alumni.course || "",
      batch: alumni.batch || "",
      currentPosition: alumni.currentPosition || "",
      company: alumni.company || "",
      image: alumni.image || "",
      testimonial: alumni.testimonial || "",
      isApproved: alumni.isApproved || false,
      isActive: alumni.isActive !== undefined ? alumni.isActive : true,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this alumni?")) {
      await dispatch(deleteAlumni(id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "",
      batch: "",
      currentPosition: "",
      company: "",
      image: "",
      testimonial: "",
      isApproved: false,
      isActive: true,
    });
    setEditingAlumni(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const approvedAlumni = alumni.filter((a) => a.isApproved);
  const pendingAlumni = alumni.filter((a) => !a.isApproved);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Alumni Management</h1>
          <p className="text-gray-600">
            Manage alumni profiles and registrations
          </p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Alumni
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alumni.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {approvedAlumni.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {pendingAlumni.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alumni Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alumni List</CardTitle>
          <CardDescription>
            Manage all alumni registrations and profiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alumni.map((alum) => (
                  <TableRow key={alum._id}>
                    <TableCell>
                      <Image
                        src={alum.image || "/placeholder.svg"}
                        alt={alum.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{alum.name}</TableCell>
                    <TableCell>{alum.course}</TableCell>
                    <TableCell>{alum.batch}</TableCell>
                    <TableCell>{alum.currentPosition || "N/A"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={alum.isApproved ? "default" : "secondary"}
                      >
                        {alum.isApproved ? "Approved" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(alum)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(alum._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingAlumni ? "Edit Alumni" : "Add New Alumni"}
            </DialogTitle>
            <DialogDescription>
              {editingAlumni
                ? "Update alumni information"
                : "Add a new alumni to the database"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="e.g., 2020-21"
                  required
                />
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
                <Label htmlFor="image">Profile Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonial">Testimonial</Label>
              <Textarea
                id="testimonial"
                value={formData.testimonial}
                onChange={(e) =>
                  setFormData({ ...formData, testimonial: e.target.value })
                }
                rows={3}
                placeholder="Alumni testimonial..."
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isApproved"
                  checked={formData.isApproved}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isApproved: checked })
                  }
                />
                <Label htmlFor="isApproved">Approved</Label>
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

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingAlumni ? "Update Alumni" : "Add Alumni"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
