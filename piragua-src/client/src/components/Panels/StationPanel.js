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
    useState(null);

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

  const { openClosePlotPanel, changeOpenClosePlotPanel } = useContext(
    OpenClosePlotPanelContext
  );

  const { timeWindow, changeTimeWindow } = useContext(TimeWindowContext);

  const handleSelect = (e) => {
    console.log(e);
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
    } else if (isNaN(x)) {
      return "-";
    } else return x;
  };

  const IconsAirQuality = {
    "-": "/iconos-aire/azul.svg",
    Buena: "/iconos-aire/verde.svg",
    Moderada: "/iconos-aire/amarillo.svg",
    Dangerous: "/iconos-aire/marron.svg",
    Harm: "/iconos-aire/rojo.svg",
    HarmSensible: "/iconos-aire/naranja.svg",
    VeryHarm: "/iconos-aire/morado.svg",
  };

  const AirQualityEvaluation = {
    "-": "No Data",
    Buena: "Buena",
    Moderada: "Aceptable",
    Dangerous: "Peligrosa",
    Harm: "Dañina",
    HarmSensible: "Grupos sensibles",
    VeryHarm: "Muy dañina",
  };

  const AirQualityColor = {
    "-": "nodata",
    Buena: "green",
    Moderada: "yellow",
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
      evaluation = "Buena";
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
      evaluation = "Buena";
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

  // const evaluateIca = { "PM 2.5": evaluateIcaPM25, "PM 10": evaluateIcaPM10 };

  // function {
  // const {
  //   data: dataAirQualityActiveStationParameters,
  //   error: errorAirQualityActiveStationParameters,
  // } = useSWR(
  //   activeStation
  //     ? `https://www.piraguacorantioquia.com.co/api/v1/estaciones-aire/${activeStation}/parametros`
  //     : null,
  //   fetcher,
  //   { suspense: true }
  // );
  // }

  // useEffect(() => {
  //   activeStation && dataAirQualityActiveStationParameters
  //     ? changeAirQualityActiveStationParameters(
  //         dataAirQualityActiveStationParameters
  //       )
  //     : changeAirQualityActiveStationParameters(null);
  // }, [activeStation]);

  // console.log(airQualityActiveStationParameters);

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
  console.log(airQualityActiveStationParameters);

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
              stationsAirQuality && activeStation
                ? IconsAirQuality[
                    replaceNaN(
                      filterValue(
                        stationsAirQuality["estaciones"],
                        "codigo",
                        activeStation
                      )["categoria"]
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
            stationsAirQuality && activeStation
              ? "station-panel-variable " +
                AirQualityColor[
                  replaceNaN(
                    filterValue(
                      stationsAirQuality["estaciones"],
                      "codigo",
                      activeStation
                    )["categoria"]
                  )
                ]
              : "station-panel-variable"
          }
        >
          {stationsAirQuality && activeStation
            ? AirQualityEvaluation[
                replaceNaN(
                  filterValue(
                    stationsAirQuality["estaciones"],
                    "codigo",
                    activeStation
                  )["categoria"]
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
          {activeStation ? `Estación: ${String(activeStation)}` : null}
        </div>
        <div className="close-button">
          <CloseButton onClick={handleClick} />
        </div>
        <div className="station-panel-value">
          {stationsAirQuality && activeStation
            ? replaceNaN(
                Math.round(
                  parseFloat(
                    filterValue(
                      stationsAirQuality["estaciones"],
                      "codigo",
                      activeStation
                    )["concentracion"]
                  ),
                  0
                )
              )
            : null}
        </div>
        <div className="station-panel-units">
          {stationsAirQuality && activeStation ? "ug/m3" : null}
        </div>
      </div>
    </>
  );
};

export default StationPanel;
