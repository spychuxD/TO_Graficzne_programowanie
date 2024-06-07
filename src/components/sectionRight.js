import { useSelector } from "react-redux";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
export default function SectionRight(props) {
  const isLanguage = useSelector((state) => state.languageSettings.isLanguage);
  const variables = useSelector((state) => state.classes.variables);
  const pageIndex = useSelector((state) => state.blocksTabs.index);
  const jsonStructure = useSelector((state) => {
    return state.classes;
  });
  const compileResult = useSelector((state) => state.compiler.compileResult);

  return (
    <div
      style={{
        overflowX: "auto",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <SyntaxHighlighter
        language={isLanguage === "js" ? "javascript" : isLanguage}
        style={dracula}
        customStyle={{ width: `calc(100% - 20px)`, height: "50%" }}
      >
        {isLanguage === "csharp"
          ? props.generateCSharpClassFromJson(jsonStructure, pageIndex)
          : isLanguage === "js"
          ? props.generateJSClassFromJson(jsonStructure, pageIndex)
          : isLanguage === "python"
          ? props.generatePythonClassFromJson(jsonStructure, pageIndex)
          :  JSON.stringify(jsonStructure)}
      </SyntaxHighlighter>
      <div style={{ marginTop: "auto", height: "50%", overflow: "auto" }}>
        Wynik z konsoli:
        {compileResult?.output?.split("\n").map((line, index) => (
          <div key={index}>
            {line}
            <br />
          </div>
        ))}
        <br />
        Użyta pamięć: {compileResult.memory}
        <br />
        Czas CPU: {compileResult.cpuTime}
      </div>
    </div>
  );
}
