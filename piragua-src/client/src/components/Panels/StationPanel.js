import React from "react";
import { useContext, useState } from "react";

import "leaflet/dist/leaflet.css";
import "../../App.css";
import MapContext from "../../Context/MapContext";
import ActiveStationContext from "../../Context/ActiveStationContext";
import Dropdown from "react-bootstrap/Dropdown";
import { FormControl } from "react-bootstrap";

const StationPanel = () => {
  const map = useContext(MapContext);
  const { activeStation } = useContext(ActiveStationContext);
  console.log(activeStation);

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
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
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
      <div className="leaflet-bottom station-panel-control">
        <div className="dropdown-station">
          <Dropdown itemType="button">
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              Últimas 24 horas
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
              <Dropdown.Item eventKey="1" active>
                Últimas 24 horas
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">Últimas 72 horas</Dropdown.Item>
              <Dropdown.Item eventKey="3">Última semana</Dropdown.Item>
              <Dropdown.Item eventKey="4">Últimos 30 días</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default StationPanel;
