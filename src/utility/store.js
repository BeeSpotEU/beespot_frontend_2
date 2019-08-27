import * as React from "react";

const ContextStore = React.createContext();

const initialState = {
  channel: null,
  locations: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setChannel": {
      return {
        ...state,
        channel: action.channel
      };
    }
    default:
      console.log("Deze reducer bestaat nog niet");
      return state;
  }
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
