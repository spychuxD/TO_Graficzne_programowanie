import "../../App.css";
import { Fragment } from "react";
import DragHandle from "../DragHandle/DragHandle";
import { variableTypesBlock } from "../../blockTypes";
function VariableTypesBlock(props) {
  return (
    <Fragment>
      <DragHandle
        {...props}
        type={variableTypesBlock}
        className={"control-block bg-color-arithmetic"}
        additionalStyle={{ height: 30 }}
      >
        {!props.isOverlay ? (
          <div className="control-block-without-shadow bg-color-arithmetic">
            {props.name}
          </div>
        ) : (
          <div className="control-block-without-shadow bg-color-arithmetic">
            {props.name}
          </div>
        )}
      </DragHandle>
    </Fragment>
  );
}
export default VariableTypesBlock;
