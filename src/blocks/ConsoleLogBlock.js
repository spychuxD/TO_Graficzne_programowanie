import "../App.css";
import { Fragment } from "react";
import blockRenderer from "../blockRenderer";
import MainDroppable from "../components/MainDroppable";
import DragHandle from "./DragHandle/DragHandle";
import { consoleLogBlock } from "../blockTypes";
function ConsoleLogBlock(props) {
  return (
    <Fragment>
      <DragHandle
        {...props}
        type={consoleLogBlock}
        className={"blocks-container control-block bg-color-console"}
      >
        {(!props.isDragging && !props.isOverlay) || props.palette ? (
          <div className="flex-row center w-full">
            <div className="text-bold text-small text-white mr-8">Wyświetl</div>
            <MainDroppable dropId={props.id + "|0"} disabled={props.palette}>
              <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10">
                {props.children
                  ? props.children[0].map((item, index) =>
                      blockRenderer(item, index)
                    )
                  : null}
              </div>
            </MainDroppable>
          </div>
        ) : (
          <div>Wyświetl</div>
        )}
      </DragHandle>{" "}
    </Fragment>
  );
}

export default ConsoleLogBlock;
