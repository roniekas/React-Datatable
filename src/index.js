import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Router, RouterProvider} from "react-router-dom";
import router from "./router";
import Index from "./pages/fallback";
import axios from "axios";
import { createBrowserHistory } from 'history';

axios.defaults.baseURL = 'http://corenet.usadi.co.id/BaseAPI';
const browserHistory = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Index />} history={browserHistory}/>
  </React.StrictMode>
);