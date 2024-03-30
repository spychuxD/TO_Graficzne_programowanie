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
                className="w-full"
              >
                <div className="text-bold text-white">if</div>
                <div className="w-full bg-color-if-condition p-8 h-50px b-r-10">
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
                          style={{
                            ...provided.draggableProps.style,
                            left: "auto !important",
                            top: "auto !important",
                          }}
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
                className="w-full bg-color-if-body p-8 m-8 h-50px b-r-10"
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
                        style={{
                          ...provided.draggableProps.style,
                          left: "auto !important",
                          top: "auto !important",
                        }}
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
                className="w-full"
              >
                <div className="text-bold text-white">else</div>
                <div className="w-full bg-color-else p-8 h-50px b-r-10">
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
                          style={{
                            ...provided.draggableProps.style,
                            left: "auto !important",
                            top: "auto !important",
                          }}
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
        <div className="control-block bg-color-if" onClick={onAddElement}>
          <div>
            <div className="flex-row">
              <div className="text-bold text-white">if</div>
              <div className="flex-row">
                <div className="text-bold text-white">{"("}</div>
                <div className="insideBox bg-color-if-condition m-8" />
                <div className="text-bold text-white">{")"}</div>
              </div>
            </div>
            <div className="flex-row">
              <div className="text-bold text-white">{"{"}</div>
              <div className="insideBox bg-color-if-body m-8" />
              <div className="text-bold text-white">{"}"}</div>
            </div>
          </div>
          <div>
            <div className="text-bold text-white">else</div>
            <div className="flex-row">
              <div className="text-bold text-white">{"{"}</div>
              <div className="insideBox bg-color-else m-8" />
              <div className="text-bold text-white">{"}"}</div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default IfElseBlock;
