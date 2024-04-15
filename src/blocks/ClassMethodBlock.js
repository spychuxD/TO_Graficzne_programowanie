import "../App.css";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";
import blockRenderer from "../blockRenderer";
import { classMethodBlock } from "../blockTypes";
import MainDroppable from "../components/MainDroppable";
import { useSelector } from "react-redux";

export default function ClassMethodBlock(props) {
  const dispatch = useDispatch();
  const methodObject = useSelector(
    (state) => state.classes.find(cl => cl.id === props.classId).methods.find(me => me.id === props.methodId)
  );
  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "classMethodBlock",
      type: classMethodBlock,
      classId: props.classId,
      methodId: props.id,
      children: [[]],
    };

    dispatch(addElement(newElement));
  };

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
    });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <Fragment>
      <div
        ref={setNodeRef}
        className="blocks-container control-block bg-color-console"
        style={{ width: "min-content", ...style }}
        {...listeners}
        {...attributes}
      >
        {!isDragging ? (
          <div className="blocks-container" onClick={onAddElement}>
            <MainDroppable dropId={props.id + "|0"}>
              <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10">
                {props.children[0].map((item, index) => blockRenderer(item))}
              </div>
            </MainDroppable>
            <div className="text-nowrap">{methodObject===undefined?props.name:methodObject.name}</div>
          </div>
        ) : (
          <div>{methodObject?.name}</div>
        )}
      </div>
    </Fragment>
  );
}
