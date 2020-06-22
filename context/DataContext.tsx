import React from 'react';

const defaultData = {
  events: [],
  services: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  storeReminder: (value: boolean, eventId: string, onStored: Function) => {},
};

const DataContext = React.createContext(defaultData);

export default DataContext;
