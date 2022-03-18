import axios from "axios";
import { Icon } from "leaflet";
import React, { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useSWR from "swr";
import "./App.css";

export const icon = new Icon({
  iconUrl: "leaf-green.png",
  shadowUrl: "leaf-shadow.png",
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

const fetcher = (url) => axios.get(url).then((res) => res.data);

const App = () => {
  const [activeStation, setActiveStation] = useState(null);

  const { data, error } = useSWR("/api/v1/estaciones", fetcher);
  const stations = data && !error ? data : {};
  const position = [6.096583, -75.813861];
  const zoom = 11;

  if (error) {
    return <Alert variant="danger">There is a problem</Alert>;
  }
  if (!data) {
    return (
      <Spinner
        animation="border"
        variant="danger"
        role="status"
        style={{
          width: "400px",
          height: "400px",
          margin: "auto",
          display: "block",
        }}
      />
    );
  }
  return (
    <MapContainer center={position} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.features.map((station) => (
        <Marker
          key={station.properties.name}
          position={[
            station.geometry.coordinates[1],
            station.geometry.coordinates[0],
          ]}
          onClick={() => {
            setActiveStation(station);
          }}
          icon={icon}
        >
          <Popup
            position={[
              station.geometry.coordinates[1],
              station.geometry.coordinates[0],
            ]}
            onClose={() => {
              setActiveStation(null);
            }}
          >
            <div>
              <h6>{station.properties.name}</h6>
              <p>{station.properties.province}</p>
              <p>{station.properties.district}</p>
              <p>Level: {station.properties.level}</p>
              <p>Male: {station.properties.male}</p>
              <p>Female: {station.properties.female}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default App;
