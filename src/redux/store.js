import { configureStore } from "@reduxjs/toolkit";
import codeStructureReducer from "./slices/CodeStructure";
import classesReducer from "./slices/Classes";
import blocksTabsSliceReducer from "./slices/BlocksTabs";
import draggableSettingsReducer from "./slices/DraggableSettings";
export const store = configureStore({
  reducer: {
    codeStructure: codeStructureReducer,
    classes: classesReducer,
    blocksTabs: blocksTabsSliceReducer,
    draggableSettings: draggableSettingsReducer,
  },
});
