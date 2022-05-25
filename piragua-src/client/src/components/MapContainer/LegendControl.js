import React from "react";
import { useRef } from "react";
import useGeoLocation from "./UseGeolocation";
import { useContext } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import "leaflet/dist/leaflet.css";
import "../../App.css";
import MapContext from "../../Context/MapContext";
import OpenCloseLegendPanelContext from "../../Context/OpenCloseLegendPanelContext";

const ZOOM_LEVEL = 11;

const LegendControl = () => {
  const map = useContext(MapContext);
  const { openCloseLegendPanel, changeOpenCloseLegendPanel } = useContext(
    OpenCloseLegendPanelContext
  );

  const handleClick = (e) => {
    changeOpenCloseLegendPanel(true);
  };

  return (
    <>
      <div className="leaflet-top leaflet-right legend-control">
        <div className="leaflet-control-layers leaflet-control">
          <button
            className="btn btn-primary"
            onClick={handleClick}
            style={{
              borderColor: "#6394CF",
              backgroundColor: "#6394CF",
              fontSize: "100%",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <AiOutlineInfoCircle />
          </button>
        </div>
      </div>
    </>
  );
};

export default LegendControl;
