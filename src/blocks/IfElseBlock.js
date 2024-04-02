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
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
          <div
            className="control-block bg-color-if"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {!isDragging ? (
              <Fragment>
                <div className="text-bold text-white">if</div>
                <MainDroppable dropId={props.id + "|0"}>
                  <div className="w-full bg-color-if-condition  h-50px b-r-10">
                    {props.children[0].map((item, index) =>
                      blockRenderer(item)
                    )}
                  </div>
                </MainDroppable>
                <MainDroppable dropId={props.id + "|1"}>
                  <div className="w-full bg-color-if-body h-50px b-r-10">
                    {props.children[1].map((item, index) =>
                      blockRenderer(item)
                    )}
                  </div>
                </MainDroppable>
                <MainDroppable dropId={props.id + "|2"}>
                  <div className="w-full bg-color-else h-50px b-r-10">
                    {props.children[2].map((item, index) =>
                      blockRenderer(item)
                    )}
                  </div>
                </MainDroppable>

                <DeleteBlock
                  id={props.id}
                  setBlocksState={props.setBlocksState}
                />
              </Fragment>
            ) : (
              <div className="text-bold text-white">if</div>
            )}
          </div>
        </div>
      ) : (
        <div className="control-block bg-color-if" onClick={onAddElement}>
          <div>
            <div className="flex-row">
              <div className="text-bold text-white">if</div>
              <div className="flex-row">
                <div className="text-bold text-white">{"("}</div>
                <div className="insideBox bg-color-if-condition m-8" />
                <div className="text-bold text-white">{")"}</div>
              </div>
            </div>
            <div className="flex-row">
              <div className="text-bold text-white">{"{"}</div>
              <div className="insideBox bg-color-if-body m-8" />
              <div className="text-bold text-white">{"}"}</div>
            </div>
          </div>
          <div>
            <div className="text-bold text-white">else</div>
            <div className="flex-row">
              <div className="text-bold text-white">{"{"}</div>
              <div className="insideBox bg-color-else m-8" />
              <div className="text-bold text-white">{"}"}</div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default IfElseBlock;
