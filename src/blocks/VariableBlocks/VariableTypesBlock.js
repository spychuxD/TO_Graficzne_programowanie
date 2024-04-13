import "../../App.css";
import { variableTypesBlock } from "../../blockTypes";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "../DeleteBlock";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { addElement } from "../../redux/slices/CodeStructure";

function VariableTypesBlock(props) {
  const dispatch = useDispatch();

  const onAddElement = (name) => {
    const newElement = {
      id: uuidv4(),
      name: name,
      type: variableTypesBlock,
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
          className="control-block bg-color-arithmetic "
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
        >
          <div className="control-block-without-shadow bg-color-arithmetic">
            {props.name}
          </div>
          <DeleteBlock setBlocksState={props.setBlocksState} id={props.id} />
        </div>
      ) : (
        <div
          className="control-block bg-color-arithmetic flex-row justify-center align-center"
          onClick={() => onAddElement(props.name)}
        >
          <div className="m-8">{props.name}</div>
        </div>
      )}
    </Fragment>
  );
}
export default VariableTypesBlock;
