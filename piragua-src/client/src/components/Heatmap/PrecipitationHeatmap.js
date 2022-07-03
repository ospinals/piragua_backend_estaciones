import L from "leaflet";
import "leaflet.heat";
// import "leaflet-contour";
import "./Contour.js";
import React from "react";
import { useEffect } from "react";
import { LayersControl, LayerGroup } from "react-leaflet";
import { useContext } from "react";
import { useLeafletContext } from "@react-leaflet/core";

const PrecipitationHeatmap = () => {
  const { layerContainer, map } = useLeafletContext();
  const container = layerContainer || map;

  const data = 1;
  function getColor(value) {
    let color = null;

    if (value <= 1) {
      color = "#04e9e7";
    } else if (value <= 5) {
      color = "#019ff4";
    } else if (value <= 10) {
      color = "#0300f4";
    } else if (value <= 20) {
      color = "#02fd02";
    } else if (value <= 30) {
      color = "#01c501";
    } else if (value <= 40) {
      color = "#008e00";
    } else if (value <= 50) {
      color = "#fdf802";
    } else if (value <= 60) {
      color = "#e5bc00";
    } else if (value <= 80) {
      color = "#fd9500";
    } else if (value <= 100) {
      color = "#fd0000";
    } else if (value <= 120) {
      color = "#d40000";
    } else if (value <= 150) {
      color = "#bc0000";
    } else if (value <= 200) {
      color = "#f800fd";
    } else if (value <= 250) {
      color = "#9854c6";
    } else if (value <= 300) {
      color = "#fdfdfd";
    }
    return color;
  }

  //   const heatmap = L.heatLayer(points, { max: 400, minOpacity: 0 }).addTo(map);
  //   const contour = L.contour(data).addTo(map);

  const contour = L.contour(data, {
    thresholds: 20,
    style: (feature) => {
      return {
        color: getColor(feature.geometry.value),
        opacity: 1,
        fillOpacity: 1,
      };
    },
    onEachFeature: onEachContour(),
  }).addTo(map);

  function onEachContour() {
    return function onEachFeature(feature, layer) {
      layer.bindPopup(
        `<table><tbody><tr><td>${feature.value}mm</td></tr></tbody></table>`
      );
    };
  }

  container.addLayer(contour);

  return null;
};

export default PrecipitationHeatmap;

// var heat = L.heatLayer(addressPoints, {
//   radius: 25, // default value
//   blur: 15, // default value
//   gradient: { 1: "red" }, // Values can be set for a scale of 0-1
// }).addTo(map);
