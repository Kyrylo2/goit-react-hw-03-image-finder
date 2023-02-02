import React from 'react';
import { AppDiv } from '../AppContainer/App.styled';

const AppContainer = ({ children }) => {
  return <AppDiv>{children}</AppDiv>;
};

export default AppContainer;
