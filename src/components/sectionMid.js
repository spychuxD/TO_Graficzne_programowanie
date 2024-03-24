import React, { useState } from "react";
import ArithmeticBlocks from "../blocks/ArithmeticBlocks/ArithmeticBlocks";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import IfElseBlock from "../blocks/IfElseBlock";
import BeginBlock from "../blocks/BeginBlock";
import EndBlock from "../blocks/EndBlock";
import ForBlock from "../blocks/ForBlock";
import ClassBlock from "../blocks/classBlock";
import {
  arithmeticBlocks,
  beginBlock,
  endBlock,
  forBlock,
  ifElseBlock,
} from "../blockTypes";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function SectionMid({ stores, setStores, tabs, setTabs }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

    // let useItems = 1;
    // let useItems2 = 1;
    let SourceArraySelection = 1;
    let DestinationArraySelection = 1;
    let sourceItems, destinationItems;

    if (
      source.droppableId.includes("ifCondition") &&
      destination.droppableId.includes("ifCondition")
    ) {
      SourceArraySelection = 0;
      DestinationArraySelection = 0;
      if (stores[storeDestinationIndex].condition.length === 1) {
        return;
      }
      sourceItems = stores[storeSourceIndex].condition;
      destinationItems = stores[storeDestinationIndex].condition;
    } else if (
      source.droppableId.includes("elseBody") &&
      destination.droppableId.includes("elseBody")
    ) {
      SourceArraySelection = 2;
      DestinationArraySelection = 2;
      sourceItems = stores[storeSourceIndex].elseItems;
      destinationItems = stores[storeDestinationIndex].elseItems;
    } else if (
      source.droppableId.includes("elseBody") &&
      !destination.droppableId.includes("elseBody")
    ) {
      SourceArraySelection = 2;
      DestinationArraySelection = 1;
      sourceItems = stores[storeSourceIndex].elseItems;
      destinationItems = stores[storeDestinationIndex].items;
    } else if (
      !source.droppableId.includes("elseBody") &&
      destination.droppableId.includes("elseBody")
    ) {
      SourceArraySelection = 1;
      DestinationArraySelection = 2;
      sourceItems = stores[storeSourceIndex].items;
      destinationItems = stores[storeDestinationIndex].elseItems;
    } else {
      sourceItems = stores[storeSourceIndex].items;
      destinationItems = stores[storeDestinationIndex].items;
    }

    const [deletedItem] = sourceItems.splice(itemSourceIndex, 1);
    destinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      [SourceArraySelection === 0
        ? "condition"
        : SourceArraySelection === 1
        ? "items"
        : "elseItems"]: sourceItems,
    };

    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      [DestinationArraySelection === 0
        ? "condition"
        : DestinationArraySelection === 1
        ? "items"
        : "elseItems"]: destinationItems,
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
    <div className="sectionMid">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabs.map((item, index) => (
              <Tab
                key={index}
                label={`${item} ${index}`}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
        {tabs.map((item, index) => (
          <CustomTabPanel value={value} index={index}>
            {item === "Sekcja" ? (
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
                              style={{
                                ...provided.draggableProps.style,
                                left: "auto !important",
                                top: "auto !important",
                              }}
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
            ) : (
              <ClassBlock />
            )}
          </CustomTabPanel>
        ))}
      </Box>
    </div>
  );
}

export default SectionMid;
