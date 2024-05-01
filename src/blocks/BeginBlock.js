import "../App.css";
import { beginBlock } from "../blockTypes";
import { Fragment } from "react";

import DragHandle from "./DragHandle/DragHandle";
function BeginBlock(props) {
  return (
    <Fragment>
      <DragHandle
        {...props}
        type={beginBlock}
        className={"control-block bg-color-start"}
        additionalStyle={{ height: 30 }}
      >
        <div className="text-bold text-small text-white">START</div>
      </DragHandle>
    </Fragment>
  );
}

export default BeginBlock;
