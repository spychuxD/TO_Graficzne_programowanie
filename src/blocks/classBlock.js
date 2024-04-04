
import "../App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import VariableBlock from "./VariableBlock";
import MethodBlock from "./MethodBlock";
import { useDispatch } from "react-redux";
import { createField } from "../redux/slices/Classes";
import { createMethod } from "../redux/slices/Classes";

function ClassBlock({reduxClassId}) {
  const dispatch = useDispatch(); 
  const [data, setData] = useState({
    methodsItems: [],
    attributesItems: [],
  });

  const onAddField = () => {
   /* const newData = { ...data };
    const newElement = {
      id: uuidv4(),
      type: "type",
      name: "",
      availability: "type",
      initVal: "",
    };
    newData.attributesItems.push(newElement);*/
    dispatch(createField({id:reduxClassId}));
   // setData(newData);
  };
  const onAddMethods = () => {
    /*const newData = { ...data };
    const newElement = {
      id: uuidv4(),
      name: "",
      items: []
    };
    newData.methodsItems.push(newElement);*/
    dispatch(createMethod({id:reduxClassId}));
    //setData(newData);
  };
  return (
    <div className="border-r-10 bg-color-class blocks-container">
      <div style={{ display: "flex", padding: 10, gap: 10 }}>
        <div className="text-bold text-white">Klasa</div>
        <input className="block-input" type="text" placeholder="nazwa klasy" />
      </div>
      <div className="border-r-10 blocks-container bg-color-classButton w-full align-center justify-center">
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
      <div className="border-r-10 blocks-container bg-color-classButton w-full align-center justify-center">
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
