import { useSelector } from "react-redux";
import { classDefinitionBlock, classVariableBlock, consoleLogBlock, dowhileBlock, forBlock, ifElseBlock, operatorsBlocks, returnBlock, valueBlock, variableDeclarationBlock, variableTypesBlock, whileBlock } from "../blockTypes";

export function generateAllCppFromJson(json,variables)
{   
    let cppClass = "#include <iostream>\n";
    let page = 0;
    json.forEach(element => {
      if(page!==0)
      {
        cppClass+= generateCppClassFromJson(element,variables,page);
      }
      page++;
    });
    cppClass+= generateCppClassFromJson(json[0],variables,0);
    return cppClass;
}

export function generateCppClassFromJson(json,variables,page) {

  let cppClass = "#include <iostream>\n";
  if(page===0)
  {
    cppClass += "int main(int argc, char *argv[]){\n"
    cppClass += traverse(json.methods[0].children[2],2,json,variables,true)
    cppClass += "}"
    return cppClass;
  }

  cppClass = `class ${json.name.replace(/ /g, "_")} {\n`;

  cppClass += getFields("private", json);
  cppClass += getConstructor("private", json,variables);
  cppClass += getMethod("private", json,variables);

  cppClass += getFields("public", json);
  cppClass += getConstructor("public", json,variables);
  cppClass += getMethod("public", json,variables);

  cppClass += getFields("protected", json);
  cppClass += getConstructor("protected", json,variables);
  cppClass += getMethod("protected", json,variables);
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
function getConstructor(visibility, json, variables) {
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
        result += traverse(constructor.children[2],2,json,variables,true)
        result += `    }\n`;
      }
    });
  }
  return result;
}
function getMethod(visibility, json,variables) {
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
            //debugger
            result += traverse(method.children[2],2,json,variables,true)
            result += `\n   }\n`;
          }
    });
  }
  return result;
}

function traverse(obj,level,classObject,variables,addSemicolon,adder) {
  let result = "";
  //debugger
  let i=0;
  obj?.forEach((element)=>{
    switch(element?.type){
      case returnBlock:
        result+= generateTabs(level)+"return"
        result+= traverse(element.children[0],level+1,classObject,variables)
        result+= ";\n"
      break
      case ifElseBlock:
        result+= generateTabs(level)+"if("
        result+= traverse(element.children[0],0,classObject,variables)
        result+= "){\n"
        result+= traverse(element.children[1],level+1,classObject,variables,true)
        result+= "\n"+generateTabs(level)+"}else{\n"
        result+= traverse(element.children[2],level+1,classObject,variables,true)
        result+= "\n"+generateTabs(level)+"}\n"
      break
      case operatorsBlocks:
        result+= generateTabs(level)+traverse(element.children[0],0,classObject,variables)+element.operator+traverse(element.children[1],0,classObject,variables,addSemicolon);
        break;
      case classVariableBlock:
        const splitElement = element.id.split("|");
        result+= generateTabs(level)
        //zmienna jest polem klasy
        let objectVal = classObject.fields?.find(el=>el.id === splitElement[1]);
        //zmienna jest zmienną lokalną metod
        if(objectVal===undefined) objectVal = variables?.find(el=>el.id === splitElement[1])
        //zmienna jest parametrem metody
        if(objectVal===undefined) objectVal = classObject.methods.find(me=>me.id===splitElement[3])?.children[1]?.find(el=>el.id === splitElement[1])
        result+= " "+objectVal?.name
        result+= addSemicolon?";\n":""
        break;
      case forBlock:
        result+= generateTabs(level)+"for("+traverse(element.children[0],0,classObject,variables)+";"+traverse(element.children[1],0,classObject,variables)+";"+traverse(element.children[2],0,classObject,variables)+"){\n"+
        traverse(element.children[3],level+1,classObject,variables,true)+
        "\n"+generateTabs(level)+"}\n"
        break;
      case valueBlock:
        result+= element.valueType==="text"?`"`:"";
        result+= generateTabs(level)+element.value
        result+= element.valueType==="text"?`" `:"";
        result+= addSemicolon?";\n":""
        break;
      case variableDeclarationBlock:
        result+= traverse(element.children[0],level,classObject,variables)+" "+element.name;
        result+= addSemicolon?";\n":""
        break;
      case variableTypesBlock:
        result+= generateTabs(level)+element.name;
        break;
      case consoleLogBlock:
        result+= generateTabs(level);
        result+= "std::cout << "+ traverse(element.children[0],0,classObject,variables,false,"<<")+"<< std::endl";
        result+= addSemicolon?";\n":""
        break;
      case whileBlock:
        result+= generateTabs(level)+"while("+traverse(element.children[0],0,classObject,variables)+"){\n"+traverse(element.children[1],level+1,classObject,variables,true)+generateTabs(level)+"}\n"
        break;
      case dowhileBlock:
        result+= generateTabs(level)+"do{\n"+traverse(element.children[0],level+1,classObject,variables,true)+"\n"+generateTabs(level)+"}while("+traverse(element.children[1],0,classObject,variables)+");\n"
        break;
      case classDefinitionBlock:
        debugger
        result+="klasa"
        break
      default:
        result += "undefined";
        result+= addSemicolon?";\n":""
    }
    i++;
    if(adder&&i<obj.length)
      result+= adder;
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