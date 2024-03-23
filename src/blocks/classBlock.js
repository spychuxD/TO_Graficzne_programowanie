import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import "../App.css";

import { beginBlock } from "../blockTypes";
import { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "./DeleteBlock";
import VariableBlock from "./VariableBlock";
import MethodBlock from "./MethodBlock";

function ClassBlock({ name, items, id, blocksState, setBlocksState }) {
  const [data, setData] = useState({
    methodsItems: [],
    attributesItems: [],
  });
  /*const handleDragAndDrop = (results) => {
    if (results?.destination?.droppableId === "methodsItems") {
      const foundItem = data.methodsItems.find(
        (item) => item.id === results.draggableId
      );
      setData((prevData) => ({
        ...prevData,
        methodsItems: prevData.methodsItems.filter(
          (item) => item.id !== results.draggableId
        ),
      }));
      setData((prevData) => ({
        ...prevData,
        attributesItems: [...prevData.attributesItems, foundItem],
      }));
    } else if (results?.destination?.droppableId === "attributesItems") {
      const foundItem = data.attributesItems.find(
        (item) => item.id === results.draggableId
      );
      setData((prevData) => ({
        ...prevData,
        attributesItems: prevData.attributesItems.filter(
          (item) => item.id !== results.draggableId
        ),
      }));
      setData((prevData) => ({
        ...prevData,
        methodsItems: [...prevData.methodsItems, foundItem],
      }));
    }
  };*/

  const onAddField = () => {
    const newData = { ...data };
    const newElement = {
      id: uuidv4(),
      type: "type",
      name: "",
      availability: "type",
      initVal: "",
    };
    newData.attributesItems.push(newElement);
    setData(newData);
  };
  const onAddMethods = () => {
    const newData = { ...data };
    const newElement = {
      id: uuidv4(),
      name: "",
      items: []
    };
    newData.methodsItems.push(newElement);
    setData(newData);
  };
  return (
    <div className="border-r-10 bg-color-3 blocks-container">
      <div style={{ display: "flex", padding: 10, gap: 10 }}>
        <div className="text-bold text-white">Klasa</div>
        <input className="block-input" type="text" placeholder="nazwa klasy" />
      </div>
      <div className="border-r-10 blocks-container bg-color-4 w-full align-center justify-center">
        {data.attributesItems.map((item, index) => (
          <div className="item-container">
            <VariableBlock {...item} data={data} setData={setData} />
          </div>
        ))}
        <button
          className="button"
          style={{ position: "relative" }}
          onClick={() => onAddField()}
        >
          Dodaj nowe pole klasy
        </button>
      </div>
      <div className="border-r-10 blocks-container bg-color-4 w-full align-center justify-center">
        {data.methodsItems.map((item, index) => (
          <div className="item-container w-full">
            <MethodBlock {...item} data={data} setData={setData} />
          </div>
        ))}
        <button
          className="button"
          style={{ position: "relative" }}
          onClick={() => onAddMethods()}
        >
          Dodaj nowe metody klasy
        </button>
      </div>

     
    </div>
  );
}
export default ClassBlock;
