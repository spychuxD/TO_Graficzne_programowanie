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
  switch (object) {
    case beginBlock:
      return {
        id: uuidv4(),
        name: "start",
        type: beginBlock,
        items: [],
      };
    case endBlock:
      return {
        id: uuidv4(),
        name: "stop",
        type: endBlock,
        items: [],
      };
    case ifElseBlock:
      return {
        id: uuidv4(),
        name: "ifElseBlock",
        type: ifElseBlock,
        children: [[], [], []],
      };
    case forBlock:
      return {
        id: uuidv4(),
        name: "for",
        type: forBlock,
        children: [[], [], [], []],
      };
    case whileBlock:
      return {
        id: uuidv4(),
        name: "while",
        type: whileBlock,
        children: [[], []],
      };
    case dowhileBlock:
      return {
        id: uuidv4(),
        name: "dowhile",
        type: dowhileBlock,
        children: [[], []],
      };
    case variableDeclarationBlock:
      return {
        id: uuidv4(),
        name: "variableDeclaration",
        type: variableDeclarationBlock,
        variableName: "test",
        availability: "public",
        children: [[]],
      };
    case setOn:
      return {
        id: uuidv4(),
        name: "setOn",
        type: setOn,
        children: [[], []],
        variableValue: "",
      };
    case consoleLogBlock:
      return {
        id: uuidv4(),
        name: "consoleLogBlock",
        type: consoleLogBlock,
        children: [[]],
      };
    case variableBlock:
      return {
        id: "|" + uuidv4(),
        name: "variable",
        type: variableBlock,
      };
    case operatorsBlocks:
      return {
        id: uuidv4(),
        name: null,
        operator: null,
        type: operatorsBlocks,
        children: [[], []],
      };
    case variableTypesBlock:
      return {
        id: uuidv4(),
        name: "",
        type: variableTypesBlock,
      };
    case classDefinitionBlock:
      return {
        id: uuidv4(),
        classId: null,
        type: classDefinitionBlock,
      };
    case classMethodBlock:
      return {
        id: uuidv4(),
        name: "classMethodBlock",
        type: classMethodBlock,
        classId: null,
        methodId: null,
        children: [[]],
      };
  }
}
