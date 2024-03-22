
import Button from "@mui/material/Button";
import { MdRestoreFromTrash } from "react-icons/md";
export default function DeleteBlock({setBlocksState, id }){
    const onDeleteElement = () =>{
        setBlocksState((prev) => prev.filter((item) => item.id !== id));
    }
    return(
        <Button style={{marginLeft:"auto",marginRight:0, color: '#FFF'}} onClick={onDeleteElement} startIcon={<MdRestoreFromTrash></MdRestoreFromTrash>}>Usuń</Button>
    )
}