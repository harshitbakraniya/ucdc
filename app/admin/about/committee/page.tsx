"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2, Save } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PageHeader } from "@/components/page-header"
import Image from "next/image"

// This would come from your database in a real implementation
const initialCommitteeMembers = [
  {
    id: 1,
    name: "Dr. Rajesh Patel",
    position: "Chairman",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Dr. Rajesh Patel is a renowned educationist with over 30 years of experience in the field of education.",
  },
  {
    id: 2,
    name: "Mrs. Priya Sharma",
    position: "Vice Chairperson",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Mrs. Priya Sharma has been associated with UCDC since its inception and has played a key role in its growth.",
  },
  {
    id: 3,
    name: "Mr. Amit Desai",
    position: "Secretary",
    image: "/placeholder.svg?height=300&width=300",
    description: "Mr. Amit Desai is a civil servant and brings his administrative expertise to the committee.",
  },
  {
    id: 4,
    name: "Dr. Neha Patel",
    position: "Treasurer",
    image: "/placeholder.svg?height=300&width=300",
    description: "Dr. Neha Patel is a professor of economics and manages the financial aspects of UCDC.",
  },
]

type CommitteeMember = {
  id: number
  name: string
  position: string
  image: string
  description: string
}

export default function CommitteePage() {
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>(initialCommitteeMembers)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState<CommitteeMember | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    image: "",
    description: "",
  })
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, you would upload the image to your server or cloud storage
    // and then set the URL in the form data
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, image: imageUrl }))
    }
  }

  const handleAddMember = () => {
    setCurrentMember(null)
    setFormData({
      name: "",
      position: "",
      image: "",
      description: "",
    })
    setIsDialogOpen(true)
  }

  const handleEditMember = (member: CommitteeMember) => {
    setCurrentMember(member)
    setFormData({
      name: member.name,
      position: member.position,
      image: member.image,
      description: member.description,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteMember = (id: number) => {
    if (confirm("Are you sure you want to delete this committee member?")) {
      setCommitteeMembers((prev) => prev.filter((member) => member.id !== id))
      setSuccessMessage("Committee member deleted successfully")
      setTimeout(() => setSuccessMessage(null), 3000)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentMember) {
      // Update existing member
      setCommitteeMembers((prev) =>
        prev.map((member) => (member.id === currentMember.id ? { ...member, ...formData } : member)),
      )
      setSuccessMessage("Committee member updated successfully")
    } else {
      // Add new member
      const newMember = {
        id: Date.now(),
        ...formData,
      }
      setCommitteeMembers((prev) => [...prev, newMember])
      setSuccessMessage("Committee member added successfully")
    }

    setIsDialogOpen(false)
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Management Committee"
        description="Manage the committee members displayed on the About page"
        action={
          <Button onClick={handleAddMember} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" /> Add Member
          </Button>
        }
      />

      {successMessage && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {committeeMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{member.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditMember(member)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteMember(member.id)}>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentMember ? "Edit Committee Member" : "Add New Committee Member"}</DialogTitle>
            <DialogDescription>
              {currentMember
                ? "Update the details of the existing committee member"
                : "Fill in the details to add a new committee member"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter member name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Enter member position"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="flex items-center gap-4">
                {formData.image && (
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="Member Preview"
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
              <p className="text-sm text-muted-foreground">Recommended size: 300x300 pixels. Max file size: 1MB.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter member description"
                rows={3}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                <Save className="mr-2 h-4 w-4" />
                {currentMember ? "Update Member" : "Add Member"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
