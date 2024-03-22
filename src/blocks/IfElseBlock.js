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
        <div className="control-block bg-color-if">
          <Droppable droppableId={id + "ifCondition"}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div style={{ display: "flex", gap: 5 }}>
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
              </div>
            )}
          </Droppable>
          <Droppable droppableId={id}>
            {(provided) => (
              <div
                //style={forBlockStyles}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div style={{ display: "flex", gap: 5 }}>
                  <div
                    //className="items-container"
                    style={{
                      backgroundColor: "red",
                      width: "100%",
                      minHeight: 100,
                    }}
                  >
                    {items.map((item, index) => (
                      <Draggable
                        //isDragDisabled={true}
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
              </div>
            )}
          </Droppable>
          <Droppable droppableId={id + "elseBody"}>
            {(provided) => (
              <div
                //style={forBlockStyles}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div style={{ display: "flex", gap: 5 }}>
                  <div className="text-bold text-white">else</div>

                  <div
                    //className="items-container"
                    style={{
                      backgroundColor: "yellow",
                      width: "100%",
                      minHeight: 100,
                    }}
                  >
                    {elseItems.map((item, index) => (
                      <Draggable
                        //isDragDisabled={true}
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
              </div>
            )}
          </Droppable>

          <DeleteBlock id={id} setBlocksState={setBlocksState} />
        </div>
      ) : (
        <div  className="control-block bg-color-if" onClick={onAddElement}>
          {/* <div style={{ display: "flex", gap: 5 }}>
            <div className="text-bold text-white">for</div>
            <select
              disabled
              className="block-input"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="">Wybierz opcję</option>
            </select>
            <div className="text-bold text-white">from</div>
            <input disabled className="block-input" type="number" value={0} />
            <div className="text-bold text-white">to</div>
            <input disabled className="block-input" type="number" value={10} />
            <div className="text-bold text-white">at step</div>
            <input disabled className="block-input" type="number" value={1} />
          </div>
          <div className="items-container"></div> */}
        </div>
      )}
    </Fragment>
  );
}
export default IfElseBlock;
