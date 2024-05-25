import MainDroppable from "../../components/MainDroppable";
import Button from "@mui/material/Button";
import { MdRestoreFromTrash } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import blockRenderer from "../../blockRenderer";
import { useDispatch } from "react-redux";
import { deleteMethod, editMethodName } from "../../redux/slices/Classes";
import { Fragment, useState } from "react";
import { toggleDisableDraggable } from "../../redux/slices/DraggableSettings";
import { changeClassElement } from "../../redux/slices/Classes";
import ClassVariableBlock from "./ClassVariableBlock";
import { classVariableBlock } from "../../blockTypes";
import { useSelector } from "react-redux";
export default function ClassMethodBodyBlock(props) {
  const dispatch = useDispatch();
  const onChangeElement = (fieldToModify, e) => {
    dispatch(
      changeClassElement({ id: props.id, fieldToModify, value: e.target.value })
    );
  };
  const isLanguage = useSelector((state) => state.languageSettings.isLanguage);

  const classFields = useSelector((state) => state.classes.classes);
  const variables = useSelector((state) => state.classes.variables);
  const [isVisable, setIsVisable] = useState(false);
  return (
    <div className="blocks-container control-block bg-color-13 flex-col">
      <div className="w-full flex-row center text-nowrap">
        {props.constructor == true ? "Konstruktor" : "Metoda"}
        &nbsp;
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
          <option value="private">
            {props.constructor == true ? "prywatny" : "prywatna"}
          </option>
          <option value="public">
            {props.constructor == true ? "publiczny" : "publiczna"}
          </option>
          {isLanguage != "js" ? (
            <option value="protected">
              {props.constructor == true ? "chroniony" : "chroniona"}
            </option>
          ) : null}
        </select>
        {props.constructor == true ? null : (
          <Fragment>
            {isLanguage != "js" ? (
              <>
                &nbsp;typu&nbsp;
                <MainDroppable dropId={props.id + "|0"}>
                  <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                    {props.children[0].map((item, index) =>
                      blockRenderer(item, index)
                    )}
                  </div>
                </MainDroppable>
              </>
            ) : null}
            &nbsp;o nazwie&nbsp;
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
          </Fragment>
        )}
        &nbsp;z parametrami&nbsp;
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
                  isConstructor: props.constructor,
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
          <div style={{ height: "75%" }}>
            Zmienne lokalne
            <MainDroppable dropId={props.id + "|localVariable"}>
              <div
                className="w-min-50px w-full bg-color-if-condition h-20px b-r-10"
                style={{ height: "100%" }}
              >
                <div>Pola metody</div>
                {props.children[1].map((v, k) => (
                  <ClassVariableBlock
                    id={classVariableBlock + "|" + v.id}
                    name={v.name}
                    key={k}
                    palette={true}
                  />
                ))}

                <div>Pola klasy</div>
                {props.classObject.fields.map((v, k) => (
                  <ClassVariableBlock
                    id={classVariableBlock + "|" + v.id}
                    name={v.name}
                    key={k}
                    palette={true}
                  />
                ))}

                <div>Zmienne metody </div>
                {variables.map((v, k) =>
                  v.methodId === props.id ? (
                    <ClassVariableBlock
                      id={classVariableBlock + "|" + v.id}
                      name={v.name}
                      key={k}
                      palette={true}
                    />
                  ) : null
                )}
              </div>
            </MainDroppable>
          </div>
          <div style={{ width: "75%" }}>
            Ciało metody
            <MainDroppable dropId={props.id + "|2"}>
              <div className="w-min-50px w-full bg-color-if-condition h-20px b-r-10">
                {props.children[2].map((item, index) =>
                  blockRenderer(item, index)
                )}
              </div>
            </MainDroppable>
          </div>
        </div>
      ) : null}
    </div>
  );
}
