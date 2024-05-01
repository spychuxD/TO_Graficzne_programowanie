import "../../App.css";
import { Fragment } from "react";
import MainDroppable from "../../components/MainDroppable";
import blockRenderer from "../../blockRenderer";
import { operatorsBlocks } from "../../blockTypes";
import DragHandle from "../DragHandle/DragHandle";
function OperatorsBlocks(props) {
  return (
    <Fragment>
      <DragHandle
        {...props}
        type={operatorsBlocks}
        className={"control-block bg-color-arithmetic"}
      >
        {(!props.isDragging && !props.isOverlay) || props.palette ? (
          <div className="control-block-without-shadow bg-color-arithmetic">
            <MainDroppable dropId={props.id + "|0"} disabled={props.palette}>
              <div className="w-min-50px  bg-color-if-condition h-20px b-r-10">
                {props.children
                  ? props.children[0].map((item, index) =>
                      blockRenderer(item, index)
                    )
                  : null}
              </div>
            </MainDroppable>
            <div className="m-8">
              <div className="text-bold text-white">{props.name}</div>
            </div>
            <MainDroppable dropId={props.id + "|1"} disabled={props.palette}>
              <div className="w-min-50px  bg-color-if-condition h-20px b-r-10">
                {props.children
                  ? props.children[1].map((item, index) =>
                      blockRenderer(item, index)
                    )
                  : null}
              </div>
            </MainDroppable>
          </div>
        ) : (
          <div className="control-block-without-shadow bg-color-arithmetic">
            <div className="m-8">
              <div className="text-bold text-white">Operator {props.name}</div>
            </div>
          </div>
        )}
      </DragHandle>
    </Fragment>
  );
}
export default OperatorsBlocks;
