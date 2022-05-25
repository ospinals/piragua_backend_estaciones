import React from "react";
import { useContext } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, LayersControl, LayerGroup } from "react-leaflet";

import { Icon } from "leaflet";
import L from "leaflet";

import "../../App.css";
import { Iconos } from "../../assets/IconosLeaflet.js";

import StationsAirQualityContext from "../../Context/StationsAirQualityContext";
import ActiveStationContext from "../../Context/ActiveStationContext";
import ActiveStationAutomaticContext from "../../Context/ActiveStationAutomaticContext";
import StationsContext from "../../Context/StationsContext";
import OpenCloseStationPanelContext from "../../Context/OpenCloseStationPanelContext";
import OpenCloseStationAutomaticPanelContext from "../../Context/OpenCloseStationAutomaticPanelContext";

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
  iconSize: [40, 40],
  popupAnchor: [0, -26],
});

const layerNameAirQuality = "Red calidad aire";
// const layerName = "Red meteorológica";

const StationsLayer = () => {
  const IconsAirQuality = {
    "-": iconAirQualityNoData,
    Buena: iconAirQualityGood,
    Moderada: iconAirQualityAcceptable,
    Peligrosa: iconAirQualityDangerous,
    "Dañina para la salud": iconAirQualityHarm,
    "Dañina - Grupos sensibles": iconAirQualityHarmSensible,
    "Muy dañina para la salud": iconAirQualityVeryHarm,
  };

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span key=${Math.random()}>${cluster.getChildCount()}</span>`,
      // customMarker is the class name in the styles.css file
      className: "customMarker",
      iconSize: L.point(48, 48, true),
    });
  };

  const stationsAirQuality = useContext(StationsAirQualityContext);
  const stations = useContext(StationsContext);
  const { changeActiveStation } = useContext(ActiveStationContext);
  const { changeActiveStationAutomatic } = useContext(
    ActiveStationAutomaticContext
  );

  const { changeOpenCloseStationPanel } = useContext(
    OpenCloseStationPanelContext
  );

  const { changeOpenCloseStationAutomaticPanel } = useContext(
    OpenCloseStationAutomaticPanelContext
  );

  console.log(stations);
  return (
    <>
      <LayersControl.Overlay checked name={layerNameAirQuality}>
        <LayerGroup name={layerNameAirQuality}>
          <MarkerClusterGroup
            showCoverageOnHover={false}
            iconCreateFunction={createClusterCustomIcon}
          >
            {stationsAirQuality &&
              stationsAirQuality["estaciones"].map((station) => {
                return (
                  <>
                    <Marker
                      key={station.codigo}
                      position={[station.latitud, station.longitud]}
                      eventHandlers={{
                        click: (e) => {
                          changeOpenCloseStationPanel(true);
                          changeOpenCloseStationAutomaticPanel(false);
                          changeActiveStation(null);
                          changeActiveStation(station.codigo);
                          changeActiveStationAutomatic(null);
                        },
                      }}
                      icon={IconsAirQuality[station["categoria"]]}
                    ></Marker>
                  </>
                );
              })}
          </MarkerClusterGroup>
        </LayerGroup>
      </LayersControl.Overlay>

      <LayersControl.Overlay checked name={"Red pluviográfica"}>
        <LayerGroup name={"Red pluviográfica"}>
          <MarkerClusterGroup
            showCoverageOnHover={false}
            iconCreateFunction={createClusterCustomIcon}
          >
            {stations["estaciones"] &&
              stations["estaciones"]
                .filter((x) => x["tipo"] === 1)
                .map((station) => {
                  return (
                    <>
                      <Marker
                        key={station.codigo}
                        position={[station.latitud, station.longitud]}
                        eventHandlers={{
                          click: (e) => {
                            changeOpenCloseStationAutomaticPanel(true);
                            changeOpenCloseStationPanel(false);
                            changeActiveStationAutomatic(null);
                            changeActiveStationAutomatic(station.codigo);
                            changeActiveStation(null);
                          },
                        }}
                        icon={Iconos[station["umbral"]]}
                      ></Marker>
                    </>
                  );
                })}
          </MarkerClusterGroup>
        </LayerGroup>
      </LayersControl.Overlay>

      <LayersControl.Overlay checked name={"Red Nivel"}>
        <LayerGroup name={"Red Nivel"}>
          <MarkerClusterGroup
            showCoverageOnHover={false}
            iconCreateFunction={createClusterCustomIcon}
          >
            {stations["estaciones"] &&
              stations["estaciones"]
                .filter((x) => x["tipo"] === 2)
                .map((station) => {
                  return (
                    <>
                      <Marker
                        key={station.codigo}
                        position={[station.latitud, station.longitud]}
                        eventHandlers={{
                          click: (e) => {
                            changeOpenCloseStationAutomaticPanel(true);
                            changeOpenCloseStationPanel(false);
                            changeActiveStationAutomatic(null);
                            changeActiveStationAutomatic(station.codigo);
                            changeActiveStation(null);
                          },
                        }}
                        icon={Iconos[station["umbral"]]}
                      ></Marker>
                    </>
                  );
                })}
          </MarkerClusterGroup>
        </LayerGroup>
      </LayersControl.Overlay>

      <LayersControl.Overlay checked name={"Red Meteorológica"}>
        <LayerGroup name={"Red Meteorológica"}>
          <MarkerClusterGroup
            showCoverageOnHover={false}
            iconCreateFunction={createClusterCustomIcon}
          >
            {stations["estaciones"] &&
              stations["estaciones"]
                .filter((x) => x["tipo"] === 8)
                .map((station) => {
                  return (
                    <>
                      <Marker
                        key={station.codigo}
                        position={[station.latitud, station.longitud]}
                        eventHandlers={{
                          click: (e) => {
                            changeOpenCloseStationAutomaticPanel(true);
                            changeOpenCloseStationPanel(false);
                            changeActiveStationAutomatic(null);
                            changeActiveStationAutomatic(station.codigo);
                            changeActiveStation(null);
                          },
                        }}
                        icon={Iconos[station["umbral"]]}
                      ></Marker>
                    </>
                  );
                })}
          </MarkerClusterGroup>
        </LayerGroup>
      </LayersControl.Overlay>
    </>
  );
};

export default StationsLayer;
