import React from "react";
import useSWR from "swr";
import axios from "axios";
import { useContext, useState } from "react";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const FetcStationsData = () => {
  const [activeStation, setActiveStation] = useState(null);

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
};
