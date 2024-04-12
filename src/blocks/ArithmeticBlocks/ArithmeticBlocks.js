import { Draggable } from "react-beautiful-dnd";
import "../../App.css";
import { arithmeticBlocks } from "../../blockTypes";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "../DeleteBlock";
import { ArithmeticOperations } from "./ArithmeticOperations";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { addElement } from "../../redux/slices/CodeStructure";
import MainDroppable from "../../components/MainDroppable";
import blockRenderer from "../../blockRenderer";

function ArithmeticBlocks(props) {
  const dispatch = useDispatch();

  const onAddElement = (name) => {
    const newElement = {
      id: uuidv4(),
      name: name,
      type: arithmeticBlocks,
      children: [[], []],
    };

    dispatch(addElement(newElement));
  };
  const arithemticType = (name) => {
    switch (name) {
      case ArithmeticOperations.addition:
        return <div className="text-bold text-white">+</div>;
      case ArithmeticOperations.subtraction:
        return <div className="text-bold text-white">-</div>;
      case ArithmeticOperations.multiplication:
        return <div className="text-bold text-white">*</div>;
      case ArithmeticOperations.division:
        return <div className="text-bold text-white">/</div>;
      case ArithmeticOperations.modulo:
        return <div className="text-bold text-white">%</div>;
      default:
        break;
    }
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
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
          style={style}
          {...listeners}
          {...attributes}
        >
          <div className="control-block-without-shadow bg-color-arithmetic">
            <MainDroppable dropId={props.id + "|0"}>
              <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                {props.children[0].map((item, index) =>
                  blockRenderer(item, index)
                )}
              </div>
            </MainDroppable>
            <span className="m-8">{arithemticType(props.name)}</span>
            <MainDroppable dropId={props.id + "|1"}>
              <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                {props.children[1].map((item, index) =>
                  blockRenderer(item, index)
                )}
              </div>
            </MainDroppable>
          </div>
          <DeleteBlock setBlocksState={props.setBlocksState} id={props.id} />
        </div>
      ) : (
        <div
          className="control-block bg-color-arithmetic flex-row w-30 justify-center align-center"
          onClick={() => onAddElement(props.name)}
        >
          <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10"></div>
          <div className="m-8">{arithemticType(props.name)}</div>
          <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10"></div>
        </div>
      )}
    </Fragment>
  );
}
export default ArithmeticBlocks;
