import React, { useState } from "react"; //useRef
import "./App.css";

import Header from "./components/header";
import Footer from "./components/footer";
import SectionLeft from "./components/sectionLeft";
import SectionMid from "./components/sectionMid";

import { ArithmeticOperations } from "./blocks/ArithmeticBlocks/ArithmeticOperations";
import {
  arithmeticBlocks,
  beginBlock,
  endBlock,
  forBlock,
  ifElseBlock,
} from "./blockTypes";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#e3eef2", // Przykładowy niebieski
    },
    secondary: {
      main: "#2C5364", // Przykładowy zielony
    },
    // Możesz także dodać inne kolory, np. error, warning, info, success
  },
});

function App() {
  const [tabs, setTabs] = useState(["Sekcja"]);
  const handleAddClass = () => {
    setTabs((currentTabs) => [...currentTabs, "Klasa"]);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="max-h-vh w-20">
          <SectionLeft ></SectionLeft>
        </div>
        <div className="max-h-vh w-full">
          <header className="App-header">
            <Header tabs={tabs} setTabs={setTabs} onAddClass={handleAddClass} />
          </header>
          <main className="main-content">
            <SectionMid
              tabs={tabs}
              setTabs={setTabs}
            ></SectionMid>
            <div className="sectionRight"></div>
          </main>
        </div>
      </div>
      {/* <Footer/> */}
    </ThemeProvider>
  );
}

export default App;

