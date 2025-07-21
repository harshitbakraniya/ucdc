import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Banner {
  _id?: string
  title: string
  description: string
  image: string
  link?: string
  order: number
  isActive: boolean
}

interface BannerState {
  banners: Banner[]
  loading: boolean
  error: string | null
}

const initialState: BannerState = {
  banners: [],
  loading: false,
  error: null,
}

export const fetchBanners = createAsyncThunk("banners/fetchBanners", async () => {
  const response = await fetch("/api/banners")
  return response.json()
})

export const createBanner = createAsyncThunk("banners/createBanner", async (bannerData: Omit<Banner, "_id">) => {
  const response = await fetch("/api/banners", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bannerData),
  })
  return response.json()
})

export const updateBanner = createAsyncThunk(
  "banners/updateBanner",
  async ({ id, data }: { id: string; data: Partial<Banner> }) => {
    const response = await fetch(`/api/banners/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },
)

export const deleteBanner = createAsyncThunk("banners/deleteBanner", async (id: string) => {
  await fetch(`/api/banners/${id}`, { method: "DELETE" })
  return id
})

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false
        state.banners = action.payload
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch banners"
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.banners.push(action.payload)
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        const index = state.banners.findIndex((banner) => banner._id === action.payload._id)
        if (index !== -1) {
          state.banners[index] = action.payload
        }
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.banners = state.banners.filter((banner) => banner._id !== action.payload)
      })
  },
})

export default bannerSlice.reducer
