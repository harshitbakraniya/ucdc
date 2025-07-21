import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface CoursesBatch {
  _id: string
  courseName: string
  batchName: string
  startDate: string
  endDate: string
  duration: string
  faculty: string
  schedule: string
  fees: number
  maxStudents: number
  enrolledStudents: number
  status: "upcoming" | "ongoing" | "completed"
  isActive: boolean
}

interface EntranceTest {
  _id: string
  testName: string
  testDate: string
  registrationStart: string
  registrationEnd: string
  syllabus: string
  examPattern: string
  fees: number
  isActive: boolean
}

interface StudyMaterial {
  _id: string
  title: string
  subject: string
  category: "notes" | "previous-papers" | "mock-tests" | "books"
  fileUrl: string
  fileType: string
  uploadDate: string
  isActive: boolean
}

interface StudentCornerState {
  coursesBatches: CoursesBatch[]
  entranceTests: EntranceTest[]
  studyMaterials: StudyMaterial[]
  loading: boolean
  error: string | null
}

const initialState: StudentCornerState = {
  coursesBatches: [],
  entranceTests: [],
  studyMaterials: [],
  loading: false,
  error: null,
}

// Courses Batch Thunks
export const fetchCoursesBatches = createAsyncThunk("studentCorner/fetchCoursesBatches", async () => {
  const response = await fetch("/api/courses-batch")
  const data = await response.json()
  if (!data.success) throw new Error(data.error)
  return data.data
})

export const createCoursesBatch = createAsyncThunk(
  "studentCorner/createCoursesBatch",
  async (batchData: Partial<CoursesBatch>) => {
    const response = await fetch("/api/courses-batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(batchData),
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },
)

// Entrance Test Thunks
export const fetchEntranceTests = createAsyncThunk("studentCorner/fetchEntranceTests", async () => {
  const response = await fetch("/api/entrance-test")
  const data = await response.json()
  if (!data.success) throw new Error(data.error)
  return data.data
})

export const createEntranceTest = createAsyncThunk(
  "studentCorner/createEntranceTest",
  async (testData: Partial<EntranceTest>) => {
    const response = await fetch("/api/entrance-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData),
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },
)

// Study Material Thunks
export const fetchStudyMaterials = createAsyncThunk("studentCorner/fetchStudyMaterials", async () => {
  const response = await fetch("/api/study-material")
  const data = await response.json()
  if (!data.success) throw new Error(data.error)
  return data.data
})

export const createStudyMaterial = createAsyncThunk(
  "studentCorner/createStudyMaterial",
  async (materialData: Partial<StudyMaterial>) => {
    const response = await fetch("/api/study-material", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(materialData),
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },
)

const studentCornerSlice = createSlice({
  name: "studentCorner",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Courses Batches
      .addCase(fetchCoursesBatches.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCoursesBatches.fulfilled, (state, action) => {
        state.loading = false
        state.coursesBatches = action.payload
      })
      .addCase(fetchCoursesBatches.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch courses batches"
      })
      .addCase(createCoursesBatch.fulfilled, (state, action) => {
        state.coursesBatches.unshift(action.payload)
      })
      // Entrance Tests
      .addCase(fetchEntranceTests.fulfilled, (state, action) => {
        state.entranceTests = action.payload
      })
      .addCase(createEntranceTest.fulfilled, (state, action) => {
        state.entranceTests.unshift(action.payload)
      })
      // Study Materials
      .addCase(fetchStudyMaterials.fulfilled, (state, action) => {
        state.studyMaterials = action.payload
      })
      .addCase(createStudyMaterial.fulfilled, (state, action) => {
        state.studyMaterials.unshift(action.payload)
      })
  },
})

export const { clearError } = studentCornerSlice.actions
export default studentCornerSlice.reducer
