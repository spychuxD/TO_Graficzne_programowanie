import MainDroppable from "../../components/MainDroppable";
import Button from "@mui/material/Button";
import { MdRestoreFromTrash } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import blockRenderer from "../../blockRenderer";
import { useDispatch } from "react-redux";
import { deleteMethod, editMethodName } from "../../redux/slices/Classes";
import { useState } from "react";
export default function ClassMethodBodyBlock(props) {
  const dispatch = useDispatch();
  const [isVisable, setIsVisable] = useState(false);
  return (
    <div className="blocks-container control-block bg-color-13 flex-col">
      <div className="w-full flex-row center">
        Typ
        <MainDroppable dropId={props.id + "|0"}>
          <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
            {props.children[0].map((item, index) => blockRenderer(item, index))}
          </div>
        </MainDroppable>
        Nazwa
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
        Parametry
        <MainDroppable dropId={props.id + "|1"}>
          <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10 flex-row ">
            {props.children[1].map((item, index) => blockRenderer(item, index))}
          </div>
        </MainDroppable>
        <div className="flex-row">
          <Button
            style={{ marginLeft: "auto", marginRight: 0, color: "#FFF" }}
            onClick={() => {
              setIsVisable(!isVisable);
            }}
            startIcon={isVisable ? <FaRegEye /> : <FaRegEyeSlash />}
          >
            {isVisable ? "Schowaj" : "Pokaż"}
          </Button>
          <Button
            style={{ marginLeft: "auto", marginRight: 0, color: "#FFF" }}
            onClick={() => {
              dispatch(
                deleteMethod({
                  classId: props.classObject.id,
                  methodId: props.id,
                })
              );
            }}
            startIcon={<MdRestoreFromTrash></MdRestoreFromTrash>}
          >
            Usuń
          </Button>
        </div>
      </div>
      {isVisable ? (
        <div className="control-block w-full bg-color-7 border-none">
          <MainDroppable dropId={props.id + "|2"}>
            <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
              {props.children[2].map((item, index) =>
                blockRenderer(item, index)
              )}
            </div>
          </MainDroppable>
        </div>
      ) : null}
    </div>
  );
}
