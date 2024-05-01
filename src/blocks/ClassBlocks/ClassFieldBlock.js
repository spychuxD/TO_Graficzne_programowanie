import "../../App.css";
import { Fragment } from "react";
import blockRenderer from "../../blockRenderer";
import MainDroppable from "../../components/MainDroppable";
import { useSelector } from "react-redux";
import { classFieldBlock } from "../../blockTypes";
import DragHandle from "../DragHandle/DragHandle";
export default function ClassFieldBlock(props) {
  const methodObject = useSelector((state) =>
    state.classes.classes
      .find((cl) => cl.id === props.classId)
      ?.fields.find((me) => me.id === props.methodId)
  );

  return (
    <Fragment>
      <DragHandle
        {...props}
        className="blocks-container control-block bg-color-console"
        type={classFieldBlock}
      >
        {(!props.isDragging && !props.isOverlay) || props.palette ? (
          <div className="blocks-container">
            <div className="text-nowrap">
              {methodObject === undefined ? props.name : methodObject?.name}
            </div>
            <MainDroppable dropId={props.id + "|0"} disabled={props.palette}>
              <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10">
                {props.children
                  ? props.children[0].map((item, index) => blockRenderer(item))
                  : null}
              </div>
            </MainDroppable>
            <div className="text-nowrap">Z obiektu</div>
          </div>
        ) : (
          <div>{methodObject?.name}Pole klasy</div>
        )}
      </DragHandle>
    </Fragment>
  );
}
