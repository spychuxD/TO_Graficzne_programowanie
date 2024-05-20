import { configureStore } from "@reduxjs/toolkit";
import classesReducer from "./slices/Classes";
import compilerReducer from "./slices/Compiler"
import blocksTabsSliceReducer from "./slices/BlocksTabs";
import draggableSettingsReducer from "./slices/DraggableSettings";
import LanguageSettingsReducer from "./slices/LanguageSettings";
export const store = configureStore({
  reducer: {
    classes: classesReducer,
    blocksTabs: blocksTabsSliceReducer,
    draggableSettings: draggableSettingsReducer,
    languageSettings: LanguageSettingsReducer,
    compiler: compilerReducer
  },
});
