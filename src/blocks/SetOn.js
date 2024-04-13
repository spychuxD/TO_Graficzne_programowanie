import "../App.css";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "./DeleteBlock";
import { setOn } from "../blockTypes";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import MainDroppable from "../components/MainDroppable";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";
import blockRenderer from "../blockRenderer";

function SetOn(props) {
  const dispatch = useDispatch();

  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "setOn",
      type: setOn,
      children: [[], []],
      variableValue: "",
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
        <div
          ref={setNodeRef}
          className="control-block bg-color-if"
          style={{ width: "min-content", ...style }}
          {...listeners}
          {...attributes}
        >
          {!isDragging ? (
            <Fragment>
              <div className="text-bold text-white">Ustaw </div>
              <MainDroppable dropId={props.id + "|0"}>
                <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                  {props.children[0]?.map((item, index) =>
                    blockRenderer(item, index)
                  )}
                </div>
              </MainDroppable>
              <div className="text-bold text-white">na</div>
              <MainDroppable dropId={props.id + "|1"}>
                <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                  {props.children[1]?.map((item, index) =>
                    blockRenderer(item, index)
                  )}
                </div>
              </MainDroppable>
              <DeleteBlock
                id={props.id}
                setBlocksState={props.setBlocksState}
              />
            </Fragment>
          ) : (
            <div className="text-bold text-white">Ustaw zmienną</div>
          )}
        </div>
      ) : (
        <div className="control-block bg-color-if" onClick={onAddElement}>
          <div className="flex-row">
            <div className="text-bold text-white">Ustaw zmienną</div>
            <div className="flex-row">
              <div className="text-bold text-white">{"("}</div>
              <div className="insideBox bg-color-if-condition m-8" />
              <div className="text-bold text-white">{")"}</div>
            </div>
            <div className="text-bold text-white">na</div>
            <input
              disabled
              placeholder="Wartosc startowa"
              className="block-input"
              type="text"
            />
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default SetOn;
