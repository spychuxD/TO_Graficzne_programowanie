import { useSelector } from "react-redux";
import { classDefinitionBlock, classFieldBlock, classMethodBlock, classVariableBlock, consoleLogBlock, dowhileBlock, forBlock, ifElseBlock, operatorsBlocks, returnBlock, valueBlock, variableDeclarationBlock, variableTypesBlock, whileBlock } from "../blockTypes";

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

export function generateCppClassFromJson(json,page) {

  let cppClass = "#include <iostream>\n";
  if(page===0)
  {
    cppClass += "int main(int argc, char *argv[]){\n"
    cppClass += traverse(json,json.classes[page].methods[0].children[2],json.classes[page],2,true,"")
    cppClass += "}"
    return cppClass;
  }

  cppClass = `class ${json.classes[page].name.replace(/ /g, "_")} {\n`;

  cppClass += getFields("private", json.classes[page]);
  cppClass += getConstructor("private", json.classes[page],json.variables);
  //cppClass += getMethod("private", json.classes[page],json.variables);
  cppClass += getMethod("private", json,page);

  cppClass += getFields("public", json.classes[page]);
  cppClass += getConstructor("public", json.classes[page],json.variables);
  cppClass += getMethod("public", json,page);

  cppClass += getFields("protected", json.classes[page]);
  cppClass += getConstructor("protected", json,json.variables);
  cppClass += getMethod("protected", json,page);
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
function getMethod(visibility, json,page) {
  const classObject = json.classes[page];

    let result = "";
  if (classObject.methods && classObject.methods.length > 0) {
    classObject.methods.forEach((method) => {
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
           // result += traverse(method.children[2],2,json,variables,true)
            result += traverse(json,method.children[2],classObject,2,true,"")
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

function traverse(json,obj,classObject,level,addSemicolon,adder) { 
  let result = "";
  debugger
  let i=0;
  obj?.forEach((element)=>{
    switch(element?.type){
      case returnBlock:
        result+= generateTabs(level)+"return"
        //result+= traverse(element.children[0],level+1,classObject,variables)
        result+= traverse(json,element.children[0],classObject,level+1,true,"")+";";
      break
      case ifElseBlock:
        result+= generateTabs(level)+"if("
        result+= traverse(json,element.children[0],classObject,0,false,"");
        result+= "){\n"
        result+= traverse(json,element.children[1],classObject,level+1,true,"")
        result+= "\n"+generateTabs(level)+"}else{\n"
        result+= traverse(json,element.children[2],classObject,level+1,true,"")
        result+= "\n"+generateTabs(level)+"}\n"
      break
      case operatorsBlocks:
        result+= generateTabs(level);
        result+= traverse(json,element.children[0],classObject,0,false,"");
        result+= element.operator;
        result+= traverse(json,element.children[1],classObject,0,addSemicolon,"");
        break;
      case classVariableBlock:
        const splitElement = element.id.split("|");
        result+= generateTabs(level)
        //zmienna jest polem klasy
        let objectVal = classObject.fields?.find(el=>el.id === splitElement[1]);
        //zmienna jest zmienną lokalną metod
        if(objectVal===undefined) objectVal = json.variables?.find(el=>el.id === splitElement[1])
        //zmienna jest parametrem metody
        if(objectVal===undefined) objectVal = classObject.methods.find(me=>me.id===splitElement[3])?.children[1]?.find(el=>el.id === splitElement[1])
        result+= " "+objectVal?.name
        result+= addSemicolon?";\n":""
        break; 
      case forBlock:
        result+= generateTabs(level)
        result+= "for("
        result+= traverse(json,element.children[0],classObject,0,false,"")+";"
        result+= traverse(json,element.children[1],classObject,0,false,"")+";"
        result+= traverse(json,element.children[2],classObject,0,false,"")+"){\n"
        result+= traverse(json,element.children[3],classObject,level+1,true,"")
        result+= "\n"+generateTabs(level)+"}\n"
        break;
      case valueBlock:
        result+= element.valueType==="text"?`"`:"";
        result+= generateTabs(level)+element.value
        result+= element.valueType==="text"?`" `:"";
        result+= addSemicolon?";\n":""
        break;
      case variableDeclarationBlock:
        result+= generateTabs(level);
        result+= traverse(json,element.children[0],classObject,level,false,"")+" "+element.name;
        if(element.children[1].length>0)
          {
            result+="("+traverse(json,element.children[1],classObject,0,false,",")+")"
          }
        result+= addSemicolon?";\n":""
        break;
      case variableTypesBlock:
        result+= generateTabs(level)+element.name;
        break;
      case consoleLogBlock:
        result+= generateTabs(level);
        result+= "std::cout << "+ traverse(json,element.children[0],classObject,0,false,"<<")+"<< std::endl";
        result+= addSemicolon?";\n":""
        break;
      case whileBlock:
        result+= generateTabs(level)
        result+= "while("
        result+= traverse(json,element.children[0],classObject,0,false,"")
        result+= "){\n"
        result+= traverse(json,element.children[1],classObject,level+1,true,"")
        result+= generateTabs(level)+"}\n"
        break;
      case dowhileBlock:
        result+= generateTabs(level)
        result+= "do{\n"
        result+= traverse(json,element.children[0],classObject,level+1,true,"")
        result+= "\n"+generateTabs(level)
        result+= "}while("
        result+= traverse(json,element.children[1],classObject,0,false,"")+");\n"
        break;
      case classDefinitionBlock:
        result+=json.classes.find(el=>el.id === element.classId)?.name;
        break
      case classMethodBlock:
        const findedClass = json.classes.find(el=>el.id === element.classId);
        const findedMethod = findedClass?.methods.find(el=>el.id === element.methodId);
        result+= generateTabs(level)
        result+= traverse(json,element.children[0],classObject,0,false,"")+"."
        result+= findedMethod.name+"("
        result+= traverse(json,element.children[1],classObject,0,false,"")+")"
        result+= addSemicolon?";\n":""
        break
      case classFieldBlock:
        const findedClassForField = json.classes.find(el=>el.id === element.classId);
        const findedMethodForField = findedClassForField?.fields.find(el=>el.id === element.fieldId);
        result+= generateTabs(level)
        result+= traverse(json,element.children[0],classObject,0,false,"")+"."
        result+= findedMethodForField?.name
        result+= addSemicolon?";\n":""
        break;
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