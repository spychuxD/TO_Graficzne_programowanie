import { Fragment } from "react";
import { classDefinitionBlock } from "../blockTypes";
import { v4 as uuidv4 } from "uuid";
import { useDraggable } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";
import { CSS } from "@dnd-kit/utilities";
import { useSelector } from "react-redux";
export default function ClassDefinitionBlock(props) {
  const dispatch = useDispatch();
  const classObject = useSelector((state) =>
    state.classes.find((c) => c.id == props.classId)
  );
  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      classId: props.classId,
      type: classDefinitionBlock,
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
        <div ref={setNodeRef} style={{ width: "min-content", ...style }} {...listeners} {...attributes}>
          <div className="control-block bg-color-01">
            {classObject.name}
          </div>
        </div>
      ) : (
        <div onClick={onAddElement} className="control-block bg-color-01">
          <div className="m-8">{props.name}</div>
        </div>
      )}
    </Fragment>
  );
}
