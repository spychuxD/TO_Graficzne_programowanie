export const findLocationByPath = (obj, path) => {
  let newObj = obj;
  let tmp = [];
  let nextIsSplitArray;
  if (!path) return;
  path.forEach((v, i) => {
    const splitTarget = v.split("|");
    if (splitTarget.length === 2) {
      if (splitTarget[1] !== "-1") {
        newObj = newObj.find((el) => el.id === splitTarget[0]).children;
        newObj = newObj[splitTarget[1]];
      } else {
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
  return findLocationByPath(state, path).find(
    (el) => el.id === id
  );
};

export const getObjectByPath = (obj, path) => {
  const result = path.reduce((acc, key) => acc[key], obj);
  return result === undefined ? [] : result;
};
export function findAndDeleteByPath(state, pathToObject, objectId) {
  debugger;
  //wyznaczenie starej lokalizacja "object"
  const oldObjectLoaction = findLocationByPath(state, pathToObject);
  //wyznaczenie indeksu "object" w starej lokalizacja
  const oldObjectLoactionIndex = findLocationByPath(
    state,
    pathToObject
  ).findIndex((el) => el.id === objectId);
  //usuniecie object z starej lokalizacji
  oldObjectLoaction.splice(oldObjectLoactionIndex, 1);
}
export function findRelatedPaths(state, objectId) {
  return state.paths.filter((pathItem) => {
    // Sprawdzenie, czy identyfikator występuje w ścieżce
    return pathItem.path.some((segment) => segment.startsWith(objectId));
  });
}
export function updateRelatedPaths(relatedPaths, pathTo, objectId, toId) {
  relatedPaths.forEach((v, i) => {
    //wyszukanie indeksu w ścieżce w którym występuje id przenoszonego elementu
    const elementIndex = v.path.findIndex((path) => path.startsWith(objectId));
    //wyznaczenie ścieżki która zastąpi nieaktualną część starej śzieżki
    let pathToConcat = JSON.parse(JSON.stringify(pathTo));
    //usunięcie nieaktualnej części ścieżki
    v.path.splice(0, elementIndex);
    //uwzględnienie id elementu końcowego jeśli nie jest to id głównego kontenera
    if (toId !== "mainId") pathToConcat = pathToConcat.concat(toId);
    v.path = pathToConcat.concat(v.path);
  });
}
export function updateObjectPath(state, objectId, pathTo, toSplit, toId) {
  state.paths.find((el) => el.id === objectId).path = JSON.parse(
    JSON.stringify(toSplit.length === 2 ? pathTo.concat(toId) : pathTo)
  );
}
