import React from "react";
import { useContext, useState } from "react";

import "leaflet/dist/leaflet.css";
import "../../App.css";
import ActiveStationContext from "../../Context/ActiveStationContext";
import OpenCloseStationPanelContext from "../../Context/OpenCloseStationPanelContext";
import IcaStationsAirQualityContext from "../../Context/IcaStationsAirQualityContext";
import IcaStationsUnitsContext from "../../Context/IcaStationsUnitsContext";
import OpenClosePlotPanelContext from "../../Context/OpenClosePlotPanelContext";
import Dropdown from "react-bootstrap/Dropdown";
import { CloseButton, Button } from "react-bootstrap";

const StationPanel = () => {
  const icaStations = useContext(IcaStationsAirQualityContext);
  const icaUnits = useContext(IcaStationsUnitsContext);

  const { activeStation, changeActiveStation } =
    useContext(ActiveStationContext);

  const { openCloseStationPanel, changeOpenCloseStationPanel } = useContext(
    OpenCloseStationPanelContext
  );

  const { openClosePlotPanel, changeOpenClosePlotPanel } = useContext(
    OpenClosePlotPanelContext
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
    changeOpenClosePlotPanel(true);
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
                ? icaStations[activeStation]["PM 2.5"] !== undefined
                  ? IconsAirQuality[
                      evaluateIca["PM 2.5"](
                        icaStations[activeStation]["PM 2.5"]
                      )
                    ]
                  : IconsAirQuality[
                      evaluateIca["PM 10"](icaStations[activeStation]["PM 10"])
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
              ? icaStations[activeStation]["PM 2.5"] !== undefined
                ? "station-panel-variable " +
                  AirQualityColor[
                    evaluateIca["PM 2.5"](icaStations[activeStation]["PM 2.5"])
                  ]
                : "station-panel-variable " +
                  AirQualityColor[
                    evaluateIca["PM 10"](icaStations[activeStation]["PM 10"])
                  ]
              : "station-panel-variable"
          }
        >
          {icaStations && activeStation
            ? icaStations[activeStation]["PM 2.5"] !== undefined
              ? AirQualityEvaluation[
                  evaluateIca["PM 2.5"](icaStations[activeStation]["PM 2.5"])
                ]
              : AirQualityEvaluation[
                  evaluateIca["PM 10"](icaStations[activeStation]["PM 10"])
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
        <div className="station-panel-name">
          {activeStation ? `Estación: ${String(activeStation)}` : null}
        </div>
        <div className="close-button">
          <CloseButton onClick={handleClick} />
        </div>
        <div className="station-panel-value">
          {icaStations && activeStation
            ? icaStations[activeStation]["PM 2.5"] !== undefined
              ? replaceNaN(parseInt(icaStations[activeStation]["PM 2.5"]))
              : replaceNaN(parseInt(icaStations[activeStation]["PM 10"]))
            : null}
        </div>
        <div className="station-panel-units">
          {icaUnits && activeStation
            ? icaUnits[activeStation]["PM 2.5"] !== undefined
              ? icaUnits[activeStation]["PM 2.5"] + " PM2.5"
              : icaUnits[activeStation]["PM 10"] + " PM10"
            : null}
        </div>
      </div>
    </>
  );
};

export default StationPanel;
