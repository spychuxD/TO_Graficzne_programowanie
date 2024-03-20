export default function DeleteBlock({setBlocksState, id }){
    const onDeleteElement = () =>{
        setBlocksState((prev) => prev.filter((item) => item.id !== id));
    }
    return(
        <button style={{marginLeft:"auto",marginRight:0}} onClick={onDeleteElement}>Usuń</button>
    )
}