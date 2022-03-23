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
import useSWR from "swr";
import axios from "axios";
import { Alert, Spinner } from "react-bootstrap";

import BaseLayers from "../BaseLayers/BaseLayers";
import { baseLayersData } from "../../assets/MapBaseLayers";
import StationsLayer from "../PointLayers/StationsLayer";

import StationsAirQualityContext from "../../Context/StationsAirQualityContext";
import ActiveStationContext from "../../Context/ActiveStationContext";
import StationsContext from "../../Context/StationsContext";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const MapContent = () => {
  const position = [6.096583, -75.413861];
  const zoom = 11;

  const { data: dataStationsAirQuality, error: errorStationsAirQuality } =
    useSWR("/api/v1/estaciones_aire", fetcher);

  const stationsAirQuality =
    dataStationsAirQuality && !errorStationsAirQuality
      ? dataStationsAirQuality
      : {};

  const { data: dataStations, error: errorStations } = useSWR(
    "/api/v1/estaciones",
    fetcher
  );

  const stations = dataStations && !errorStations ? dataStations : {};

  if (errorStationsAirQuality || errorStations) {
    return <Alert variant="danger">There is a problem</Alert>;
  }
  if (!dataStations || !dataStationsAirQuality) {
    return (
      <Spinner
        animation="border"
        variant="danger"
        role="status"
        style={{
          width: "300px",
          height: "300px",
          margin: "auto",
          display: "block",
        }}
      />
    );
  }

  return (
    <ActiveStationContext.Provider value={null}>
      <StationsContext.Provider value={stations}>
        <StationsAirQualityContext.Provider value={stationsAirQuality}>
          <MapContainer center={position} zoom={zoom} tapTolerance={500}>
            <LayersControl>
              <BaseLayers baseLayerData={baseLayersData} />
              <StationsLayer />
            </LayersControl>
          </MapContainer>
        </StationsAirQualityContext.Provider>
      </StationsContext.Provider>
    </ActiveStationContext.Provider>
  );
};

export default MapContent;
