import MainDroppable from "../components/MainDroppable";
import Button from "@mui/material/Button";
import { MdRestoreFromTrash } from "react-icons/md";
import blockRenderer from "../blockRenderer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editMethodName } from "../redux/slices/Classes";
export default function MethodBlock(props) {
  const dispatch = useDispatch();

  return (
    <div className="blocks-container control-block bg-color-13 flex-col">
      <div style={{ display: "flex" }} className="w-full">
        <input
          value={props.name}
          placeholder="Nazwa metody"
          className="block-input"
          type="text"
          onChange={(e) =>
            dispatch(
              editMethodName({
                classId: props.classObject.id,
                methodId: props.id,
                name: e.target.value,
              })
            )
          }
        />
        <MainDroppable dropId={props.id + "|1"}>
          <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
            {props.children[1].map((item, index) => blockRenderer(item, index))}
          </div>
        </MainDroppable>
        <Button
          style={{ marginLeft: "auto", marginRight: 0, color: "#FFF" }}
          onClick={() => {}}
          startIcon={<MdRestoreFromTrash></MdRestoreFromTrash>}
        >
          Usuń
        </Button>
      </div>

      <div className="control-block w-full bg-color-7 border-none">
        <MainDroppable dropId={props.id + "|0"}>
          <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
            {props.children[0].map((item, index) => blockRenderer(item, index))}
          </div>
        </MainDroppable>
      </div>
    </div>
  );
}
