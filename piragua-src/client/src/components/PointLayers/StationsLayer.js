import React, { useState } from "react";
import { useContext, useEffect } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, LayersControl, LayerGroup, useMap } from "react-leaflet";

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

  const map = useMap();

  const { changeOpenCloseStationAutomaticPanel } = useContext(
    OpenCloseStationAutomaticPanelContext
  );

  const [checkedAire, setCheckedAire] = useState(true);
  const [checkedPluvio, setCheckedPluvio] = useState(true);
  const [checkedNivel, setCheckedNivel] = useState(true);
  const [checkedMeteo, setCheckedMeteo] = useState(true);
  // const [checked, setCheckedPluvio] = useState(true);

  useEffect(() => {
    map.on("overlayremove", (e) => {
      //do whatever
      // console.log(e.name);
      switch (e.name) {
        case "Red calidad aire":
          setCheckedAire(false);
          break;
        case "Red pluviográfica":
          setCheckedPluvio(false);
          break;
        case "Red Nivel":
          setCheckedNivel(false);
          break;
        case "Red Meteorológica":
          setCheckedMeteo(false);
          break;
        default:
          return;
      }
    });

    map.on("overlayadd", (e) => {
      //do whatever
      // console.log(e.name);
      switch (e.name) {
        case "Red calidad aire":
          setCheckedAire(true);
          break;
        case "Red pluviográfica":
          setCheckedPluvio(true);
          break;
        case "Red Nivel":
          setCheckedNivel(true);
          break;
        case "Red Meteorológica":
          setCheckedMeteo(true);
          break;
        default:
          return;
      }
    });
  }, []);

  return (
    <>
      <LayersControl.Overlay checked name={layerNameAirQuality}>
        <LayerGroup name={layerNameAirQuality}></LayerGroup>
      </LayersControl.Overlay>

      <LayersControl.Overlay checked name={"Red pluviográfica"}>
        <LayerGroup name={"Red pluviográfica"}></LayerGroup>
      </LayersControl.Overlay>

      <LayersControl.Overlay checked name={"Red Nivel"}>
        <LayerGroup name={"Red Nivel"}></LayerGroup>
      </LayersControl.Overlay>

      <LayersControl.Overlay checked name={"Red Meteorológica"}>
        <LayerGroup name={"Red Meteorológica"}></LayerGroup>
      </LayersControl.Overlay>

      <MarkerClusterGroup
        showCoverageOnHover={false}
        iconCreateFunction={createClusterCustomIcon}
      >
        {checkedAire &&
          stationsAirQuality["estaciones"] &&
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

        {checkedMeteo &&
          stations["estaciones"] &&
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

        {checkedNivel &&
          stations["estaciones"] &&
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

        {checkedPluvio &&
          stations["estaciones"] &&
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
    </>
  );
};

export default StationsLayer;
