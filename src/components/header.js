import React, { useState } from "react";

import { MdOutlinePlaylistPlay, MdOutlineNotStarted } from "react-icons/md";
import Button from "@mui/material/Button";

function Header() {
  const [isHoverPython, setIsHoverPython] = useState(false);
  const [isHoverCpp, setIsHoverCpp] = useState(false);
  const [isHoverJavascript, setIsHoverJavascript] = useState(false);
  const [isLanguage, setIsLanguage] = useState("cpp");

  const handleLanguageClick = (language) => {
    setIsLanguage(language);
  };

  const defaultStyle = {
    backgroundColor: "#1565c0",
    margin: 10,
    padding: 5,
    borderRadius: 30
  };

  const hoverStyle = {
    backgroundColor: "#77BEF8",
    margin: 10,
    padding: 10,
    borderRadius: 999
  };

  const pickedStyle = {
    backgroundColor: "#1976d2",
    margin: 10,
    padding: 10,
    borderRadius: 999
  }
  
  return (
    <header className="App-header">
      <Button
        variant="text"
        style={
          isLanguage === "python"
            ? pickedStyle
            : isHoverPython
            ? hoverStyle
            : defaultStyle
        }
        onClick={() => handleLanguageClick("python")}
        onMouseEnter={() => setIsHoverPython(true)}
        onMouseLeave={() => setIsHoverPython(false)}
      >
        <img
          src={`${process.env.PUBLIC_URL}/logo_python.png`}
          alt="Logo Python"
          className="App-logo"
        />
      </Button>
      <Button
        variant="text"
        style={
          isLanguage === "cpp"
            ? pickedStyle
            : isHoverCpp
            ? hoverStyle
            : defaultStyle
        }
        onClick={() => handleLanguageClick("cpp")}
        onMouseEnter={() => setIsHoverCpp(true)}
        onMouseLeave={() => setIsHoverCpp(false)}
      >
        <img
          src={`${process.env.PUBLIC_URL}/logo_cpp.png`}
          alt="Logo Cpp"
          className="App-logo"
        />
      </Button>
      <Button
        variant="text"
        style={
          isLanguage === "javascript"
            ? pickedStyle
            : isHoverJavascript
            ? hoverStyle
            : defaultStyle
        }
        onClick={() => handleLanguageClick("javascript")}
        onMouseEnter={() => setIsHoverJavascript(true)}
        onMouseLeave={() => setIsHoverJavascript(false)}
      >
        <img
          src={`${process.env.PUBLIC_URL}/logo_javascript.png`}
          alt="Logo JavaScript"
          className="App-logo"
        />
      </Button>
      <div style={{ position: "fixed", right: "50px" }}>
        <Button
          startIcon={<MdOutlinePlaylistPlay />}
        >
          <span className="text-bold">KOMPILUJ</span>
        </Button>
        <Button
          startIcon={<MdOutlineNotStarted />}
        >
          <span className="text-bold">GENERUJ</span>
        </Button>
      </div>
    </header>
  );
}

export default Header;
