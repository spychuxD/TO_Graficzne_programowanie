import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MainDroppable from "./MainDroppable";
import { useSelector } from "react-redux";
import OrderDroppable from "./OrderDroppable";
import { useDispatch } from "react-redux";
import { FaTrashCan } from "react-icons/fa6";

import blockRenderer from "../blockRenderer";
import ClassEditorBlock from "../blocks/ClassBlocks/ClassEditorBlock";
import { changeTab } from "../redux/slices/BlocksTabs";
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
        <Box>
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
  const tabIndex = useSelector((state) => state.blocksTabs.index);
  const dispatch = useDispatch();

  const mainMethod = useSelector(
    (state) =>
      state.classes.classes.find((el) => el.id === "mainClass").methods[0]
  );
  const handleChange = (event, newValue) => {
    dispatch(changeTab({ index: newValue }));
  };

  return (
    <div className="sectionMid">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
          }}
        >
          <div
            style={{
              borderBottom: 1,
              borderColor: "divider",
              width: "90%",
            }}
          >
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons
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
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              width: "10%",
            }}
          >
            <MainDroppable dropId={"deleteId"}>
              <FaTrashCan color="#e3eef2" size={42}></FaTrashCan>
              <div className="text-center text-xx-small">
                Przenieś aby usunąć
              </div>
            </MainDroppable>
          </div>
        </div>
        {tabs.map((item, index) => (
          <CustomTabPanel value={tabIndex} index={index} key={index}>
            {item.name === "Sekcja" ? (
              <Fragment>
                <MainDroppable dropId={"mainMethod|2"}>
                  {mainMethod.children[2].map((store, index) =>
                    blockRenderer(store)
                  )}
                </MainDroppable>
              </Fragment>
            ) : (
              <ClassEditorBlock reduxClassId={item.id} />
            )}
          </CustomTabPanel>
        ))}
      </div>
    </div>
  );
}

export default SectionMid;
