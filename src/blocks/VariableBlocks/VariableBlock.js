import "../../App.css";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { variableBlock } from "../../blockTypes";
import DragHandle from "../DragHandle/DragHandle";
function VariableBlock(props) {
  const variableObject = useSelector((state) =>
    props.id
      ? state.codeStructure.variables.find(
          (va) => va.id === props?.id.split("|")[0]
        )
      : { name: "zmienna" }
  );
  return (
    <Fragment>
      <DragHandle
        {...props}
        type={variableBlock}
        className={"blocks-container control-block bg-color-7"}
      >
        {variableObject ? variableObject.name : props.name}
        
      </DragHandle>
    </Fragment>
  );
}
export default VariableBlock;
