import { Droppable,DragDropContext } from "react-beautiful-dnd";
import Button from "@mui/material/Button";
import { MdRestoreFromTrash } from "react-icons/md";
export default function MethodBlock({
  id,
  name,
  data,
  setData,
}) {
    const handleDragAndDrop = (results) =>{debugger}
    const onDelete = () =>{
        const newData = {
            ...data,
            methodsItems: data.methodsItems.filter(item => item.id !== id)
          };
          setData(newData);
    }
    const onChangeName = (value) =>{
        debugger
        const newData = { ...data };
        const index = newData.methodsItems.findIndex(item => item.id === id);
        newData.methodsItems[index].name = value;
        setData(newData);
    }
  return (
    <div className="blocks-container control-block bg-color-13">
      <div style={{display:"flex"}} className="w-full">
        <input value={name} onChange={(e)=>onChangeName(e.target.value)} placeholder="Nazwa metody" className="block-input" type="text" />
        <Button style={{marginLeft:"auto",marginRight:0, color: '#FFF'}} onClick={()=>onDelete()} startIcon={<MdRestoreFromTrash></MdRestoreFromTrash>}>Usuń</Button>
      </div>

      <div className="control-block w-full bg-color-7">
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}></div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
