import "../App.css";
import { Fragment } from "react";
import { endBlock } from "../blockTypes";
import { v4 as uuidv4 } from "uuid";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";
function EndBlock(props) {
  const dispatch = useDispatch();

  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "stop",
      type: endBlock,
      items: [],
    };

    dispatch(addElement(newElement));
  };

  const { attributes, listeners, setNodeRef, isDragging, transform } =
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
          className="control-block bg-color-end"
          style={{ width: "min-content", ...style }}
          {...listeners}
          {...attributes}
        >
          {!isDragging ? (
            <div className="text-bold text-small text-white">STOP</div>
          ) : (
            <div className="bg-color-end text-bold text-white">STOP</div>
          )}
        </div>
      ) : (
        <div
          style={{ height: 20 }}
          className="control-block bg-color-end"
          onClick={onAddElement}
        >
          <div className="text-bold text-small text-white">STOP</div>
        </div>
      )}
    </Fragment>
  );
}
export default EndBlock;
