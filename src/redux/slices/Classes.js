import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { findPath,findObject,findLocationByPath, getObjectByPath } from "../PathOperationsLib";
import GetBlockStructure from "../../GetBlockStructure";

const classesSlice = createSlice({
  name: "classes",
  initialState: {
    classes:[],
    paths:[]
  }
  ,
  reducers: {
    addClass(state, action) {
      state.classes.push({
        id: action.payload.id,
        name: "Nienazwana klasa",
        fields: [],
        methods: []
      });
    },
    createMethod(state,action){
        const findedClass = state.classes.find(cl => cl.id === action.payload.id);
        if(findedClass!==undefined)
        {
          const newMethod = {
            id: uuidv4(),
            name:"Metoda bez nazwy",
            children: [[],[]]
          }; 
          findedClass.methods.push(newMethod);
          state.paths.push({
            id: newMethod.id,
            path:["classes",action.payload.id+"|-1","methods"]
          })
        }
    },
    createField(state,action){
        const findedClass = state.classes.find(cl => cl.id === action.payload.id);
        if(findedClass!==undefined)
        {
          const newField = {
            id: uuidv4(),
            name:"Pole bez nazwy",
            children: [[]]
          }
          findedClass.fields.push(newField);
          state.paths.push({
            id: newField.id,
            path:["classes",action.payload.id+"|-1","fields"]
          })
        }
    },
    editClassName(state,action){
      const findedClass = state.classes.find(cl => cl.id === action.payload.id);
      findedClass.name = action.payload.name
    },
    editFieldName(state,action){
      const findedClass = state.classes.find(cl => cl.id === action.payload.classId);
      const findedField = findedClass.fields.find(fi => fi.id === action.payload.fieldId);
      findedField.name = action.payload.name
    },
    editMethodName(state,action){
      const findedClass = state.classes.find(cl => cl.id === action.payload.classId);
      const findedMethod = findedClass.methods.find(me => me.id === action.payload.methodId);
      findedMethod.name = action.payload.name
    },
    inserElementToClass(state,action)
    {
      debugger;
      const {object,to,classId} = action.payload;

      const objectSplit = object.split("|");
      const toSplit = to.split("|");

      const pathTo = findPath(state,toSplit[0]);
      const pathObject = findPath(state,objectSplit[0]);

      let objectValue = undefined;
      if(pathObject===undefined)
      {
        objectValue = GetBlockStructure(objectSplit[0])
      }
      else
      {
        objectValue = findObject(state,object,pathObject);
      }
      let destinationValue = findLocationByPath(state, pathTo);

      destinationValue = destinationValue.find(
        (el) => el.id === toSplit[0]
      );
      if (toSplit.length === 2) {
        destinationValue = getObjectByPath(destinationValue, ["children"]);
        destinationValue = destinationValue[toSplit[1]];
      }
      destinationValue.push(objectValue);
    }
  },
});

export const { addClass , createMethod , createField , editClassName, editFieldName,editMethodName,inserElementToClass} = classesSlice.actions;
export default classesSlice.reducer;
