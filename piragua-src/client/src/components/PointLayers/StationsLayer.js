import React from "react";
import { useContext, useState } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup, LayersControl, LayerGroup } from "react-leaflet";

import { Icon } from "leaflet";
import L from "leaflet";

import "../../App.css";

import StationsAirQualityContext from "../../Context/StationsAirQualityContext";
import ActiveStationContext from "../../Context/ActiveStationContext";
import StationsContext from "../../Context/StationsContext";

export const iconAirQuality = new Icon({
  iconUrl: "iconos-aire/azul.svg",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [48, 48],
  // iconAnchor: [22, 94],
  popupAnchor: [0, -26],
});

export const icon = new Icon({
  iconUrl: "iconos-aire/verde.svg",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [48, 48],
  // iconAnchor: [22, 94],
  popupAnchor: [0, -26],
});

const layerNameAirQuality = "Red Calidad aire";
const layerName = "Red Meteorológica";

const StationsLayer = () => {
  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      // customMarker is the class name in the styles.css file
      className: "customMarker",
      iconSize: L.point(48, 48, true),
    });
  };

  const stationsAirQuality = useContext(StationsAirQualityContext);
  const stations = useContext(StationsContext);
  const { activeStation, setActiveStation } = useContext(ActiveStationContext);

  return (
    <>
      <LayersControl.Overlay checked name={layerNameAirQuality}>
        <LayerGroup name={layerNameAirQuality}>
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
                icon={iconAirQuality}
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

      {/* <LayersControl.Overlay checked name={layerName}>
        <LayerGroup name={layerName}>
          <MarkerClusterGroup
            showCoverageOnHover={false}
            iconCreateFunction={createClusterCustomIcon}
          >
            {stations.features.map((station) => (
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
                    <h6>{station.properties.tipo}</h6>
                  // <p>Level: {station.properties.level}</p>
                  // <p>Male: {station.properties.male}</p>
                  // <p>Female: {station.properties.female}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </LayerGroup>
      </LayersControl.Overlay> */}
    </>
  );
};

export default StationsLayer;
