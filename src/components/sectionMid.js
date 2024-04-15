import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DndContext } from "@dnd-kit/core";
import MainDroppable from "./MainDroppable";
import { useSelector } from "react-redux";
import OrderDroppable from "./OrderDroppable";
import { useDispatch } from "react-redux";
import {
  changeElementOrder,
  deleteElement,
  inserElement,
} from "../redux/slices/CodeStructure";
import blockRenderer from "../blockRenderer";
import ClassBlock from "../blocks/classBlock";
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
          <Typography component={"span"}>{children}</Typography>
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
  const dispatch = useDispatch();
  const codeStructureElements = useSelector(
    (state) => state.codeStructure.elements
  );
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleDragEnd(event) {
    //debugger
    if (event.over) {
      //debugger
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
            dispatch(inserElement({ object: active.id, to: over.id }));
            break;
        }
      } else {
        dispatch(inserElement({ object: active.id, to: over.id }));
      }
    }
  }
  function handleDelete(event) {
    console.log("dziala");
  }

  return (
    <div className="sectionMid">
      <div sx={{ width: "100%" }}>
        <div sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabs.map((item, index) => (
              <Tab
                key={index}
                label={`${item.name} ${index}`}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </div>
        {tabs.map((item, index) => (
          <CustomTabPanel value={value} index={index} key={index}>
            {item.name === "Sekcja" ? (
              <DndContext onDragEnd={handleDragEnd}>
                <MainDroppable dropId={"mainId"}>
                  {codeStructureElements.map((store, index) => (
                    <OrderDroppable dropId={store.id} key={index}>
                      {blockRenderer(store)}
                    </OrderDroppable>
                  ))}
                </MainDroppable>
                <div style={{ position: "absolute", right: 30, top: 30 }}>
                  <MainDroppable dropId={"deleteId"}>
                    <div
                      className="blocks-container"
                      style={{
                        width: 90,
                        height: 70,
                        backgroundColor: "red",
                        borderRadius: 10,
                      }}
                    >
                      Przenieś aby usunąć
                    </div>
                  </MainDroppable>
                </div>
              </DndContext>
            ) : (
              <MainDroppable dropId={"mainClassId"}>
                <ClassBlock reduxClassId={item.id} />
              </MainDroppable>
            )}
            <DndContext onDragEnd={handleDelete}></DndContext>
          </CustomTabPanel>
        ))}
      </div>
    </div>
  );
}

export default SectionMid;
