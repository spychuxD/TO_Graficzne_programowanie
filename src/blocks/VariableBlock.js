import "../App.css";
import Button from "@mui/material/Button";
import { MdRestoreFromTrash } from "react-icons/md";
export default function VariableBlock({
  id,
  type,
  name,
  availability,
  initVal,
  data,
  setData,
}) {
  const onChangeData = (value, op) => {
    debugger;
    const newData = { ...data };
    const index = newData.attributesItems.findIndex((item) => item.id === id);
    // eslint-disable-next-line default-case
    switch (op) {
      case 1:
        newData.attributesItems[index].type = value;
        break;
      case 2:
        newData.attributesItems[index].name = value;
        break;
      case 3:
        newData.attributesItems[index].availability = value;
        break;
      case 4:
        newData.attributesItems[index].initVal = value;
    }
    setData(newData);
  };

  const onDelete = () => {
    const newData = {
      ...data,
      attributesItems: data.attributesItems.filter((item) => item.id !== id),
    };
    setData(newData);
  };
  return (
    <div
      className="blocks-container control-block bg-color-7"
      style={{ flexWrap: "nowrap", display: "flex", flexDirection: "row" }}
    >
      <select
        value={type}
        onChange={(e) => onChangeData(e.target.value, 1)}
        name="dataType"
        className="block-select"
      >
        <option value="type">Typ Zmiennej</option>
        <option value="int">int</option>
        <option value="string">string</option>
        <option value="float">float</option>
        <option value="double">double</option>
        <option value="char">char</option>
      </select>
      <input
        value={name}
        onChange={(e) => onChangeData(e.target.value, 2)}
        placeholder="Nazwa Zmiennej"
        className="block-input"
        type="text"
      />
      <select
        value={availability}
        onChange={(e) => onChangeData(e.target.value, 3)}
        name="availability"
        className="block-select"
      >
        <option value="type">Dostępność</option>
        <option value="private">private</option>
        <option value="public">public</option>
        <option value="protected">protected</option>
      </select>
      <input
        value={initVal}
        onChange={(e) => onChangeData(e.target.value, 4)}
        placeholder="Wartosc startowa"
        className="block-input"
        type="text"
      />
      <Button
        style={{ marginLeft: "auto", marginRight: 0, color: "#FFF" }}
        onClick={() => onDelete()}
        startIcon={<MdRestoreFromTrash></MdRestoreFromTrash>}
      >
        Usuń
      </Button>
    </div>
  );
}
