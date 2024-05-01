import { Fragment } from "react";
import { useSelector } from "react-redux";
import DragHandle from "../DragHandle/DragHandle";
import { classDefinitionBlock } from "../../blockTypes";
export default function ClassDataTypeBlock(props) {
  const classObject = useSelector((state) =>
    state.classes.classes.find((c) => c.id === props.classId)
  );

  return (
    <Fragment>
      <DragHandle {...props} type={classDefinitionBlock}>
        <div className="control-block bg-color-01 text-nowrap">
          {classObject ? classObject?.name : props.name}
        </div>
      </DragHandle>
    </Fragment>
  );
}
