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
import OpenCloseStationPanelContext from "../../Context/OpenCloseStationPanelContext";

export const iconAirQualityNoData = new Icon({
  iconUrl: "iconos-aire/azul.svg",
  iconSize: [40, 40],
  popupAnchor: [0, -26],
});

export const iconAirQualityGood = new Icon({
  iconUrl: "iconos-aire/verde.svg",
  iconSize: [40, 40],
  popupAnchor: [0, -26],
});

export const iconAirQualityAcceptable = new Icon({
  iconUrl: "iconos-aire/amarillo.svg",
  iconSize: [40, 40],
  popupAnchor: [0, -26],
});

export const iconAirQualityHarmSensible = new Icon({
  iconUrl: "iconos-aire/naranja.svg",
  iconSize: [40, 40],
  popupAnchor: [0, -26],
});

export const iconAirQualityHarm = new Icon({
  iconUrl: "iconos-aire/rojo.svg",
  iconSize: [40, 40],
  popupAnchor: [0, -26],
});

export const iconAirQualityVeryHarm = new Icon({
  iconUrl: "iconos-aire/morado.svg",
  iconSize: [40, 40],
  popupAnchor: [0, -26],
});

export const iconAirQualityDangerous = new Icon({
  iconUrl: "iconos-aire/marron.svg",
  iconSize: [40, 40],
  popupAnchor: [0, -26],
});

export const icon = new Icon({
  iconUrl: "iconos-aire/verde.svg",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [40, 40],
  // iconAnchor: [22, 94],
  popupAnchor: [0, -26],
});

const layerNameAirQuality = "Red calidad aire";
const layerName = "Red meteorológica";

const StationsLayer = () => {
  const IconsAirQuality = {
    NoData: iconAirQualityNoData,
    Buena: iconAirQualityGood,
    Moderada: iconAirQualityAcceptable,
    Dangerous: iconAirQualityDangerous,
    Harm: iconAirQualityHarm,
    HarmSensible: iconAirQualityHarmSensible,
    VeryHarm: iconAirQualityVeryHarm,
  };

  const evaluateIcaPM25 = (x) => {
    let evaluation = null;
    if (x === null || x === undefined) {
      evaluation = "NoData";
    } else if (x <= 12) {
      evaluation = "Good";
    } else if (x <= 37) {
      evaluation = "Acceptable";
    } else if (x <= 55) {
      evaluation = "HarmSensible";
    } else if (x <= 150) {
      evaluation = "Harm";
    } else if (x <= 250) {
      evaluation = "VeryHarm";
    } else {
      evaluation = "Dangerous";
    }
    return evaluation;
  };

  const evaluateIcaPM10 = (x) => {
    let evaluation = null;
    if (x === null || x === undefined) {
      evaluation = "NoData";
    } else if (x <= 54) {
      evaluation = "Good";
    } else if (x <= 154) {
      evaluation = "Acceptable";
    } else if (x <= 254) {
      evaluation = "HarmSensible";
    } else if (x <= 354) {
      evaluation = "Harm";
    } else if (x <= 424) {
      evaluation = "VeryHarm";
    } else {
      evaluation = "Dangerous";
    }
    return evaluation;
  };

  const evaluateIca = { "PM 2.5": evaluateIcaPM25, "PM 10": evaluateIcaPM10 };

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
  const { activeStation, changeActiveStation } =
    useContext(ActiveStationContext);

  const { openCloseStationPanel, changeOpenCloseStationPanel } = useContext(
    OpenCloseStationPanelContext
  );

  return (
    <>
      <LayersControl.Overlay checked name={layerNameAirQuality}>
        <LayerGroup name={layerNameAirQuality}>
          <MarkerClusterGroup
            showCoverageOnHover={false}
            iconCreateFunction={createClusterCustomIcon}
          >
            {stationsAirQuality["estaciones"].map((station) => (
              <Marker
                key={station.codigo}
                position={[station.latitud, station.longitud]}
                eventHandlers={{
                  click: (e) => {
                    changeOpenCloseStationPanel(true);
                    changeActiveStation(station.codigo);
                  },
                }}
                icon={IconsAirQuality[station["categoria"]]}
              ></Marker>
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
                key={station.codigo}
                position={[
                  station.latitud,
                  station.longitud,
                ]}
                onClick={() => {
                  setActiveStation(station);
                }}
                icon={icon}
              >
                <Popup
                  position={[
                    station.latitud,
                    station.longitud,
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
