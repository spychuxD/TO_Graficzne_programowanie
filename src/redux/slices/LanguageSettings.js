import { createSlice } from "@reduxjs/toolkit";
import { blockTypesInit } from "../../AllBlockTypes";
const languageSettingsSlice = createSlice({
  name: "languageSettings",
  initialState: {
    isLanguage: "python",
    currentClassName: {},
    classNames: [
      //{ value: "Object", label: "Object" },
    ],
    blockTypes: {
      ...blockTypesInit,
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
    setClassNames(state, action) {
      state.classNames = Object.getOwnPropertyNames(window).reduce(
        (acc, className) => {
          const matchesFilter =
            action.payload === "" ||
            !action.payload ||
            className.toLowerCase().includes(action.payload.toLowerCase());

          const foundClass = global[className];
          if (!foundClass && typeof foundClass !== "function") return acc;
          const proto = foundClass.prototype;
          if (proto === undefined) return acc;
          const methodNames = Object.getOwnPropertyNames(proto);
          let hasMethods = false;
          methodNames.forEach((methodName) => {
            let descriptor = Object.getOwnPropertyDescriptor(proto, methodName);
            if (
              descriptor &&
              (typeof descriptor.value === "function" ||
                typeof descriptor.get === "function" ||
                typeof descriptor.set === "function") &&
              methodName !== "constructor"
            ) {
              hasMethods = true;
            }
          });
          if (!matchesFilter && !hasMethods) return acc;
          acc.push({
            value: className,
            label: className,
          });

          return acc;
        },
        []
      );
    },

    updateRetrievedMethods(state, action) {
      state.blockTypes.currentRetrievedMethods = [];
      state.currentClassName = {
        value: action.payload.name,
        label: action.payload.name,
      };
      const foundClass = global[action.payload.name];
      if (!foundClass || typeof foundClass !== "function") return;
      const proto = foundClass.prototype;
      if (proto === undefined) return false;

      const methodNames = Object.getOwnPropertyNames(proto);
      methodNames.forEach((methodName) => {
        let descriptor = Object.getOwnPropertyDescriptor(proto, methodName);
        if (
          descriptor &&
          (typeof descriptor.value === "function" ||
            typeof descriptor.get === "function" ||
            typeof descriptor.set === "function") &&
          methodName !== "constructor"
        ) {
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
          )
            return;
          state.blockTypes.retrievedMethods.push(newObject);
        }
      });
    },
    resetRetrievedMethods(state) {
      state.blockTypes.retrievedMethods = [];
      state.blockTypes.currentRetrievedMethods = [];
      state.currentClassName = {};
    },
  },
});

export const {
  changeLanguage,
  setLanguageSlice,
  setClassNames,
  updateRetrievedMethods,
  resetRetrievedMethods,
} = languageSettingsSlice.actions;
export default languageSettingsSlice.reducer;
