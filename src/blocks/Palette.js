import React, { useState } from "react";
import ForBlock from "./ForBlock";
import BeginBlock from "./BeginBlock";
import VariableDeclarationBlock from "./VariableBlocks/VariableDeclarationBlock";
import VariableBlock from "./VariableBlocks/VariableBlock";
import VariableTypesBlock from "./VariableBlocks/VariableTypesBlock";
import EndBlock from "./EndBlock";
import { Operators } from "./OperatorsBlocks/Operators";
import { VariableTypes } from "./VariableBlocks/VariableTypes";
import OperatorsBlocks from "./OperatorsBlocks/OperatorsBlocks";
import { MdHelp } from "react-icons/md";
import Button from "@mui/material/Button";
import { MdForkRight, MdBento, MdCalculate } from "react-icons/md";
import IfElseBlock from "./IfElseBlock";
import ConsoleLogBlock from "./ConsoleLogBlock";
import SetOn from "./SetOn";
import { useSelector } from "react-redux";
import ClassDefinitionBlock from "./ClassBlocks/ClassDefinitionBlock";
import WhileBlock from "./WhileBlock";
import DowhileBlock from "./DowhileBlock";
import ClassMethodBlock from "./ClassBlocks/ClassMethodBlock";
import {
  beginBlock,
  classDefinitionBlock,
  classMethodBlock,
  consoleLogBlock,
  dowhileBlock,
  endBlock,
  forBlock,
  ifElseBlock,
  operatorsBlocks,
  setOn,
  variableBlock,
  variableDeclarationBlock,
  variableTypesBlock,
  whileBlock,
} from "../blockTypes";
import FieldBlock from "./ClassBlocks/FieldBlock";

export default function Palette({ blocksState, setBlocksState }) {
  const classes = useSelector((state) => state.classes.classes);
  const variables = useSelector((state) => state.codeStructure.variables);
  const [category, setCategory] = useState([0]);
  const [operatorsCategory, setOperatorsCategory] = useState([0]);
  const handleCategory = (newVal) => {
    if (category.includes(newVal)) {
      setCategory((oldVal) => oldVal.filter((val) => val !== newVal));
    } else {
      setCategory((oldVal) => [...oldVal, newVal]);
    }
  };
  const handleOperatorsCategory = (newVal) => {
    if (operatorsCategory.includes(newVal)) {
      setOperatorsCategory((oldVal) => oldVal.filter((val) => val !== newVal));
    } else {
      setOperatorsCategory((oldVal) => [...oldVal, newVal]);
    }
  };
  return (
    <div>
      <div className="list-header">
        <Button
          fullWidth
          startIcon={<MdForkRight size={24} className="mr-8" />}
          onClick={() => handleCategory(1)}
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
          <div
            className="palette-blocks-container slideDown"
            style={{ zIndex: 1000 }}
          >
            <BeginBlock
              id={beginBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />
            <EndBlock
              id={endBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />
            <IfElseBlock
              id={ifElseBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />
            <ForBlock
              id={forBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />
            <WhileBlock
              id={whileBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />
            <DowhileBlock
              id={dowhileBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />
            <ConsoleLogBlock
              id={consoleLogBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />
            <VariableDeclarationBlock
              id={variableDeclarationBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
            />
            <SetOn id={setOn} blocksState={blocksState} setBlocksState={setBlocksState} />
          </div>
        </div>
      ) : null}
      <div className="list-header">
        <Button
          fullWidth
          startIcon={<MdForkRight size={24} className="mr-8" />}
          onClick={() => handleCategory(2)}
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
          <div className="palette-blocks-container slideDown">
            {variables?.map((v, k) => (
              <VariableBlock
                id={variableBlock+"|"+v.id}
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
          onClick={() => handleCategory(3)}
        >
          <span className="text-bold">Operatory</span>
        </Button>
      </div>
      {category?.includes(3) ? (
        <div>
          <div className="palette-blocks-container slideDown">
            {Object.keys(Operators).map((operatorGroup, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                }}
              >
                <div className="list-header">
                  <Button
                    fullWidth
                    startIcon={<MdCalculate size={24} className="mr-8" />}
                    onClick={() => handleOperatorsCategory(operatorGroup)}
                  >
                    <span className="text-bold">{operatorGroup}</span>
                  </Button>
                </div>

                {operatorsCategory?.includes(operatorGroup) ? (
                  <>
                    <div className="flex-row align-center justify-center">
                      <MdHelp color="#e3eef2" className="m-8"></MdHelp>
                      <div className="text-center text-xx-small">
                        Kliknij na blok, aby go dodać
                      </div>
                    </div>
                    {Object.keys(Operators[operatorGroup]).map(
                      (operatorType, index) => (
                        <OperatorsBlocks
                          id={operatorsBlocks+"|"+Operators[operatorGroup][operatorType]}
                          key={index}
                          blocksState={blocksState}
                          setBlocksState={setBlocksState}
                          name={Operators[operatorGroup][operatorType]}
                        />
                      )
                    )}
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="list-header">
        <Button
          fullWidth
          startIcon={<MdCalculate size={24} className="mr-8" />}
          onClick={() => handleCategory(4)}
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
          <div className="palette-blocks-container slideDown">
            {Object.keys(VariableTypes).map((variableType, index) => (
              <VariableTypesBlock
                id={variableTypesBlock+"|"+VariableTypes[variableType]}
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
          onClick={() => handleCategory(5)}
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
          <div className="palette-blocks-container slideDown">
            {classes.map((v, k) => (
              <div key={k}>
                <ClassDefinitionBlock id={classDefinitionBlock+"|"+v.id} name={v.name} classId={v.id} />
                {v.fields.map((field, index) => (
                  <FieldBlock name={field.name} id={classMethodBlock+"|"+v.id+"|"+field.id} key={index}/>
                ))}
                {v.methods.map((method, index) => (
                  <ClassMethodBlock name={method.name} id={classMethodBlock+"|"+v.id+"|"+method.id} key={index}/>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
