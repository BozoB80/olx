import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredProducts: []
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    sort_products (state, action) {
      const { adds, sort } = action.payload;
      let tempProducts = []
      if (sort === "latest") {
        tempProducts = adds
      }
      if (sort === "lowest-price") {
        tempProducts = adds?.slice().sort((a, b) => {
          return a.price - b.price
        })
      }
      
      state.filteredProducts = tempProducts
    }
  }
});

export const {sort_products} = filterSlice.actions

export const selectFilteredProducts = (state) => state.filter.filteredProducts

export default filterSlice.reducer