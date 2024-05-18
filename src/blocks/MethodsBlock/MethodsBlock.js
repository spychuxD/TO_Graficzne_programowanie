import { Fragment } from "react";
import blockRenderer from "../../blockRenderer";
import MainDroppable from "../../components/MainDroppable";
import DragHandle from "../DragHandle/DragHandle";
import { methodsBlock } from "../../blockTypes";
function MethodsBlock(props) {
  return (
    <Fragment>
      <DragHandle
        {...props}
        type={methodsBlock}
        className={"blocks-container control-block bg-color-console"}
      >
        {(!props.isDragging && !props.isOverlay) || props.palette ? (
          <div className="flex-row center w-full ">
            <MainDroppable dropId={props.id + "|0"} disabled={props.palette}>
              <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10 ">
                {props.children
                  ? props.children[0].map((item, index) =>
                      blockRenderer(item, index)
                    )
                  : null}
              </div>
            </MainDroppable>
            <div className="text-bold text-small text-white text-nowrap ml-4 mr-4">
              {props?.name + "("}
            </div>
            <MainDroppable dropId={props.id + "|1"} disabled={props.palette}>
              <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10">
                {props.children
                  ? props.children[1].map((item, index) =>
                      blockRenderer(item, index)
                    )
                  : null}
              </div>
            </MainDroppable>
            <div className="text-bold text-small text-white text-nowrap  ml-4">
              {")"}
            </div>
          </div>
        ) : (
          <div className="text-nowrap">{props?.name}</div>
        )}
      </DragHandle>
    </Fragment>
  );
}

export default MethodsBlock;
