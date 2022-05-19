export const baseLayersData = [
  {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    name: "OpenStreetMap",
    checked: true,
    maxNativeZoom: false,
  },
  {
    url: "http://services.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}",
    attribution:
      '&copy; <a href="https://stamen.com/open-source/">Stamen</a> contributors',
    name: "Terreno",
    checked: false,
    maxNativeZoom: false,
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "&copy; NASA Blue Marble, image service by OpenGeo",
    name: "Satelital",
    checked: false,
    maxNativeZoom: 12,
  },
];
