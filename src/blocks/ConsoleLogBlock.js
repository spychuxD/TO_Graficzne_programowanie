import "../App.css";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "./DeleteBlock";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";
import blockRenderer from "../blockRenderer";
import { consoleLogBlock } from "../blockTypes";
import MainDroppable from "../components/MainDroppable";
function ConsoleLogBlock(props) {
  const dispatch = useDispatch();

  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "consoleLogBlock",
      type: consoleLogBlock,
      children: [[]],
    };

    dispatch(addElement(newElement));
  };

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
    });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <Fragment>
      {props.id !== undefined ? (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
          {!isDragging ? (
            <div
              className="control-block bg-color-console"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Fragment>
                <div className="flex-row center w-full">
                  <div className="text-bold text-small text-white mr-8">
                    Wyświetl
                  </div>
                  <MainDroppable dropId={props.id + "|0"}>
                    <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10">
                      {props.children[0].map((item, index) =>
                        blockRenderer(item)
                      )}
                    </div>
                  </MainDroppable>
                </div>
                <DeleteBlock
                  id={props.id}
                  setBlocksState={props.setBlocksState}
                />
              </Fragment>
            </div>
          ) : (
            <div className="control-block w-50 bg-color-console text-bold text-white">
              Wyświetl
            </div>
          )}
        </div>
      ) : (
        <div className="control-block bg-color-console" onClick={onAddElement}>
          <div className="text-bold text-small text-white mr-8">Wyświetl</div>
          <div className="w-min-50px h-20px b-r-10 bg-color-console-text" />
        </div>
      )}
    </Fragment>
  );
}

export default ConsoleLogBlock;
