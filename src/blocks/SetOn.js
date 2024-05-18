import "../App.css";
import { Fragment } from "react";
import MainDroppable from "../components/MainDroppable";
import blockRenderer from "../blockRenderer";
import { setOn } from "../blockTypes";
import DragHandle from "./DragHandle/DragHandle";
function SetOn(props) {
  return (
    <Fragment>
      <DragHandle
        {...props}
        type={setOn}
        className={"control-block bg-color-if"}
      >
        {(!props.isDragging && !props.isOverlay) || props.palette ? (
          <Fragment>
            <div className="text-bold text-white">Ustaw </div>
            <MainDroppable dropId={props.id + "|0"} disabled={props.palette}>
              <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                {props.children
                  ? props.children[0]?.map((item, index) =>
                      blockRenderer(item, index)
                    )
                  : null}
              </div>
            </MainDroppable>
            <div className="text-bold text-white">na</div>
            <MainDroppable dropId={props.id + "|1"} disabled={props.palette}>
              <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                {props.children
                  ? props.children[1]?.map((item, index) =>
                      blockRenderer(item, index)
                    )
                  : null}
              </div>
            </MainDroppable>
          </Fragment>
        ) : (
          <div className="text-bold text-white text-nowrap">Ustaw zmienną</div>
        )}
      </DragHandle>
    </Fragment>
  );
}
export default SetOn;
