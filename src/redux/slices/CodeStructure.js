import { createSlice } from "@reduxjs/toolkit";

const getValueByPath = (obj, path) => {
  let newObj = obj;
  let tmp = [];
  let nextIsSplitArray;
  path.forEach((v, i) => {
    const splitTarget = v.split("|");
    if (splitTarget.length === 2) {
      newObj = newObj.find((el) => el.id === splitTarget[0]).children;
      newObj = newObj[splitTarget[1]];
      nextIsSplitArray = JSON.stringify(newObj);
    } else {
      tmp = [splitTarget[0]];
      newObj = tmp.reduce((acc, key) => acc[key], newObj);
      nextIsSplitArray = JSON.stringify(newObj);
    }
  });

  return newObj;
};

const getObjectByPath = (obj, path) => {
  const result = path.reduce((acc, key) => acc[key], obj);
  return result === undefined ? [] : result;
};
function updateElementByIdRecursive(id, elements, fieldToModify, value) {
  for (let i = 0; i < elements.length; i++) {
    if (Array.isArray(elements[i])) {
      // Jeśli element jest tablicą, wywołaj funkcję rekurencyjnie
      updateElementByIdRecursive(
        id.split("|")[0],
        elements[i],
        fieldToModify,
        value
      );
    } else if (typeof elements[i] === "object" && elements[i] !== null) {
      // Jeśli element jest obiektem, sprawdź jego id
      if (elements[i].id.split("|")[0] === id) {
        elements[i][fieldToModify] = value;
      } else {
        // Jeśli nie jest to żądany element, sprawdź jego dzieci
        for (const key in elements[i]) {
          if (Array.isArray(elements[i][key])) {
            // Jeśli element jest tablicą, wywołaj funkcję rekurencyjnie
            updateElementByIdRecursive(
              id.split("|")[0],
              elements[i][key],
              fieldToModify,
              value
            );
          }
        }
      }
    }
  }
  return false;
}
const codeStructureSlice = createSlice({
  name: "codeStructure",
  initialState: {
    elements: [],
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
      const { id, fieldToModify, value } = action.payload;
      const PathIndex = state.paths.find((el) => el.id === id).path;

      let objectValue = JSON.parse(
        JSON.stringify(getValueByPath(state, PathIndex))
      );

      objectValue = objectValue.find((obj) => obj.id.split("|")[0] === id);
      objectValue[fieldToModify] = value;
      updateElementByIdRecursive(id, state.elements, fieldToModify, value);

      const variableToUpdate = state.variables.find(
        (obj) => obj.id.split("|")[0] === id
      );
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
      const { object, to } = action.payload;
      //uzyskanie sciezku obiektu
      const elementPathIndex = state.paths.find((el) => el.id === object).path;
      //uzyskanie sziezki miejsca docelowego
      const splitTarget = to.split("|");
      const destinationPathIndex = state.paths.find(
        (el) => el.id === splitTarget[0]
      ).path;
      //pobranie obiektu z pod "object"
      const objectValue = JSON.parse(
        JSON.stringify(getValueByPath(state, elementPathIndex))
      ).find((el) => el.id === object);
      //wyznaczenie miejsca docelowego "to"
      let destinationValue = getValueByPath(state, destinationPathIndex);
      if (splitTarget.length === 2) {
        destinationValue = destinationValue.find(
          (el) => el.id === splitTarget[0]
        );
        destinationValue = getObjectByPath(destinationValue, ["children"]);
        destinationValue = destinationValue[splitTarget[1]];
      }
      //wyznaczenie starej lokalizacja "object"
      const oldObjectLoaction = getValueByPath(state, elementPathIndex);
      //wyznaczenie indeksu "object" w starej lokalizacja
      const oldObjectLoactionIndex = getValueByPath(
        state,
        elementPathIndex
      ).findIndex((el) => el.id === object);
      //usuniecie object z starej lokalizacji
      oldObjectLoaction.splice(oldObjectLoactionIndex, 1);
      //dodanie "object" do "to"
      destinationValue.push(objectValue);
      //aktualizacja path "object"
      state.paths.find((el) => el.id === object).path = JSON.parse(
        JSON.stringify(destinationPathIndex)
      );
      if (splitTarget.length === 2)
        state.paths.find((el) => el.id === object).path.push(to);
      //wyszukiwanie ścieżek powiązanych z "object"
      const filteredPaths = state.paths.filter((pathItem) => {
        // Sprawdzenie, czy identyfikator występuje w ścieżce
        return pathItem.path.some((segment) => segment.startsWith(object));
      });
      //aktualizacja ścieżek powiązanych z "object"
      filteredPaths.forEach((v, i) => {
        const elementIndex = v.path.findIndex((path) =>
          path.startsWith(object)
        );
        let pathToConcat = JSON.parse(JSON.stringify(destinationPathIndex));
        v.path.splice(0, elementIndex);
        if (to !== "mainId") pathToConcat = pathToConcat.concat(to);
        v.path = pathToConcat.concat(v.path);
      });
    },
    deleteElement(state, action) {
      debugger;
      //uzyskanie sziezki miejsca docelowego elementu
      const elementPath = state.paths.find(
        (el) => el.id === action.payload.id
      ).path;
      let elementLocalization = getValueByPath(state, elementPath);

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
