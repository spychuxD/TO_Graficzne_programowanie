import React, { Fragment, useState } from "react";
import ForBlock from "./ForBlock";
import VariableDeclarationBlock from "./VariableBlocks/VariableDeclarationBlock";
import VariableTypesBlock from "./VariableBlocks/VariableTypesBlock";
import { CommonOperators, JSOperators } from "./OperatorsBlocks/Operators";
import {
  CPPVariableTypes,
  JSVariableTypes,
} from "./VariableBlocks/VariableTypes";
import OperatorsBlocks from "./OperatorsBlocks/OperatorsBlocks";
import { MdHelp } from "react-icons/md";
import Button from "@mui/material/Button";
import { MdForkRight, MdBento, MdCalculate } from "react-icons/md";
import IfElseBlock from "./IfElseBlock";
import { useSelector } from "react-redux";
import ClassDataTypeBlock from "./ClassBlocks/ClassDataTypeBlock";
import WhileBlock from "./WhileBlock";
import DowhileBlock from "./DowhileBlock";
import ClassMethodBlock from "./ClassBlocks/ClassMethodBlock";
import {
  classDefinitionBlock,
  classFieldBlock,
  classMethodBlock,
  classVariableBlock,
  classVariableDeclarationBlock,
  dowhileBlock,
  forBlock,
  methodsBlock,
  ifElseBlock,
  operatorsBlocks,
  valueBlock,
  variableDeclarationBlock,
  variableTypesBlock,
  whileBlock,
  standardBlock,
} from "../blockTypes";
import ClassFieldBlock from "./ClassBlocks/ClassFieldBlock";
import { DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import blockRenderer from "../blockRenderer";
import ValueBlock from "./VariableBlocks/VlaueBlock";
import ClassVariableDeclarationBlock from "./ClassBlocks/ClassVariableDeclarationBlock";
import ClassVariableBlock from "./ClassBlocks/ClassVariableBlock";
import { allBlockTypes } from "../AllBlockTypes";
import StandardBlock from "./StandardBlock";
import { updateRetrievedMethods } from "../redux/slices/LanguageSettings";
import { useDispatch } from "react-redux";

export default function Palette({ blocksState, setBlocksState }) {
  const dispatch = useDispatch();

  const classes = useSelector((state) => state.classes.classes);
  const tabIndex = useSelector((state) => state.blocksTabs.index);
  const mainMethodVariables = useSelector((state) =>
    state.classes.variables.filter((el) => el.methodId === "mainMethod")
  );
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
  const isLanguage = useSelector((state) => state.languageSettings.isLanguage);
  const currentClassName = useSelector(
    (state) => state.languageSettings.currentClassName
  );
  const blockTypes = useSelector((state) => state.languageSettings.blockTypes);

  function getArrayMethods(e) {
    let methods = [];

    let foundClass = window[e.target.value];
    if (foundClass && typeof foundClass === "function") {
      let proto = foundClass.prototype;

      const names = Object.getOwnPropertyNames(proto);
      for (let name of names) {
        if (typeof proto[name] === "function") {
          methods.push(name);
        }
      }
    }
    dispatch(
      updateRetrievedMethods({ methods: methods, name: e.target.value })
    );
  }

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
              Przeciągnij blok, aby go dodać
            </div>
          </div>
          <div
            className="palette-blocks-container slideDown"
            style={{ zIndex: 1000 }}
          >
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
            {isLanguage !== "python"? <DowhileBlock
              id={dowhileBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
              palette={true}
            /> : null}
            <VariableDeclarationBlock
              id={variableDeclarationBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
              palette={true}
            />
            {isLanguage === "js"
              ? blockTypes?.js?.map((v, k) => (
                  <StandardBlock
                    id={standardBlock + "|" + v.id}
                    subType={v.id}
                    data={v}
                    palette={true}
                    key={k}
                  />
                ))
              : null}
            {blockTypes?.standardTypes?.map((v, k) => (
              <StandardBlock
                id={standardBlock + "|" + v.id}
                key={k}
                subType={v.id}
                data={v}
                palette={true}
              />
            ))}
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
              Przeciągnij blok, aby go dodać
            </div>
          </div>
          <div className="palette-blocks-container slideDown">
            {tabIndex === 0
              ? mainMethodVariables?.map((v, k) => (
                  <ClassVariableBlock
                    id={classVariableBlock + "|" + v.id}
                    key={k}
                    blockId={v.id}
                    dataType={v.dataType}
                    name={v.name}
                    blocksState={blocksState}
                    setBlocksState={setBlocksState}
                    palette={true}
                  />
                ))
              : null}
            <ValueBlock
              id={valueBlock}
              blocksState={blocksState}
              setBlocksState={setBlocksState}
              palette={true}
            />
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
            {Object.keys(CommonOperators).map((operatorGroup, index) => (
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
                        Przeciągnij blok, aby go dodać
                      </div>
                    </div>
                    <div className="palette-blocks-container slideDown">
                      {Object.keys(CommonOperators[operatorGroup]).map(
                        (operatorType, index) => (
                          <OperatorsBlocks
                            id={
                              operatorsBlocks +
                              "|" +
                              CommonOperators[operatorGroup][operatorType]
                            }
                            key={index}
                            blocksState={blocksState}
                            setBlocksState={setBlocksState}
                            name={CommonOperators[operatorGroup][operatorType]}
                            palette={true}
                          />
                        )
                      )}
                      {isLanguage === "js"
                        ? JSOperators[operatorGroup] &&
                          Object.keys(JSOperators[operatorGroup]).map(
                            (operatorType, index) => (
                              <OperatorsBlocks
                                id={
                                  operatorsBlocks +
                                  "|" +
                                  JSOperators[operatorGroup][operatorType]
                                }
                                key={index}
                                blocksState={blocksState}
                                setBlocksState={setBlocksState}
                                name={JSOperators[operatorGroup][operatorType]}
                                palette={true}
                              />
                            )
                          )
                        : null}
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {isLanguage !== "python" ? <div className="list-header">
        <Button
          fullWidth
          startIcon={<MdCalculate size={24} className="mr-8" />}
          onClick={() => handleCategory(4)}
        >
          <span className="">Typy zmiennych</span>
        </Button>
      </div> : null}
      {category?.includes(4) ? (
        <div>
          <div className="flex-row align-center justify-center">
            <MdHelp color="#e3eef2" className="m-8"></MdHelp>
            <div className="text-center text-xx-small">
              Przeciągnij blok, aby go dodać
            </div>
          </div>
          <div className="palette-blocks-container slideDown">
            {isLanguage === "cpp" || isLanguage === "python"
              ? Object.keys(CPPVariableTypes).map((variableType, index) => (
                  <VariableTypesBlock
                    id={
                      variableTypesBlock + "|" + CPPVariableTypes[variableType]
                    }
                    key={index}
                    blocksState={blocksState}
                    setBlocksState={setBlocksState}
                    name={CPPVariableTypes[variableType]}
                    palette={true}
                  />
                ))
              : isLanguage === "js"
              ? Object.keys(JSVariableTypes).map((variableType, index) => (
                  <VariableTypesBlock
                    id={
                      variableTypesBlock + "|" + JSVariableTypes[variableType]
                    }
                    key={index}
                    blocksState={blocksState}
                    setBlocksState={setBlocksState}
                    name={JSVariableTypes[variableType]}
                    palette={true}
                  />
                ))
              : null}
          </div>
        </div>
      ) : null}
      <div className="list-header flex-row align-center justify-between">
        <Button
          fullWidth
          startIcon={<MdBento size={24} className="mr-8" />}
          onClick={() => handleCategory(6)}
        >
          <span className="">Klasy</span>
        </Button>
      </div>
      {category?.includes(6) ? (
        <div>
          <div className="flex-row align-center justify-center">
            <MdHelp color="#e3eef2" className="m-8"></MdHelp>
            <div className="text-center text-xx-small">
              Przeciągnij blok, aby go dodać
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
      {isLanguage === "cpp" ? (
        <Fragment>
          <div className="list-header flex-row align-center justify-between">
            <Button
              fullWidth
              startIcon={<MdBento size={24} className="mr-8" />}
              onClick={() => handleCategory(7)}
            >
              <span className="">Struktury danych C++</span>
            </Button>
          </div>
          {category?.includes(7) ? (
            <div>
              <div className="flex-row align-center justify-center">
                <MdHelp color="#e3eef2" className="m-8"></MdHelp>
                <div className="text-center text-xx-small">
                  Przeciągnij blok, aby go dodać
                </div>
              </div>
              <div className="palette-blocks-container slideDown">
                {blockTypes?.listTypes?.map((v, k) => (
                  <StandardBlock
                    id={standardBlock + "|" + v.id}
                    key={k}
                    subType={v.id}
                    data={v}
                    palette={true}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </Fragment>
      ) : null}
      {isLanguage === "js" ? (
        <div className="list-header">
          <Button
            fullWidth
            startIcon={<MdBento size={24} className="mr-8" />}
            onClick={() => handleCategory(8)}
          >
            <span className="">Metody klas JavaScript</span>
          </Button>
        </div>
      ) : null}
      {category?.includes(8) && isLanguage === "js" ? (
        <div>
          <input
            onChange={(e) => getArrayMethods(e)}
            placeholder="Nazwa klasy"
            className="reflect-input"
            type="text"
            defaultValue={currentClassName}
          />
          <div className="flex-row align-center justify-center">
            <MdHelp color="#e3eef2" className="m-8"></MdHelp>
            <div className="text-center text-xx-small">
              Przeciągnij blok, aby go dodać
            </div>
          </div>

          <div className="palette-blocks-container slideDown">
            {blockTypes.currentRetrievedMethods?.map((v, k) => (
              <StandardBlock
                id={standardBlock + "|" + v.id}
                key={k}
                subType={v.id}
                data={v}
                palette={true}
              />
            ))}
            {/* {isLanguage === "js"
              ? blockTypes?.arrayMethods?.map((v, index) => (
                  <StandardBlock
                    id={standardBlock + "|" + v.id}
                    palette={true}
                    key={index}
                    data={v}
                    subType={v.id}
                  />
                ))
              : null} */}
          </div>
        </div>
      ) : null}
      {createPortal(
        <DragOverlay dropAnimation={null}>
          {blockRenderer(dragOverlayData, 1, true)}
        </DragOverlay>,
        document.body
      )}
    </>
  );
}
