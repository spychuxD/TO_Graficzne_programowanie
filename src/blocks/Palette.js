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
import ClassDataTypeBlock from "./ClassBlocks/ClassDataTypeBlock";
import WhileBlock from "./WhileBlock";
import DowhileBlock from "./DowhileBlock";
import ClassMethodBlock from "./ClassBlocks/ClassMethodBlock";
import {
  beginBlock,
  classDefinitionBlock,
  classFieldBlock,
  classMethodBlock,
  classVariableDeclarationBlock,
  consoleLogBlock,
  dowhileBlock,
  endBlock,
  forBlock,
  ifElseBlock,
  operatorsBlocks,
  setOn,
  valueBlock,
  variableBlock,
  variableDeclarationBlock,
  variableTypesBlock,
  whileBlock,
} from "../blockTypes";
import ClassFieldBlock from "./ClassBlocks/ClassFieldBlock";
import { DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import blockRenderer from "../blockRenderer";
import { useDispatch } from "react-redux";
import { setVariableType } from "../redux/slices/DraggableSettings";
import ValueBlock from "./VariableBlocks/VlaueBlock";
import ClassVariableDeclarationBlock from "./ClassBlocks/ClassVariableDeclarationBlock";

export default function Palette({ blocksState, setBlocksState }) {
  const dispatch = useDispatch();

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
  const dragOverlayData = useSelector(
    (state) => state.draggableSettings.dragOverlayData
  );
  return (
    <>
      <div className="list-header">
        <Button
          fullWidth
          startIcon={<MdForkRight size={24} className="mr-8" />}
          onClick={() => handleCategory(1)}
        >
          <span className=" text-nowrap">Bloki sterujące</span>
        </Button>
      </div>
      {category?.includes(1) ? (
        <>
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
              palette={true}
            />
            <EndBlock
              id={endBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
              palette={true}
            />
            <IfElseBlock
              id={ifElseBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
              palette={true}
            />
            <ForBlock
              id={forBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
              palette={true}
            />
            <WhileBlock
              id={whileBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
              palette={true}
            />
            <DowhileBlock
              id={dowhileBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
              palette={true}
            />
            <ConsoleLogBlock
              id={consoleLogBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
              palette={true}
            />
            <VariableDeclarationBlock
              id={variableDeclarationBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
              palette={true}
            />

            <SetOn
              id={setOn}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
              palette={true}
            />
          </div>
        </>
      ) : null}
      <div className="list-header">
        <Button
          fullWidth
          startIcon={<MdForkRight size={24} className="mr-8" />}
          onClick={() => handleCategory(2)}
        >
          <span className="">zmienne</span>
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
                id={variableBlock + "|" + v.id}
                key={k}
                blockId={v.id}
                dataType={v.dataType}
                variableName={v.variableName}
                blocksState={blocksState}
                setBlocksState={setBlocksState}
                palette={true}
              />
            ))}
            <ValueBlock
             id={valueBlock}
             blocksState={blocksState}
             setBlocksState={setBlocksState}
             palette={true}/>
          </div>
        </div>
      ) : null}
      <div className="list-header">
        <Button
          fullWidth
          startIcon={<MdCalculate size={24} className="mr-8" />}
          onClick={() => handleCategory(3)}
        >
          <span className="">Operatory</span>
        </Button>
      </div>
      {category?.includes(3) ? (
        <div className="palette-operators-container">
          <div className="flex-row align-center justify-center">
            <div className="text-center text-large">Rodzaje operatorów</div>
          </div>
          <div className="palette-operators-container-buttons slideDown">
            {Object.keys(Operators).map((operatorGroup, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                }}
              >
                <div className="list-header2">
                  <Button
                    fullWidth
                    onClick={() => handleOperatorsCategory(operatorGroup)}
                  >
                    <span className="">{operatorGroup}</span>
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
                    <div className="palette-blocks-container slideDown">
                      {Object.keys(Operators[operatorGroup]).map(
                        (operatorType, index) => (
                          <OperatorsBlocks
                            id={
                              operatorsBlocks +
                              "|" +
                              Operators[operatorGroup][operatorType]
                            }
                            key={index}
                            blocksState={blocksState}
                            setBlocksState={setBlocksState}
                            name={Operators[operatorGroup][operatorType]}
                            palette={true}
                          />
                        )
                      )}
                    </div>
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
          <span className="">Typy zmiennych</span>
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
                id={variableTypesBlock + "|" + VariableTypes[variableType]}
                key={index}
                blocksState={blocksState}
                setBlocksState={setBlocksState}
                name={VariableTypes[variableType]}
                palette={true}
              />
            ))}
          </div>
        </div>
      ) : null}
      {createPortal(
        <DragOverlay dropAnimation={null}>
          {blockRenderer(dragOverlayData, 1, true)}
        </DragOverlay>,
        document.body
      )}
      <div className="list-header flex-row align-center justify-between">
        <Button
          fullWidth
          startIcon={<MdBento size={24} className="mr-8" />}
          onClick={() => handleCategory(5)}
        >
          <span className="">Klasy</span>
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
            <ClassVariableDeclarationBlock
              id={classVariableDeclarationBlock}
              palette={true}
            />
            {classes.map((v, k) => (
              <div key={k}>
                <ClassDataTypeBlock
                  id={classDefinitionBlock + "|" + v.id}
                  name={v.name}
                  classId={v.id}
                  palette={true}
                />
                {v.fields.map((field, index) => (
                  <ClassFieldBlock
                    name={field.name}
                    id={classFieldBlock + "|" + v.id + "|" + field.id}
                    key={index}
                    palette={true}
                  />
                ))}
                {v.methods.map((method, index) => (
                  <ClassMethodBlock
                    name={method.name}
                    id={classMethodBlock + "|" + v.id + "|" + method.id}
                    key={index}
                    palette={true}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
