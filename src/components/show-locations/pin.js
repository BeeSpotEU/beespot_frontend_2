import React, { PureComponent } from "react";
import SVG from "./bee-logo.svg";

const pinStyle = {
  pointerEvents: "none"
};

export default class Pin extends PureComponent {
  render() {
    return <img src={SVG} style={pinStyle}></img>;
  }
}
