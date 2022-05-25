import React, { useEffect } from "react";
import { useContext, useState } from "react";
import moment from "moment";

import "leaflet/dist/leaflet.css";
import "../../App.css";
import ActiveStationContext from "../../Context/ActiveStationContext";
import ActiveStationAutomaticContext from "../../Context/ActiveStationAutomaticContext";
import StationsContext from "../../Context/StationsContext";
import AirQualityActiveStationParametersContext from "../../Context/AirQualityActiveStationParametersContext";
import OpenClosePlotPanelContext from "../../Context/OpenClosePlotPanelContext";
import TimeWindowAutomaticContext from "../../Context/TimeWindowAutomaticContext";
import Dropdown from "react-bootstrap/Dropdown";
import useSWR from "swr";
import axios from "axios";
import { CloseButton, Button } from "react-bootstrap";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import OpenCloseStationAutomaticPanelContext from "../../Context/OpenCloseStationAutomaticPanelContext";
import { IconosPaths } from "../../assets/IconosPaths";
import { Colors } from "../../assets/Colors";
import { Iconos } from "../../assets/IconosLeaflet.js";
import { evaluateVariableAutomatic } from "../../assets/Umbrales";
import { evaluateVariableAutomaticIcon } from "../../assets/UmbralesIconos";

const StationPanelAutomatic = () => {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

  const stations = useContext(StationsContext);
  const [variableValue, setVariableValue] = useState(null);

  const {
    airQualityActiveStationParameters,
    changeAirQualityActiveStationParameters,
  } = useContext(AirQualityActiveStationParametersContext);

  const { activeStationAutomatic, changeActiveStationAutomatic } = useContext(
    ActiveStationAutomaticContext
  );

  const {
    openCloseStationAutomaticPanel,
    changeOpenCloseStationAutomaticPanel,
  } = useContext(OpenCloseStationAutomaticPanelContext);

  const { changeOpenClosePlotPanel } = useContext(OpenClosePlotPanelContext);

  const { timeWindowAutomatic, changeTimeWindowAutomatic } = useContext(
    TimeWindowAutomaticContext
  );

  const handleSelect = (e) => {
    changeTimeWindowAutomatic(e);
  };

  const handleSelectVariables = (e) => {
    setDropDownSelectionVariables(e);
  };

  const handleClick = (e) => {
    changeOpenCloseStationAutomaticPanel(false);
    changeActiveStationAutomatic(null);
  };

  const handleClickPlot = (e) => {
    console.log("click");
    changeOpenClosePlotPanel(true);
  };

  const replaceNaN = (x) => {
    if (typeof x === "string") {
      return x;
    } else if (isNaN(x) || x === 0) {
      return "-";
    } else return x;
  };

  const units = {
    Lluvia: "mm",
    Nivel: "m",
    "Dir viento": "ºNorte",
    Humedad: "%",
    Radiación: "w/m2",
    Temp: "ºC",
    "Vel viento": "m/s",
  };

  const variablesAutomatic = {
    Pluviógrafo: ["Lluvia"],
    Limnígrafo: ["Nivel"],
    Meteorología: ["Temp", "Dir viento", "Humedad", "Radiación", "Vel viento"],
  };

  const [dropDownSelectionVariables, setDropDownSelectionVariables] = useState(
    stations["estaciones"] &&
      variablesAutomatic[
        stations["estaciones"].filter(
          (x) => x["codigo"] === activeStationAutomatic
        )[0]["tipo_nombre"]
      ][0]
  );

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

  function DropDownVariables({ variables }) {
    return (
      <>
        {variables ? (
          <Dropdown itemType="button" onSelect={handleSelectVariables}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              {dropDownSelectionVariables}
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
              {variables.map((param, index) => {
                return (
                  <Dropdown.Item
                    eventKey={param}
                    key={param}
                    active={index === 0 ? true : false}
                  >
                    {param}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        ) : null}
      </>
    );
  }

  function QueryAutomaticStation({
    activeStationAutomatic,
    variable,
    timeWindowAutomatic,
  }) {
    var curDate = new Date();

    const timeWindow2Hours = {
      "24h": 36,
      "30d": 24 * 30,
      "72h": 72,
      "7d": 7 * 24,
    };

    const startDate = moment(curDate.toISOString())
      .subtract(timeWindow2Hours[timeWindowAutomatic], "hours")
      .toISOString()
      .slice(0, 10);

    let endPoint = "https://www.piraguacorantioquia.com.co/api/v1/";

    const queryVariable = {
      Lluvia: `estaciones/${activeStationAutomatic}/precipitacion?calidad=1&random=${1}`,
      Nivel: `estaciones/${activeStationAutomatic}/nivel?calidad=1&random=${1}`,
      Temp: `estaciones/${activeStationAutomatic}/meteorologia?&random=${1}`,
    };

    endPoint += queryVariable[variable];

    switch (timeWindowAutomatic) {
      case "24h":
        endPoint += `&frecuencia=1&size=288&fecha__gte=${startDate}`;
        break;
      case "30d":
        endPoint += `&frecuencia=1&size=8640&fecha__gte=${startDate}`;
        break;
      case "72h":
        endPoint += `&frecuencia=1&size=864&fecha__gte=${startDate}`;
        break;
      case "7d":
        endPoint += `&frecuencia=1&size=2016&fecha__gte=${startDate}`;
        break;
    }

    const { data } = useSWR(endPoint, fetcher);
    if (variable === "Lluvia") {
      var variableValue = data
        ? data["results"]
            .map((x) => parseFloat(x["muestra"]))
            .reduce((partialSum, a) => partialSum + a, 0)
            .toFixed(0)
        : null;
    } else if (variable === "Nivel") {
      var variableValue = data
        ? Math.max(
            0,
            ...data["results"]
              .map((x) => parseFloat(x["muestra"]))
              .filter((x) => x >= 0 && x < 999 && isFinite(x))
          ).toFixed(1)
        : null;
    } else if (variable === "Temp") {
      var variableValue = data
        ? average(
            data["results"]
              .map((x) => parseFloat(x["temperatura"]))
              .filter((x) => x >= -50 && x < 100 && isFinite(x))
          ).toFixed(0)
        : null;
    }
    console.log(data);
    return variableValue ? (
      <>
        <div className="station-panel-value">{variableValue}</div>

        <div
          className={
            stations && activeStationAutomatic
              ? "station-panel-variable " +
                Colors[
                  evaluateVariableAutomaticIcon[variable](
                    variableValue,
                    timeWindowAutomatic
                  )
                ]
              : "station-panel-variable"
          }
        >
          {variable && variableValue && timeWindowAutomatic
            ? evaluateVariableAutomatic[variable](
                variableValue,
                timeWindowAutomatic
              )
            : null}
        </div>

        <div className="station-panel-icon">
          <img
            src={
              variable && activeStationAutomatic && variableValue
                ? IconosPaths[
                    evaluateVariableAutomaticIcon[variable](
                      variableValue,
                      timeWindowAutomatic
                    )
                  ]
                : null
            }
            alt=""
            className="station-panel-icon-props"
          ></img>
        </div>
      </>
    ) : null;
  }

  console.log(stations);

  return (
    <>
      <div
        className={`${
          openCloseStationAutomaticPanel ? "station-panel-control" : "hide"
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
                }[timeWindowAutomatic]
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
          {stations["estaciones"] && (
            <DropDownVariables
              variables={
                variablesAutomatic[
                  stations["estaciones"].filter(
                    (x) => x["codigo"] === activeStationAutomatic
                  )[0]["tipo_nombre"]
                ]
              }
            />
          )}
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
          {stations["estaciones"] &&
            stations["estaciones"].filter(
              (x) => x["codigo"] === activeStationAutomatic
            )[0]["tipo_nombre"]}
        </div>

        <div className="close-button">
          <CloseButton onClick={handleClick} />
        </div>

        {stations && activeStationAutomatic && timeWindowAutomatic && (
          <QueryAutomaticStation
            timeWindowAutomatic={timeWindowAutomatic}
            variable={dropDownSelectionVariables}
            activeStationAutomatic={activeStationAutomatic}
          ></QueryAutomaticStation>
        )}

        <div className="station-panel-units">
          {stations && activeStationAutomatic && dropDownSelectionVariables
            ? units[dropDownSelectionVariables]
            : null}
        </div>
      </div>
    </>
  );
};

export default StationPanelAutomatic;
