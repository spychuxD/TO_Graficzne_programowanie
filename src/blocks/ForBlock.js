import "../App.css";
import { Fragment, useState } from "react";
import { forBlock } from "../blockTypes";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "./DeleteBlock";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import MainDroppable from "../components/MainDroppable";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";
import blockRenderer from "../blockRenderer";
function ForBlock(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "for",
      type: forBlock,
      children: [[], [], [], []],
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
                  <div className="text-bold text-white text-nowrap">
                    Powtarzaj dla
                  </div>
                  <MainDroppable dropId={props.id + "|0"}>
                    <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                      {props.children[0].map((item, index) =>
                        blockRenderer(item, index)
                      )}
                    </div>
                  </MainDroppable>
                  <div className="text-bold text-white text-nowrap">dopuki</div>
                  <MainDroppable dropId={props.id + "|1"}>
                    <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                      {props.children[1].map((item, index) =>
                        blockRenderer(item, index)
                      )}
                    </div>
                  </MainDroppable>
                  <div className="text-bold text-white text-nowrap">
                    a potem
                  </div>
                  <MainDroppable dropId={props.id + "|2"}>
                    <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                      {props.children[2].map((item, index) =>
                        blockRenderer(item, index)
                      )}
                    </div>
                  </MainDroppable>
                </div>
                <div
                  style={{ border: "none" }}
                  className="control-block flex-col"
                >
                  <div className="text-bold text-white ">wykonaj</div>
                  <MainDroppable dropId={props.id + "|3"}>
                    <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                      {props.children[3].map((item, index) =>
                        blockRenderer(item, index)
                      )}
                    </div>
                  </MainDroppable>
                </div>
              </div>
              <div className="items-container"></div>
              <div>
                <DeleteBlock
                  id={props.id}
                  setBlocksState={props.setBlocksState}
                />
              </div>
            </div>
          ) : (
            <div className="">Pętla for</div>
          )}
        </div>
      ) : (
        <div onClick={onAddElement} className="control-block bg-color-for">
          <div>
          <div style={{ border: "none" }} className="control-block">
            <div className="text-bold text-small text-white text-nowrap m-4">
              Powtarzaj dla
            </div>
            <input
              disabled
              style={{ width: 20 }}
              className="block-input-blocked "
              value={""}
            />
            <span className="text-bold text-small text-white text-nowrap m-4">dupuki</span>
            <input disabled className="block-input-blocked" value={""} />
            <span className="text-bold text-small text-white text-nowrap m-4">a potem</span>
            <input disabled className="block-input-blocked " value={""} />
          </div>
          <div style={{ border: "none" }} className="control-block flex-col">
            <span className="text-bold text-small text-white text-nowrap mr-4">wykonaj</span>
            <input disabled className="block-input " value={""} />
          </div>
        </div>
        </div>
      )}
    </Fragment>
  );
}
export default ForBlock;
