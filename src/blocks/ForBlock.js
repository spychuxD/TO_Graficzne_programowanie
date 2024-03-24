import { Droppable, Draggable } from "react-beautiful-dnd";
import "../App.css";
import { Fragment, useState } from "react";
import { forBlock } from "../blockTypes";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "./DeleteBlock";
function ForBlock({ name, items, id, blocksState, setBlocksState }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "for",
      type: forBlock,
      items: [],
    };
    setBlocksState((prev) => [...prev, newElement]);
  };

  return (
    <Fragment>
      {id !== undefined ? (
        <Droppable droppableId={id}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div className="bg-color-for border-r-10 for-shadow">
                <div className="control-block-grid">
                  <div className="text-bold text-white">FOR</div>
                  <select
                    className="block-select"
                    value={selectedOption}
                    onChange={handleOptionChange}
                  >
                    <option value="">Wybierz opcję</option>
                    <option value="option1">Opcja 1</option>
                    <option value="option2">Opcja 2</option>
                    <option value="option3">Opcja 3</option>
                  </select>
                  <div className="text-bold text-white">FROM</div>
                  <input className="block-input" type="number" />
                  <div className="text-bold text-white">TO</div>
                  <input className="block-input" type="number" />
                  <div className="text-bold text-white">AT STEP</div>
                  <input className="block-input" type="number" />
                </div>
                <div className="items-container">
                  {items.map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {(provided) => (
                        <div
                          className="item-container"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          style={{
                            ...provided.draggableProps.style,
                            left: "auto !important",
                            top: "auto !important",
                          }}
                        >
                          <div className="workbench mb-15">{item.name}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                <div>
                  <DeleteBlock id={id} setBlocksState={setBlocksState} />
                </div>
              </div>
            </div>
          )}
        </Droppable>
      ) : (
        <div
          className="control-block-grid-2 bg-color-for for-shadow"
          onClick={onAddElement}
        >
          <div className="text-bold text-white">FOR</div>
          <select
            disabled
            className="block-select "
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Wybierz opcję</option>
          </select>
          <div className="text-bold text-white">FROM</div>
          <input disabled className="block-input " value={0} />
          <div className="text-bold text-white">TO</div>
          <input disabled className="block-input " value={10} />
          <div className="text-bold text-white">AT STEP</div>
          <input disabled className="block-input " value={1} />
        </div>
      )}
    </Fragment>
  );
}
export default ForBlock;
