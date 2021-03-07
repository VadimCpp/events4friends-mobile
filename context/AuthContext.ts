import React from 'react';

interface IDefaultData {
  user: Object | null;
  connectingToFirebase: boolean;
}

const defaultData: IDefaultData = {
  user: null, // object or undefined - текущий авторизованный пользователь firebase
  connectingToFirebase: true, // флаг, который обозначает процесс подключения к базе firebase
};

const AuthContext = React.createContext(defaultData);

export default AuthContext;
