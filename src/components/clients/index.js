import React, { useContext } from "react";
import { LocationForm } from "components/location-form";
import { ContextStore } from "utility/store";

export const Clients = () => {
  const { state, dispatch } = useContext(ContextStore);

  const addLocation = location => {
    if (state.channel) {
      state.channel.push("add_location", { body: location });
    }
  };

  return <LocationForm handleAddLocation={addLocation} />;
};
