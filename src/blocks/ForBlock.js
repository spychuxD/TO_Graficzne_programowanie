import { Droppable,Draggable } from "react-beautiful-dnd";
import "../App.css"
import { Fragment, useState } from "react";
import { inputStyle } from "../styles/InputStyles";
import { forBlockStyles,blockText } from "../styles/BlockStyles";
import { forBlock } from "../blockTypes";
import { v4 as uuidv4 } from 'uuid';
import DeleteBlock from "./DeleteBlock";
function ForBlock({ name, items, id, blocksState,setBlocksState}) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onAddElement = () =>{
      
    const newElement = {
      id: uuidv4(),
      name: "for",
      type: forBlock,
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
                <div style={forBlockStyles} {...provided.droppableProps} ref={provided.innerRef}>
                  <div style={{display:"flex",gap:5}}>
                    <div style={blockText}>for</div>
                    <select style={inputStyle} value={selectedOption} onChange={handleOptionChange}>
                      <option value="">Wybierz opcję</option>
                      <option value="option1">Opcja 1</option>
                      <option value="option2">Opcja 2</option>
                      <option value="option3">Opcja 3</option>
                    </select>
                    <div style={blockText}>from</div>
                      <input style={inputStyle} type="number"/>
                    <div style={blockText}>to</div>
                      <input style={inputStyle} type="number"/>
                    <div style={blockText}>at step</div>
                      <input style={inputStyle} type="number"/>
                    <DeleteBlock id={id} setBlocksState={setBlocksState}/>
                  </div>
                  <div className="items-container">
                  {items.map((item, index) => (
                    <Draggable draggableId={item.id} index={index} key={item.id}>
                      {(provided) => (
                        <div
                      
                          className="item-container"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <div  style={{backgroundColor:"red"}}>{item.name}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                </div>
              )}
            </Droppable>
          :
          <div style={forBlockStyles}  onClick={onAddElement}>
            <div style={{display:"flex",gap:5}}>
              <div style={blockText}>for</div>
              <select disabled style={inputStyle} value={selectedOption} onChange={handleOptionChange}>
                <option value="">Wybierz opcję</option>
              </select>
              <div style={blockText}>from</div>
                <input disabled style={inputStyle} type="number" value={0}/>
              <div style={blockText}>to</div>
                <input disabled style={inputStyle} type="number" value={10}/>
              <div  style={blockText}>at step</div>
                <input disabled style={inputStyle} type="number" value={1}/>
            </div>
            <div className="items-container">
          </div>
          </div>
        }
      </Fragment>
    );
  }
export default ForBlock;