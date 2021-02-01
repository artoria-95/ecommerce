import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes/App';
import { BrowserRouter } from 'react-router-dom';

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
