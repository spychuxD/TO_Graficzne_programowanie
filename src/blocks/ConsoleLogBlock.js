import "../App.css";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";
import blockRenderer from "../blockRenderer";
import { consoleLogBlock } from "../blockTypes";
import MainDroppable from "../components/MainDroppable";
function ConsoleLogBlock(props) {

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
            <div className="flex-row center w-full">
              <div className="text-bold text-small text-white mr-8">
                Wyświetl
              </div>
              <MainDroppable dropId={props.id + "|0"}>
                <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10">
                  {props.children?props.children[0].map((item, index) => blockRenderer(item)):null}
                </div>
              </MainDroppable>
            </div>
          ) : (
            <div>Wyświetl</div>
          )}
        </div>
    </Fragment>
  );
}

export default ConsoleLogBlock;
