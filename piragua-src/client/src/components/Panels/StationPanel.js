import React from "react";
import { useContext, useState } from "react";

import "leaflet/dist/leaflet.css";
import "../../App.css";
import MapContext from "../../Context/MapContext";
import ActiveStationContext from "../../Context/ActiveStationContext";
import OpenCloseStationPanelContext from "../../Context/OpenCloseStationPanelContext";
import IcaStationsAirQualityContext from "../../Context/IcaStationsAirQualityContext";
import StationsAirQualityContext from "../../Context/StationsAirQualityContext";
import Dropdown from "react-bootstrap/Dropdown";
import { CloseButton, Button } from "react-bootstrap";

const StationPanel = () => {
  const map = useContext(MapContext);
  const stationsAirQuality = useContext(StationsAirQualityContext);
  const icaStations = useContext(IcaStationsAirQualityContext);

  const { activeStation, changeActiveStation } =
    useContext(ActiveStationContext);

  console.log(icaStations ? icaStations[activeStation] : null);
  const { openCloseStationPanel, changeOpenCloseStationPanel } = useContext(
    OpenCloseStationPanelContext
  );
  const [dropDownSelection, setDropDownSelection] = useState("24h");

  const handleSelect = (e) => {
    setDropDownSelection(e);
  };

  const handleClick = (e) => {
    changeOpenCloseStationPanel(false);
    changeActiveStation(null);
  };

  const handleClickPlot = (e) => {
    console.log("clic");
  };

  const replaceNaN = (x) => {
    if (isNaN(x)) {
      return "-";
    } else return x;
  };

  console.log(icaStations);
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <>
      <div
        className={`${
          openCloseStationPanel
            ? "station-panel-control"
            : "station-panel-control hide"
        }`}
      >
        <div className="close-button">
          <CloseButton onClick={handleClick} />
        </div>
        <div className="dropdown-station">
          <Dropdown itemType="button" onSelect={handleSelect}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              {
                {
                  "24h": "Últimas 24 horas",
                  "72h": "Últimas 72 horas",
                  "7d": "Última semana",
                  "30d": "Últimos 30 días",
                }[dropDownSelection]
              }
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
              <Dropdown.Item eventKey="24h" active>
                Últimas 24 horas
              </Dropdown.Item>
              <Dropdown.Item eventKey="72h">Últimas 72 horas</Dropdown.Item>
              <Dropdown.Item eventKey="7d">Última semana</Dropdown.Item>
              <Dropdown.Item eventKey="30d">Últimos 30 días</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="station-panel-content">
          <div className="station-panel-value">
            {icaStations && activeStation
              ? replaceNaN(parseInt(icaStations[activeStation]["PM 2.5"]))
              : null}
          </div>
          {/* <div className="station-panel-units">µg/m³</div>
          <div className="station-panel-variable">PM 2.5</div> */}
        </div>
        <div className="boton-graficar">
          <Button
            variant="primary"
            size="sm"
            style={{
              // boxShadow: "2px 2px 1px #6394CF",
              borderColor: "#6394CF",
              backgroundColor: "#6394CF",
              fontSize: "x-small",
              boxSizing: "border-box",
            }}
            onClick={handleClickPlot}
          >
            VER DATOS
          </Button>
        </div>
      </div>
    </>
  );
};

export default StationPanel;
