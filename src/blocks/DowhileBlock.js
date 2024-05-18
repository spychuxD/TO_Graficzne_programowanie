import "../App.css";
import { Fragment } from "react";
import MainDroppable from "../components/MainDroppable";
import blockRenderer from "../blockRenderer";
import DragHandle from "./DragHandle/DragHandle";
import { dowhileBlock } from "../blockTypes";
function WhileBlock(props) {
  return (
    <Fragment>
      <DragHandle
        {...props}
        type={dowhileBlock}
        className={"control-block bg-color-for"}
      >
        {(!props.isDragging && !props.isOverlay) || props.palette ? (
          <div className="">
            <div style={{ border: "none" }} className="control-block">
              <div className="text-bold text-white text-nowrap">Do</div>
              <MainDroppable dropId={props.id + "|0"} disabled={props.palette}>
                <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                  {props.children
                    ? props.children[0].map((item, index) =>
                        blockRenderer(item, index)
                      )
                    : null}
                </div>
              </MainDroppable>
            </div>
            <div style={{ border: "none" }} className="control-block flex-col">
              <div className="text-bold text-white ">while</div>
              <MainDroppable dropId={props.id + "|1"} disabled={props.palette}>
                <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                  {props.children
                    ? props.children[1].map((item, index) =>
                        blockRenderer(item, index)
                      )
                    : null}
                </div>
              </MainDroppable>
            </div>
            <div className="items-container"></div>
          </div>
        ) : (
          <div className="text-nowrap">Pętla DoWhile</div>
        )}
      </DragHandle>
    </Fragment>
  );
}
export default WhileBlock;
