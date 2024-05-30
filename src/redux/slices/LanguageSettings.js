import { createSlice } from "@reduxjs/toolkit";
import { allBlockTypes } from "../../AllBlockTypes";
const languageSettingsSlice = createSlice({
  name: "languageSettings",
  initialState: {
    isLanguage: "js",
    currentClassName: "",
    blockTypes: {
      ...allBlockTypes,
      retrievedMethods: [],
      currentRetrievedMethods: [],
    },
  },
  reducers: {
    changeLanguage(state, action) {
      state.isLanguage = action.payload;
    },
    setLanguageSlice(state, action) {
      state.isLanguage = action.payload.data.isLanguage;
      state.blockTypes.retrievedMethods =
        action.payload.data.blockTypes.retrievedMethods;
    },
    updateRetrievedMethods(state, action) {
      state.blockTypes.currentRetrievedMethods = [];
      state.currentClassName = action.payload.name;

      action?.payload.methods.forEach((methodName) => {
        if (methodName === "constructor") return;
        const newObject = {
          id: methodName,
          texts: ["", methodName],
          styleClass: "bg-color-js-array",
          structureJS: "." + methodName + "( ? )",
          moveText: methodName,
          disableMainDroppable: false,
        };

        state.blockTypes.currentRetrievedMethods.push(newObject);

        if (
          state.blockTypes.retrievedMethods.find(
            (object) => object.id === methodName
          )
        ) {
          return;
        }

        state.blockTypes.retrievedMethods.push(newObject);
      });
    },
    resetRetrievedMethods(state) {
      state.blockTypes.retrievedMethods = [];
      state.blockTypes.currentRetrievedMethods = [];
      state.currentClassName = "";
    },
  },
});

export const {
  changeLanguage,
  setLanguageSlice,
  updateRetrievedMethods,
  resetRetrievedMethods,
} = languageSettingsSlice.actions;
export default languageSettingsSlice.reducer;
