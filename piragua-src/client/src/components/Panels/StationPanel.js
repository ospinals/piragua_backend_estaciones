import React, { useEffect } from "react";
import { useContext, useState } from "react";

import "leaflet/dist/leaflet.css";
import "../../App.css";
import ActiveStationContext from "../../Context/ActiveStationContext";
import OpenCloseStationPanelContext from "../../Context/OpenCloseStationPanelContext";
import StationsAirQualityContext from "../../Context/StationsAirQualityContext";
import AirQualityActiveStationParametersContext from "../../Context/AirQualityActiveStationParametersContext";
import OpenClosePlotPanelContext from "../../Context/OpenClosePlotPanelContext";
import TimeWindowContext from "../../Context/TimeWindowContext";
import Dropdown from "react-bootstrap/Dropdown";
import useSWR from "swr";
import axios from "axios";
import { CloseButton, Button } from "react-bootstrap";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const StationPanel = () => {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const [dropDownSelectionVariables, setDropDownSelectionVariables] =
    useState("PM 2.5");

  function filterValue(obj, key, value) {
    return obj.find(function (v) {
      return v[key] === value;
    });
  }

  const stationsAirQuality = useContext(StationsAirQualityContext);

  const {
    airQualityActiveStationParameters,
    changeAirQualityActiveStationParameters,
  } = useContext(AirQualityActiveStationParametersContext);

  const { activeStation, changeActiveStation } =
    useContext(ActiveStationContext);

  const { openCloseStationPanel, changeOpenCloseStationPanel } = useContext(
    OpenCloseStationPanelContext
  );

  const { changeOpenClosePlotPanel } = useContext(OpenClosePlotPanelContext);

  const { timeWindow, changeTimeWindow } = useContext(TimeWindowContext);

  const handleSelect = (e) => {
    changeTimeWindow(e);
  };

  const handleVariablesData = (e) => {
    changeAirQualityActiveStationParameters(e);
  };

  const handleSelectVariables = (e) => {
    setDropDownSelectionVariables(e);
  };

  const handleClick = (e) => {
    changeOpenCloseStationPanel(false);
    changeActiveStation(null);
  };

  const handleClickPlot = (e) => {
    changeOpenClosePlotPanel(true);
  };

  const replaceNaN = (x) => {
    if (typeof x === "string") {
      return x;
    } else if (isNaN(x) || x === 0) {
      return "-";
    } else return x;
  };

  const IconsAirQuality = {
    "-": "/iconos-aire/azul.svg",
    Buena: "/iconos-aire/verde.svg",
    Moderada: "/iconos-aire/amarillo.svg",
    Peligrosa: "/iconos-aire/marron.svg",
    "Dañina para la salud": "/iconos-aire/rojo.svg",
    "Dañina - Grupos sensibles": "/iconos-aire/naranja.svg",
    "Muy dañina para la salud": "/iconos-aire/morado.svg",
  };

  const AirQualityColor = {
    "-": "nodata",
    Buena: "green",
    Moderada: "yellow",
    Peligrosa: "brown",
    "Dañina para la salud": "red",
    "Dañina - Grupos sensibles": "orange",
    "Muy dañina para la salud": "purple",
  };

  const AirQualityEvaluation = {
    "-": "No Data",
    Buena: "Buena",
    Moderada: "Moderada",
    Peligrosa: "Peligrosa",
    "Dañina para la salud": "Dañina",
    "Dañina - Grupos sensibles": "Grupos sensibles",
    "Muy dañina para la salud": "Muy dañina",
  };

  const evaluateIcaPM25 = (x) => {
    let evaluation = null;
    if (x === null || x === undefined) {
      evaluation = "-";
    } else if (x <= 12) {
      evaluation = "Buena";
    } else if (x <= 37) {
      evaluation = "Moderada";
    } else if (x <= 55) {
      evaluation = "Dañina - Grupos sensibles";
    } else if (x <= 150) {
      evaluation = "Dañina para la salud";
    } else if (x <= 250) {
      evaluation = "Muy dañina para la salud";
    } else {
      evaluation = "Peligrosa";
    }
    return evaluation;
  };

  const evaluateIcaPM10 = (x) => {
    let evaluation = null;
    if (x === null || x === undefined) {
      evaluation = "-";
    } else if (x <= 54) {
      evaluation = "Buena";
    } else if (x <= 154) {
      evaluation = "Moderada";
    } else if (x <= 254) {
      evaluation = "Dañina - Grupos sensibles";
    } else if (x <= 354) {
      evaluation = "Dañina para la salud";
    } else if (x <= 424) {
      evaluation = "Muy dañina para la salud";
    } else {
      evaluation = "Peligrosa";
    }
    return evaluation;
  };

  const evaluateIcaNO2 = (x) => {
    let evaluation = null;
    if (x === null || x === undefined) {
      evaluation = "-";
    } else if (x <= 100) {
      evaluation = "Buena";
    } else if (x <= 189) {
      evaluation = "Moderada";
    } else if (x <= 677) {
      evaluation = "Dañina - Grupos sensibles";
    } else if (x <= 1221) {
      evaluation = "Dañina para la salud";
    } else if (x <= 2349) {
      evaluation = "Muy dañina para la salud";
    } else {
      evaluation = "Peligrosa";
    }
    return evaluation;
  };

  const evaluateIcaO3 = (x) => {
    let evaluation = null;
    if (x === null || x === undefined) {
      evaluation = "-";
    } else if (x <= 106) {
      evaluation = "Buena";
    } else if (x <= 138) {
      evaluation = "Moderada";
    } else if (x <= 167) {
      evaluation = "Dañina - Grupos sensibles";
    } else if (x <= 207) {
      evaluation = "Dañina para la salud";
    } else if (x <= 393) {
      evaluation = "Muy dañina para la salud";
    } else {
      evaluation = "Peligrosa";
    }
    return evaluation;
  };

  const evaluateIca = {
    "PM 2.5": evaluateIcaPM25,
    "PM 10": evaluateIcaPM10,
    NO2: evaluateIcaNO2,
    O3: evaluateIcaO3,
    NOX: evaluateIcaNO2,
    NO: evaluateIcaNO2,
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
      <IoIosArrowDropdownCircle />
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

  function DropDownVariables({ activeStation }) {
    const { data } = useSWR(
      `https://www.piraguacorantioquia.com.co/api/v1/estaciones-aire/${activeStation}/parametros`,
      fetcher
    );

    useEffect(() => {
      handleVariablesData(data);
    }, [data]);

    return (
      <>
        {data ? (
          <Dropdown itemType="button" onSelect={handleSelectVariables}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              {dropDownSelectionVariables ||
                data["values"][0]["parametro_nombre"]}
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
              {data["values"].map((param, index) => {
                return (
                  <Dropdown.Item
                    eventKey={param["parametro_nombre"]}
                    key={param["parametro_nombre"]}
                    active={index === 0 ? true : false}
                  >
                    {param["parametro_nombre"]}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        ) : null}
      </>
    );
  }

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
                }[timeWindow]
              }
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
              <Dropdown.Item eventKey="24h" active={true}>
                Últimas 24 horas
              </Dropdown.Item>
              <Dropdown.Item eventKey="72h">Últimas 72 horas</Dropdown.Item>
              <Dropdown.Item eventKey="7d">Última semana</Dropdown.Item>
              <Dropdown.Item eventKey="30d">Últimos 30 días</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="dropdown-station-variables">
          <DropDownVariables activeStation={activeStation} />
        </div>

        <div className="station-panel-icon">
          <img
            src={
              stationsAirQuality &&
              activeStation &&
              airQualityActiveStationParameters &&
              dropDownSelectionVariables
                ? IconsAirQuality[
                    evaluateIca[dropDownSelectionVariables](
                      replaceNaN(
                        parseFloat(
                          filterValue(
                            airQualityActiveStationParameters["values"],
                            "parametro_nombre",
                            dropDownSelectionVariables
                          )["concentracion"]
                        )
                      )
                    )
                  ]
                : null
            }
            alt=""
            className="station-panel-icon-props"
          ></img>
        </div>
        <div
          className={
            stationsAirQuality &&
            activeStation &&
            airQualityActiveStationParameters
              ? "station-panel-variable " +
                AirQualityColor[
                  evaluateIca[dropDownSelectionVariables](
                    replaceNaN(
                      parseFloat(
                        filterValue(
                          airQualityActiveStationParameters["values"],
                          "parametro_nombre",
                          dropDownSelectionVariables
                        )["concentracion"]
                      ).toFixed(0)
                    )
                  )
                ]
              : "station-panel-variable"
          }
        >
          {stationsAirQuality &&
          activeStation &&
          dropDownSelectionVariables &&
          airQualityActiveStationParameters
            ? AirQualityEvaluation[
                evaluateIca[dropDownSelectionVariables](
                  replaceNaN(
                    parseFloat(
                      filterValue(
                        airQualityActiveStationParameters["values"],
                        "parametro_nombre",
                        dropDownSelectionVariables
                      )["concentracion"]
                    ).toFixed(0)
                  )
                )
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
              fontSize: "medium",
              boxSizing: "border-box",
              width: "120%",
              color: "#fff",
            }}
            onClick={handleClickPlot}
          >
            VER DATOS
          </Button>
        </div>
        <div className="station-panel-name">
          {/* {activeStation ? `Estación: ${String(activeStation)}` : null} */}
          Calidad del aire
        </div>
        <div className="close-button">
          <CloseButton onClick={handleClick} />
        </div>

        <div className="station-panel-value">
          {stationsAirQuality &&
          activeStation &&
          airQualityActiveStationParameters
            ? replaceNaN(
                parseFloat(
                  filterValue(
                    airQualityActiveStationParameters["values"],
                    "parametro_nombre",
                    dropDownSelectionVariables
                  )["concentracion"]
                ).toFixed(0)
              )
            : null}
        </div>
        <div className="station-panel-units">
          {stationsAirQuality && activeStation && dropDownSelectionVariables
            ? replaceNaN(
                filterValue(
                  stationsAirQuality["tipos"],
                  "nombre",
                  dropDownSelectionVariables
                )["unidad"]
              )
            : null}
        </div>
      </div>
    </>
  );
};

export default StationPanel;
