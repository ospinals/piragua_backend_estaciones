import React, { useEffect } from "react";
import { useContext, useState } from "react";
import moment from "moment";

import "leaflet/dist/leaflet.css";
import "../../App.css";

import OpenCloseClickValuePanelContext from "../../Context/OpenCloseClickValuePanelContext";
import ClickValueContext from "../../Context/ClickValueContext";

const ClickValuePanel = () => {
  const { clickValue, changeClickValue } = useContext(ClickValueContext);

  const { openCloseClickValuePanel, changeOpenCloseClickValuePanel } =
    useContext(OpenCloseClickValuePanelContext);

  const replaceNaN = (x) => {
    if (isNaN(x) || x === 0 || x === undefined || x === null) {
      return "-";
    } else if (typeof x === "string") {
      return parseFloat(x).toFixed(0);
    } else return parseFloat(x).toFixed(0);
  };

  return (
    <>
      <div
        className={`${
          openCloseClickValuePanel ? "clickvalue-panel-control" : "hide"
        }`}
      >
        <p className="clickvalue" style={{ fontWeight: 900 }}>
          Acumulado:
        </p>
        <p className="clickvalue">
          {"    "}
          {replaceNaN(clickValue)} mm
        </p>
      </div>
    </>
  );
};

export default ClickValuePanel;
