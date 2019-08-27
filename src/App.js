import React, { useEffect, useState } from "react";
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

function App() {
  const [state, setState] = useState("");
  const [channel, setChannel] = useState();

  useEffect(() => {
    if (false && !channel) {
      const socket = new Socket("ws://localhost:4000/socket");
      socket.connect();
      socket.onClose(e => console.log("Closed connection"));

      const newChannel = socket.channel("room:lobby", {});
      setChannel(newChannel);
      newChannel
        .join()
        .receive("error", () => console.log("Connection error"))
        .receive("ok", () => console.log("Connected"));

      newChannel.on("new_msg", payload => {
        setState(payload.body);
      });
    }
  }, []);

  const onChange = ({ target: { value } }) => {
    if (channel) {
      channel.push("new_msg", { body: value });
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
