import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Polygon, Marker, Popup, ImageOverlay} from "react-leaflet";
import { LatLngExpression } from "leaflet";
// import theme from '../../src/components/theme';
import * as L from "leaflet";
import "proj4leaflet"; 
// import "leaflet/dist/leaflet.css";
import {  FeatureCollection, Feature, Geometry, GeoJsonObject } from 'geojson'; 
import { Theme } from '@mui/material/styles'; 
import "leaflet/dist/leaflet.css";
import theme from './theme';


const MAX_ZOOM = 16;
const TILE_SIZE = 512;

const extent = Math.sqrt(2) * 6371007.2;
const resolutions = Array(MAX_ZOOM + 1)
  .fill(0)
  .map((_, i) => extent / TILE_SIZE / Math.pow(2, i - 1));

export const ARCTIC_LAEA = new L.Proj.CRS(
// export const ARCTIC_LAEA = new CRS(
  "EPSG:3575",
  "+proj=laea +lat_0=90 +lon_0=10 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs",
  {
    origin: [-extent, extent],
    bounds: L.bounds(L.point(-extent, extent), L.point(extent, -extent)),
    resolutions: resolutions
  }
);

const ARCTIC_TILES_URL =
  "https://tile.gbif.org/3575/omt/{z}/{x}/{y}@4x.png?style=osm-bright-en";

export default function LambConic() {

  const oceanPoly: FeatureCollection = require('../../src/data/Ocean.json');

  return (
    <div style={{ width: '100vw', height: '100vh' }}>

      <MapContainer
        zoom={2} 
        center={[70, 70]}
        style={{ height: '100%' }}
        crs={ARCTIC_LAEA}
        minZoom={2}

      >

        <TileLayer
          attribution=""
          url={ARCTIC_TILES_URL}
          tileSize={TILE_SIZE}
          minZoom={2}
          maxZoom={MAX_ZOOM}
        />

        <GeoJSON 
          data={oceanPoly} 
          style={{ color: 'red', weight: 2, fillOpacity: 0.5 }} 
        />

      </MapContainer>

    </div>
  );
};

// export default App;

// https://datalanguage.com/blog/arctic-projections-with-leaflet-and-react
// npm install proj4  
// npm install --save proj4leaflet
// npm install proj4leaflet  

// npm i --save-dev @types/proj4leaflet




  