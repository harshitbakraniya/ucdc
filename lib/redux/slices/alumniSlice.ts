import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface Alumni {
  _id: string
  name: string
  email: string
  phone: string
  course: string
  batch: string
  currentPosition?: string
  company?: string
  image?: string
  testimonial?: string
  isApproved: boolean
  isActive: boolean
  createdAt: string
}

interface AlumniState {
  alumni: Alumni[]
  loading: boolean
  error: string | null
}

const initialState: AlumniState = {
  alumni: [],
  loading: false,
  error: null,
}

export const fetchAlumni = createAsyncThunk("alumni/fetchAlumni", async () => {
  const response = await fetch("/api/alumni")
  if (!response.ok) throw new Error("Failed to fetch alumni")
  return response.json()
})

export const createAlumni = createAsyncThunk("alumni/createAlumni", async (data: Partial<Alumni>) => {
  const response = await fetch("/api/alumni", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to create alumni")
  return response.json()
})

export const updateAlumni = createAsyncThunk(
  "alumni/updateAlumni",
  async ({ id, data }: { id: string; data: Partial<Alumni> }) => {
    const response = await fetch(`/api/alumni/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update alumni")
    return response.json()
  },
)

export const deleteAlumni = createAsyncThunk("alumni/deleteAlumni", async (id: string) => {
  const response = await fetch(`/api/alumni/${id}`, { method: "DELETE" })
  if (!response.ok) throw new Error("Failed to delete alumni")
  return id
})

const alumniSlice = createSlice({
  name: "alumni",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlumni.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAlumni.fulfilled, (state, action) => {
        state.loading = false
        state.alumni = action.payload
      })
      .addCase(fetchAlumni.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch alumni"
      })
      .addCase(createAlumni.fulfilled, (state, action) => {
        state.alumni.push(action.payload)
      })
      .addCase(updateAlumni.fulfilled, (state, action) => {
        const index = state.alumni.findIndex((item) => item._id === action.payload._id)
        if (index !== -1) {
          state.alumni[index] = action.payload
        }
      })
      .addCase(deleteAlumni.fulfilled, (state, action) => {
        state.alumni = state.alumni.filter((item) => item._id !== action.payload)
      })
  },
})

export default alumniSlice.reducer
