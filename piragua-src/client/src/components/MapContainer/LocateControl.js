import React from "react";
import { useRef } from "react";
import useGeoLocation from "./UseGeolocation";
import { useContext } from "react";
import { MdGpsFixed } from "react-icons/md";

import "leaflet/dist/leaflet.css";
import "../../App.css";
import MapContext from "../../Context/MapContext";

const ZOOM_LEVEL = 11;

const LocateControl = () => {
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
      <div className="leaflet-top leaflet-right location-control">
        <div className="leaflet-control-layers leaflet-control">
          <button className="btn btn-primary" onClick={showMyLocation}>
            <MdGpsFixed />
          </button>
        </div>
      </div>
    </>
  );
};

export default LocateControl;
