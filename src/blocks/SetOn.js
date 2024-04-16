import "../App.css";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { setOn } from "../blockTypes";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import MainDroppable from "../components/MainDroppable";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";
import blockRenderer from "../blockRenderer";

function SetOn(props) {
  

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
          className="control-block bg-color-if"
          style={{ width: "min-content", ...style }}
          {...listeners}
          {...attributes}
        >
          {!isDragging ? (
            <Fragment>
              <div className="text-bold text-white">Ustaw </div>
              <MainDroppable dropId={props.id + "|0"}>
                <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                  {props.children?props.children[0]?.map((item, index) =>
                    blockRenderer(item, index)
                  ):null}
                </div>
              </MainDroppable>
              <div className="text-bold text-white">na</div>
              <MainDroppable dropId={props.id + "|1"}>
                <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                  {props.children?props.children[1]?.map((item, index) =>
                    blockRenderer(item, index)
                  ):null}
                </div>
              </MainDroppable>
            </Fragment>
          ) : (
            <div className="text-bold text-white">Ustaw zmienną</div>
          )}
        </div>
     
    </Fragment>
  );
}
export default SetOn;
