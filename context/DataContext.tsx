import React from 'react';

const defaultData = {
  events: [],
  services: [],
};

const DataContext = React.createContext(defaultData);

export default DataContext;
