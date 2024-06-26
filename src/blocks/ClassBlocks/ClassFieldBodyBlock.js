import "../../App.css";
import MainDroppable from "../../components/MainDroppable";
import blockRenderer from "../../blockRenderer";
import { useDispatch, useSelector } from "react-redux";
import { editFieldName, deleteField } from "../../redux/slices/Classes";
import { Button } from "@mui/material";
import { MdRestoreFromTrash } from "react-icons/md";
import { toggleDisableDraggable } from "../../redux/slices/DraggableSettings";
import { changeClassElement } from "../../redux/slices/Classes";
function ClassFieldBodyBlock(props) {
  const dispatch = useDispatch();
  const isLanguage = useSelector((state) => state.languageSettings.isLanguage);

  const onChangeElement = (fieldToModify, e) => {
    dispatch(
      changeClassElement({ id: props.id, fieldToModify, value: e.target.value })
    );
  };
  const fieldObject = useSelector((state) =>
    state.classes.classes
      .find((cl) => cl.id === props.classObject.id)
      ?.fields.find((fi) => fi.id === props.id)
  );
  return (
    <div className="blocks-container control-block bg-color-7 w-full text-nowrap">
      &nbsp;Pole&nbsp;
      <select
        className="block-input"
        onMouseEnter={() => {
          if (!props.palette) dispatch(toggleDisableDraggable());
        }}
        onMouseLeave={() => {
          if (!props.palette) dispatch(toggleDisableDraggable());
        }}
        onChange={(e) => onChangeElement("visibility", e)}
        value={fieldObject.visibility}
      >
        <option value="private">prywatne</option>
        <option value="public">publiczne</option>
        {isLanguage !== "js" ? (
          <option value="protected">chronione</option>
        ) : null}
      </select>
      {isLanguage !== "js" ? (
        <>
          &nbsp;typu&nbsp;
          <MainDroppable dropId={props.id + "|0"}>
            <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
              {props.children
                ? props.children[0]?.map((item, index) =>
                    blockRenderer(item, index)
                  )
                : null}
            </div>
          </MainDroppable>
        </>
      ) : null}
      &nbsp; o nazwie &nbsp;
      <input
        onChange={(e) => {
          dispatch(
            editFieldName({
              classId: props.classObject.id,
              fieldId: props.id,
              name: e.target.value,
            })
          );
        }}
        placeholder="Nazwa Zmiennej"
        className="block-input"
        type="text"
        defaultValue={fieldObject.name}
      />
      &nbsp;
      <Button
        style={{ marginLeft: "auto", marginRight: 0, color: "#FFF" }}
        onClick={() => {
          dispatch(
            deleteField({ classId: props.classObject.id, fieldId: props.id })
          );
        }}
        startIcon={<MdRestoreFromTrash></MdRestoreFromTrash>}
      >
        Usuń
      </Button>
    </div>
  );
}
export default ClassFieldBodyBlock;
