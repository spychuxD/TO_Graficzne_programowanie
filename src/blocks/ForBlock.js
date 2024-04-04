import "../App.css";
import { Fragment, useState } from "react";
import { forBlock } from "../blockTypes";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "./DeleteBlock";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import MainDroppable from "../components/MainDroppable";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";
function ForBlock(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
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
    dispatch(addElement(newElement));
  };

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
    });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <Fragment>
      {props.id !== undefined ? (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
          {!isDragging ? (
            <div
              className="bg-color-for border-r-10"
              style={{
                border: "1px",
                borderStyle: "solid",
                borderColor: "#e3eef2",
              }}
            >
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
                <MainDroppable dropId={"for"}>
                  {props.items.map((item, index) => (
                    <div
                      className="item-container"
                      style={{
                        left: "auto !important",
                        top: "auto !important",
                      }}
                    >
                      <div className="workbench m-8 bg-color-workbench">
                        {item.name}
                      </div>
                    </div>
                  ))}
                </MainDroppable>
              </div>
              <div>
                <DeleteBlock
                  id={props.id}
                  setBlocksState={props.setBlocksState}
                />
              </div>
            </div>
          ) : (
            <div className="control-block w-20 bg-color-for text-bold text-white">for</div>
          )}
        </div>
      ) : (
        <div
          className="control-block-grid-2 bg-color-for"
          onClick={onAddElement}
          style={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "#e3eef2",
          }}
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
          <span className="text-bold text-white">FROM</span>
          <input disabled className="block-input " value={0} />
          <span className="text-bold text-white">TO</span>
          <input disabled className="block-input " value={10} />
          <span className="text-bold text-white">AT STEP</span>
          <input disabled className="block-input " value={1} />
        </div>
      )}
    </Fragment>
  );
}
export default ForBlock;
