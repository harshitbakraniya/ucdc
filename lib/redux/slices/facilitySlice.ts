import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Facility {
  _id: string
  type: "accommodation" | "library" | "classroom" | "computer-lab" | "canteen"
  title: string
  description: string
  features: string[]
  images: { url: string; alt: string }[]
  capacity?: string
  timings?: string
  contact?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface FacilityState {
  facilities: Facility[]
  loading: boolean
  error: string | null
}

const initialState: FacilityState = {
  facilities: [],
  loading: false,
  error: null,
}

// Async thunks
export const fetchFacilities = createAsyncThunk("facilities/fetchFacilities", async (type?: string) => {
  const url = type ? `/api/facilities?type=${type}` : "/api/facilities"
  const response = await fetch(url)
  const data = await response.json()
  if (!data.success) throw new Error(data.error)
  return data.data
})

export const createFacility = createAsyncThunk("facilities/createFacility", async (facilityData: Partial<Facility>) => {
  const response = await fetch("/api/facilities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(facilityData),
  })
  const data = await response.json()
  if (!data.success) throw new Error(data.error)
  return data.data
})

export const updateFacility = createAsyncThunk(
  "facilities/updateFacility",
  async ({ id, ...facilityData }: Partial<Facility> & { id: string }) => {
    const response = await fetch(`/api/facilities/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(facilityData),
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
  },
)

export const deleteFacility = createAsyncThunk("facilities/deleteFacility", async (id: string) => {
  const response = await fetch(`/api/facilities/${id}`, {
    method: "DELETE",
  })
  const data = await response.json()
  if (!data.success) throw new Error(data.error)
  return id
})

const facilitySlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch facilities
      .addCase(fetchFacilities.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFacilities.fulfilled, (state, action) => {
        state.loading = false
        state.facilities = action.payload
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch facilities"
      })
      // Create facility
      .addCase(createFacility.fulfilled, (state, action) => {
        state.facilities.unshift(action.payload)
      })
      // Update facility
      .addCase(updateFacility.fulfilled, (state, action) => {
        const index = state.facilities.findIndex((f) => f._id === action.payload._id)
        if (index !== -1) {
          state.facilities[index] = action.payload
        }
      })
      // Delete facility
      .addCase(deleteFacility.fulfilled, (state, action) => {
        state.facilities = state.facilities.filter((f) => f._id !== action.payload)
      })
  },
})

export const { clearError } = facilitySlice.actions
export default facilitySlice.reducer
