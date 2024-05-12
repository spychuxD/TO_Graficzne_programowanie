import { useSelector } from "react-redux";
import { CopyBlock, dracula } from "react-code-blocks";
import { generateCppClassFromJson } from "../CodeGenerators/CPlusPlusGenerator";
import { generateJavaScriptFromJson } from "../CodeGenerators/JavaScriptGenerator";
export default function SectionRight(props) {
  const isLanguage = useSelector((state) => state.languageSettings.isLanguage);

  const pageIndex = useSelector((state) => state.blocksTabs.index);
  const jsonStructure = useSelector((state) => {
    if (pageIndex === 0) {
      return state.codeStructure.elements;
    } else {
      return state.classes.classes[pageIndex - 1];
    }
  });
  return (
    <div style={{ overflowX: "auto" }}>
      <CopyBlock
        language={isLanguage}
        text={
          pageIndex !== 0 && isLanguage === "cpp"
            ? generateCppClassFromJson(jsonStructure)
            : pageIndex !== 0 && isLanguage === "js"
            ? generateJavaScriptFromJson(jsonStructure)
            : //: pageIndex !== 0 && isLanguage === "python"
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
