import React from "react";
import { MdHelp } from "react-icons/md";
import Palette from "../blocks/Palette";

function SectionLeft({ stores, setStores}) {
  return (
    <div className="sectionLeft">
      <div className="flex-row align-center justify-center">
        <MdHelp color="#e3eef2" className="m-8"></MdHelp>
        <div className="text-center text-xx-small">
          Kliknij na interesującą Cię kategorię
        </div>
      </div>
      <Palette setBlocksState={setStores} blocksState={stores}/>
    </div>
  );
}

export default SectionLeft;
