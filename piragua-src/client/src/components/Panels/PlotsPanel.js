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
import { CloseButton, Spinner } from "react-bootstrap";
import moment from "moment";
import useSWR from "swr";
import axios from "axios";
import { Alert } from "react-bootstrap";
import * as d3 from "d3";

const PlotsPanel = () => {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const icaStations = useContext(IcaStationsAirQualityContext);
  const icaUnits = useContext(IcaStationsUnitsContext);

  const { activeStation, changeActiveStation } =
    useContext(ActiveStationContext);

  const { openClosePlotPanel, changeOpenClosePlotPanel } = useContext(
    OpenClosePlotPanelContext
  );

  const handleClick = (e) => {
    changeOpenClosePlotPanel(false);
  };

  const final_date = moment(Date.parse("2021-09-01T11:53:00")).format(
    "YYYY-MM-DDTHH:00:00"
  );
  const initial_date = moment(Date.parse("2021-09-01T11:53:00"))
    .subtract(24, "hours")
    .format("YYYY-MM-DDTHH:00:00");

  console.log(
    `/api/v1/estaciones_aire/serie_tiempo?codigo=${activeStation}&fecha_inicial=${initial_date}&fecha_final=${final_date}&variable=${
      icaUnits && activeStation
        ? icaUnits[activeStation]["PM 2.5"] !== undefined
          ? "PM 2.5"
          : "PM 10"
        : null
    }`
  );
  // const { data: dataTimeSeries, error: errorTimeSeries } = useSWR(
  //   `/api/v1/estaciones_aire/serie_tiempo?codigo=${activeStation}&fecha_inicial=${initial_date}&fecha_final=${final_date}&variable=${
  //     icaUnits && activeStation
  //       ? icaUnits[activeStation]["PM 2.5"] !== undefined
  //         ? "PM 2.5"
  //         : "PM 10"
  //       : null
  //   }`,
  //   fetcher
  // );

  // const dataAirQualityTimeSeries =
  //   dataTimeSeries && !errorTimeSeries ? dataTimeSeries : {};

  // if (errorTimeSeries) {
  //   return (
  //     <Alert variant="danger">
  //       No ha sido posible obtener datos para esta estación
  //     </Alert>
  //   );
  // }

  // console.log(dataAirQualityTimeSeries);

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
      console.log(data);
      return data.map((d) => {
        return {
          date: d3.timeParse("%Y-%m-%dT%H:%M:%S-05:00")(d.fecha),
          value: parseFloat(d.valor),
        };
      });
    })
    .then(function (data) {
      console.log(data);

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
        .text("PM2.5 [µg/m³]");

      const colors = ["#3B8641", "#FFFF54", "#ED702D", "#EA3323", "#80418E"];

      const colorScale = d3
        .scaleThreshold()
        .domain([20, 37, 60, 80])
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

  return (
    <>
      <div className={`${openClosePlotPanel ? "plots-panel-control" : "hide"}`}>
        <div className="close-button">
          <CloseButton onClick={handleClick} />
        </div>

        <div className="plot-panel-title">
          {activeStation ? `Estación: ${String(activeStation)}` : null}
        </div>

        {/* <div className="plot-panel-title">
          {activeStation ? `Estación: ${String(activeStation)}` : null}
        </div> */}
        <div className="plot">
          <svg className="svg-canvas" />
        </div>
      </div>
    </>
  );
};

export default PlotsPanel;
