import L from "leaflet";
import React from "react";
import { useContext, useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "georaster";
import "chroma-js";
import "georaster-layer-for-leaflet";
import OpenCloseClickValuePanelContext from "../../Context/OpenCloseClickValuePanelContext";
import ClickValueContext from "../../Context/ClickValueContext";
import ShowPrecipitationContext from "../../Context/showPrecipitationContext";

const RasterLayer = () => {
  const { openCloseClickValuePanel, changeOpenCloseClickValuePanel } =
    useContext(OpenCloseClickValuePanelContext);

  const { clickValue, changeClickValue } = useContext(ClickValueContext);

  const { showPrecipitation, changeShowPrecipitation } = useContext(
    ShowPrecipitationContext
  );

  const handleClick = (value) => {
    if (isNaN(value) || value === 0 || value === undefined || value === null) {
      changeClickValue(null);
      changeOpenCloseClickValuePanel(false);
    } else {
      changeClickValue(value);
      changeOpenCloseClickValuePanel(true);
    }
  };

  const { layerContainer, map } = useLeafletContext();
  const container = layerContainer || map;

  var url_to_geotiff_file = "https://piragua.s3.amazonaws.com/planet_scope.tif";

  var GeoRasterLayer = require("georaster-layer-for-leaflet");
  var parseGeoraster = require("georaster");
  var chroma = require("chroma-js");
  var geoblaze = require("geoblaze");

  if (showPrecipitation) {
    fetch(url_to_geotiff_file)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        parseGeoraster(arrayBuffer).then((georaster) => {
          const min = georaster.mins[0];
          const max = georaster.maxs[0];
          const range = georaster.ranges[0];

          // available color scales can be found by running console.log(chroma.brewer);
          // console.log(chroma.brewer);
          var scale = chroma.scale([
            "000096",
            "0064ff",
            "00b4ff",
            "33db80",
            "9beb4a",
            "ffeb00",
            "ffb300",
            "ff6400",
            "eb1e00",
            "af0000",
          ]);

          var layer = new GeoRasterLayer({
            georaster: georaster,
            opacity: 0.5,
            pixelValuesToColorFn: function (pixelValues) {
              var pixelValue = pixelValues[0]; // there's just one band in this raster

              // if there's zero wind, don't return a color
              if (pixelValue <= 0) return null;

              // scale to 0 - 1 used by chroma
              var scaledPixelValue = (pixelValue - min) / range;

              var color = scale(scaledPixelValue).hex();

              // return getColor(pixelValue);
              return color;
            },
            resolution: 64,
          });
          // console.log("layer:", layer);
          // layer.addTo(map);

          container.eachLayer(function (layer) {
            if (layer instanceof GeoRasterLayer) container.removeLayer(layer);
          });

          if (!container.hasLayer(layer)) {
            container.addLayer(layer);
          }
          // map.eachLayer(function (layer) {
          //   if (layer instanceof GeoRasterLayer) container.removeLayer(layer);
          // });

          // container.removeLayer(layer);

          // map.fitBounds(layer.getBounds());
          container.on("click", function (evt) {
            var latlng = map.mouseEventToLatLng(evt.originalEvent);

            handleClick(
              geoblaze.identify(georaster, [latlng.lng, latlng.lat])[0]
            );

            //   console.log(geoblaze.identify(georaster, [latlng.lng, latlng.lat]));
          });
        });
      });
  } else {
    container.eachLayer(function (layer) {
      if (layer instanceof GeoRasterLayer) container.removeLayer(layer);
    });
  }

  //   useEffect(() => {
  //     container.addLayer(layer);
  //     return () => {
  //       container.removeLayer(layer);
  //     };
  //   }, []);
  return null;
};

export default RasterLayer;
