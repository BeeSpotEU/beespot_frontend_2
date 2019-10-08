import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Socket } from "phoenix";
import { Input } from "antd";
import { AudienceForm } from "components/audience";
import { FoodSources } from "components/foodsources";
import { Production } from "components/production";
import { Presentation } from "components/presentation";
import { Clients } from "components/clients";
import { LocationForm } from "components/location-form";
import { MapViewer } from "components/mapviewer";
import { ContextStoreProvider, ContextStore } from "utility/store";
import { PickLocation } from "components/pick-location";
import { ShowLocations } from "components/show-locations";

function App() {
  const { state, dispatch } = useContext(ContextStore);

  useEffect(() => {
    if (!state.channel) {
      const socket = new Socket(process.env.REACT_APP_SOCKET_URL);
      socket.connect();
      socket.onClose(e => dispatch({ type: "setChannel", channel: null }));

      const newChannel = socket.channel("locations:lobby", {});
      newChannel
        .join()
        .receive("error", () => console.error("Connection error"))
        .receive("ok", () =>
          dispatch({ type: "setChannel", channel: newChannel })
        );

      newChannel.push("create_session", {});
      newChannel.on("created_session", console.log);
      newChannel.on("new_location", payload => {
        dispatch({ type: "newLocation", location: payload.body });
      });

      newChannel.on("created_location", payload => {
        dispatch({ type: "createdLocation", location: payload.body });
      });
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Clients} />
        <Route path="/audience" exact component={AudienceForm} />
        <Route path="/foodsources" exact component={FoodSources} />
        <Route path="/presentation" exact component={Presentation} />
        <Route path="/show-locations" exact component={ShowLocations} />
        <Route path="/location" exact component={LocationForm} />
        <Route path="/production" exact component={Production} />
        <Route path="/viewer" exact component={MapViewer} />
        <Route path="/add-location" exact component={PickLocation} />
      </Router>
    </div>
  );
}

export default App;
