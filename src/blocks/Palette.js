import ForBlock from "./ForBlock";
import BeginBlock from "./BeginBlock";
import EndBlock from "./EndBlock";
import { ArithmeticOperations } from "./ArithmeticBlocks/ArithmeticOperations";
import ArithmeticBlocks from "./ArithmeticBlocks/ArithmeticBlocks";

export default function Palette({ blocksState, setBlocksState }) {
  return (
    <div>
      <BeginBlock blocksState={blocksState} setBlocksState={setBlocksState} />
      <ForBlock blocksState={blocksState} setBlocksState={setBlocksState} />
      <EndBlock blocksState={blocksState} setBlocksState={setBlocksState} />
      {Object.keys(ArithmeticOperations).map((arithmeticOperation, index) => (
        <ArithmeticBlocks
          key={index}
          blocksState={blocksState}
          setBlocksState={setBlocksState}
          name={ArithmeticOperations[arithmeticOperation]}
        />
      ))}
    </div>
  );
}
