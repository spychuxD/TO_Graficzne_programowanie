import { useSelector } from "react-redux";
import { CopyBlock, dracula } from "react-code-blocks";
import { generateCppClassFromJson } from "../CodeGenerators/CPlusPlusGenerator";
export default function SectionRight(props) {
  const pageIndex = useSelector((state) => state.blocksTabs.index);
  const jsonStructure = useSelector((state) => {
    if (pageIndex === 0) {
      return state.codeStructure.elements;
    } else {
      return state.classes.classes[pageIndex - 1];
    }
  });
  return (
    <div>
      <CopyBlock
        language="cpp"
        text={
          pageIndex === 0
            ? JSON.stringify(jsonStructure)
            : generateCppClassFromJson(jsonStructure)
        }
        codeBlock
        theme={dracula}
        showLineNumbers={false}
      />
    </div>
  );
}
