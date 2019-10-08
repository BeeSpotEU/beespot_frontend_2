import React, { useContext, useState, useEffect } from "react";
import { LocationForm } from "components/location-form";
import { ContextStore } from "utility/store";
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "./styles.css";
import Pin from "./pin";
import { Button } from "antd";

export const ShowLocations = () => {
  const { state, dispatch } = useContext(ContextStore);
  const [viewport, setViewport] = useState({
    latitude: 52.119,
    longitude: 5.111,
    zoom: 8
  });

  const [mapRef, setMapRef] = useState();

  return (
    <div className="mapbox-wrapper">
      <ReactMapGL
        ref={ref => setMapRef(ref)}
        mapStyle="//mvt.opengeo.nl/basemap-style.json"
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={viewport2 => setViewport(viewport2)}
      >
        {Array.from(state.locations.values()).map(location => {
          const longitude = parseFloat(location.longitude);
          const latitude = parseFloat(location.latitude);
          return (
            <Marker
              key={location.id}
              longitude={longitude}
              latitude={latitude}
              offsetTop={-39}
              offsetLeft={-23}
            >
              <Pin></Pin>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
};
