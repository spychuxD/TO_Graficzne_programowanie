import "../../App.css";
import { Fragment } from "react";
import {
  classDefinitionBlock,
  variableDeclarationBlock,
} from "../../blockTypes";
import { useDispatch } from "react-redux";
import { toggleDisableDraggable } from "../../redux/slices/DraggableSettings";
import MainDroppable from "../../components/MainDroppable";
import blockRenderer from "../../blockRenderer";
import DragHandle from "../DragHandle/DragHandle";
import {
  changeClassElement,
  changeClassMethodVariable,
} from "../../redux/slices/Classes";

function VariableDeclarationBlock(props) {
  const dispatch = useDispatch();
  const onChangeElement = (fieldToModify, e) => {
    dispatch(
      changeClassElement({ id: props.id, fieldToModify, value: e.target.value })
    );
    dispatch(
      changeClassMethodVariable({
        id: props.id,
        fieldToModify,
        value: e.target.value,
      })
    );
  };
  /*const classObject = props.children?.length>0?useSelector(
    
  ):undefined;*/
  return (
    <Fragment>
      {/* {props.id !== undefined && !props.isOverlay ? ( */}
      {/* <div
        className="blocks-container control-block bg-color-7"
        ref={setNodeRef}
        style={{ width: "min-content", ...dynamicStyle }}
        {...listeners}
        {...attributes}
      > */}
      {/* <div
        onClick={onAddElement}
        style={{ height: 100, width: 100, backgroundColor: "red" }}
      ></div> */}
      <DragHandle
        {...props}
        type={variableDeclarationBlock}
        className="blocks-container control-block bg-color-7 text-nowrap"
      >
        {!props.isOverlay ? (
          <Fragment>
            Zmienna&nbsp;
            <MainDroppable dropId={props.id + "|0"} disabled={props.palette}>
              <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                {props.children
                  ? props.children[0]?.map((item, index) =>
                      blockRenderer(item, index)
                    )
                  : null}
              </div>
            </MainDroppable>
            &nbsp;o nazwie&nbsp;
            <input
              disabled={props.palette}
              onChange={(e) => onChangeElement("name", e)}
              placeholder="Nazwa"
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
            {props.children &&
            props.children[0].length > 0 &&
            props.children[0][0].type === classDefinitionBlock ? (
              <Fragment>
                &nbsp;z parametrami&nbsp;
                <MainDroppable
                  dropId={props.id + "|1"}
                  disabled={props.palette}
                >
                  <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                    {props.children
                      ? props.children[1]?.map((item, index) =>
                          blockRenderer(item, index)
                        )
                      : null}
                  </div>
                </MainDroppable>
              </Fragment>
            ) : null}
          </Fragment>
        ) : (
          <div className=" text-nowrap">Deklaracja zmiennej</div>
        )}
      </DragHandle>
      {/* </div> */}
      {/* ) : (
        <div
          className="control-block-grid-2 bg-color-for"
          onClick={onAddElement}
          style={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "#e3eef2",
          }}
        >
          <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10"></div>
          <input
            placeholder="Nazwa Zmiennej"
            className="block-input"
            type="text"
          />
        </div>
      )} */}
    </Fragment>
  );
}
export default VariableDeclarationBlock;
