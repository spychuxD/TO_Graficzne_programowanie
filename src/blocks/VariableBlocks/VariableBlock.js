import "../../App.css";
import { Fragment } from "react";
import { variableBlock } from "../../blockTypes";
import { v4 as uuidv4 } from "uuid";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { addElement } from "../../redux/slices/CodeStructure";
import { useSelector } from "react-redux";

function VariableBlock(props) {
  const variableObject = useSelector(
    state => state.codeStructure.variables.find(va=>va.id==props.id.split("|")[0])
  )

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
     
        <div
          className="blocks-container control-block bg-color-7"
          ref={setNodeRef}
          style={{ width: "min-content", ...style }}
          {...listeners}
          {...attributes}
        >
          {variableObject?variableObject.variableName:props.variableName}
        </div>

    </Fragment>
  );
}
export default VariableBlock;
