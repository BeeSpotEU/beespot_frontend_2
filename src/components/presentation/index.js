import React, { useContext, useEffect } from "react";
import { Button } from "antd";
import { ContextStore } from "utility/store";
import { setupChannelLobby, leaveChannel } from "utility/socket";

export const Presentation = ({ history }) => {
  const { state, dispatch } = useContext(ContextStore);

  const onClickButton = () => {
    state.channel.push("create_session", {});
  };

  useEffect(() => {
    if (state.socket) {
      if (state.channel) {
        leaveChannel(state.channel, dispatch);
      }
      setupChannelLobby(state.socket, dispatch, session => {
        history.push(`/presentation/${session}`);
      });
    }
  }, [state.socket]);

  return (
    <div>
      <Button onClick={onClickButton}>Creëer sessie</Button>
      {state.session && <p>Sessie: {state.session}</p>}
    </div>
  );
};
