import { Draggable, Droppable } from "react-beautiful-dnd";
import "../../App.css";
import { beginBlockStyles, blockText } from "../../styles/BlockStyles";
import { arithmeticBlocks } from "../../blockTypes";
import { inputStyle } from "../../styles/InputStyles";

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
        return <div style={blockText}>+</div>;
      case ArithmeticOperations.subtraction:
        return <div style={blockText}>-</div>;
      case ArithmeticOperations.multiplication:
        return <div style={blockText}>*</div>;
      case ArithmeticOperations.division:
        return <div style={blockText}>/</div>;
      case ArithmeticOperations.modulo:
        return <div style={blockText}>%</div>;
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
              style={beginBlockStyles}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div style={beginBlockStyles}>
                <input style={inputStyle} type="number" />
                {arithemticType(name)}
                <input style={inputStyle} type="number" />{" "}
                {provided.placeholder}
              </div>
              <DeleteBlock setBlocksState={setBlocksState} id={id} />
            </div>
          )}
        </Draggable>
      ) : (
        <div style={beginBlockStyles} onClick={() => onAddElement(name)}>
          <input style={inputStyle} type="number" />
          {arithemticType(name)}
          <input style={inputStyle} type="number" />
        </div>
      )}
    </Fragment>
  );
}
export default ArithmeticBlocks;
