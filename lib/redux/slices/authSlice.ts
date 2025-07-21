import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface User {
  _id: string
  name: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message)
    }
    return data
  },
)

export const logout = createAsyncThunk("auth/logout", async () => {
  await fetch("/api/auth/logout", { method: "POST" })
})

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const response = await fetch("/api/auth/me")
  if (!response.ok) {
    throw new Error("Not authenticated")
  }
  return response.json()
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Login failed"
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload.user
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false
        state.user = null
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
