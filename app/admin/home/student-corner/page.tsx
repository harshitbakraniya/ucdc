"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";

// This would come from your database in a real implementation
const initialUpcomingExams = [
  {
    id: 1,
    title: "UPSC Prelims 2025",
    date: "June 15, 2025",
    registrationDeadline: "May 10, 2025",
  },
  {
    id: 2,
    title: "GPSC Class 1 & 2",
    date: "July 22, 2025",
    registrationDeadline: "June 20, 2025",
  },
  {
    id: 3,
    title: "CDS Examination",
    date: "August 8, 2025",
    registrationDeadline: "July 5, 2025",
  },
];

const initialBatchDetails = [
  {
    id: 1,
    title: "UPSC Comprehensive Batch",
    startDate: "July 1, 2025",
    duration: "12 months",
    mode: "Offline & Online",
  },
  {
    id: 2,
    title: "GPSC Fast Track Batch",
    startDate: "June 15, 2025",
    duration: "6 months",
    mode: "Offline",
  },
  {
    id: 3,
    title: "IELTS Weekend Batch",
    startDate: "May 20, 2025",
    duration: "3 months",
    mode: "Offline & Online",
  },
];

const initialStudyMaterials = [
  {
    id: 1,
    title: "UPSC Current Affairs Compilation",
    type: "PDF",
    month: "April 2025",
  },
  {
    id: 2,
    title: "GPSC Model Question Papers",
    type: "PDF",
    month: "March 2025",
  },
  {
    id: 3,
    title: "CDS Mathematics Notes",
    type: "PDF",
    month: "April 2025",
  },
];

type Exam = {
  id: number;
  title: string;
  date: string;
  registrationDeadline: string;
};

type Batch = {
  id: number;
  title: string;
  startDate: string;
  duration: string;
  mode: string;
};

type Material = {
  id: number;
  title: string;
  type: string;
  month: string;
};

export default function StudentCornerPage() {
  const [activeTab, setActiveTab] = useState("exams");
  const [exams, setExams] = useState<Exam[]>(initialUpcomingExams);
  const [batches, setBatches] = useState<Batch[]>(initialBatchDetails);
  const [materials, setMaterials] = useState<Material[]>(initialStudyMaterials);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    setCurrentItem(null);

    if (activeTab === "exams") {
      setFormData({
        title: "",
        date: "",
        registrationDeadline: "",
      });
    } else if (activeTab === "batches") {
      setFormData({
        title: "",
        startDate: "",
        duration: "",
        mode: "",
      });
    } else if (activeTab === "materials") {
      setFormData({
        title: "",
        type: "",
        month: "",
      });
    }

    setIsDialogOpen(true);
  };

  const handleEditItem = (item: any) => {
    setCurrentItem(item);
    setFormData({ ...item });
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      if (activeTab === "exams") {
        setExams((prev) => prev.filter((exam) => exam.id !== id));
      } else if (activeTab === "batches") {
        setBatches((prev) => prev.filter((batch) => batch.id !== id));
      } else if (activeTab === "materials") {
        setMaterials((prev) => prev.filter((material) => material.id !== id));
      }

      setSuccessMessage("Item deleted successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentItem) {
      // Update existing item
      if (activeTab === "exams") {
        setExams((prev) =>
          prev.map((exam) =>
            exam.id === currentItem.id ? { ...exam, ...formData } : exam
          )
        );
      } else if (activeTab === "batches") {
        setBatches((prev) =>
          prev.map((batch) =>
            batch.id === currentItem.id ? { ...batch, ...formData } : batch
          )
        );
      } else if (activeTab === "materials") {
        setMaterials((prev) =>
          prev.map((material) =>
            material.id === currentItem.id
              ? { ...material, ...formData }
              : material
          )
        );
      }

      setSuccessMessage("Item updated successfully");
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        ...formData,
      };

      if (activeTab === "exams") {
        setExams((prev) => [...prev, newItem]);
      } else if (activeTab === "batches") {
        setBatches((prev) => [...prev, newItem]);
      } else if (activeTab === "materials") {
        setMaterials((prev) => [...prev, newItem]);
      }

      setSuccessMessage("Item added successfully");
    }

    setIsDialogOpen(false);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Corner Management"
        description="Manage the student corner section on the home page"
        action={
          <Button onClick={handleAddItem}>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        }
      />

      {successMessage && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="exams" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="exams">Upcoming Exams</TabsTrigger>
          <TabsTrigger value="batches">Batch Details</TabsTrigger>
          <TabsTrigger value="materials">Study Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="exams">
          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Registration Deadline</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>{exam.title}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.registrationDeadline}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEditItem(exam)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteItem(exam.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batches">
          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell>{batch.title}</TableCell>
                      <TableCell>{batch.startDate}</TableCell>
                      <TableCell>{batch.duration}</TableCell>
                      <TableCell>{batch.mode}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEditItem(batch)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteItem(batch.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell>{material.title}</TableCell>
                      <TableCell>{material.type}</TableCell>
                      <TableCell>{material.month}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEditItem(material)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteItem(material.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentItem ? "Edit Item" : "Add New Item"}
            </DialogTitle>
            <DialogDescription>
              {currentItem
                ? "Update the details of the existing item"
                : "Fill in the details to add a new item"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                placeholder="Enter title"
                required
              />
            </div>

            {activeTab === "exams" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    value={formData.date || ""}
                    onChange={handleInputChange}
                    placeholder="Enter date (e.g., June 15, 2025)"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationDeadline">
                    Registration Deadline
                  </Label>
                  <Input
                    id="registrationDeadline"
                    name="registrationDeadline"
                    value={formData.registrationDeadline || ""}
                    onChange={handleInputChange}
                    placeholder="Enter registration deadline"
                    required
                  />
                </div>
              </>
            )}

            {activeTab === "batches" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    value={formData.startDate || ""}
                    onChange={handleInputChange}
                    placeholder="Enter start date"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration || ""}
                    onChange={handleInputChange}
                    placeholder="Enter duration"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mode">Mode</Label>
                  <Input
                    id="mode"
                    name="mode"
                    value={formData.mode || ""}
                    onChange={handleInputChange}
                    placeholder="Enter mode (e.g., Offline & Online)"
                    required
                  />
                </div>
              </>
            )}

            {activeTab === "materials" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    name="type"
                    value={formData.type || ""}
                    onChange={handleInputChange}
                    placeholder="Enter type (e.g., PDF)"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="month">Month</Label>
                  <Input
                    id="month"
                    name="month"
                    value={formData.month || ""}
                    onChange={handleInputChange}
                    placeholder="Enter month"
                    required
                  />
                </div>
              </>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {currentItem ? "Update Item" : "Add Item"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
