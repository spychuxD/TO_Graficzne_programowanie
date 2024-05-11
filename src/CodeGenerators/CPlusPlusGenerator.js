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
            result += `        // Implementacja metody\n`;
            result += `    }\n`;
          }
    });
  }
  return result;
}
