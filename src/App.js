import React, { useState } from "react";

import "./App.css";
import { FaCog } from "react-icons/fa";

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
  const [isLanguage, setIsLanguage] = useState('cpp');

  const defaultStyle = {
    backgroundColor: "transparent",
    color: "#fff",
    margin: '10px'
  };

  const hoverStyle = {
    backgroundColor: "#ffffff80", // Ciemniejszy odcień dla efektu hover
    color: "#fff",
    margin: '10px'
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
          style={isLanguage === 'python' ? hoverStyle :  isHoverPython ? hoverStyle : defaultStyle}
          onClick={() => handleLanguageClick('python')}
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
          style={isLanguage === 'cpp' ? hoverStyle : isHoverCpp ? hoverStyle : defaultStyle}
          onClick={() => handleLanguageClick('cpp')}
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
          style={isLanguage === 'javascript' ? hoverStyle : isHoverJavascript ? hoverStyle : defaultStyle}
          onClick={() => handleLanguageClick('javascript')}
          onMouseEnter={() => setIsHoverJavascript(true)}
          onMouseLeave={() => setIsHoverJavascript(false)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/logo_javascript.png`}
            alt="Logo JavaScript"
            className="App-logo"
          />
        </Button>
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
            startIcon={<FaCog className="settings-icon" />}
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
