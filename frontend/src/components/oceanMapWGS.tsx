import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Polygon, ImageOverlay} from "react-leaflet";
import type { LatLngExpression} from "leaflet";
import type{ FeatureCollection, Feature, Geometry, GeoJsonObject } from 'geojson'; 
import "leaflet/dist/leaflet.css";
import "proj4leaflet";
import * as L from "leaflet";
import oceanPoly from '../../src/data/Ocean.json';


import styles from './map.module.scss';


export default function MapWithPolygons() {

  const crs = new L.Proj.CRS(
    'EPSG:25833',
    '+proj=utm +zone=33 +ellps=GRS80 +units=m +no_defs',
    {
      resolutions: [
        21674.7100160867, 10837.35500804335, 5418.677504021675, 2709.3387520108377, 1354.6693760054188, 677.3346880027094,
        338.6673440013547, 169.33367200067735, 84.66683600033868, 42.33341800016934, 21.16670900008467, 10.583354500042335,
        5.291677250021167, 2.6458386250105836, 1.3229193125052918, 0.6614596562526459, 0.33072982812632296, 0.16536491406316148
      ],
      origin: [-2500000, 9045984],
    }
  );

  return (
    <div className={styles.mapContainer}>

      {/* <MapContainer zoom={2.6} center={[70, 70]} style={{ height: '100%' }} zoomControl={false}> */}

      <MapContainer 
        center={[60, 10]} 
        zoom={2} 
        crs={crs}
        style={{ height: "100vh", width: "100%"}}
      >
      <TileLayer
        url="https://services.geodataonline.no/arcgis/rest/services/Geocache_UTM33_EUREF89/GeocacheBasis/MapServer/tile/{z}/{y}/{x}"
      />

      <GeoJSON 
          data={oceanPoly as FeatureCollection} 
          style={{ color: 'red', weight: 2, fillOpacity: 0.5 }} 
      />

    </MapContainer>

    </div>
  );
}








  

