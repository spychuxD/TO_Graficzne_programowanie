import ForBlock from "./ForBlock";
import BeginBlock from "./BeginBlock";
import EndBlock from "./EndBlock";

import Button from "@mui/material/Button";
import { MdForkRight, MdBento, MdOutlineControlPoint } from "react-icons/md";

export default function Palette({ blocksState, setBlocksState }) {
  return (
    <div>
      <div className="flex-row align-center text-bold">
        <MdForkRight size={24} className="mr-8" />
        <div>Bloki sterujące</div>
      </div>
      <div className="blocks-container">
        <BeginBlock blocksState={blocksState} setBlocksState={setBlocksState} />
        <ForBlock blocksState={blocksState} setBlocksState={setBlocksState} />
        <EndBlock blocksState={blocksState} setBlocksState={setBlocksState} />
      </div>
      <div className="flex-row align-center justify-between">
        <div className="flex-row align-center text-bold">
          <MdBento size={24} className="mr-8" />
          <div>Klasy</div>
        </div>
        <Button startIcon={<MdOutlineControlPoint />}>
          <span className="text-bold">DODAJ</span>
        </Button>
      </div>
      <div></div>
    </div>
  );
}
