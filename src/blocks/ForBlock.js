import "../App.css";
import { Fragment } from "react";
import MainDroppable from "../components/MainDroppable";
import blockRenderer from "../blockRenderer";
import DragHandle from "./DragHandle/DragHandle";
import { forBlock } from "../blockTypes";

function ForBlock(props) {
  return (
    <Fragment>
      <DragHandle
        {...props}
        type={forBlock}
        className={"control-block bg-color-for"}
      >
        {!props.isOverlay ? (
          <div className="">
            <div className="" style={{ padding: 10 }}>
              <div
                style={{ border: "none", gap: 10 }}
                className="control-block"
              >
                <div>
                  <div className="text-bold text-white text-nowrap">
                    for
                  </div>
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
                <div>
                  <div className="text-bold text-white text-nowrap">until</div>
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
                <div>
                  <div className="text-bold text-white text-nowrap">
                    after
                  </div>
                  <MainDroppable
                    dropId={props.id + "|2"}
                    disabled={props.palette}
                  >
                    <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                      {props.children
                        ? props.children[2].map((item, index) =>
                            blockRenderer(item, index)
                          )
                        : null}
                    </div>
                  </MainDroppable>
                </div>
              </div>
              <div
                style={{ border: "none" }}
                className="control-block flex-col"
              >
                <div className="text-bold text-white ">do</div>
                <MainDroppable
                  dropId={props.id + "|3"}
                  disabled={props.palette}
                >
                  <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                    {props.children
                      ? props.children[3].map((item, index) =>
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
          <div className="text-nowrap" style={{ maxHeight: 50 }}>
            Pętla for
          </div>
        )}
      </DragHandle>
    </Fragment>
  );
}
export default ForBlock;
