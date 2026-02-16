import React, { useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import proj4 from "proj4";
import "proj4leaflet";
import * as L from "leaflet";
import type { FeatureCollection } from 'geojson'; 
import oceanPoly from '../../data/Ocean.json';
import styles from './map.module.scss';

// Fix for proj4leaflet requiring global proj4
if (typeof window !== 'undefined') {
  (window as any).proj4 = proj4;
}

export default function LambConic() {
  const MAX_ZOOM = 16;
  const TILE_SIZE = 512;
  
  const extent = Math.sqrt(2) * 6371007.2;
  
  const resolutions = useMemo(() => {
    return Array(MAX_ZOOM + 1)
      .fill(0)
      .map((_, i) => extent / TILE_SIZE / Math.pow(2, i - 1));
  }, [extent]);
  
  const ARCTIC_LAEA = useMemo(() => {
    return new L.Proj.CRS(
      "EPSG:3575",
      "+proj=laea +lat_0=90 +lon_0=10 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs",
      {
        origin: [-extent, extent],
        bounds: L.bounds(L.point(-extent, extent), L.point(extent, -extent)),
        resolutions: resolutions
      }
    );
  }, [extent, resolutions]);
  
  const ARCTIC_TILES_URL =
    "https://tile.gbif.org/3575/omt/{z}/{x}/{y}@4x.png?style=osm-bright-en";

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        zoom={2} 
        center={[70, 70]}
        style={{ height: '100vh', width: '100%' }}
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
          data={oceanPoly as FeatureCollection} 
          style={{ color: 'red', weight: 2, fillOpacity: 0.5 }} 
        />
      </MapContainer>
    </div>
  );
};
