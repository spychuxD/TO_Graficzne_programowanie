import "../App.css";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import MainDroppable from "../components/MainDroppable";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";
import blockRenderer from "../blockRenderer";
import { whileBlock } from "../blockTypes";
function WhileBlock(props) {
  const dispatch = useDispatch();

  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "while",
      type: whileBlock,
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
          ref={setNodeRef}
          className="control-block bg-color-for"
          style={{ width: "min-content", ...style }}
          {...listeners}
          {...attributes}
        >
          {!isDragging ? (
            <div className="">
              <div className="">
                <div style={{ border: "none" }} className="control-block">
                  <div className="text-bold text-white text-nowrap">While</div>
                  <MainDroppable dropId={props.id + "|0"}>
                    <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                      {props.children?props.children[0].map((item, index) =>
                        blockRenderer(item, index)
                      ):null}
                    </div>
                  </MainDroppable>
                </div>
                <div
                  style={{ border: "none" }}
                  className="control-block flex-col"
                >
                  <div className="text-bold text-white ">wykonaj</div>
                  <MainDroppable dropId={props.id + "|1"}>
                    <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                      {props.children?props.children[1].map((item, index) =>
                        blockRenderer(item, index)
                      ):null}
                    </div>
                  </MainDroppable>
                </div>
              </div>
              <div className="items-container"></div>
            </div>
          ) : (
            <div className="">Pętla while</div>
          )}
        </div>
      ) : (
        <div onClick={onAddElement} className="control-block bg-color-for">
          <div>
            <div style={{ border: "none" }} className="control-block">
              <div className="text-bold text-small text-white text-nowrap m-4">
                While
              </div>
              <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10" />
            </div>
            <div style={{ border: "none" }} className="control-block flex-col">
              <span className="text-bold text-small text-white text-nowrap mr-4">
                wykonaj
              </span>
              <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10" />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default WhileBlock;
