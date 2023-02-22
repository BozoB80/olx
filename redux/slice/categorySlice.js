import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: []
}

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    storeCategories: (state, action) => {
      console.log(action.payload);
      state.categories = action.payload.categories;
    }
  }
});

export const {storeCategories} = categorySlice.actions

export const selectCategories = (state) => state.category.categories

export default categorySlice.reducer