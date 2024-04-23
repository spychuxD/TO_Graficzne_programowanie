import { Fragment } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSelector } from "react-redux";
export default function ClassDataTypeBlock(props) {
  const classObject = useSelector((state) =>
    state.classes.classes.find((c) => c.id === props.classId)
  );
  

  const { attributes, listeners, setNodeRef, transform } =
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
        style={{ width: "min-content", ...style }}
        {...listeners}
        {...attributes}
      >
        <div className="control-block bg-color-01 text-nowrap">{classObject.name}</div>
      </div>
    </Fragment>
  );
}
