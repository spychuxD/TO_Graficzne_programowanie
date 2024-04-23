import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  findPath,
  findObject,
  findLocationByPath,
  getObjectByPath,
  findAndDeleteByPath,
  updateObjectPath,
  updateRelatedPaths,
  findRelatedPaths,
} from "../PathOperationsLib";
import GetBlockStructure from "../../GetBlockStructure";

function findById(startState,classId){
  return startState.find(
    (cl) => cl.id === classId
  );
}


const classesSlice = createSlice({
  name: "classes",
  initialState: {
    classes: [],
    paths: [],
  },
  reducers: {
    addClass(state, action) {
      state.classes.push({
        id: action.payload.id,
        name: "Nienazwana klasa",
        fields: [],
        methods: [],
      });
    },
    createMethod(state, action) {
      const findedClass = state.classes.find(
        (cl) => cl.id === action.payload.id
      );
      if (findedClass !== undefined) {
        const newMethod = {
          id: uuidv4(),
          name: "Metoda bez nazwy",
          children: [[], [],[]],
        };
        findedClass.methods.push(newMethod);
        state.paths.push({
          id: newMethod.id,
          path: ["classes", action.payload.id + "|-1", "methods"],
        });
      }
    },
    createField(state, action) {
      const findedClass = findById(state.classes,action.payload.id)
      if (findedClass !== undefined) {
        const newField = {
          id: uuidv4(),
          name: "Pole bez nazwy",
          children: [[],[]],
        };
        findedClass.fields.push(newField);
        state.paths.push({
          id: newField.id,
          path: ["classes", action.payload.id + "|-1", "fields"],
        });
      }
    },
    deleteMethod(state,action){
      const {classId,methodId} = action.payload;
      const findedClass = findById(state.classes,classId)
      const methodIndex = findedClass.methods.find(me => me.id === methodId);
      findedClass.methods.splice(methodIndex, 1);
    },
    deleteField(state,action){
      const {classId,fieldId} = action.payload;
      const findedClass = findById(state.classes,classId)
      const fieldIndex = findedClass.fields.find(fi => fi.id === fieldId);
      findedClass.fields.splice(fieldIndex, 1);
    },
    editClassName(state, action) {
      const findedClass = state.classes.find(
        (cl) => cl.id === action.payload.id
      );
      findedClass.name = action.payload.name;
    },
    editFieldName(state, action) {
      debugger
      const findedClass = state.classes.find(
        (cl) => cl.id === action.payload.classId
      );
      const findedField = findedClass.fields.find(
        (fi) => fi.id === action.payload.fieldId
      );
      findedField.name = action.payload.name;
    },
    editMethodName(state, action) {
      const findedClass = state.classes.find(
        (cl) => cl.id === action.payload.classId
      );
      const findedMethod = findedClass.methods.find(
        (me) => me.id === action.payload.methodId
      );
      findedMethod.name = action.payload.name;
    },
    inserElementToClass(state, action) {
      debugger;
      const { object, to } = action.payload;

      //podział id obiektu dodawanego
      const objectSplit = object.split("|");
      //podział id lokalizacji
      const toSplit = to.split("|");

      //pobranie ścieżek lokalizacji oraz obiektu
      let pathTo = findPath(state, toSplit[0]);
      const pathObject = findPath(state, objectSplit[0]);

      let objectValue = undefined;
      if (pathObject === undefined) {
        //generowanie struktury nowego obiektu
        objectValue = GetBlockStructure(object);
      } else {
        //pobranie struktury obiektu z starej lokalizacji
        objectValue = findObject(state, object, pathObject);
      }
      //odszukanie lokalizacji docelowej na podstawie ścieżki
      let destinationValue = findLocationByPath(state, pathTo);
      destinationValue = destinationValue.find((el) => el.id === toSplit[0]);
      if (toSplit.length === 2) {
        destinationValue = getObjectByPath(destinationValue, ["children"]);
        destinationValue = destinationValue[toSplit[1]];
      }
      //wyznaczenie i usunięcie obiektu w starej lokalizacji
      if (pathObject !== undefined)
        findAndDeleteByPath(state, pathObject, object);

      //dodanie obiektu do nowej lokalizacji
      destinationValue.push(objectValue);

      if (pathObject === undefined) {
        pathTo = pathTo.concat(to);
        //dodanie śzieżki do nowego obiektu
        state.paths.push({
          id: objectValue.id,
          path: pathTo,
        });
        return;
      } 

      //aktualizacja ścieżki do obiektu
      updateObjectPath(state,object,pathTo,toSplit,to);
      const relatedPaths = findRelatedPaths(state,object);
      updateRelatedPaths(relatedPaths,pathTo,object,to);
      
    },
  },
});

export const {
  addClass,
  createMethod,
  createField,
  editClassName,
  editFieldName,
  editMethodName,
  inserElementToClass,
  deleteMethod,
  deleteField
} = classesSlice.actions;
export default classesSlice.reducer;
