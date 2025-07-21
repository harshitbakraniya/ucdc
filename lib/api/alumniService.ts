import type { AlumniMember } from "@/lib/redux/slices/alumniSlice"

// Base URL for your API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ucdc.edu"

// Fetch all alumni data
export const fetchAlumniData = async (): Promise<AlumniMember[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/alumni`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching alumni data:", error)

    // Fallback data for development or when API is unavailable
    return [
      {
        id: 1,
        name: "Rahul Patel",
        batch: "2020-21",
        course: "UPSC",
        achievement: "IAS Officer, Gujarat Cadre",
        image: "/placeholder.svg?height=300&width=300&text=Rahul",
        testimonial:
          "UCDC provided me with the perfect environment and guidance to crack the UPSC examination. The faculty's support and structured approach were instrumental in my success.",
        socialMedia: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          facebook: "https://facebook.com",
        },
      },
      {
        id: 2,
        name: "Priya Sharma",
        batch: "2019-20",
        course: "GPSC",
        achievement: "Deputy Collector, Gujarat",
        image: "/placeholder.svg?height=300&width=300&text=Priya",
        testimonial:
          "The comprehensive study material and regular mock tests at UCDC helped me understand the exam pattern and improve my performance. I'm grateful to the entire team.",
        socialMedia: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
        },
      },
      {
        id: 3,
        name: "Amit Desai",
        batch: "2021-22",
        course: "UPSC",
        achievement: "IPS Officer, Maharashtra Cadre",
        image: "/placeholder.svg?height=300&width=300&text=Amit",
        testimonial:
          "UCDC's personalized coaching and mentorship program gave me the edge I needed to succeed in the UPSC examination. The faculty's expertise and guidance were invaluable.",
        socialMedia: {
          linkedin: "https://linkedin.com",
          facebook: "https://facebook.com",
        },
      },
      // Add more fallback data as needed
    ]
  }
}

// Submit alumni registration form
export const submitAlumniRegistration = async (
  formData: Omit<AlumniMember, "id">,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/alumni/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit registration")
    }

    return { success: true, message: "Registration submitted successfully!" }
  } catch (error) {
    console.error("Error submitting alumni registration:", error)
    return { success: false, message: "Failed to submit registration. Please try again later." }
  }
}
