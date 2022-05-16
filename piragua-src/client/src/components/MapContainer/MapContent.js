import React from "react";
import { MapContainer, LayersControl } from "react-leaflet";
import useSWR from "swr";
import axios from "axios";
import { Alert, Spinner } from "react-bootstrap";
import { useState, useRef } from "react";

import BaseLayers from "../BaseLayers/BaseLayers";
import { baseLayersData } from "../../assets/MapBaseLayers";
import StationsLayer from "../PointLayers/StationsLayer";
import LocateControl from "./LocateControl";
import StationPanel from "../Panels/StationPanel";
import LegendControl from "./LegendControl";
import PlotsPanel from "../Panels/PlotsPanel";
import PolygonLayer from "../PolygonsLayer/Polygons";

import StationsAirQualityContext from "../../Context/StationsAirQualityContext";
import ActiveStationContext from "../../Context/ActiveStationContext";
import StationsContext from "../../Context/StationsContext";
import MapContext from "../../Context/MapContext";
import OpenCloseStationPanelContext from "../../Context/OpenCloseStationPanelContext";
import AirQualityTimeSeriesContext from "../../Context/AirQualityTimeSeriesContext";
import OpenClosePlotPanelContext from "../../Context/OpenClosePlotPanelContext";
import AirQualityActiveStationParametersContext from "../../Context/AirQualityActiveStationParametersContext";
import TimeWindowContext from "../../Context/TimeWindowContext";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const MapContent = () => {
  const position = [6.2366666666667, -75.580277777778];
  const zoom = 9;
  const [map, setMap] = useState(null);

  const [activeStation, setActiveStation] = useState(null);
  const changeActiveStation = (x) => setActiveStation(x);

  const [
    airQualityActiveStationParameters,
    setAirQualityActiveStationParameters,
  ] = useState(null);
  const changeAirQualityActiveStationParameters = (x) =>
    setAirQualityActiveStationParameters(x);

  const [airQualityTimeSeries, setAirQualityTimeSeries] = useState(null);
  const changeAirQualityTimeSeries = (x) => setAirQualityTimeSeries(x);

  const [openCloseStationPanel, setOpenCloseStationPanel] = useState(false);
  const changeOpenCloseStationPanel = (x) => setOpenCloseStationPanel(x);

  const [openClosePlotPanel, setOpenClosePlotPanel] = useState(false);
  const changeOpenClosePlotPanel = (x) => setOpenClosePlotPanel(x);

  const [timeWindow, setTimeWindow] = useState("24h");
  const changeTimeWindow = (x) => setTimeWindow(x);

  /// Get Datetime to know when to fetch data again and re render the app
  const [state, setState] = useState({ num: 0 });
  const counter = useRef(0);

  // useEffect(() => {
  //   if (counter.current < 10) {
  //     counter.current += 1;
  //     const timer = setTimeout(() => setState({ num: state.num + 1 }), 1000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [state]);

  //// Load Data for app

  const {
    data: dataPolygonsTerritoriales,
    error: errorDataPolygonsTerritoriales,
  } = useSWR(
    "https://www.piraguacorantioquia.com.co/api/v1/localizacion/territoriales",
    fetcher
  );

  const polygonsTerritoriales =
    dataPolygonsTerritoriales && !errorDataPolygonsTerritoriales
      ? dataPolygonsTerritoriales
      : {};

  const { data: dataStationsAirQuality, error: errorStationsAirQuality } =
    useSWR(
      "https://www.piraguacorantioquia.com.co/api/v1/estaciones-aire?tipo=198",
      fetcher,
      { refreshInterval: 1000 }
    );

  const stationsAirQuality =
    dataStationsAirQuality && !errorStationsAirQuality
      ? dataStationsAirQuality
      : {};

  // const { data: dataStations, error: errorStations } = useSWR(
  //   "/api/v1/estaciones",
  //   fetcher
  // );

  // const stations = dataStations && !errorStations ? dataStations : {};

  const stations = null;

  // const { data: dataIcaStations, error: errorIcaStations } = useSWR(
  //   "/api/v1/estaciones_aire/ica_estaciones?fecha=2021-09-01T09:53:00",
  //   fetcher
  // );

  // const icaStations =
  //   dataIcaStations && !errorIcaStations ? dataIcaStations : {};

  // Pluvio

  if (errorStationsAirQuality) {
    return <Alert variant="danger">There is a problem</Alert>;
  }
  if (!dataStationsAirQuality) {
    return (
      <Spinner
        animation="border"
        variant="primary"
        role="status"
        style={{
          width: "300px",
          height: "300px",
          margin: "auto",
          margintop: "20%",
          display: "block",
        }}
      />
    );
  }

  //// Main Render of map content
  return (
    <MapContext.Provider value={map}>
      <ActiveStationContext.Provider
        value={{ activeStation, changeActiveStation }}
      >
        <OpenCloseStationPanelContext.Provider
          value={{ openCloseStationPanel, changeOpenCloseStationPanel }}
        >
          <OpenClosePlotPanelContext.Provider
            value={{ openClosePlotPanel, changeOpenClosePlotPanel }}
          >
            <TimeWindowContext.Provider
              value={{ timeWindow, changeTimeWindow }}
            >
              {/* <StationsContext.Provider value={stations}> */}
              <AirQualityActiveStationParametersContext.Provider
                value={{
                  airQualityActiveStationParameters,
                  changeAirQualityActiveStationParameters,
                }}
              >
                <StationsAirQualityContext.Provider value={stationsAirQuality}>
                  <AirQualityTimeSeriesContext.Provider
                    value={{ airQualityTimeSeries, changeAirQualityTimeSeries }}
                  >
                    <MapContainer
                      center={position}
                      zoom={zoom}
                      whenCreated={setMap}
                    >
                      <LayersControl>
                        <BaseLayers baseLayerData={baseLayersData} />
                        <StationsLayer />
                        <PolygonLayer
                          layerData={polygonsTerritoriales}
                          layerName="Territoriales"
                          reversePolygon={true}
                        />
                      </LayersControl>
                      <LocateControl />
                      <LegendControl />
                      {activeStation && <StationPanel />}
                      {activeStation && timeWindow && <PlotsPanel />}
                    </MapContainer>
                  </AirQualityTimeSeriesContext.Provider>
                </StationsAirQualityContext.Provider>
              </AirQualityActiveStationParametersContext.Provider>
              {/* </StationsContext.Provider> */}
            </TimeWindowContext.Provider>
          </OpenClosePlotPanelContext.Provider>
        </OpenCloseStationPanelContext.Provider>
      </ActiveStationContext.Provider>
    </MapContext.Provider>
  );
};

export default MapContent;
