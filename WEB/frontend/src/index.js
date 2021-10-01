import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import rootReducer from './modules';
//import promiseMiddleware from 'redux-promise';

import {ThemeProvider} from '@mui/material/styles';
import theme from './lib/styles/theme';
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));
//const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware, ReduxThunk)));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);
