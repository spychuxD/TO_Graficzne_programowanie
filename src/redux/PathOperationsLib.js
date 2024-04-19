export const findLocationByPath = (obj, path) => {
   
  let newObj = obj;
  let tmp = [];
  let nextIsSplitArray;
  path.forEach((v, i) => {
    const splitTarget = v.split("|");
    if (splitTarget.length === 2) {
      if(splitTarget[1]!=="-1")
      {
        newObj = newObj.find((el) => el.id === splitTarget[0]).children;
        newObj = newObj[splitTarget[1]];
      }
      else{
        newObj = newObj.find((el) => el.id === splitTarget[0]);
      } 
      
      nextIsSplitArray = JSON.stringify(newObj);
    } else {
      tmp = [splitTarget[0]];
      newObj = tmp.reduce((acc, key) => acc[key], newObj);
      nextIsSplitArray = JSON.stringify(newObj);
    }
  });

  return newObj;
};
export const findPath = (state, id) => {
  return state.paths.find((el) => el.id === id)?.path;
};
export const findObject = (state, id, path) => {
  return JSON.parse(JSON.stringify(findLocationByPath(state, path))).find(
    (el) => el.id === id
  );
};

export const getObjectByPath = (obj, path) => {
  const result = path.reduce((acc, key) => acc[key], obj);
  return result === undefined ? [] : result;
};
export function updateElementByIdRecursive(id, elements, fieldToModify, value) {
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
