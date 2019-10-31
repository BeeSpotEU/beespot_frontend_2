import { Presence } from "phoenix";

export const setupChannel = (socket, channelName, dispatch) => {
  const channel = socket.channel(channelName, {});

  channel
    .join()
    .receive("ok", () => dispatch({ type: "setChannel", channel: channel }))
    .receive("error", () => console.error("Connection error"));

  let presence = new Presence(channel);

  presence.onSync(() => {
    presenceList(presence.list());
  });

  return channel;
};

const presenceList = list => {
  console.log(list);
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
