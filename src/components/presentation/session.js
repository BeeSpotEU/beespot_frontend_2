import React, { useEffect, useContext } from "react";
import { ContextStore } from "utility/store";
import { leaveChannel, setupChannelPresenter } from "utility/socket";
import { Button } from "antd";

export const Session = ({
  match: {
    params: { session }
  },
  history
}) => {
  const { state, dispatch } = useContext(ContextStore);

  const onClickButton = () => {
    history.push(`/presentation/${session}/locations`);
  };

  useEffect(() => {
    if (state.socket && session && state.currentSession !== session) {
      if (state.channel) {
        leaveChannel(state.channel, dispatch);
      }
      setupChannelPresenter(state.socket, session, dispatch);
    }
  }, [state.socket, session]);

  return (
    <div>
      <p>{session}</p>
      <Button onClick={onClickButton}>Bekijk locaties</Button>
    </div>
  );
};
