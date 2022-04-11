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
import IcaStationsAirQualityContext from "../../Context/IcaStationsAirQualityContext";

export const iconAirQualityNoData = new Icon({
  iconUrl: "iconos-aire/azul.svg",
  iconSize: [48, 48],
  popupAnchor: [0, -26],
});

export const iconAirQualityGood = new Icon({
  iconUrl: "iconos-aire/verde.svg",
  iconSize: [48, 48],
  popupAnchor: [0, -26],
});

export const iconAirQualityAcceptable = new Icon({
  iconUrl: "iconos-aire/amarillo.svg",
  iconSize: [48, 48],
  popupAnchor: [0, -26],
});

export const iconAirQualityHarmSensible = new Icon({
  iconUrl: "iconos-aire/naranja.svg",
  iconSize: [48, 48],
  popupAnchor: [0, -26],
});

export const iconAirQualityHarm = new Icon({
  iconUrl: "iconos-aire/rojo.svg",
  iconSize: [48, 48],
  popupAnchor: [0, -26],
});

export const iconAirQualityVeryHarm = new Icon({
  iconUrl: "iconos-aire/morado.svg",
  iconSize: [48, 48],
  popupAnchor: [0, -26],
});

export const iconAirQualityDangerous = new Icon({
  iconUrl: "iconos-aire/marron.svg",
  iconSize: [48, 48],
  popupAnchor: [0, -26],
});

export const icon = new Icon({
  iconUrl: "iconos-aire/verde.svg",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [48, 48],
  // iconAnchor: [22, 94],
  popupAnchor: [0, -26],
});

const layerNameAirQuality = "Red calidad aire";
const layerName = "Red meteorológica";

const StationsLayer = () => {
  const IconsAirQuality = {
    NoData: iconAirQualityNoData,
    Good: iconAirQualityGood,
    Acceptable: iconAirQualityAcceptable,
    Dangerous: iconAirQualityDangerous,
    Harm: iconAirQualityHarm,
    HarmSensible: iconAirQualityHarmSensible,
    VeryHarm: iconAirQualityVeryHarm,
  };

  const evaluateIca = (x) => {
    let evaluation = null;
    if (x === null || x === undefined) {
      evaluation = "NoData";
    } else if (x < 20) {
      evaluation = "Good";
    } else if (x < 37) {
      evaluation = "Acceptable";
    } else if (x < 60) {
      evaluation = "HarmSensible";
    } else if (x < 80) {
      evaluation = "Harm";
    } else if (x < 100) {
      evaluation = "VeryHarm";
    } else {
      evaluation = "Dangerous";
    }
    return evaluation;
  };

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      // customMarker is the class name in the styles.css file
      className: "customMarker",
      iconSize: L.point(48, 48, true),
    });
  };

  const stationsAirQuality = useContext(StationsAirQualityContext);
  const icaStations = useContext(IcaStationsAirQualityContext);
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
            {stationsAirQuality.features.map((station) => (
              <Marker
                key={station.properties.codigo}
                position={[
                  station.geometry.coordinates[1],
                  station.geometry.coordinates[0],
                ]}
                eventHandlers={{
                  click: (e) => {
                    changeOpenCloseStationPanel(true);
                    changeActiveStation(station.properties.codigo);
                  },
                }}
                icon={
                  icaStations[station.properties.codigo]["PM 2.5"] !== undefined
                    ? IconsAirQuality[
                        evaluateIca(
                          icaStations[station.properties.codigo]["PM 2.5"]
                        )
                      ]
                    : IconsAirQuality[
                        evaluateIca(
                          icaStations[station.properties.codigo]["PM 10"]
                        )
                      ]
                }
              >
                {/* <Popup
                  position={[
                    station.geometry.coordinates[1],
                    station.geometry.coordinates[0],
                  ]}
                  onClose={() => {
                    changeOpenCloseStationPanel(false);
                    changeActiveStation(null);
                  }}
                >
                  <div>
                    <h6>{station.properties.codigo}</h6>
                  </div>
                </Popup> */}
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
