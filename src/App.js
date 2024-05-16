import React, { useState } from "react"; //useRef
import "./App.css";
import { DndContext } from "@dnd-kit/core";
import Header from "./components/header";
import { useSelector } from "react-redux";
import SectionLeft from "./components/sectionLeft";
import SectionMid from "./components/sectionMid";
import SectionRight from "./components/sectionRight";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addClass, inserElementToClass } from "./redux/slices/Classes";
import {
  changeElementOrder,
  deleteElement,
  inserElement,
} from "./redux/slices/CodeStructure";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { snapCenterToCursor } from "@dnd-kit/modifiers";

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
  const tabIndex = useSelector((state) => state.blocksTabs.index);
  const [tabs, setTabs] = useState([{ name: "Sekcja", id: null }]);
  const handleAddClass = () => {
    const newId = uuidv4();
    console.log(newId);
    dispatch(addClass({ id: newId }));
    setTabs((currentTabs) => [...currentTabs, { name: "Klasa", id: newId }]);
  };
  function handleDragEnd(event) {
    if (event.over) {
      const { active, over } = event;
      if (over.id === "deleteId") {
        dispatch(deleteElement({ id: active.id }));
        return;
      }
      const idAndType = over.id.split("|");

      if (idAndType.length === 2) {
        switch (idAndType[1]) {
          case "order":
            dispatch(
              changeElementOrder({ object: active.id, over: idAndType[0] })
            );
            break;
          default:
            if (tabs[tabIndex].id !== null) {
              dispatch(
                inserElementToClass({
                  object: active.id,
                  to: over.id,
                  classId: tabs[tabIndex].id,
                })
              );
            } else dispatch(inserElement({ object: active.id, to: over.id }));
            break;
        }
      } else {
        if (tabs[tabIndex].id !== null) {
          dispatch(
            inserElementToClass({
              object: active.id,
              to: over.id,
              classId: tabs[tabIndex].id,
            })
          );
        } else dispatch(inserElement({ object: active.id, to: over.id }));
      }
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <DndContext onDragEnd={handleDragEnd} modifiers={[snapCenterToCursor]}>
          <div className="display-flex w-20 ">
            <SectionLeft></SectionLeft>
          </div>
          <div className="max-h-vh w-80">
            <header className="App-header">
              <Header
                tabs={tabs}
                setTabs={setTabs}
                onAddClass={handleAddClass}
              />
            </header>
            <main className="main-content">
              <SectionMid tabs={tabs} setTabs={setTabs}></SectionMid>
              <div className="sectionRight">
                <SectionRight />
              </div>
            </main>
          </div>
        </DndContext>
      </div>
      {/* <Footer/> */}
    </ThemeProvider>
  );
}

export default App;
