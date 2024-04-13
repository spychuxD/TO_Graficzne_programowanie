import "../../App.css";
import { operatorsBlocks } from "../../blockTypes";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { addElement } from "../../redux/slices/CodeStructure";
import MainDroppable from "../../components/MainDroppable";
import blockRenderer from "../../blockRenderer";

function OperatorsBlocks(props) {
  const dispatch = useDispatch();

  const onAddElement = (name) => {
    const newElement = {
      id: uuidv4(),
      name: name,
      operator: props.operator,
      type: operatorsBlocks,
      children: [[], []],
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
                  {props.children[0].map((item, index) =>
                    blockRenderer(item, index)
                  )}
                </div>
              </MainDroppable>
              <div className="m-8">
                <div className="text-bold text-white">{props.name}</div>
              </div>
              <MainDroppable dropId={props.id + "|1"}>
                <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                  {props.children[1].map((item, index) =>
                    blockRenderer(item, index)
                  )}
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
      ) : (
        <div
          className="control-block bg-color-arithmetic flex-row justify-center align-center"
          onClick={() => onAddElement(props.name)}
        >
          <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10"></div>
          <div className="m-8">
            <div className="text-bold text-white">{props.name}</div>
          </div>
          <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10"></div>
        </div>
      )}
    </Fragment>
  );
}
export default OperatorsBlocks;
