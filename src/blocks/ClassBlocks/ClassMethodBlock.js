import "../../App.css";
import { Fragment, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import blockRenderer from "../../blockRenderer";
import MainDroppable from "../../components/MainDroppable";
import { useSelector } from "react-redux";

export default function ClassMethodBlock(props) {
  const methodObject = useSelector((state) =>
    state.classes.classes
      .find((cl) => cl.id === props.classId)
      ?.methods.find((me) => me.id === props.methodId)
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
            <div className="text-nowrap">Dla obiektu</div>
            <MainDroppable dropId={props.id + "|9"}>
              <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10">
                {props.children
                  ? props.children[9].map((item, index) => blockRenderer(item))
                  : null}
              </div>
            </MainDroppable>
            <div className="text-nowrap" style={{marginRight:5}}> 
            wykonaj 
            </div>
            <div className="text-nowrap"> 
              {methodObject === undefined ? props.name : methodObject?.name}
            </div>
            {methodObject?.children[1].map((v, i) => {
              return (
                <MainDroppable dropId={props.id + "|" + i}>
                  <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10">
                    {props.children
                      ? props.children[i].map((item, index) =>
                          blockRenderer(item)
                        )
                      : null}
                  </div>
                </MainDroppable>
              );
            })}
          </div>
        ) : (
          <div>{methodObject?.name}Metoda klasy</div>
        )}
      </div>
    </Fragment>
  );
}
