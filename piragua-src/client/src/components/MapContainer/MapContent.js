import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  LayersControl,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { useContext } from "react";

import BaseLayers from "../BaseLayers/BaseLayers";
import { baseLayersData } from "../../assets/MapBaseLayers";
import StationsAirQualityContext from "../../Context/StationsAirQualityContext";
import StationsLayer from "../PointLayers/StationsLayer";

const MapContent = () => {
  const position = [6.096583, -75.413861];
  const zoom = 11;

  return (
    <MapContainer center={position} zoom={zoom}>
      <LayersControl>
        <BaseLayers baseLayerData={baseLayersData} />

        <StationsLayer />
      </LayersControl>
    </MapContainer>
  );
};

export default MapContent;
