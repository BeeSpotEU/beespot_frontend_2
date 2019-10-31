import React from "react";
import { Input } from "antd";
import Search from "antd/lib/input/Search";

export const Participant = ({ history }) => {
  const goToSession = session => {
    history.push(`/${session}`);
  };

  return (
    <Search
      placeholder="Vul de sessie code in"
      enterButton="Deelnemen"
      onSearch={goToSession}
    ></Search>
  );
};
