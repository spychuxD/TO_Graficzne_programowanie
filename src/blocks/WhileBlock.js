import "../App.css";
import { Fragment } from "react";
import MainDroppable from "../components/MainDroppable";
import blockRenderer from "../blockRenderer";
import { whileBlock } from "../blockTypes";
import DragHandle from "./DragHandle/DragHandle";
function WhileBlock(props) {
  // const dispatch = useDispatch();

  // const onAddElement = () => {
  //   const newElement = {
  //     id: uuidv4(),
  //     name: "while",
  //     type: whileBlock,
  //     children: [[], []],
  //   };
  //   dispatch(addElement(newElement));
  // };

  return (
    <Fragment>
      {/* {props.id !== undefined ? ( */}
      <DragHandle
        {...props}
        type={whileBlock}
        className={"control-block bg-color-for"}
      >
        {(!props.isDragging && !props.isOverlay) || props.palette ? (
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
                <div className="text-bold text-white ">wykonaj</div>
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
          <div className="">Pętla while</div>
        )}
      </DragHandle>
      {/* ) : (
        <div onClick={onAddElement} className="control-block bg-color-for">
          <div>
            <div style={{ border: "none" }} className="control-block">
              <div className="text-bold text-small text-white text-nowrap m-4">
                While
              </div>
              <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10" />
            </div>
            <div style={{ border: "none" }} className="control-block flex-col">
              <span className="text-bold text-small text-white text-nowrap mr-4">
                wykonaj
              </span>
              <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10" />
            </div>
          </div>
        </div>
      )} */}
    </Fragment>
  );
}
export default WhileBlock;
