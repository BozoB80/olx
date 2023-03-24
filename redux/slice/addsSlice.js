import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  adds: [],
  mobiles: []
}

const addsSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    storeAdds: (state, action) => {
      //console.log(action.payload);
      state.adds = action.payload.adds;
    },
    storeMobiles: (state, action) => {
      state.mobiles = action.payload.mobiles;
    },
  }
});

export const {storeAdds, storeMobiles} = addsSlice.actions

export const selectAdds = (state) => state.add.adds
export const selectMobiles = (state) => state.add.mobiles

export default addsSlice.reducer