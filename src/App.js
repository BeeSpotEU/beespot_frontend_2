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

function App() {
  const { state, dispatch } = useContext(ContextStore);

  useEffect(() => {
    if (!state.channel) {
      const socket = new Socket("ws://localhost:4000/socket");
      socket.connect();
      socket.onClose(e => dispatch({ type: "setChannel", channel: null }));

      const newChannel = socket.channel("locations:lobby", {});
      newChannel
        .join()
        .receive("error", () => console.error("Connection error"))
        .receive("ok", () =>
          dispatch({ type: "setChannel", channel: newChannel })
        );

      // newChannel.on("new_msg", payload => {
      //   setState(payload.body);
      // });
    }
  }, []);

  const onChange = ({ target: { value } }) => {
    if (state.channel) {
      state.channel.push("new_msg", { body: value });
    }
  };

  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Clients} />
        <Route path="/audience" exact component={AudienceForm} />
        <Route path="/foodsources" exact component={FoodSources} />
        <Route path="/presentation" exact component={Presentation} />
        <Route path="/location" exact component={LocationForm} />
        <Route path="/production" exact component={Production} />
        <Route path="/viewer" exact component={MapViewer} />
      </Router>
    </div>
  );
}

export default App;
