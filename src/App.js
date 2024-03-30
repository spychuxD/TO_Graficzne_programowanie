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
  const [stores, setStores] = useState(DATA);
  const [tabs, setTabs] = useState(["Sekcja"]);
  const handleAddClass = () => {
    setTabs((currentTabs) => [...currentTabs, "Klasa"]);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="max-h-vh w-20">
          <SectionLeft setStores={setStores} stores={stores}></SectionLeft>
        </div>
        <div className="max-h-vh w-full">
          <header className="App-header">
            <Header tabs={tabs} setTabs={setTabs} onAddClass={handleAddClass} />
          </header>
          <main className="main-content">
            <SectionMid
              setStores={setStores}
              stores={stores}
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

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "start",
    type: beginBlock,
    items: [],
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "for",
    type: forBlock,
    items: [{ id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" }],
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46277",
    name: "for",
    type: forBlock,
    items: [{ id: "960cbbcf-89a0-4d79-aa8e-56abbc15eact", name: "Workbench" }],
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "end",
    type: endBlock,
    items: [],
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7cd",
    name: ArithmeticOperations.addition,
    type: arithmeticBlocks,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f53101e7ce",
    name: "ifElse",
    type: ifElseBlock,
    condition: [
      {
        id: "25daffdc-aae0-4673-bw31-43f73101e7cd",
        name: ArithmeticOperations.subtraction,
        type: arithmeticBlocks,
      },
    ],
    items: [
      {
        id: "25dafgdc-aat0-4d73-bw31-43f73101e7cd",
        name: ArithmeticOperations.addition,
        type: arithmeticBlocks,
      },
      {
        id: "25dafgdc-a4t0-4d73-bw31-43f73101e7cd",
        name: ArithmeticOperations.subtraction,
        type: arithmeticBlocks,
      },
      {
        id: "25dafgdc-aa50-4d73-bw31-43f73101e7cd",
        name: ArithmeticOperations.modulo,
        type: arithmeticBlocks,
      },
    ],
    elseItems: [
      {
        id: "487f68b4-1746-431c-920e-d67h7df46247",
        name: "for",
        type: forBlock,
        items: [
          { id: "960cbbcf-89a0-4d73-aa8e-56abbc15eacc", name: "Workbench" },
        ],
      },
    ],
  },
  {
    id: "25daffdc-aae0-4d73-bd41-43f53101e7ce",
    name: "ifElse",
    type: ifElseBlock,
    condition: [
      {
        id: "25daffdc-aae0-4675-bw31-43f73101e7cd",
        name: ArithmeticOperations.subtraction,
        type: arithmeticBlocks,
      },
    ],
    items: [
      // {
      //   id: "25daffdc-aae0-4d73-bg31-43f73101c7cd",
      //   name: ArithmeticOperations.addition,
      //   type: arithmeticBlocks,
      // },
      {
        id: "487f68b4-1746-438c-920e-d67h7df46247",
        name: "for",
        type: forBlock,
        items: [
          { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
        ],
      },
    ],
    elseItems: [],
  },
  // {
  //   id: "25dadfdc-aae0-4d73-bd41-43f53101e7ce",
  //   name: "ifElse",
  //   type: ifElseBlock,
  //   condition: [],
  //   items: [
  //     {
  //       id: "25daffdd-aae0-4d73-bw31-43f73101c7cd",
  //       name: ArithmeticOperations.addition,
  //       type: arithmeticBlocks,
  //     },
  //   ],
  // },
];
