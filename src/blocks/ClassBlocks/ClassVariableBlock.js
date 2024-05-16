import "../../App.css";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { classVariableBlock } from "../../blockTypes";
import DragHandle from "../DragHandle/DragHandle";
import { findLocationByPath, findPath } from "../../redux/PathOperationsLib";
function ClassVariableBlock(props) {
  const classVariableValue = useSelector((state) => {
    const variableSplit = props.id.split("|");
    if (variableSplit[0] == classVariableBlock) return undefined;
    let pathToVariable = findPath(state.classes, variableSplit[0]);
    if(pathToVariable === undefined) 
      pathToVariable = findPath(state.classes,variableSplit[1]);
    let destinationValue = findLocationByPath(state.classes, pathToVariable);
    if (destinationValue === undefined) return undefined;
    destinationValue = destinationValue.find(
      (el) => el.id === variableSplit[1]
    );
    return destinationValue;
  });
  return (
    <Fragment>
      <DragHandle
        {...props}
        type={classVariableBlock}
        className={"blocks-container control-block bg-color-7 text-nowrap"}
      >
        {classVariableValue !== undefined
          ? classVariableValue.name
          : props.name}
      </DragHandle>
    </Fragment>
  );
}
export default ClassVariableBlock;
