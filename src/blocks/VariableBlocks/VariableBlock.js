import "../../App.css";
import { Fragment } from "react";
import { variableBlock } from "../../blockTypes";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "../DeleteBlock";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { addElement, changeElement } from "../../redux/slices/CodeStructure";

function VariableBlock(props) {
  const dispatch = useDispatch();

  const onAddElement = () => {
    const newElement = {
      id: props.blockId + "|" + uuidv4(),
      name: "variable",
      type: variableBlock,
      dataType: props.dataType,
      variableName: props.variableName,
    };
    dispatch(addElement(newElement));
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
          className="blocks-container control-block bg-color-7"
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
        >
          {props.variableName}
          <div>
            <DeleteBlock id={props.id} setBlocksState={props.setBlocksState} />
          </div>
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
          {props.variableName}
        </div>
      )}
    </Fragment>
  );
}
export default VariableBlock;
