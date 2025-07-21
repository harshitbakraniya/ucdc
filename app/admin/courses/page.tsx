"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  Loader2,
  Database,
  RefreshCw,
} from "lucide-react";
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
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  fetchAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  setActiveCategory,
  clearError,
  type Course,
} from "@/lib/redux/slices/coursesSlice";

export default function CoursesPage() {
  const dispatch = useAppDispatch();
  const {
    data: courses,
    activeCategory,
    status,
    error,
  } = useAppSelector((state) => state.courses);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    batchSize: "",
    features: "",
    fees: 0,
    image: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Fetch all courses on component mount
  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  // Clear error when component unmounts or when user navigates away
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleTabChange = (value: string) => {
    dispatch(setActiveCategory(value));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, you would upload the image to your server or cloud storage
    // and then set the URL in the form data
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleAddCourse = () => {
    setCurrentCourse(null);
    setFormData({
      title: "",
      description: "",
      duration: "",
      batchSize: "",
      features: "",
      fees: 0,
      image: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setCurrentCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      batchSize: course.batchSize,
      features: course.features.join(", "),
      fees: course.fees,
      image: course.image,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteCourse = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await dispatch(deleteCourse({ category: activeCategory, id })).unwrap();
        setSuccessMessage("Course deleted successfully");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (error: any) {
        setSuccessMessage(`Failed to delete course: ${error.message}`);
        setTimeout(() => setSuccessMessage(null), 5000);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert features string to array
      const featuresArray = formData.features
        .split(",")
        .map((feature) => feature.trim())
        .filter((feature) => feature !== "");

      const courseData = {
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        batchSize: formData.batchSize,
        features: featuresArray,
        fees: formData.fees,
        image: formData.image || "/placeholder.svg?height=300&width=500",
      };

      if (currentCourse) {
        // Update existing course
        await dispatch(
          updateCourse({
            category: activeCategory,
            id: currentCourse.id,
            course: courseData,
          })
        ).unwrap();
        setSuccessMessage("Course updated successfully");
      } else {
        // Add new course
        await dispatch(
          addCourse({
            category: activeCategory,
            course: courseData,
          })
        ).unwrap();
        setSuccessMessage("Course added successfully");
      }

      setIsDialogOpen(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      setSuccessMessage(
        `${currentCourse ? "Failed to update" : "Failed to add"} course: ${
          error.message
        }`
      );
      setTimeout(() => setSuccessMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
      const response = await fetch("/api/courses/seed", {
        method: "POST",
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message);
        // Refresh the courses data
        dispatch(fetchAllCourses());
      } else {
        const error = await response.json();
        setSuccessMessage(`Failed to seed database: ${error.error}`);
      }
    } catch (error) {
      setSuccessMessage("Failed to seed database");
    } finally {
      setIsSeeding(false);
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  };

  const handleRefreshData = () => {
    dispatch(fetchAllCourses());
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course Management"
        description="Manage the courses offered by UCDC with MongoDB database"
        action={
          <div className="flex gap-2">
            <Button
              onClick={handleRefreshData}
              variant="outline"
              disabled={status === "loading"}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${
                  status === "loading" ? "animate-spin" : ""
                }`}
              />
              Refresh
            </Button>
            {/* <Button
              onClick={handleSeedDatabase}
              variant="outline"
              disabled={isSeeding}
            >
              {isSeeding ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Database className="mr-2 h-4 w-4" />
              )}
              Seed DB
            </Button> */}
            <Button
              onClick={handleAddCourse}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Course
            </Button>
          </div>
        }
      />

      {successMessage && (
        <Alert
          className={
            successMessage.includes("Failed")
              ? "bg-red-50 border-red-200"
              : "bg-green-50 border-green-200"
          }
        >
          <AlertDescription
            className={
              successMessage.includes("Failed")
                ? "text-red-800"
                : "text-green-800"
            }
          >
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {status === "loading" && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
          <span className="ml-2">Loading courses from database...</span>
        </div>
      )}

      {status === "failed" && (
        <Alert className="bg-red-50 border-red-200">
          <AlertDescription className="text-red-800">
            {error || "Failed to load courses from database. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      {status === "succeeded" && (
        <Tabs
          defaultValue={activeCategory}
          value={activeCategory}
          onValueChange={handleTabChange}
        >
          <TabsList>
            <TabsTrigger value="upsc">UPSC</TabsTrigger>
            <TabsTrigger value="gpsc">GPSC</TabsTrigger>
            <TabsTrigger value="ielts">IELTS</TabsTrigger>
            <TabsTrigger value="cds">CDS</TabsTrigger>
          </TabsList>

          {Object.keys(courses).map((courseType) => (
            <TabsContent key={courseType} value={courseType}>
              <Card>
                <CardContent className="p-6">
                  {courses[courseType]?.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No courses found in this category.
                      </p>
                      <div className="flex justify-center gap-2 mt-4">
                        <Button onClick={handleAddCourse} variant="outline">
                          <Plus className="mr-2 h-4 w-4" /> Add your first
                          course
                        </Button>
                        {/* <Button
                          onClick={handleSeedDatabase}
                          variant="outline"
                          disabled={isSeeding}
                        >
                          {isSeeding ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Database className="mr-2 h-4 w-4" />
                          )}
                          Seed sample data
                        </Button> */}
                      </div>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Image</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Batch Size</TableHead>
                          <TableHead>Features</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courses[courseType]?.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell>
                              <div className="relative h-12 w-20 rounded overflow-hidden">
                                <Image
                                  src={course.image || "/placeholder.svg"}
                                  alt={course.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </TableCell>
                            <TableCell>{course.title}</TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {course.description}
                            </TableCell>
                            <TableCell>{course.duration}</TableCell>
                            <TableCell>{course.batchSize}</TableCell>
                            <TableCell className="max-w-[200px]">
                              <ul className="list-disc list-inside">
                                {course.features
                                  .slice(0, 2)
                                  .map((feature, index) => (
                                    <li key={index} className="truncate">
                                      {feature}
                                    </li>
                                  ))}
                                {course.features.length > 2 && <li>...</li>}
                              </ul>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleEditCourse(course)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleDeleteCourse(course.id)}
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
            </TabsContent>
          ))}
        </Tabs>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentCourse ? "Edit Course" : "Add New Course"}
            </DialogTitle>
            <DialogDescription>
              {currentCourse
                ? "Update the details of the existing course in the database"
                : `Fill in the details to add a new ${activeCategory.toUpperCase()} course to the database`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter course title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Fees</Label>
                <Input
                  id="fees"
                  name="fees"
                  value={formData.fees}
                  onChange={handleInputChange}
                  placeholder="e.g., 300"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter course description"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 6 months"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchSize">Batch Size</Label>
                <Input
                  id="batchSize"
                  name="batchSize"
                  value={formData.batchSize}
                  onChange={handleInputChange}
                  placeholder="e.g., 50 students"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Features</Label>
              <Textarea
                id="features"
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                placeholder="Enter features separated by commas (e.g., Daily Classes, Study Material, Mock Tests)"
                required
              />
              <p className="text-sm text-muted-foreground">
                Separate features with commas
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="flex items-center gap-4">
                {formData.image && (
                  <div className="relative h-16 w-24 rounded overflow-hidden">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="Course Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Recommended size: 500x300 pixels. Max file size: 2MB.
              </p>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {!isSubmitting && <Save className="mr-2 h-4 w-4" />}
                {currentCourse ? "Update Course" : "Add Course"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
