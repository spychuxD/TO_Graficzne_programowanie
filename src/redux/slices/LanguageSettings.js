import { createSlice } from "@reduxjs/toolkit";
import { blockTypesInit } from "../../AllBlockTypes";
function removeAfterBacktick(str) {
  const index = str.indexOf('`');
  if (index !== -1) {
      return str.substring(0, index);
  }
  return str;
}
const languageSettingsSlice = createSlice({
  name: "languageSettings",
  initialState: {
    isLanguage: "js",
    currentClassName: {},
    classNames: [
      //{ value: "Object", label: "Object" },
    ],
    blockTypes: {
      ...blockTypesInit,
      usedMethodsFromReflection: [],
      currentMethodsFromReflection: [],
    },
    csNamespaces: []
  },
  reducers: {
    changeLanguage(state, action) {
      state.isLanguage = action.payload;
    },
    setLanguageSlice(state, action) {
      state.isLanguage = action.payload.data.isLanguage;
      state.blockTypes.usedMethodsFromReflection =action.payload.data.blockTypes.usedMethodsFromReflection;
      state.csNamespaces = action.payload.data.csNamespaces
    },
    setClassNames(state, action) {
      state.classNames = Object.getOwnPropertyNames(window).reduce(
        (acc, className) => {
          const matchesFilter =
            action.payload === "" ||
            !action.payload ||
            className.toLowerCase().includes(action.payload.toLowerCase());
          if (!matchesFilter) return acc;

          const foundClass = global[className];
          if (!foundClass) return acc;
          const staticMethodNames = Object.getOwnPropertyNames(foundClass);
          const proto = foundClass.prototype;
          if (staticMethodNames < 1 && proto === undefined) return acc;
          acc.push({
            value: className,
            label: className,
          });

          return acc;
        },
        []
      );
    },
    setCsClassNames(state,action){
      state.classNames=[];
      let lastName = "";
      JSON.parse(action.payload.result).forEach(e=>{
        const corectName = removeAfterBacktick(e);
        //if(lastName!==corectName)
        //{
          state.classNames.push({ value: e, label: e})
          lastName=corectName;
       // }
        
      })
    },
    setCurrentCsMethodsFromReflection(state,action)
    {
      const clearName = removeAfterBacktick(action.payload.className);
      const isGeneric = action.payload.className.indexOf('`')===-1?false:true;
      state.blockTypes.currentMethodsFromReflection = [];
      state.currentClassName = {
        value: action.payload.name,
        label: action.payload.name,
      };
      debugger
      const dataType = {
        id: clearName + ";csharp;reflection;dataType",
        texts: ["Datatype "+clearName],
        styleClass: "bg-color-js-second-variant",
        structureCS: clearName+(isGeneric?"<?>":""),
        moveText: clearName,
        disableMainDroppable: !isGeneric,
        appendBeforeTraverseInJSGenerator:true
      };
      state.blockTypes.currentMethodsFromReflection.push(dataType);
      const tmp = action.payload.className+isGeneric?"<?>":""
      const constructor = {
        id: clearName + ";csharp;reflection;constructor",
        texts: ["Constructor "+clearName,""],
        styleClass: "bg-color-js-second-variant",
        structureCS: "new "+clearName+tmp+"(?)",
        moveText: clearName,
        disableMainDroppable: false,
        appendBeforeTraverseInJSGenerator:true
      };
      state.blockTypes.currentMethodsFromReflection.push(constructor);
      const declaration = {
        id: clearName + ";csharp;reflection;declaration",
        texts: ["Declaration "+clearName],
        styleClass: "bg-color-js-second-variant",
        structureCS: clearName+tmp,
        moveText: clearName,
        disableMainDroppable: false,
        appendBeforeTraverseInJSGenerator:true
      };
      state.blockTypes.currentMethodsFromReflection.push(declaration);
      let lastMethod="";
      JSON.parse(action.payload.result).forEach(e=>{
        if(e!==lastMethod)
        {
          const method = {
            id: e + ";csharp;reflection;method",
            texts: ["",e],
            styleClass: "bg-color-js-second-variant",
            structureCS: "?."+e + "(?)",
            moveText: e,
            disableMainDroppable: false,
            appendBeforeTraverseInJSGenerator:true
          };
          state.blockTypes.currentMethodsFromReflection.push(method);
        }
        
        lastMethod = e;
      })
      
    },

    setCurrentMethodsFromReflection(state, action) {
      state.blockTypes.currentMethodsFromReflection = [];
      state.currentClassName = {
        value: action.payload.name,
        label: action.payload.name,
      };
      const foundClass = global[action.payload.name];
      if (!foundClass) return;
      const staticMethodNames = Object.getOwnPropertyNames(foundClass);
      if (staticMethodNames.length > 0) {
        const declaration = {
          id: action.payload.name + ";js;reflection;declaration",
          texts: [action.payload.name],
          styleClass: "bg-color-js-second-variant",
          structureJS: action.payload.name + "? ",
          moveText: action.payload.name,
          disableMainDroppable: false,
          appendBeforeTraverseInJSGenerator: true,
          disableComma: true,
        };
        state.blockTypes.currentMethodsFromReflection.push(declaration);

        staticMethodNames.forEach((methodName) => {
          const method = {
            id: methodName + ";js;reflection;staticMethod",
            texts: [methodName],
            styleClass: "bg-color-js-second-variant",
            structureJS: "." + methodName + "( ? )",
            moveText: methodName,
            disableMainDroppable: false,
            appendBeforeTraverseInJSGenerator: true,
          };

          state.blockTypes.currentMethodsFromReflection.push(method);
        });
      }
      const proto = foundClass.prototype;
      if (proto === undefined) return;

      const methodNames = Object.getOwnPropertyNames(proto);
      if (methodNames.length === 1 && methodNames.includes("constructor"))
        return;

      const declaration = {
        id: action.payload.name + ";js;reflection;declaration2",
        texts: ["", action.payload.name],
        styleClass: "bg-color-js-first-variant",
        structureJS: "new " + action.payload.name + "( ? )",
        moveText: action.payload.name,
        disableMainDroppable: false,
        appendBeforeTraverseInJSGenerator: false,
        reflect: true,
      };
      state.blockTypes.currentMethodsFromReflection.push(declaration);
      methodNames.forEach((methodName) => {
        let descriptor = Object.getOwnPropertyDescriptor(proto, methodName);
        if (
          !descriptor ||
          (typeof descriptor.value !== "function" &&
            typeof descriptor.get !== "function" &&
            typeof descriptor.set !== "function") ||
          methodName === "constructor"
        )
          return;
        const method = {
          id: methodName + ";js;reflection;method",
          texts: ["", methodName],
          styleClass: "bg-color-js-first-variant",
          structureJS: "." + methodName + "( ? )",
          moveText: methodName,
          disableMainDroppable: false,
        };

        state.blockTypes.currentMethodsFromReflection.push(method);
      });
    },
    updateUsedMethodsFromRefection(state, action) {
      if (
        state.blockTypes.usedMethodsFromReflection.find(
          (object) => object.id === action.payload.id
        )
      )
        return;
      state.blockTypes.usedMethodsFromReflection.push(action.payload);
    },
    resetUsedMethodsFromRefection(state) {
      state.blockTypes.usedMethodsFromReflection = [];
      state.blockTypes.currentMethodsFromReflection = [];
      state.currentClassName = {};
      state.csNamespaces = []
    },
    addCsNamespace(state,action)
    {
      state.csNamespaces.push(action.payload.value)
    },
    deleteCsNameSpace(state,action)
    {
      state.csNamespaces = state.csNamespaces.filter(el=>el !== action.payload.value)
    }
  },
});

export const {
  changeLanguage,
  setLanguageSlice,
  setClassNames,
  setCurrentMethodsFromReflection,
  updateUsedMethodsFromRefection,
  resetUsedMethodsFromRefection,
  setCsClassNames,
  setCurrentCsMethodsFromReflection,
  addCsNamespace,
  deleteCsNameSpace
} = languageSettingsSlice.actions;
export default languageSettingsSlice.reducer;
