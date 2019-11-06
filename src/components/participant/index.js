import React from "react";
import { Input } from "antd";
import Search from "antd/lib/input/Search";
import "./styles.scss";

export const Participant = ({ history }) => {
  const goToSession = session => {
    history.push(`/${session}`);
  };

  return (
    <div className="center">
      <h1>Welcome!</h1>
      <h2>Enter the session code</h2>
      <Search
        className="search-session"
        placeholder="Vul de sessie code in"
        enterButton="Deelnemen"
        onSearch={goToSession}
      ></Search>
    </div>
  );
};
