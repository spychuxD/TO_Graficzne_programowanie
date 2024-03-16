import React, { useState, useRef, useEffect } from "react";

import "./App.css";
import { FaCog } from "react-icons/fa";

import * as go from "gojs";
//import { ReactDiagram, ReactPalette } from 'gojs-react';

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

// function test(e, obj) {
//   var node = obj.part;

//   if (node !== null) {
//     diagram.startTransaction();
//     diagram.remove(node);
//     diagram.requestUpdate();
//     diagram.commitTransaction("delete node");
//   }
// }

function App() {
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isHoverPython, setIsHoverPython] = useState(false);
  const [isHoverCpp, setIsHoverCpp] = useState(false);
  const [isHoverJavascript, setIsHoverJavascript] = useState(false);
  const [isLanguage, setIsLanguage] = useState("cpp");

  const defaultStyle = {
    backgroundColor: "transparent",
    color: "#fff",
    margin: "10px",
  };

  const hoverStyle = {
    backgroundColor: "#ffffff80", // Ciemniejszy odcień dla efektu hover
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

  const diagramRef = useRef(null);
  const palletRef = useRef(null);

  useEffect(() => {
    if (!diagramRef.current) return;
    if (!palletRef.current) return;

    // Inicjalizacja diagramu
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, diagramRef.current, {
      // Konfiguracja interakcji użytkownika
      "draggingTool.dragsLink": true,
      "draggingTool.isGridSnapEnabled": true,
      //"linkingTool.isUnconnectedLinkValid": true,
      "linkingTool.portGravity": 20,
      //"relinkingTool.isUnconnectedLinkValid": true,
      "clickCreatingTool.archetypeNodeData": { text: "Node", color: "white" },
      "commandHandler.archetypeGroupData": {
        text: "Group",
        isGroup: true,
        color: "blue",
      },
      "undoManager.isEnabled": true,

      model: $(go.GraphLinksModel, {
        linkKeyProperty: "key", // Klucz dla połączeń
      }),
    });
    function makeButton(text, action, visiblePredicate) {
      return $(
        "ContextMenuButton",
        $(go.TextBlock, text),
        { click: action },
        // don't bother with binding GraphObject.visible if there's no predicate
        visiblePredicate
          ? new go.Binding("visible", "", (o, e) =>
              o.diagram ? visiblePredicate(o, e) : false
            ).ofObject()
          : {}
      );
    }
    var partContextMenu = $(
      "ContextMenu",
      makeButton(
        "Cut",
        (e, obj) => e.diagram.commandHandler.cutSelection(),
        (o) => o.diagram.commandHandler.canCutSelection()
      ),
      makeButton(
        "Copy",
        (e, obj) => e.diagram.commandHandler.copySelection(),
        (o) => o.diagram.commandHandler.canCopySelection()
      ),
      makeButton(
        "Paste",
        (e, obj) =>
          e.diagram.commandHandler.pasteSelection(
            e.diagram.toolManager.contextMenuTool.mouseDownPoint
          ),
        (o) =>
          o.diagram.commandHandler.canPasteSelection(
            o.diagram.toolManager.contextMenuTool.mouseDownPoint
          )
      ),
      makeButton(
        "Delete",
        (e, obj) => e.diagram.commandHandler.deleteSelection(),
        (o) => o.diagram.commandHandler.canDeleteSelection()
      ),
      makeButton(
        "Undo",
        (e, obj) => e.diagram.commandHandler.undo(),
        (o) => o.diagram.commandHandler.canUndo()
      ),
      makeButton(
        "Redo",
        (e, obj) => e.diagram.commandHandler.redo(),
        (o) => o.diagram.commandHandler.canRedo()
      ),
      makeButton(
        "Group",
        (e, obj) => e.diagram.commandHandler.groupSelection(),
        (o) => o.diagram.commandHandler.canGroupSelection()
      ),
      makeButton(
        "Ungroup",
        (e, obj) => e.diagram.commandHandler.ungroupSelection(),
        (o) => o.diagram.commandHandler.canUngroupSelection()
      )
    );

    diagram.contextMenu = $(
      "ContextMenu",
      makeButton(
        "Paste",
        (e, obj) =>
          e.diagram.commandHandler.pasteSelection(
            e.diagram.toolManager.contextMenuTool.mouseDownPoint
          ),
        (o) =>
          o.diagram.commandHandler.canPasteSelection(
            o.diagram.toolManager.contextMenuTool.mouseDownPoint
          )
      ),
      makeButton(
        "Undo",
        (e, obj) => e.diagram.commandHandler.undo(),
        (o) => o.diagram.commandHandler.canUndo()
      ),
      makeButton(
        "Redo",
        (e, obj) => e.diagram.commandHandler.redo(),
        (o) => o.diagram.commandHandler.canRedo()
      )
    );
    // Utwórz automatyczny układ
    const layout = $(go.LayeredDigraphLayout, {
      direction: 90, // układ pionowy
      layerSpacing: 10, // odstęp między warstwami
    });

    diagram.layout = layout;

    function changeZOrder(amt, obj) {
      diagram.commit((d) => {
        var data = obj.part.data;
        d.model.set(data, "zOrder", amt);
      }, "modified zOrder");
    }
    // Tworzenie bloków
    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      { locationSpot: go.Spot.Center },
      //new go.Binding("layerName", "color"),
      //new go.Binding("location", "loc"),
      new go.Binding("zOrder", "zOrder"),
      { deletable: true },
      $(
        go.Shape,
        "RoundedRectangle",
        {
          fill: "lightgray",
          portId: "",
          cursor: "pointer",
          fromLinkable: true,
          fromLinkableSelfNode: true,
          fromLinkableDuplicates: true,
          toLinkable: true,
          toLinkableSelfNode: true,
          toLinkableDuplicates: true,
        },
        new go.Binding("fill", "color")
      ),
      $(go.TextBlock, { margin: 5 }, new go.Binding("text", "text"), {
        contextMenu: partContextMenu,
      })
    );

    diagram.linkTemplate = $(
      go.Link,
      { toShortLength: 3, relinkableFrom: true, relinkableTo: true },
      $(go.Shape, { strokeWidth: 2 }, new go.Binding("stroke", "color")),
      $(
        go.Shape,
        { toArrow: "Standard", stroke: null },
        new go.Binding("fill", "color")
      ),
      {
        contextMenu: partContextMenu,
      }
    );

    // Słuchacz zdarzenia dla przeciągnięcia
    diagram.addDiagramListener("SelectionMoved", function (e) {
      var node = e.subject.first(); // Pobierz przesunięty wierzchołek
      if (!node) return;

      changeZOrder(-1, node);
      var target = e.diagram.findPartAt(
        e.diagram.lastInput.documentPoint,
        true
      ); // Pobierz element docelowy
      if (!target || !(target instanceof go.Node)) return;

      if (target.key === node.key) {
        return;
      }

      if (target instanceof go.Node) {
        // Utwórz połączenie między blokami
        var link = { from: target.key, to: node.key };
        //console.log(e.diagram.model.sd);

        e.diagram.model.addLinkData(link);
      }
      changeZOrder(1, node);
    });
    diagram.groupTemplate = $(
      go.Group,
      "Vertical",
      {
        selectionObjectName: "PANEL", // selection handle goes around shape, not label
        ungroupable: true, // enable Ctrl-Shift-G to ungroup a selected Group
      },
      $(
        go.TextBlock,
        {
          //alignment: go.Spot.Right,
          font: "bold 19px sans-serif",
          isMultiline: false, // don't allow newlines in text
          editable: true, // allow in-place editing by user
        },
        new go.Binding("text", "text").makeTwoWay(),
        new go.Binding("stroke", "color")
      ),
      $(
        go.Panel,
        "Auto",
        { name: "PANEL" },
        $(
          go.Shape,
          "Rectangle", // the rectangular shape around the members
          {
            fill: "rgba(128,128,128,0.2)",
            stroke: "gray",
            strokeWidth: 3,
            portId: "",
            cursor: "pointer", // the Shape is the port, not the whole Node
            // allow all kinds of links from and to this port
            fromLinkable: true,
            fromLinkableSelfNode: true,
            fromLinkableDuplicates: true,
            toLinkable: true,
            toLinkableSelfNode: true,
            toLinkableDuplicates: true,
          }
        ),
        $(go.Placeholder, { margin: 10, background: "transparent" }) // represents where the members are
      ),
      {
        // the same context menu Adornment is shared by all groups
        contextMenu: partContextMenu,
      }
    );

    // Zdefiniowanie przykładowych danych
    const model = diagram.model;
    model.nodeDataArray = [
      { key: "1", color: "cyan", text: "Block 1", zOrder: 1 },
      { key: "2", color: "cyan", text: "Block 2", zOrder: 1 }, // Ustawienie początkowej pozycji dla drugiego bloku
      { key: "3", color: "cyan", text: "Block 3", zOrder: 1 }, // Ustawienie początkowej pozycji dla drugiego bloku
      { key: "4", color: "cyan", text: "Block 4", zOrder: 1 }, // Ustawienie początkowej pozycji dla drugiego bloku
    ];
    model.linkDataArray = [];

    diagram.undoManager.isEnabled = true;

    const myPalette = $(go.Palette, palletRef.current);

    myPalette.nodeTemplate = $(
      go.Node,
      "Auto",
      $(
        go.Shape,
        "RoundedRectangle",
        { fill: "white", strokeWidth: 0 },
        new go.Binding("fill", "color")
      ),
      $(go.TextBlock, { margin: 8 }, new go.Binding("text", "text"))
    );

    myPalette.model.nodeDataArray = [
      { key: "C", color: "cyan", text: "Pętla For", zOrder: 1 },
      { key: "LC", color: "lightcyan", text: "Pętla while", zOrder: 1 },
      { key: "A", color: "aquamarine", text: "Pętla For", zOrder: 1 },
      { key: "T", color: "turquoise", text: "Pętla For", zOrder: 1 },
      { key: "PB", color: "powderblue", text: "Pętla For", zOrder: 1 },
      { key: "LB", color: "lightblue", text: "Pętla For", zOrder: 1 },
      { key: "LSB", color: "lightskyblue", text: "Pętla For", zOrder: 1 },
      { key: "DSB", color: "deepskyblue", text: "Pętla For", zOrder: 1 },
    ];

    // Zapisz referencję do diagramu
    return () => {
      diagram.div = null;
      myPalette.div = null;
    };
  }, []);

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
      </header>
      <main className="main-content">
        <div className="sectionTight">
          <div
            id="myPaletteDiv"
            ref={palletRef}
            className="diagram-component"
          />
        </div>

        <div className="sectionWide">
          <div
            id="myDiagramDiv"
            ref={diagramRef}
            className="diagram-component"
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
