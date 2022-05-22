import React, { useEffect } from "react";
import { useContext, useState } from "react";

import "leaflet/dist/leaflet.css";
import "../../App.css";
import OpenCloseLegendPanelContext from "../../Context/OpenCloseLegendPanelContext";
import { CloseButton, Button } from "react-bootstrap";

const LegendPanel = () => {
  const { openCloseLegendPanel, changeOpenCloseLegendPanel } = useContext(
    OpenCloseLegendPanelContext
  );

  const handleClick = (e) => {
    changeOpenCloseLegendPanel(false);
  };

  return (
    <>
      <div
        className={`${openCloseLegendPanel ? "legend-panel-control" : "hide"}`}
      >
        <div className="close-button">
          <CloseButton onClick={handleClick} />
        </div>

        <div className="legend-panel-title">Convenciones</div>

        <div className="legend-panel-content">
          <p className="plot-legend">
            <strong style={{ color: "#000", fontSize: "large" }}>
              Calidad del aire
            </strong>
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img src="iconos-aire/azul.svg" className="legend-icon" alt="" />
            {"   "}
            Sin datos disponibles
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img src="iconos-aire/verde.svg" className="legend-icon" alt="" />
            {"   "}
            Verde
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img
              src="iconos-aire/amarillo.svg"
              className="legend-icon"
              alt=""
            />
            {"   "}
            Moderada
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img src="iconos-aire/naranja.svg" className="legend-icon" alt="" />
            {"   "}
            Dañina - Grupos sensibles
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img src="iconos-aire/rojo.svg" className="legend-icon" alt="" />
            {"   "}
            Dañina para la salud
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img src="iconos-aire/morado.svg" className="legend-icon" alt="" />
            {"   "}
            Muy dañina para la salud
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img src="iconos-aire/marron.svg" className="legend-icon" alt="" />
            {"   "}
            Peligrosa
            <br></br>
            <br></br>
          </p>

          <p className="plot-legend">
            <strong style={{ color: "#000", fontSize: "large" }}>
              Pluviógrafos
            </strong>
          </p>
          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img
              src="iconos-lluvia/azulclaro.svg"
              className="legend-icon"
              alt=""
            />
            {"   "}
            Sin lluvia registrada
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img src="iconos-lluvia/azul.svg" className="legend-icon" alt="" />
            {"   "}
            Llluvia baja
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img
              src="iconos-lluvia/amarillo.svg"
              className="legend-icon"
              alt=""
            />
            {"   "}
            Lluvia moderada
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img
              src="iconos-lluvia/naranja.svg"
              className="legend-icon"
              alt=""
            />
            {"   "}
            Lluvia alta
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img src="iconos-lluvia/rojo.svg" className="legend-icon" alt="" />
            {"   "}
            Llluvia extrema
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img src="iconos-lluvia/gris.svg" className="legend-icon" alt="" />
            {"   "}
            Estación IDEAM
            <br></br>
            <br></br>
          </p>

          <p className="plot-legend">
            <strong style={{ color: "#000", fontSize: "large" }}>Nivel</strong>
          </p>
          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img src="iconos-nivel/verde.svg" className="legend-icon" alt="" />
            {"   "}
            Nivel de agua seguro
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img
              src="iconos-nivel/amarillo.svg"
              className="legend-icon"
              alt=""
            />
            {"   "}
            Nivel de precaución
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img
              src="iconos-nivel/naranja.svg"
              className="legend-icon"
              alt=""
            />
            {"   "}
            Inundación menor
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img src="iconos-nivel/rojo.svg" className="legend-icon" alt="" />
            {"   "}
            Inundación mayor
          </p>

          <p
            className="plot-legend"
            style={{ color: "#000", fontSize: "large" }}
          >
            <img src="iconos-nivel/gris.svg" className="legend-icon" alt="" />
            {"   "}
            Estación del IDEAM
            <br></br>
            <br></br>
          </p>
        </div>

        <div>
          <img src="piragua.png" className="logos" alt=""></img>
        </div>
      </div>
    </>
  );
};

export default LegendPanel;
