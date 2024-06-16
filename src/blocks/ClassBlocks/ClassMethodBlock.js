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
        {!props.isOverlay ? (
          <div className="blocks-container">
            <div className="text-nowrap">On object</div>
            <MainDroppable dropId={props.id + "|0"} disabled={props.palette}>
              <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10">
                {props.children
                  ? props.children[0].map((item, index) => blockRenderer(item))
                  : null}
              </div>
            </MainDroppable>
            <div className="text-nowrap" style={{ marginRight: 5 }}>
            execute
            </div>
            <div className="text-nowrap">
              {methodObject === undefined ? props.name : methodObject?.name}
            </div>

            <MainDroppable dropId={props.id + "|1"} disabled={props.palette}>
              <div className="w-min-50px w-full bg-color-console-text h-20px b-r-10">
                {props.children
                  ? props.children[1].map((item, index) => blockRenderer(item))
                  : null}
              </div>
            </MainDroppable>
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
