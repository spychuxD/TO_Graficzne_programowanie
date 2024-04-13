import "../App.css";
import { beginBlock } from "../blockTypes";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";
function BeginBlock(props) {
  const dispatch = useDispatch();

  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "start",
      type: beginBlock,
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
        <div
          ref={setNodeRef}
          className="control-block bg-color-start"
          style={{ width: "min-content", ...style }}
          {...listeners}
          {...attributes}
        >
          {!isDragging ? (
            <div className="text-bold text-small text-white">START</div>
          ) : (
            <div className=" bg-color-start text-bold text-white">START</div>
          )}
        </div>
      ) : (
        <div
          style={{ height: 20 }}
          className="control-block bg-color-start"
          onClick={onAddElement}
        >
          <div className="text-bold text-small text-white">START</div>
        </div>
      )}
    </Fragment>
  );
}
export default BeginBlock;
