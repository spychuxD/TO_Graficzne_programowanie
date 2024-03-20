import ForBlock from "./ForBlock"
import BeginBlock from "./BeginBlock"
import EndBlock from "./EndBlock"
export default function Palette({blocksState,setBlocksState}){
    return(
        <div>
            <BeginBlock blocksState ={blocksState} setBlocksState={setBlocksState}/>
            <ForBlock blocksState ={blocksState} setBlocksState={setBlocksState}/>
            <EndBlock blocksState ={blocksState} setBlocksState={setBlocksState}/>
        </div>
    )
}