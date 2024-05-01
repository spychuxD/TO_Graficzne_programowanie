import "../../App.css";
import ClassMethodBodyBlock from "./ClassMethodBodyBlock";
import { useDispatch } from "react-redux";
import {
  createField,
  editClassName,
  createMethod,
} from "../../redux/slices/Classes";
import { useSelector } from "react-redux";
import ClassFieldBodyBlock from "./ClassFieldBodyBlock";

function ClassEditorBlock({ reduxClassId }) {
  const classObjest = useSelector((state) =>
    state.classes.classes.find((c) => c.id === reduxClassId)
  );
  const dispatch = useDispatch();

  const onAddField = () => {
    dispatch(createField({ id: reduxClassId }));
  };
  const onAddMethods = () => {
    dispatch(createMethod({ id: reduxClassId }));
  };
  return (
    <div className="border-r-10 bg-color-class blocks-container flex-col p-16 gap-10">
      <div style={{ display: "flex", padding: 10, gap: 10 }}>
        <div className="text-bold text-white">Klasa</div>
        <input
          className="block-input"
          type="text"
          placeholder="Nazwa Klasy"
          value={classObjest.name}
          onChange={(e) =>
            dispatch(editClassName({ id: reduxClassId, name: e.target.value }))
          }
        />
      </div>
      <div className="border-r-10 blocks-container bg-color-classButton w-full align-center justify-center flex-col p-8 gap-10">
        {classObjest.fields.map((item, index) => (
          <div className="item-container" key={index}>
            <ClassFieldBodyBlock {...item} classObject={classObjest} />
          </div>
        ))}
        <button
          className="button"
          style={{ position: "relative" }}
          onClick={() => onAddField()}
        >
          Dodaj nowe pole klasy
        </button>
      </div>
      <div className="border-r-10 blocks-container bg-color-classButton w-full align-center justify-center flex-col p-8">
        {classObjest.methods.map((item, index) => (
          <div className="item-container p-8" key={index}>
            <ClassMethodBodyBlock {...item} classObject={classObjest} />
          </div>
        ))}
        <button
          className="button"
          style={{ position: "relative" }}
          onClick={() => onAddMethods()}
        >
          Dodaj nowe metody klasy
        </button>
      </div>
    </div>
  );
}
export default ClassEditorBlock;
