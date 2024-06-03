// PythonGenerator.js
import {
    classDefinitionBlock,
    classFieldBlock,
    classMethodBlock,
    classVariableBlock,
    dowhileBlock,
    forBlock,
    ifElseBlock,
    operatorsBlocks,
    returnBlock,
    standardBlock,
    valueBlock,
    variableDeclarationBlock,
    variableTypesBlock,
    whileBlock,
  } from "../blockTypes";
  import { allBlockTypes } from "../AllBlockTypes";
  import { useSelector } from "react-redux";
  
  function PythonGenerator(props) {
    const blockTypes = useSelector((state) =>
      Object.values(state.languageSettings.blockTypes).flat()
    );
  
    function generatePythonFromJson(json) {
      let page = 0,
        PythonClass = "";
      json.classes.forEach(() => {
        if (page !== 0) {
          PythonClass += generatePythonClassFromJson(json, page);
        }
        page++;
      });
      PythonClass += generatePythonClassFromJson(json, 0);
      return PythonClass;
    }
  
    function generatePythonClassFromJson(json, page) {
      let PythonClass = "";
  
      if (page === 0) {
        PythonClass += "class Main:\n";
        PythonClass += "    def main(self):\n";
        PythonClass += Traverse(
          json,
          json.classes[page].methods[0].children[2],
          json.classes[page],
          2,
          true,
          ""
        );
        PythonClass += "\n\n";
        PythonClass += "if __name__ == '__main__':\n";
        PythonClass += "    main = Main()\n";
        PythonClass += "    main.main()\n";
        return PythonClass;
      }
  
      PythonClass = `class ${json.classes[page]?.name.replace(/ /g, "_")}:\n`;
  
      PythonClass += getFields(json.classes[page]);
      PythonClass += getConstructor(json, page);
      PythonClass += getMethod(json, page);
  
      return PythonClass;
    }
  
    function getFields(json) {
      let result = "";
      if (json?.fields && json.fields.length > 0) {
        json.fields.forEach((field) => {
          result += `    `;
          result += `self.${field.name.replace(/ /g, "_")} = None\n`;
        });
      }
      return result;
    }
  
    function getConstructor(json, page) {
      const classObject = json.classes[page];
      let result = "";
      if (classObject.constructors && classObject.constructors.length > 0) {
        result += `    def __init__(self, `;
        let counter = 0;
        classObject.constructors[0].children[1].forEach((parametr) => {
          result += parametr.name;
          counter++;
          if (counter < classObject.constructors[0].children[1].length)
            result += ", ";
        });
        result += `):\n`;
        result += Traverse(
          json,
          classObject.constructors[0].children[2],
          classObject,
          2,
          true,
          ""
        );
        result += `\n`;
      }
      return result;
    }
  
    function getMethod(json, page) {
      const classObject = json.classes[page];
      let result = "";
      if (classObject.methods && classObject.methods.length > 0) {
        classObject.methods.forEach((method) => {
          result += `    def ${method.name.replace(/ /g, "_")}(self, `;
          let counter = 0;
          method.children[1].forEach((parametr) => {
            result += parametr.name;
            counter++;
            if (counter < method.children[1].length) result += ", ";
          });
          result += `):\n`;
          result += Traverse(json, method.children[2], classObject, 2, true, "");
          result += `\n`;
        });
      }
      return result;
    }
  
    function Traverse(json, obj, classObject, level, addSemicolon, adder) {
      let result = "";
      let i = 0;
  
      obj?.forEach((element) => {
        switch (element?.type) {
          case ifElseBlock:
            addSemicolon = false;
            result += generateTabs(level) + "if ";
            result += Traverse(
              json,
              element.children[0],
              classObject,
              0,
              false,
              ""
            );
            result += ":\n";
            result += Traverse(
              json,
              element.children[1],
              classObject,
              level + 1,
              true,
              ""
            );
            result += "\n" + generateTabs(level) + "else:\n";
            result += Traverse(
              json,
              element.children[2],
              classObject,
              level + 1,
              true,
              ""
            );
            result += "\n";
            break;
          case operatorsBlocks:
            result += generateTabs(level);
            result += Traverse(
              json,
              element.children[0],
              classObject,
              0,
              false,
              ""
            );
            result += ` ${element.operator} `;
            result += Traverse(
              json,
              element.children[1],
              classObject,
              0,
              false,
              ""
            );
            break;
          case classVariableBlock:
            const splitElement = element.id.split("|");
            result += generateTabs(level);
            let objectVal = classObject.fields?.find(
              (el) => el.id === splitElement[1]
            );
            if (objectVal) result += "self.";
            if (objectVal === undefined)
              objectVal = json.variables?.find((el) => el.id === splitElement[1]);
            if (objectVal === undefined)
              objectVal = classObject.methods
                .find((me) => me.id === splitElement[3])
                ?.children[1]?.find((el) => el.id === splitElement[1]);
            if (objectVal === undefined)
              objectVal = classObject.constructors
                .find((me) => me.id === splitElement[3])
                ?.children[1]?.find((el) => el.id === splitElement[1]);
            result += "" + objectVal?.name;
            break;
          case forBlock:
            result += generateTabs(level);
            result += "for ";
            result +=
              Traverse(json, element.children[0], classObject, 0, false, "") +
              " in ";
            result +=
              Traverse(json, element.children[1], classObject, 0, false, "") +
              ":\n";
            result += Traverse(
              json,
              element.children[2],
              classObject,
              level + 1,
              false,
              ""
            );
            result += "\n";
            break;
          case valueBlock:
            result += element.valueType === "text" ? `"${element.value}"` : element.value;
            break;
          case variableDeclarationBlock:
            result += generateTabs(level);
            result += element.name;

            if (element.children[0][0]?.type === classDefinitionBlock) {
              result += "new " +
                Traverse(json, element.children[0], classObject, 0, false, "") +
                "(" +
                Traverse(json, element.children[1], classObject, 0, false, ",") +
                ")";
            } else {
              result += Traverse(json, element.children[0], classObject, 0, false, "");
            }
            break;
          case variableTypesBlock:
            result += generateTabs(level) + element.name;
            break;
          case whileBlock:
            addSemicolon = false;
            result += generateTabs(level);
            result += "while ";
            result += Traverse(
              json,
              element.children[0],
              classObject,
              0,
              false,
              ""
            );
            result += ":\n";
            result += Traverse(
              json,
              element.children[1],
              classObject,
              level + 1,
              true,
              ""
            );
            result += "\n";
            break;
          case dowhileBlock:
            addSemicolon = false;
            result += generateTabs(level);
            result += "while True:\n";
            result += Traverse(
              json,
              element.children[0],
              classObject,
              level + 1,
              true,
              ""
            );
            result += "\n" + generateTabs(level) + "if not (";
            result +=
              Traverse(json, element.children[1], classObject, 0, false, "") +
              "):\n";
            result += generateTabs(level + 1) + "break\n";
            break;
          case classDefinitionBlock:
            result += json.classes.find((el) => el.id === element.classId)?.name;
            break;
          case classMethodBlock:
            const findedClass = json.classes.find(
              (el) => el.id === element.classId
            );
            const findedMethod = findedClass?.methods.find(
              (el) => el.id === element.methodId
            );
            result += generateTabs(level);
            result += findedClass?.name + ".";
            result += findedMethod.name + "(";
            result += Traverse(json, element.children[1], classObject, 0, false, "");
            result += ")";
            break;
          case classFieldBlock:
            const findedClassForField = json.classes.find(
              (el) => el.id === element.classId
            );
            const findedMethodForField = findedClassForField?.fields.find(
              (el) => el.id === element.fieldId
            );
            result += generateTabs(level);
            result += findedClassForField?.name + ".";
            result += findedMethodForField?.name;
            break;
          case standardBlock:
            let elementStructure = blockTypes.find(
              (el) => el.id === element.subType
            );
            result += generateTabs(level);
            const splitedCode = elementStructure.structurePython.split("?");
            let i = 0;
            splitedCode.forEach((el) => {
              if (elementStructure.appendBeforeTraverseInJSGenerator === true) {
                result += el;
                result += Traverse(
                  json,
                  element.children[i],
                  classObject,
                  0,
                  false,
                  ";\n"
                );
              } else {
                result += Traverse(
                  json,
                  element.children[i],
                  classObject,
                  0,
                  false,
                  ","
                );
  
                result += el;
              }
  
              i++;
            });
            break;
          default:
            result += "";
        }
        result += addSemicolon ? "\n" : "";
  
        i++;
        if (adder && i < obj.length) result += adder;
      });
      return result;
    }
  
    function generateTabs(count) {
      let result = "";
      for (let i = 0; i < count; i++) {
        result += `    `;
      }
      return result;
    }
  
    return <>{props.children(generatePythonFromJson, generatePythonClassFromJson)}</>;
  }
  
  export default PythonGenerator;
  