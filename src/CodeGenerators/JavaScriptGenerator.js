import {
  classVariableBlock,
  consoleLogBlock,
  dowhileBlock,
  forBlock,
  ifElseBlock,
  operatorsBlocks,
  returnBlock,
  valueBlock,
  variableBlock,
  variableDeclarationBlock,
  variableTypesBlock,
  whileBlock,
} from "../blockTypes";
export function generateJavaScriptFromJson(json) {
  let JSClass = `class ${json.name.replace(/ /g, "_")} {\n`;

  JSClass += getFields(json);
  JSClass += getConstructor(json);
  JSClass += getMethod(json);

  JSClass += `};\n`;
  return JSClass;
}
function getFields(json) {
  let result = "";
  if (json.fields && json.fields.length > 0) {
    json.fields.forEach((field) => {
      result += `    `;
      if (field.visibility === "private") result += `#`;
      result += `${field.name.replace(/ /g, "_")};\n`;
    });
  }
  return result;
}
function getConstructor(json) {
  let result = "";
  if (json.constructors && json.constructors.length > 0) {
    json.constructors.forEach((constructor) => {
      result += `    ${json.name.replace(/ /g, "_")}(`;
      constructor.children[1].forEach((parametr) => {
        result += parametr.name;
        result += ",";
      });
      result += `) {\n`;
      result += traverse(json, constructor.children[2], 2);
      result += `    }\n`;
    });
  }
  return result;
}
function getMethod(json) {
  let result = "";
  if (json.methods && json.methods.length > 0) {
    json.methods.forEach((method) => {
      result += `    `;
      if (method.visibility === "private") result += `#`;
      result += `${method.name.replace(/ /g, "_")}(`;
      method.children[1].forEach((parametr) => {
        result += parametr.name;
        result += ",";
      });
      result += `) {\n`;
      result += traverse(json, method.children[2], 2);
      result += `\n    }\n`;
    });
  }
  return result;
}

function traverse(json, obj, level) {
  let result = "";
  obj?.forEach((element) => {
    switch (element.type) {
      case returnBlock:
        result += generateTabs(level) + "return";
        result += traverse(json, element.children[0], level + 1);
        result += ";\n";
        break;
      case ifElseBlock:
        result += generateTabs(level) + "if(";
        result += traverse(json, element.children[0]);
        result += generateTabs(level) + "){\n";
        result += traverse(json, element.children[1], level + 1);
        result += generateTabs(level) + "}else{\n";
        result += traverse(json, element.children[2], level + 1);
        result += generateTabs(level) + "}\n";
        break;
      case forBlock:
        result += generateTabs(level) + "for(";
        result += traverse(json, element.children[0]);
        result += generateTabs(level) + "){\n";
        result += traverse(json, element.children[1], level + 1);
        result += generateTabs(level) + "}\n";
        break;
      case whileBlock:
        result += generateTabs(level) + "while(";
        result += traverse(json, element.children[0]);
        result += generateTabs(level) + "){\n";
        result += traverse(json, element.children[1], level + 1);
        result += generateTabs(level) + "}\n";
        break;
      case dowhileBlock:
        result += generateTabs(level) + "do{\n";
        result += traverse(json, element.children[0], level + 1);
        result += generateTabs(level) + "}while(";
        result += traverse(json, element.children[1]);
        result += generateTabs(level) + ");\n";
        break;
      case operatorsBlocks:
        result += traverse(json, element.children[0]);
        result += element.operator;
        result += traverse(json, element.children[1], level + 1);
        break;
      case consoleLogBlock:
        result += generateTabs(level) + "console.log(";
        result += traverse(json, element.children[0], level);
        result += generateTabs(level) + ")\n";
        break;
      case variableTypesBlock:
        result += generateTabs(level) + element.name;
        break;
    }
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
