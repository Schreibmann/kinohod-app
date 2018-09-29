import ReactDOM from 'react-dom';
import React from 'react';
import { ThemeProvider } from 'react-jss';
import mainTheme from '../theme/main.js';
import AppContainer from '../containers/AppContainer/AppContainer';

ReactDOM.render(
  <ThemeProvider theme={mainTheme}>
    <AppContainer title="KINOHOD App" />
  </ThemeProvider>,
  document.getElementById('root'),
);
