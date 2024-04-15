import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const classesSlice = createSlice({
  name: "classes",
  initialState: []
  ,
  reducers: {
    addClass(state, action) {
      state.push({
        id: action.payload.id,
        name: "Nienazwana klasa",
        fields: [],
        methods: []
      });
    },
    createMethod(state,action){
        const findedClass = state.find(cl => cl.id === action.payload.id);
        if(findedClass!==undefined)
        {
            findedClass.methods.push({
                id: uuidv4(),
                name:"Metoda bez nazwy",
                children: [[],[]]
            })
        }
    },
    createField(state,action){
        const findedClass = state.find(cl => cl.id === action.payload.id);
        if(findedClass!==undefined)
        {
            findedClass.fields.push({
                id: uuidv4(),
                name:"Pole bez nazwy",
                children: [[]]
            })
        }
    },
    editClassName(state,action){
      const findedClass = state.find(cl => cl.id === action.payload.id);
      findedClass.name = action.payload.name
    },
    editFieldName(state,action){
      const findedClass = state.find(cl => cl.id === action.payload.classId);
      const findedField = findedClass.fields.find(fi => fi.id === action.payload.fieldId);
      findedField.name = action.payload.name
    },
    editMethodName(state,action){
      const findedClass = state.find(cl => cl.id === action.payload.classId);
      const findedMethod = findedClass.methods.find(me => me.id === action.payload.methodId);
      findedMethod.name = action.payload.name
    }
  },
});

export const { addClass , createMethod , createField , editClassName, editFieldName,editMethodName} = classesSlice.actions;
export default classesSlice.reducer;
