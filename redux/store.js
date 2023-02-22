import { configureStore, combineReducers } from "@reduxjs/toolkit"; 
import authReducer from "./slice/authSlice"
import categoryReducer from "./slice/categorySlice"

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store;