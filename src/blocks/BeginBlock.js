import { Droppable } from "react-beautiful-dnd";
import "../App.css";
import { beginBlock } from "../blockTypes";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "./DeleteBlock";
function BeginBlock({ name, items, id, blocksState, setBlocksState }) {
  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "start",
      type: beginBlock,
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
              className="control-block bg-color-start mb-15"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className="text-bold text-white">START</div>
              <DeleteBlock setBlocksState={setBlocksState} id={id} />
            </div>
          )}
        </Droppable>
      ) : (
        <div className="control-block bg-color-start" onClick={onAddElement}>
          <div className="text-bold text-white">START</div>
        </div>
      )}
    </Fragment>
  );
}
export default BeginBlock;
