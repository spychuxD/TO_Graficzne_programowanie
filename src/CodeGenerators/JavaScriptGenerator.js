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

function JavaScriptGenerator(props) {
  const blockTypes = useSelector((state) =>
    Object.values(state.languageSettings.blockTypes).flat()
  );
  function generateJSFromJson(json) {
    let page = 0,
      JSClass = "";
    json.classes.forEach(() => {
      if (page !== 0) {
        JSClass += generateJSClassFromJson(json, page);
      }
      page++;
    });
    JSClass += generateJSClassFromJson(json, 0);
    return JSClass;
  }

  function generateJSClassFromJson(json, page) {
    let JSClass = "";

    if (page === 0) {
      JSClass += "class main{\n";
      JSClass += "  main(){\n";
      JSClass += Traverse(
        json,
        json.classes[page].methods[0].children[2],
        json.classes[page],
        2,
        true,
        ""
      );
      JSClass += "\n  }\n";
      JSClass += "}\n";
      JSClass += "const m = new main();\n";
      JSClass += "m.main();";
      return JSClass;
    }

    JSClass = `class ${json.classes[page]?.name.replace(/ /g, "_")} {\n`;

    JSClass += getFields(json.classes[page]);
    JSClass += getConstructor(json, page);
    JSClass += getMethod(json, page);

    JSClass += `};\n`;
    return JSClass;
  }
  function getFields(json) {
    let result = "";
    if (json?.fields && json.fields.length > 0) {
      json.fields.forEach((field) => {
        result += `    `;
        if (field.visibility === "private") result += `#`;
        result += `${field.name.replace(/ /g, "_")};\n`;
      });
    }
    return result;
  }
  function getConstructor(json, page) {
    const classObject = json.classes[page];
    let result = "";
    if (classObject.constructors && classObject.constructors.length > 0) {
      result += `    constructor(`;
      let counter = 0;
      classObject.constructors[0].children[1].forEach((parametr) => {
        result +=
          (parametr.children[0].length > 0
            ? parametr.children[0][0].name
            : "") + " ";
        result += parametr.name;
        counter++;
        if (counter < classObject.constructors[0].children[1].length)
          result += ",";
      });
      result += `) {\n`;
      result += Traverse(
        json,
        classObject.constructors[0].children[2],
        classObject,
        2,
        true,
        ""
      );
      result += `    }\n`;
    }
    return result;
  }
  function getMethod(json, page) {
    const classObject = json.classes[page];

    let result = "";
    if (classObject.methods && classObject.methods.length > 0) {
      classObject.methods.forEach((method) => {
        result += `    `;
        if (method.visibility === "private") result += `#`;
        result += `${method.name.replace(/ /g, "_")}(`;
        let counter = 0;
        method.children[1].forEach((parametr) => {
          result +=
            (parametr.children[0].length > 0
              ? parametr.children[0][0].name
              : "") + " ";
          result += parametr.name;
          counter++;
          if (counter < method.children[1].length) result += ",";
        });
        result += `) {\n`;
        result += Traverse(json, method.children[2], classObject, 2, true, "");
        result += `\n   }\n`;
      });
    }
    return result;
  }
  // json - cała struktura
  // obj - struktura komponentów w metodzie
  // classObject - cała struktura klasy
  // level - ilość tabów od lewej strony
  // addSemicolon - czy po elementach w komponencie jest konec lini zakonczony ";"
  // adder - wypełniacz

  function Traverse(json, obj, classObject, level, addSemicolon, adder) {
    let result = "";
    let i = 0;

    obj?.forEach((element) => {
      switch (element?.type) {
        case ifElseBlock:
          addSemicolon = false;
          result += generateTabs(level) + "if(";
          result += Traverse(
            json,
            element.children[0],
            classObject,
            0,
            false,
            ""
          );
          result += "){\n";
          result += Traverse(
            json,
            element.children[1],
            classObject,
            level + 1,
            true,
            ""
          );
          result += "\n" + generateTabs(level) + "}else{\n";
          result += Traverse(
            json,
            element.children[2],
            classObject,
            level + 1,
            true,
            ""
          );
          result += "\n" + generateTabs(level) + "}\n";
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
          result += element.operator;
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
          //zmienna jest polem klasy
          let objectVal = classObject.fields?.find(
            (el) => el.id === splitElement[1]
          );
          //zmienna jest zmienną lokalną metod
          if (objectVal) result += "this.";
          if (objectVal === undefined)
            objectVal = json.variables?.find((el) => el.id === splitElement[1]);
          //zmienna jest parametrem metody
          if (objectVal === undefined)
            objectVal = classObject.methods
              .find((me) => me.id === splitElement[3])
              ?.children[1]?.find((el) => el.id === splitElement[1]);
          //zmienna jest parametrem konstruktora
          if (objectVal === undefined)
            objectVal = classObject.constructors
              .find((me) => me.id === splitElement[3])
              ?.children[1]?.find((el) => el.id === splitElement[1]);
          result += "" + objectVal?.name;
          break;
        case forBlock:
          result += generateTabs(level);
          result += "for(";
          result +=
            Traverse(json, element.children[0], classObject, 0, false, "") +
            ";";
          result +=
            Traverse(json, element.children[1], classObject, 0, false, "") +
            ";";
          result +=
            Traverse(json, element.children[2], classObject, 0, false, "") +
            "){\n";
          result += Traverse(
            json,
            element.children[3],
            classObject,
            level + 1,
            false,
            ""
          );
          result += "\n" + generateTabs(level) + "}\n";

          break;
        case valueBlock:
          result += element.valueType === "text" ? `"` : "";
          result += generateTabs(level) + element.value;
          result += element.valueType === "text" ? `" ` : "";
          break;
        case variableDeclarationBlock:
          result += generateTabs(level);
          if (element.children[0][0]?.type === classDefinitionBlock) {
            result += "const ";
            result +=
              element.name +
              " = new " +
              Traverse(json, element.children[0], classObject, 0, false, "");
            result +=
              "(" +
              Traverse(json, element.children[1], classObject, 0, false, ",") +
              ")";
          } else {
            result +=
              Traverse(json, element.children[0], classObject, 0, false, "") +
              " " +
              element.name;
          }
          break;
        case variableTypesBlock:
          result += generateTabs(level) + element.name;
          break;
        case whileBlock:
          addSemicolon = false;

          result += generateTabs(level);
          result += "while(";
          result += Traverse(
            json,
            element.children[0],
            classObject,
            0,
            false,
            ""
          );
          result += "){\n";
          result += Traverse(
            json,
            element.children[1],
            classObject,
            level + 1,
            true,
            ""
          );
          result += generateTabs(level) + "}\n";
          break;
        case dowhileBlock:
          addSemicolon = false;

          result += generateTabs(level);
          result += "do{\n";
          result += Traverse(
            json,
            element.children[0],
            classObject,
            level + 1,
            true,
            ""
          );
          result += "\n" + generateTabs(level);
          result += "}while(";
          result +=
            Traverse(json, element.children[1], classObject, 0, false, "") +
            ");\n";
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
          result +=
            Traverse(json, element.children[0], classObject, 0, false, "") +
            ".";
          result += findedMethod.name + "(";
          result +=
            Traverse(json, element.children[1], classObject, 0, false, "") +
            ")";
          break;
        case classFieldBlock:
          const findedClassForField = json.classes.find(
            (el) => el.id === element.classId
          );
          const findedMethodForField = findedClassForField?.fields.find(
            (el) => el.id === element.fieldId
          );
          result += generateTabs(level);
          result +=
            Traverse(json, element.children[0], classObject, 0, false, "") +
            ".";
          result += findedMethodForField?.name;
          break;
        case standardBlock:
          // let elementStructure = Object.values(allBlockTypes)
          //   .flat()
          //   .find((el) => el.id === element.subType);

          let elementStructure = blockTypes.find(
            (el) => el.id === element.subType
          );
          result += generateTabs(level);
          const splitedCode = elementStructure.structureJS.split("?");
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
                elementStructure.id === "arrowFunction" ? ";\n" : " "
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
      result += addSemicolon ? ";\n" : "";

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
  return <>{props.children(generateJSFromJson, generateJSClassFromJson)}</>;
}
export default JavaScriptGenerator;
