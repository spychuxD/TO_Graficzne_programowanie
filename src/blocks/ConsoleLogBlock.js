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

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id,
  });

  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined;

  return (
    <Fragment>
      {props.id !== undefined ? (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
          <div className="control-block bg-color-console" style={{ display: "flex", flexDirection: "column" }}>
            {!isDragging ? (
              <Fragment>
                <div className="text-bold text-white">Wyświetl</div>
                <MainDroppable dropId={props.id + "|0"}>
                <div className="w-full bg-color-console-text h-50px b-r-10">
                  {props.children[0].map((item, index) => blockRenderer(item))}
                </div>
                </MainDroppable>
                <DeleteBlock id={props.id} setBlocksState={props.setBlocksState} />
              </Fragment>
            ) : (
              <div className="text-bold text-white">Wyświetl</div>
            )}
          </div>
        </div>
      ) : (
        <div className="control-block bg-color-console" onClick={onAddElement}>
          <div className="text-bold text-white mr-8">Wyświetl</div>
          <div className="flex-row">
            <div className="text-bold text-white">{"("}</div>
            <div className="insideBox bg-color-console-text m-8" />
            <div className="text-bold text-white">{")"}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default ConsoleLogBlock;
