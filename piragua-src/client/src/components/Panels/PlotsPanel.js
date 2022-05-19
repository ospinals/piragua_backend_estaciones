import React from "react";
import { useContext, useEffect } from "react";

import "../../App.css";

import ActiveStationContext from "../../Context/ActiveStationContext";
import StationsAirQualityContext from "../../Context/StationsAirQualityContext";
import OpenClosePlotPanelContext from "../../Context/OpenClosePlotPanelContext";
import TimeWindowContext from "../../Context/TimeWindowContext";
import AirQualityActiveStationParametersContext from "../../Context/AirQualityActiveStationParametersContext";

import { CloseButton, Spinner } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import useSWR from "swr";

const PlotsPanel = () => {
  function filterValue(obj, key, value) {
    return obj.find(function (v) {
      return v[key] === value;
    });
  }

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
    Moderada: "Moderada",
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
      evaluation = "-";
    } else if (x <= 12) {
      evaluation = "Buena";
    } else if (x <= 37) {
      evaluation = "Moderada";
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
      evaluation = "-";
    } else if (x <= 54) {
      evaluation = "Buena";
    } else if (x <= 154) {
      evaluation = "Moderada";
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

  const evaluateIcaNO2 = (x) => {
    let evaluation = null;
    if (x === null || x === undefined) {
      evaluation = "-";
    } else if (x <= 100) {
      evaluation = "Buena";
    } else if (x <= 189) {
      evaluation = "Moderada";
    } else if (x <= 677) {
      evaluation = "HarmSensible";
    } else if (x <= 1221) {
      evaluation = "Harm";
    } else if (x <= 2349) {
      evaluation = "VeryHarm";
    } else {
      evaluation = "Dangerous";
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
      evaluation = "HarmSensible";
    } else if (x <= 207) {
      evaluation = "Harm";
    } else if (x <= 393) {
      evaluation = "VeryHarm";
    } else {
      evaluation = "Dangerous";
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

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { activeStation, changeActiveStation } =
    useContext(ActiveStationContext);

  const stationsAirQuality = useContext(StationsAirQualityContext);
  const { timeWindow } = useContext(TimeWindowContext);

  const { openClosePlotPanel, changeOpenClosePlotPanel } = useContext(
    OpenClosePlotPanelContext
  );

  const { airQualityActiveStationParameters } = useContext(
    AirQualityActiveStationParametersContext
  );

  const handleClick = (e) => {
    changeOpenClosePlotPanel(false);
  };

  function PlotVariable({ timeWindow, variable, activeStation, units }) {
    var curDate = new Date();

    const timeWindow2Hours = {
      "24h": 24,
      "30d": 24 * 30,
      "72h": 72,
      "7d": 7 * 24,
    };

    const endDate = moment(curDate.toISOString()).format("YYYY-MM-DDTHH:00:00");
    const startDate =
      moment(curDate.toISOString())
        .subtract(timeWindow2Hours[timeWindow], "hours")
        .toISOString()
        .slice(0, 14)
        .replace("T", ":") + "00";

    const endPoint = `https://www.piraguacorantioquia.com.co/api/v1/estaciones-aire/${activeStation}/parametros/${variable}?random=${1}&calidad=1&size=${288}&fecha__gte=${startDate}`;

    const { data } = useSWR(endPoint, fetcher);

    return (
      <>
        <div
          className="icons-plot-container"
          key={`${activeStation}${variable}${startDate}`}
        >
          {data ? (
            <div className="header-plot">
              {
                {
                  O3: "Ozono",
                  NOX: "Óxido de Nitrogeno",
                  NO: "Mónoxido de Nitrogeno",
                  NO2: "Dióxido de Nitrogeno",
                  "PM 2.5": "PM 2.5",
                  "PM 10": "PM 10",
                }[data["label"].split(" (")[0]]
              }
            </div>
          ) : null}
          {data
            ? data["results"].map((dat) => {
                return (
                  <div className="icon-plot-div">
                    <p className="text-icon-plots-time">
                      {moment(Date.parse(dat["fecha"].replace(/-/g, "/")))
                        .format("ddd d - h A")
                        .replace("Tue", "Ma")
                        .replace("Thu", "Ju")
                        .replace("Wed", "Mi")
                        .replace("Fri", "Vi")
                        .replace("Mon", "Lu")
                        .replace("Sat", "Sa")
                        .replace("Sun", "Do")}
                    </p>
                    <img
                      src={
                        IconsAirQuality[
                          evaluateIca[data["label"].split(" (")[0]](
                            parseFloat(dat["muestra"])
                          )
                        ]
                      }
                      alt=""
                      className="icon-plot"
                    />
                    <p className="text-icon-plots">
                      {replaceNaN(Math.round(parseFloat(dat["muestra"])))}{" "}
                      {units}
                    </p>
                  </div>
                );
              })
            : null}
        </div>
      </>
    );
  }

  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

  return (
    <>
      <div className={`${openClosePlotPanel ? "plots-panel-control" : "hide"}`}>
        <div className="plot-panel-title">
          {activeStation ? (
            <>
              Estación:{" "}
              <span style={{ color: "#000", fontWeight: 800 }}>
                {String(activeStation)}
              </span>
            </>
          ) : null}
        </div>
        <div className="close-button-plots">
          <CloseButton onClick={handleClick} />
        </div>
        {console.log(airQualityActiveStationParameters)}
        <div className="plot">
          {airQualityActiveStationParameters &&
            airQualityActiveStationParameters["values"].map((parameter) => {
              return (
                <PlotVariable
                  variable={parameter["parametro_id"]}
                  timeWindow={timeWindow}
                  activeStation={activeStation}
                  units={
                    stationsAirQuality["tipos"]
                      ? replaceNaN(
                          filterValue(
                            stationsAirQuality["tipos"],
                            "nombre",
                            parameter["parametro_nombre"]
                          )["unidad"]
                        )
                      : null
                  }
                  key={`${activeStation}${parameter["parametro_id"]}${Date()}`}
                ></PlotVariable>
              );
            })}
        </div>

        <div className="plot-legend">
          <p className="plot-legend">
            <img src="Location.png" className="location-icon-plot" alt="" />{" "}
            <strong style={{ color: "#6394cf", fontSize: "medium" }}>
              Locación:
            </strong>{" "}
            {replaceNaN(
              filterValue(
                stationsAirQuality["estaciones"],
                "codigo",
                activeStation
              )["municipio_nombre"]
            )}
          </p>
          <p className="plot-legend">
            <img src="Coordenadas.png" className="location-icon-plot" alt="" />{" "}
            <strong style={{ color: "#6394cf", fontSize: "medium" }}>
              Coordenadas:
            </strong>{" "}
            {` (${replaceNaN(
              parseFloat(
                filterValue(
                  stationsAirQuality["estaciones"],
                  "codigo",
                  activeStation
                )["latitud"]
              ).toFixed(3)
            )}, ${replaceNaN(
              parseFloat(
                filterValue(
                  stationsAirQuality["estaciones"],
                  "codigo",
                  activeStation
                )["longitud"]
              ).toFixed(3)
            )})`}
          </p>
          <p className="plot-legend">
            <img
              src="Concentración.png"
              className="location-icon-plot"
              alt=""
            />{" "}
            <strong style={{ color: "#6394cf", fontSize: "medium" }}>
              Concentración PM 2.5:
            </strong>{" "}
            {replaceNaN(
              filterValue(
                stationsAirQuality["estaciones"],
                "codigo",
                activeStation
              )["concentracion"]
            ).toFixed(1)}{" "}
            ug/m3
          </p>
          <p className="plot-legend">
            {replaceNaN(
              filterValue(
                stationsAirQuality["estaciones"],
                "codigo",
                activeStation
              )["norma"]
            )}
          </p>
          <p className="plot-legend">
            {replaceNaN(
              filterValue(
                stationsAirQuality["estaciones"],
                "codigo",
                activeStation
              )["cumple"]
            )}
          </p>
        </div>
        <div>
          <img src="piragua.png" className="logos" alt=""></img>
        </div>
      </div>
    </>
  );
};

export default PlotsPanel;
