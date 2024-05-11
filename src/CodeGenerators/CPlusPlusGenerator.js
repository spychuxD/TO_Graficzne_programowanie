import { ifElseBlock, returnBlock } from "../blockTypes";

export function generateCppClassFromJson(json) {
  let cppClass = `class ${json.name.replace(/ /g, "_")} {\n`;

  cppClass += getFields("private", json);
  cppClass += getConstructor("private", json);
  cppClass += getMethod("private", json);

  cppClass += getFields("public", json);
  cppClass += getConstructor("public", json);
  cppClass += getMethod("public", json);

  cppClass += getFields("protected", json);
  cppClass += getConstructor("protected", json);
  cppClass += getMethod("protected", json);
//ebugger

  //traverse(json.children[0][2])
  // Dodaj konstruktory

  /*
    // Dodaj metody
    if (json.methods && json.methods.length > 0) {
      json.methods.forEach(method => {
        cppClass += `    ${method.returnType} ${method.name}(${method.parameters.join(', ')}) {\n`;
        cppClass += `        // Implementacja metody\n`;
        cppClass += `    }\n`;
      });
    }
  
    
  */
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
function getConstructor(visibility, json) {
  let result = "";
  if (json.constructors && json.constructors.length > 0) {
    json.constructors.forEach((constructor) => {
      if (visibility === constructor.visibility) {
        result += `    ${json.name.replace(/ /g, "_")}(`;
        constructor.children[1].forEach((parametr) => {
          result +=
            (parametr.children[0].length > 0
              ? parametr.children[0][0].name
              : undefined) + " ";
          result += parametr.name;
          result += ",";
        });
        result += `) {\n`;
        result += `        // Implementacja konstruktora\n`;
        result += `    }\n`;
      }
    });
  }
  return result;
}
function getMethod(visibility, json) {
    let result = "";
  if (json.methods && json.methods.length > 0) {
    json.methods.forEach((method) => {
        if (visibility === method.visibility) {
            result += `    `;
            result += method.children[0].length>0?method.children[0][0].name:undefined
            result += " ";
            result += `${method.name.replace(/ /g, "_")}(`;
            method.children[1].forEach((parametr) => {
              result +=
                (parametr.children[0].length > 0
                  ? parametr.children[0][0].name
                  : undefined) + " ";
              result += parametr.name;
              result += ",";
            });
            result += `) {\n`;
            debugger
            result += traverse(method.children[2],2)
            result += `    }\n`;
          }
    });
  }
  return result;
}

function traverse(obj,level) {
  let result = "";
  obj?.forEach((element)=>{
    switch(element.type){
      case returnBlock:
        result+= generateTabs(level)+"return"
        result+= traverse(element.children[0],level+1)
        result+= ";\n"
      break
      case ifElseBlock:
        result+= generateTabs(level)+"if("
        result+= traverse(element.children[0])
        result+= generateTabs(level)+"){\n"
        result+= traverse(element.children[1],level+1)
        result+= generateTabs(level)+"}else{\n"
        result+= traverse(element.children[2],level+1)
        result+= generateTabs(level)+"}\n"
      break
    }
  })
  return result;
}
function generateTabs(count)
{
  let result = "";
  for(let i=0;i<count;i++)
  {
    result += `    `;
  }
  return result;
}