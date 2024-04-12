import React, { useState } from "react";
import ForBlock from "./ForBlock";
import BeginBlock from "./BeginBlock";
import VariableDeclarationBlock from "./VariableBlocks/VariableDeclarationBlock";
import VariableBlock from "./VariableBlocks/VariableBlock";
import VariableTypesBlock from "./VariableBlocks/VariableTypesBlock";
import EndBlock from "./EndBlock";
import { ArithmeticOperations } from "./ArithmeticBlocks/ArithmeticOperations";
import { VariableTypes } from "./VariableBlocks/VariableTypes";
import ArithmeticBlocks from "./ArithmeticBlocks/ArithmeticBlocks";
import { MdHelp } from "react-icons/md";
import Button from "@mui/material/Button";
import { MdForkRight, MdBento, MdCalculate } from "react-icons/md";
import IfElseBlock from "./IfElseBlock";
import ConsoleLogBlock from "./ConsoleLogBlock";
import SetOn from "./SetOn";
import { useSelector } from "react-redux";
import ClassDefinitionBlock from "./ClassDefinitionBlock";

export default function Palette({ blocksState, setBlocksState }) {
  const classes = useSelector((state) => state.classes);
  const variables = useSelector((state) => state.codeStructure.variables);
  const [category, setCategory] = useState([0]);
  const handleCateogry = (newVal) => {
    if (category.includes(newVal)) {
      setCategory((oldVal) => oldVal.filter((val) => val !== newVal));
    } else {
      setCategory((oldVal) => [...oldVal, newVal]);
    }
  };
  return (
    <div>
      <div className="list-header">
        <Button
          fullWidth
          startIcon={<MdForkRight size={24} className="mr-8" />}
          onClick={() => handleCateogry(1)}
        >
          <span className="text-bold">Bloki sterujące</span>
        </Button>
      </div>
      {category?.includes(1) ? (
        <div>
          <div className="flex-row align-center justify-center">
            <MdHelp color="#e3eef2" className="m-8"></MdHelp>
            <div className="text-center text-xx-small">
              Kliknij na blok, aby go dodać
            </div>
          </div>
          <div className="blocks-container slideDown">
            <BeginBlock
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />
            <EndBlock
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />
            <IfElseBlock
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />
            <ForBlock
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />{" "}
            <ConsoleLogBlock
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />{" "}
            <VariableDeclarationBlock
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />
            <SetOn blocksState={blocksState} setBlocksState={setBlocksState} />
          </div>
        </div>
      ) : null}
      <div className="list-header">
        <Button
          fullWidth
          startIcon={<MdForkRight size={24} className="mr-8" />}
          onClick={() => handleCateogry(2)}
        >
          <span className="text-bold">zmienne</span>
        </Button>
      </div>
      {category?.includes(2) ? (
        <div>
          <div className="flex-row align-center justify-center">
            <MdHelp color="#e3eef2" className="m-8"></MdHelp>
            <div className="text-center text-xx-small">
              Kliknij na blok, aby go dodać
            </div>
          </div>
          <div className="blocks-container slideDown">
            {variables?.map((v, k) => (
              <VariableBlock
                key={k}
                blockId={v.id}
                dataType={v.dataType}
                variableName={v.variableName}
                blocksState={blocksState}
                setBlocksState={setBlocksState}
              />
            ))}
          </div>
        </div>
      ) : null}
      <div className="list-header">
        <Button
          fullWidth
          startIcon={<MdCalculate size={24} className="mr-8" />}
          onClick={() => handleCateogry(3)}
        >
          <span className="text-bold">Bloki arytmetyczne</span>
        </Button>
      </div>
      {category?.includes(3) ? (
        <div>
          <div className="flex-row align-center justify-center">
            <MdHelp color="#e3eef2" className="m-8"></MdHelp>
            <div className="text-center text-xx-small">
              Kliknij na blok, aby go dodać
            </div>
          </div>
          <div className="blocks-container slideDown">
            {Object.keys(ArithmeticOperations).map(
              (arithmeticOperation, index) => (
                <ArithmeticBlocks
                  key={index}
                  blocksState={blocksState}
                  setBlocksState={setBlocksState}
                  name={ArithmeticOperations[arithmeticOperation]}
                />
              )
            )}
          </div>
        </div>
      ) : null}
      <div className="list-header">
        <Button
          fullWidth
          startIcon={<MdCalculate size={24} className="mr-8" />}
          onClick={() => handleCateogry(4)}
        >
          <span className="text-bold">Typy zmiennych</span>
        </Button>
      </div>
      {category?.includes(4) ? (
        <div>
          <div className="flex-row align-center justify-center">
            <MdHelp color="#e3eef2" className="m-8"></MdHelp>
            <div className="text-center text-xx-small">
              Kliknij na blok, aby go dodać
            </div>
          </div>
          <div className="blocks-container slideDown">
            {Object.keys(VariableTypes).map((variableType, index) => (
              <VariableTypesBlock
                key={index}
                blocksState={blocksState}
                setBlocksState={setBlocksState}
                name={VariableTypes[variableType]}
              />
            ))}
          </div>
        </div>
      ) : null}
      <div className="list-header flex-row align-center justify-between">
        <Button
          fullWidth
          startIcon={<MdBento size={24} className="mr-8" />}
          onClick={() => handleCateogry(5)}
        >
          <span className="text-bold">Klasy</span>
        </Button>
      </div>
      {category?.includes(5) ? (
        <div>
          <div className="flex-row align-center justify-center">
            <MdHelp color="#e3eef2" className="m-8"></MdHelp>
            <div className="text-center text-xx-small">
              Kliknij na blok, aby go dodać
            </div>
          </div>
          <div className="blocks-container slideDown">
            {classes.map((v, k) => (
              <ClassDefinitionBlock name={v.name} classId={v.id} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
