import {
  classDefinitionBlock,
  classFieldBlock,
  classMethodBlock,
  classVariableBlock,
  consoleLogBlock,
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
import { consoleOut } from "../AllBlockTypes";
import { useSelector } from "react-redux";

function CPlusPlusGenerator(props) {
  const blockTypes = useSelector((state) =>
    Object.values(state.languageSettings.blockTypes).flat()
  );
  function generateAllCppFromJson(json) {
    let cppClass = "#include <iostream>\n";

    let page = 0;
    json.classes.forEach((element) => {
      if (page !== 0) {
        cppClass += generateCppClassFromJson(json, page);
      }
      page++;
    });
    cppClass += generateCppClassFromJson(json, 0);
    return cppClass;
  }

  function generateCppClassFromJson(json, page) {
    let cppClass = "#include <iostream>\n";
    cppClass += "#include <list>\n";
    cppClass += "#include <vector>\n";
    if (page === 0) {
      cppClass += "int main(int argc, char *argv[]){\n";
      cppClass += traverse(
        json,
        json.classes[page].methods[0].children[2],
        json.classes[page],
        2,
        true,
        ""
      );
      cppClass += "}";
      return cppClass;
    }

    cppClass = `class ${json.classes[page].name.replace(/ /g, "_")} {\n`;

    cppClass += getFields("private", json.classes[page]);
    cppClass += getConstructor("private", json, page);
    //cppClass += getMethod("private", json.classes[page],json.variables);
    cppClass += getMethod("private", json, page);

    cppClass += getFields("public", json.classes[page]);
    cppClass += getConstructor("public", json, page);
    cppClass += getMethod("public", json, page);

    cppClass += getFields("protected", json.classes[page]);
    cppClass += getConstructor("protected", json, page);
    cppClass += getMethod("protected", json, page);

    cppClass += `};\n`;
    return cppClass;
  }
  function getFields(visibility, json) {
    let result = `\n` + visibility + `:\n`;
    if (json.fields && json.fields.length > 0) {
      json.fields.forEach((field) => {
        if (field.visibility === visibility)
          result += `    ${
            field.children[0].length > 0 ? field.children[0][0].name : undefined
          } ${field.name.replace(/ /g, "_")};\n`;
      });
    }
    return result;
  }
  function getConstructor(visibility, json, page) {
    const classObject = json.classes[page];
    let result = "";
    if (classObject.constructors && classObject.constructors.length > 0) {
      classObject.constructors.forEach((constructor) => {
        if (visibility === constructor.visibility) {
          result += `    ${classObject.name.replace(/ /g, "_")}(`;
          let counter = 0;
          constructor.children[1].forEach((parametr) => {
            result +=
              (parametr.children[0].length > 0
                ? parametr.children[0][0].name
                : undefined) + " ";
            result += parametr.name;
            counter++;
            if (counter < constructor.children[1].length) result += ",";
          });
          result += `) {\n`;
          result += traverse(
            json,
            constructor.children[2],
            classObject,
            2,
            true,
            ""
          );
          result += `    }\n`;
        }
      });
    }
    return result;
  }
  function getMethod(visibility, json, page) {
    const classObject = json.classes[page];

    let result = "";
    if (classObject.methods && classObject.methods.length > 0) {
      classObject.methods.forEach((method) => {
        if (visibility === method.visibility) {
          result += `    `;
          result +=
            method.children[0].length > 0
              ? method.children[0][0].name
              : undefined;
          result += " ";
          result += `${method.name.replace(/ /g, "_")}(`;
          let counter = 0;
          method.children[1].forEach((parametr) => {
            result +=
              (parametr.children[0].length > 0
                ? parametr.children[0][0].name
                : undefined) + " ";
            result += parametr.name;
            counter++;
            if (counter < method.children[1].length) result += ",";
          });
          result += `) {\n`;
          result += traverse(
            json,
            method.children[2],
            classObject,
            2,
            true,
            ""
          );
          result += `\n   }\n`;
        }
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

  function traverse(json, obj, classObject, level, addSemicolon, adder) {
    let result = "";
    let i = 0;
    obj?.forEach((element) => {
      switch (element?.type) {
        case returnBlock:
          result += generateTabs(level) + "return";
          //result+= traverse(element.children[0],level+1,classObject,variables)
          result +=
            traverse(
              json,
              element.children[0],
              classObject,
              level + 1,
              true,
              ""
            ) + ";";
          break;
        case ifElseBlock:
          result += generateTabs(level) + "if(";
          result += traverse(
            json,
            element.children[0],
            classObject,
            0,
            false,
            ""
          );
          result += "){\n";
          result += traverse(
            json,
            element.children[1],
            classObject,
            level + 1,
            true,
            ""
          );
          result += "\n" + generateTabs(level) + "}else{\n";
          result += traverse(
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
          result += traverse(
            json,
            element.children[0],
            classObject,
            0,
            false,
            ""
          );
          result += element.operator;
          result += traverse(
            json,
            element.children[1],
            classObject,
            0,
            addSemicolon,
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
          result += " " + objectVal?.name;
          break;
        case forBlock:
          result += generateTabs(level);
          result += "for(";
          result +=
            traverse(json, element.children[0], classObject, 0, false, "") +
            ";";
          result +=
            traverse(json, element.children[1], classObject, 0, false, "") +
            ";";
          result +=
            traverse(json, element.children[2], classObject, 0, false, "") +
            "){\n";
          result += traverse(
            json,
            element.children[3],
            classObject,
            level + 1,
            true,
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
          result +=
            traverse(json, element.children[0], classObject, 0, false, "") +
            " " +
            element.name;
          if (element.children[1].length > 0) {
            result +=
              "(" +
              traverse(json, element.children[1], classObject, 0, false, ",") +
              ")";
          }
          break;
        case variableTypesBlock:
          result += generateTabs(level) + element.name;
          break;
        case consoleLogBlock:
          result += generateTabs(level);
          result +=
            "std::cout << " +
            traverse(json, element.children[0], classObject, 0, false, "<<") +
            "<< std::endl";
          break;
        case whileBlock:
          result += generateTabs(level);
          result += "while(";
          result += traverse(
            json,
            element.children[0],
            classObject,
            0,
            false,
            ""
          );
          result += "){\n";
          result += traverse(
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
          result += generateTabs(level);
          result += "do{\n";
          result += traverse(
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
            traverse(json, element.children[1], classObject, 0, false, "") +
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
            traverse(json, element.children[0], classObject, 0, false, "") +
            ".";
          result += findedMethod.name + "(";
          result +=
            traverse(json, element.children[1], classObject, 0, false, "") +
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
            traverse(json, element.children[0], classObject, 0, false, "") +
            ".";
          result += findedMethodForField?.name;
          break;
        case standardBlock:
          let elementStructure = blockTypes.find(
            (el) => el.id === element.subType
          );
          result += generateTabs(level);
          const splitedCode = elementStructure.structureCPlusPLus.split("?");
          let i = 0;
          splitedCode.forEach((el) => {
            result += el;
            if (elementStructure.id === consoleOut.id)
              result += traverse(
                json,
                element.children[i],
                classObject,
                0,
                false,
                "<<"
              );
            else
              result += traverse(
                json,
                element.children[i],
                classObject,
                0,
                false,
                ""
              );
            i++;
          });
          break;
        default:
          result += "undefined";
      }
      if (
        ![forBlock, whileBlock, dowhileBlock, ifElseBlock].includes(
          element.type
        )
      ) {
        result += addSemicolon ? ";\n" : "";
      }
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
  return (
    <>{props.children(generateAllCppFromJson, generateCppClassFromJson)}</>
  );
}
export default CPlusPlusGenerator;
