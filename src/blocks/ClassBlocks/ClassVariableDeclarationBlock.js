import "../../App.css";
import { Fragment } from "react";
import { classVariableDeclarationBlock } from "../../blockTypes";
import { useDispatch, useSelector } from "react-redux";
import { toggleDisableDraggable } from "../../redux/slices/DraggableSettings";
import MainDroppable from "../../components/MainDroppable";
import blockRenderer from "../../blockRenderer";
import DragHandle from "../DragHandle/DragHandle";
import { changeClassElement } from "../../redux/slices/Classes";

function ClassVariableDeclarationBlock(props) {
  const dispatch = useDispatch();
  const onChangeElement = (fieldToModify, e) => {
    dispatch(
      changeClassElement({ id: props.id, fieldToModify, value: e.target.value })
    );
  };
  const isLanguage = useSelector((state) => state.languageSettings.isLanguage);

  return (
    <Fragment>
      <DragHandle
        {...props}
        type={classVariableDeclarationBlock}
        className="blocks-container control-block bg-color-7 text-nowrap"
      >
        {!props.isOverlay ? (
          <Fragment>
            Zmienna&nbsp;
            {isLanguage !== "js" ? (
              <MainDroppable dropId={props.id + "|0"} disabled={props.palette}>
                <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                  {props.children
                    ? props.children[0]?.map((item, index) =>
                        blockRenderer(item, index)
                      )
                    : null}
                </div>
              </MainDroppable>
            ) : null}
            &nbsp;o nazwie&nbsp;
            <input
              disabled={props.palette}
              onChange={(e) => onChangeElement("name", e)}
              placeholder="Nazwa Zmiennej"
              className="block-input"
              type="text"
              value={props.name}
              onMouseEnter={() => {
                if (!props.palette) dispatch(toggleDisableDraggable());
              }}
              onMouseLeave={() => {
                if (!props.palette) dispatch(toggleDisableDraggable());
              }}
            />
          </Fragment>
        ) : (
          <div className=" text-nowrap">Deklaracja zmiennej</div>
        )}
      </DragHandle>
    </Fragment>
  );
}
export default ClassVariableDeclarationBlock;
