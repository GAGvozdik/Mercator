import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Polygon, Marker, Popup, ImageOverlay} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import {  FeatureCollection, Feature, Geometry, GeoJsonObject } from 'geojson'; 
import { Theme } from '@mui/material/styles'; 
import "leaflet/dist/leaflet.css";
import theme from './theme';


import { useAppSelector } from '../redux/hooks';



// import { useAppSelector } from '../redux/hooks';

// const way = useAppSelector(state => state.way);

// <p>Random Number from Store: {way}</p>


export default function MainMap() {
  
  // const oceanPoly: FeatureCollection = require('../../src/data/Ocean.json');
  // const oceanPoly: FeatureCollection = require('../../src/data/s2.json');



    const bounds: L.LatLngBoundsExpression = [[54.975, 29.975], [80.025, 100.025]];

    const polygon: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][] = [
      [51.515, 7],
      [70.52, 55],
      [51.52, 15],
    ];
  // Получаем `way` из Redux
  const way = useAppSelector(state => state.way);

  // Состояние для данных GeoJSON
  const [myMap, setMyMap] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    // Проверка, что `way` не null
    if (way) {
      fetch(way) 
        .then(response => response.json()) 
        .then(data => setMyMap(data as FeatureCollection)); // Преобразуем в FeatureCollection
        console.log(myMap);
    }
  }, [way]); // Зависимость от `way`



  

    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        
  <MapContainer zoom={2.6} center={[70, 50]} style={{ height: '100%' }} zoomControl={false}>
  
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  
          {/* <Polygon positions={polygon} color={"blue"} /> */}
  
          {myMap && <GeoJSON 
            key={JSON.stringify(myMap)} // Добавляем ключ
            data={myMap}
            style={{ color: 'red', weight: 2, fillOpacity: 0.5 }} 
            /> 
          }
  
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
  
  
  
  
  
  
  
  
    
  
  


