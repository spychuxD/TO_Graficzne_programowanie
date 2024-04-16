import "../../App.css";
import { Fragment } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import MainDroppable from "../../components/MainDroppable";
import blockRenderer from "../../blockRenderer";

function OperatorsBlocks(props) {
 
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
            <MainDroppable dropId={props.id + "|0"}>
              <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                {props.children
                  ? props.children[0].map((item, index) =>
                      blockRenderer(item, index)
                    )
                  : null}
              </div>
            </MainDroppable>
            <div className="m-8">
              <div className="text-bold text-white">{props.name}</div>
            </div>
            <MainDroppable dropId={props.id + "|1"}>
              <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                {props.children
                  ? props.children[1].map((item, index) =>
                      blockRenderer(item, index)
                    )
                  : null}
              </div>
            </MainDroppable>
          </div>
        ) : (
          <div className="control-block-without-shadow bg-color-arithmetic">
            <div className="m-8">
              <div className="text-bold text-white">{props.name}</div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
export default OperatorsBlocks;
