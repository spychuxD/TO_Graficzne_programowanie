import "../App.css";
import { Fragment } from "react";
import { variableBlock } from "../blockTypes";
import { v4 as uuidv4 } from "uuid";
import DeleteBlock from "./DeleteBlock";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { addElement, changeElement } from "../redux/slices/CodeStructure";

function VariableBlock(props) {
  const dispatch = useDispatch();

  const onAddElement = () => {
    const newElement = {
      id: uuidv4(),
      name: "variable",
      type: variableBlock,
      dataType: "int",
      variableName: "test",
      availability: "public",
    };
    dispatch(addElement(newElement));
  };
  const onChangeElement = (fieldToModify, e) => {
    dispatch(
      changeElement({ id: props.id, fieldToModify, value: e.target.value })
    );
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <Fragment>
      {props.id !== undefined ? (
        <div
          className="blocks-container control-block bg-color-7"
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
        >
          <select
            name="dataType"
            className="block-select"
            defaultValue={props.dataType}
            onChange={(e) => onChangeElement("dataType", e)}
          >
            <option value="int">int</option>
            <option value="string">string</option>
            <option value="float">float</option>
            <option value="double">double</option>
            <option value="char">char</option>
          </select>
          <input
            onChange={(e) => onChangeElement("variableName", e)}
            placeholder="Nazwa Zmiennej"
            className="block-input"
            type="text"
            defaultValue={props.variableName}
          />
          <select
            onChange={(e) => onChangeElement("availability", e)}
            name="availability"
            className="block-select"
            defaultValue={props.availability}
          >
            <option value="public">public</option>
            <option value="private">private</option>
            <option value="protected">protected</option>
          </select>
          <div>
            <DeleteBlock id={props.id} setBlocksState={props.setBlocksState} />
          </div>
        </div>
      ) : (
        <div
          className="control-block-grid-2 bg-color-for"
          onClick={onAddElement}
          style={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "#e3eef2",
          }}
        >
          <select disabled name="dataType" className="block-select">
            <option value="type">Typ Zmiennej</option>
          </select>
          <input
            placeholder="Nazwa Zmiennej"
            className="block-input"
            type="text"
          />
          <select disabled name="availability" className="block-select">
            <option value="public">Dostępność</option>
          </select>
          <input
            disabled
            placeholder="Wartosc startowa"
            className="block-input"
            type="text"
          />
        </div>
      )}
    </Fragment>
  );
}
export default VariableBlock;
