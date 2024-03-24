import { Droppable } from "react-beautiful-dnd";
import "../App.css";
import { Fragment } from "react";
import DeleteBlock from "./DeleteBlock";
import { endBlock } from "../blockTypes";
import { v4 as uuidv4 } from "uuid";

function EndBlock({ name, items, id, setBlocksState }) {
  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "stop",
      type: endBlock,
      items: [],
    };
    setBlocksState((prev) => [...prev, newElement]);
  };

  return (
    <Fragment>
      {id !== undefined ? (
        <Droppable droppableId={id}>
          {(provided) => (
            <div
              className="control-block bg-color-end mb-15"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className="text-bold text-white">STOP</div>
              <DeleteBlock id={id} setBlocksState={setBlocksState} />
            </div>
          )}
        </Droppable>
      ) : (
        <div className="control-block bg-color-end" onClick={onAddElement}>
          <div className="text-bold text-white">STOP</div>
        </div>
      )}
    </Fragment>
  );
}
export default EndBlock;
