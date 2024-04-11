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
            })
        }
    },
    createField(state,action){
        const findedClass = state.find(cl => cl.id === action.payload.id);
        if(findedClass!==undefined)
        {
            findedClass.fields.push({
                id: uuidv4(),
            })
        }
    },
    editClassName(state,action){
      const findedClass = state.find(cl => cl.id === action.payload.id);
      findedClass.name = action.payload.name
    }
  },
});

export const { addClass , createMethod , createField , editClassName} = classesSlice.actions;
export default classesSlice.reducer;
