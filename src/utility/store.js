import * as React from "react";
import produce from "immer";

const ContextStore = React.createContext();

const initialState = {
  channel: null,
  selfCreatedLocations: new Map(),
  locations: new Map()
};

const reducer = (state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case "setChannel":
        draft.channel = action.channel;
        break;
      case "newLocation":
        draft.locations = new Map(
          draft.locations.set(action.location.id, action.location)
        );
        break;
      case "createdLocation":
        draft.selfCreatedLocations = new Map(
          draft.selfCreatedLocations.set(action.location.id, action.location)
        );
        break;
      default:
        break;
    }
  });
};

const ContextStoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <ContextStore.Provider value={value}>{children}</ContextStore.Provider>
  );
};

const ContextStoreConsumer = ContextStore.Consumer;

export { ContextStore, ContextStoreProvider, ContextStoreConsumer };
