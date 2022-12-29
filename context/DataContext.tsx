import React from 'react';

// utils
import { IDataContext } from '@utils/interfaces';

const defaultData: IDataContext = {
  events: [], // список анонсов
  services: [], // список услуг
  communities: [], // список сообществ
  loadingEvents: true,
  loadingServices: true,
};

const DataContext = React.createContext(defaultData);

export default DataContext;
