import React from 'react';

const defaultData = {
  user: undefined, // object or undefined - текущий авторизованный пользователь firebase
  connectingToFirebase: true, // флаг, который обозначает процесс подключения к базе firebase
};

const AuthContext = React.createContext(defaultData);

export default AuthContext;
