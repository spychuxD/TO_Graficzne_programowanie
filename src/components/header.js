import React, { useState } from "react";

import {
  MdOutlinePlaylistPlay,
  MdOutlineNotStarted,
  MdKeyboardDoubleArrowRight,
  MdOutlineControlPoint,
} from "react-icons/md";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../redux/slices/LanguageSettings";
import { saveResut, sendRequest } from "../redux/slices/Compiler";
import { generateAllCppFromJson, generateCppClassFromJson } from "../CodeGenerators/CPlusPlusGenerator";

function Header({ tabs, setTabs, onAddClass }) {
  const dispatch = useDispatch();

  const [isHoverPython, setIsHoverPython] = useState(false);
  const [isHoverCpp, setIsHoverCpp] = useState(false);
  const [isHoverJavascript, setIsHoverJavascript] = useState(false);

  const allClasses = useSelector(state=>state.classes.classes)
  const isLanguage = useSelector((state) => state.languageSettings.isLanguage);
  const variables = useSelector(state=>state.classes.variables);
  const pageIndex = useSelector((state) => state.blocksTabs.index);
  const jsonStructure = useSelector((state) => {
      return state.classes.classes[pageIndex];
  });

  const handleLanguageClick = (language) => {
    dispatch(changeLanguage(language));
  };

  const onClickCompile = async() =>{
    debugger
    const code = generateAllCppFromJson(allClasses,variables);
    const result = await sendRequest(isLanguage,code)
    dispatch(saveResut({result:result}))
  }
  return (
    <header className="App-header">
      <div className="flex-row justify-center align-center p-8">
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
              onClick={()=>{onClickCompile()}}
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
