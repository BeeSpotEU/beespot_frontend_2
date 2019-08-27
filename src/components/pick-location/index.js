import React, { useContext, useState } from "react";
import { LocationForm } from "components/location-form";
import { ContextStore } from "utility/store";
import ReactMapGL from "react-map-gl";
import "./styles.css";

export const PickLocation = () => {
  // const { state, dispatch } = useContext(ContextStore);
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 52.119,
    longitude: 5.111,
    zoom: 8
  });

  return (
    <div className="mapbox-wrapper">
      <ReactMapGL
        mapStyle="//mvt.opengeo.nl/basemap-style.json"
        {...viewport}
        onViewportChange={viewport => setViewport({ viewport })}
      />
    </div>
  );
};
