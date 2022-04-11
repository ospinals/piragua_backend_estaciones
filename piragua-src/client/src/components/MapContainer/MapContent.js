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

import StationsAirQualityContext from "../../Context/StationsAirQualityContext";
import ActiveStationContext from "../../Context/ActiveStationContext";
import StationsContext from "../../Context/StationsContext";
import MapContext from "../../Context/MapContext";
import OpenCloseStationPanelContext from "../../Context/OpenCloseStationPanelContext";
import IcaStationsAirQualityContext from "../../Context/IcaStationsAirQualityContext";
import IcaStationsUnitsContext from "../../Context/IcaStationsUnitsContext";
import AirQualityTimeSeriesContext from "../../Context/AirQualityTimeSeriesContext";
import OpenClosePlotPanelContext from "../../Context/OpenClosePlotPanelContext";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const MapContent = () => {
  const position = [6.2366666666667, -75.580277777778];
  const zoom = 9;
  const [map, setMap] = useState(null);

  const [activeStation, setActiveStation] = useState(null);
  const changeActiveStation = (x) => setActiveStation(x);

  const [airQualityTimeSeries, setAirQualityTimeSeries] = useState(null);
  const changeAirQualityTimeSeries = (x) => setAirQualityTimeSeries(x);

  const [openCloseStationPanel, setOpenCloseStationPanel] = useState(false);
  const changeOpenCloseStationPanel = (x) => setOpenCloseStationPanel(x);

  const [openClosePlotPanel, setOpenClosePlotPanel] = useState(false);
  const changeOpenClosePlotPanel = (x) => setOpenClosePlotPanel(x);

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
  const { data: dataStationsAirQuality, error: errorStationsAirQuality } =
    useSWR("/api/v1/estaciones_aire", fetcher);

  const stationsAirQuality =
    dataStationsAirQuality && !errorStationsAirQuality
      ? dataStationsAirQuality
      : {};

  const {
    data: dataStationsAirQualityUnits,
    error: errorStationsAirQualityUnits,
  } = useSWR("/api/v1/estaciones_aire/aire_unidades", fetcher);

  const stationsAirQualityUnits =
    dataStationsAirQualityUnits && !errorStationsAirQualityUnits
      ? dataStationsAirQualityUnits
      : {};

  const { data: dataStations, error: errorStations } = useSWR(
    "/api/v1/estaciones",
    fetcher
  );

  const stations = dataStations && !errorStations ? dataStations : {};

  const { data: dataIcaStations, error: errorIcaStations } = useSWR(
    "/api/v1/estaciones_aire/ica_estaciones?fecha=2021-09-01T11:53:00",
    fetcher
  );

  const icaStations =
    dataIcaStations && !errorIcaStations ? dataIcaStations : {};

  if (errorStationsAirQuality || errorStations || errorIcaStations) {
    return <Alert variant="danger">There is a problem</Alert>;
  }
  if (!dataStations || !dataStationsAirQuality || !dataIcaStations) {
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
            <StationsContext.Provider value={stations}>
              <StationsAirQualityContext.Provider value={stationsAirQuality}>
                <AirQualityTimeSeriesContext.Provider
                  value={{ airQualityTimeSeries, changeAirQualityTimeSeries }}
                >
                  <IcaStationsAirQualityContext.Provider value={icaStations}>
                    <IcaStationsUnitsContext.Provider
                      value={stationsAirQualityUnits}
                    >
                      <MapContainer
                        center={position}
                        zoom={zoom}
                        // tapTolerance={100}
                        whenCreated={setMap}
                      >
                        <LayersControl>
                          <BaseLayers baseLayerData={baseLayersData} />
                          <StationsLayer />
                        </LayersControl>
                        <LocateControl />
                        <LegendControl />
                        <StationPanel />
                        <PlotsPanel />
                      </MapContainer>
                    </IcaStationsUnitsContext.Provider>
                  </IcaStationsAirQualityContext.Provider>
                </AirQualityTimeSeriesContext.Provider>
              </StationsAirQualityContext.Provider>
            </StationsContext.Provider>
          </OpenClosePlotPanelContext.Provider>
        </OpenCloseStationPanelContext.Provider>
      </ActiveStationContext.Provider>
    </MapContext.Provider>
  );
};

export default MapContent;
