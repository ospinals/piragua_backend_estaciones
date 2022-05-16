import React from "react";
import { useContext, useState } from "react";

import "../../App.css";

import ActiveStationContext from "../../Context/ActiveStationContext";
import StationsAirQualityContext from "../../Context/StationsAirQualityContext";
import OpenClosePlotPanelContext from "../../Context/OpenClosePlotPanelContext";
import TimeWindowContext from "../../Context/TimeWindowContext";
import { CloseButton, Spinner } from "react-bootstrap";
import moment from "moment";
import axios from "axios";

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

  const evaluateIca = { "PM 2.5": evaluateIcaPM25, "PM 10": evaluateIcaPM10 };

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { activeStation, changeActiveStation } =
    useContext(ActiveStationContext);

  const stationsAirQuality = useContext(StationsAirQualityContext);
  const { timeWindow } = useContext(TimeWindowContext);

  const { openClosePlotPanel, changeOpenClosePlotPanel } = useContext(
    OpenClosePlotPanelContext
  );

  const handleClick = (e) => {
    changeOpenClosePlotPanel(false);
  };

  const final_date = moment(Date.parse("2021-09-01T09:53:00")).format(
    "YYYY-MM-DDTHH:00:00"
  );
  const initial_date = moment(Date.parse("2021-09-01T09:53:00"))
    .subtract(timeWindow, "hours")
    .format("YYYY-MM-DDTHH:00:00");

  console.log(stationsAirQuality);
  console.log(timeWindow);

  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

  return (
    <>
      <div className={`${openClosePlotPanel ? "plots-panel-control" : "hide"}`}>
        <div className="plot-panel-title">
          {activeStation ? `Estación: ${String(activeStation)}` : null}
        </div>
        <div className="close-button-plots">
          <CloseButton onClick={handleClick} />
        </div>

        <div className="plot">
          <div className="icons-plot-container"></div>
          <div className="icons-plot-container"></div>
          <div className="icons-plot-container"></div>
          <div className="icons-plot-container"></div>
        </div>

        <div className="plot-legend">
          <p class="plot-legend">
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
          <p class="plot-legend">
            <strong style={{ color: "#6394cf", fontSize: "medium" }}>
              Coordenadas:
            </strong>{" "}
            {` (${replaceNaN(
              filterValue(
                stationsAirQuality["estaciones"],
                "codigo",
                activeStation
              )["latitud"]
            )}, ${replaceNaN(
              filterValue(
                stationsAirQuality["estaciones"],
                "codigo",
                activeStation
              )["longitud"]
            )})`}
          </p>
          <p class="plot-legend">
            <strong style={{ color: "#6394cf", fontSize: "medium" }}>
              Concentración:
            </strong>{" "}
            {replaceNaN(
              filterValue(
                stationsAirQuality["estaciones"],
                "codigo",
                activeStation
              )["concentracion"]
            )}{" "}
            ug/m3
          </p>
          <p class="plot-legend">
            {replaceNaN(
              filterValue(
                stationsAirQuality["estaciones"],
                "codigo",
                activeStation
              )["norma"]
            )}
          </p>
          <p class="plot-legend">
            {replaceNaN(
              filterValue(
                stationsAirQuality["estaciones"],
                "codigo",
                activeStation
              )["cumple"]
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default PlotsPanel;
