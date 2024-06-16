import "../App.css";
import { Fragment } from "react";
import MainDroppable from "../components/MainDroppable";
import blockRenderer from "../blockRenderer";
import { whileBlock } from "../blockTypes";
import DragHandle from "./DragHandle/DragHandle";
function WhileBlock(props) {
  return (
    <Fragment>
      <DragHandle
        {...props}
        type={whileBlock}
        className={"control-block bg-color-for"}
      >
        {!props.isOverlay ? (
          <div className="">
            <div className="">
              <div style={{ border: "none" }} className="control-block">
                <div className="text-bold text-white text-nowrap">While</div>
                <MainDroppable
                  dropId={props.id + "|0"}
                  disabled={props.palette}
                >
                  <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                    {props.children
                      ? props.children[0].map((item, index) =>
                          blockRenderer(item, index)
                        )
                      : null}
                  </div>
                </MainDroppable>
              </div>
              <div
                style={{ border: "none" }}
                className="control-block flex-col"
              >
                <div className="text-bold text-white ">do</div>
                <MainDroppable
                  dropId={props.id + "|1"}
                  disabled={props.palette}
                >
                  <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                    {props.children
                      ? props.children[1].map((item, index) =>
                          blockRenderer(item, index)
                        )
                      : null}
                  </div>
                </MainDroppable>
              </div>
            </div>
            <div className="items-container"></div>
          </div>
        ) : (
          <div className="text-nowrap">Pętla while</div>
        )}
      </DragHandle>
    </Fragment>
  );
}
export default WhileBlock;
