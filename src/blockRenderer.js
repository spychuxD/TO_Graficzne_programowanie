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
  classMethodBlock,
  classFieldBlock,
  valueBlock,
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
import ClassDataTypeBlock from "./blocks/ClassBlocks/ClassDataTypeBlock";
import WhileBlock from "./blocks/WhileBlock";
import DowhileBlock from "./blocks/DowhileBlock";
import ClassMethodBlock from "./blocks/ClassBlocks/ClassMethodBlock";
import ClassFieldBlock from "./blocks/ClassBlocks/ClassFieldBlock";
import ValueBlock from "./blocks/VariableBlocks/VlaueBlock";

export default function blockRenderer(store, index, isOverlay = false) {
  switch (store.type) {
    case beginBlock:
      return <BeginBlock {...store} key={index} isOverlay={isOverlay} />;
    case forBlock:
      return <ForBlock {...store} key={index} isOverlay={isOverlay} />;
    case whileBlock:
      return <WhileBlock {...store} key={index} isOverlay={isOverlay} />;
    case dowhileBlock:
      return <DowhileBlock {...store} key={index} isOverlay={isOverlay} />;
    case endBlock:
      return <EndBlock {...store} key={index} isOverlay={isOverlay} />;
    case operatorsBlocks:
      return <OperatorsBlocks {...store} key={index} isOverlay={isOverlay} />;
    case ifElseBlock:
      return <IfElseBlock {...store} key={index} isOverlay={isOverlay} />;
    case consoleLogBlock:
      return <ConsoleLogBlock {...store} key={index} isOverlay={isOverlay} />;
    case variableBlock:
      return <VariableBlock {...store} key={index} isOverlay={isOverlay} />;
    case variableDeclarationBlock:
      return (
        <VariableDeclarationBlock
          {...store}
          key={index}
          isOverlay={isOverlay}
        />
      );
    case setOn:
      return <SetOn {...store} key={index} isOverlay={isOverlay} />;
    case classDefinitionBlock:
      return (
        <ClassDataTypeBlock {...store} key={index} isOverlay={isOverlay} />
      );
    case variableTypesBlock:
      return (
        <VariableTypesBlock {...store} key={index} isOverlay={isOverlay} />
      );
    case classMethodBlock:
      return <ClassMethodBlock {...store} key={index} isOverlay={isOverlay} />;
    case classFieldBlock:
      return <ClassFieldBlock {...store} key={index} isOverlay={isOverlay} />;
    case valueBlock:
      return <ValueBlock {...store} key={index} isOverlay={isOverlay} />
    default:
      break;
  }
}
