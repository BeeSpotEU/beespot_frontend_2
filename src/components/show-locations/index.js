import React, { useContext, useState, useEffect } from "react";
import { LocationForm } from "components/location-form";
import { ContextStore } from "utility/store";
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "./styles.css";
import Pin from "./pin";
import { Button } from "antd";
import { leaveChannel, setupChannelPresenter } from "utility/socket";
import Sider from "antd/lib/layout/Sider";

export const ShowLocations = ({
  match: {
    params: { session }
  }
}) => {
  const { state, dispatch } = useContext(ContextStore);
  const [viewport, setViewport] = useState({
    latitude: 52.119,
    longitude: 5.111,
    zoom: 8
  });

  useEffect(() => {
    if (state.socket && session && state.currentSession !== session) {
      if (state.channel) {
        leaveChannel(state.channel, dispatch);
      }
      setupChannelPresenter(state.socket, session, dispatch);
    }
  }, [state.socket, session]);

  const [mapRef, setMapRef] = useState();

  return (
    <>
      <Sider
        style={{
          overflow: "auto",
          height: "100%",
          position: "fixed",
          right: 0
        }}
        theme="light"
        width={400}
      ></Sider>
      <div className="show-locations mapbox-wrapper">
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
    </>
  );
};
