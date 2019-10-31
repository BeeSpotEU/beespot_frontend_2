export const setupChannel = (socket, channelName, dispatch) => {
  const channel = socket.channel(channelName, {});

  channel
    .join()
    .receive("ok", () => dispatch({ type: "setChannel", channel: channel }))
    .receive("error", () => console.error("Connection error"));

  return channel;
};

export const setupChannelLobby = (
  socket,
  dispatch,
  onCreatedSession = session => {}
) => {
  const channel = setupChannel(socket, "locations:lobby", dispatch);

  channel.on("created_session", payload => {
    onCreatedSession(payload.body);
  });

  return channel;
};

export const setupChannelParticipant = (socket, session, dispatch) => {
  const channel = setupChannel(socket, `locations:${session}`, dispatch);

  dispatch({ type: "currentSession", session });

  channel.on("created_location", payload => {
    dispatch({ type: "createdLocation", location: payload.body });
  });

  return channel;
};

export const setupChannelPresenter = (socket, session, dispatch) => {
  const channel = setupChannel(socket, `locations:${session}`, dispatch);

  dispatch({ type: "currentSession", session });

  channel.on("new_location", payload => {
    dispatch({ type: "newLocation", location: payload.body });
  });

  return channel;
};

export const leaveChannel = (channel, dispatch) => {
  channel.leave();
  dispatch({ type: "currentSession", session: null });
  dispatch({ type: "setChannel", channel: null });
};
