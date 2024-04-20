import "../../App.css";
import { Fragment, useState } from "react";
import { variableDeclarationBlock } from "../../blockTypes";
import { v4 as uuidv4 } from "uuid";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import { addElement, changeElement } from "../../redux/slices/CodeStructure";
import { toggleDisableDraggable } from "../../redux/slices/DraggableSettings";
import MainDroppable from "../../components/MainDroppable";
import blockRenderer from "../../blockRenderer";
function VariableDeclarationBlock(props) {
  const dispatch = useDispatch();
  const disableDraggable = useSelector(
    (state) => state.draggableSettings.disableDraggable
  );

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

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
      disabled: disableDraggable,
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
          className="blocks-container control-block bg-color-7"
          ref={setNodeRef}
          style={{ width: "min-content", ...style }}
          {...listeners}
          {...attributes}
        >
          {!isDragging ? (
            <Fragment>
              <MainDroppable dropId={props.id + "|0"}>
                <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                  {props.children
                    ? props.children[0]?.map((item, index) =>
                        blockRenderer(item, index)
                      )
                    : null}
                </div>
              </MainDroppable>
              <input
                onChange={(e) => onChangeElement("variableName", e)}
                placeholder="Nazwa Zmiennej"
                className="block-input"
                type="text"
                defaultValue={props.variableName}
                onMouseEnter={() => {
                  dispatch(toggleDisableDraggable());
                }}
                onMouseLeave={() => {
                  dispatch(toggleDisableDraggable());
                }}
              />
            </Fragment>
          ) : (
            <div className=" text-nowrap">Deklaracja zmiennej</div>
          )}
        </div>
      ) : (
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
      )}
    </Fragment>
  );
}
export default VariableDeclarationBlock;
