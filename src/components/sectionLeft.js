import React from "react";
import { MdHelp } from "react-icons/md";
import Palette from "../blocks/Palette";

function SectionLeft({ stores, setStores }) {
  return (
    <div className="sectionLeft">
      <div className="flex-row align-center justify-center m-8">
        <MdHelp color="#1976d2" size={24} className="m-8"></MdHelp>
        <div className="text-center text-small text-bold">
          Kliknij na blok, aby go dodać
        </div>
      </div>
      <Palette setBlocksState={setStores} blocksState={stores} />
    </div>
  );
}

export default SectionLeft;
