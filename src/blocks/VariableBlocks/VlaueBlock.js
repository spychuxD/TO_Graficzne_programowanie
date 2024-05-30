import "../../App.css";
import { valueBlock } from "../../blockTypes";
import { Fragment } from "react";
import { toggleDisableDraggable } from "../../redux/slices/DraggableSettings";
import DragHandle from "../DragHandle/DragHandle";
import { useDispatch, useSelector } from "react-redux";
import { changeClassElement } from "../../redux/slices/Classes";

export default function ValueBlock(props) {
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
        type={valueBlock}
        className={"control-block bg-color-start"}
      >
        {!props.isOverlay ? (
          <Fragment>
            <div className="text-bold text-small text-white">Wartość</div>
            <input
              disabled={props.palette}
              onChange={(e) => onChangeElement("value", e)}
              placeholder="Podaj wartość"
              className="block-input"
              type="text"
              defaultValue={props.value}
              onMouseEnter={() => {
                if (!props.palette) dispatch(toggleDisableDraggable());
              }}
              onMouseLeave={() => {
                if (!props.palette) dispatch(toggleDisableDraggable());
              }}
            />
            <div className="text-bold text-small text-white">typu</div>
            <select
              className="block-input"
              onMouseEnter={() => {
                if (!props.palette) dispatch(toggleDisableDraggable());
              }}
              onMouseLeave={() => {
                if (!props.palette) dispatch(toggleDisableDraggable());
              }}
              onChange={(e) => onChangeElement("valueType", e)}
            >
              {isLanguage === "js" ? (
                <>
                  <option value="integers">inne</option>
                  <option value="text">tekstowego</option>
                </>
              ) : (
                <>
                  <option value="integers">całkowitego</option>
                  <option value="rationals">rzeczywistego</option>
                  <option value="boolean">logicznego</option>
                  <option value="text">tekstowego</option>
                </>
              )}
            </select>
          </Fragment>
        ) : (
          <div className="text-nowrap" style={{ maxHeight: 50 }}>
            Wartość stała
          </div>
        )}
      </DragHandle>
    </Fragment>
  );
}
