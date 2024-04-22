import {
  beginBlock,
  classDefinitionBlock,
  classMethodBlock,
  consoleLogBlock,
  dowhileBlock,
  endBlock,
  forBlock,
  ifElseBlock,
  operatorsBlocks,
  setOn,
  variableBlock,
  variableDeclarationBlock,
  variableTypesBlock,
  whileBlock,
} from "./blockTypes";
import { v4 as uuidv4 } from "uuid";

export default function GetBlockStructure(object) {
  const dataArray = object.split("|");
  switch (dataArray[0]) {
    case beginBlock:
      //dataArray = type
      return {
        id: uuidv4(),
        name: "start",
        type: beginBlock,
        items: [],
      };
    case endBlock:
      //dataArray = type
      return {
        id: uuidv4(),
        name: "stop",
        type: endBlock,
        items: [],
      };
    case ifElseBlock:
      //dataArray = type
      return {
        id: uuidv4(),
        name: "ifElseBlock",
        type: ifElseBlock,
        children: [[], [], []],
      };
    case forBlock:
      //dataArray = type
      return {
        id: uuidv4(),
        name: "for",
        type: forBlock,
        children: [[], [], [], []],
      };
    case whileBlock:
      //dataArray = type
      return {
        id: uuidv4(),
        name: "while",
        type: whileBlock,
        children: [[], []],
      };
    case dowhileBlock:
      //dataArray = type
      return {
        id: uuidv4(),
        name: "dowhile",
        type: dowhileBlock,
        children: [[], []],
      };
    case variableDeclarationBlock:
      //dataArray = type
      return {
        id: uuidv4(),
        name: "variableDeclaration",
        type: variableDeclarationBlock,
        variableName: "test",
        availability: "public",
        children: [[]],
      };
    case setOn:
      //dataArray = type
      return {
        id: uuidv4(),
        name: "setOn",
        type: setOn,
        children: [[], []],
        variableValue: "",
      };
    case consoleLogBlock:
      //dataArray = type
      return {
        id: uuidv4(),
        name: "consoleLogBlock",
        type: consoleLogBlock,
        children: [[]],
      };
    case variableBlock:
      //dataArray = type
      return {
        id: dataArray[1]+"|" + uuidv4(),
        name: "variable",
        type: variableBlock,
      };
    case operatorsBlocks:
      //dataArray = type|operator
      return {
        id: uuidv4(),
        name: dataArray[1],
        operator: dataArray[1],
        type: operatorsBlocks,
        children: [[], []],
      };
    case variableTypesBlock:
      //dataArray = type|name
      return {
        id: uuidv4(),
        name: dataArray[1],
        type: variableTypesBlock,
      };
    case classDefinitionBlock:
      //dataArray = type|classId
      return {
        id: uuidv4(),
        classId: dataArray[1],
        type: classDefinitionBlock,
      };
    case classMethodBlock:
      //dataArray = type|classId|methodId
      return {
        id: uuidv4(),
        name: "classMethodBlock",
        type: classMethodBlock,
        classId: dataArray[1],
        methodId: dataArray[2],
        children: [[],[],[],[],[],[],[],[],[],[]],//maksymalnie 10 paramrtrów dla metody, zabezpieczyc ograniczenie dodawania parametrów
      };
  }
}
