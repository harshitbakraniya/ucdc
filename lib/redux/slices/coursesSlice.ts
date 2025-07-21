import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export type Course = {
  id: string // Changed from number to string for MongoDB ObjectId
  title: string
  description: string
  duration: string
  batchSize: string
  features: string[]
  fees: number
  image: string
  category?: string
  createdAt?: string
  updatedAt?: string
}

export type CoursesState = {
  data: Record<string, Course[]>
  activeCategory: string
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: CoursesState = {
  data: {
    upsc: [],
    gpsc: [],
    ielts: [],
    cds: [],
  },
  activeCategory: "upsc",
  status: "idle",
  error: null,
}

// Async thunks for API calls
export const fetchAllCourses = createAsyncThunk("courses/fetchAll", async () => {
  const response = await fetch("/api/courses")
  if (!response.ok) {
    throw new Error("Failed to fetch courses")
  }
  return response.json()
})

export const fetchCoursesByCategory = createAsyncThunk("courses/fetchByCategory", async (category: string) => {
  const response = await fetch(`/api/courses/${category}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${category} courses`)
  }
  return { category, courses: await response.json() }
})

export const addCourse = createAsyncThunk(
  "courses/add",
  async ({ category, course }: { category: string; course: Omit<Course, "id"> }) => {
    const response = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, course }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to add course")
    }

    const newCourse = await response.json()
    return { category, course: newCourse }
  },
)

export const updateCourse = createAsyncThunk(
  "courses/update",
  async ({ category, id, course }: { category: string; id: string; course: Omit<Course, "id"> }) => {
    const response = await fetch(`/api/courses/${category}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to update course")
    }

    const updatedCourse = await response.json()
    return { category, course: updatedCourse }
  },
)

export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async ({ category, id }: { category: string; id: string }) => {
    const response = await fetch(`/api/courses/${category}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to delete course")
    }

    return { category, id }
  },
)

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllCourses
      .addCase(fetchAllCourses.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch courses"
      })

      // Handle fetchCoursesByCategory
      .addCase(fetchCoursesByCategory.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchCoursesByCategory.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data[action.payload.category] = action.payload.courses
      })
      .addCase(fetchCoursesByCategory.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch courses by category"
      })

      // Handle addCourse
      .addCase(addCourse.pending, (state) => {
        state.error = null
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.data[action.payload.category].push(action.payload.course)
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add course"
      })

      // Handle updateCourse
      .addCase(updateCourse.pending, (state) => {
        state.error = null
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const { category, course } = action.payload
        const index = state.data[category].findIndex((c) => c.id === course.id)
        if (index !== -1) {
          state.data[category][index] = course
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update course"
      })

      // Handle deleteCourse
      .addCase(deleteCourse.pending, (state) => {
        state.error = null
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        const { category, id } = action.payload
        state.data[category] = state.data[category].filter((course) => course.id !== id)
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete course"
      })
  },
})

export const { setActiveCategory, clearError } = coursesSlice.actions
export default coursesSlice.reducer
