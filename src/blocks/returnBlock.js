import DragHandle from "./DragHandle/DragHandle";
import MainDroppable from "../components/MainDroppable";
import { returnBlock } from "../blockTypes";
import blockRenderer from "../blockRenderer";
export default function ReturnBlock(props) {
  return (
    <DragHandle {...props} type={returnBlock} className={"control-block bg-color-if"}>
      Zwróć
      <MainDroppable dropId={props.id + "|0"} disabled={props.palette}>
        <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
          {props.children
            ? props.children[0]?.map((item, index) =>
                blockRenderer(item, index)
              )
            : null}
        </div>
      </MainDroppable>
    </DragHandle>
  );
}
