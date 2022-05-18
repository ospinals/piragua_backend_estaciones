import React, { useEffect } from "react";
import { useContext, useState } from "react";

import "leaflet/dist/leaflet.css";
import "../../App.css";
import OpenCloseLegendPanelContext from "../../Context/OpenCloseLegendPanelContext";
import { CloseButton, Button } from "react-bootstrap";

const LegendPanel = () => {
  const { openCloseLegendPanel, changeOpenCloseLegendPanel } = useContext(
    OpenCloseLegendPanelContext
  );

  const handleClick = (e) => {
    changeOpenCloseLegendPanel(false);
  };

  return (
    <>
      <div
        className={`${openCloseLegendPanel ? "legend-panel-control" : "hide"}`}
      >
        <div className="close-button">
          <CloseButton onClick={handleClick} />
        </div>
      </div>
    </>
  );
};

export default LegendPanel;
