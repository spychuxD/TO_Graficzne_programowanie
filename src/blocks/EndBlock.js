import "../App.css";
import { Fragment } from "react";
import { endBlock } from "../blockTypes";
import DragHandle from "./DragHandle/DragHandle";

function EndBlock(props) {
  return (
    <Fragment>
      <DragHandle
        {...props}
        type={endBlock}
        className={"control-block bg-color-end"}
        additionalStyle={{ height: 30 }}
      >
        <div className="text-bold text-small text-white">STOP</div>
      </DragHandle>
    </Fragment>
  );
}
export default EndBlock;
