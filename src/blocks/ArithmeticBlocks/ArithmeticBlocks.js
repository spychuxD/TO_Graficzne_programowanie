import { Draggable } from "react-beautiful-dnd";
import "../../App.css";
import { arithmeticBlocks } from "../../blockTypes";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "../DeleteBlock";
import { ArithmeticOperations } from "./ArithmeticOperations";

function ArithmeticBlocks({ name, items, id, blocksState, setBlocksState }) {
  const onAddElement = (name) => {
    const newElement = {
      id: uuidv4(),
      name: name,
      type: arithmeticBlocks,
      //items: [],
    };
    setBlocksState((prev) => [...prev, newElement]);
  };
  const arithemticType = (name) => {
    switch (name) {
      case ArithmeticOperations.addition:
        return <div className="text-bold text-white">+</div>;
      case ArithmeticOperations.subtraction:
        return <div className="text-bold text-white">-</div>;
      case ArithmeticOperations.multiplication:
        return <div className="text-bold text-white">*</div>;
      case ArithmeticOperations.division:
        return <div className="text-bold text-white">/</div>;
      case ArithmeticOperations.modulo:
        return <div className="text-bold text-white">%</div>;
      default:
        break;
    }
  };
  return (
    <Fragment>
      {id !== undefined ? (
        <Draggable draggableId={id} isDragDisabled={true} index={0}>
          {(provided) => (
            <div
              className="control-block bg-color-arithmetic"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className="control-block bg-color-arithmetic">
                <input className="block-input" type="number" />
                {arithemticType(name)}
                <input className="block-input" type="number" />{" "}
                {provided.placeholder}
              </div>
              <DeleteBlock setBlocksState={setBlocksState} id={id} />
            </div>
          )}
        </Draggable>
      ) : (
        <div className="control-block bg-color-arithmetic" onClick={() => onAddElement(name)}>
          <input className="block-input" type="number" />
          {arithemticType(name)}
          <input className="block-input" type="number" />
        </div>
      )}
    </Fragment>
  );
}
export default ArithmeticBlocks;
