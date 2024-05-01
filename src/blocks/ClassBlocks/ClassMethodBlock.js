import "../../App.css";
import { Fragment, useEffect } from "react";

import blockRenderer from "../../blockRenderer";
import MainDroppable from "../../components/MainDroppable";
import { useSelector } from "react-redux";
import DragHandle from "../DragHandle/DragHandle";
import { classMethodBlock } from "../../blockTypes";
export default function ClassMethodBlock(props) {
  const methodObject = useSelector((state) =>
    state.classes.classes
      .find((cl) => cl.id === props.classId)
      ?.methods.find((me) => me.id === props.methodId)
  );

  return (
    <Fragment>
      <DragHandle
        {...props}
        className="blocks-container control-block bg-color-console"
        type={classMethodBlock}
      >
        {(!props.isDragging && !props.isOverlay) || props.palette ? (
          <div className="blocks-container">
            <div className="text-nowrap">Dla obiektu</div>
            <MainDroppable dropId={props.id + "|9"} disabled={props.palette}>
              <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10">
                {props.children
                  ? props.children[9].map((item, index) => blockRenderer(item))
                  : null}
              </div>
            </MainDroppable>
            <div className="text-nowrap" style={{ marginRight: 5 }}>
              wykonaj
            </div>
            <div className="text-nowrap">
              {methodObject === undefined ? props.name : methodObject?.name}
            </div>
            {methodObject?.children[1].map((v, i) => {
              return (
                <MainDroppable
                  dropId={props.id + "|" + i}
                  disabled={props.palette}
                >
                  <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10">
                    {props.children
                      ? props.children[i].map((item, index) =>
                          blockRenderer(item)
                        )
                      : null}
                  </div>
                </MainDroppable>
              );
            })}
          </div>
        ) : (
          <div>
            {methodObject?.name}
            Metoda klasy
          </div>
        )}
      </DragHandle>
    </Fragment>
  );
}
