import "../../App.css";
import { Fragment } from "react";
import { variableDeclarationBlock } from "../../blockTypes";
import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";
import { addElement, changeElement } from "../../redux/slices/CodeStructure";
import { toggleDisableDraggable } from "../../redux/slices/DraggableSettings";
import MainDroppable from "../../components/MainDroppable";
import blockRenderer from "../../blockRenderer";
import DragHandle from "../DragHandle/DragHandle";

function VariableDeclarationBlock(props) {
  const dispatch = useDispatch();
  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "variableDeclaration",
      type: variableDeclarationBlock,
      variableName: "test",
      availability: "public",
      children: [[]],
    };
    dispatch(addElement(newElement));
  };
  const onChangeElement = (fieldToModify, e) => {
    dispatch(
      changeElement({ id: props.id, fieldToModify, value: e.target.value })
    );
  };

  return (
    <Fragment>
      {/* {props.id !== undefined && !props.isOverlay ? ( */}
      {/* <div
        className="blocks-container control-block bg-color-7"
        ref={setNodeRef}
        style={{ width: "min-content", ...dynamicStyle }}
        {...listeners}
        {...attributes}
      > */}
      {/* <div
        onClick={onAddElement}
        style={{ height: 100, width: 100, backgroundColor: "red" }}
      ></div> */}
      <DragHandle
        {...props}
        type={variableDeclarationBlock}
        className="blocks-container control-block bg-color-7"
      >
        {(!props.isDragging && !props.isOverlay) || props.palette ? (
          <Fragment>
            <MainDroppable dropId={props.id + "|0"} disabled={props.palette}>
              <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                {props.children
                  ? props.children[0]?.map((item, index) =>
                      blockRenderer(item, index)
                    )
                  : null}
              </div>
            </MainDroppable>
            <input
              disabled={props.palette}
              onChange={(e) => onChangeElement("variableName", e)}
              placeholder="Nazwa Zmiennej"
              className="block-input"
              type="text"
              defaultValue={props.variableName}
              onMouseEnter={() => {
                if (!props.palette) dispatch(toggleDisableDraggable());
              }}
              onMouseLeave={() => {
                if (!props.palette) dispatch(toggleDisableDraggable());
              }}
            />
          </Fragment>
        ) : (
          <div className=" text-nowrap">Deklaracja zmiennej</div>
        )}
      </DragHandle>
      {/* </div> */}
      {/* ) : (
        <div
          className="control-block-grid-2 bg-color-for"
          onClick={onAddElement}
          style={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "#e3eef2",
          }}
        >
          <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10"></div>
          <input
            placeholder="Nazwa Zmiennej"
            className="block-input"
            type="text"
          />
        </div>
      )} */}
    </Fragment>
  );
}
export default VariableDeclarationBlock;
