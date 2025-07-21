import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface GalleryItem {
  _id: string
  title: string
  description?: string
  image: string
  category: string
  createdAt: string
}

interface GalleryState {
  items: GalleryItem[]
  loading: boolean
  error: string | null
}

const initialState: GalleryState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchGallery = createAsyncThunk("gallery/fetchGallery", async () => {
  const response = await fetch("/api/gallery")
  if (!response.ok) throw new Error("Failed to fetch gallery")
  return response.json()
})

export const createGalleryItem = createAsyncThunk("gallery/createGalleryItem", async (data: Partial<GalleryItem>) => {
  const response = await fetch("/api/gallery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to create gallery item")
  return response.json()
})

export const updateGalleryItem = createAsyncThunk(
  "gallery/updateGalleryItem",
  async ({ id, data }: { id: string; data: Partial<GalleryItem> }) => {
    const response = await fetch(`/api/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update gallery item")
    return response.json()
  },
)

export const deleteGalleryItem = createAsyncThunk("gallery/deleteGalleryItem", async (id: string) => {
  const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" })
  if (!response.ok) throw new Error("Failed to delete gallery item")
  return id
})

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch gallery"
      })
      .addCase(createGalleryItem.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateGalleryItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteGalleryItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload)
      })
  },
})

export default gallerySlice.reducer
