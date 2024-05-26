import { createSlice } from "@reduxjs/toolkit";

const blocksTabsSlice = createSlice({
  name: "blocksTabs",
  initialState: {
    index: 0,
    tabs: [{ name: "Sekcja", id: 1 }],
  },
  reducers: {
    changeTab(state, action) {
      state.index = action.payload.index;
    },
    addTab(state, action) {
      state.tabs.push(action.payload.tab);
    },
    setTabSlice(state, action) {
      state.index = action.payload.data.index;
      state.tabs = action.payload.data.tabs;
    },
    resetTabSlice(state, action) {
      state.index = 0;
      state.tabs = [{ name: "Sekcja", id: 1 }];
    },
  },
});

export const { changeTab, setTabSlice, addTab, resetTabSlice } =
  blocksTabsSlice.actions;
export default blocksTabsSlice.reducer;
