import { Droppable } from "react-beautiful-dnd";
import "../App.css"
import { beginBlockStyles,blockText } from "../styles/BlockStyles";
import { beginBlock } from "../blockTypes";
import { Fragment } from "react";
import { v4 as uuidv4 } from 'uuid';
import DeleteBlock from "./DeleteBlock";
function BeginBlock({ name, items, id,blocksState,setBlocksState }) {

    const onAddElement = () =>{
      
      const newElement = {
        id: uuidv4(),
        name: "start",
        type: beginBlock,
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
              <div style={beginBlockStyles} {...provided.droppableProps} ref={provided.innerRef}>
                  <div style={blockText}>start</div>
                  <DeleteBlock setBlocksState={setBlocksState} id={id}/>
              </div>
            )}
          </Droppable>
          :
          <div style={beginBlockStyles} onClick={onAddElement}>
                  <div style={blockText}>start</div>
          </div>
        }
        
      </Fragment>
     
    );
  }
export default BeginBlock;