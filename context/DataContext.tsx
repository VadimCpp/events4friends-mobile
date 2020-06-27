/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

const defaultData = {
  events: [],
  services: [],
  storeReminder: (
    value: boolean,
    eventId: string,
    onStored: Function,
    onStoredFailed: Function,
  ) => {},
};

const DataContext = React.createContext(defaultData);

export default DataContext;
