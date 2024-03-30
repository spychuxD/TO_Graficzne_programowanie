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
              className="control-block bg-color-arithmetic "
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className="control-block-without-shadow bg-color-arithmetic">
                <input className="block-input" type="number" />
                <span className="m-8">{arithemticType(name)}</span>
                <input className="block-input" type="number" />{" "}
                {provided.placeholder}
              </div>
              <DeleteBlock setBlocksState={setBlocksState} id={id} />
            </div>
          )}
        </Draggable>
      ) : (
        <div
          className="control-block bg-color-arithmetic flex-row w-30 justify-center align-center"
          onClick={() => onAddElement(name)}
        >
          <div>
            <input disabled className="block-input w-half"/>
          </div>
          <div className="m-8">{arithemticType(name)}</div>
          <div>
            <input disabled className="block-input w-half"/>
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default ArithmeticBlocks;
