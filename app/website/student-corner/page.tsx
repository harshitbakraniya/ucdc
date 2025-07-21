"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  GraduationCap,
  FileText,
  Trophy,
  BookOpen,
  Users,
  Calendar,
  Clock,
  Download,
  Search,
} from "lucide-react";

interface CoursesBatch {
  _id: string;
  courseName: string;
  batchName: string;
  startDate: string;
  endDate: string;
  duration: string;
  faculty: string;
  schedule: string;
  fees: number;
  maxStudents: number;
  enrolledStudents: number;
  status: string;
}

interface EntranceTest {
  _id: string;
  testName: string;
  testDate: string;
  applicationDeadline: string;
  eligibility: string;
  syllabus: string[];
  examPattern: string;
  fees: number;
}

interface StudyMaterial {
  _id: string;
  title: string;
  subject: string;
  category: string;
  description: string;
  fileUrl: string;
  fileType: string;
  fileSize?: string;
  downloadCount: number;
}

export default function StudentCornerPage() {
  const [batches, setBatches] = useState<CoursesBatch[]>([]);
  const [entranceTests, setEntranceTests] = useState<EntranceTest[]>([]);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [batchesRes, testsRes, materialsRes] = await Promise.all([
        fetch("/api/courses-batch"),
        fetch("/api/entrance-test"),
        fetch("/api/study-material"),
      ]);

      const [batchesData, testsData, materialsData] = await Promise.all([
        batchesRes.json(),
        testsRes.json(),
        materialsRes.json(),
      ]);

      if (batchesData.success) setBatches(batchesData.data);
      if (testsData.success) setEntranceTests(testsData.data);
      if (materialsData.success) setStudyMaterials(materialsData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMaterials = studyMaterials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "notes":
        return "bg-blue-100 text-blue-800";
      case "question-papers":
        return "bg-green-100 text-green-800";
      case "books":
        return "bg-purple-100 text-purple-800";
      case "videos":
        return "bg-orange-100 text-orange-800";
      case "practice-tests":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading student corner...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Student Corner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your one-stop destination for courses, tests, results, and study
            materials. Everything you need for your academic success.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {batches.length}+
            </div>
            <div className="text-sm text-gray-600">Active Batches</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {entranceTests.length}+
            </div>
            <div className="text-sm text-gray-600">Entrance Tests</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {studyMaterials.length}+
            </div>
            <div className="text-sm text-gray-600">Study Materials</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">95%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Student Corner Tabs */}
        <Tabs defaultValue="courses-batch" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger
              value="courses-batch"
              className="flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Courses & Batches</span>
            </TabsTrigger>
            <TabsTrigger
              value="entrance-test"
              className="flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Entrance Test</span>
            </TabsTrigger>
            <TabsTrigger
              value="test-results"
              className="flex items-center space-x-2"
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Test Results</span>
            </TabsTrigger>
            <TabsTrigger
              value="study-material"
              className="flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Study Material</span>
            </TabsTrigger>
          </TabsList>

          {/* Courses & Batches Tab */}
          <TabsContent value="courses-batch">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Current Courses & Batches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {batches.map((batch) => (
                  <Card
                    key={batch._id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">
                          {batch.courseName}
                        </CardTitle>
                        <Badge className={getStatusColor(batch.status)}>
                          {batch.status}
                        </Badge>
                      </div>
                      <CardDescription>{batch.batchName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>
                            {new Date(batch.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{batch.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span>
                            {batch.enrolledStudents}/{batch.maxStudents}{" "}
                            students
                          </span>
                        </div>
                        <div className="text-sm">
                          <strong>Faculty:</strong> {batch.faculty}
                        </div>
                        <div className="text-sm">
                          <strong>Schedule:</strong> {batch.schedule}
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          ₹{batch.fees.toLocaleString()}
                        </div>
                        <Button className="w-full mt-4">Enroll Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Entrance Test Tab */}
          <TabsContent value="entrance-test">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Entrance Test Application
              </h2>

              {/* Available Tests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {entranceTests.map((test) => (
                  <Card
                    key={test._id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{test.testName}</CardTitle>
                      <CardDescription>
                        Application Deadline:{" "}
                        {new Date(
                          test.applicationDeadline
                        ).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>
                            Test Date:{" "}
                            {new Date(test.testDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm">
                          <strong>Eligibility:</strong> {test.eligibility}
                        </div>
                        <div className="text-sm">
                          <strong>Exam Pattern:</strong> {test.examPattern}
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          ₹{test.fees}
                        </div>
                        <Button className="w-full">Apply Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Application Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Form</CardTitle>
                  <CardDescription>
                    Fill out the form below to apply for entrance test
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="studentName">Full Name</Label>
                        <Input
                          id="studentName"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="qualification">Qualification</Label>
                      <Input
                        id="qualification"
                        placeholder="Enter your qualification"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your complete address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="test">Select Test</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select entrance test" />
                        </SelectTrigger>
                        <SelectContent>
                          {entranceTests.map((test) => (
                            <SelectItem key={test._id} value={test._id}>
                              {test.testName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Test Results Tab */}
          <TabsContent value="test-results">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Entrance Test Results
              </h2>

              {/* Search Results */}
              <Card>
                <CardHeader>
                  <CardTitle>Search Your Result</CardTitle>
                  <CardDescription>
                    Enter your roll number or application ID to view results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Input
                      placeholder="Enter roll number or application ID"
                      className="flex-1"
                    />
                    <Button>
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sample Results Display */}
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Results Found
                </h3>
                <p className="text-gray-600">
                  Enter your details above to search for your test results.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Study Material Tab */}
          <TabsContent value="study-material">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Study Materials
                </h2>
                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search materials..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="notes">Notes</SelectItem>
                      <SelectItem value="question-papers">
                        Question Papers
                      </SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="videos">Videos</SelectItem>
                      <SelectItem value="practice-tests">
                        Practice Tests
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map((material) => (
                  <Card
                    key={material._id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">
                          {material.title}
                        </CardTitle>
                        <Badge className={getCategoryColor(material.category)}>
                          {material.category.replace("-", " ")}
                        </Badge>
                      </div>
                      <CardDescription>{material.subject}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">
                        {material.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{material.fileType.toUpperCase()}</span>
                        {material.fileSize && <span>{material.fileSize}</span>}
                        <span>{material.downloadCount} downloads</span>
                      </div>
                      <Button className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredMaterials.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Study Materials Found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
