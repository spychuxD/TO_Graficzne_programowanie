export const iterator = {
  id: "iterator",
  texts: ["Iterator"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?::iterator",
  moveText: "Iterator",
};
export const iteratorBegin = {
  id: "iteratorBegin",
  texts: ["Iterator początku"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.begin()",
  moveText: "Iterator początku",
};
export const iteratorEnd = {
  id: "iteratorEnd",
  texts: ["Iterator końca"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.end()",
  moveText: "Iterator końca",
};
export const listDataType = {
  id: "listDataType",
  texts: ["Lista typu"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "std::list<?>",
  moveText: "Lista",
};
export const listPushFront = {
  id: "listPushFront",
  texts: ["Dodaj na początku", "element"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.push_front(?)",
  moveText: "Dodaj na początku",
};
export const listPushBack = {
  id: "listPushBack",
  texts: ["Dodaj na końcu", "element"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.push_back(?)",
  moveText: "Dodaj na końcu",
};
export const listPopFront = {
  id: "listPopFront",
  texts: ["Zabierz z początku"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.pop_front(?)",
  moveText: "Zabierz z początku",
};
export const listPopBack = {
  id: "listPopBack",
  texts: ["Zabierz z końca"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.pop_back(?)",
  moveText: "Zabierz z końca",
};
export const listGetFront = {
  id: "listGetFront",
  texts: ["Pokaż początek"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.front()",
  moveText: "Pierwszy",
};
export const listGetBack = {
  id: "listGetBack",
  texts: ["Pokaż koniec"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.back()",
  moveText: "Ostatni",
};

export const consoleOut = {
  id: "consoleOut",
  texts: ["Wyświetl"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "std::cout<< ? <<std::endl",
  structureJS: "console.log( ? )",
  moveText: "Wyświetl",
  appendBeforeTraverseInJSGenerator: true,
};
export const returnValue = {
  id: "returnValue",
  texts: ["Zwróć"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "return ?",
  structureJS: "return ?",
  moveText: "Zwróć",
  appendBeforeTraverseInJSGenerator: true,
};
export const arrowFunction = {
  id: "arrowFunction",
  texts: ["", "=>"],
  styleClass: "bg-color-js-array",
  structureJS: "( ? )=>{ ? }",
  moveText: "funkcja strzałkowa",
  appendBeforeTraverseInJSGenerator: true,
};
export const nextLine = {
  id: "nextLine",
  texts: ["następna linia"],
  styleClass: "bg-color-js-array",
  structureJS: '"\\n"',
  moveText: "następna linia",
  disableMainDroppable: true,
};
export const object = {
  id: "object",
  texts: ["{ ? }"],
  styleClass: "bg-color-js-array",
  structureJS: "{ ? }",
  moveText: "{}",
  appendBeforeTraverseInJSGenerator: true,
  disableMainDroppable: false,
};
export const array = {
  id: "array",
  texts: ["[ ? ]"],
  styleClass: "bg-color-js-array",
  structureJS: "[ ? ]",
  moveText: "[]",
  appendBeforeTraverseInJSGenerator: true,
  disableMainDroppable: false,
};

export const blockTypesInit = {
  js: [arrowFunction, nextLine],
  listTypes: [
    iterator,
    iteratorBegin,
    iteratorEnd,
    listDataType,
    listPushFront,
    listPushBack,
    listPopFront,
    listPopBack,
    listGetFront,
    listGetBack,
  ],
  standardTypes: [consoleOut, returnValue],
};
