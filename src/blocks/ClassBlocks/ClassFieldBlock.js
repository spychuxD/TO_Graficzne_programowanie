import "../../App.css";
import { Fragment, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import blockRenderer from "../../blockRenderer";
import MainDroppable from "../../components/MainDroppable";
import { useSelector } from "react-redux";


export default function ClassFieldBlock(props)
{
    const methodObject = useSelector((state) =>
    state.classes.classes
      .find((cl) => cl.id === props.classId)
      ?.fields.find((me) => me.id === props.methodId)
  );

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
    });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  useEffect(() => {}, []);
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
          <div className="blocks-container">
            <div className="text-nowrap">
              {methodObject === undefined ? props.name : methodObject?.name}
            </div>
            <MainDroppable dropId={props.id + "|0"}>
              <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10">
                {props.children
                  ? props.children[0].map((item, index) => blockRenderer(item))
                  : null}
              </div>
            </MainDroppable>
            <div className="text-nowrap">Z obiektu</div>
          </div>
        ) : (
          <div>{methodObject?.name}Pole klasy</div>
        )}
      </div>
    </Fragment>
  );
}