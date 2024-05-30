import { standardBlock } from "../blockTypes";
import DragHandle from "./DragHandle/DragHandle";
import MainDroppable from "../components/MainDroppable";
import blockRenderer from "../blockRenderer";
import { Fragment } from "react";
import { allBlockTypes } from "../AllBlockTypes";
import { useSelector } from "react-redux";

/*export const iterator = {
  id: "iterator",
  texts: ["Iterator"],
};
export const iteratorBegin = {
  id: "iteratorBegin",
  texts: ["Iterator początku"],
};
export const iteratorEnd = {
  id: "iteratorEnd",
  texts: ["Iterator końca"],
};
export const listDataType = {
    id: "listDataType",
    texts: ["Lista typu"],
};
export const listPushFront = {
  id: "listPushFront",
  texts: ["Dodaj na początku", "element"],
};
export const listPushBack = {
  id: "listPushBack",
  texts: ["Dodaj na końcu", "element"],
};
export const listPopFront = {
  id: "listPopFront",
  texts: ["Zabierz z początku"],
};
export const listPopBack = {
  id: "listPopBack",
  texts: ["Zabierz z końca"],
};
export const listGetFront = { id: "listGetFront", texts: ["Pokaż początek"] };
export const listGetBack = { id: "listGetBack", texts: ["Pokaż koniec"] };
export const listGetByIndex = {
  id: "listGetByIndex",
  texts: ["Pokaż z", "element numer"],*/
//};

/*export const listAllOperations = [
  iterator,
  iteratorBegin,
  iteratorEnd,
  listDataType,
  listPushFront,
  listPushBack,
  listPopFront,
  listPopBack,
  listGetFront,
  listGetBack,
  listGetByIndex,
];
*/
export default function StandardBlock(props) {
  // let objectType = Object.values(allBlockTypes)
  //   .flat()
  //   .find((el) => el.id === props.subType);
  const objectType = useSelector((state) =>
    Object.values(state.languageSettings.blockTypes)
      .flat()
      .find((el) => el.id === props.subType)
  );

  return (
    <DragHandle
      {...props}
      type={standardBlock}
      className={"control-block " + objectType?.styleClass}
    >
      {!props.isOverlay ? (
        <div
          key={props.k}
          className="control-block-without-shadow  text-nowrap"
        >
          {objectType?.texts?.map((v, k) => (
            <Fragment>
              &nbsp;{v}&nbsp;
              {!objectType?.disableMainDroppable ? (
                <MainDroppable
                  dropId={props.id + "|" + k}
                  disabled={props.palette}
                >
                  <div className="w-min-50px  bg-color-if-condition h-20px b-r-10">
                    {props.children
                      ? props.children[k]?.map((item, index) =>
                          blockRenderer(item, index)
                        )
                      : null}
                  </div>
                </MainDroppable>
              ) : null}
            </Fragment>
          ))}
        </div>
      ) : (
        <div
          className={"control-block-without-shadow " + objectType?.styleClass}
        >
          <div className="text-bold text-white text-nowrap">
            {objectType?.moveText}
          </div>
        </div>
      )}
    </DragHandle>
  );
}
