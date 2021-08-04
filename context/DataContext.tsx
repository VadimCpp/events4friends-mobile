import React from 'react';

// utils
import { IDataContext } from '../utils/interfaces';

const defaultData: IDataContext = {
  events: [], // список анонсов
  services: [], // список услуг
  communities: [], // список сообществ
  loadingEvents: true,
  loadingServices: true,
  storeReminder: (
    value: boolean,
    eventId: string,
    onStored: Function,
    onStoredFailed: Function,
  ) => {},
};

const DataContext = React.createContext(defaultData);

export default DataContext;
