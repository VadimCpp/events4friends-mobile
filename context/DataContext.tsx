import React from 'react';

const defaultData = {
  events: [],
  services: [],
  expoPushToken: '',
};

const DataContext = React.createContext(defaultData);

export default DataContext;
