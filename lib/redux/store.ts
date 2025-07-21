import { configureStore } from "@reduxjs/toolkit"
import bannerReducer from "./slices/bannerSlice"
import achieverReducer from "./slices/achieverSlice"
// import studentCornerReducer from "./slices/studentCornerSlice"
// import committeeReducer from "./slices/committeeSlice"
import courseReducer from "./slices/coursesSlice"
import galleryReducer from "./slices/gallerySlice"
import alumniReducer from "./slices/alumniSlice"
// import contactReducer from "./slices/contactSlice"
import authReducer from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    banners: bannerReducer,
    achievers: achieverReducer,
    // studentCorner: studentCornerReducer,
    // committee: committeeReducer,
    courses: courseReducer,
    gallery: galleryReducer,
    alumni: alumniReducer,
    // contact: contactReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
