import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Polygon, Marker, Popup, ImageOverlay} from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import type { FeatureCollection, Feature, Geometry, GeoJsonObject } from 'geojson'; 
import "leaflet/dist/leaflet.css";
import oceanPoly from '../../src/data/Ocean.json';


import styles from './map.module.scss';


export default function MainMap() {
  // const oceanPoly: FeatureCollection = require('../../src/data/s2.json');
  

    const bounds: L.LatLngBoundsExpression = [[54.975, 29.975], [80.025, 100.025]];

    const polygon: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][] = [
      [51.515, 7],
      [70.52, 55],
      [51.52, 15],
    ];

  
    return (
      <div className={styles.mapContainer}>
  
  <MapContainer zoom={2.6} center={[70, 50]} style={{ height: '100%' }} zoomControl={false}>
  
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  
          {/* <Polygon positions={polygon} color={"blue"} /> */}
  
          <GeoJSON 
            data={oceanPoly as FeatureCollection} 
            style={{ color: 'red', weight: 2, fillOpacity: 0.5 }} 
            />
  
          {/* <ImageOverlay
              url={'../../src/data/output.tiff'}
              bounds={bounds}
              opacity={0.5}
              zIndex={10}
            /> */}


        </MapContainer>
  
      </div>
    );
  }
  
  
  
  
  
  
  
  
    
  
  


