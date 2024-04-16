import "../App.css";
import { beginBlock } from "../blockTypes";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";

function BeginBlock(props) {
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
      <div
        ref={setNodeRef}
        className="control-block bg-color-start"
        style={{ width: "min-content", zIndex: 10000, ...style, height:30 }}
        {...listeners}
        {...attributes}
      >
          <div className="text-bold text-small text-white">START</div>

      </div>
    </Fragment>
  );
}
export default BeginBlock;
