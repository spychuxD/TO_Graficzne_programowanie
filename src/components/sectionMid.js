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
  const tabIndex = useSelector((state) => state.blocksTabs.index);
  const dispatch = useDispatch();

  const codeStructureElements = useSelector(
    (state) => state.codeStructure.elements
  );

  const handleChange = (event, newValue) => {
    dispatch(changeTab({ index: newValue }));
  };

  return (
    <div className="sectionMid">
      <div sx={{ width: "100%" }}>
        <div sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
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
          <CustomTabPanel value={tabIndex} index={index} key={index}>
            {item.name === "Sekcja" ? (
              <Fragment>
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
              </Fragment>
            ) : (
              <MainDroppable dropId={"mainClassId"}>
                <ClassEditorBlock reduxClassId={item.id} />
              </MainDroppable>
            )}
          </CustomTabPanel>
        ))}
      </div>
    </div>
  );
}

export default SectionMid;
