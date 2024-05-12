import { configureStore } from "@reduxjs/toolkit";
import codeStructureReducer from "./slices/CodeStructure";
import classesReducer from "./slices/Classes";
import blocksTabsSliceReducer from "./slices/BlocksTabs";
import draggableSettingsReducer from "./slices/DraggableSettings";
import LanguageSettingsReducer from "./slices/LanguageSettings";
export const store = configureStore({
  reducer: {
    codeStructure: codeStructureReducer,
    classes: classesReducer,
    blocksTabs: blocksTabsSliceReducer,
    draggableSettings: draggableSettingsReducer,
    languageSettings: LanguageSettingsReducer,
  },
});
