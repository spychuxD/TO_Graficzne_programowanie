import { createSlice } from "@reduxjs/toolkit";
import { ifElseBlock } from "../../blockTypes";

const getValueByPath = (obj, path) => {
  let newObj = obj;
  let i=0;
  path.map((v,i)=>{
    if(i%2 === 0)
    {

    }
    else
    {

    }
    i++;
    console.log(v)
  })
  //return path.reduce((acc, key) => acc[key], obj);
};
const getObjectByPath = (obj, path) => {
  return path.reduce((acc, key) => acc[key], obj);
};

const codeStructureSlice = createSlice({
  name: "codeStructure",
  initialState: {
    elements: [],
    paths: [],
  },
  reducers: {
    addElement(state, action) {
      state.paths.push({
        id: action.payload.id,
        path: ["elements"],
      });
      if(action.payload.type === ifElseBlock)
      {
        action.payload.children.map((v,i)=>{
          state.paths.push({
            id: action.payload.id+"|"+i,
            path: ["elements",action.payload.id,"children|array",action.payload.id+"|"+i],
          });
        })
        
      }
      state.elements.push(action.payload);
    },
    changeElementOrder(state, action) {
      const { object, over } = action.payload;
      const elementPathIndex = state.paths.find((el) => el.id === object).path;
      const destinationPathIndex = state.paths.find(
        (el) => el.id === over
      ).path;

      // Funkcja pomocnicza do pobierania wartości na podstawie ścieżki
      

      // Odczytanie wartości na podstawie ścieżki dla elementu
      const objectValue = JSON.parse(
        JSON.stringify(
          getObjectByPath(state, elementPathIndex).find((el) => el.id === object)
        )
      );

      // Odczytanie wartości na podstawie ścieżki dla miejsca docelowego
      const destinationValue = getObjectByPath(state, destinationPathIndex);

      // Usunięcie elementu o id równym 'object' z listy
      const objectIndex = getObjectByPath(state, elementPathIndex).findIndex(
        (el) => el.id === object
      );
      if (objectIndex !== -1) {
        getObjectByPath(state, elementPathIndex).splice(objectIndex, 1);
      } else {
        console.log("Obiekt o podanym id nie został znaleziony.");
      }

      // Dodanie objectValue przed obiektem o id równym 'over'
      const overIndex = destinationValue.findIndex((el) => el.id === over);
      if (overIndex !== -1) {
        destinationValue.splice(overIndex, 0, objectValue);
      } else {
        console.log("Obiekt o podanym id nie został znaleziony.");
      }
    },
    inserElement(state, action) {
      const { object, to } = action.payload;
      debugger
      //uzyskanie sciezku obiektu
      const elementPathIndex = state.paths.find((el) => el.id === object).path;
      //uzyskanie sziezki miejsca docelowego
      const destinationPathIndex = state.paths.find((el) => el.id === to).path;
      const cba = JSON.parse(
        JSON.stringify(
          destinationPathIndex
        )
      );
      

      /*const objectValue = JSON.parse(
        JSON.stringify(
          getValueByPath(state, elementPathIndex).find((el) => el.id === object)
        )
      );*/
      const objectValue = getValueByPath(state, elementPathIndex)
  

      const destinationValue = getValueByPath(state, destinationPathIndex);
      return
      const abc = JSON.parse(
        JSON.stringify(
          destinationValue
        )
      );
      destinationValue.push(objectValue);
    },
  },
});

export const { addElement, changeElementOrder, inserElement } = codeStructureSlice.actions;
export default codeStructureSlice.reducer;
