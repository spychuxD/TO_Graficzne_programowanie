import "../../App.css";
import MainDroppable from "../../components/MainDroppable";
import blockRenderer from "../../blockRenderer";
import { useDispatch } from "react-redux";
import { editFieldName, deleteField } from "../../redux/slices/Classes";
import { Button } from "@mui/material";
import { MdRestoreFromTrash } from "react-icons/md";
import { toggleDisableDraggable } from "../../redux/slices/DraggableSettings";
import { changeClassElement } from "../../redux/slices/Classes";
function ClassFieldBodyBlock(props) {
  const dispatch = useDispatch();
  const onChangeElement = (fieldToModify, e) => {
    dispatch(
      changeClassElement({ id: props.id, fieldToModify, value: e.target.value })
    );
  };
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
      >
        <option value="private">prywatne</option>
        <option value="public">publiczne</option>
        <option value="protected">chronione</option>
      </select>
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
        defaultValue={props.variableName}
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
