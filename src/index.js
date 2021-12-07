import React from 'react';
import ReactDOM from 'react-dom';
import {PersistGate} from "redux-persist/integration/react";
import {store,persistor} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { StyledEngineProvider } from '@mui/material/styles';
import './index.css';
import App from './App';

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter>
                  <StyledEngineProvider injectFirst>
                      <App />
                  </StyledEngineProvider>
              </BrowserRouter>
          </PersistGate>
      </Provider>,
   </React.StrictMode>,
  document.getElementById('root')
);