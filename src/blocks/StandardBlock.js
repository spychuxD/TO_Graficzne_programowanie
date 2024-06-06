import { standardBlock } from "../blockTypes";
import DragHandle from "./DragHandle/DragHandle";
import MainDroppable from "../components/MainDroppable";
import blockRenderer from "../blockRenderer";
import { Fragment } from "react";
import { useSelector } from "react-redux";

export default function StandardBlock(props) {
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
              {
                <Fragment>
                  &nbsp;{v.split("?")[0]}&nbsp;
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
                  &nbsp;{v.split("?")[1]}&nbsp;
                </Fragment>
              }
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
