import "../../App.css";
import { Fragment } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function VariableTypesBlock(props) {
 
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
        className="control-block bg-color-arithmetic "
        ref={setNodeRef}
        style={{ width: "min-content", ...style }}
        {...listeners}
        {...attributes}
      >
        {!isDragging ? (
          <div className="control-block-without-shadow bg-color-arithmetic">
            {props.name}
          </div>
        ) : (
          <div>{props.name}</div>
        )}
      </div>
    </Fragment>
  );
}
export default VariableTypesBlock;
