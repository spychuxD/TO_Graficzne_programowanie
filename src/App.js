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
import {
  addClass,
  deleteClassElement,
  inserElementToClass,
} from "./redux/slices/Classes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { addTab } from "./redux/slices/BlocksTabs";
import JavaScriptGenerator from "./CodeGenerators/JavaScriptGenerator";
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
  const codeTabs = useSelector((state) => state.blocksTabs.tabs);
  //const [tabs, setTabs] = useState([{ name: "Sekcja", id: 1 }]);
  /*const tabState = useSelector(state=>{
    const classesArray = state.classes.classes;
    const tmpArray = [];
    for(let i=1;i<classesArray.length;i++)
    {
      tmpArray.push({name:"Sekcja",id:classesArray[i].id})
    }
    if(tmp)
    setTabs(tmpArray)
    return classesArray
  })*/
  const handleAddClass = () => {
    const newId = uuidv4();
    console.log(newId);
    dispatch(addClass({ id: newId }));
    //setTabs((currentTabs) => [...currentTabs, { name: "Klasa", id: newId }]);
    dispatch(addTab({ tab: { name: "Klasa", id: newId } }));
  };
  function handleDragEnd(event) {
    debugger;
    if (event.over) {
      const { active, over } = event;
      if (over.id === "deleteId") {
        dispatch(deleteClassElement({ id: active.id }));
        return;
      }
      const idAndType = over.id.split("|");

      if (idAndType.length === 2) {
        switch (idAndType[1]) {
          case "order":
            break;
          default:
            if (codeTabs[tabIndex].id !== null) {
              dispatch(
                inserElementToClass({
                  object: active.id,
                  to: over.id,
                  classId: codeTabs[tabIndex].id,
                })
              );
            }
            break;
        }
      } else {
        if (codeTabs[tabIndex].id !== null) {
          dispatch(
            inserElementToClass({
              object: active.id,
              to: over.id,
              classId: codeTabs[tabIndex].id,
            })
          );
        }
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
              <JavaScriptGenerator>
                {(generateJSFromJson) => (
                  <Header
                    tabs={codeTabs}
                    //setTabs={setTabs}
                    onAddClass={handleAddClass}
                    generateJSFromJson={generateJSFromJson}
                  />
                )}
              </JavaScriptGenerator>
            </header>
            <main className="main-content">
              <SectionMid tabs={codeTabs} /*setTabs={setTabs}*/></SectionMid>
              <div className="sectionRight">
                <JavaScriptGenerator>
                  {(generateJSFromJson, generateJSClassFromJson) => (
                    <SectionRight
                      generateJSClassFromJson={generateJSClassFromJson}
                    />
                  )}
                </JavaScriptGenerator>
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
