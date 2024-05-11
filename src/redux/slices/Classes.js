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
  updateElementByIdRecursive,
} from "../PathOperationsLib";
import GetBlockStructure from "../../GetBlockStructure";
import { classVariableDeclarationBlock, variableDeclarationBlock } from "../../blockTypes";

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
    variables: []
  },
  reducers: {
    addClass(state, action) {
      state.classes.push({
        id: action.payload.id,
        name: "Nienazwana klasa",
        fields: [],
        constructors: [],
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
          visibility: "private",
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
          visibility: "private",
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
    createConstructor(state,action){
      const findedClass = findById(state.classes,action.payload.id)
      if(findedClass !== undefined)
      {
        const newConstructor = {
          id: uuidv4(),
          children: [[],[],[]],
          visibility: "private"
        };
        findedClass.constructors.push(newConstructor);
        state.paths.push({
          id: newConstructor.id,
          path: ["classes", action.payload.id + "|-1", "constructors"],
        });
      }
    },
    deleteMethod(state,action){
      debugger
      const {classId,methodId,isConstructor} = action.payload;
      const findedClass = findById(state.classes,classId)
      if(isConstructor === true)
      {
        const methodIndex = findedClass.constructors.findIndex(me => me.id === methodId);
        findedClass.constructors.splice(methodIndex, 1);
      }
      else
      {
        const methodIndex = findedClass.methods.findIndex(me => me.id === methodId);
        findedClass.methods.splice(methodIndex, 1);
      }
      
    },
    deleteField(state,action){
      const {classId,fieldId} = action.payload;
      const findedClass = findById(state.classes,classId)
      const fieldIndex = findedClass.fields.findIndex(fi => fi.id === fieldId);
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
      const { object, to,classId } = action.payload;

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
        //
        debugger
        if(objectValue.type === "variableDeclarationBlock"&&(pathTo[2]==="methods"||pathTo[2]==="constructors"))
        {
          objectValue.methodId = pathTo[3].split("|")[0];
          state.variables.push(objectValue);
        }
          
        return;
      } 

      //aktualizacja ścieżki do obiektu
      updateObjectPath(state,object,pathTo,toSplit,to);
      const relatedPaths = findRelatedPaths(state,object);
      updateRelatedPaths(relatedPaths,pathTo,object,to);
      
    },
    changeClassElement(state, action) {
      debugger
      const { id, fieldToModify, value } = action.payload;

      //podział id
      const idSplit = id.split("|");

      //pobranie ścieżek lokalizacji oraz obiektu
      let pathTo = findPath(state, idSplit[0]);
      let destinationValue = findLocationByPath(state, pathTo);
      destinationValue = destinationValue.find((el) => el.id === idSplit[0]);
      destinationValue[fieldToModify] = value
    },
    changeClassMethodVariable(state,action)
    {
      const { id, fieldToModify, value } = action.payload;

      const variable = state.variables.find(el=>el.id === id)
      variable[fieldToModify]=value;
    }
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
  deleteField,
  createConstructor,
  changeClassElement,
  changeClassMethodVariable
} = classesSlice.actions;
export default classesSlice.reducer;
