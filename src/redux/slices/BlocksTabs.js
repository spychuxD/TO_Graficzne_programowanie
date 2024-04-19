import { createSlice } from "@reduxjs/toolkit";

const blocksTabsSlice = createSlice({
  name: "blocksTabs",
  initialState: {
    index:0,
  }
  ,
  reducers: {
    changeTab(state, action) {
        state.index = action.payload.index;
    }
  }
});

export const { changeTab} = blocksTabsSlice.actions;
export default blocksTabsSlice.reducer;
