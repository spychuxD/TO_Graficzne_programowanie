import { listOperation } from "../../../blockTypes";
import DragHandle from "../../DragHandle/DragHandle";
import MainDroppable from "../../../components/MainDroppable";
import blockRenderer from "../../../blockRenderer";
import { Fragment } from "react";

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
  texts: ["Zabierz z początku", "element"],
};
export const listPopBack = {
  id: "listPopBack",
  texts: ["Zabierz z końca", "element"],
};
export const listGetFront = { id: "listGetFront", texts: ["Pokaż początek"] };
export const listGetBack = { id: "listGetBack", texts: ["Pokaż koniec"] };
export const listGetByIndex = {
  id: "listGetByIndex",
  texts: ["Pokaż z", "element numer"],
};

export const listAllOperations = [
  listPushFront,
  listPushBack,
  listPopFront,
  listPopBack,
  listGetFront,
  listGetBack,
  listGetByIndex,
];

export default function ListOperation(props) {
  const objectType = listAllOperations.find((el) => el.id === props.subType);
  return (
    <DragHandle
      {...props}
      type={listOperation}
      className={"control-block bg-color-arithmetic"}
    >
      {(!props.isDragging && !props.isOverlay) || props.palette ? (
        <div className="control-block-without-shadow bg-color-arithmetic text-nowrap">
          {objectType?.texts.map((v, k) => (
            <Fragment>
              &nbsp;{v}&nbsp;
              <MainDroppable
                dropId={props.id + "|" + k}
                disabled={props.palette}
              >
                <div className="w-min-50px  bg-color-if-condition h-20px b-r-10">
                  {props.children
                    ? props.children[k].map((item, index) =>
                        blockRenderer(item, index)
                      )
                    : null}
                </div>
              </MainDroppable>
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="control-block-without-shadow bg-color-arithmetic">
          <div className="m-8">
            <div className="text-bold text-white text-nowrap">
              Operacja na liście {props.name}
            </div>
          </div>
        </div>
      )}
    </DragHandle>
  );
}
