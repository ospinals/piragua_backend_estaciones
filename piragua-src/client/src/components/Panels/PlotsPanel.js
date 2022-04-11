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
import { format } from "date-fns";
import useSWR from "swr";

const PlotsPanel = () => {
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

  const final_date = Date().toISOString(); //"2021-09-01T11:53:00";
  const initial_date = final_date.toISOString();

  console.log(initial_date, final_date);
  //   const { data: dataTimeSeries, error: errorTimeSeries } = useSWR(
  //     `/api/v1/estaciones_aire/ica_estaciones?codigo=${activeStation}&fecha_inicial=${fecha_incial}&fecha_final=${fecha_final}`,
  //     fetcher
  //   );

  //   const dataAirQualityTimeSeries =
  //     dataTimeSeries && !errorTimeSeries ? dataTimeSeries : {};

  //   if (errorTimeSeries) {
  //     return (
  //       <Alert variant="danger">
  //         No ha sido posible obtener datos para esta estación
  //       </Alert>
  //     );
  //   }

  return (
    <>
      <div className={`${openClosePlotPanel ? "plots-panel-control" : "hide"}`}>
        <div className="close-button">
          <CloseButton onClick={handleClick} />
        </div>

        <div className="plot-panel-title">
          {activeStation ? `Estación: ${String(activeStation)}` : null}
        </div>
      </div>
    </>
  );
};

export default PlotsPanel;
