import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import { ContextStore } from "utility/store";
import { Socket } from "phoenix";

import { AudienceForm } from "components/audience";
import { FoodSources } from "components/foodsources";
import { Production } from "components/production";
import { Presentation } from "components/presentation";
import { LocationForm } from "components/location-form";
import { PickLocation } from "components/pick-location";
import { ShowLocations } from "components/show-locations";
import { Session } from "components/presentation/session";
import { Participant } from "components/participant";

function App() {
  const { state, dispatch } = useContext(ContextStore);

  useEffect(() => {
    if (!state.socket) {
      const socket = new Socket(process.env.REACT_APP_SOCKET_URL);
      socket.connect();
      socket.onClose(e => dispatch({ type: "setSocket", socket: null }));
      dispatch({ type: "setSocket", socket });
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Participant} />
        <Route path="/:session" exact component={PickLocation} />
        <Route path="/presentation" exact component={Presentation} />
        <Route path="/presentation/:session" exact component={Session} />
        <Route
          path="/presentation/:session/locations"
          exact
          component={ShowLocations}
        />

        <Route path="/audience" exact component={AudienceForm} />
        <Route path="/foodsources" exact component={FoodSources} />
        <Route path="/location" exact component={LocationForm} />
        <Route path="/production" exact component={Production} />
      </Router>
    </div>
  );
}

export default App;
