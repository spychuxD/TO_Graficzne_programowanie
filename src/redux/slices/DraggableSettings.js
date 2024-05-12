import { createSlice } from "@reduxjs/toolkit";
import { consoleLogBlock } from "../../blockTypes";
const draggableSettingsSlice = createSlice({
  name: "draggableSettings",
  initialState: {
    disableDraggable: false,
    dragOverlayData: { type: consoleLogBlock },
    variableType: "",
  },
  reducers: {
    toggleDisableDraggable: (state) => {
      state.disableDraggable = !state.disableDraggable;
    },

    changeDragOverlayData: (state, data) => {
      //console.log("data.payload", data.payload);
      state.dragOverlayData = data.payload;
    },
    setVariableType: (state, type) => {
      //console.log("type.payload", type.payload);
      state.variableType = type.payload;
    },
  },
});

export const {
  toggleDisableDraggable,
  changeDragOverlayData,
  setVariableType,
} = draggableSettingsSlice.actions;
export default draggableSettingsSlice.reducer;
