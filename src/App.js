import React, { useState } from "react"; //useRef
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";
import ForBlock from "./blocks/ForBlock";
import {
  arithmeticBlocks,
  beginBlock,
  endBlock,
  forBlock,
  ifElseBlock,
} from "./blockTypes";
import BeginBlock from "./blocks/BeginBlock";
import EndBlock from "./blocks/EndBlock";

import Header from "./components/header";
import Footer from "./components/footer";
import SectionLeft from "./components/sectionLeft";
import ArithmeticBlocks from "./blocks/ArithmeticBlocks/ArithmeticBlocks";
import IfElseBlock from "./blocks/IfElseBlock";
import { ArithmeticOperations } from "./blocks/ArithmeticBlocks/ArithmeticOperations";

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

function App() {
  const [stores, setStores] = useState(DATA);

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      (store) =>
        store.id ===
        source.droppableId.replace("ifCondition", "").replace("elseBody", "")
    );
    const storeDestinationIndex = stores.findIndex(
      (store) =>
        store.id ===
        destination.droppableId
          .replace("ifCondition", "")
          .replace("elseBody", "")
    );
    console.log("storeSourceIndex ", storeSourceIndex);
    console.log("storeDestinationIndex ", storeDestinationIndex);
    console.log("source.droppableId", source.droppableId);
    console.log("destination.droppableId", destination.droppableId);

    if (storeSourceIndex === -1 || storeDestinationIndex === -1) {
      return;
    }
    if (
      (destination.droppableId.includes("ifCondition") &&
        !source.droppableId.includes("ifCondition")) ||
      (!destination.droppableId.includes("ifCondition") &&
        source.droppableId.includes("ifCondition"))
    )
      return;

    let useItems = 0;
    if (
      destination.droppableId.includes("ifCondition") &&
      source.droppableId.includes("ifCondition")
    ) {
      useItems = 1;
      if (stores[storeDestinationIndex].condition.length === 1) {
        return;
      }
    }
    if (
      destination.droppableId.includes("elseBody") &&
      source.droppableId.includes("elseBody")
    ) {
      useItems = 2;
    }
    let sourceItems, destinationItems;

    switch (useItems) {
      case 0:
        sourceItems = stores[storeSourceIndex].items;
        destinationItems = stores[storeDestinationIndex].items;
        break;
      case 1:
        sourceItems = stores[storeSourceIndex].condition;
        destinationItems = stores[storeDestinationIndex].condition;
        break;
      case 2:
        sourceItems = stores[storeSourceIndex].elseItems;
        destinationItems = stores[storeDestinationIndex].elseItems;
        break;
      default:
        break;
    }

    const [deletedItem] = sourceItems.splice(itemSourceIndex, 1);
    destinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      [useItems === 0 ? "items" : useItems === 1 ? "condition" : "elseItems"]:
        sourceItems,
    };

    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      [useItems === 0 ? "items" : useItems === 1 ? "condition" : "elseItems"]:
        destinationItems,
    };

    setStores(newStores);
  };

  const renderBlocks = (store) => {
    switch (store.type) {
      case beginBlock:
        return <BeginBlock {...store} setBlocksState={setStores} />;
      case forBlock:
        return <ForBlock {...store} setBlocksState={setStores} />;
      case endBlock:
        return <EndBlock {...store} setBlocksState={setStores} />;
      case arithmeticBlocks:
        return <ArithmeticBlocks {...store} setBlocksState={setStores} />;
      case ifElseBlock:
        return <IfElseBlock {...store} setBlocksState={setStores} />;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main className="main-content">
        <SectionLeft setStores={setStores} stores={stores}></SectionLeft>

        <div className="sectionMid">
          <DragDropContext onDragEnd={handleDragAndDrop}>
            <Droppable droppableId="ROOT" type="group">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {stores.map((store, index) => (
                    <Draggable
                      draggableId={store.id}
                      index={index}
                      key={store.id}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          {renderBlocks(store)}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="sectionRight">
          <div className="layout__wrapper"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
