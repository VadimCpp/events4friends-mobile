/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface IDataContext {
  events: Array<any>;
  services: Array<any>;
  communities: Array<any>;
  loadingEvents: boolean;
  loadingServices: boolean;
  storeReminder: (
    value: boolean,
    eventId: string,
    onStored: Function,
    onStoredFailed: Function,
  ) => void;
}

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
