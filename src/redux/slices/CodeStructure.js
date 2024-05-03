import { createSlice } from "@reduxjs/toolkit";
import GetBlockStructure from "../../GetBlockStructure";
import { classDefinitionBlock, classMethodBlock, operatorsBlocks, variableBlock, variableTypesBlock } from "../../blockTypes";
import { findLocationByPath,findPath,findObject,getObjectByPath,updateElementByIdRecursive, findAndDeleteByPath, findRelatedPaths, updateRelatedPaths, updateObjectPath } from "../PathOperationsLib";


const codeStructureSlice = createSlice({
  name: "codeStructure",
  initialState: {
    elements: [],
    classElements: [],
    paths: [
      {
        id: "mainId",
        path: ["elements"],
      },
    ],
    variables: [],
  },
  reducers: {
    addElement(state, action) {
      state.paths.push({
        id: action.payload.id,
        path: ["elements"],
      });
      state.elements.push(action.payload);
      if (action.payload.name === "variableDeclaration")
        state.variables.push(action.payload);
    },
    changeElement(state, action) {
      debugger
      const { id, fieldToModify, value } = action.payload;
      const PathIndex = state.paths.find((el) => el.id === id).path;

      let objectValue = JSON.parse(
        JSON.stringify(findLocationByPath(state, PathIndex))
      );

      objectValue = objectValue.find((obj) => obj.id.split("|")[0] === id);
      objectValue[fieldToModify] = value;
      updateElementByIdRecursive(id, state.elements, fieldToModify, value);

      const variableToUpdate = state.variables.find(
        (obj) => obj.id.split("|")[0] === id
      );
      if(variableToUpdate!==undefined)
        variableToUpdate[fieldToModify] = value;
    },
    changeElementOrder(state, action) {
      const { object, over } = action.payload;
      if (object === over) return;
      const elementPathIndex = state.paths.find((el) => el.id === object).path;
      const destinationPathIndex = state.paths.find(
        (el) => el.id === over
      ).path;

      // Odczytanie wartości na podstawie ścieżki dla elementu
      const objectValue = JSON.parse(
        JSON.stringify(
          getObjectByPath(state, elementPathIndex).find(
            (el) => el && el.id === object
          ) || []
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
      debugger;
      const { object, to } = action.payload;
      //uzyskanie sciezku obiektu
      const pathToObject = findPath(state,object);

      //uzyskanie sziezki miejsca docelowego
      const splitTarget = to.split("|");
      let destinationPathIndex = findPath(state,splitTarget[0]);

      let objectValue = undefined;
      if (pathToObject === undefined) {
        //pobranie szablonu nowego obiektu (jeśli przetwarzany obiekt jest nowo dodany) 
        objectValue = GetBlockStructure(object);
      } else {
        //pobranie obiektu z pod "object" (jeśli obiekt jest przenoszony do innej lokalizacji)
        objectValue = findObject(state,object,pathToObject);
      }

      //wyznaczenie miejsca docelowego "to"
      let destinationValue = findLocationByPath(state, destinationPathIndex);
      //wyznaczenie lokalizacji w miejscu docelowym (jeśli określono id potomka)
      if (splitTarget.length === 2) {
        //wyznaczenie elementu w miejscu dodelowym
        destinationValue = destinationValue.find(
          (el) => el.id === splitTarget[0]
        );
        //przejście do potomków elementu
        destinationValue = getObjectByPath(destinationValue, ["children"]);
        //wybranie konkretnego potomka
        destinationValue = destinationValue[splitTarget[1]];
      }

      //wyznaczenie i usunięcie obiektu w starej lokalizacji (jeśli przetwarzany obiekt nie jet nowo utworzony)
      if (pathToObject !== undefined) {
        findAndDeleteByPath(state,pathToObject,object)
      }

      //dodanie elementu do wyznaczonego kokretnego miejsca w lokalizacji docelowej
      destinationValue.push(objectValue);

      //dodanie ścieżki do obiektu (jeśli obiekt jest nowo utworzonym obiektem)
      if (pathToObject === undefined) {
        if (to !== "mainId") destinationPathIndex = destinationPathIndex.concat(to);
        //dodanie ścieżki do obiektu
        state.paths.push({
          id: objectValue.id,
          path: destinationPathIndex,
        });
        //utworzenie zmiennej (jeśli użyty blok jest deklaracją zmiennej)
        if (objectValue.name === "variableDeclaration")
          state.variables.push(objectValue);
        return;
      }

      //aktualizacja ścieżki do obiektu
      updateObjectPath(state,object,destinationPathIndex,splitTarget,to);


      //wyszukiwanie ścieżek powiązanych z przenoszonym obiektem
      const relatedPaths = findRelatedPaths(state,object);

      //aktualizacja ścieżek powiązanych przenoszonym obiektem
      updateRelatedPaths(relatedPaths,destinationPathIndex,object,to);
    },
    deleteElement(state, action) {
      debugger;
      //uzyskanie sziezki miejsca docelowego elementu
      const elementPath = state.paths.find(
        (el) => el.id === action.payload.id
      ).path;
      let elementLocalization = findLocationByPath(state, elementPath);

      // Uzyskanie indeksu elementu do usunięcia
      const indexToRemove = elementLocalization.findIndex(
        (el) => el.id === action.payload.id
      );
      //usuwanie elementu
      if (indexToRemove !== -1) {
        elementLocalization.splice(indexToRemove, 1);
      }
      //usuniece sniezek(do poprawy)
      state.paths.forEach((pathItem, index) => {
        // Sprawdzenie, czy identyfikator występuje w ścieżce
        if (
          pathItem.path.some((segment) => segment.startsWith(action.payload.id))
        ) {
          state.paths.splice(index, 1);
        }
      });
    },
  },
});

export const {
  addElement,
  changeElement,
  changeElementOrder,
  inserElement,
  deleteElement,
} = codeStructureSlice.actions;
export default codeStructureSlice.reducer;
