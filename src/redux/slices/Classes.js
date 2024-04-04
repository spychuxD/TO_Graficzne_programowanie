import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const classesSlice = createSlice({
  name: "classes",
  initialState: {
    classes:[]
  },
  reducers: {
    addClass(state, action) {
      state.classes.push({
        id: uuidv4(),
        name: "Nienazwana klasa",
        fields: [],
        methods: []
      });
    },
    createMethod(state,action){
        const findedClass = state.classes.find(cl => cl.id === action.payload.id);
        if(findedClass!==undefined)
        {
            findedClass.methods.push({
                id: uuidv4(),
            })
        }
    },
    createField(state,action){
        const findedClass = state.classes.find(cl => cl.id === action.payload.id);
        if(findedClass!==undefined)
        {
            findedClass.fields.push({
                id: uuidv4(),
            })
        }
    },
  },
});

export const { addClass , createMethod , createField} = classesSlice.actions;
export default classesSlice.reducer;
