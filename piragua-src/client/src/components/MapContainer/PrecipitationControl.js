import React from "react";
import { useRef } from "react";
import useGeoLocation from "./UseGeolocation";
import { useContext } from "react";
import { IoMdUmbrella } from "react-icons/io";
import "leaflet/dist/leaflet.css";
import "../../App.css";
import MapContext from "../../Context/MapContext";
import OpenCloseClickValuePanelContext from "../../Context/OpenCloseClickValuePanelContext";
import ShowPrecipitationContext from "../../Context/showPrecipitationContext";

const PrecipitationControl = () => {
  const map = useContext(MapContext);

  var GeoRasterLayer = require("georaster-layer-for-leaflet");
  const { openCloseClickValuePanel, changeOpenCloseClickValuePanel } =
    useContext(OpenCloseClickValuePanelContext);

  const { showPrecipitation, changeShowPrecipitation } = useContext(
    ShowPrecipitationContext
  );

  const handleClick = (e) => {
    if (showPrecipitation) {
      changeOpenCloseClickValuePanel(false);
      changeShowPrecipitation(false);
      map.eachLayer(function (layer) {
        if (layer instanceof GeoRasterLayer) map.removeLayer(layer);
      });
    } else {
      changeShowPrecipitation(true);
    }
  };

  return (
    <>
      <div className="leaflet-top leaflet-right precipitation-control">
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
            <IoMdUmbrella />
          </button>
        </div>
      </div>
    </>
  );
};

export default PrecipitationControl;
