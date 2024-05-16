import { useSelector } from "react-redux";
import { CopyBlock, dracula } from "react-code-blocks";
import { generateCppClassFromJson } from "../CodeGenerators/CPlusPlusGenerator";
import { generateJavaScriptFromJson } from "../CodeGenerators/JavaScriptGenerator";
export default function SectionRight(props) {
  const isLanguage = useSelector((state) => state.languageSettings.isLanguage);
  const variables = useSelector(state=>state.classes.variables);
  const pageIndex = useSelector((state) => state.blocksTabs.index);
  const jsonStructure = useSelector((state) => {

      return state.classes.classes[pageIndex];

  });
  return (
    <div style={{ overflowX: "auto" }}>
      <CopyBlock
        language={isLanguage}
        text={
              isLanguage === "cpp"
            ? generateCppClassFromJson(jsonStructure,variables,pageIndex)
            : isLanguage === "js"
            ? generateJavaScriptFromJson(jsonStructure)
            : //: isLanguage === "python"
              //? generatePythonFromJson(jsonStructure)
              JSON.stringify(jsonStructure)
        }
        //codeBlock={true}
        theme={dracula}
        showLineNumbers={false}
      />
    </div>
  );
}
