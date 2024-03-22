import React, { useState } from "react"; //useRef
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";
import ForBlock from "./blocks/ForBlock";
import { beginBlock, endBlock, forBlock } from "./blockTypes";
import BeginBlock from "./blocks/BeginBlock";
import EndBlock from "./blocks/EndBlock";

import Header from "./components/header";
import Footer from "./components/footer";
import SectionLeft from "./components/sectionLeft";

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
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    setStores(newStores);
  };
  ////////////////////////////////////

  const renderBlocks = (store) => {
    switch (store.type) {
      case beginBlock:
        return <BeginBlock {...store} setBlocksState={setStores} />;
      case forBlock:
        return <ForBlock {...store} setBlocksState={setStores} />;
      case endBlock:
        return <EndBlock {...store} setBlocksState={setStores} />;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <main className="main-content">
        <SectionLeft setStores={setStores} stores={stores} ></SectionLeft>

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
      <Footer/>
    </div>
  );
}

export default App;
