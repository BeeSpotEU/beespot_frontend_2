import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import "./styles.scss";
import { ContextStore } from "utility/store";

const { Header: AntdHeader } = Layout;

const getParticipants = participants => {
  if (Array.isArray(participants)) {
    return participants.reduce((acc, participantList) => {
      return acc + participantList.metas.length;
    }, 0);
  }
  return 0;
};

export const Header = () => {
  const { state } = useContext(ContextStore);

  const live = getParticipants(state.presence);

  return (
    <AntdHeader className="header">
      <div className="logo" />
      <span className="live">Live: {live} participants</span>
      {/* <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu> */}
    </AntdHeader>
  );
};
