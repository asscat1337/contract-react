import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { StyledEngineProvider } from '@mui/material/styles';
import './index.css';
import App from './App';

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <StyledEngineProvider injectFirst>
                  <App />
              </StyledEngineProvider>
          </BrowserRouter>
      </Provider>,
   </React.StrictMode>,
  document.getElementById('root')
);