import "../App.css";
import { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "./DeleteBlock";
import ArithmeticBlocks from "./ArithmeticBlocks/ArithmeticBlocks";
import { arithmeticBlocks, forBlock, ifElseBlock } from "../blockTypes";
import ForBlock from "./ForBlock";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import MainDroppable from "../components/MainDroppable";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";
import blockRenderer from "../blockRenderer";

function IfElseBlock(props) {
  const dispatch = useDispatch();

  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "ifElseBlock",
      type: ifElseBlock,
      children: [[], [], []],
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
          ref={setNodeRef}
          style={{ width: "min-content", ...style }}
          {...listeners}
          {...attributes}
        >
          {!isDragging ? (
            <div className="control-block bg-color-if">
              <div className="flex-col gap-10 center w-full">
                <div className="flex-row center w-full">
                  <div className="text-bold text-small text-white mr-8 flex-row align-center">
                    Jeżeli
                    <MainDroppable dropId={props.id + "|0"}>
                      <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                        {props.children[0].map((item, index) =>
                          blockRenderer(item, index)
                        )}
                      </div>
                    </MainDroppable>
                    to
                  </div>
                </div>
                <div className="flex-row center w-full">
                  <MainDroppable dropId={props.id + "|1"}>
                    <div className="w-min-50px w-full bg-color-if-body h-20px b-r-10">
                      {props.children[1].map((item, index) =>
                        blockRenderer(item, index)
                      )}
                    </div>
                  </MainDroppable>
                </div>
                <div className="flex-row center w-full">
                  <div className="text-bold text-small text-white mr-8 text-nowrap">
                    jeśli nie
                  </div>
                </div>
                <div className="flex-row center w-full">
                  <MainDroppable dropId={props.id + "|2"}>
                    <div className="w-min-50px w-full bg-color-else h-20px b-r-10">
                      {props.children[2].map((item, index) =>
                        blockRenderer(item, index)
                      )}
                    </div>
                  </MainDroppable>
                </div>

                <DeleteBlock
                  id={props.id}
                  setBlocksState={props.setBlocksState}
                />
              </div>
            </div>
          ) : (
            <div className="blocks-container control-block bg-color-if text-bold text-white">
              if-else
            </div>
          )}
        </div>
      ) : (
        <div className="control-block bg-color-if" onClick={onAddElement}>
          <div className="flex-col gap-10 center w-full">
            <div className="flex-row center w-full">
              <div className="text-bold text-small text-white mr-8">Jeżeli</div>
              <div className="w-min-50px bg-color-if-condition h-20px b-r-10"></div>
            </div>
            <div className="flex-row center w-full">
              <div className="text-bold text-small text-white mr-8">to</div>
              <div className="w-min-50px bg-color-if-body h-20px b-r-10"></div>
            </div>
            <div className="flex-row center w-full">
              <div className="text-bold text-small text-white mr-8 text-nowrap">
                jeśli nie
              </div>
              <div className="w-min-50px bg-color-else h-20px b-r-10"></div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default IfElseBlock;
