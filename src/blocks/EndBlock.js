import "../App.css";
import { Fragment } from "react";
import { endBlock } from "../blockTypes";
import { v4 as uuidv4 } from "uuid";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";

function EndBlock(props) {

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
     
        <div
          ref={setNodeRef}
          className="control-block bg-color-end"
          style={{ width: "min-content", ...style, height:30 }}
          {...listeners}
          {...attributes}
        >
            <div className="text-bold text-small text-white">STOP</div>

        </div>

    </Fragment>
  );
}
export default EndBlock;
