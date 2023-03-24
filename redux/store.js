import { configureStore, combineReducers } from "@reduxjs/toolkit"; 
import authReducer from "./slice/authSlice"
import categoryReducer from "./slice/categorySlice"
import addsReducer from "./slice/addsSlice"
import filterReducer from "./slice/filterSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  add: addsReducer,
  filter: filterReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;