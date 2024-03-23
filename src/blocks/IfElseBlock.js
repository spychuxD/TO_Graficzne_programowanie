import { Droppable, Draggable } from "react-beautiful-dnd";
import "../App.css";
import { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "./DeleteBlock";
import ArithmeticBlocks from "./ArithmeticBlocks/ArithmeticBlocks";
import { arithmeticBlocks, forBlock, ifElseBlock } from "../blockTypes";
import ForBlock from "./ForBlock";
function IfElseBlock({
  name,
  items,
  elseItems,
  id,
  condition,
  blocksState,
  setBlocksState,
}) {
  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "ifElseBlock",
      type: ifElseBlock,
      condition: [],
      items: [],
      elseItems: [],
    };
    setBlocksState((prev) => [...prev, newElement]);
  };
  const [stores, setStores] = useState([]);

  const inCondition = (store) => {
    switch (store.type) {
      case arithmeticBlocks:
        return <ArithmeticBlocks {...store} setBlocksState={setStores} />;
      default:
        break;
    }
  };
  const inBody = (store) => {
    switch (store.type) {
      case forBlock:
        return <ForBlock {...store} setBlocksState={setStores} />;
      default:
        break;
    }
  };
  return (
    <Fragment>
      {id !== undefined ? (
        <div
          className="control-block bg-color-if"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Droppable droppableId={id + "ifCondition"}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  width: "100%",
                  minHeight: 100,
                }}
              >
                <div className="text-bold text-white">if</div>
                <div
                  style={{
                    backgroundColor: "blue",
                    width: "100%",
                    minHeight: 100,
                  }}
                >
                  {condition.map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          {inCondition(item)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
          <Droppable droppableId={id}>
            {(provided) => (
              <div
                style={{
                  backgroundColor: "red",
                  width: "100%",
                  minHeight: 100,
                }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items.map((item, index) => (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        {inBody(item)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId={id + "elseBody"}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  width: "100%",
                  minHeight: 100,
                }}
              >
                <div className="text-bold text-white">else</div>
                <div
                  style={{
                    backgroundColor: "yellow",
                    width: "100%",
                    minHeight: 100,
                  }}
                >
                  {elseItems.map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          {inBody(item)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>

          <DeleteBlock id={id} setBlocksState={setBlocksState} />
        </div>
      ) : (
        <div
          className="control-block bg-color-if"
          style={{ display: "flex", flexDirection: "column" }}
          onClick={onAddElement}
        >
          <div
            style={{
              width: "100%",
              minHeight: 100,
            }}
          >
            <div className="text-bold text-white">if</div>
            <div
              style={{
                backgroundColor: "blue",
                width: "100%",
                minHeight: 100,
              }}
            ></div>
          </div>
          <div
            style={{
              backgroundColor: "red",
              width: "100%",
              minHeight: 100,
            }}
          ></div>
          <div
            style={{
              width: "100%",
              minHeight: 100,
            }}
          >
            <div className="text-bold text-white">else</div>
            <div
              style={{
                backgroundColor: "yellow",
                width: "100%",
                minHeight: 100,
              }}
            ></div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default IfElseBlock;
