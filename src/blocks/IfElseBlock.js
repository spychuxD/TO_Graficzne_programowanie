import "../App.css";
import { Fragment } from "react";
import MainDroppable from "../components/MainDroppable";
import blockRenderer from "../blockRenderer";
import DragHandle from "./DragHandle/DragHandle";
import { ifElseBlock } from "../blockTypes";
function IfElseBlock(props) {
  return (
    <Fragment>
      <DragHandle {...props} isOverlay={props.isOverlay} type={ifElseBlock}>
        {(!props.isDragging && !props.isOverlay) || props.palette ? (
          <div className="control-block bg-color-if">
            <div className="flex-col gap-10 center w-full">
              <div className="flex-row center w-full">
                <div className="text-bold text-small text-white mr-8 flex-row align-center">
                  Jeżeli
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
                  to
                </div>
              </div>
              <div className="flex-row center w-full">
                <MainDroppable
                  dropId={props.id + "|1"}
                  disabled={props.palette}
                >
                  <div className="w-min-50px w-full bg-color-if-body h-20px b-r-10">
                    {props.children
                      ? props.children[1].map((item, index) =>
                          blockRenderer(item, index)
                        )
                      : null}
                  </div>
                </MainDroppable>
              </div>
              <div className="flex-row center w-full">
                <div className="text-bold text-small text-white mr-8 text-nowrap">
                  jeśli nie
                </div>
              </div>
              <div className="flex-row center w-full">
                <MainDroppable
                  dropId={props.id + "|2"}
                  disabled={props.palette}
                >
                  <div className="w-min-50px w-full bg-color-else h-20px b-r-10">
                    {props.children
                      ? props.children[2].map((item, index) =>
                          blockRenderer(item, index)
                        )
                      : null}
                  </div>
                </MainDroppable>
              </div>
            </div>
          </div>
        ) : (
          <div className="blocks-container control-block bg-color-if text-bold text-white">
            ifElse
          </div>
        )}
      </DragHandle>
    </Fragment>
  );
}
export default IfElseBlock;
