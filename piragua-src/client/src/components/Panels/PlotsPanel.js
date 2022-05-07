import React from "react";
import { useContext, useState } from "react";

import "../../App.css";

import MapContext from "../../Context/MapContext";
import ActiveStationContext from "../../Context/ActiveStationContext";
import OpenCloseStationPanelContext from "../../Context/OpenCloseStationPanelContext";
import IcaStationsAirQualityContext from "../../Context/IcaStationsAirQualityContext";
import StationsAirQualityContext from "../../Context/StationsAirQualityContext";
import OpenClosePlotPanelContext from "../../Context/OpenClosePlotPanelContext";
import IcaStationsUnitsContext from "../../Context/IcaStationsUnitsContext";
import StationsAirQualityMetaDataContext from "../../Context/StationsAirQualityMetaDataContext";
import { CloseButton, Spinner } from "react-bootstrap";
import moment from "moment";
import useSWR from "swr";
import axios from "axios";
import { Alert } from "react-bootstrap";
import * as d3 from "d3";

const PlotsPanel = () => {
  const replaceNaN = (x) => {
    if (isNaN(x)) {
      return "-";
    } else return x;
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

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const icaStations = useContext(IcaStationsAirQualityContext);
  const icaUnits = useContext(IcaStationsUnitsContext);

  const { activeStation, changeActiveStation } =
    useContext(ActiveStationContext);

  const stationsAirQualityMetaData = useContext(
    StationsAirQualityMetaDataContext
  );

  const { openClosePlotPanel, changeOpenClosePlotPanel } = useContext(
    OpenClosePlotPanelContext
  );

  console.log(stationsAirQualityMetaData);

  const handleClick = (e) => {
    changeOpenClosePlotPanel(false);
  };

  const final_date = moment(Date.parse("2021-09-01T09:53:00")).format(
    "YYYY-MM-DDTHH:00:00"
  );
  const initial_date = moment(Date.parse("2021-09-01T09:53:00"))
    .subtract(24, "hours")
    .format("YYYY-MM-DDTHH:00:00");

  const margin = { top: 50, right: 30, bottom: 70, left: 80 },
    width = 340 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg =
    // .select("#my_dataviz")
    // .append("svg")
    d3
      .select(".svg-canvas")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
  svg
    .selectAll("*")
    .remove()
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  d3.json(
    `/api/v1/estaciones_aire/serie_tiempo?codigo=${activeStation}&fecha_inicial=${initial_date}&fecha_final=${final_date}&variable=${
      icaUnits && activeStation
        ? icaUnits[activeStation]["PM 2.5"] !== undefined
          ? "PM 2.5"
          : "PM 10"
        : null
    }`
  )
    .then((data) => {
      return data.map((d) => {
        return {
          date: d3.timeParse("%Y-%m-%dT%H:%M:%S-05:00")(d.fecha),
          value: parseFloat(d.valor),
        };
      });
    })
    .then(function (data) {
      const x = d3
        .scaleTime()
        .domain(
          d3.extent(data, function (d) {
            return d.date;
          })
        )
        .range([width / data.length / 2, width - width / data.length / 2]);

      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        // .attr("class", "customFont2")
        .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%b-%d %H")));

      const maxy =
        1.2 *
        d3.max(data, function (d) {
          return +d.value;
        });

      // Add Y axis
      const yAxis = d3.scaleLinear().domain([0, maxy]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(yAxis));

      // svg
      //   .append("text")
      //   .attr("class", "customFont1")
      //   .attr("x", width / 2)
      //   .attr("y", margin.top / 5)
      //   .attr("text-anchor", "middle")
      //   .text("Estación ENV-EIA");

      svg
        .append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -30)
        .attr("x", -105)
        // .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .attr("class", "customFont2")
        .text(
          `${
            icaUnits && activeStation
              ? icaUnits[activeStation]["PM 2.5"] !== undefined
                ? "PM 2.5"
                : "PM 10"
              : null
          } [µg/m³]`
        );

      const colors = [
        "#4eaa01",
        "#eaca2c",
        "#db6e0b",
        "#9f0100",
        "#620096",
        "#662809",
      ];

      const colorScale = d3
        .scaleThreshold()
        .domain(
          icaUnits && activeStation
            ? icaUnits[activeStation]["PM 2.5"] !== undefined
              ? [12.01, 37.01, 55.01, 150.01, 250.01]
              : [54.01, 154.01, 254.01, 354.01, 424.01]
            : null
        )
        .range(colors);

      // append the rectangles for the bar chart
      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .style("stroke", "black")
        .style("stroke-width", "0.2")
        .attr("class", "bar")
        .attr("fill", function (d) {
          return colorScale(d.value);
        })
        .attr("x", function (d) {
          return x(d.date) - width / data.length / 2;
        })
        .attr("width", width / data.length / 1.2)
        .attr("y", function (d) {
          return yAxis(d.value);
        })

        .attr("height", function (d) {
          return height - yAxis(d.value);
        });
    });

  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

  return (
    <>
      <div className={`${openClosePlotPanel ? "plots-panel-control" : "hide"}`}>
        <div class="plot-panel-title">
          {activeStation ? `Estación: ${String(activeStation)}` : null}
        </div>
        <div class="close-button">
          <CloseButton onClick={handleClick} />
        </div>
        <div class="plot">
          {activeStation ? <svg className="svg-canvas" /> : null}
        </div>
        <div class="plot-legend">
          {activeStation && stationsAirQualityMetaData ? (
            <div>
              <p>
                <strong>Código: </strong>
                {`${stationsAirQualityMetaData[activeStation]["codigo"]}`}
              </p>
              <p>
                <strong>Locación: </strong>
                {`${replaceNaN(
                  stationsAirQualityMetaData[activeStation]["locacion"]
                )}`}
              </p>
              <p>
                <strong>Municipio: </strong>
                {`${stationsAirQualityMetaData[activeStation]["municipio"]}`}
              </p>
              <p>
                <strong>Coordenadas: </strong>
                {`(${stationsAirQualityMetaData[activeStation]["latitud"]}, ${stationsAirQualityMetaData[activeStation]["longitud"]})`}
              </p>
              <p>
                <strong>Promedio 24h: </strong>
                {/* {`(${average(data.value)})`} */}
                <a
                  className={
                    icaStations && activeStation
                      ? icaStations[activeStation]["PM 2.5"] !== undefined
                        ? "station-panel-variable " +
                          AirQualityColor[
                            evaluateIca["PM 2.5"](
                              icaStations[activeStation]["PM 2.5"]
                            )
                          ]
                        : "station-panel-variable " +
                          AirQualityColor[
                            evaluateIca["PM 10"](
                              icaStations[activeStation]["PM 10"]
                            )
                          ]
                      : "station-panel-variable"
                  }
                >
                  23
                </a>
                {`Moderada`}
              </p>
              <p>
                <strong>Norma 24h: </strong>
                {`${stationsAirQualityMetaData[activeStation]["limite_norma"]} [µg/m³]`}
              </p>
              <p>
                <strong>Cumple Norma? </strong>
                {`Si`}
              </p>
            </div>
          ) : (
            "No se encuentran datos para esta estación"
          )}
        </div>
      </div>
    </>
  );
};

export default PlotsPanel;
