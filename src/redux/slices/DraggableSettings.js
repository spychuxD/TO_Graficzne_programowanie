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
    setDraggSlice(state,action){
      state.disableDraggable=action.payload.data.disableDraggable;
      state.dragOverlayData=action.payload.data.dragOverlayData;
      state.variableType=action.payload.data.variableType;
    }
  },
});

export const {
  toggleDisableDraggable,
  changeDragOverlayData,
  setVariableType,
  setDraggSlice
} = draggableSettingsSlice.actions;
export default draggableSettingsSlice.reducer;
