import "../App.css";
import { Fragment } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import MainDroppable from "../components/MainDroppable";
import blockRenderer from "../blockRenderer";
function ForBlock(props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
    });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <Fragment>
      <div
        ref={setNodeRef}
        className="control-block bg-color-for"
        style={{ width: "min-content", ...style, height: isDragging?50:"auto" }}
        {...listeners}
        {...attributes}
      >
        {!isDragging ? (
          <div className="">
            <div className="" style={{padding:10}}>
              <div style={{ border: "none",gap:10 }} className="control-block">
                <div>
                <div className="text-bold text-white text-nowrap">
                  Powtarzaj dla
                </div>
                <MainDroppable dropId={props.id + "|0"}>
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
                <div className="text-bold text-white text-nowrap">dopóki</div>
                <MainDroppable dropId={props.id + "|1"}>
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
                <div className="text-bold text-white text-nowrap">a potem</div>
                <MainDroppable dropId={props.id + "|2"}>
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
                <div className="text-bold text-white ">wykonaj</div>
                <MainDroppable dropId={props.id + "|3"}>
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
          <div className="text-nowrap" style={{maxHeight:50}}>Pętla for</div>
        )}
      </div>
    </Fragment>
  );
}
export default ForBlock;
