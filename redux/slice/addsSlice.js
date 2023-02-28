import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  adds: []
}

const addsSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    storeAdds: (state, action) => {
      state.adds = action.payload.adds;
    }
  }
});

export const {storeAdds} = addsSlice.actions

export const selectAdds = (state) => state.add.adds

export default addsSlice.reducer