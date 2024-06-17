module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
  />
  <style>
    #map {
      height: 600px;
    }
  </style>
  <title>Leaflet Map with GeoJSON</title>
</head>
<body>
  <div id="map"></div>

  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <script>
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    fetch('../../src/myPoly/Ocean.json')
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data, {
          style: function (feature) {
            return {
              color: "blue",
              weight: 1,
              opacity: 0.7,
              fillOpacity: 0.3
            };
          }
        }).addTo(map);
      });
  </script>
</body>
</html>`;