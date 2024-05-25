import { useSelector } from "react-redux";
import { CopyBlock, dracula } from "react-code-blocks";
import { generateCppClassFromJson } from "../CodeGenerators/CPlusPlusGenerator";
import { generateJavaScriptFromJson } from "../CodeGenerators/JavaScriptGenerator";
export default function SectionRight(props) {
  const isLanguage = useSelector((state) => state.languageSettings.isLanguage);
  const variables = useSelector(state=>state.classes.variables);
  const pageIndex = useSelector((state) => state.blocksTabs.index);
  const jsonStructure = useSelector((state) => {

      return state.classes;

  });
  const compileResult = useSelector(state=>state.compiler.compileResult)
  return (
    <div style={{ overflowX: "auto" }}>
      <CopyBlock
        language={isLanguage}
        text={
              isLanguage === "cpp"
            ? generateCppClassFromJson(jsonStructure,pageIndex)
            : //isLanguage === "js"
            //? //generateJavaScriptFromJson(jsonStructure)
            //: //: isLanguage === "python"
              //? generatePythonFromJson(jsonStructure)
              JSON.stringify(jsonStructure)
        }
        //codeBlock={true}
        theme={dracula}
        showLineNumbers={false}
      />
      Wynik z konsoli: {compileResult.output}<br/>
      Użyta pamięć: {compileResult.memory}<br/>
      Czas CPU: {compileResult.cpuTime}
    </div>
  );
}
