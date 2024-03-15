import React, { useState } from "react";

import "./App.css";
import { FaCog } from "react-icons/fa";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { MdOutlineNotStarted } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function App() {
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isHoverPython, setIsHoverPython] = useState(false);
  const [isHoverCpp, setIsHoverCpp] = useState(false);
  const [isHoverJavascript, setIsHoverJavascript] = useState(false);
  const [isHoverCompilation, setIsHoverCompilation] = useState(false);
  const [isHoverStart, setIsHoverStart] = useState(false);
  const [isLanguage, setIsLanguage] = useState("cpp");

  const defaultStyle = {
    backgroundColor: "transparent",
    color: "#fff",
    margin: "10px",
  };

  const hoverStyle = {
    backgroundColor: "#ffffff80",
    color: "#fff",
    margin: "10px",
  };

  const rightStyle = {
    backgroundColor: "transparent",
    color: "#fff",
    margin: "10px",
  };

  const hoverRightStyle = {
    backgroundColor: "#ffffff80",
    color: "#fff",
    margin: "10px",
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLanguageClick = (language) => {
    setIsLanguage(language);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button
          variant="text"
          style={
            isLanguage === "python"
              ? hoverStyle
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
              ? hoverStyle
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
              ? hoverStyle
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
        <div  style={{ position: "fixed", right: "0px" }}>
          <Button
            style={isHoverCompilation ? hoverRightStyle : rightStyle}
            onMouseEnter={() => setIsHoverCompilation(true)}
            onMouseLeave={() => setIsHoverCompilation(false)}
            startIcon={<MdOutlinePlaylistPlay />}
          >
            <span className="text-bold">KOMPILUJ</span>
          </Button>
          <Button
            style={isHoverStart ? hoverRightStyle : rightStyle}
            onMouseEnter={() => setIsHoverStart(true)}
            onMouseLeave={() => setIsHoverStart(false)}
            startIcon={<MdOutlineNotStarted />}
          >
            <span className="text-bold">GENERUJ</span>
          </Button>
        </div>
      </header>
      <main className="main-content">
        <div className="sectionTight">Sekcja 1</div>
        <div className="sectionWide">Sekcja 2</div>
        <div className="sectionTight">Sekcja 3</div>
      </main>
      <footer className="footer">
        <div>
          <Button
            variant="text"
            onClick={handleClickOpen}
            style={isHover ? hoverStyle : defaultStyle}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            startIcon={<FaCog/>}
          >
            <span className="text-bold">USTAWIENIA</span>
          </Button>
        </div>
        <div className="text-center text-bold">
          © 2024 Gajda, Gardian i Spychalski
        </div>
      </footer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Ustawienia"}</DialogTitle>
        <DialogContent>
          {/* Tutaj możesz dodać różne opcje ustawień */}
          <div>Tutaj znajdą się ustawienia...</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button onClick={handleClose}>Zapisz</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
