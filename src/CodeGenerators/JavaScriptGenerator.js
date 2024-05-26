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
import {
  allBlockTypes,
  consoleOut,
  arrowFunction,
  returnValue,
} from "../AllBlockTypes";

export function generateJSFromJson(json) {
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

export function generateJSClassFromJson(json, page) {
  let JSClass = "";

  if (page === 0) {
    JSClass += "class main{\n";
    JSClass += "  main(){\n";
    JSClass += traverse(
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
        (parametr.children[0].length > 0 ? parametr.children[0][0].name : "") +
        " ";
      result += parametr.name;
      counter++;
      if (counter < classObject.constructors[0].children[1].length)
        result += ",";
    });
    result += `) {\n`;
    result += traverse(
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
      result += traverse(json, method.children[2], classObject, 2, true, "");
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

function traverse(json, obj, classObject, level, addSemicolon, adder) {
  let result = "";
  let i = 0;
  obj?.forEach((element) => {
    switch (element?.type) {
      case returnBlock:
        console.log("a");
        result += generateTabs(level) + "return";
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
        addSemicolon = false;
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
        addSemicolon = false;

        result += generateTabs(level);
        result += "for(";
        result +=
          traverse(json, element.children[0], classObject, 0, false, "") + ";";
        result +=
          traverse(json, element.children[1], classObject, 0, false, "") + ";";
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
        if (element.children[0][0]?.type === classDefinitionBlock) {
          result += "const ";
          result +=
            element.name +
            " = new " +
            traverse(json, element.children[0], classObject, 0, false, "");
          result +=
            "(" +
            traverse(json, element.children[1], classObject, 0, false, ",") +
            ")";
        } else {
          result +=
            traverse(json, element.children[0], classObject, 0, false, "") +
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
        addSemicolon = false;

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
          traverse(json, element.children[0], classObject, 0, false, "") + ".";
        result += findedMethod.name + "(";
        result +=
          traverse(json, element.children[1], classObject, 0, false, "") + ")";
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
          traverse(json, element.children[0], classObject, 0, false, "") + ".";
        result += findedMethodForField?.name;
        break;
      case standardBlock:
        const elementStructure = Object.values(allBlockTypes)
          .flat()
          .find((el) => el.id === element.subType);
        result += generateTabs(level);
        const splitedCode = elementStructure.structureJS.split("?");
        let i = 0;
        splitedCode.forEach((el) => {
          if (elementStructure.appendBeforeTraverseInJSGenerator === true) {
            result += el;

            result += traverse(
              json,
              element.children[i],
              classObject,
              0,
              false,
              ""
            );
          } else {
            result += traverse(
              json,
              element.children[i],
              classObject,
              0,
              false,
              ""
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
