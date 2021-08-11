import React from 'react';

// utils
import { IStorageContext } from '../utils/interfaces';

//
// NOTE!
// работа с AsyncStorage по хранению ID сообществ
// осуществлять только с помощью этих методов
//
const storageData: IStorageContext = {
  getCommunityID: () => 0,
  setCommunityID: (anId: number) => undefined,
};

const StorageContext = React.createContext(storageData);

export default StorageContext;
