export const iterator = {
  id: "iterator",
  texts: ["Iterator"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?::iterator",
  moveText: "Iterator",
};
export const iteratorBegin = {
  id: "iteratorBegin",
  texts: ["Begin"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.begin()",
  moveText: "Iterator początku",
};
export const iteratorEnd = {
  id: "iteratorEnd",
  texts: ["End"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.end()",
  moveText: "Iterator końca",
};
export const listDataType = {
  id: "listDataType",
  texts: ["Lista"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "std::list<?>",
  moveText: "Lista",
};
export const listPushFront = {
  id: "listPushFront",
  texts: ["Push front", "element"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.push_front(?)",
  moveText: "Dodaj na początku",
};
export const listPushBack = {
  id: "listPushBack",
  texts: ["Push back", "element"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.push_back(?)",
  moveText: "Dodaj na końcu",
};
export const listPopFront = {
  id: "listPopFront",
  texts: ["Pop front"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.pop_front(?)",
  moveText: "Zabierz z początku",
};
export const listPopBack = {
  id: "listPopBack",
  texts: ["Pop back"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.pop_back(?)",
  moveText: "Zabierz z końca",
};
export const listGetFront = {
  id: "listGetFront",
  texts: ["Front"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.front()",
  moveText: "Pierwszy",
};
export const listGetBack = {
  id: "listGetBack",
  texts: ["Back"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.back()",
  moveText: "Ostatni",
};
export const listIsEmpty = {
  id: "listIsEmpty",
  texts: ["Is Empty"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.empty()",
  moveText: "Is Empty",
};
export const listGetSize = {
  id: "listGetSize",
  texts: ["Size"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.size()",
  moveText: "Size",
};
export const listClear = {
  id: "listClear",
  texts: ["Clear"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.clear()",
  moveText: "Clear",
};
export const listAtIndex = {
  id: "listAtIndex",
  texts: ["List", "at Index"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?.[?]",
  moveText: "At index",
};

export const vectorDataType = {
  id: "vectorDataType",
  texts: ["Wektor"],
  styleClass: "bg-color-vector",
  structureCPlusPLus: "std::vector<?>",
  moveText: "Wektor",
};

export const vectorPushBack = {
  id: "vectorPushBack",
  texts: ["Push back", "element"],
  styleClass: "bg-color-vector",
  structureCPlusPLus: "?.push_back(?)",
  moveText: "Dodaj na końcu",
};

export const vectorPopBack = {
  id: "vectorPopBack",
  texts: ["Pop back"],
  styleClass: "bg-color-vector",
  structureCPlusPLus: "?.pop_back()",
  moveText: "Zabierz z końca",
};

export const vectorAtIndex = {
  id: "vectorAtIndex",
  texts: ["Wektor", "na pozycji"],
  styleClass: "bg-color-vector",
  structureCPlusPLus: "?.at(?)",
  moveText: "Element na pozycji",
};

export const vectorSize = {
  id: "vectorSize",
  texts: ["Size"],
  styleClass: "bg-color-vector",
  structureCPlusPLus: "?.size()",
  moveText: "Rozmiar",
};

export const consoleOut = {
  id: "consoleOut",
  texts: ["Wyświetl"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "std::cout<< ? <<std::endl",
  structureJS: "console.log( ? )",
  structurePython: "print( ? )",
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
export const referenceStart = {
  id: "referenceStart",
  texts: ["Referenc *"],
  styleClass: "bg-color-reference",
  structureCPlusPLus: "*?",
  moveText: "Reference",
};
export const referenceEt = {
  id: "referenceEt",
  texts: ["Referenc &"],
  styleClass: "bg-color-reference",
  structureCPlusPLus: "&?",
  moveText: "Reference",
};
export const arrowFunction = {
  id: "arrowFunction",
  texts: ["", "=>"],
  styleClass: "bg-color-js-first-variant",
  structureJS: "( ? )=>{ ? }",
  moveText: "funkcja strzałkowa",
  appendBeforeTraverseInJSGenerator: true,
};
export const nextLine = {
  id: "nextLine",
  texts: ["następna linia"],
  styleClass: "bg-color-js-first-variant",
  structureJS: '"\\n"',
  moveText: "następna linia",
  disableMainDroppable: true,
};
export const object = {
  id: "Object;js;declaration3",
  texts: ["{ ? }"],
  styleClass: "bg-color-js-first-variant",
  structureJS: "{ ? }",
  moveText: "{}",
  appendBeforeTraverseInJSGenerator: true,
  disableMainDroppable: false,
};
export const array = {
  id: "Array;js;declaration3",
  texts: ["[ ? ]"],
  styleClass: "bg-color-js-first-variant",
  structureJS: "[ ? ]",
  moveText: "[]",
  appendBeforeTraverseInJSGenerator: true,
  disableMainDroppable: false,
};

export const blockTypesInit = {
  js: [arrowFunction, nextLine, object, array],
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
    listGetSize,
    listIsEmpty,
    listAtIndex,
  ],
  vectorTypes: [
    vectorDataType,
    vectorPushBack,
    vectorPopBack,
    vectorAtIndex,
    vectorSize,
  ],
  standardTypes: [consoleOut, returnValue],
  referenceTypes: [referenceEt, referenceStart],
};
