//< List >
export const iterator = {
  id: "iterator",
  texts: ["Iterator"],
  styleClass: "bg-color-list",
  structureCPlusPLus: "?::iterator",
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

//< Stadard >
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
export const push = {
  id: "push",
  texts: ["", "dodaj"],
  styleClass: "bg-color-js-array",
  structureJS: ".push( ? )",
  moveText: "dodaj",
};
export const pop = {
  id: "pop",
  texts: ["", "usuń z końca"],
  styleClass: "bg-color-js-array",
  structureJS: ".pop( ? )",
  moveText: "usuń z końca",
};
export const shift = {
  id: "shift",
  texts: ["", "usuń z początku"],
  styleClass: "bg-color-js-array",
  structureJS: ".shift( ? )",
  moveText: "usuń z początku",
};
export const unshift = {
  id: "unshift",
  texts: ["", "dodaj na początek"],
  styleClass: "bg-color-js-array",
  structureJS: ".unshift( ? )",
  moveText: "dodaj na początek",
};
export const concat = {
  id: "concat",
  texts: ["", "złącz"],
  styleClass: "bg-color-js-array",
  structureJS: ".concat( ? )",
  moveText: "złącz",
};
export const slice = {
  id: "slice",
  texts: ["", "wybrana część"],
  styleClass: "bg-color-js-array",
  structureJS: ".slice( ? )",
  moveText: "wybrana część",
};
export const splice = {
  id: "splice",
  texts: ["", "splice"],
  styleClass: "bg-color-js-array",
  structureJS: ".splice( ? )",
  moveText: "splice",
};
export const map = {
  id: "map",
  texts: ["", "map"],
  styleClass: "bg-color-js-array",
  structureJS: ".map( ? )",
  moveText: "map",
};
export const filter = {
  id: "filter",
  texts: ["", "filter"],
  styleClass: "bg-color-js-array",
  structureJS: ".filter( ? )",
  moveText: "filter",
};
export const forEach = {
  id: "forEach",
  texts: ["", "forEach"],
  styleClass: "bg-color-js-array",
  structureJS: ".forEach( ? )",
  moveText: "forEach",
};
export const reduce = {
  id: "reduce",
  texts: ["", "reduce"],
  styleClass: "bg-color-js-array",
  structureJS: ".reduce( ? )",
  moveText: "reduce",
};
export const sort = {
  id: "sort",
  texts: ["", "sortuj"],
  styleClass: "bg-color-js-array",
  structureJS: ".sort( ? )",
  moveText: "sortuj",
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

//< Operators >

export const allBlockTypes = {
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
  arrayMethods: [
    push,
    pop,
    shift,
    unshift,
    concat,
    slice,
    splice,
    map,
    filter,
    forEach,
    reduce,
    sort,
  ],
  standardTypes: [consoleOut, returnValue],
};
