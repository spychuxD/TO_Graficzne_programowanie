import "../App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import VariableBlock from "./VariableBlocks/VariableDeclarationBlock";
import MethodBlock from "./MethodBlock";
import { useDispatch } from "react-redux";
import {
  createField,
  editClassName,
  createMethod,
} from "../redux/slices/Classes";
import { useSelector } from "react-redux";

function ClassBlock({ reduxClassId }) {
  const classObjest = useSelector((state) =>
    state.classes.classes.find((c) => c.id === reduxClassId)
  );
  const dispatch = useDispatch();

  const onAddField = () => {
    dispatch(createField({ id: reduxClassId }));
  };
  const onAddMethods = () => {
    dispatch(createMethod({ id: reduxClassId }));
  };
  return (
    <div className="border-r-10 bg-color-class blocks-container flex-col p-8">
      <div style={{ display: "flex", padding: 10, gap: 10 }}>
        <div className="text-bold text-white">Klasa</div>
        <input
          className="block-input"
          type="text"
          placeholder="Nazwa Klasy"
          value={classObjest.name}
          onChange={(e) =>
            dispatch(editClassName({ id: reduxClassId, name: e.target.value }))
          }
        />
      </div>
      <div className="border-r-10 blocks-container bg-color-classButton w-full align-center justify-center flex-col">
        {classObjest.fields.map((item, index) => (
          <div className="item-container  p-8" key={index}>
            <VariableBlock {...item}/>
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
      <div className="border-r-10 blocks-container bg-color-classButton w-full align-center justify-center flex-col">
        {classObjest.methods.map((item, index) => (
          <div className="item-container w-full p-8">
            <MethodBlock {...item} classObject={classObjest}/>
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
