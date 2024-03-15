import React, { useState,useRef } from "react";

import "./App.css";
import { FaCog } from "react-icons/fa";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const $ = go.GraphObject.make;
const diagram = $(go.Diagram,
{
    'undoManager.isEnabled': true,
    'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
    model: new go.GraphLinksModel(
      {
        linkKeyProperty: 'key'
      })
});

function initDiagram() {
  

  diagram.nodeTemplate =
    $(go.Node, 'Auto', 
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'RoundedRectangle',
        { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8, editable: true },
        new go.Binding('text').makeTwoWay(),
        
      ),
      {
        contextMenu:     // define a context menu for each node
        $("ContextMenu",  // that has one button
          $("ContextMenuButton",
            {
              "ButtonBorder.fill": "white",
              "_buttonFillOver": "skyblue"
            },
            $(go.TextBlock, "Usuń"),
            { click: test})
          // more ContextMenuButtons would go here
        ) 
      }
    );

  return diagram;
}

function test(e, obj){

  var node = obj.part;

  if(node !== null)
  {
    diagram.startTransaction()
    diagram.remove(node)
    diagram.requestUpdate()
    diagram.commitTransaction("delete node")
    
  }
}
function initPalette() {
  const $ = go.GraphObject.make;

  const palette = $(go.Palette);

  // Define the template for the palette items
  palette.nodeTemplate =
    $(go.Node, 'Auto',
      $(go.Shape, 'RoundedRectangle',
        { fill: 'white', strokeWidth: 0 },
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8 },
        new go.Binding('text', 'text'))
    );

  // Set the node data array for the palette
  palette.model.nodeDataArray = [
    { key: 'Group1', text: 'Group 1', isGroup: true, category: 'Group', color: 'lightgray' },
    { key: 'Node1', text: 'Node 1', group: 'Group1', color: 'lightblue' },
    { key: 'Node2', text: 'Node 2', group: 'Group1', color: 'orange' },
    { key: 'Group2', text: 'Group 2', isGroup: true, category: 'Group', color: 'lightgray' },
    { key: 'Node3', text: 'Node 3', group: 'Group2', color: 'lightgreen' },
    { key: 'Node4', text: 'Node 4', group: 'Group2', color: 'pink' }
  ];

  return palette;
}



function App() {
  const diagramRef = useRef(null);

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
        <div className="sectionTight">
          <ReactPalette
          initPalette={initPalette}
          divClassName='diagram-component'
          />
        </div>
        <div className="sectionWide">
          <ReactDiagram
          ref={diagramRef}
          initDiagram={()=>initDiagram(diagramRef)}
          divClassName='diagram-component'
          nodeDataArray={[
            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
            { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
            { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
            { key: 3, text: 'Delta', color: 'pink', loc: '150 150' },
          ]}
          linkDataArray={[
            { key: -1, from: 0, to: 1 },
            { key: -2, from: 0, to: 2 },
            { key: -3, from: 1, to: 1 },
            { key: -4, from: 2, to: 3 },
            { key: -5, from: 3, to: 0 }
          ]}
          />
        </div>
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
