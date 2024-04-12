import {
  arithmeticBlocks,
  beginBlock,
  endBlock,
  forBlock,
  ifElseBlock,
  consoleLogBlock,
  variableBlock,
  setOn,
  classDefinitionBlock,
  variableDeclarationBlock,
  variableTypesBlock,
} from "./blockTypes";
import IfElseBlock from "./blocks/IfElseBlock";
import BeginBlock from "./blocks/BeginBlock";
import EndBlock from "./blocks/EndBlock";
import ForBlock from "./blocks/ForBlock";
import ArithmeticBlocks from "./blocks/ArithmeticBlocks/ArithmeticBlocks";
import VariableBlock from "./blocks/VariableBlocks/VariableBlock";
import VariableDeclarationBlock from "./blocks/VariableBlocks/VariableDeclarationBlock";
import VariableTypesBlock from "./blocks/VariableBlocks/VariableTypesBlock";
import SetOn from "./blocks/SetOn";
import ConsoleLogBlock from "./blocks/ConsoleLogBlock";
import ClassDefinitionBlock from "./blocks/ClassDefinitionBlock";

export default function blockRenderer(store, index) {
  switch (store.type) {
    case beginBlock:
      return <BeginBlock {...store} key={index} />;
    case forBlock:
      return <ForBlock {...store} key={index} />;
    case endBlock:
      return <EndBlock {...store} key={index} />;
    case arithmeticBlocks:
      return <ArithmeticBlocks {...store} key={index} />;
    case ifElseBlock:
      return <IfElseBlock {...store} key={index} />;
    case consoleLogBlock:
      return <ConsoleLogBlock {...store} key={index} />;
    case variableBlock:
      return <VariableBlock {...store} key={index} />;
    case variableDeclarationBlock:
      return <VariableDeclarationBlock {...store} key={index} />;
    case setOn:
      return <SetOn {...store} key={index} />;
    case classDefinitionBlock:
      return <ClassDefinitionBlock {...store} key={index} />;
    case variableTypesBlock:
      return <VariableTypesBlock {...store} key={index} />;
    default:
      break;
  }
}
