import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "./MainContent.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const MainContent = (props) => {
  const [compactType, setCompactType] = useState("vertical");
  const [mounted, setMounted] = useState(false);
  const [layout, setLayout] = useState([
    { i: "a", id: "grid-item-hello-user", x: 0, y: 0, w: 6, h: 2 },
    { i: "b", id: "grid-item-unread", x: 6, y: 0, w: 2, h: 2 },
    { i: "c", id: "grid-item-calendar", x: 0, y: 2, w: 4, h: 4 },
    { i: "d", id: "grid-item-graph", x: 4, y: 2, w: 4, h: 4 },
    { i: "e", id: "grid-item-lastrow1", x: 0, y: 6, w: 2, h: 2 },
    { i: "f", id: "grid-item-lastrow2", x: 2, y: 6, w: 2, h: 2 },
    { i: "g", id: "grid-item-lastrow1", x: 4, y: 6, w: 2, h: 2 },
    { i: "h", id: "grid-item-lastrow1", x: 6, y: 6, w: 2, h: 2 },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onCompactTypeChange = () => {
    const oldCompactType = compactType;
    const newCompactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    setCompactType(newCompactType);
  };

  const onDrop = (elemParams) => {
    alert(
      `Element parameters:\n${JSON.stringify(
        elemParams,
        ["x", "y", "w", "h"],
        2
      )}`
    );
  };

  const [dynamicRowHeight, setDynamicRowHeight] = useState(0);

  useEffect(() => {
    const containerHeight = window.innerHeight;
    const numberOfRows = 9; // Number of rows you want to display
    const calculatedRowHeight = containerHeight / numberOfRows;
    setDynamicRowHeight(calculatedRowHeight);

    const handleResize = () => {
      const updatedContainerHeight = window.innerHeight;
      const updatedRowHeight = updatedContainerHeight / numberOfRows;
      setDynamicRowHeight(updatedRowHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container-fluid">
      <ResponsiveReactGridLayout
        {...props}
        rowHeight={dynamicRowHeight}
        cols={{ lg: 8, md: 8, sm: 8, xs: 8, xxs: 8 }}
        layout={layout}
        onDrop={onDrop}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        isDroppable={true}
        droppingItem={{ i: "xx", h: 50, w: 250 }}
      >
        {layout.map((itm) => (
          <div key={itm.i} data-grid={itm} className="block">
            {itm.i}
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default MainContent;
