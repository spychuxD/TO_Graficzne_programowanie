import {
  arithmeticBlocks,
  beginBlock,
  endBlock,
  forBlock,
  ifElseBlock,
  variableBlock,
  setOn,
} from "./blockTypes";
import IfElseBlock from "./blocks/IfElseBlock";
import BeginBlock from "./blocks/BeginBlock";
import EndBlock from "./blocks/EndBlock";
import ForBlock from "./blocks/ForBlock";
import ArithmeticBlocks from "./blocks/ArithmeticBlocks/ArithmeticBlocks";
import VariableBlock from "./blocks/VariableBlock";
import SetOn from "./blocks/SetOn";

export default function blockRenderer(store) {
  switch (store.type) {
    case beginBlock:
      return <BeginBlock {...store} />;
    case forBlock:
      return <ForBlock {...store} />;
    case endBlock:
      return <EndBlock {...store} />;
    case arithmeticBlocks:
      return <ArithmeticBlocks {...store} />;
    case ifElseBlock:
      return <IfElseBlock {...store} />;
    case variableBlock:
      return <VariableBlock {...store} />;
    case setOn:
      return <SetOn {...store} />;
    default:
      break;
  }
}
