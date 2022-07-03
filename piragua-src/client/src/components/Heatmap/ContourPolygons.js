import React from "react";
import { Polygon, Tooltip } from "react-leaflet";

const ContourPolygons = (data) => {
  const data1 = 1;

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

  const zip = (...arr) =>
    Array(Math.max(...arr.map((a) => a.length)))
      .fill()
      .map((_, i) => arr.map((a) => a[i]));

  function Heatmap(data) {
    return zip(data1.x, data1.y, data1.z).map((d) => {
      const upper_right = [d[1] + 0.003, d[0] + 0.003];
      const upper_left = [d[1] - 0.003, d[0] + 0.003];
      const bottom_right = [d[1] + 0.003, d[0] - 0.003];
      const bottom_left = [d[1] - 0.003, d[0] - 0.003];

      const positions = [upper_right, upper_left, bottom_left, bottom_right];

      const pathOptions = {
        fillColor: getColor(d[2]),
        fillOpacity: 0.8,
        color: null,
        // opacity: 0.8,
      };

      return (
        <>
          <Polygon pathOptions={pathOptions} positions={positions}>
            <Tooltip sticky>{d[2]}mm</Tooltip>
          </Polygon>
        </>
      );
    });
  }

  return (
    <>
      <Heatmap data={data1} />
    </>
  );
};

export default ContourPolygons;
