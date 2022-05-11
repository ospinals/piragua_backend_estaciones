import React from "react";
import { useRef } from "react";
import useGeoLocation from "./UseGeolocation";
import { useContext } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import "leaflet/dist/leaflet.css";
import "../../App.css";
import MapContext from "../../Context/MapContext";

const ZOOM_LEVEL = 11;

const LegendControl = () => {
  const map = useContext(MapContext);
  const location = useGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      map.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: false }
      );
    } else {
      alert(location.error.message);
    }
  };

  return (
    <>
      <div className="leaflet-top leaflet-right legend-control">
        <div className="leaflet-control-layers leaflet-control">
          <button
            className="btn btn-primary"
            onClick={null}
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
