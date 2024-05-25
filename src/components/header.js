import React, { useRef, useState } from "react";

import {
  MdOutlinePlaylistPlay,
  MdOutlineNotStarted,
  MdKeyboardDoubleArrowRight,
  MdOutlineControlPoint,
  MdFileDownload,
  MdFileUpload,
} from "react-icons/md";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLanguage,
  setLanguageSlice,
} from "../redux/slices/LanguageSettings";
import { saveResut, sendRequest, setCompiler } from "../redux/slices/Compiler";
import {
  generateAllCppFromJson,
  generateCppClassFromJson,
} from "../CodeGenerators/CPlusPlusGenerator";
import { resetTabSlice, setTabSlice } from "../redux/slices/BlocksTabs";
import { resetClassSlices, setClassSlice } from "../redux/slices/Classes";
import { setDraggSlice } from "../redux/slices/DraggableSettings";
import { generateJSFromJson } from "../CodeGenerators/JavaScriptGenerator";
function Header({ tabs, setTabs, onAddClass }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isHoverPython, setIsHoverPython] = useState(false);
  const [isHoverCpp, setIsHoverCpp] = useState(false);
  const [isHoverJavascript, setIsHoverJavascript] = useState(false);

  const codeStructure = useSelector((state) => state.classes);
  const isLanguage = useSelector((state) => state.languageSettings.isLanguage);
  const variables = useSelector((state) => state.classes.variables);
  const pageIndex = useSelector((state) => state.blocksTabs.index);
  const jsonStructure = useSelector((state) => {
    return state.classes.classes[pageIndex];
  });
  const appState = useSelector((state) => state);

  const handleLanguageClick = (language) => {
    const confirmed = window.confirm(
      "Czy zmienić język programowania? Spowoduje to usunięcie postępu"
    );
    if (confirmed) {
      dispatch(resetClassSlices());
      dispatch(resetTabSlice());
      dispatch(changeLanguage(language));
    }
  };

  const onClickCompile = async () => {
    let code;
    if (isLanguage === "cpp") code = generateAllCppFromJson(codeStructure);
    else if (isLanguage === "js") code = generateJSFromJson(codeStructure);
    console.log(code);
    //debugger;
    const result = await sendRequest(
      isLanguage === "js" ? "node" + isLanguage : isLanguage,
      code,
      isLanguage === "js" ? "4" : isLanguage === "cpp" ? "0" : ""
    );
    dispatch(saveResut({ result: result }));
  };
  const onSave = async () => {
    const jsonString = JSON.stringify(appState);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const onLoad = async () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    debugger;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          //setData(json);
          console.log(json);
          dispatch(setTabSlice({ data: json.blocksTabs }));
          dispatch(setClassSlice({ data: json.classes }));
          dispatch(setCompiler({ data: json.compiler }));
          dispatch(setDraggSlice({ data: json.draggableSettings }));
          dispatch(setLanguageSlice({ data: json.languageSettings }));
          debugger;
        } catch (error) {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };
  return (
    <header className="App-header">
      <div className="flex-row justify-center align-center p-8">
        <div className="lang">
          <div className="mr-8">
            <Button
              variant="outlined"
              startIcon={<MdFileDownload />}
              onClick={() => {
                onSave();
              }}
            >
              <span>Zapisz</span>
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                onLoad();
              }}
              variant="outlined"
              startIcon={<MdFileUpload />}
            >
              <span>Wczytaj</span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </div>
        </div>
        <div style={{ position: "fixed", right: 20 }}>
          <Button
            variant="outlined"
            startIcon={<MdOutlineControlPoint />}
            onClick={onAddClass}
          >
            <span>DODAJ KLASE</span>
          </Button>
        </div>
        <div className="flex-row align-center justify-center mr-8">
          <div className="text-center text-small">WYBIERZ JĘZYK</div>
          <MdKeyboardDoubleArrowRight
            color="#e3eef2"
            className="mr-8"
            size={18}
          ></MdKeyboardDoubleArrowRight>
        </div>
        <div className="flex-row">
          <div className="mr-8">
            <Button
              variant={isLanguage === "python" ? "contained" : "outlined"}
              onClick={() => handleLanguageClick("python")}
            >
              <img
                src={
                  isLanguage === "python"
                    ? `${process.env.PUBLIC_URL}/logo_python_dark.png`
                    : `${process.env.PUBLIC_URL}/logo_python.png`
                }
                alt="Logo Python"
                className="App-logo"
              />
            </Button>
          </div>
          <div className="mr-8">
            <Button
              variant={isLanguage === "cpp" ? "contained" : "outlined"}
              onClick={() => handleLanguageClick("cpp")}
            >
              <img
                src={
                  isLanguage === "cpp"
                    ? `${process.env.PUBLIC_URL}/logo_cpp_dark.png`
                    : `${process.env.PUBLIC_URL}/logo_cpp.png`
                }
                alt="Logo Cpp"
                className="App-logo"
              />
            </Button>
          </div>
          <div className="mr-8">
            <Button
              variant={isLanguage === "js" ? "contained" : "outlined"}
              onClick={() => handleLanguageClick("js")}
            >
              <img
                src={
                  isLanguage === "js"
                    ? `${process.env.PUBLIC_URL}/logo_javascript_dark.png`
                    : `${process.env.PUBLIC_URL}/logo_javascript.png`
                }
                alt="Logo JavaScript"
                className="App-logo"
              />
            </Button>
          </div>
        </div>
        <div className="lang">
          <div className="mr-8">
            <Button
              variant="outlined"
              size="3xl"
              startIcon={<MdOutlinePlaylistPlay />}
              onClick={() => {
                onClickCompile();
              }}
            >
              <span>KOMPILUJ</span>
            </Button>
          </div>
          <div>
            <Button variant="outlined" startIcon={<MdOutlineNotStarted />}>
              <span>GENERUJ</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
