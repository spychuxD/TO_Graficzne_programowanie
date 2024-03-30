import React, { useState } from "react";

import {
  MdOutlinePlaylistPlay,
  MdOutlineNotStarted,
  MdKeyboardDoubleArrowRight,
  MdOutlineControlPoint,
} from "react-icons/md";
import Button from "@mui/material/Button";

function Header({ tabs, setTabs, onAddClass }) {
  const [isHoverPython, setIsHoverPython] = useState(false);
  const [isHoverCpp, setIsHoverCpp] = useState(false);
  const [isHoverJavascript, setIsHoverJavascript] = useState(false);
  const [isLanguage, setIsLanguage] = useState("cpp");
  const handleLanguageClick = (language) => {
    setIsLanguage(language);
  };
  return (
    <header className="App-header">
      <div className="flex-row justify-center align-center p-8">
        <div style={{position: 'fixed', right: 20}}>
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
              variant={isLanguage === "javascript" ? "contained" : "outlined"}
              onClick={() => handleLanguageClick("javascript")}
            >
              <img
                src={
                  isLanguage === "javascript"
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
