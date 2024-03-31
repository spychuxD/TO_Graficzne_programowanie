import "../App.css";
import { beginBlock } from "../blockTypes";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "./DeleteBlock";
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import { useDispatch } from "react-redux";
import { addElement } from "../redux/slices/CodeStructure";
function BeginBlock(props) {
  const dispatch = useDispatch();

  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "start",
      type: beginBlock,
      items: [],
    };


    dispatch(addElement(newElement));
  };

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  return (
    <Fragment>
      {props.id !== undefined ? (
          <div ref={setNodeRef} style={style} {...listeners} {...attributes}>

            <div
              className="control-block bg-color-start"
            >
              <div className="text-bold text-white">START</div>
              <DeleteBlock setBlocksState={props.setBlocksState} id={props.id} />
            </div>
            
          </div>
      ) : (
        <div className="control-block bg-color-start" onClick={onAddElement}>
          <div className="text-bold text-white">START</div>
        </div>
      )}
    </Fragment>
  );
}
export default BeginBlock;
