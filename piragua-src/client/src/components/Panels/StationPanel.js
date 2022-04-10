import React from "react";
import { useContext, useState } from "react";

import "leaflet/dist/leaflet.css";
import "../../App.css";
import MapContext from "../../Context/MapContext";
import ActiveStationContext from "../../Context/ActiveStationContext";
import OpenCloseStationPanelContext from "../../Context/OpenCloseStationPanelContext";
import IcaStationsAirQualityContext from "../../Context/IcaStationsAirQualityContext";
import StationsAirQualityContext from "../../Context/StationsAirQualityContext";
import IcaStationsUnitsContext from "../../Context/IcaStationsUnitsContext";
import Dropdown from "react-bootstrap/Dropdown";
import { CloseButton, Button } from "react-bootstrap";
import { Icon } from "leaflet";

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

const StationPanel = () => {
  const map = useContext(MapContext);
  const stationsAirQuality = useContext(StationsAirQualityContext);
  const icaStations = useContext(IcaStationsAirQualityContext);
  const icaUnits = useContext(IcaStationsUnitsContext);

  const { activeStation, changeActiveStation } =
    useContext(ActiveStationContext);

  const { openCloseStationPanel, changeOpenCloseStationPanel } = useContext(
    OpenCloseStationPanelContext
  );
  const [dropDownSelection, setDropDownSelection] = useState("24h");

  const handleSelect = (e) => {
    setDropDownSelection(e);
  };

  const handleClick = (e) => {
    changeOpenCloseStationPanel(false);
    changeActiveStation(null);
  };

  const handleClickPlot = (e) => {
    console.log("clic");
  };

  const replaceNaN = (x) => {
    if (isNaN(x)) {
      return "-";
    } else return x;
  };

  const IconsAirQuality = {
    NoData: "/iconos-aire/azul.svg",
    Good: "/iconos-aire/verde.svg",
    Acceptable: "/iconos-aire/amarillo.svg",
    Dangerous: "/iconos-aire/marron.svg",
    Harm: "/iconos-aire/rojo.svg",
    HarmSensible: "/iconos-aire/naranja.svg",
    VeryHarm: "/iconos-aire/morado.svg",
  };

  const AirQualityEvaluation = {
    NoData: "No Data",
    Good: "Buena",
    Acceptable: "Aceptable",
    Dangerous: "Peligrosa",
    Harm: "Dañina",
    HarmSensible: "Grupos sensibles",
    VeryHarm: "Muy dañina",
  };

  const AirQualityColor = {
    NoData: "nodata",
    Good: "green",
    Acceptable: "yellow",
    Dangerous: "brown",
    Harm: "red",
    HarmSensible: "orange",
    VeryHarm: "purple",
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

  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  console.log(icaUnits);

  return (
    <>
      <div
        className={`${
          openCloseStationPanel ? "station-panel-control" : "hide"
        }`}
      >
        <div className="dropdown-station">
          <Dropdown itemType="button" onSelect={handleSelect}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              {
                {
                  "24h": "Últimas 24 horas",
                  "72h": "Últimas 72 horas",
                  "7d": "Última semana",
                  "30d": "Últimos 30 días",
                }[dropDownSelection]
              }
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
              <Dropdown.Item eventKey="24h" active>
                Últimas 24 horas
              </Dropdown.Item>
              <Dropdown.Item eventKey="72h">Últimas 72 horas</Dropdown.Item>
              <Dropdown.Item eventKey="7d">Última semana</Dropdown.Item>
              <Dropdown.Item eventKey="30d">Últimos 30 días</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="station-panel-icon">
          <img
            src={
              icaStations && activeStation
                ? IconsAirQuality[
                    evaluateIca(icaStations[activeStation]["PM 2.5"])
                  ]
                : null
            }
            alt=""
            className="station-panel-icon-props"
          ></img>
        </div>
        <div
          className={
            icaStations && activeStation
              ? "station-panel-variable " +
                AirQualityColor[
                  evaluateIca(icaStations[activeStation]["PM 2.5"])
                ]
              : "station-panel-variable"
          }
        >
          {icaStations && activeStation
            ? AirQualityEvaluation[
                evaluateIca(icaStations[activeStation]["PM 2.5"])
              ]
            : null}
        </div>
        <div className="plot-button">
          <Button
            variant="primary"
            size="sm"
            style={{
              borderColor: "#6394CF",
              backgroundColor: "#6394CF",
              fontSize: "x-small",
              boxSizing: "border-box",
            }}
            onClick={handleClickPlot}
          >
            VER DATOS
          </Button>
        </div>
        <div className="close-button">
          <CloseButton onClick={handleClick} />
        </div>
        <div className="station-panel-value">
          {icaStations && activeStation
            ? replaceNaN(parseInt(icaStations[activeStation]["PM 2.5"]))
            : null}
        </div>
        <div className="station-panel-units">
          {icaUnits && activeStation ? icaUnits[activeStation]["PM 2.5"] : null}
        </div>
      </div>
    </>
  );
};

export default StationPanel;
