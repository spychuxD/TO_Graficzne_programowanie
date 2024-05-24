import {
  operatorsBlocks,
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
  classVariableDeclarationBlock,
  classVariableBlock,
  returnBlock,
  arrowFunctionBlock,
  methodsBlock,
  listOperation,
} from "./blockTypes";
import IfElseBlock from "./blocks/IfElseBlock";
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
import ClassVariableDeclarationBlock from "./blocks/ClassBlocks/ClassVariableDeclarationBlock";
import ClassVariableBlock from "./blocks/ClassBlocks/ClassVariableBlock";
import ReturnBlock from "./blocks/returnBlock";
import ArrowFunctionBlock from "./blocks/ArrowFunctionBlock";
import MethodsBlock from "./blocks/MethodsBlock/MethodsBlock";
import ListOperation from "./blocks/DataStructures/List/ListOperation";
export default function blockRenderer(store, index, isOverlay = false) {
  if (store === undefined) return;
  switch (store.type) {
    case forBlock:
      return <ForBlock {...store} key={index} isOverlay={isOverlay} />;
    case whileBlock:
      return <WhileBlock {...store} key={index} isOverlay={isOverlay} />;
    case dowhileBlock:
      return <DowhileBlock {...store} key={index} isOverlay={isOverlay} />;
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
    case classVariableDeclarationBlock:
      return (
        <ClassVariableDeclarationBlock
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
      return <ValueBlock {...store} key={index} isOverlay={isOverlay} />;
    case classVariableBlock:
      return (
        <ClassVariableBlock {...store} key={index} isOverlay={isOverlay} />
      );
    case returnBlock:
      return <ReturnBlock {...store} key={index} isOverlay={isOverlay} />;
    case arrowFunctionBlock:
      return (
        <ArrowFunctionBlock {...store} key={index} isOverlay={isOverlay} />
      );
    case methodsBlock:
      return <MethodsBlock {...store} key={index} isOverlay={isOverlay} />;
    case listOperation:
      return <ListOperation {...store} key={index} isOverlay={isOverlay}/>
      default:
      break;
  }
}
