import React from "react";
import { useContext, useState } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Alert, Spinner } from "react-bootstrap";
import { Marker, Popup, LayersControl, LayerGroup } from "react-leaflet";
import useSWR from "swr";
import axios from "axios";

import { Icon } from "leaflet";
import L from "leaflet";

import "../../App.css";

export const icon = new Icon({
  iconUrl: "iconos-aire/azul.svg",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [48, 48],
  // iconAnchor: [22, 94],
  popupAnchor: [0, -26],
});

const fetcher = (url) => axios.get(url).then((res) => res.data);
const layerName = "Calidad aire";

const StationsLayer = () => {
  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      // customMarker is the class name in the styles.css file
      className: "customMarker",
      iconSize: L.point(48, 48, true),
    });
  };

  const [activeStation, setActiveStation] = useState(null);

  const { data, error } = useSWR("/api/v1/estaciones_aire", fetcher);
  const stationsAirQuality = data && !error ? data : {};

  if (error) {
    return <Alert variant="danger">There is a problem</Alert>;
  }
  if (!data) {
    return (
      <Spinner
        animation="border"
        variant="danger"
        role="status"
        style={{
          width: "300px",
          height: "300px",
          margin: "auto",
          display: "block",
        }}
      />
    );
  }

  return (
    <>
      <LayersControl.Overlay checked name={layerName}>
        <LayerGroup name={layerName}>
          <MarkerClusterGroup
            showCoverageOnHover={false}
            iconCreateFunction={createClusterCustomIcon}
          >
            {stationsAirQuality.features.map((station) => (
              <Marker
                key={station.properties.codigo}
                position={[
                  station.geometry.coordinates[1],
                  station.geometry.coordinates[0],
                ]}
                onClick={() => {
                  setActiveStation(station);
                }}
                icon={icon}
              >
                <Popup
                  position={[
                    station.geometry.coordinates[1],
                    station.geometry.coordinates[0],
                  ]}
                  onClose={() => {
                    setActiveStation(null);
                  }}
                >
                  <div>
                    <h6>{station.properties.codigo}</h6>
                    {/* <p>Level: {station.properties.level}</p>
                  <p>Male: {station.properties.male}</p>
                  <p>Female: {station.properties.female}</p> */}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </LayerGroup>
      </LayersControl.Overlay>
    </>
  );
};

export default StationsLayer;
