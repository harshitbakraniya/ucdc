import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Achiever {
  _id?: string
  name: string
  exam: string
  rank: string
  year: number
  image: string
  testimonial?: string
  isActive: boolean
}

interface AchieverState {
  achievers: Achiever[]
  loading: boolean
  error: string | null
}

const initialState: AchieverState = {
  achievers: [],
  loading: false,
  error: null,
}

export const fetchAchievers = createAsyncThunk("achievers/fetchAchievers", async () => {
  const response = await fetch("/api/achievers")
  return response.json()
})

export const createAchiever = createAsyncThunk(
  "achievers/createAchiever",
  async (achieverData: Omit<Achiever, "_id">) => {
    const response = await fetch("/api/achievers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(achieverData),
    })
    return response.json()
  },
)

export const updateAchiever = createAsyncThunk(
  "achievers/updateAchiever",
  async ({ id, data }: { id: string; data: Partial<Achiever> }) => {
    const response = await fetch(`/api/achievers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },
)

export const deleteAchiever = createAsyncThunk("achievers/deleteAchiever", async (id: string) => {
  await fetch(`/api/achievers/${id}`, { method: "DELETE" })
  return id
})

const achieverSlice = createSlice({
  name: "achievers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAchievers.fulfilled, (state, action) => {
        state.loading = false
        state.achievers = action.payload
      })
      .addCase(fetchAchievers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch achievers"
      })
      .addCase(createAchiever.fulfilled, (state, action) => {
        state.achievers.push(action.payload)
      })
      .addCase(updateAchiever.fulfilled, (state, action) => {
        const index = state.achievers.findIndex((achiever) => achiever._id === action.payload._id)
        if (index !== -1) {
          state.achievers[index] = action.payload
        }
      })
      .addCase(deleteAchiever.fulfilled, (state, action) => {
        state.achievers = state.achievers.filter((achiever) => achiever._id !== action.payload)
      })
  },
})

export default achieverSlice.reducer
