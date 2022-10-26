import React, { Fragment, useContext } from "react";
import { LayersControl, LayerGroup, Polygon, Tooltip } from "react-leaflet";

const isMultiPolygon = (polygon) => Array.isArray(polygon[0][0]);

const revertPoint = (pointCoords) => [pointCoords[1], pointCoords[0]];

const revertPolygon = (polygon) => {
  if (!isMultiPolygon(polygon)) {
    return polygon.map(revertPoint);
  } else {
    return polygon.map((monoPolygon) => monoPolygon.map(revertPoint));
  }
};

const PolygonLayer = ({
  layerData,
  layerName,
  reversePolygon = false,
  color = "#069292",
  lineWidth = 2,
  fillOpacity = 0.2,
}) => {
  /* ** SET HOOKS ****************************************************************************** */

  /* ** MAIN RENDER  *************************************************************************** */
  console.log(layerData);
  return (
    <LayersControl.Overlay checked name={layerName}>
      <LayerGroup name={layerName}>
        {layerData["values"].map((poly) => {
          /* points in geojson are in [lat, lon] (or [y, x]) - need to be inverted */
          const polygon = reversePolygon
            ? revertPolygon(poly["poly"]["coordinates"])
            : poly["poly"]["coordinates"];

          /* build polygons */
          return (
            <Polygon
              pathOptions={{
                color: poly.color ? poly.color : color,
                weight: poly.lineWidth ? poly.lineWidth : lineWidth,
                fillOpacity: poly.fillOpacity ? poly.fillOpacity : fillOpacity,
              }}
              positions={polygon}
              key={poly.id}
            >
              <Tooltip className="tooltip-title">
                {/* <strong className="tooltip-title">Territorial</strong>
                <p className="tooltip-text">{poly.nombre}</p> */}
                {poly.nombre}
              </Tooltip>
            </Polygon>
          );
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

export default PolygonLayer;
