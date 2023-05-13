import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { Provider } from "react-redux";
import configureAppStore from "./store/store.js";
import './index.scss';

const store = configureAppStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);