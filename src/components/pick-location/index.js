import React, { useContext, useState, useEffect } from "react";
import { LocationForm } from "components/location-form";
import { ContextStore } from "utility/store";
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "./styles.css";
import Pin from "./pin";
import { Button } from "antd";
import { leaveChannel, setupChannelParticipant } from "utility/socket";

export const PickLocation = ({
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

  const [mapRef, setMapRef] = useState();
  // const [marker, setMarker] = useState({
  //   longitude: 5.111,
  //   latitude: 52.119
  // });

  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (state.socket && session && state.currentSession !== session) {
      if (state.channel) {
        leaveChannel(state.channel, dispatch);
      }
      setupChannelParticipant(state.socket, session, dispatch);
    }
  }, [state.socket, session]);

  const onDragEnd = location => e => {
    dispatch({
      type: "createdLocation",
      location: {
        ...location,
        longitude: `${e.lngLat[0]}`,
        latitude: `${e.lngLat[1]}`
      }
    });
    if (state.channel) {
      state.channel.push("add_location", {
        body: {
          ...location,
          longitude: `${e.lngLat[0]}`,
          latitude: `${e.lngLat[1]}`
        }
      });
    }
  };

  const onClickButton = () => {
    const map = mapRef.getMap();
    const center = map.getCenter();

    if (state.channel) {
      state.channel.push("add_location", {
        body: {
          latitude: `${center.lat}`,
          longitude: `${center.lng}`
        }
      });
    }
  };

  const updateLocation = () => {};

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
        {Array.from(state.selfCreatedLocations.values()).map(location => {
          const longitude = parseFloat(location.longitude);
          const latitude = parseFloat(location.latitude);
          return (
            <Marker
              key={location.id}
              longitude={longitude}
              latitude={latitude}
              offsetTop={-39}
              offsetLeft={-23}
              draggable
              // onDragStart={this._onMarkerDragStart}
              // onDrag={this._onMarkerDrag}
              onDragEnd={onDragEnd(location)}
            >
              <Pin></Pin>
            </Marker>
          );
        })}
      </ReactMapGL>
      <Button
        type="primary"
        shape="circle"
        icon="plus"
        size="large"
        onClick={onClickButton}
        className="add_location"
      />
    </div>
  );
};
