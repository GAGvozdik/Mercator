import { useMemo, useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import proj4 from "proj4";
import "proj4leaflet";
import * as L from "leaflet";
import "leaflet-rotate";
import type { FeatureCollection } from "geojson";
import oceanPoly from "../../data/Ocean.json";
import styles from "./map.module.scss";
import { Paper, IconButton, Tooltip } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import { useTheme } from "@mui/material/styles";

// Fix for proj4leaflet requiring global proj4
if (typeof window !== "undefined") {
  (window as any).proj4 = proj4;
}

function RotateUI() {
  const map = useMap();
  const theme = useTheme();

  const [bearing, setBearing] = useState<number>(0);
useEffect(() => {
  if (!map) return;

  const sync = () => {
    const current = (map as any).getBearing?.() ?? 0;
    setBearing(current);

    // 💥 вот это главное
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  };

  map.whenReady(sync);

  map.on("rotate", () =>
    setBearing((map as any).getBearing?.() ?? 0)
  );

  return () => {
    map.off("rotate");
  };
}, [map]);


  const resetNorth = () => {
    (map as any).setBearing(0);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        position: "absolute",
        bottom: 16,
        right: 16,
        zIndex: 1000,
        
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        backdropFilter: "blur(6px)",
        backgroundColor: "rgba(255,255,255,0.9)",
      }}
    >
      <Tooltip title="Вернуть ориентацию на север">
        <IconButton onClick={resetNorth} size="large">
          <ExploreIcon
            sx={{
              transform: `rotate(${bearing}deg)`,
              transition: "transform 0.2s ease-out",
              fontSize: 34,
              color: theme.palette.primary.main,
            }}
          />
        </IconButton>
      </Tooltip>
    </Paper>
  );
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
        resolutions: resolutions,
      }
    );
  }, [extent, resolutions]);

  const ARCTIC_TILES_URL =
    "https://tile.gbif.org/3575/omt/{z}/{x}/{y}@4x.png?style=osm-bright-en";

  return (
    <div className={styles.mapContainer} style={{ position: "relative" }}>
      <MapContainer
        zoom={2}
        center={[70, 70]}
        style={{ height: "100vh", width: "100%" }}
        crs={ARCTIC_LAEA}
        minZoom={2}
        // ВАЖНО: эти опции читает leaflet-rotate.
        // Типы react-leaflet могут ругаться — поэтому ниже каст.
        {...({
          rotate: true,
          bearing: 0,
          touchRotate: true,
          touchZoom: "center",
        } as any)}
      >
        <RotateUI />

        <TileLayer
          attribution=""
          url={ARCTIC_TILES_URL}
          tileSize={TILE_SIZE}
          minZoom={2}
          maxZoom={MAX_ZOOM}
        />

        <GeoJSON
          data={oceanPoly as FeatureCollection}
          style={{ color: "red", weight: 2, fillOpacity: 0.5 }}
        />
      </MapContainer>
    </div>
  );
}
