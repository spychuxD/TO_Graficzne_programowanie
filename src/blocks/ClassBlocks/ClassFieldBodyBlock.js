import "../../App.css";
import MainDroppable from "../../components/MainDroppable";
import blockRenderer from "../../blockRenderer";
import { useDispatch } from "react-redux";
import { editFieldName,deleteField } from "../../redux/slices/Classes";
import { Button } from "@mui/material";
import { MdRestoreFromTrash } from "react-icons/md";
function ClassFieldBodyBlock(props) {
  const dispatch = useDispatch();
  return (
    <div className="blocks-container control-block bg-color-7 w-full">
      Dostępność
      <MainDroppable dropId={props.id + "|0"}>
        <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
          {props.children
            ? props.children[0]?.map((item, index) =>
                blockRenderer(item, index)
              )
            : null}
        </div>
      </MainDroppable>
      Typ
      <MainDroppable dropId={props.id + "|1"}>
        <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
          {props.children
            ? props.children[1]?.map((item, index) =>
                blockRenderer(item, index)
              )
            : null}
        </div>
      </MainDroppable>
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
       <Button
            style={{ marginLeft: "auto", marginRight: 0, color: "#FFF" }}
            onClick={() => {dispatch(deleteField({classId:props.classObject.id,fieldId:props.id}))}}
            startIcon={<MdRestoreFromTrash></MdRestoreFromTrash>}
          >
            Usuń
          </Button>
    </div>
  );
}
export default ClassFieldBodyBlock;
