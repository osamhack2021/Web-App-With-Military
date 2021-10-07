/* eslint-disable no-undef */
import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { ThemeProvider } from '@mui/material/styles';
import rootReducer from './modules';
import App from './App';
import theme from './lib/styles/theme';

// import promiseMiddleware from 'redux-promise';
// const store = createStore(rootReducer,
//   composeWithDevTools(applyMiddleware(promiseMiddleware, ReduxThunk)));

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
