import { createSlice } from "@reduxjs/toolkit";

const draggableSettingsSlice = createSlice({
  name: "draggableSettings",
  initialState: {
    disableDraggable: false,
  },
  reducers: {
    toggleDisableDraggable: (state) => {
      state.disableDraggable = !state.disableDraggable;
    },
  },
});

export const { toggleDisableDraggable } = draggableSettingsSlice.actions;
export default draggableSettingsSlice.reducer;
