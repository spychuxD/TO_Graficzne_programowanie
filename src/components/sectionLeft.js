import React from "react";
import { MdHelp } from "react-icons/md";
import Palette from "../blocks/Palette";

function SectionLeft({ stores, setStores, tabs, setTabs }) {
  return (
    <div className="sectionLeft">
      <div className="flex-row align-center justify-center m-8">
        <MdHelp color="#1976d2" className="m-8"></MdHelp>
        <div className="text-center text-small text-bold">
          Kliknij na interesującą Cię kategorię
        </div>
      </div>
      <Palette setBlocksState={setStores} blocksState={stores} tabs={tabs} setTabs={setTabs}/>
    </div>
  );
}

export default SectionLeft;
