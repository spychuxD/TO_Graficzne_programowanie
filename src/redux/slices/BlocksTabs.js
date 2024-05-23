import { createSlice } from "@reduxjs/toolkit";

const blocksTabsSlice = createSlice({
  name: "blocksTabs",
  initialState: {
    index:0,
    tabs:[{name: "Sekcja", id: 1}]
  }
  ,
  reducers: {
    changeTab(state, action) {
        state.index = action.payload.index;
    },
    addTab(state,action){
      state.tabs.push(action.payload.tab)
    },
    setTabSlice(state,action){
      state.indexe=action.payload.data.index;
      state.tabs=action.payload.data.tabs;
    }

  }
});

export const { changeTab,setTabSlice,addTab} = blocksTabsSlice.actions;
export default blocksTabsSlice.reducer;
