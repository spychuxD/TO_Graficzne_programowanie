export const consoleOut = {
  id: "consoleOut",
  texts: ["Display"],
  styleClass: "bg-color-list",
  structureCS: "Console.Write(?)",
  structureJS: "console.log( ? )",
  structurePython: "print( ? )",
  moveText: "Display",
  appendBeforeTraverseInJSGenerator: true,
};
export const returnValue = {
  id: "returnValue",
  texts: ["Return"],
  styleClass: "bg-color-list",
  structureCS: "return ?",
  structureJS: "return ?",
  moveText: "Return",
  appendBeforeTraverseInJSGenerator: true,
};
export const AtIndex = {
  id: "AtIndex",
  texts: ["","At Index"],
  styleClass: "bg-color-reference",
  structureCS: "?[?]",
  moveText: "At index",
  appendBeforeTraverseInJSGenerator: true,
};
export const AssignTo = {
  id: "AssignTo",
  texts: ["","Assign"],
  styleClass: "bg-color-reference",
  structureCS: "?=?",
  moveText: "AssignTo",
  appendBeforeTraverseInJSGenerator: true,
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
export const constructors = {
  id: "constructors",
  texts: ["Constructor",""],
  styleClass: "bg-color-list",
  structureCS: " new ?(?)",
  moveText: "Constructor",
  appendBeforeTraverseInJSGenerator: true,
};
export const delegate = {
  id: "delegate",
  texts: ["delegeate variable","and do"],
  styleClass: "bg-color-list",
  structureCS: " delegate(?){?;}",
  moveText: "Delegate",
  appendBeforeTraverseInJSGenerator: true,
};
export const blockTypesInit = {
  js: [arrowFunction, nextLine, object, array],
  standardTypes: [consoleOut, returnValue],
  referenceTypes: [AtIndex,AssignTo,delegate],
  constructorsTypes:[constructors]
};
