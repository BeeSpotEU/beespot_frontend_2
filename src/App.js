import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.scss";
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
import { Header } from "components/header";
import { Layout } from "antd";

const url = require("url");

const { Content } = Layout;

const getPublicUrl = () =>
  process.env.PUBLIC_URL || process.env.npm_package_homepage;

function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith("/");
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  } else {
    return inputPath;
  }
}

function getServedPathname() {
  const publicUrl = getPublicUrl();
  const servedUrl =
    process.env.PUBLIC_URL || (publicUrl ? url.parse(publicUrl).pathname : "/");
  let publicPath = ensureSlash(servedUrl, true);
  publicPath = process.env.NODE_ENV === "production" ? publicPath : "/";
  const publicPathname = url.parse(publicPath).pathname;
  return publicPathname;
}

const servedPathName = getServedPathname();

function App() {
  const { state, dispatch } = useContext(ContextStore);

  useEffect(() => {
    console.log(`Served path name: ${servedPathName}`);
    if (!state.socket) {
      const socket = new Socket(process.env.REACT_APP_SOCKET_URL, {
        params: { user_id: "123" }
      });
      socket.connect();
      socket.onClose(e => dispatch({ type: "setSocket", socket: null }));
      dispatch({ type: "setSocket", socket });
    }
  }, []);

  return (
    <div className="App">
      <Layout className="layout">
        <Header></Header>
        <Content style={{ marginTop: 24, height: "calc(100vh - 64px)" }}>
          <Router basename={servedPathName}>
            <Switch>
              <Route path="/" exact component={Participant} />
              <Route path="/presentation" exact component={Presentation} />
              <Route path="/:session" exact component={PickLocation} />
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
            </Switch>
          </Router>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
