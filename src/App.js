import React, { useState } from "react"; //useRef
import "./App.css";

import Header from "./components/header";
import Footer from "./components/footer";
import SectionLeft from "./components/sectionLeft";
import SectionMid from "./components/sectionMid";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addClass } from "./redux/slices/Classes";

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
  const dispatch = useDispatch();
  const [tabs, setTabs] = useState([{name: "Sekcja",id:null}]);
  const handleAddClass = () => {
    const newId = uuidv4();
    console.log(newId)
    dispatch(addClass({id:newId}));
    setTabs((currentTabs) => [...currentTabs, {name: "Klasa",id:newId}]);
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

