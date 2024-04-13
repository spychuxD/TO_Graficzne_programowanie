import {
  operatorsBlocks,
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
  whileBlock,
  dowhileBlock,
} from "./blockTypes";
import IfElseBlock from "./blocks/IfElseBlock";
import BeginBlock from "./blocks/BeginBlock";
import EndBlock from "./blocks/EndBlock";
import ForBlock from "./blocks/ForBlock";
import OperatorsBlocks from "./blocks/OperatorsBlocks/OperatorsBlocks";
import VariableBlock from "./blocks/VariableBlocks/VariableBlock";
import VariableDeclarationBlock from "./blocks/VariableBlocks/VariableDeclarationBlock";
import VariableTypesBlock from "./blocks/VariableBlocks/VariableTypesBlock";
import SetOn from "./blocks/SetOn";
import ConsoleLogBlock from "./blocks/ConsoleLogBlock";
import ClassDefinitionBlock from "./blocks/ClassDefinitionBlock";
import WhileBlock from "./blocks/WhileBlock";
import DowhileBlock from "./blocks/DowhileBlock";

export default function blockRenderer(store, index) {
  switch (store.type) {
    case beginBlock:
      return <BeginBlock {...store} key={index} />;
    case forBlock:
      return <ForBlock {...store} key={index} />;
    case whileBlock:
      return <WhileBlock {...store} key={index} />;
    case dowhileBlock:
      return <DowhileBlock {...store} key={index} />;
    case endBlock:
      return <EndBlock {...store} key={index} />;
    case operatorsBlocks:
      return <OperatorsBlocks {...store} key={index} />;
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
