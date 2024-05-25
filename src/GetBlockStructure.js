import {
  classDefinitionBlock,
  classFieldBlock,
  classMethodBlock,
  classVariableBlock,
  classVariableDeclarationBlock,
  consoleLogBlock,
  dowhileBlock,
  forBlock,
  ifElseBlock,
  operatorsBlocks,
  returnBlock,
  standardBlock,
  valueBlock,
  variableBlock,
  variableDeclarationBlock,
  variableTypesBlock,
  whileBlock,
} from "./blockTypes";
import { v4 as uuidv4 } from "uuid";

export default function GetBlockStructure(object) {
  const dataArray = object.split("|");
  const resultJson = {
    id: uuidv4(),
    type: dataArray[0],
  };
  switch (dataArray[0]) {
    case ifElseBlock:
      //dataArray = type
      resultJson.children = [[], [], []];
      break;
    case forBlock:
      //dataArray = type
      resultJson.children = [[], [], [], []];
      break;
    case whileBlock:
      //dataArray = type
      resultJson.children = [[], []];
      break;
    case dowhileBlock:
      //dataArray = type
      resultJson.children = [[], []];
      break;
    case variableDeclarationBlock:
      //dataArray = type
      resultJson.methodId = null;
      resultJson.children = [[], []];
      break;
    case classVariableDeclarationBlock:
      //dataArray = type
      resultJson.name = "nowy_parametr";
      resultJson.children = [[]];
      break;
    case consoleLogBlock:
      //dataArray = type
      resultJson.children = [[]];
      break;
    case variableBlock:
      //dataArray = type
      resultJson.id = dataArray[1] + resultJson.id;
      break;
    case classVariableBlock:
      //dataArray = type|parametrId lub id zmiennej|classId|methodId
      resultJson.id +=
        "|" + dataArray[1] + "|" + dataArray[2] + "|" + dataArray[3];
      break;
    case operatorsBlocks:
      //dataArray = type|operator
      resultJson.name = dataArray[1];
      resultJson.operator = dataArray[1];
      resultJson.children = [[], []];
      break;
    case variableTypesBlock:
      //dataArray = type|name
      resultJson.name = dataArray[1];
      break;
    case classDefinitionBlock:
      //dataArray = type|classId
      resultJson.classId = dataArray[1];
      break;
    case classMethodBlock:
      //dataArray = type|classId|methodId
      resultJson.classId = dataArray[1];
      resultJson.methodId = dataArray[2];
      resultJson.children = [[], []];
      break;
    case classFieldBlock:
      resultJson.classId = dataArray[1];
      resultJson.fieldId = dataArray[2];
      resultJson.children = [[]];
      break;
    case valueBlock:
      //dataArray = type
      resultJson.value = "";
      resultJson.valueType = "integers";
      resultJson.methodId = null;
      break;
    case returnBlock:
      resultJson.children = [[]];
      break;
    case standardBlock:
      resultJson.subType = dataArray[1];
      resultJson.children = [[], [], [], [], [], [], [], []];
      break;
  }
  return resultJson;
}
