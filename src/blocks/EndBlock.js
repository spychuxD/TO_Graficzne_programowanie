import { Droppable } from "react-beautiful-dnd";
import "../App.css"
import { blockText, endBlockStyles } from "../styles/BlockStyles";
import { Fragment } from "react";
import DeleteBlock from "./DeleteBlock";
import { endBlock } from "../blockTypes";
import { v4 as uuidv4 } from 'uuid';

function EndBlock({ name, items, id,setBlocksState }) {

  const onAddElement = () =>{
      
    const newElement = {
      id: uuidv4(),
      name: "stop",
      type: endBlock,
      items: [],
    };
    setBlocksState(prev => [...prev,newElement])

  }

    return (
      <Fragment>
        {
          id!==undefined?
            <Droppable droppableId={id}>
              {(provided) => (
                <div style={endBlockStyles} {...provided.droppableProps} ref={provided.innerRef}>
                    <div style={blockText}>stop</div>
                    <DeleteBlock id={id} setBlocksState={setBlocksState}/>
                </div>
              )}
            </Droppable>
          :
            <div style={endBlockStyles} onClick={onAddElement}>
                <div style={blockText}>stop</div>
            </div>
        }
      </Fragment>
      
    );
  }
export default EndBlock;